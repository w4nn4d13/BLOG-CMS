# Static pages

Standalone pages such as About and Disclaimer live in `src/content/pages/`.

```
src/content/pages/about.md       ->  /about/
src/content/pages/disclaimer.md  ->  /disclaimer/
```

## Schema

```yaml
---
title: "About"
description: "About this publication."
noindex: false
updated: 2026-08-01
---
```

`title` and `description` are required. `noindex` defaults to `false`. When `updated` is set, the page shows an "Updated" date.

## Routing

`src/pages/[...slug].astro` calls `getCollection('pages')` and creates one route per file. Adding a page needs no routing code.

## Navigation

Pages do not appear in the header automatically. Add a link in `SITE.navigation` in `src/config/site.ts`.
