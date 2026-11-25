# Authors

Author profiles are JSON files in `src/content/authors/`.

```json
{
  "name": "w4nn4d13",
  "role": "Security Researcher · AI Engineer",
  "bio": "Short biography.",
  "social": { "github": "https://github.com/example" }
}
```

Existing files: `w4nn4d13.json`, `stalin.json`, `harini.json`.

## Linking a post

A post's `author` field is a plain string. The author page route takes the unique author names found in published posts and creates `/author/<slugify(name)>/`.

## Profile lookup

On each author page the profile is found by comparing `slugify(profile.name)` with the URL slug. If no JSON entry matches, the page falls back to `SITE.authorRole` and `SITE.authorBio`.

Match the post `author` string to the profile `name` exactly, or the profile will not be found.
