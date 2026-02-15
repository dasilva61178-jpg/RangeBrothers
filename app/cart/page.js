"use client";

import { useCart } from "../context/cartcontext";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function generateTrackingCode() {
  return "RB-" + Math.floor(100000 + Math.random() * 900000);
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 WhatsApp message builder
  const buildWhatsAppUrl = (trackingCode) => {
    const message = encodeURIComponent(
      `📦 New Order\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n\n` +
        cart
          .map(
            (item) =>
              `${item.name} (${item.storage}, ${item.color}) x${item.quantity} - MWK ${
                item.price * item.quantity
              }`
          )
          .join("\n") +
        `\n\nTotal: MWK ${total}\n` +
        `Tracking Code: ${trackingCode}`
    );

    return `https://wa.me/265882267019?text=${message}`;
  };

  // 🔥 Save order (runs in background)
  const saveOrder = async (trackingCode) => {
    try {
      await supabase.from("orders").insert([
        {
          customer_name: name,
          phone: phone,
          order_details: JSON.stringify(cart),
          total: total,
          status: "pending",
          tracking_code: trackingCode,
        },
      ]);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // 🔥 Checkout (FIXED FOR MOBILE)
  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Enter your name and phone");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const trackingCode = generateTrackingCode();

    // ✅ OPEN WHATSAPP IMMEDIATELY (mobile safe)
    const url = buildWhatsAppUrl(trackingCode);
    window.location.href = url;

    // ✅ Save order in background (DO NOT await)
    saveOrder(trackingCode);

    // Optional: clear cart after checkout
    clearCart();
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <h3>{item.name}</h3>
              <p>{item.storage} - {item.color}</p>
              <p>MWK {item.price}</p>

              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h2>Total: MWK {total}</h2>

          {/* 👇 CUSTOMER INFO */}
          <div style={{ marginTop: "20px" }}>
            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: "block", marginBottom: "10px", padding: "10px" }}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ display: "block", marginBottom: "10px", padding: "10px" }}
            />
          </div>

          {/* 👇 CHECKOUT */}
          <button
            onClick={handleCheckout}
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#1dbf73",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Checkout on WhatsApp
          </button>

          <br />

          <button
            onClick={clearCart}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "red",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}