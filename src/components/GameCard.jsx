import { useState } from "react";

import { useFavorites } from "../context/FavoritesContext";

import "../blocks/GameCard.css";

export default function GameCard({ game, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const contextValue = useFavorites();
  const favorited = contextValue.isFavorite(game.id);

  const handleFavoriteClick = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const isFavNow = contextValue.isFavorite(game.id);

    if (isFavNow) {
      const favObj = contextValue.favorites.find(
        (f) => String(f.gameId) === String(game.id)
      );
      await contextValue.removeFromFavorites(favObj);
    } else {
      await contextValue.addToFavorites(game);
    }

    setIsProcessing(false);
  };

  return (
    <div
      className="game__card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="game__card-image"
      />

      {/* The Platform Icons */}

      <div className="game__card-platforms">
        {game.platforms
          ?.filter(
            (p, index, self) =>
              index === self.findIndex((t) => t.platform.id === p.platform.id)
          )
          .map(({ platform }) => (
            <img
              key={platform.id}
              src={`/icons/${platform.slug}.svg`}
              alt={platform.name}
              className="game__card_platform-icon"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ))}
      </div>

      {/* The hover details */}

      {isHovered && (
        <div className="game__card-hovered">
          <p>Released: {game.released}</p>
          <p>Genre: {game.genres?.[0]?.name || "Unknown"}</p>
        </div>
      )}
      {/* The title and favorite btn */}
      <div className="game__card-footer">
        <h3 className="game__card-title">{game.name}</h3>
        <button
          type="button"
          className={`game__card-favorite-btn ${favorited ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick();
          }}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
