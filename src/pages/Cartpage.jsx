import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CartPage({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
}) {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // keep a ref to the interval so we can clear it on unmount
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  function handleCheckout() {
    setShowConfirm(true);
  }

  function confirmOrder(response) {
    if (response === "no") {
      setShowConfirm(false);
      return;
    }

    // response === "yes": clear cart and show success popup with countdown
    setShowConfirm(false);

    // Clear the cart immediately so it's empty even before redirect
    clearCart();

    setShowSuccess(true);
    setCountdown(5);

    // Start countdown
    let counter = 5;
    intervalRef.current = setInterval(() => {
      counter -= 1;
      setCountdown(counter);

      if (counter <= 0) {
        // stop interval, hide popup and navigate home
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        navigate("/");
      }
    }, 1000);
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-img" />
            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>${item.price}</p>

              <div className="qty-box">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value) || 1)
                  }
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>

      {/* Confirm popup */}
      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Confirm Checkout?</h3>
            <p>Do you want to place the order?</p>
            <div className="popup-actions">
              <button
                className="yes-btn"
                onClick={() => confirmOrder("yes")}
              >
                Yes
              </button>
              <button
                className="no-btn"
                onClick={() => confirmOrder("no")}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order placed popup with countdown */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Order Placed 🎉</h3>
            <p>Redirecting to home in {countdown}...</p>
          </div>
        </div>
      )}
    </div>
  );
}
