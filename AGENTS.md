<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Client-only Next.js 16.4.4 App Router app (React 19.3, TypeScript strict, npm). The Express/MongoDB API is a separate repo; `.env` sets `NEXT_PUBLIC_API_URL=http://localhost:5000`. Only `/api/auth/[...all]` and `/api/db-check` (a Mongo connectivity diagnostic, not app logic) run here.
- No `src/`: app code lives in `app/`, and `@/*` maps to the repo root (`@/lib/auth`, `@/components/ui/button`).
- Spec is `B14-A8-Cat_Harry.md` + `Project_requirements.pdf` (both gitignored, local-only). `README.md` is untouched create-next-app boilerplate — ignore it.

## Commands

```bash
npm run dev                  # next dev; regenerates the managed block above
npm run lint                 # eslint flat config, repo-wide
npm run lint -- app/page.tsx # lint a single file
npx tsc --noEmit             # typecheck; there is no typecheck npm script
npm run build                # production gate; needs the API running (see below)
```

- No test runner, formatter, or CI config. Verification = `npm run lint`, `npx tsc --noEmit` (currently passes), `npm run build`.
- Lint baseline: exits 1 on exactly three pre-existing errors — `react/no-unescaped-entities` at `components/Landing/CategorySelection.tsx:66`, and `react-hooks/set-state-in-effect` in `components/ui/carousel.tsx` and `hooks/use-mobile.ts`. The other 16 findings are warnings (`<img>`, unused vars). Don't chase generated shadcn code.
- `npm run build` prerenders `/`, whose `FeaturedSection` uses `"use cache"` and fetches `${NEXT_PUBLIC_API_URL}/studios/featured`. With the API down the build fails with `ECONNREFUSED`; start the Express API first. (`/studios` and nested routes are partial prerender and fetch at request time.)

## Data flow / API

- No shared API client: pages call `fetch` inline with locally declared response interfaces. Match that pattern rather than introducing a client abstraction for one page.
- Browser mutations get a JWT via `const { data } = await authClient.token()` and send `Authorization: Bearer ${data.token}` to Express (see `add-studio`, `dashboard`, `my-bookings`, `my-listings`, `studios/edit/[id]`, `studios/[id]/booking`).
- Endpoints in use: `/studios`, `/studios/featured`, `/studios/:id`, `/studios/mine`, `/studios/mine/:id`, `/studios/:id/availability?date=`, `/bookings`, `/bookings/mine`, `/bookings/:id/cancel`.
- Server Components: `app/(main)/studios/page.tsx` awaits `connection()` inside `<Suspense>` (request-time, `cache: "no-store"`); `FeaturedSection` and `studios/[id]` use `"use cache"` + `cacheLife("days")`, so their data is baked at build and revalidated daily.

## Routing / guards

- `proxy.ts` is Next 16's middleware (there is no `middleware.ts`; build lists "Proxy (Middleware)"). It imports `auth` from `@/lib/auth` and redirects unauthenticated requests to `/sign-in`.
- Its matcher is `/profile`, `/studios/:path*`, `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`. Add new private routes there. Note `/studios/:path*` also gates the public detail/booking pages, not just edit.
- `dashboard`, `my-bookings`, `my-listings`, `add-studio`, and `studios/edit/[id]` also `router.replace("/sign-in")` client-side; `/profile` relies on `proxy.ts` alone, so keep proxy and page guards in sync.
- `(auth)` and `(main)` are URL-invisible and inherit the root layout (Navbar/Footer/Toaster).

## Auth

- `lib/auth.ts` is server-only: better-auth + MongoDB adapter (database `StudioSpace`), email/password + Google with account linking, JWT plugin, 15-day JWT cookie cache. Required env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- `lib/auth.ts` hard-codes `trustedOrigins` to `http://localhost:3000` plus a Vercel URL; add your origin there if you run on a different port/host.
- Never import `lib/auth.ts` into a client component (it creates a `MongoClient`). Use `lib/auth-client.ts` for `signIn`, `signUp`, `updateUser`, `signOut`, `useSession`, `token`.
- `lib/auth-client.ts` passes `process.env.BETTER_AUTH_URL` as `baseURL`; non-`NEXT_PUBLIC_` vars are `undefined` in the browser, so Better Auth falls back to the page origin. Don't hard-code `localhost:3000`.
- Better Auth is mounted with `toNextJsHandler(auth)` in `app/api/auth/[...all]/route.ts`; keep route handlers under `app/`.

## Next.js quirks

- `next.config.ts` enables `cacheComponents` + `partialPrefetching` and loads Tailwind through `@tailwindcss/turbopack`. Next 16 docs are vendored in `node_modules/next/dist/docs/`; check them rather than relying on older Next.js knowledge.
- With `cacheComponents`, request-time reads (`cookies()`, `headers()`, uncached `fetch`, `connection()`) must sit inside `<Suspense>`, or use `"use cache"` + `cacheLife()`. Otherwise the build fails.
- `params` and `searchParams` are Promises. Prefer the generated global `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers (no import; see `app/layout.tsx`).
- `next/image` allows only `images.unsplash.com`; studio images are user-supplied plain `<img>`. Don't convert them without extending `images.remotePatterns`.

## UI and styling

- Tailwind v4 is CSS-first in `app/globals.css` (no `tailwind.config`). The file currently duplicates the `@import`/`@plugin daisyui`/`studiospace` theme and the `@theme` brand blocks verbatim — editing only the first copy has no effect, so update both (or the later one).
- daisyUI is the primary component system (`btn`, `input`, `bg-base-100`); shadcn/Base UI components live in `components/ui/` (base-vega style, `@base-ui/react`, not Radix).
- Themes are `studiospace` and `studiospace-dark`; `next-themes` maps `light`/`dark` via `attribute="data-theme"` in `components/Context/ThemeProvider.tsx`. Prefer daisyUI tokens over raw Tailwind colors.
- `cn` is re-exported from the `cn` package via `@/lib/utils`; don't add `clsx` or `tailwind-merge`.
- User feedback uses `react-hot-toast` (`<Toaster>` in the root layout); don't use `alert()`.
