# Build pipeline

The site is built with `npm run build`, which runs `astro build` and writes static files to `dist/`.

## Stages

1. **Content loading.** Astro reads `src/content/posts`, `src/content/pages` and `src/content/authors` and validates each entry against the schemas in `src/content.config.ts`. An invalid entry fails the build.
2. **Route generation.** Dynamic routes such as `src/pages/posts/[slug].astro` call `getStaticPaths()` to list every URL they should produce.
3. **Rendering.** Markdown is rendered with Shiki syntax highlighting. MDX is supported through `@astrojs/mdx`.
4. **Integrations.** `@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-0.xml`. The 404 page is excluded.
5. **Output.** Static assets are emitted under `_assets` (the `build.assets` setting in `astro.config.mjs`).

## Related commands

```bash
npm run validate   # frontmatter checks before the build
npm run check      # astro check (type check)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

CI runs validate, check and build in that order. See [CI workflows](../ci/build-and-deploy-workflow.md).
