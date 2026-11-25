# Drafts

Set `draft: true` in frontmatter to keep a post private while you work.

## Behaviour

`getAllPosts()` checks `import.meta.env.DEV`:

| Mode | Drafts shown |
| --- | --- |
| `npm run dev` | Yes, so you can preview them |
| `npm run build` | No |

In production builds a draft is absent from article pages, indexes, taxonomies, search, feeds, the sitemap and related-post lists, because every one of them starts from `getAllPosts()`.

`getAllPostsIncludingDrafts()` exists for tooling that needs the full list.

## Workflow

1. `npm run new:post "Title"` creates the file with `draft: true`.
2. Write and preview locally.
3. Change to `draft: false`, commit and push.

A file that is pushed with `draft: true` is still in the repository, so do not put secrets in drafts.
