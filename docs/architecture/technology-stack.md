# Technology stack

From `package.json`.

## Runtime dependencies

| Package | Use |
| --- | --- |
| `astro` | Static site framework |
| `@astrojs/mdx` | `.mdx` post support |
| `@astrojs/rss` | RSS feed generation |
| `@astrojs/sitemap` | Sitemap generation |
| `pagefind` | Search indexing library (present as a dependency) |
| `reading-time` | Reading time package (the site also ships its own helper in `src/utils/reading-time.ts`) |
| `sanitize-html` | HTML sanitising |

## Development dependencies

`typescript`, `@types/node` and `@types/sanitize-html`.

## Requirements

Node.js 20+, npm 9+ and Git. CI uses Node 20 with `npm ci`.

## Fonts

IBM Plex Sans and IBM Plex Mono, loaded from Google Fonts in `BaseLayout.astro`.
