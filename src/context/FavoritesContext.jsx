import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      if (typeof window === "undefined") return [];
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to read favorites from localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to write favorites to localStorage:", err);
    }
  }, [favorites]);

  const addToFavorites = (game) => {
    setFavorites((prev) => {
      if (prev.some((g) => g.id === game.id)) return prev;
      return [...prev, game];
    });
  };

  const removeFromFavorites = (gameId) => {
    setFavorites((prev) => prev.filter((game) => game.id !== gameId));
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
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
