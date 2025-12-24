import { useState } from "react";

import { useFavorites } from "../context/FavoritesContext";

import "../blocks/GameCard.css";

export default function GameCard({ game, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const contextValue = useFavorites();
  const favorited = contextValue.isFavorite(game.id);

  const getUniquePlatforms = (platforms) => {
    if (!platforms) return [];

    // Group platforms by family
    const families = {
      playstation: [],
      xbox: [],
      nintendo: [],
      pc: [],
      other: [],
    };

    platforms.forEach(({ platform }) => {
      const slug = platform.slug.toLowerCase();
      if (slug.includes("playstation")) {
        families.playstation.push(platform);
      } else if (slug.includes("xbox")) {
        families.xbox.push(platform);
      } else if (slug.includes("nintendo") || slug.includes("switch")) {
        families.nintendo.push(platform);
      } else if (
        slug.includes("pc") ||
        slug.includes("linux") ||
        slug.includes("mac")
      ) {
        families.pc.push(platform);
      } else {
        families.other.push(platform);
      }
    });

    // For each family, pick the platform with the highest ID (newest)
    const uniquePlatforms = [];
    Object.values(families).forEach((familyPlatforms) => {
      if (familyPlatforms.length > 0) {
        const newest = familyPlatforms.reduce((newest, current) =>
          current.id > newest.id ? current : newest
        );
        uniquePlatforms.push(newest);
      }
    });

    return uniquePlatforms;
  };

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
        {getUniquePlatforms(game.platforms).map((platform) => (
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
