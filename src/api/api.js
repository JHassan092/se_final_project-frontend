const RAWG_API_KEY = "df91f870169e45eb9990b6d06c74456a";

const RAWG_BASE_URL = "https://api.rawg.io/api";

async function fetchGames(params = {}) {
  const url = new URL(`${RAWG_BASE_URL}/games`);
  console.log("Fetching:", url.toString());

  url.searchParams.set("key", RAWG_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return res.json();
}

async function fetchPopularGames({
  page = 1,
  page_size = 12,
  dates,
  ordering = "-released",
} = {}) {
  return fetchGames({ page, page_size, dates, ordering });
}

async function fetchGameDetail(gameId) {
  const url = new URL(`${RAWG_BASE_URL}/games/${gameId}`);
  url.searchParams.set("key", RAWG_API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return res.json();
}

async function fetchGenres() {
  const url = new URL(`${RAWG_BASE_URL}/genres`);
  url.searchParams.set("key", RAWG_API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return res.json();
}

async function fetchPlatforms() {
  const url = new URL(`${RAWG_BASE_URL}/platforms`);
  url.searchParams.set("key", RAWG_API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return res.json();
}

async function searchGames({ query, page = 1, page_size = 12 }) {
  return fetchGames({ search: query, page, page_size });
}

export {
  fetchGames,
  fetchPopularGames,
  fetchGameDetail,
  fetchGenres,
  fetchPlatforms,
  searchGames,
};
