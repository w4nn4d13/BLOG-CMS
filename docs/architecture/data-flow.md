# Data flow

How a single post becomes pages.

1. A file such as `src/content/posts/cve-2026-117425.md` is added.
2. Astro validates its frontmatter against the `posts` schema.
3. `getAllPosts()` in `src/utils/posts.ts` returns every visible post, newest first. Drafts and future-dated posts are removed in production builds.
4. Route files call helpers on that list:
   - `getCategories`, `getTags`, `getHashtags`, `getSeries` group posts for the taxonomy pages.
   - `getArchiveByYear` groups posts for `/archive/`.
   - `getRelatedPosts` scores neighbours for the article footer.
   - `paginate` slices the list for `/latest/`.
5. `PostLayout.astro` wraps the article and `BaseLayout.astro` wraps every page with metadata, navigation and footer.
6. The result is written to `dist/`.

Because everything flows from `getAllPosts()`, visibility rules are applied in one place. See [post visibility](../utils/post-visibility.md).
