<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlast

Travel-agency marketing site: Next.js 16 App Router, JavaScript/JSX, React 19 with React Compiler (`reactCompiler: true` in `next.config.mjs`), Tailwind v4, and shadcn `base-nova` UI. No backend, database, or auth code lives in this repo — the UI calls an external API at `http://localhost:8000` (see below).

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack).
- `npm run lint` — bare ESLint over the repo; `next lint` no longer exists. It currently exits non-zero on two pre-existing errors (see Known WIP).
- `npx eslint src/app/page.js` — lint one file.
- `npm run build` — production build. **The external API at `http://localhost:8000` must be running first**: `/destinations` is prerendered, and `AllDestination.jsx` fetches the API during the build and throws if it is unreachable.
- Use npm (`package-lock.json`); there is no test or typecheck script.

## Structure

- Routes live in `src/app`; each page exports its own `metadata` (canonical + OpenGraph/Twitter) — copy the pattern from an existing page.
- `layout.js` renders `Navbar` + `Footer` directly around every route. The `SiteChrome` component in `src/components/common/site-chrome.jsx` (which would skip chrome for `AUTH_ROUTES = {"/sign-up"}`) is imported there but currently unused — auth pages do get the chrome today. Don't wire or delete it without being asked.
- The `Navbar` is `fixed` (`inset-x-5 top-5`), which is why pages offset their content with `mt-20`. New top-level pages need the same offset.
- `@/*` maps to `src/*`. The codebase is JS/JSX only — no TypeScript toolchain.
- Feature folders: `src/components/home/*`, `src/components/common/*`, `src/components/destinations/`, `src/components/auth/` (sign-in/sign-up forms), and `src/components/addDestinatonPage/` — that last one is misspelled ("Destinaton"); match existing imports rather than renaming.
- `src/components/ui/*` are shadcn registry components built on Base UI (`@base-ui/react`), not Radix. `components.json` has `tsx: false`, so new components are `.jsx`.
- Tailwind v4 is wired through the `@tailwindcss/turbopack` loader rule in `next.config.mjs`; do not add `tailwind.config.*` or PostCSS config. Theme tokens and imports live in `src/app/globals.css`.
- Visual language: `font-serif` (Prata) headings, `cyan-600` accent, zinc neutrals. Inside `Button`, icons use `data-icon="inline-start"` or `"inline-end"`.
- Images: local assets are in `public/images`. Optimized image `quality` must be one of `75`, `80`, `90` (`images.qualities` in `next.config.mjs` — Next 16 rejects others). Remote HTTPS hosts are allow-listed (`remotePatterns: { protocol: "https", hostname: "**" }`).

## External API (`http://localhost:8000`, not in this repo)

Endpoints and callers, verified in code:

- `GET /` — `src/components/destinations/AllDestination.jsx` (server component; **throws on failure, breaks `npm run build`**) and `src/components/home/featured-destinations.jsx` (client, has loading/error/retry states — the home page survives API downtime). Accepts a plain array or `{ destinations: [...] }`.
- `GET /add-destination/:id` — `src/app/destinations/[id]/page.jsx` (route is dynamic, server-rendered).
- `POST /add-destination` — `AddDestinationPage.jsx` form. `POST /update-destination/:id` and `POST /delete-destination/:id` — `Dialog.jsx` / `DeleteBtn.jsx` in `src/components/destinations/`.
- Categories are hardcoded in `AddDestinationPage.jsx`.
- `src/data/destinations.json` is unused.
- Many nav/footer/card links (`/my-bookings`, `/admin`, `/my-profile`, `/help-center`, `/forgot-password`, ...) have no route yet.

## Known WIP (re-check before relying)

- `npm run lint` has two pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.jsx` and `src/hooks/use-mobile.js`. Don't rewrite generated UI just for these unless asked.
- `README.md` is create-next-app boilerplate (it points to `app/page.js`, but the real file is `src/app/page.js`); trust config and scripts over it.
