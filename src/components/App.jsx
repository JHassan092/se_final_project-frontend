import { useEffect, useState } from "react";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";
import { Routes, Route } from "react-router-dom";
import { fetchPlatforms, fetchGenres } from "../api/api.js";
import { login, register, validateToken } from "../utils/auth.js";

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

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [authError, setAuthError] = useState("");

  const handleLoginClick = () => {
    setActiveModal("Login");
  };

  const handleRegisterClick = () => {
    setActiveModal("Register");
  };

  const handleModalClose = () => {
    setActiveModal("");
    setAuthError("");
  };

  {
    /*Check token on app load */
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecking(false);
      return;
    }

    validateToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("token");
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, []);

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

  const handleRegisterSubmit = async (data) => {
    try {
      setAuthError("");

      const result = await register(data.email, data.username, data.password);

      localStorage.setItem("token", result.token);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
      handleModalClose();
    } catch (err) {
      console.error("Registration failled:", err);
      setAuthError(err.message || "Registration failed");
    }
  };

  const handleLoginSubmit = async (data) => {
    try {
      setAuthError("");

      const result = await login(data.email, data.password);

      localStorage.setItem("token", result.token);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
      handleModalClose();
    } catch (err) {
      console.error("Login failed:", err);
      setAuthError(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <FavoritesProvider>
      <main>
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
      </main>
      <LoginModal
        isOpen={activeModal === "Login"}
        handleModalClose={() => setActiveModal("")}
        onLogin={handleLoginSubmit}
        switchToRegister={() => setActiveModal("Register")}
        error={authError}
      />

      <RegisterModal
        isOpen={activeModal === "Register"}
        handleModalClose={() => setActiveModal("")}
        onRegister={handleRegisterSubmit}
        switchToLogin={() => setActiveModal("Login")}
        error={authError}
      />
    </FavoritesProvider>
  );
}
