import React from "react";
import ProductCard from "../Component/Productcard";

export default function Home({ products, selected, searchQuery }) {
  // Category Filter
  let shown =
    selected === "all"
      ? products
      : products.filter((p) => p.category === selected);

  // Search Filter
  shown = shown.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <h2>Products</h2>
      <div className="grid">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
