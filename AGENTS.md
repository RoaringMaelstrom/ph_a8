<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js 16.4.4 App Router, React 19, TypeScript strict, npm (`package-lock.json`).
- No `src/` directory: app code lives in `app/` at the repo root, and `@/*` maps to the repo root (`@/lib/auth`, `@/components/ui/button`).
- Next 16's docs are vendored in `node_modules/next/dist/docs/`; check them instead of relying on older Next.js knowledge.

## Commands

```bash
npm run dev                  # next dev (also rewrites the block at the top of this file)
npm run lint                 # eslint flat config
npm run lint -- app/page.tsx # lint a single file
npx tsc --noEmit             # typecheck; there is no typecheck npm script
npm run build                # full verification, including Cache Components prerender checks
```

There is no test runner configured. Verify changes with lint, `tsc`, and `build`. `build` currently fails while collecting `/api/auth/[...all]` because `BETTER_AUTH_DB_URL` is unset, so configure the auth env vars before using it as a pass/fail gate.

## Next.js quirks

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Runtime data reads (`cookies()`, `headers()`, auth sessions) must sit behind a `<Suspense>` boundary or the build fails. Cache server work with `"use cache"` plus `cacheLife()`.
- `params` and `searchParams` are Promises. Prefer the generated global `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers (no import), as in `app/layout.tsx`.
- Keep route handlers and pages under `app/`; the better-auth catch-all is `app/api/auth/[...all]/route.ts`.

## Auth

- Server config is `lib/auth.ts` (better-auth + MongoDB adapter); the API handler is already mounted, and browser helpers are in `lib/auth-client.ts`.
- Never import `lib/auth.ts` into client components — it creates a `MongoClient` and reads secrets. Use `lib/auth-client.ts` for `signIn`, `signUp`, `signOut`, and `useSession`.
- `lib/auth.ts` requires `BETTER_AUTH_DB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET`. The current `.env` only defines `BETTER_AUTH_URL`; add the rest before testing auth.
- `lib/auth-client.ts` reads `process.env.BETTER_AUTH_URL`, but non-`NEXT_PUBLIC_` variables are not exposed to the browser. Omit `baseURL` to use the current origin, or introduce a `NEXT_PUBLIC_` variable.

## UI and styling

- Tailwind v4 is configured CSS-first in `app/globals.css` (no `tailwind.config`); the Turbopack CSS loader is wired in `next.config.ts`. daisyUI and `tw-animate-css` are enabled.
- shadcn is configured in `components.json` with the `base-vega` style and Base UI primitives (`@base-ui/react`), not Radix. Put components in `components/ui/` and import from `@/components/ui/...`.
- `cn` is re-exported from the `cn` package via `@/lib/utils`; do not add `clsx` or `tailwind-merge`.
