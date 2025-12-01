import vgddLogo from "../assets/images/vgdd-logo.svg";
import "../blocks/Header.css";

import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <header className="header">
      <img src={vgddLogo} alt="VGDD Logo" className="header__logo" />
      <div className="header-content">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="header__button-group">
        <button className="header__login-btn">Login</button>
        <button className="header__register-btn">Register</button>
      </div>
    </header>
  );
}
