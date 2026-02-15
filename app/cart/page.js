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

    const url = `https://wa.me/265882267019?text=${buildWhatsappMessage()}`;
    window.location.href = url;

    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div style={page}>
      {/* Small global CSS for mobile polish */}
      <style jsx global>{`
        html,
        body {
          background: #06110c;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }
      `}</style>

      <div style={container}>
        <div style={headerRow}>
          <h1 style={title}>Your Cart</h1>
          {cart.length > 0 && (
            <div style={pill}>
              {cart.reduce((s, i) => s + i.quantity, 0)} item(s)
            </div>
          )}
        </div>

        {cart.length === 0 && (
          <div style={emptyState}>
            <div style={emptyIcon}>🛒</div>
            <div style={emptyTitle}>Your cart is empty</div>
            <div style={emptySub}>Add a phone and it’ll show up here.</div>
          </div>
        )}

        <AnimatePresence>
          {cart.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              style={card}
            >
              <div style={left}>
                <div style={nameRow}>
                  <div style={productName}>{item.name}</div>
                  <div style={priceTag}>
                    MWK {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
                <div style={meta}>
                  {item.storage} • {item.color}
                </div>

                <div style={controlsRow}>
                  <div style={qtyBox}>
                    <button
                      onClick={() => decreaseQty(index)}
                      style={qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <div style={qtyNum}>{item.quantity}</div>

                    <button
                      onClick={() => increaseQty(index)}
                      style={qtyBtn}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button onClick={() => removeItem(index)} style={removeBtn}>
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {cart.length > 0 && (
          <div style={summaryCard}>
            <div style={summaryRow}>
              <span style={summaryLabel}>Total</span>
              <span style={summaryTotal}>MWK {total.toLocaleString()}</span>
            </div>

            <div style={form}>
              <label style={label}>Your Name</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={input}
                placeholder="e.g. John Banda"
              />

              <label style={label}>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={input}
                placeholder="e.g. 0999 123 456"
              />
            </div>

            <div style={btnGrid}>
              <button
                onClick={handleCheckout}
                style={{
                  ...primaryBtn,
                  opacity: processing ? 0.75 : 1,
                  pointerEvents: processing ? "none" : "auto",
                }}
              >
                {processing ? "Processing..." : "Checkout on WhatsApp"}
              </button>

              <button onClick={clearCart} style={ghostBtn}>
                Clear Cart
              </button>
            </div>

            <div style={tinyNote}>
              Tip: WhatsApp message will include your selected model, storage, color, and total.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  padding: "22px 14px 40px",
  color: "white",
};

const container = {
  maxWidth: "720px",
  margin: "0 auto",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
};

const title = {
  fontSize: "34px",
  letterSpacing: "-0.02em",
  color: "#1dbf73",
  margin: 0,
};

const pill = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(29,191,115,0.12)",
  border: "1px solid rgba(29,191,115,0.25)",
  color: "#b9ffd9",
  fontWeight: 700,
  fontSize: "13px",
};

const emptyState = {
  marginTop: "28px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  padding: "22px",
  textAlign: "center",
};

const emptyIcon = { fontSize: "34px", marginBottom: "6px" };
const emptyTitle = { fontSize: "18px", fontWeight: 800, marginBottom: "4px" };
const emptySub = { color: "rgba(255,255,255,0.6)", fontSize: "14px" };

const card = {
  background: "rgba(255,255,255,0.045)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  backdropFilter: "blur(8px)",
};

const left = { display: "flex", flexDirection: "column", gap: "10px" };

const nameRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "12px",
};

const productName = { fontSize: "18px", fontWeight: 900, letterSpacing: "-0.01em" };

const priceTag = {
  color: "#1dbf73",
  fontWeight: 900,
  fontSize: "14px",
  whiteSpace: "nowrap",
};

const meta = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "14px",
};

const controlsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "14px",
  padding: "8px 10px",
};

const qtyBtn = {
  width: "38px",
  height: "38px",
  borderRadius: "12px",
  border: "1px solid rgba(29,191,115,0.35)",
  background: "rgba(29,191,115,0.10)",
  color: "#b9ffd9",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: 900,
};

const qtyNum = {
  minWidth: "22px",
  textAlign: "center",
  fontWeight: 900,
  fontSize: "15px",
};

const removeBtn = {
  borderRadius: "999px",
  border: "1px solid rgba(255,107,107,0.35)",
  background: "rgba(255,107,107,0.10)",
  color: "#ff9a9a",
  padding: "10px 14px",
  fontWeight: 800,
  cursor: "pointer",
};

const summaryCard = {
  marginTop: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "20px",
  padding: "16px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.28)",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "14px",
};

const summaryLabel = { color: "rgba(255,255,255,0.70)", fontWeight: 800 };
const summaryTotal = { color: "#1dbf73", fontWeight: 950, fontSize: "18px" };

const form = { display: "grid", gap: "8px" };

const label = { fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 700 };

const input = {
  padding: "14px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
};

const btnGrid = {
  display: "grid",
  gap: "10px",
  marginTop: "14px",
};

const primaryBtn = {
  padding: "14px 16px",
  borderRadius: "16px",
  border: "none",
  background: "#1dbf73",
  color: "#04130c",
  fontWeight: 950,
  cursor: "pointer",
};

const ghostBtn = {
  padding: "14px 16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const tinyNote = {
  marginTop: "12px",
  fontSize: "12px",
  color: "rgba(255,255,255,0.55)",
  lineHeight: 1.4,
};