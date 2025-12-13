import { useEffect, useState } from "react";
import { fetchGames, fetchPopularGames, searchGames } from "../api/api.js";

import GameGrid from "./GameGrid.jsx";
import GameModal from "./GameModal.jsx";

import "../blocks/Home.css";
import { Preloader } from "./Preloader.jsx";

export default function Home({ selectedPlatform, selectedGenre, searchQuery }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [activeModalId, setActiveModalId] = useState(null);

  const loadGames = async () => {
    const isInitialLoad = page === 1 && !hasFetchedOnce;
    if (isInitialLoad) {
      setInitialLoading(true);
    } else {
      setScrollLoading(true);
    }

    try {
      const today = new Date().toISOString().split("T")[0];
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const startDateStr = startDate.toISOString().split("T")[0];

      const params = {
        page,
        page_size: 20,
        ...(selectedPlatform && { platforms: selectedPlatform }),
        ...(selectedGenre && { genres: selectedGenre }),
      };

      let data;
      if (selectedPlatform || selectedGenre) {
        data = await fetchGames(params);
      } else {
        data = await fetchPopularGames({
          ...params,
          dates: `${startDateStr},${today}`,
          ordering: "-released,-rating",
        });
      }

      setGames((prev) => {
        const existingIds = new Set(prev.map((game) => game.id));
        const newGames = data.results.filter(
          (game) => !existingIds.has(game.id)
        );
        return [...prev, ...newGames];
      });
      setHasFetchedOnce(true);
    } catch (error) {
      console.error("Failed to load games:", error);
    } finally {
      setInitialLoading(false);
      setScrollLoading(false);
    }
  };

  const handleCardClick = (gameId) => {
    setActiveModalId(gameId);
  };

  const handleModalClose = () => {
    setActiveModalId(null);
  };

  useEffect(() => {
    loadGames();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !scrollLoading && !initialLoading && hasFetchedOnce) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLoading, initialLoading, hasFetchedOnce]);

  useEffect(() => {
    if (!selectedPlatform && !selectedGenre) {
      setPage(1);
      setGames([]);
      setInitialLoading(true);
      loadGames();
      return;
    }

    const fetchFilteredGames = async () => {
      setInitialLoading(true);
      try {
        const params = {
          page: 1,
          page_size: 20,
          ...(selectedPlatform && { platforms: selectedPlatform }),
          ...(selectedGenre && { genres: selectedGenre }),
        };
        const data = await fetchGames(params);
        setGames(data.results || []);
      } catch (err) {
        console.error("Failed to fetch filtered games:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchFilteredGames();
  }, [selectedPlatform, selectedGenre]);

  useEffect(() => {
    const runSearch = async () => {
      if (searchQuery === "") {
        setPage(1);
        setGames([]);
        setInitialLoading(true);
        loadGames();
        return;
      }

      setInitialLoading(true);
      try {
        const data = await searchGames({
          query: searchQuery,
          page: 1,
          page_size: 20,
        });
        setGames(data.results || []);
        setPage(1);
        setHasFetchedOnce(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    runSearch();
  }, [searchQuery]);

  return (
    <div className="home">
      {initialLoading && <Preloader type="full" />}
      <div className="home__content">
        <GameGrid
          games={games}
          handleCardClick={handleCardClick}
          scrollLoading={scrollLoading}
        />
        {activeModalId && (
          <GameModal
            gameId={activeModalId}
            activeModalId={true}
            handleModalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
