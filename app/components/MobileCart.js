"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartcontext";

export default function MobileCart({ open, onClose }) {
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlay}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={panel}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={header}>
              <div style={{ fontWeight: 700 }}>Cart</div>
              <button style={closeBtn} onClick={onClose}>
                ✕
              </button>
            </div>

            {cartCount === 0 ? (
              <p style={{ opacity: 0.7, marginTop: "10px" }}>
                Your cart is empty.
              </p>
            ) : (
              <>
                <p style={{ opacity: 0.7, marginTop: "10px" }}>
                  {cartCount} item{cartCount === 1 ? "" : "s"} in cart
                </p>

                <Link href="/cart" onClick={onClose} style={goBtn}>
                  Go to Cart
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* styles */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "80px",
};

const panel = {
  width: "92%",
  maxWidth: "360px",
  background: "#0b0f0d",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.10)",
  padding: "16px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

const goBtn = {
  marginTop: "14px",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  padding: "12px 16px",
  borderRadius: "12px",
  background: "#1dbf73",
  color: "#02130d",
  fontWeight: 700,
  textDecoration: "none",
};