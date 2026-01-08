import GameCard from "./GameCard.jsx";
import { Preloader } from "./Preloader.jsx";

import "../blocks/GameGrid.css";

export default function GameGrid({ games, handleCardClick, loading }) {
  return (
    <div className="game__grid">
      <div className="cards">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => handleCardClick(game.id)}
          />
        ))}
      </div>
      {loading && <Preloader type="inline" />}
    </div>
  );
}
