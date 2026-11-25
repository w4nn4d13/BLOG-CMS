# Archive

`/archive/` lists every published post grouped by year, then month.

`getArchiveByYear()` returns `Map<year, Map<month, Post[]>>`. The page sorts years and months in descending order and shows a count per year. Month names come from `MONTH_NAMES` in `src/utils/posts.ts`.

Note that grouping uses `getFullYear()` and `getMonth()` (local time of the build machine). A post dated on the first or last day of a month can land in a neighbouring month if the builder's timezone is behind UTC. CI runners use UTC, so deployed output is stable.
