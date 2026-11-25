# Content collections

`src/content.config.ts` defines three collections using Astro's `defineCollection` and Zod.

| Collection | Type | Folder | Produces |
| --- | --- | --- | --- |
| `posts` | content | `src/content/posts/` | Article pages and every index derived from them |
| `pages` | content | `src/content/pages/` | Static pages such as `/about/` |
| `authors` | data | `src/content/authors/` | Author profile data (JSON) |

## Validation

Schemas reject bad input at build time. Examples:

- `title` must be a non-empty string.
- `description` is limited to 300 characters.
- `date` is coerced with `z.coerce.date()`, so `2026-08-03` and full ISO strings both work.
- `seriesOrder` must be a positive integer or `null`.

The frontmatter fields are documented one by one under [reference/frontmatter](../reference/frontmatter/title.md).
