# Static page schema

Fields for files in `src/content/pages/`.

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | string, min length 1 | yes | |
| `description` | string, min length 1 | yes | |
| `noindex` | boolean | no | `false` |
| `updated` | date | no | |

Unlike posts, `description` is required and must not be empty.

Pages have no category, tags, series or date, so they never appear in archives, feeds or taxonomies.

See [static pages](../../content/static-pages.md).
