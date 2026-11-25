# Post file naming

The post file name is the default URL slug, so choose it deliberately.

- Use lowercase letters, digits and hyphens: `otp-rate-limit-bypass.md`.
- Avoid spaces, underscores and punctuation.
- Extensions `.md` and `.mdx` are both accepted; the extension is stripped from the slug.
- The name must be unique. Two files that resolve to the same slug fail `npm run validate`.

## Existing examples

| File | URL |
| --- | --- |
| `cve-2026-117425.md` | `/posts/cve-2026-117425/` |
| `insecure-ipc-channel-electron.md` | `/posts/insecure-ipc-channel-electron/` |

Some older files use mixed case (for example `AI-as-an-Attack-Surface.md`). They work, but new posts should stay lowercase.

If a published URL has to change, add a redirect. See [redirects](../routes/redirects.md).
