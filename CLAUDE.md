# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.js`)

There is no test framework configured.

## Environment variables

The app requires a `.env` file at the project root with two CoinGecko API URLs, and their formats differ:

- `VITE_COINS_API_URL` — the markets list endpoint **including its query string** (e.g. `...coins/markets?vs_currency=usd`). `App.jsx` appends `&order=...&per_page=...` directly, so a trailing `?...` must already be present.
- `VITE_COIN_API_URL` — the bare coins base endpoint (no query string). Consumers append `/{id}` and `/{id}/market_chart?...`.

## Architecture

Single-page React 19 app (JSX, no TypeScript) bootstrapped in `src/main.jsx`, which wraps `App` in `BrowserRouter`.

- **Routing**: react-router v7 — import from `react-router`, not `react-router-dom`. All routes are declared in `src/App.jsx`: `/` (home), `/about`, `/coin/:id` (details), `*` (not found).
- **State**: no state library or context. The coin list state (`coins`, `loading`, `error`, `limit`, `filter`, `sortBy`) lives in `App.jsx` and is passed to `HomePage` via props. Only `limit` triggers a refetch; filtering and sorting happen client-side in `src/pages/home.jsx`.
- **Data fetching**: plain `fetch` inside `useEffect`, with `loading`/`error` state per fetch. `App.jsx` fetches the coin list; `src/pages/coin-details.jsx` and `src/components/CoinChart.jsx` each fetch their own data from `VITE_COIN_API_URL`.
- **Charts**: `CoinChart.jsx` uses react-chartjs-2. Chart.js is tree-shaken — any new scale/element/plugin must be added to the `ChartJS.register(...)` call. The x-axis is a time scale that depends on the `chartjs-adapter-date-fns` import.
- **Styling**: one global stylesheet, `src/index.css`, using plain class names (no CSS modules or framework).
