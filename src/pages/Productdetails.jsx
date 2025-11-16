import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="detail-page">
      <img src={product.image} alt={product.title} className="detail-img" />

      <div>
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>

        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <button className="add-btn" onClick={() => addToCart(product, qty)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
