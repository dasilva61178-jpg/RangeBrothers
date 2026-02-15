"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartcontext";
import { supabase } from "../../lib/supabaseClient";

function generateTrackingCode() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `RB-${random}`;
}

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // WhatsApp message builder
  const buildWhatsappMessage = (trackingCode) => {
    const itemsText = cart
      .map(
        (item) =>
          `${item.name} (${item.storage}, ${item.color}) x${item.quantity} - MWK ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return encodeURIComponent(
      `NEW ORDER ✅\n\nName: ${customerName}\nPhone: ${phone}\nTracking: ${trackingCode}\n\n${itemsText}\n\nTotal: MWK ${total.toLocaleString()}\n\nCustomer tracking link:\n${window.location.origin}/track?code=${trackingCode}`
    );
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customerName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    setLoading(true);

    const trackingCode = generateTrackingCode();

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} (${item.storage}, ${item.color}) x${item.quantity}`
      )
      .join(", ");

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: customerName,
        phone: phone,
        order_details: orderDetails,
        status: "pending",
        tracking_code: trackingCode,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error saving order. Check Supabase table + keys.");
      return;
    }

    // Open WhatsApp with order info
    const whatsappMessage = buildWhatsappMessage(trackingCode);
    window.open(`https://wa.me/265882267019?text=${whatsappMessage}`, "_blank");

    // OPTIONAL: clear cart after checkout
    // clearCart();

    // Redirect to tracking page
    window.location.href = `/track?code=${trackingCode}`;
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Your Cart</h1>

      {cart.length === 0 && (
        <p style={{ opacity: 0.6 }}>Your cart is empty.</p>
      )}

      {/* CUSTOMER INFO */}
      {cart.length > 0 && (
        <div style={customerBox}>
          <h3 style={{ margin: 0, color: "#1dbf73" }}>Customer Details</h3>

          <div style={inputsRow}>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full name"
              style={inputStyle}
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              style={inputStyle}
            />
          </div>

          <p style={{ marginTop: "10px", color: "#aaa", fontSize: "13px" }}>
            This info will be saved for tracking + sent to WhatsApp.
          </p>
        </div>
      )}

      <AnimatePresence>
        {cart.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
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

          <div style={actions}>
            <button onClick={clearCart} style={clearBtn} disabled={loading}>
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              style={{
                ...checkoutBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout on WhatsApp"}
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
  marginBottom: "20px",
};

const customerBox = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  padding: "16px",
  marginBottom: "20px",
};

const inputsRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginTop: "12px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#02130d",
  color: "white",
  outline: "none",
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
  marginTop: "25px",
  fontSize: "20px",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "22px",
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
};