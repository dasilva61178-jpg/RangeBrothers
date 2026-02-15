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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  const saveOrder = async (trackingCode) => {
    try {
      await supabase.from("orders").insert([
        {
          customer_name: name,
          phone,
          order_details: JSON.stringify(cart),
          total,
          status: "pending",
          tracking_code: trackingCode,
        },
      ]);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleCheckout = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Enter your name and phone");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const trackingCode = generateTrackingCode();

    // Open WhatsApp immediately (mobile-safe)
    window.location.href = buildWhatsAppUrl(trackingCode);

    // Save order in background
    saveOrder(trackingCode);

    // Optional: clear cart after checkout
    clearCart();
  };

  return (
    <div style={page}>
      <div style={wrap}>
        <h1 style={title}>Your Cart</h1>

        {cart.length === 0 ? (
          <div style={emptyCard}>
            <div style={emptyIcon}>🛒</div>
            <div style={emptyText}>Your cart is empty.</div>
            <div style={emptySub}>Add a phone to continue.</div>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div style={sectionTitle}>Items</div>

            <div style={list}>
              {cart.map((item) => (
                <div key={item.id + item.color + item.storage} style={itemCard}>
                  <div style={itemTop}>
                    <div style={itemName}>{item.name}</div>
                    <div style={itemPrice}>
                      MWK {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <div style={itemMeta}>
                    <span style={pill}>{item.storage}</span>
                    <span style={pill}>{item.color}</span>
                  </div>

                  <div style={itemBottom}>
                    <div style={qtyGroup}>
                      <button
                        style={qtyBtn}
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <div style={qtyValue}>{item.quantity}</div>

                      <button
                        style={qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div style={summaryCard}>
              <div style={summaryRow}>
                <span style={summaryLabel}>Total</span>
                <span style={summaryValue}>MWK {total.toLocaleString()}</span>
              </div>
              <div style={summarySub}>
                Delivery + payment details will be confirmed on WhatsApp.
              </div>
            </div>

            {/* CUSTOMER INFO */}
            <div style={sectionTitle}>Customer Info</div>

            <div style={formCard}>
              <label style={label}>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Banda"
                style={input}
              />

              <label style={label}>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0882 267 019"
                style={input}
                inputMode="tel"
              />

              <button style={checkoutBtn} onClick={handleCheckout}>
                Checkout on WhatsApp
              </button>

              <button style={clearBtn} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  background: "radial-gradient(1200px 600px at 20% -10%, rgba(29,191,115,0.18), transparent 60%), #070b09",
  color: "white",
  padding: "22px 14px 40px",
};

const wrap = {
  maxWidth: "560px",
  margin: "0 auto",
};

const title = {
  fontSize: "34px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  margin: "6px 0 18px",
  color: "#1dbf73",
};

const sectionTitle = {
  marginTop: "18px",
  marginBottom: "10px",
  fontSize: "13px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
};

const list = {
  display: "grid",
  gap: "12px",
};

const itemCard = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "16px",
  padding: "14px",
  backdropFilter: "blur(6px)",
};

const itemTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "flex-start",
};

const itemName = {
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "1.15",
};

const itemPrice = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#1dbf73",
  whiteSpace: "nowrap",
};

const itemMeta = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "10px",
};

const pill = {
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "rgba(255,255,255,0.85)",
};

const itemBottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginTop: "12px",
};

const qtyGroup = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(0,0,0,0.25)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "999px",
  padding: "6px 10px",
};

const qtyBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid rgba(29,191,115,0.55)",
  background: "rgba(29,191,115,0.10)",
  color: "#1dbf73",
  fontSize: "18px",
  fontWeight: "800",
  cursor: "pointer",
};

const qtyValue = {
  minWidth: "22px",
  textAlign: "center",
  fontWeight: "800",
  color: "rgba(255,255,255,0.92)",
};

const removeBtn = {
  background: "rgba(255, 80, 80, 0.12)",
  border: "1px solid rgba(255, 80, 80, 0.35)",
  color: "#ff8080",
  padding: "10px 12px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "13px",
};

const summaryCard = {
  marginTop: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "16px",
  padding: "14px",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
};

const summaryLabel = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.72)",
  fontWeight: "700",
};

const summaryValue = {
  fontSize: "20px",
  fontWeight: "900",
  color: "#1dbf73",
};

const summarySub = {
  marginTop: "8px",
  fontSize: "13px",
  color: "rgba(255,255,255,0.55)",
  lineHeight: "1.35",
};

const formCard = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "16px",
  padding: "14px",
  display: "grid",
  gap: "10px",
};

const label = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.7)",
  fontWeight: "700",
  marginTop: "2px",
};

const input = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
  fontSize: "15px",
};

const checkoutBtn = {
  marginTop: "6px",
  width: "100%",
  padding: "14px 14px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  fontWeight: "900",
  fontSize: "16px",
  background: "#1dbf73",
  color: "#04140c",
};

const clearBtn = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "rgba(255,255,255,0.86)",
  cursor: "pointer",
  fontWeight: "800",
};

const emptyCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "16px",
  padding: "22px",
  textAlign: "center",
  marginTop: "12px",
};

const emptyIcon = {
  fontSize: "32px",
  marginBottom: "8px",
};

const emptyText = {
  fontSize: "16px",
  fontWeight: "800",
};

const emptySub = {
  marginTop: "6px",
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
};