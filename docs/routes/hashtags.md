# Hashtag routes

- `/hashtags/` lists all hashtags with counts.
- `/hashtag/<normalized>/` lists posts with that hashtag.

Matching is case-insensitive through `normalizeHashtag()`:

```ts
ht.replace(/^#/, '').toLowerCase().trim()
```

The route's `getStaticPaths()` uses `getHashtags()`, which stores the first display spelling (without `#`) for each normalized value. The page title is `#<display>` and the description reports the count.

The homepage sidebar links the 20 most-used hashtags. `displayHashtag()` adds the `#` back for rendering.
