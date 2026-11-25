# Table of contents

Articles show a table of contents in the sidebar when `toc` is true (the default) and the post has more than two H2 to H4 headings.

## How it is built

`buildToc()` in `src/utils/toc.ts` takes the headings Astro extracts from the post and keeps depths 2 to 4:

```ts
return headings.filter((h) => h.depth >= 2 && h.depth <= 4);
```

H1 is excluded because the layout already renders the title as the page H1. H5 and H6 are ignored.

## Anchors

Each heading gets an id from Astro, and `.heading-anchor` styles the in-page link.

## Turning it off

```yaml
toc: false
```

The sidebar is only rendered when the post has more than two TOC headings (`toc.length > 2`), so short posts never show an empty one even with `toc: true`.
