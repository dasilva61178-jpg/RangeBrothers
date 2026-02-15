"use client";

import { useState } from "react";
import { useCart } from "../context/cartcontext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!name || !phone) {
      alert("Enter your name and phone");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          name,
          phone,
        }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error");
    }

    setLoading(false);
  };

  return (
    <div style={container}>
      <h1 style={title}>Your Cart</h1>

      {cart.length === 0 && (
        <p style={{ opacity: 0.6 }}>Your cart is empty</p>
      )}

      {cart.map((item, index) => (
        <div key={index} style={card}>
          <div>
            <h3>{item.name}</h3>
            <p style={sub}>
              {item.storage} • {item.color}
            </p>
            <p style={price}>
              MWK {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>

          <div style={right}>
            <div style={qty}>
              <button onClick={() => decreaseQty(index)} style={btn}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(index)} style={btn}>
                +
              </button>
            </div>

            <button onClick={() => removeItem(index)} style={remove}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div style={totalBox}>
            Total: MWK {total.toLocaleString()}
          </div>

          <div style={form}>
            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={input}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={input}
            />
          </div>

          <div style={actions}>
            <button onClick={clearCart} style={clear}>
              Clear Cart
            </button>

            <button onClick={handleCheckout} style={checkout}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* -------- STYLES -------- */

const container = {
  maxWidth: "700px",
  margin: "50px auto",
  padding: "20px",
  color: "white",
};

const title = {
  fontSize: "34px",
  color: "#1dbf73",
  marginBottom: "25px",
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#031b14",
  padding: "18px",
  borderRadius: "14px",
  marginBottom: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const sub = {
  opacity: 0.6,
  fontSize: "14px",
};

const price = {
  color: "#1dbf73",
  fontWeight: "600",
};

const right = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "10px",
};

const qty = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const btn = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "1px solid #1dbf73",
  background: "transparent",
  color: "#1dbf73",
  cursor: "pointer",
};

const remove = {
  background: "#ff4d4d",
  border: "none",
  color: "white",
  padding: "6px 12px",
  borderRadius: "20px",
  cursor: "pointer",
};

const totalBox = {
  fontSize: "22px",
  marginTop: "25px",
  color: "#1dbf73",
};

const form = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #1dbf73",
  background: "#02130d",
  color: "white",
};

const actions = {
  marginTop: "25px",
  display: "flex",
  justifyContent: "space-between",
};

const clear = {
  background: "#444",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  color: "white",
  cursor: "pointer",
};

const checkout = {
  background: "#1dbf73",
  border: "none",
  padding: "12px 25px",
  borderRadius: "20px",
  color: "#02130d",
  fontWeight: "600",
  cursor: "pointer",
};