# Series routes

- `/series/` lists series with their part counts.
- `/series/<slug>/` shows the parts in order, with a breadcrumb (Home, Series, name) and a label "Series, N parts".

Paths come from `getSeries()`, which groups posts by the `series` string and sorts parts by `seriesOrder`. Series are listed alphabetically.

The page description is `"<N>-part series: <name>"`.
