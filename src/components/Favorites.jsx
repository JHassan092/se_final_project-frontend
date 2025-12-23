import { useFavorites } from "../context/FavoritesContext.jsx";

import GameCard from "./GameCard";

import "../blocks/Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2 className="favorites__title">Your Favorites</h2>
        <div className="game__grid">
          {favorites.map((fav) => (
            <GameCard game={{ ...fav, id: fav.gameId }} key={fav._id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites__empty">
      <h2>No Favorite Games Yet</h2>
      <p>Start adding games to your favorites and they will appear here!</p>
    </div>
  );
}
