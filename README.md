# SE Final Project — Frontend

A React frontend for the SE final project: a games catalogue using the RAWG API. Built with Vite, React (hooks), React Router v6 and plain CSS. The app includes search, filtering (platforms & genres), game details modal, and a favorites list persisted to localStorage.

## Features

- Browse popular games (paginated)
- Search and filter by platform and genre
- Game detail modal with similar games
- Mark/unmark favorites (persisted in `localStorage`)
- Responsive layout with a header and a collapsible filter sidebar

## Tech Stack

- React (functional components + hooks)
- React Router v6
- Vite (dev server, build)
- Plain CSS (files under `src/blocks/`)
- RAWG API for game data

## Prerequisites

- Node.js 18+ and npm (or yarn)
- Internet access for the RAWG API

## Setup — Local Development

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

The Vite dev server will print the local URL (commonly `http://localhost:5173` or `http://localhost:5174` if 5173 is occupied).

3. Open the app in your browser and test responsiveness at common breakpoints (e.g. 768px, 480px, 360px).

## Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment / API Key

The project currently uses the RAWG API. There is a key visible in `src/api/api.js` for convenience during development. For production or private repos you should:

- Move the API key to an environment variable (e.g. `VITE_RAWG_API_KEY`) and update `src/api/api.js` to read from `import.meta.env.VITE_RAWG_API_KEY`.

Example `.env` (local only — do NOT commit):

```text
VITE_RAWG_API_KEY=your_rawg_api_key_here
```

## Project Structure (important files)

- `index.html` — Vite entry
- `src/main.jsx` — React entry
- `src/components/` — React components (App, Header, Home, GameCard, GameModal, etc.)
- `src/blocks/` — CSS files for components
- `src/api/api.js` — RAWG API helpers (fetchPopularGames, fetchGameDetail, fetchGenres, fetchPlatforms, searchGames)
- `src/context/` — React Contexts (e.g. `FavoritesContext.jsx`)

## Development Notes / Known Behaviors

- Favorites are stored in `localStorage` via `FavoritesContext`.
- Header and FilterSidebar are lifted to `App.jsx` so they persist across routes (including `/favorites`).
- Mobile UX: header includes a hamburger menu and the filter sidebar has a mobile toggle.
- If you see a horizontal scrollbar on mobile/tablet, try these steps:
  - Verify viewport width in DevTools and test at 768px, 480px, and 360px.
  - The app includes `overflow-x: hidden` in `src/index.css` as a protective measure; we can instead instrument the DOM to find offending elements if you want to fix the root cause.

## Scripts (from `package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
