# `canonical`

| | |
| --- | --- |
| Type | absolute URL or empty string |
| Required | no |

Set this when the article was first published elsewhere.

```yaml
canonical: "https://original-source.com/article"
```

`PostLayout.astro` passes `data.canonical || postUrl` to the layout, which writes `<link rel="canonical">`. The schema requires a valid URL (or `""`), and the validator warns when it does not start with `http`.

Without it, the canonical URL is the post's own address on `https://w4nn4d13.in`.
