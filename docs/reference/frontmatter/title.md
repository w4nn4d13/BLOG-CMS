# `title`

| | |
| --- | --- |
| Type | string |
| Required | yes |
| Schema | `z.string().min(1, 'Title is required')` |

The article headline. It is used as:

- the page H1 and the BlogPosting `headline`
- the `<title>`, with the suffix ` — w4nn4d13` (`SITE.seo.titleSeparator` + `titleSuffix`)
- the link text in lists, search results and feeds

```yaml
title: "CVE-2026-117425: MkDocs Write-up"
```

Quote titles that contain a colon. `npm run validate` fails when the title is missing. Keep titles short enough to be readable in a search result.
