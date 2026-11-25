# `description`

| | |
| --- | --- |
| Type | string |
| Required | no (schema default is an empty string) |
| Limit | 300 characters |

A one or two sentence summary.

Used for the meta description, Open Graph and Twitter cards, the article subtitle, post lists, the RSS item description, the JSON feed `summary` and the search index.

The schema rejects values over 300 characters, and the validator warns at the same length. Aim for about 160 characters so search engines do not truncate it.

If it is empty, `PostLayout.astro` passes `undefined` and the site-wide description from `SITE.siteDescription` is used.
