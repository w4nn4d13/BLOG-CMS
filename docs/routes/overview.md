# Route map

Every public URL and the file in `src/pages/` that produces it.

| URL | Source file | Notes |
| --- | --- | --- |
| `/` | `index.astro` | Featured, pinned, latest, sidebar |
| `/latest/`, `/latest/2/` | `latest/[...page].astro` | Paginated, 10 per page |
| `/posts/<slug>/` | `posts/[slug].astro` | Article |
| `/categories/`, `/category/<slug>/` | `categories/`, `category/[slug].astro` | |
| `/tags/`, `/tag/<slug>/` | `tags/`, `tag/[slug].astro` | |
| `/hashtags/`, `/hashtag/<slug>/` | `hashtags/`, `hashtag/[slug].astro` | |
| `/series/`, `/series/<slug>/` | `series/` | |
| `/archive/` | `archive/index.astro` | Year and month groups |
| `/author/<slug>/` | `author/[slug].astro` | |
| `/search/` | `search/index.astro` | Client-side |
| `/<page>/` | `[...slug].astro` | Static pages, e.g. `/about/` |
| `/404.html` | `404.astro` | Not-found page |
| `/rss.xml`, `/feed.json` | `rss.xml.ts`, `feed.json.ts` | Feeds |
| `/robots.txt` | `robots.txt.ts` | |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Generated |

Dynamic routes list their URLs in `getStaticPaths()`, always from `getAllPosts()`.
