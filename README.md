# BLOG-CMS

A Git-based Markdown publishing platform built with Astro and TypeScript. Write → Commit → Push → Live.

No database. No admin panel. No CMS backend. Plain Markdown files become a fast, static website.

---

## What This Is

BLOG-CMS is a static publishing system where:

- Content lives in `src/content/posts/` as Markdown (`.md`) or MDX (`.mdx`) files
- GitHub Actions automatically builds and deploys on every push to `main`
- All indexes (categories, tags, hashtags, series, archives, search, RSS, sitemap) update automatically
- You never manually maintain navigation, indexes, or taxonomies

**Publishing workflow:**

```
Write Markdown → git commit → git push → GitHub Actions → Live
```

---

## Installation

### Requirements

- Node.js 20+
- npm 9+
- Git

### Setup

```bash
# Clone the repository
git clone git@github.com:w4nn4d13/BLOG-CMS.git
cd BLOG-CMS

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:4321` in your browser.

---

## Local Development

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview built site locally
npm run validate     # Validate all post frontmatter
npm run check        # TypeScript type check
npm run new:post "Title"  # Create a new post from template
```

---

## Project Structure

```
BLOG-CMS/
├── src/
│   ├── config/
│   │   └── site.ts              # Central site configuration
│   ├── content/
│   │   ├── posts/               # Blog posts (Markdown/MDX)
│   │   ├── pages/               # Static pages (about, disclaimer, etc.)
│   │   └── authors/             # Author data (JSON)
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Base HTML layout with SEO
│   │   └── PostLayout.astro     # Article layout with TOC, nav, related posts
│   ├── pages/                   # Astro page routes
│   │   ├── index.astro          # Homepage
│   │   ├── posts/[slug].astro   # Individual article pages
│   │   ├── latest/              # Latest articles with pagination
│   │   ├── categories/          # Category index
│   │   ├── category/[slug].astro
│   │   ├── tags/                # Tag index
│   │   ├── tag/[slug].astro
│   │   ├── hashtags/            # Hashtag index
│   │   ├── hashtag/[slug].astro
│   │   ├── series/              # Series index + detail pages
│   │   ├── archive/             # Year/month archive
│   │   ├── search/              # Client-side search
│   │   ├── author/[slug].astro  # Author archive pages
│   │   ├── rss.xml.ts           # RSS feed
│   │   ├── robots.txt.ts        # robots.txt
│   │   └── 404.astro            # 404 page
│   ├── styles/
│   │   └── global.css           # Design system + all styles
│   └── utils/
│       ├── posts.ts             # Post fetching, filtering, taxonomy
│       ├── slugify.ts           # URL slug helpers
│       ├── reading-time.ts      # Reading time calculation
│       └── toc.ts               # Table of contents helpers
├── templates/
│   └── post.md                  # Post template with all frontmatter fields
├── scripts/
│   ├── new-post.js              # Post creation helper
│   └── validate-content.js      # Content validation script
├── public/
│   ├── files/                   # Static file downloads
│   └── _redirects               # Netlify/Cloudflare redirect rules
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Deploy to GitHub Pages
│       └── pr-check.yml         # PR validation checks
└── astro.config.mjs             # Astro configuration
```

---

## Creating Posts

### Quick method

```bash
npm run new:post "My Article Title"
```

This creates `src/content/posts/my-article-title.md` with a template and `draft: true`. Edit the file, set `draft: false`, then publish.

### Manual method

Create a `.md` or `.mdx` file in `src/content/posts/`:

```bash
touch src/content/posts/my-article.md
```

The filename becomes the URL slug: `my-article.md` → `/posts/my-article/`

Add frontmatter and content:

```markdown
---
title: "My Article"
description: "Short description."
date: 2026-08-03
author: "Stalin S."
category: "Security Research"
tags:
  - web-security
hashtags:
  - "#WebSecurity"
draft: false
toc: true
---

Article content here.
```

Publish:

```bash
git add src/content/posts/my-article.md
git commit -m "publish: my article"
git push
```

---

## Frontmatter Reference

All frontmatter fields are documented in `templates/post.md`. Key fields:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✓ | Article title |
| `description` | ✓ | Short description (max ~160 chars) |
| `date` | ✓ | Publication date (YYYY-MM-DD) |
| `author` | | Author name (default: site author) |
| `category` | | Category (creates /category/<slug>/ automatically) |
| `tags` | | List of tags (creates /tag/<slug>/ automatically) |
| `hashtags` | | Hashtags with # (creates /hashtag/<normalized>/ automatically) |
| `featured` | | Show in featured section on homepage |
| `pinned` | | Pin to top of homepage |
| `draft` | | Hide from all public indexes |
| `series` | | Series name for multi-part articles |
| `seriesOrder` | | Part number within series |
| `cover` | | Cover image path |
| `toc` | | Show table of contents (default: true) |
| `noindex` | | Exclude from search engines and sitemap |

---

## Markdown Support

Full GitHub-Flavored Markdown (GFM):

- Headings H1–H6
- **Bold**, *italic*, ~~strikethrough~~
- Links, images
- Ordered and unordered lists
- Task lists (`- [x] Done`)
- Tables
- Blockquotes
- Footnotes
- Horizontal rules
- Inline code and fenced code blocks
- MDX (`.mdx` files) for custom components

### Code Blocks

Fenced code blocks with language identifiers:

````markdown
```python
def hello():
    return "world"
```
````

Supported languages: Python, JavaScript, TypeScript, Bash, Shell, C, C++, Java, Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, YAML, TOML, Dockerfile, PowerShell, Solidity.

Each code block gets a **COPY** button automatically.

---

## Images

Place images in `public/`:

```
public/
  images/
    my-image.png
```

Reference in Markdown:

```markdown
![Alt text describing the image](/images/my-image.png)
```

File downloads go in `public/files/`:

```markdown
[Download PDF](/files/report.pdf)
```

---

## Tags

Add tags to any post:

```yaml
tags:
  - web-security
  - api-security
  - linux
```

Tags automatically create:
- `/tags/` — all tags with counts
- `/tag/web-security/` — all articles with that tag

Tags are URL-slugified automatically. `Web Security` and `web-security` resolve to the same tag page.

---

## Hashtags

Hashtags are independent from tags — they create separate discoverable pages:

```yaml
hashtags:
  - "#CyberSecurity"
  - "#WebSecurity"
  - "#Linux"
```

The `#` prefix is optional in frontmatter. Hashtags automatically create:
- `/hashtags/` — all hashtags with counts
- `/hashtag/cybersecurity/` — all articles with that hashtag (case-insensitive match)

Clicking `#CyberSecurity` in an article opens `/hashtag/cybersecurity/`.

---

## Categories

Every article has one category:

```yaml
category: "Security Research"
```

Categories automatically create:
- `/categories/` — all categories with counts
- `/category/security-research/` — all articles in that category

---

## Series

Multi-part article series:

```yaml
series: "API Security Research"
seriesOrder: 1
```

Automatically creates:
- `/series/` — all series
- `/series/api-security-research/` — series index with all parts
- Series navigation box inside each article
- Previous/Next part links

---

## Featured and Pinned Posts

```yaml
featured: true   # Appears in "Featured" section on homepage
pinned: true     # Appears in "Pinned" section on homepage
```

Remove these fields (or set to `false`) to un-feature/unpin.

---

## Drafts

```yaml
draft: true
```

Draft posts:
- Never appear in production indexes, search, RSS, sitemap, or related posts
- Are visible during local development (`npm run dev`)
- Are **not** deployed to production

To publish a draft: set `draft: false` and push.

---

## Scheduled Posts

Set a future date:

```yaml
date: 2026-12-01
```

Posts with future dates do not appear until that date. The GitHub Actions workflow runs on a daily schedule (`0 6 * * *`) to publish scheduled posts automatically. No manual action required.

---

## Authors

Author data lives in `src/content/authors/<slug>.json`:

```json
{
  "name": "Stalin S.",
  "role": "Security Researcher · AI Engineer",
  "bio": "...",
  "social": {
    "github": "https://github.com/..."
  }
}
```

Author archive pages at `/author/stalin-s/` are generated automatically from the posts that reference the author name.

---

## Pages (About, Contact, etc.)

Create Markdown files in `src/content/pages/`:

```
src/content/pages/about.md         → /about/
src/content/pages/contact.md       → /contact/
src/content/pages/privacy.md       → /privacy/
```

Frontmatter for pages:

```yaml
---
title: "About"
description: "About this publication."
updated: 2026-08-01
---
```

---

## SEO

Automatically generated for every page:

- `<title>` with site name suffix
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter/X Card tags
- Article published/modified dates
- Schema.org structured data (BlogPosting, WebSite, Person, BreadcrumbList)

Override per-post:

```yaml
canonical: "https://original-source.com/article"
ogImage: "/images/custom-og.png"
noindex: true
```

---

## RSS

Available at `/rss.xml`.

Includes the 20 most recent published posts with title, description, date, author, category, and tags.

Configure in `src/config/site.ts`:

```typescript
rss: {
  title: 'My Blog',
  description: 'Feed description',
  feedItems: 20,
},
```

---

## Sitemap

Auto-generated at `/sitemap-index.xml` and `/sitemap-0.xml` by `@astrojs/sitemap`.

Includes all public, published pages. Excludes drafts, future posts, and `noindex: true` pages.

---

## Search

Static client-side search at `/search/`. No external service required.

Searches across: title, description, category, tags, hashtags, author, date.

Supports URL-based queries: `/search/?q=api+security`

---

## Redirects

When you change an article slug, add a redirect to `public/_redirects`:

```
# Netlify / Cloudflare Pages format
/posts/old-slug/ /posts/new-slug/ 301
```

For Vercel, add to `vercel.json`:

```json
{
  "redirects": [
    { "source": "/posts/old-slug/", "destination": "/posts/new-slug/", "permanent": true }
  ]
}
```

For GitHub Pages, the `404.astro` page handles soft redirects via JavaScript.

---

## Deployment

### GitHub Pages (Default)

1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow deploys automatically

The site deploys to `https://<username>.github.io/<repo>/` by default.

For a custom domain, add a `CNAME` file to `public/` with your domain:

```
blog.stalin.engineer
```

Then configure your DNS and set the custom domain in GitHub Pages settings.

### Cloudflare Pages

1. Connect your GitHub repository in the Cloudflare Pages dashboard
2. Set build command: `npm run build`
3. Set build output: `dist`
4. No environment variables required

The `public/_redirects` file is automatically processed.

### Vercel

```bash
# Link repository in Vercel dashboard, or:
vercel --prod
```

Build command: `npm run build`  
Output directory: `dist`

### Netlify

Connect repository. Build command: `npm run build`. Publish directory: `dist`.

The `public/_redirects` file is automatically processed.

---

## GitHub Actions

Two workflows are included:

**`deploy.yml`** — runs on push to `main` and on a daily schedule:
1. Checkout code
2. Install Node.js 20
3. Install dependencies (`npm ci`)
4. Validate content (`npm run validate`)
5. Type check (`npm run check`)
6. Build (`npm run build`)
7. Deploy to GitHub Pages

**`pr-check.yml`** — runs on pull requests:
1. Validates content
2. Type checks
3. Builds (no deploy)

---

## Custom Domain

1. Add a `CNAME` file to `public/`:
   ```
   blog.yourdomain.com
   ```
2. Configure your DNS provider with a CNAME record pointing to `<username>.github.io`
3. Set the custom domain in **Settings → Pages → Custom domain**
4. Update `siteURL` in `src/config/site.ts` to your domain

---

## Editing Articles

1. Edit the `.md` file
2. Commit and push:
   ```bash
   git add src/content/posts/my-article.md
   git commit -m "update: revised article title"
   git push
   ```

The `updated` frontmatter field is shown in the article if different from `date`.

---

## Deleting Articles

1. Delete the `.md` file:
   ```bash
   git rm src/content/posts/old-article.md
   git commit -m "remove: old article"
   git push
   ```

The article disappears from all indexes, RSS, search, and sitemap on the next build. If anyone had the old URL bookmarked, add a redirect in `public/_redirects`.

---

## Central Configuration

Edit `src/config/site.ts` to change:

- Site name, description, URL
- Author name and role
- Navigation links
- Social links
- Posts per page
- RSS settings
- Analytics integration point
- SEO defaults

---

## Analytics (Optional)

Analytics is disabled by default. To enable, edit `src/config/site.ts`:

```typescript
analytics: {
  enabled: true,
  provider: 'plausible',  // 'plausible' | 'umami' | 'goatcounter'
  scriptSrc: 'https://plausible.io/js/script.js',
  dataId: 'blog.yourdomain.com',
},
```

No external analytics are loaded unless explicitly enabled.

---

## Troubleshooting

**Post not appearing after push:**
- Check `draft: false` is set
- Check the `date` is not in the future
- Check the GitHub Actions workflow completed successfully
- Check for validation errors: `npm run validate`

**Duplicate ID warning during build:**
- A slug in frontmatter matches the filename — remove the `slug:` field and rename the file to match the desired URL

**Build fails with type errors:**
- Run `npm run check` locally to see the errors
- Ensure all required frontmatter fields are present

**Search not finding content:**
- Search runs client-side — make sure JavaScript is enabled
- Content is indexed at build time from the static search index

**Series navigation not showing:**
- Ensure all parts use the exact same `series:` string (case-sensitive)
- Ensure `seriesOrder:` is set to unique integers

**Images not showing:**
- Images in `public/` are served from the root: `/images/file.png` not `public/images/file.png`

---

## Content Validation

Run before pushing:

```bash
npm run validate
```

Checks:
- Required fields (title, description, date)
- Valid date format
- Duplicate slugs
- Description length
- Valid seriesOrder

The GitHub Actions workflow also runs validation and blocks deployment on errors.

---

*Built with Astro · Deployed via GitHub Actions*
