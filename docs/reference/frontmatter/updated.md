# `updated`

| | |
| --- | --- |
| Type | date |
| Required | no |

Marks the last substantive edit.

- The article header shows "Updated: ..." only when this differs from `date`.
- `dateModified` in JSON-LD and `date_modified` in the JSON feed use it, falling back to `date`.
- `article:modified_time` is added to the page head.

```yaml
updated: 2026-11-24
```

It does not change ordering. Use it for corrections and added sections, not typo fixes.
