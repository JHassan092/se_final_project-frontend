import { useEffect, useState } from "react";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";
import { Routes, Route } from "react-router-dom";
import { fetchPlatforms, fetchGenres } from "../api/api.js";
import { login, register, validateToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Home from "./Home.jsx";
import Favorites from "./Favorites.jsx";
import FilterSideBar from "./FilterSidebar.jsx";
import Header from "./Header.jsx";
import Profile from "./Profile.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import "../blocks/App.css";
import "react-toastify/dist/ReactToastify.css";

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
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

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
        setToken(null);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, [token]);

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
      setToken(result.token);

      setCurrentUser(result.user);
      setIsLoggedIn(true);
      handleModalClose();
      toast.success("Registration successful! Welcome!");
    } catch (err) {
      console.error("Registration failled:", err);
      setAuthError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    }
  };

  const handleLoginSubmit = async (data) => {
    try {
      setAuthError("");

      const result = await login(data.email, data.password);

      localStorage.setItem("token", result.token);
      setToken(result.token);

      setCurrentUser(result.user);
      setIsLoggedIn(true);
      handleModalClose();
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      setAuthError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSaveProfile = (updatedUser) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  return (
    <FavoritesProvider token={token} isLoggedIn={isLoggedIn}>
      <main>
        <Header
          onSearch={handleSearch}
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleProfileClick={handleProfileClick}
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
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      currentUser={currentUser}
                      handleLogout={handleLogout}
                      handleSaveProfile={handleSaveProfile}
                      token={token}
                    />
                  </ProtectedRoute>
                }
              />
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </FavoritesProvider>
  );
}
