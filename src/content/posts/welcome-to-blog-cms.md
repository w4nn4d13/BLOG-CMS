---
title: "Welcome to BLOG-CMS: A Git-Based Publishing Platform"
description: "An introduction to the BLOG-CMS static publishing platform — built on Astro, GitHub, and Markdown. Write, commit, push, and go live."
date: 2026-08-01
updated: 2026-08-01
author: "w4nn4d13"
category: "Meta"
tags:
  - blog-cms
  - astro
  - static-sites
  - markdown
hashtags:
  - "#BlogCMS"
  - "#Astro"
  - "#StaticSites"
  - "#Markdown"
featured: true
pinned: true
draft: false
toc: true
---

## Overview

BLOG-CMS is a Git-based static publishing platform. The entire publishing workflow is:

1. Write a Markdown file
2. Commit it
3. Push to GitHub
4. GitHub Actions handles everything else

No database. No admin panel. No CMS login. Pure text files that become a fast, static website.

## Why Git as a CMS

Traditional content management systems add complexity: databases, authentication, server-side rendering, security surface area, hosting requirements, and upgrade cycles.

A Git-based approach eliminates most of this:

- **Version control is built in** — every edit has a full history, diff, and rollback
- **Collaboration is git-native** — pull requests, code review, and branch drafts just work
- **No server to secure** — static HTML has near-zero attack surface
- **Portable** — your content is plain text, readable without any tooling
- **Fast** — pre-rendered HTML serves at CDN speed

## The Workflow

### Creating a New Post

Create a file in `src/content/posts/`:

```bash
touch src/content/posts/my-new-article.md
```

Add frontmatter and content:

```markdown
---
title: "My New Article"
description: "Short description."
date: 2026-08-03
author: "w4nn4d13"
category: "Security Research"
tags:
  - web-security
hashtags:
  - "#WebSecurity"
draft: false
---

Article content here.
```

Then:

```bash
git add src/content/posts/my-new-article.md
git commit -m "publish: my new article"
git push
```

GitHub Actions runs the build and deploys the site automatically.

### Editing an Article

Edit the `.md` file directly. Push. Done.

### Deleting an Article

Remove the file. Push. The article disappears from all indexes, RSS, sitemap, and search on the next build.

## Supported Content Features

| Feature | Supported |
|---------|-----------|
| Posts | ✓ |
| Pages (About, etc.) | ✓ |
| Authors | ✓ |
| Tags | ✓ |
| Hashtags | ✓ |
| Categories | ✓ |
| Series | ✓ |
| Featured posts | ✓ |
| Pinned posts | ✓ |
| Drafts | ✓ |
| Scheduled publishing | ✓ |
| Search | ✓ |
| Archives | ✓ |
| RSS | ✓ |
| Sitemap | ✓ |
| SEO / Open Graph | ✓ |
| Syntax highlighting | ✓ |
| Table of Contents | ✓ |
| Related posts | ✓ |

## Technology Stack

- **Framework**: Astro 5 with TypeScript
- **Content**: Markdown / MDX with Astro Content Collections
- **Styling**: Custom CSS — no frameworks
- **Search**: Client-side static search (no external service)
- **Hosting**: GitHub Pages (Cloudflare Pages / Vercel / Netlify compatible)
- **CI/CD**: GitHub Actions

## Design Philosophy

The design is deliberately institutional and minimal: black, white, monospace typography, square borders, and archive-style layouts. Reading speed and clarity are prioritized over decoration.

---

*This article is a demo post included with the BLOG-CMS platform installation.*
