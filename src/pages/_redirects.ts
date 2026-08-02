// Redirect support for Netlify/Cloudflare Pages
// For GitHub Pages, configure redirects via meta refresh in 404.astro
// For Vercel, add vercel.json with redirects array

// REDIRECTS configuration — add entries when article slugs change
// Format: { from: '/old-path/', to: '/new-path/', status: 301 }
export const REDIRECTS: Array<{ from: string; to: string; status: 301 | 302 }> = [
  // Example:
  // { from: '/posts/old-article-name/', to: '/posts/new-article-name/', status: 301 },
];
