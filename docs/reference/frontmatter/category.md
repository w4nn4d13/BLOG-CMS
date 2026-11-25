# `category`

| | |
| --- | --- |
| Type | string |
| Required | no |
| Default | `Uncategorized` |

Each post has exactly one category.

```yaml
category: "Security Research"
```

Generated pages: `/categories/` (index with counts) and `/category/security-research/`.

The category also shows above the article title, adds 3 points in the related-post score, appears in RSS categories and is used for `articleSection` in JSON-LD.

Categories are grouped by display name, so `Security Research` and `Security research` count as two categories even though they share a slug. Pick one spelling.
