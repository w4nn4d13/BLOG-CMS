# Static output

`astro.config.mjs` sets `output: 'static'`. Every page is pre-rendered, including the "API-style" endpoints (`rss.xml`, `feed.json`, `robots.txt`).

## Consequences

- Hosting only needs a static file server (GitHub Pages, Netlify, Cloudflare Pages, Vercel).
- Search runs in the browser against an index embedded in the page. See [search](../routes/search.md).
- Anything time-dependent is decided at build time. Posts with a future `date` are excluded until a later deployed build; CI has a daily schedule trigger for this. See [scheduled rebuilds](../ci/scheduled-rebuilds.md).
- Redirects cannot be handled by a server. They live in `netlify.toml`, `public/_redirects` and the `redirects` map in `astro.config.mjs`.

## Site URL

`site` is taken from `SITE.siteURL` (`https://w4nn4d13.in`). Canonical URLs, sitemap entries and feed links are built from it.
