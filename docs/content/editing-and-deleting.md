# Editing and deleting posts

## Editing

1. Open the file in `src/content/posts/`.
2. Make the change.
3. For a substantive change, set `updated: YYYY-MM-DD`. It feeds `dateModified` in the structured data and the JSON feed.
4. Run `npm run validate`.
5. Commit and push.

Do not change `date` to mark an edit. `date` controls ordering and the archive.

## Deleting

1. Delete the file and commit.
2. If the URL was public, add a redirect to a related page so inbound links do not 404. See [redirects](../routes/redirects.md).

Deleted posts disappear from every index on the next build.

## Unpublishing without deleting

Set `draft: true`. The file stays in Git history and in the repository, but the post leaves the production site.
