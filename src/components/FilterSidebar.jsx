import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

import "../blocks/FilterSidebar.css";

export default function SideBar({
  platforms = [],
  genres = [],
  selectedPlatform,
  selectedGenre,
  handleFilter,
}) {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { clearFavorites } = useFavorites();

  const visiblePlatforms = showAllPlatforms ? platforms : platforms.slice(0, 6);
  const visibleGenres = showAllGenres ? genres : genres.slice(0, 7);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="sidebar">
      {/* Mobile menu toggle button */}
      <button className="sidebar__mobile-toggle" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`sidebar__mobile-content ${mobileMenuOpen ? "open" : ""}`}
      >
        {/* All Control Buttons */}
        <div className="sidebar__btn-group">
          <Link to="/" className="sidebar__home-btn">
            Home
          </Link>
          <Link to="/favorites" className="sidebar__favorites-btn">
            Favorites
          </Link>
          {location.pathname === "/favorites" && (
            <button className="sidebar__clear-btn" onClick={clearFavorites}>
              Clear Favorites
            </button>
          )}
          {(selectedPlatform || selectedGenre) && (
            <button
              className="sidebar__reset-btn"
              onClick={() => {
                handleFilter("platforms", null);
                handleFilter("genres", null);
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
        {/* Platforms Section */}
        <div className="sidebar__section">
          <h3 className="sidebar__section-title">Platforms</h3>
          <ul className="sidebar__list">
            {visiblePlatforms.map((platform) => (
              <li key={platform.id}>
                <button
                  className={`sidebar__filter-btn ${
                    selectedPlatform === platform.id ? "active" : ""
                  }`}
                  onClick={() => handleFilter("platforms", platform.id)}
                >
                  {platform.name}
                </button>
              </li>
            ))}
          </ul>
          {/*Toggle Button */}
          {platforms.length > 6 && (
            <button
              className="sidebar__toggle-btn"
              onClick={() => setShowAllPlatforms((prev) => !prev)}
            >
              {showAllPlatforms ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Genres Section */}
        <div className="sidebar__section">
          <h3 className="sidebar__section-title">Genres</h3>
          <ul className="sidebar__list">
            {visibleGenres.map((genre) => (
              <li key={genre.id}>
                <button
                  className={`sidebar__filter-btn ${
                    selectedGenre === genre.id ? "active" : ""
                  }`}
                  onClick={() => handleFilter("genres", genre.id)}
                >
                  {genre.name}
                </button>
              </li>
            ))}
          </ul>
          {/*Toggle Button */}
          {genres.length > 6 && (
            <button
              className="sidebar__toggle-btn"
              onClick={() => setShowAllGenres((prev) => !prev)}
            >
              {showAllGenres ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
