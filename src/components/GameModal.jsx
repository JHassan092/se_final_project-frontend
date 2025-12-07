import { useFavorites } from "../context/FavoritesContext";
import { fetchGameDetail } from "../api/api";
import { useEffect, useState } from "react";

import "../blocks/GameModal.css";

export default function GameModal({ gameId, activeModalId, handleModalClose }) {
  const [game, setGame] = useState({});
  const contextValue = useFavorites();

  const favorited = contextValue.isFavorite(game.id);

  const toggleFavorite = () => {
    favorited
      ? contextValue.removeFromFavorites(game.id)
      : contextValue.addToFavorites(game);
  };

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const gameData = await fetchGameDetail(gameId);
        setGame(gameData);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    }

    if (activeModalId) {
      fetchGameDetails();
    }
  }, [activeModalId, gameId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleModalClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("game__modal")) {
      handleModalClose();
    }
  };

  return (
    <div className="game__modal" onMouseDown={handleOverlayClick}>
      <div
        className="game__modal-content"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="game__modal-btns">
          <button
            className={`game__card-favorite-btn ${favorited ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            {favorited ? "❤️" : "🤍"}
          </button>
          <button
            className="game__modal-close-btn"
            onClick={handleModalClose}
          ></button>
        </div>

        <div className="game__modal-header">
          <img
            src={game.background_image}
            alt={game.name}
            className="game__modal-img"
          />
          <h2 className="game__modal-title">{game.name}</h2>
        </div>

        <div className="game__modal-body">
          <p>{game.description_raw}</p>
          <p>Released: {game.released}</p>
          <p>Genre: {game.genres?.[0]?.name || "Unknown"}</p>
          <ul className="game__modal-platforms">
            {game.platforms?.map(({ platform }) => (
              <li key={platform.id}>{platform.name}</li>
            ))}
          </ul>
        </div>

        <div className="game__modal-footer"></div>
      </div>
    </div>
  );
}
