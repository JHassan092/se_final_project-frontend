import vgddLogo from "../assets/images/vgdd-logo.svg";
import "../blocks/Header.css";
import { useState } from "react";

import SearchBar from "./SearchBar";

export default function Header({
  onSearch,
  handleLoginClick,
  handleRegisterClick,
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
        </div>
      </div>
      <div className="header-content">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="header__button-group">
        <button className="header__login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <button className="header__register-btn" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </header>
  );
}
