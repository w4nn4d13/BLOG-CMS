# Author data schema

Fields for JSON files in `src/content/authors/` (a `data` collection).

| Field | Type | Required |
| --- | --- | --- |
| `name` | string, min length 1 | yes |
| `role` | string | yes |
| `bio` | string | yes |
| `avatar` | string | no |
| `social` | object | no, defaults to `{}` |

`social` accepts optional `github`, `twitter`, `linkedin` and `website` strings.

The file name is not significant; the author page finds a profile by comparing `slugify(name)` with the URL slug. See [authors](../../content/authors.md).
