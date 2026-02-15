"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartcontext";
import { supabase } from "@/lib/supabaseClient";

function generateTrackingCode() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `RB-${random}`;
}

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
      0
    );
  }, [cart]);

  const lines = useMemo(() => {
    return cart.map((item) => {
      const qty = Number(item.quantity || 1);
      const lineTotal = Number(item.price) * qty;
      return `• ${item.name} (${item.storage}, ${item.color}) x${qty} — MWK ${lineTotal.toLocaleString()}`;
    });
  }, [cart]);

  const handleCheckout = async () => {
    setErrorMsg("");

    if (cart.length === 0) return;

    if (!customerName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your phone number.");
      return;
    }

    setIsProcessing(true);

    try {
      const trackingCode = generateTrackingCode();

      const orderDetailsText =
        lines.join("\n") +
        `\n\nTotal: MWK ${total.toLocaleString()}\nTracking: ${trackingCode}`;

      // 1) Save to Supabase
      const { error } = await supabase.from("orders").insert([
        {
          customer_name: customerName.trim(),
          phone: phone.trim(),
          order_details: orderDetailsText,
          status: "pending",
          tracking_code: trackingCode,
        },
      ]);

      if (error) {
        console.error(error);
        setErrorMsg("Checkout failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // 2) Build WhatsApp message (includes tracking + track link)
      const trackLink =
        typeof window !== "undefined"
          ? `${window.location.origin}/track?code=${trackingCode}`
          : `https://rangebrothers.store/track?code=${trackingCode}`;

      const whatsappMessage = encodeURIComponent(
        `🧾 RangeBrothers Order\n\nName: ${customerName.trim()}\nPhone: ${phone.trim()}\n\n${lines.join(
          "\n"
        )}\n\nTotal: MWK ${total.toLocaleString()}\nTracking Code: ${trackingCode}\nTrack here: ${trackLink}\n\n✅ Please confirm this order.`
      );

      // 3) Redirect to WhatsApp
      window.location.href = `https://wa.me/265882267019?text=${whatsappMessage}`;
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setIsProcessing(false);
      return;
    }
  };

  return (
    <div style={page}>
      <div style={headerRow}>
        <div>
          <h1 style={title}>Your Cart</h1>
          <p style={subtitle}>Review items, set quantity, then checkout on WhatsApp.</p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            style={ghostBtn}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
          >
            Clear
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div style={emptyCard}>
          <div style={{ fontSize: 40 }}>🛒</div>
          <div style={{ marginTop: 10, fontWeight: 700 }}>Your cart is empty</div>
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            Go to Products and add a phone to get started.
          </div>
        </div>
      ) : (
        <div style={grid}>
          {/* LEFT: ITEMS */}
          <div style={leftCol}>
            <AnimatePresence>
              {cart.map((item, index) => {
                const qty = Number(item.quantity || 1);
                const lineTotal = Number(item.price) * qty;

                return (
                  <motion.div
                    key={`${item.id}-${item.storage}-${item.color}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    style={itemCard}
                  >
                    <div style={itemMain}>
                      <div style={itemTitle}>{item.name}</div>
                      <div style={itemMeta}>
                        {item.storage} <span style={{ opacity: 0.5 }}>•</span> {item.color}
                      </div>
                    </div>

                    <div style={itemRight}>
                      <div style={money}>
                        MWK {lineTotal.toLocaleString()}
                      </div>

                      <div style={controlsRow}>
                        <button
                          onClick={() => decreaseQty(index)}
                          style={stepBtn}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <div style={qtyPill}>{qty}</div>

                        <button
                          onClick={() => increaseQty(index)}
                          style={stepBtn}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(index)}
                          style={removeBtn}
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* RIGHT: SUMMARY */}
          <div style={rightCol}>
            <div style={summaryCard}>
              <div style={summaryTop}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Order Summary</div>
                <div style={{ opacity: 0.7, fontSize: 13 }}>
                  {cart.length} item{cart.length === 1 ? "" : "s"}
                </div>
              </div>

              <div style={divider} />

              <label style={label}>Name</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., John Banda"
                style={input}
              />

              <label style={label}>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., 0882xxxxxx"
                style={input}
                inputMode="tel"
              />

              {errorMsg && <div style={errorBox}>{errorMsg}</div>}

              <div style={totalRow}>
                <div style={{ opacity: 0.8 }}>Total</div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>
                  MWK {total.toLocaleString()}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                style={checkoutBtn}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Checkout on WhatsApp"}
              </button>

              <div style={finePrint}>
                By checking out, your order is saved and you’ll be redirected to WhatsApp to confirm.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  maxWidth: 1100,
  margin: "40px auto",
  padding: "0 16px 60px",
  color: "white",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 20,
};

const title = {
  fontSize: 34,
  color: "#1dbf73",
  margin: 0,
  lineHeight: 1.1,
  fontWeight: 900,
};

const subtitle = {
  marginTop: 8,
  marginBottom: 0,
  opacity: 0.7,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: 18,
};

const leftCol = {};

const rightCol = {};

const itemCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 14,
  marginBottom: 12,
};

const itemMain = {
  minWidth: 0,
};

const itemTitle = {
  fontWeight: 800,
  fontSize: 16,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 520,
};

const itemMeta = {
  marginTop: 6,
  opacity: 0.7,
  fontSize: 13,
};

const itemRight = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 10,
};

const money = {
  color: "#1dbf73",
  fontWeight: 900,
};

const controlsRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const stepBtn = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: "1px solid rgba(29,191,115,0.7)",
  background: "rgba(29,191,115,0.08)",
  color: "#1dbf73",
  fontSize: 18,
  cursor: "pointer",
  fontWeight: 900,
};

const qtyPill = {
  minWidth: 44,
  height: 36,
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  fontWeight: 800,
};

const removeBtn = {
  padding: "9px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,107,107,0.35)",
  background: "rgba(255,107,107,0.12)",
  color: "#ff6b6b",
  cursor: "pointer",
  fontWeight: 800,
};

const summaryCard = {
  position: "sticky",
  top: 90,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  padding: 16,
};

const summaryTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
};

const divider = {
  height: 1,
  background: "rgba(255,255,255,0.10)",
  margin: "14px 0",
};

const label = {
  display: "block",
  fontSize: 13,
  opacity: 0.75,
  marginBottom: 6,
  marginTop: 10,
};

const input = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(29,191,115,0.35)",
  background: "#02130d",
  color: "white",
  outline: "none",
  fontSize: 15,
};

const errorBox = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,107,107,0.35)",
  background: "rgba(255,107,107,0.10)",
  color: "#ffb3b3",
  fontWeight: 700,
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 14,
  paddingTop: 12,
  borderTop: "1px solid rgba(255,255,255,0.10)",
};

const checkoutBtn = {
  width: "100%",
  marginTop: 14,
  padding: "14px 16px",
  borderRadius: 14,
  border: "none",
  background: "#1dbf73",
  color: "#02130d",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 16,
};

const finePrint = {
  marginTop: 10,
  fontSize: 12,
  opacity: 0.65,
  lineHeight: 1.35,
};

const ghostBtn = {
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  cursor: "pointer",
  fontWeight: 800,
  transition: "0.15s ease",
};

/* MOBILE: stack summary under items */
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 900px) {
      .rb-cart-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);
}