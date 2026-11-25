# `ogImage`

| | |
| --- | --- |
| Type | string (path or URL) |
| Required | no |

Overrides the social sharing image for one post.

Order of precedence in `PostLayout.astro`: `ogImage`, then `cover`, then `SITE.defaultOGImage`.

Relative paths are converted into absolute URLs in `BaseLayout.astro` using `SITE.siteURL`, because social crawlers need absolute links. The same URL is used for `og:image` and `twitter:image`.
