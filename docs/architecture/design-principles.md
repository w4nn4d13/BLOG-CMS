# Design principles

These principles are visible in the code and the README.

1. **Files over services.** Content, config and navigation are plain files in Git. Version history is the audit trail.
2. **Derive, never maintain.** Indexes and taxonomies are computed from frontmatter, so they cannot drift.
3. **Fail at build time.** Schema validation and `npm run validate` stop bad content before it is deployed.
4. **Static by default.** No runtime server, minimal JavaScript. The only client scripts are the mobile menu toggle, search, copy buttons and link sharing.
5. **One source of configuration.** Site-wide values live in `src/config/site.ts`.
6. **Accessible markup.** Skip link, `aria-current` on navigation, `aria-live` search status, reduced-motion support in CSS.
7. **Host-agnostic.** The same output deploys to GitHub Pages, Netlify, Cloudflare Pages or Vercel.
