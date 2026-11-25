# Architecture overview

BLOG-CMS is a Git-based publishing platform. Markdown files in `src/content/` are the only data store. Astro turns them into static HTML at build time, so there is no database, no admin panel and no server runtime.

```
Markdown + JSON  ->  Astro content collections  ->  page routes  ->  dist/ (static files)
```

## Main parts

| Part | Location | Role |
| --- | --- | --- |
| Content | `src/content/` | Posts, static pages and author data |
| Schema | `src/content.config.ts` | Zod validation of frontmatter |
| Config | `src/config/site.ts` | Site name, navigation, SEO and feed settings |
| Utilities | `src/utils/` | Filtering, grouping, slugs, pagination |
| Layouts | `src/layouts/` | `BaseLayout.astro` and `PostLayout.astro` |
| Routes | `src/pages/` | One file per URL pattern |
| Styles | `src/styles/global.css` | Single global stylesheet |
| Scripts | `scripts/` | `new-post.js` and `validate-content.js` |

## Why this shape

Every index page (categories, tags, hashtags, series, archive, search, feeds, sitemap) is derived from post frontmatter during the build. Nothing needs to be edited by hand when a post is added.

See also: [build pipeline](build-pipeline.md), [data flow](data-flow.md).
