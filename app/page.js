"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { phones } from "../data/phones";

export default function HomePage() {
  const featured = phones.filter((p) =>
    ["iphone-14", "iphone-15-pro", "iphone-13-pro-max"].includes(p.id)
  );

  return (
    <div style={container}>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={hero}
      >
        <h1 style={title}>
          Premium Smartphones
          <br />
          Delivered Across Malawi
        </h1>

        <p style={subtitle}>
          Verified phones imported directly from trusted suppliers.
          Transparent pricing. No surprises.
        </p>

        <div style={actions}>
          <Link href="/products" style={primaryBtn}>
            Browse Phones
          </Link>
          <a
            href="https://wa.me/265882267019"
            style={secondaryBtn}
          >
            Chat on WhatsApp
          </a>
        </div>
      </motion.section>

      {/* TRUST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={trustSection}
      >
        <div style={trustCard}>
          <span style={trustIcon}>✔</span>
          <h3>Verified Devices</h3>
          <p>Every phone is inspected and authenticated.</p>
        </div>

        <div style={trustCard}>
          <span style={trustIcon}>⚡</span>
          <h3>Fast Delivery</h3>
          <p>Quick and secure delivery across Malawi.</p>
        </div>

        <div style={trustCard}>
          <span style={trustIcon}>🔒</span>
          <h3>Secure Ordering</h3>
          <p>Order confidently via WhatsApp checkout.</p>
        </div>
      </motion.section>

      {/* FEATURED PHONES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={featuredSection}
      >
        <h2 style={sectionTitle}>Featured Phones</h2>

        <div style={carousel}>
          {featured.map((phone) => (
            <Link
              key={phone.id}
              href={`/products/${phone.id}`}
              style={phoneCard}
            >
              <motion.img
                src={Object.values(phone.images)[0]}
                alt={phone.name}
                style={phoneImage}
                whileHover={{ scale: 1.05 }}
              />
              <h4>{phone.name}</h4>
              <p style={price}>
                From MWK {phone.variants[0].price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* BACKGROUND GLOW */}
      <div style={glow} />
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  padding: "20px",
  position: "relative",
  overflow: "hidden",
};

const hero = {
  maxWidth: "900px",
  margin: "80px auto 60px",
  textAlign: "center",
};

const title = {
  fontSize: "clamp(32px, 6vw, 56px)",
  fontWeight: "800",
  lineHeight: "1.1",
};

const subtitle = {
  marginTop: "18px",
  fontSize: "18px",
  opacity: 0.75,
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
  textDecoration: "none",
};

const secondaryBtn = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "14px 28px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.2)",
  textDecoration: "none",
};

const trustSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  maxWidth: "1000px",
  margin: "60px auto",
};

const trustCard = {
  background: "rgba(255,255,255,0.05)",
  padding: "24px",
  borderRadius: "16px",
  textAlign: "center",
};

const trustIcon = {
  fontSize: "28px",
  color: "#1dbf73",
};

const featuredSection = {
  maxWidth: "1100px",
  margin: "80px auto",
};

const sectionTitle = {
  fontSize: "28px",
  marginBottom: "20px",
};

const carousel = {
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  paddingBottom: "10px",
};

const phoneCard = {
  minWidth: "220px",
  background: "rgba(255,255,255,0.05)",
  padding: "16px",
  borderRadius: "16px",
  textDecoration: "none",
  color: "#fff",
};

const phoneImage = {
  width: "100%",
  height: "180px",
  objectFit: "contain",
};

const price = {
  color: "#1dbf73",
  marginTop: "8px",
};

const glow = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(29,191,115,0.25) 0%, rgba(29,191,115,0) 70%)",
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: -1,
};
