# Markdown support

`astro.config.mjs` enables GitHub-Flavored Markdown (`gfm: true`).

## Supported

- Headings H1 to H6 (H2 to H4 feed the table of contents)
- Bold, italic, strikethrough
- Links and images
- Ordered, unordered and task lists
- Tables
- Blockquotes
- Footnotes
- Horizontal rules
- Inline code and fenced code blocks with syntax highlighting
- MDX components in `.mdx` files

## Rendering

Markdown is rendered by Astro. Code blocks are highlighted by Shiki with the `github-light` theme and a `github-dark` variant. See [code blocks](code-blocks.md).

## Tips

- Start the body at H2. The article title is rendered as the page H1.
- Give images meaningful alt text.
- Keep one blank line around tables and code fences.
