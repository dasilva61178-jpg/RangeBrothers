"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./context/cartcontext";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

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
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* LEFT: BRAND */}
        <Link
          href="/"
          style={{
            color: "#1dbf73",
            fontWeight: 800,
            fontSize: "20px",
            letterSpacing: "0.5px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          RangeBrothers
        </Link>

        {/* RIGHT: LINKS (mobile-first compact) */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Link
            href="/products"
            style={{
              color: isActive("/products") ? "#1dbf73" : "#ffffff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              opacity: isActive("/products") ? 1 : 0.9,
            }}
          >
            Products
          </Link>

          <Link
            href="/cart"
            style={{
              color: isActive("/cart") ? "#1dbf73" : "#ffffff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: isActive("/cart") ? 1 : 0.9,
            }}
          >
            <span style={{ fontSize: "18px" }}>🛒</span>
            <span>Cart</span>

            {/* Count pill */}
            <span
              style={{
                minWidth: "22px",
                height: "22px",
                padding: "0 7px",
                borderRadius: "999px",
                background: "#1dbf73",
                color: "#02130d",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {cartCount || 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
