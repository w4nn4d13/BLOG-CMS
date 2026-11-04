# Domain routing

The primary website uses its original Netlify project, with `w4nn4d13.in` set as
the primary domain and `w4nn4d13.tech` retained as an alias. Cloudflare redirects
old apex/www requests and new www requests to the new apex.

The advisory and AttackGraph websites remain on their original Netlify projects.
`netlify-subdomain-router` forwards their `.in` requests to the corresponding
production branch aliases over verified HTTPS. Those branch aliases follow the
normal Git deployments, so future content updates do not require router changes.
The hostname map is fixed; incoming paths, query strings, methods, and existing
response/security headers are preserved.

Cloudflare routes:

- `advisory.w4nn4d13.in/*` -> `main--fluffy-nougat-9a448e.netlify.app`
- `attackgraph.w4nn4d13.in/*` -> `website--fluffy-donut-5ea1b7.netlify.app`

Netlify's three-domain-changes-per-hour limit prevented additional native aliases
during migration. The public addresses work through this routing. Adding native
Netlify aliases later is optional; do not remove these routes until replacement
hostnames, certificates, pages and assets have been verified at their origin.

Run the router's behavior checks with:

```sh
node --test infrastructure/cloudflare/netlify-subdomain-proxy.test.mjs
```

Deploy to the existing Cloudflare account with an authenticated Wrangler session:

```sh
npx wrangler deploy --config infrastructure/cloudflare/wrangler.jsonc
```

`configuration-rules.json` records the zone configuration rule that suppresses
Cloudflare analytics injection on AttackGraph and chat, whose existing CSP blocks
that script. The Content Security Policies remain strict. Keep this rule scoped
to those hostnames.

For rollback, retain the old DNS and Netlify projects. To restore old-host page
serving, first remove the matching forced redirects from the relevant Netlify
configuration and deploy that corrective commit, then disable the corresponding
Cloudflare redirect. Removing only a Cloudflare redirect leaves the Netlify
redirect active. Restore old public service before removing a new `.in` route.
