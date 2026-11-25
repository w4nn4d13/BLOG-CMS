# Featured and pinned posts

Two booleans control homepage placement.

```yaml
featured: true
pinned: true
```

## Homepage logic (`src/pages/index.astro`)

```ts
const featured = allPosts.filter((p) => p.data.featured).slice(0, 3);
const pinned   = allPosts.filter((p) => p.data.pinned && !p.data.featured).slice(0, 5);
const latest   = allPosts.slice(0, SITE.postsPerPage);
```

- At most **3** featured posts are shown, newest first.
- At most **5** pinned posts are shown, and a post that is already featured is not repeated in the pinned list.
- The latest list shows `postsPerPage` (10) posts.

To remove a post from these sections, delete the field or set it to `false`.
