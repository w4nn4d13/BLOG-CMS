---
title: "API Security Research: Authorization and Access Control — Part 2"
description: "Second part of the demo API security series. Demonstrates series navigation, IDOR patterns, and access control research methodology. Fictional demo content."
date: 2026-07-29
author: "Stalin S."
category: "Security Research"
tags:
  - api-security
  - authorization
  - idor
  - web-security
  - demo
hashtags:
  - "#APISecurity"
  - "#IDOR"
  - "#WebSecurity"
  - "#SecurityResearch"
featured: false
pinned: false
draft: false
series: "API Security Research Patterns"
seriesOrder: 2
toc: true
---

> **DEMO CONTENT**: This article is fictional and demonstrates BLOG-CMS series navigation. Not real research.

## Overview

Part 2 of this demo series covers authorization research patterns: IDOR, horizontal privilege escalation, and access control boundary testing.

## IDOR: Insecure Direct Object Reference

IDOR vulnerabilities occur when an application exposes internal object references (IDs, filenames, etc.) without verifying authorization.

### Basic Detection Pattern

```bash
# Capture authenticated request for your own resource
GET /api/v1/documents/1337
Authorization: Bearer <your_token>

# Attempt to access another user's resource by incrementing the ID
GET /api/v1/documents/1338
Authorization: Bearer <your_token>
```

### IDOR Testing Script (Demo)

```python
import httpx
import time

def test_idor(base_url: str, token: str, known_id: int, test_ids: list[int]) -> list[dict]:
    """
    Demo IDOR test pattern — only run against systems you own/authorized to test.
    """
    headers = {'Authorization': f'Bearer {token}'}
    results = []

    for obj_id in test_ids:
        r = httpx.get(f'{base_url}/api/v1/documents/{obj_id}', headers=headers)
        results.append({
            'id': obj_id,
            'status': r.status_code,
            'accessible': r.status_code == 200,
        })
        time.sleep(0.1)  # Be respectful

    return [r for r in results if r['accessible'] and r['id'] != known_id]
```

## Access Control Boundary Testing

| Test | Expected | Vulnerable If |
|------|----------|---------------|
| Admin endpoint with user token | 403 | 200 or data returned |
| Deleted resource access | 404 | 200 or data returned |
| Cross-tenant access | 403 | 200 or data returned |
| Unpublished content | 403 | 200 or data returned |

## Horizontal vs Vertical Escalation

**Horizontal escalation**: accessing another user's resources at the same privilege level.

**Vertical escalation**: accessing resources or functions requiring higher privilege than you hold.

Both require the same authorization model to be enforced server-side on every request — client-side checks are not sufficient.

## Series Navigation

← [Part 1: Authentication](/posts/api-security-authentication-bypass-part-1/)

→ [Part 3: Input Validation](/posts/api-security-input-validation-part-3/)

---

*Demo content for BLOG-CMS series feature testing.*
