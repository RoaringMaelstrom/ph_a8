<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- This repo is the **client only**: Next.js 16.4.4 App Router, React 19, TypeScript strict, npm (`package-lock.json`). The Express/MongoDB API it consumes is not here; `.env` points `NEXT_PUBLIC_API_URL` at `http://localhost:5000`. Only `/api/auth/[...all]` and `api/db-check` run in this repo.
- No `src/` directory: app code lives in `app/`, and `@/*` maps to the repo root (`@/lib/auth`, `@/components/ui/button`).
- Product/assignment spec is `B14-A8-Cat_Harry.md` (local and gitignored) plus `Project_requirements.pdf`; read it before implementing feature behavior.

## Commands

```bash
npm run dev                  # next dev; also rewrites the managed block above
npm run lint                 # eslint flat config (repo-wide)
npm run lint -- app/page.tsx # lint a single file
npx tsc --noEmit             # typecheck; there is no typecheck npm script
npm run build                # production gate
```

- There is no test runner, formatter, or CI config. `npx tsc --noEmit` currently passes.
- `npm run lint` currently exits 1 on three pre-existing errors: an unescaped `'` in `components/Landing/CategorySelection.tsx`, and `react-hooks/set-state-in-effect` in `components/ui/carousel.tsx` and `hooks/use-mobile.ts`. Treat those as the baseline instead of chasing generated shadcn code; the remaining output is warnings (`<img>`, unused vars).
- `npm run build` currently fails during prerender (types pass): `/` and `/studios` call `fetch(..., { cache: "no-store" })` in async Server Components outside `<Suspense>` while `cacheComponents` is enabled. Wrap the data access in `<Suspense>`, cache it with `"use cache"`, or set `export const instant = false` on the route.

## Data flow

- Browser pages call the external API at `NEXT_PUBLIC_API_URL` for studios, listings, and bookings. Protected mutations get a JWT from `authClient.token()` and send `Authorization: Bearer <token>` to Express (see `app/(main)/add-studio/page.tsx` and `my-bookings/page.tsx`).
- Server Components (`components/Landing/FeaturedSection.tsx`, `app/(main)/studios/page.tsx`, `studios/[id]/page.tsx`) fetch the same API directly, using `cache: "no-store"` or `next.revalidate`. Keep the `cacheComponents` constraint above in mind when editing them.
- `proxy.ts` is Next 16's renamed middleware (there is no `middleware.ts`). It redirects unauthenticated users for `/profile`, `/studios/*`, `/dashboard`, `/add-studio`, `/my-listings`, and `/my-bookings`; add new private routes to its `config.matcher`.
- Route groups `(auth)` and `(main)` are URL-invisible and share the root layout (Navbar/Footer). Private pages also redirect via `useSession()` on the client; keep `proxy.ts` and page-level guards in sync.

## Auth

- `lib/auth.ts` is better-auth + the MongoDB adapter (database `StudioSpace`): email/password and Google only, JWT plugin, cookie cache. Required env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. `.env` is gitignored and populated locally.
- Never import `lib/auth.ts` (creates a `MongoClient` and reads secrets) into client components. Use `lib/auth-client.ts` for `signIn`, `signUp`, `updateUser`, `signOut`, `useSession`, and `token`.
- `lib/auth-client.ts` passes `process.env.BETTER_AUTH_URL` as `baseURL`; non-`NEXT_PUBLIC_` vars are not exposed to the browser, so this is `undefined` client-side. Better Auth falls back to the current origin, which works for this same-origin setup — don't hard-code `localhost:3000`.
- Better Auth is mounted with `toNextJsHandler(auth)` in `app/api/auth/[...all]/route.ts`; keep route handlers under `app/`.

## Next.js quirks

- `next.config.ts` enables `cacheComponents` and `partialPrefetching` and wires the `@tailwindcss/turbopack` CSS loader. Next 16 docs are vendored in `node_modules/next/dist/docs/`; check them rather than relying on older Next.js knowledge.
- Runtime reads (`cookies()`, `headers()`, sessions, uncached `fetch`) must sit behind `<Suspense>` or the build fails. `params` and `searchParams` are Promises; prefer the generated global `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers (no import), as in `app/layout.tsx`.
- `next/image` remote hosts are allowlisted only for `images.unsplash.com`. Most of the app uses plain `<img>` for user-supplied studio images; don't switch those blindly without updating `images.remotePatterns`.

## UI and styling

- Tailwind v4 is CSS-first in `app/globals.css` (no `tailwind.config`). daisyUI is the primary component system (`btn`, `input`, `bg-base-100`, etc.); shadcn/Base UI components live in `components/ui/`.
- Custom daisyUI themes are `studiospace` and `studiospace-dark`; `next-themes` maps `light`/`dark` to them with `attribute="data-theme"` in `components/Context/ThemeProvider.tsx`. Prefer daisyUI tokens over raw Tailwind colors so themes keep working.
- shadcn is configured in `components.json` with the `base-vega` style and Base UI primitives (`@base-ui/react`), not Radix. Import from `@/components/ui/...`.
- `cn` is re-exported from the `cn` package via `@/lib/utils`; do not add `clsx` or `tailwind-merge`.
- User feedback uses `react-hot-toast` with `<Toaster>` mounted in the root layout; do not use `alert()`.
