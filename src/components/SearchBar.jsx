import { useEffect, useState } from "react";

import "../blocks/SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    if (typeof onSearch !== "function") {
      setSearchQuery("");
      return;
    }
    try {
      await onSearch(query);
      setSearchQuery("");
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) return;

    if (query === "") {
      onSearch("");
    }

    const timeout = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, onSearch]);

  return (
    <div className="search__bar-container">
      <form onSubmit={handleFormSubmit} className="search__bar-form">
        <input
          type="text"
          placeholder="Search games"
          className="search__bar-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search__bar-search-btn"></button>
      </form>
    </div>
  );
}
