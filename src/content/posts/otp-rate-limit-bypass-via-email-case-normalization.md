---
title: "OTP Rate Limit Bypass via Email Case Normalization"
description: "How inconsistent email normalization between the rate limiter and delivery logic allows unlimited OTP requests — a classic normalization-mismatch bug."
date: 2026-07-29
author: "w4nn4d13"
category: "Web Application Security"
tags:
  - rate-limiting
  - otp
  - authentication
  - web-security
hashtags:
  - "#WebSecurity"
  - "#BugBounty"
  - "#Authentication"
  - "#SecurityResearch"
featured: true
draft: false
toc: true
---

## The Idea

Most login/OTP systems put a cap on how many codes they'll send to one email address — usually something like 15 requests per window — to stop people from spamming a victim's inbox or brute-forcing their way through auth flows.

The way that cap usually works is simple: the server takes the email you submit, uses it as a "key," and counts how many requests have come in under that key. Once you hit the limit, that key gets blocked for a while.

The bug here comes down to one mismatch: **the system that delivers the OTP treats email addresses as case-insensitive (as it should — `user@example.com` and `USER@example.com` are the same inbox), but the rate limiter treats them as case-sensitive strings.**

So the rate limiter isn't actually keying off "the account." It's keying off the literal characters you sent.

## Why That Matters

If the rate limiter and the mailbox-resolution logic don't agree on what counts as "the same identity," you get a gap you can walk through:

- Send `user@example.com` over and over → after ~15 tries, blocked.
- Send `User@example.com` instead → totally different string, so the limiter treats it as a fresh, never-seen-before key → 15 more free requests.
- Send `uSer@example.com`, `usEr@example.com`, `useR@example.com`, and so on → each unique casing pattern is its own bucket.

Meanwhile, every single one of those OTPs lands in the exact same inbox, because the actual account/delivery logic *does* normalize case correctly. Only the abuse-prevention layer got left behind.

Since every alphabetic letter in the local-part can independently be upper or lower case, an address with N letters has 2^N possible casing combinations. Each combination is a fresh rate-limit bucket. That turns a "15 requests max" control into something closer to unlimited.

## Why It Happens

This is a classic normalization-mismatch bug. It happens whenever a system has multiple places that all care about "is this the same user/identity," but each place canonicalizes the input differently (or not at all):

- Delivery logic: lowercases the email before looking up the mailbox → correct behavior.
- Rate limiter: uses the raw string exactly as received → misses that these are the same identity.

Any place where identity is compared across subsystems is a place where this class of bug can hide — it doesn't have to be case, it could just as easily be trailing whitespace, invisible unicode characters, or control characters like CRLF/null bytes stuffed into the string. All of those exploit the same root problem: inconsistent normalization between the component that decides "is this account rate-limited" and the component that decides "who actually gets this email."

## Impact

- The anti-abuse control is effectively bypassable, so an attacker can flood a victim's inbox with OTP codes.
- More OTPs in circulation for one account also gives more chances against auth flows that rely on a short, fixed-length numeric code — every extra one issued is another shot.
- It's also just a way to waste the OTP-sending service's resources (cost, rate on the email/SMS provider, etc.).

## The Fix

Normalize the email address (trim whitespace, lowercase it, strip out anything that isn't a legitimate email character) at the point it comes in, and make sure every downstream system — rate limiter, delivery, logging, storage — uses that same normalized value. As long as there's only one canonical form floating around internally, there's no way to make two subsystems disagree about whether two strings mean "the same account."
