import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-img" />
      </Link>

      <div className="product-info">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <Link className="view-btn" to={`/product/${product.id}`}>
          View
        </Link>
      </div>
    </div>
  );
}
