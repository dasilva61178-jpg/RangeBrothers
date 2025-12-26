"use client";

import Link from "next/link";
import { useCart } from "./context/cartcontext";

export default function Navbar() {
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#1dbf73",
          textDecoration: "none",
        }}
      >
        RangeBrothers
      </Link>

      <div style={{ display: "flex", gap: "30px" }}>
        <Link href="/products" style={navLink}>
          Products
        </Link>

        <Link href="/cart" style={navLink}>
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>
    </nav>
  );
}

const navLink = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "16px",
};

