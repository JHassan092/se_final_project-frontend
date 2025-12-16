import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await fetch("/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setFavorites(data.favorites);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (game) => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId: game.id }),
    });

    if (res.ok) {
      setFavorites((prev) => {
        if (prev.some((g) => g.id === game.id)) return prev;
        return [...prev, game];
      });
    }
  };

  const removeFromFavorites = async (gameId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/favorites/${gameId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setFavorites((prev) => prev.filter((game) => game.id !== gameId));
    }
  };

  const isFavorite = (gameId) => {
    return favorites.some((game) => game.id === gameId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
