# `/latest/` pagination

`src/pages/latest/[...page].astro` uses a rest parameter so page 1 has no number in its URL.

| Page | URL |
| --- | --- |
| 1 | `/latest/` |
| 2 | `/latest/2/` |
| 3 | `/latest/3/` |

`getStaticPaths()` computes `ceil(posts / SITE.postsPerPage)` pages (minimum 1) and returns `page: undefined` for the first one.

The page size comes from `SITE.postsPerPage`, currently 10. The header shows the total article count and the `<title>` includes the page number after page 1. Navigation uses the `paginate()` result: `hasPrev`, `hasNext`, `currentPage`, `totalPages`.

See [pagination helper](../utils/pagination.md).
