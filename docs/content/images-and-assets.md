# Images and static assets

Anything in `public/` is copied to the site root unchanged.

```
public/
  icon/      logo.svg, logo.png, favicon.svg, favicon.png
  images/    article images
  _redirects Netlify / Cloudflare redirect rules
```

## In a post

```markdown
![Burp Repeater showing the 200 response](/images/my-image.png)
```

- Paths start with `/` and are relative to `public/`.
- Always write alt text.
- Downloadable files go in `public/files/` and are linked as `/files/report.pdf`.

## Cover and social images

- `cover` sets the article cover and is also used as the Open Graph image.
- `ogImage` overrides the social image only.
- If neither is set, `SITE.defaultOGImage` (`/og-default.png`) is used.

Compress screenshots before committing. They are served as-is.
