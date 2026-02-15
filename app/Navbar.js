"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./context/cartcontext";
import MobileCart from "./components/MobileCart";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav style={nav}>
        <Link href="/" style={logo}>
          RangeBrothers
        </Link>

        {/* DESKTOP LINKS */}
        <div className="desktop-nav" style={links}>
          <Link href="/products" style={link}>Products</Link>
          <Link href="/cart" style={link}>Cart ({cartCount})</Link>
        </div>

        {/* MOBILE ICONS */}
        <div className="mobile-nav" style={mobileIcons}>
          <button style={iconBtn} onClick={() => setCartOpen(true)}>
            🛒
            {cartCount > 0 && <span style={badge}>{cartCount}</span>}
          </button>

          <button style={iconBtn} onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={menuOverlay}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              style={menu}
              onClick={(e) => e.stopPropagation()}
            >
              <Link href="/products" style={menuLink} onClick={() => setMenuOpen(false)}>
                Products
              </Link>
              <Link href="/cart" style={menuLink} onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE CART (NO WRAPPER) */}
      <MobileCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

/* ---------------- STYLES ---------------- */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  background: "#0b0f0d",
  position: "sticky",
  top: 0,
  zIndex: 30,
};

const logo = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1dbf73",
  textDecoration: "none",
};

const links = {
  display: "flex",
  gap: "20px",
};

const link = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
};

const mobileIcons = {
  display: "none",
  gap: "14px",
};

const iconBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "20px",
  position: "relative",
  cursor: "pointer",
};

const badge = {
  position: "absolute",
  top: "-6px",
  right: "-10px",
  background: "#1dbf73",
  color: "#02130d",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "12px",
  fontWeight: "700",
};

const menuOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 40,
};

const menu = {
  background: "#0b0f0d",
  padding: "20px",
  borderRadius: "16px",
  margin: "80px auto",
  width: "90%",
  maxWidth: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const menuLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
  textAlign: "center",
};

/* --------- RESPONSIVE --------- */

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-nav { display: flex !important; }
    }
  `;
  document.head.appendChild(style);
}