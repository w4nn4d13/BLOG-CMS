# Tag routes

- `/tags/` lists all tags with counts: "N tags across M articles".
- `/tag/<slug>/` lists posts that carry the tag.

`getTags()` flattens `data.tags` across posts, counts by exact string and sorts by count. The slug is produced by `slugify()`.

Links to tag pages appear on article footers and on post rows. Homepage rows show the first two tags only.
