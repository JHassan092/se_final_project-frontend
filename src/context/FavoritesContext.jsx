import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

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

    try {
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
        toast.success(`${game.name} added to favorites!`);
      } else {
        setFavorites((prev) => prev.filter((f) => f._id !== tempFav._id));
        toast.error("Failed to add to favorites");
      }
    } catch (err) {
      setFavorites((prev) => prev.filter((f) => f._id !== tempFav._id));
      toast.error("Failed to add to favorites");
    }
  };

  // Removes from favorite
  const removeFromFavorites = async (fav) => {
    if (!fav) return;

    if (fav._id.startsWith("temp-")) {
      setFavorites((prev) => prev.filter((f) => f._id !== fav._id));
      return;
    }

    try {
      const res = await fetch(`/api/favorites/${fav._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f._id !== fav._id));
        toast.success(`${fav.name} removed from favorites`);
      } else {
        toast.error("Failed to remove from favorites");
      }
    } catch (err) {
      toast.error("Failed to remove from favorites");
    }
  };

  // Check if game is favorite
  const isFavorite = (gameId) => {
    return favorites.some((fav) => String(fav.gameId) === String(gameId));
  };

  // Clear all button
  const clearFavorites = async () => {
    try {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFavorites([]);
        toast.success("All favorites cleared!");
      } else {
        toast.error("Failed to clear favorites");
      }
    } catch (err) {
      toast.error("Failed to clear favorites");
    }
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
