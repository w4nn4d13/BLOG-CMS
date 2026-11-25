# Article pages

`src/pages/posts/[slug].astro` renders each post through `PostLayout.astro`.

## Which posts get a page

In production, a post is built only if it is not a draft and its `date` is not later than the build time. In dev, every post is built.

## Layout contents

- Breadcrumb: Home, Latest, category, title
- Header: category, title, description, author, dates, reading time, cover image
- Series box (when the post has a series)
- Article body with copy buttons on code blocks
- Footer: tags, hashtags, share links (copy link, X, LinkedIn), author box
- Previous/next navigation based on date order
- Related posts (default 3)
- Sidebar table of contents when applicable

`PostLayout.astro` also builds the `BlogPosting` JSON-LD. See [structured data](../seo/structured-data.md).
