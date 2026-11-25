# `cover`

| | |
| --- | --- |
| Type | string (path or URL) |
| Required | no |

An image shown at the top of the article.

```yaml
cover: "/images/my-cover.jpg"
```

Paths are relative to `public/`. The value is also:

- the fallback Open Graph image when `ogImage` is not set
- the `image` entry in the BlogPosting JSON-LD, resolved against `SITE.siteURL`

Use a wide image, around 1200 x 630 pixels, so the social preview is not cropped.
