# Path aliases

`tsconfig.json` extends `astro/tsconfigs/strict` and defines import aliases relative to the repository root.

| Alias | Resolves to |
| --- | --- |
| `@/*` | `src/*` |
| `@config/*` | `src/config/*` |
| `@utils/*` | `src/utils/*` |
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@styles/*` | `src/styles/*` |

The codebase mainly uses `@/`, for example `import { SITE } from '@/config/site'`. `src/components/` does not exist yet; the alias is reserved for future shared components.

`strictNullChecks` is on. Run `npm run typecheck` (`tsc --noEmit`) or `npm run check` (`astro check`) to verify types.
