"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./context/cartcontext";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(2, 19, 13, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{
            color: "#1dbf73",
            fontWeight: 800,
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          RangeBrothers
        </Link>

        {/* DESKTOP NAV */}
        <nav
          style={{
            display: "none",
            gap: "20px",
          }}
          className="desktop-nav"
        >
          <NavLinks
            isActive={isActive}
            cartCount={cartCount}
            close={() => {}}
          />
        </nav>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "26px",
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          background: "#02130d",
          borderTop: open ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: open ? "16px" : "0 16px",
            gap: "16px",
          }}
        >
          <NavLinks
            isActive={isActive}
            cartCount={cartCount}
            close={() => setOpen(false)}
          />
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @media (min-width: 768px) {
          button {
            display: none;
          }
          .desktop-nav {
            display: flex !important;
          }
          div[style*="max-height"] {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

/* -------- LINKS COMPONENT -------- */
function NavLinks({ isActive, cartCount, close }) {
  return (
    <>
      <Link
        href="/products"
        onClick={close}
        style={{
          color: isActive("/products") ? "#1dbf73" : "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Products
      </Link>

      <Link
        href="/cart"
        onClick={close}
        style={{
          color: isActive("/cart") ? "#1dbf73" : "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        🛒 Cart
        <span
          style={{
            background: "#1dbf73",
            color: "#02130d",
            borderRadius: "999px",
            padding: "2px 8px",
            fontSize: "14px",
            fontWeight: 800,
          }}
        >
          {cartCount || 0}
        </span>
      </Link>
    </>
  );
}
