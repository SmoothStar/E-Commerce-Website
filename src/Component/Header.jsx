import React from "react";
import { Link } from "react-router-dom";

export default function Header({
  categories,
  selectedCategory,
  onCategoryChange,
  cartCount,
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        FakeStore
      </Link>

      {/* SEARCH BAR */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <nav className="filter-bar">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-btn ${selectedCategory === c ? "active" : ""}`}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      <Link to="/cart" className="cart-btn">
        Cart ({cartCount})
      </Link>
    </header>
  );
}
