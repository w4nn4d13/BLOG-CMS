# Series

Group related posts into a numbered series.

```yaml
series: "API Security Research"
seriesOrder: 1
```

## What is generated

- `/series/` lists all series.
- `/series/api-security-research/` lists the parts in order.
- A series box appears inside each article, listing every part.
- Series membership adds 4 points to the related-post score. See [related posts](../utils/related-posts.md).

## Ordering

`getSeries()` sorts parts by `seriesOrder` (missing values count as 0). Use consecutive positive integers starting at 1.

## Naming

The series slug is `slugify(series)`, so keep the exact same string in every part. A typo creates a second series.

## Structured data

`PostLayout.astro` adds an `isPartOf` entry of type `CreativeWorkSeries` to the BlogPosting JSON-LD.
