# `draft`

| | |
| --- | --- |
| Type | boolean |
| Required | no (schema default `false`) |

`true` hides the post from production builds. It remains visible in `npm run dev`.

`scripts/new-post.js` creates new posts with `draft: true`, so remember to switch it before publishing.

Because it is a plain frontmatter value, the content is still in Git. See [drafts](../../content/drafts.md).
