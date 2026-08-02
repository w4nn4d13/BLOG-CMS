---
title: "Markdown Feature Demonstration"
description: "A comprehensive demonstration of all supported Markdown features: headings, code blocks, tables, lists, blockquotes, task lists, footnotes, and more."
date: 2026-08-02
author: "w4nn4d13"
category: "Documentation"
tags:
  - markdown
  - documentation
  - demo
hashtags:
  - "#Markdown"
  - "#Documentation"
featured: false
pinned: false
draft: false
toc: true
---

This article demonstrates every supported Markdown feature. It is a reference document for content authors.

## Headings

Headings use the `#` syntax. H2 through H4 appear in the table of contents.

### H3 Heading Example

#### H4 Heading Example

##### H5 (not in TOC)

## Text Formatting

Basic inline formatting:

- **Bold text** — use `**double asterisks**`
- *Italic text* — use `*single asterisks*`
- ~~Strikethrough~~ — use `~~tildes~~`
- `Inline code` — use backticks
- **Bold and *italic* combined**

## Links

- [External link](https://example.com)
- [Internal link](/about/)
- [Link with title](https://example.com "Example title")

## Blockquotes

> A blockquote is indented with a `>` prefix. It renders with a left border and muted text color.
>
> Multiple paragraphs work within a blockquote.

Nested blockquote:

> Outer quote.
> > Inner quote.

## Lists

### Unordered List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task List

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] Another pending task

## Code Blocks

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Bash

```bash
#!/bin/bash
# Create a new blog post
TITLE="${1:-New Post}"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
DATE=$(date +%Y-%m-%d)
FILE="src/content/posts/${SLUG}.md"

cat > "$FILE" <<EOF
---
title: "${TITLE}"
description: ""
date: ${DATE}
author: "w4nn4d13"
category: "Uncategorized"
draft: true
---

Content here.
EOF

echo "Created: $FILE"
```

### JavaScript / TypeScript

```typescript
interface SearchResult {
  title: string;
  url: string;
  description: string;
  score: number;
}

function searchPosts(query: string, index: SearchResult[]): SearchResult[] {
  const q = query.toLowerCase().trim();
  return index
    .filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    )
    .sort((a, b) => b.score - a.score);
}
```

### SQL

```sql
SELECT
  p.title,
  p.published_at,
  c.name AS category,
  COUNT(t.id) AS tag_count
FROM posts p
  LEFT JOIN categories c ON p.category_id = c.id
  LEFT JOIN post_tags pt ON p.id = pt.post_id
  LEFT JOIN tags t ON pt.tag_id = t.id
WHERE p.draft = false
  AND p.published_at <= NOW()
GROUP BY p.id, c.id
ORDER BY p.published_at DESC
LIMIT 10;
```

### JSON

```json
{
  "name": "blog-cms",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build"
  },
  "dependencies": {
    "astro": "^5.7.13",
    "@astrojs/mdx": "^4.3.1"
  }
}
```

### YAML

```yaml
name: Deploy Blog

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm ci && npm run build
```

## Tables

| Language | Use Case | Notes |
|----------|----------|-------|
| Python | Automation, ML | Wide library ecosystem |
| Rust | Systems programming | Memory safety without GC |
| Go | Network services | Simple concurrency model |
| TypeScript | Web frontends | Static types over JS |
| SQL | Database queries | Relational data |

## Images

Images support alt text, lazy loading, and responsive rendering:

![Example placeholder image — alt text describes the image content](https://via.placeholder.com/800x400/f0f0f0/666666?text=Example+Image)

*Figure: A placeholder image demonstrating the image syntax.*

## Horizontal Rules

---

A horizontal rule (`---`) creates a visual separator.

## Footnotes

Footnotes[^1] are supported and render at the bottom of the article[^2].

[^1]: This is the first footnote content.
[^2]: Footnotes can contain extended text and even code.

## Summary

This demonstration covers all supported Markdown features. Refer to this article when authoring new content.

---

*This is a demo post included with the BLOG-CMS installation.*
