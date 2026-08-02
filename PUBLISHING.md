# How to Publish a Writeup

---

## 1. Create the post file

Go to `src/content/posts/` and create a new `.md` file.

The filename becomes the URL — use lowercase and hyphens only:

```
src/content/posts/otp-bypass-writeup.md       → /posts/otp-bypass-writeup/
src/content/posts/cve-2026-1234.md            → /posts/cve-2026-1234/
src/content/posts/api-auth-bypass.md          → /posts/api-auth-bypass/
```

---

## 2. Add frontmatter at the top

Every post starts with a frontmatter block between `---` markers.
Copy this and fill it in:

```markdown
---
title: "Your Writeup Title"
description: "One or two sentences about what this covers."
date: 2026-08-03
author: "w4nn4d13"
category: "Security Research"
tags:
  - web-security
  - api-security
hashtags:
  - "#WebSecurity"
  - "#BugBounty"
draft: false
toc: true
---

Your writeup content starts here.
```

### Frontmatter fields explained

| Field | Required | What it does |
|-------|----------|--------------|
| `title` | YES | Title of the post |
| `description` | YES | Short summary — shown in indexes and feed.json |
| `date` | YES | Publication date — format: `YYYY-MM-DD` |
| `author` | no | Defaults to `w4nn4d13` |
| `category` | no | Groups posts — creates `/category/security-research/` automatically |
| `tags` | no | List of tags — creates `/tag/web-security/` automatically |
| `hashtags` | no | Hashtags — creates `/hashtag/websecurity/` automatically |
| `draft` | no | `true` = never published, `false` = live |
| `featured` | no | `true` = shown in Featured section on homepage |
| `pinned` | no | `true` = pinned to top of homepage |
| `series` | no | Name of a multi-part series |
| `seriesOrder` | no | Part number: `1`, `2`, `3`… |
| `cover` | no | Cover image path: `/images/my-cover.png` |
| `toc` | no | `true` = show table of contents sidebar |

---

## 3. Write the content

After the closing `---` write your post in standard Markdown.

### Headings

```markdown
## Section Heading
### Subsection
#### Sub-subsection
```

H2 and H3 headings automatically appear in the Table of Contents sidebar.

### Code blocks

Always specify the language for syntax highlighting:

````markdown
```python
def exploit():
    pass
```

```bash
curl -s https://target.com/api/user/1337
```

```http
GET /api/user/1337 HTTP/1.1
Host: target.com
Authorization: Bearer <your_token>
```
````

Supported languages: `python` `javascript` `typescript` `bash` `shell` `go` `rust` `c` `cpp` `java` `php` `ruby` `sql` `html` `css` `json` `yaml` `toml` `dockerfile` `powershell` `solidity`

Each code block gets a COPY button automatically.

### Lists

```markdown
- Item one
- Item two
  - Nested item

1. First step
2. Second step
3. Third step
```

### Bold, italic, strikethrough

```markdown
**bold**
*italic*
~~strikethrough~~
`inline code`
```

### Blockquote

```markdown
> This is a blockquote. Good for callouts or notes.
```

### Table

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

### Horizontal rule

```markdown
---
```

---

## 4. Adding images

### Step 1 — Put the image in `public/images/`

```
BLOG-CMS/
└── public/
    └── images/
        └── my-screenshot.png   ← put it here
```

Create the `images/` folder inside `public/` if it doesn't exist yet:

```bash
mkdir -p public/images
```

Then copy your image into it:

```bash
cp ~/Downloads/screenshot.png public/images/screenshot.png
```

### Step 2 — Reference it in the post

```markdown
![Alt text describing the image](/images/screenshot.png)
```

The path starts with `/images/` — NOT `public/images/`. The `public/` folder is the web root.

### Example

```markdown
## Proof of Concept

Sending the request with a modified email casing:

![Burp Suite showing the modified request](/images/burp-request.png)

The server responds with a fresh OTP despite the rate limit:

![Server response showing 200 OK](/images/server-response.png)
```

### Cover image

To set a cover image that shows at the top of the post and in Open Graph:

```markdown
---
title: "My Writeup"
cover: "/images/my-cover.png"
---
```

### Supported image formats

`.png` `.jpg` `.jpeg` `.gif` `.webp` `.svg`

### Image tips

- Keep screenshots under 1MB where possible
- Use descriptive alt text — it shows if the image fails to load and helps screen readers
- Name files clearly: `burp-idor-request.png` not `screenshot1.png`

---

## 5. Publish

Once the file is ready and `draft: false`:

```bash
git add src/content/posts/your-post.md

# If you added images, include them too:
git add public/images/

git commit -m "publish: your writeup title"
git push
```

GitHub Actions runs automatically. In about 1–2 minutes the post is live at:

```
/posts/your-post-filename/
```

---

## 6. Edit a published post

Open the `.md` file, make your changes, then:

```bash
git add src/content/posts/your-post.md
git commit -m "update: fixed typo in writeup"
git push
```

The live post updates on the next build.

---

## 7. Delete a post

```bash
git rm src/content/posts/your-post.md
git commit -m "remove: old writeup"
git push
```

It disappears from the site, feed.json, RSS, search, and all indexes automatically.

---

## 8. Keep it as a draft

Set `draft: true` in frontmatter. The file exists in the repo but never appears on the live site, in RSS, feed.json, search, or sitemap. When you're ready to publish, flip it to `draft: false` and push.

---

## Quick example — full writeup file

```markdown
---
title: "OTP Rate Limit Bypass via Email Case Normalization"
description: "How inconsistent email normalization between the rate limiter and delivery logic allows unlimited OTP requests."
date: 2026-08-03
author: "w4nn4d13"
category: "Web Application Security"
tags:
  - rate-limiting
  - otp
  - authentication
hashtags:
  - "#WebSecurity"
  - "#BugBounty"
  - "#Authentication"
draft: false
toc: true
---

## Summary

The rate limiter keys on the raw email string. The OTP delivery
logic normalizes case before looking up the mailbox. These two
components disagree on what "the same identity" means.

## Steps to Reproduce

1. Submit `victim@mail.com` — rate limited after 15 requests.
2. Submit `VICTIM@mail.com` — fresh bucket, 15 more requests.
3. Repeat with any casing variation.

![Burp Suite showing the request with modified casing](/images/burp-otp-bypass.png)

## Impact

Rate limit is effectively bypassed. Unlimited OTPs can be
sent to any account.

## Remediation

Normalize the email to lowercase before it reaches the rate
limiter — same as the delivery layer does.
```

---

## Where things end up

| What you do | What gets updated automatically |
|-------------|--------------------------------|
| Add post | Homepage, Latest, Category, Tags, Hashtags, Archive, Search, RSS, feed.json, Sitemap |
| Edit post | All of the above reflect the changes |
| Delete post | Removed from all of the above |
| Add `featured: true` | Appears in Featured section on homepage |
| Add `pinned: true` | Pinned to top of homepage |
