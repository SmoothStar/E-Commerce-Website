import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/Productdetails";
import CartPage from "./pages/Cartpage"

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  // Load cart from localStorage (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    async function load() {
      const p = await fetch("https://fakestoreapi.com/products").then((r) =>
        r.json()
      );
      const c = await fetch(
        "https://fakestoreapi.com/products/categories"
      ).then((r) => r.json());
      setProducts(p);
      setCategories(["all", ...c]);
    }
    load();
  }, []);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }

  function updateQuantity(id, qty) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        // keep only items with quantity > 0 (defensive)
        .filter((i) => i.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  // Clear cart (called after successful checkout)
  function clearCart() {
    setCart([]);
  }

  return (
    <div>
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              selected={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart} // <-- pass clearCart
            />
          }
        />
      </Routes>
    </div>
  );
}
