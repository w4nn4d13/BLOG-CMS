# Post template

`templates/post.md` is the starting point for every new article. `scripts/new-post.js` reads it, so edit the template to change what new posts contain.

## Structure

Each field has a comment that says whether it is REQUIRED or OPTIONAL:

- required: `title`, `description`, `date`, `draft`
- optional: `slug`, `updated`, `author`, `category`, `tags`, `hashtags`, `featured`, `pinned`, `series`, `seriesOrder`, `cover`, `ogImage`, `canonical`, `toc`, `comments`, `noindex`

## What the script rewrites

The script replaces three lines with regular expressions: the title, the `date: 2026-08-03` line and `draft: false`. If you change those lines in the template, update the matching patterns in `scripts/new-post.js`, or the script will stop substituting them.

## Body

The template ends with a short placeholder body. Replace it and start sections at H2.
