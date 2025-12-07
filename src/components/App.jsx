import { use, useEffect, useState } from "react";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";
import { Routes, Route } from "react-router-dom";
import { fetchPlatforms, fetchGenres, searchGames } from "../api/api.js";

import Home from "./Home.jsx";
import Favorites from "./Favorites.jsx";
import FilterSideBar from "./FilterSidebar.jsx";
import Header from "./Header.jsx";

import "../blocks/App.css";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";

export default function App() {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState("");

  const handleLoginClick = () => {
    setActiveModal("Login");
  };

  const handleRegisterClick = () => {
    setActiveModal("Register");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  {
    /* Fetching platforms and genres once at the app level */
  }
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [platformData, genreData] = await Promise.all([
          fetchPlatforms(),
          fetchGenres(),
        ]);
        if (!mounted) return;
        setPlatforms(platformData.results || []);
        setGenres(genreData.results || []);
      } catch (err) {
        console.error("Failed to load platforms/genres:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleFilter = (type, value) => {
    if (type === "platforms") setSelectedPlatform(value);
    else if (type === "genres") setSelectedGenre(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRegisterSubmit = () => {
    e.preventDefault();
  };

  const handleLoginSubmit = () => {
    e.preventDefault();
  };

  return (
    <FavoritesProvider>
      <Header
        onSearch={handleSearch}
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
      />
      <div className="page">
        <FilterSideBar
          platforms={platforms}
          genres={genres}
          selectedPlatform={selectedPlatform}
          selectedGenre={selectedGenre}
          handleFilter={handleFilter}
        />

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedPlatform={selectedPlatform}
                  selectedGenre={selectedGenre}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
      <LoginModal
        isOpen={activeModal === "Login"}
        handleModalClose={handleModalClose}
        onLogin={handleLoginSubmit}
        switchToRegister={handleRegisterClick}
      />
      <RegisterModal
        isOpen={activeModal === "Register"}
        handleModalClose={handleModalClose}
        onRegister={handleRegisterSubmit}
        switchToLogin={handleLoginClick}
      />
    </FavoritesProvider>
  );
}
