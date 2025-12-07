import GameCard from "./GameCard.jsx";
import { Preloader } from "./Preloader.jsx";

import "../blocks/GameGrid.css";

export default function GameGrid({ games, handleCardClick, loading }) {
  return (
    <div className="game__grid">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onClick={() => handleCardClick(game.id)}
        />
      ))}
      {loading && <Preloader type="inline" />}
    </div>
  );
}
