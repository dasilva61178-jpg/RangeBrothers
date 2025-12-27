
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div style={container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={hero}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={title}
        >
          Premium Smartphones
          <br />
          Delivered Across Malawi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={subtitle}
        >
          RangeBrothers imports verified phones directly from trusted suppliers.
          Transparent pricing. No surprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={actions}
        >
          <Link href="/products" style={primaryBtn}>
            Browse Phones
          </Link>

          <a
            href="https://wa.me/265882267019"
            style={secondaryBtn}
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative gradient */}
      <div style={glow} />
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  minHeight: "calc(100vh - 80px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
};

const hero = {
  maxWidth: "900px",
  textAlign: "center",
  zIndex: 2,
};

const title = {
  fontSize: "clamp(32px, 6vw, 56px)",
  fontWeight: "800",
  lineHeight: "1.1",
  color: "#ffffff",
};

const subtitle = {
  marginTop: "18px",
  fontSize: "clamp(16px, 2.5vw, 20px)",
  color: "rgba(255,255,255,0.75)",
  maxWidth: "600px",
  marginInline: "auto",
};

const actions = {
  marginTop: "36px",
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const primaryBtn = {
  background: "#1dbf73",
  color: "#02130d",
  padding: "14px 28px",
  borderRadius: "30px",
  fontWeight: "600",
  fontSize: "16px",
  textDecoration: "none",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const secondaryBtn = {
  background: "rgba(255,255,255,0.08)",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "30px",
  fontWeight: "500",
  fontSize: "16px",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.2)",
};

const glow = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(29,191,115,0.25) 0%, rgba(29,191,115,0) 70%)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
};
