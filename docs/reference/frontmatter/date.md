# `date`

| | |
| --- | --- |
| Type | date (`z.coerce.date()`) |
| Required | yes |

The publication date, ideally `YYYY-MM-DD`.

It drives:

- sort order (newest first)
- the `/archive/` year and month grouping
- previous/next navigation
- scheduled publishing: a future date hides the post until that day
- `datePublished` in the structured data and `pubDate` in RSS

The validator rejects anything `Date.parse` cannot read.

```yaml
date: 2026-11-20
```

See [scheduled posts](../../content/scheduled-posts.md).
