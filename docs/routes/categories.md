# Category routes

- `/categories/` lists every category with its article count as cards in `.taxonomy-grid`.
- `/category/<slug>/` lists posts whose `slugify(category)` equals the slug. It has a breadcrumb and shows `"N articles in <name>"` in its description.

`getCategories()` returns `{ name, slug, count }` sorted by count, highest first. Pages are generated for each entry returned, so an empty category cannot exist.

The homepage sidebar shows the top 8.
