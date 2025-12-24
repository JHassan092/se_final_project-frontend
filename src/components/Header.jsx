import { useState } from "react";

import vgddLogo from "../assets/images/vgdd-logo.svg";
import SearchBar from "./SearchBar";

import "../blocks/Header.css";

export default function Header({
  onSearch,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  currentUser,
  handleProfileClick,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (callback) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <img src={vgddLogo} alt="VGDD Logo" className="header__logo" />
      {/* Hamburger Menu for mobile view */}
      <button
        className="header__hamburger"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className="header__hamburger-line"></span>
        <span className="header__hamburger-line"></span>
        <span className="header__hamburger-line"></span>
      </button>
      <div className={`header__mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="header__mobile-search">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="header__mobile-buttons">
          {isLoggedIn ? (
            <img
              src={currentUser?.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="header__avatar"
              onClick={() => handleMenuItemClick(handleProfileClick)}
            />
          ) : (
            <>
              <button
                className="header__login-btn"
                onClick={() => handleMenuItemClick(handleLoginClick)}
              >
                Login
              </button>
              <button
                className="header__register-btn"
                onClick={() => handleMenuItemClick(handleRegisterClick)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
      {/* Header control buttons and content */}
      <div className="header-content">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="header__button-group">
        {isLoggedIn ? (
          <img
            src={currentUser?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="header__avatar"
            onClick={handleProfileClick}
          />
        ) : (
          <>
            <button className="header__login-btn" onClick={handleLoginClick}>
              Login
            </button>
            <button
              className="header__register-btn"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
