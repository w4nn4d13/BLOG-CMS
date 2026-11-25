# `slug`

| | |
| --- | --- |
| Type | string |
| Required | no |
| Default | file name without extension |

Overrides the URL segment: `/posts/<slug>/`.

```yaml
slug: "otp-rate-limit-bypass"
```

The value is used verbatim, so write it in lowercase with hyphens. It must be unique across all posts; the validator reports duplicates. See [post slugs](../../content/post-slugs.md).
