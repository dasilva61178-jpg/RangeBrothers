"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartcontext";
import { useState } from "react";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const buildWhatsappMessage = () => {
    const itemsText = cart
      .map(
        (item) =>
          `${item.name} (${item.storage}, ${item.color}) x${item.quantity} - MWK ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return encodeURIComponent(
      `New Order ✅\n\nName: ${customerName}\nPhone: ${phone}\n\n${itemsText}\n\nTotal: MWK ${total.toLocaleString()}`
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!customerName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    setProcessing(true);

    const whatsappMessage = buildWhatsappMessage();
    const url = `https://wa.me/265882267019?text=${whatsappMessage}`;

    // open WhatsApp
    window.location.href = url;

    // optional: stop button from staying stuck on "processing"
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Your Cart</h1>

      {cart.length === 0 && (
        <p style={{ opacity: 0.6 }}>Your cart is empty.</p>
      )}

      <AnimatePresence>
        {cart.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={itemStyle}
          >
            <div>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={subText}>
                {item.storage} • {item.color}
              </p>
              <p style={priceText}>
                MWK {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>

            <div style={rightSide}>
              <div style={qtyWrapper}>
                <button onClick={() => decreaseQty(index)} style={qtyBtn}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(index)} style={qtyBtn}>
                  +
                </button>
              </div>

              <button onClick={() => removeItem(index)} style={removeBtn}>
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {cart.length > 0 && (
        <>
          <div style={totalRow}>
            <strong>Total:</strong>
            <strong>MWK {total.toLocaleString()}</strong>
          </div>

          {/* CUSTOMER INFO */}
          <div style={formWrap}>
            <input
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
            <button
              onClick={() => clearCart()} // ✅ FIXED (NO emptyCart)
              style={clearBtn}
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              style={{
                ...checkoutBtn,
                opacity: processing ? 0.7 : 1,
                pointerEvents: processing ? "none" : "auto",
              }}
            >
              {processing ? "Processing..." : "Checkout on WhatsApp"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const containerStyle = {
  maxWidth: "900px",
  margin: "60px auto",
  padding: "20px",
};

const titleStyle = {
  fontSize: "36px",
  color: "#1dbf73",
  marginBottom: "30px",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255,255,255,0.05)",
  padding: "16px 20px",
  borderRadius: "16px",
  marginBottom: "14px",
};

const rightSide = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "10px",
};

const qtyWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const qtyBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  border: "1px solid #1dbf73",
  background: "transparent",
  color: "#1dbf73",
  fontSize: "18px",
  cursor: "pointer",
};

const removeBtn = {
  background: "rgba(255,107,107,0.15)",
  color: "#ff6b6b",
  border: "1px solid rgba(255,107,107,0.4)",
  padding: "6px 14px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
};

const priceText = {
  color: "#1dbf73",
  marginTop: "4px",
};

const subText = {
  opacity: 0.6,
  fontSize: "14px",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px",
  fontSize: "20px",
};

const formWrap = {
  marginTop: "22px",
  display: "grid",
  gap: "12px",
  maxWidth: "420px",
};

const input = {
  padding: "14px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  outline: "none",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  flexWrap: "wrap",
  gap: "14px",
};

const clearBtn = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
};

const checkoutBtn = {
  background: "#1dbf73",
  color: "#02130d",
  padding: "14px 26px",
  borderRadius: "30px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
};