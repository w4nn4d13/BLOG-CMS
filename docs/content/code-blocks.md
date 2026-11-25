# Code blocks

Use fenced code blocks with a language identifier:

````markdown
```python
def hello():
    return "world"
```
````

## Highlighting

Shiki highlights blocks at build time. `astro.config.mjs` sets:

- light theme `github-light`, dark theme `github-dark`
- `wrap: false` (long lines scroll instead of wrapping)

## Configured languages

python, javascript, typescript, bash, shell, c, cpp, java, go, rust, php, ruby, sql, html, css, json, yaml, toml, dockerfile, powershell, solidity.

To add another language, append its identifier to `markdown.shikiConfig.langs` in `astro.config.mjs`.

## Copy button

Rendered code blocks get a COPY button (`.code-copy-btn` in `global.css`).

## Security write-ups

Use `bash` for commands and payloads, and `json` for response bodies.
