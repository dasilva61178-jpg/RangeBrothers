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

      console.log(data);

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else if (data?.data?.checkout_url) {
        window.location.href = data.data.checkout_url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Your Cart</h1>

      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3>{item.name}</h3>
          <p>{item.storage} • {item.color}</p>
          <p>MWK {item.price}</p>

          <button onClick={() => decreaseQty(i)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQty(i)}>+</button>

          <br />
          <button onClick={() => removeItem(i)}>Remove</button>
        </div>
      ))}

      <h2>Total: MWK {total}</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />

      <button onClick={handleCheckout}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <br />

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}