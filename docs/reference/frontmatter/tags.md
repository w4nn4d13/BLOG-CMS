# `tags`

| | |
| --- | --- |
| Type | array of strings |
| Required | no |
| Default | `[]` |

```yaml
tags:
  - web-security
  - api-security
```

Pages: `/tags/` and `/tag/<slug>/`.

Slugs come from `slugify()`, so `Web Security` and `web-security` resolve to the same URL. Counts in `getTags()` group by exact string, though, so use one spelling per tag.

Each shared tag adds 2 points to the related-post score. Tags also go into RSS categories, the JSON feed `tags`, the search index and the keyword list.
