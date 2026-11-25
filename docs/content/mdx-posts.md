# MDX posts

The `@astrojs/mdx` integration is enabled in `astro.config.mjs`, so a post can be `.mdx` instead of `.md`.

## What changes

- The file extension is `.mdx`. Slug rules are identical.
- The same frontmatter schema applies.
- You can import and use components in the body.

## When to use it

Use `.mdx` only when a post needs interactive or reusable components. Plain Markdown is faster to write and is what every current post uses.

## Caveats

- `scripts/validate-content.js` scans both `.md` and `.mdx`.
- The JSON feed converts post bodies with a Markdown pipeline, so MDX-only syntax will not render in feed output. See [JSON feed](../feeds/json-feed.md).
