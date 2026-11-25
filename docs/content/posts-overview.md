# Posts overview

Posts are Markdown (`.md`) or MDX (`.mdx`) files in `src/content/posts/`. The file name becomes the URL unless the `slug` field overrides it.

```
src/content/posts/cve-2026-117425.md  ->  /posts/cve-2026-117425/
```

## Minimal post

```markdown
---
title: "My Finding"
description: "One sentence summary."
date: 2026-11-20
---

Body text in Markdown.
```

Only `title` and `date` are required by the schema. Everything else has a default: category `Uncategorized`, author `w4nn4d13`, empty tags and hashtags, `draft: false`, `toc: true`.

## Creating one

```bash
npm run new:post "My Finding"
```

This copies `templates/post.md`, fills the title and today's date, and sets `draft: true`. See [new-post script](../scripts/new-post.md).

## Publishing

Set `draft: false`, commit, push. The workflow builds and deploys. See [drafts](drafts.md).
