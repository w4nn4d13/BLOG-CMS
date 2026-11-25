# Homepage

`src/pages/index.astro` assembles the front page from one call to `getAllPosts()`.

## Sections

1. **Masthead.** `SITE.siteName` as H1 and `SITE.siteDescription` below it.
2. **Featured.** Up to 3 posts with `featured: true`.
3. **Pinned.** Up to 5 posts with `pinned: true` that are not featured.
4. **Latest.** The newest `SITE.postsPerPage` posts as rows with date, title, category and the first two tags. A "View all N articles" link appears when more exist.
5. **Sidebar.** Top 8 categories and top 20 hashtags with counts.

## Structured data

The page passes a `WebSite` schema to `BaseLayout`. `BaseLayout` also adds `Person` and `BreadcrumbList` blocks.

Changing how many items appear means editing the `slice()` calls in the frontmatter of the file.
