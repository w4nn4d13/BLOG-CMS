# `hashtags`

| | |
| --- | --- |
| Type | array of strings |
| Required | no |
| Default | `[]` |

Hashtags are independent of tags and produce their own pages.

```yaml
hashtags:
  - "#CyberSecurity"
  - "#WebSecurity"
```

The leading `#` is optional but must be quoted in YAML. `normalizeHashtag()` strips it, lowercases and trims, so `#CyberSecurity` and `cybersecurity` are the same hashtag.

Pages: `/hashtags/` and `/hashtag/<normalized>/`. The first spelling encountered is kept as the display text.
