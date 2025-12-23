import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children, token, isLoggedIn }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from backend
  const loadFavorites = async () => {
    if (!token) return;

    const res = await fetch("/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [token, isLoggedIn]);

  // Add's to favorite
  const addToFavorites = async (game) => {
    const tempFav = {
      _id: "temp-" + game.id,
      gameId: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      released: game.released,
    };

    setFavorites((prev) => [...prev, tempFav]);

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameId: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
      }),
    });

    if (res.ok) {
      const newFav = await res.json();
      setFavorites((prev) =>
        prev.map((f) => (f._id === tempFav._id ? newFav : f))
      );
    }
  };

  // Removes from favorite
  const removeFromFavorites = async (fav) => {
    if (!fav) return;

    if (fav._id.startsWith("temp-")) {
      setFavorites((prev) => prev.filter((f) => f._id !== fav._id));
      return;
    }

    const res = await fetch(`/api/favorites/${fav._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f._id !== fav._id));
    }
  };

  // Check if game is favorite
  const isFavorite = (gameId) => {
    return favorites.some((fav) => String(fav.gameId) === String(gameId));
  };

  // Clear all button
  const clearFavorites = async () => {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loadFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
