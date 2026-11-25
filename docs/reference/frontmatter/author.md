# `author`

| | |
| --- | --- |
| Type | string |
| Required | no |
| Default | `w4nn4d13` |

The author name. It is shown in the byline and author box, used in Article structured data, and creates `/author/<slugify(name)>/`.

To show a bio and role from `src/content/authors/`, the string must match the `name` field of a profile (compared through `slugify`). Otherwise the site defaults are used.

See [authors](../../content/authors.md) and [author pages](../../routes/author-pages.md).
