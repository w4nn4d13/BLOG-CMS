# `noindex`

| | |
| --- | --- |
| Type | boolean |
| Required | no |
| Default | `false` |

Asks search engines not to index the page. `BaseLayout.astro` switches the robots meta tag from

```
index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
```

to `noindex, nofollow`.

This changes the meta tag only. The page is still built, linked from indexes and listed in the sitemap, because the sitemap filter in `astro.config.mjs` excludes only `/404`. To remove a page completely, make it a draft.

The same field exists on static pages.
