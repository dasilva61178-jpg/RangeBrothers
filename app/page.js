
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { phones } from "../data/phones";

export default function HomePage() {
  const featured = phones.filter((p) =>
    ["iphone-14", "iphone-15-pro", "iphone-13-pro-max"].includes(p.id)
  );

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < phones.length ? prev + 1 : prev));
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={container}>
      {/* ANIMATED BG */}
      <div style={bgGrid} />
      <div style={bgGlow1} />
      <div style={bgGlow2} />

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={hero}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={badge}
        >
          🇲🇼 &nbsp;Malawi's #1 Phone Store
        </motion.div>

        <h1 style={title}>
          Premium Phones.
          <br />
          <span style={titleAccent}>Real Deals.</span>
        </h1>

        <p style={subtitle}>
          Verified smartphones imported directly from trusted suppliers.
          <br />
          Transparent pricing. No surprises. Delivered across Malawi.
        </p>

        <div style={actions}>
          <Link href="/products" style={primaryBtn}>
            Browse {count}+ Phones →
          </Link>
          <a href="https://wa.me/265882267019" style={secondaryBtn}>
            💬 Chat on WhatsApp
          </a>
        </div>
      </motion.section>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={statsRow}
      >
        {[
          { number: "50+", label: "Phone Models" },
          { number: "100%", label: "Verified Devices" },
          { number: "24hr", label: "Fast Delivery" },
          { number: "MWK", label: "Local Pricing" },
        ].map((s) => (
          <div key={s.label} style={statItem}>
            <span style={statNum}>{s.number}</span>
            <span style={statLabel}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* TRUST CARDS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={trustSection}
      >
        {[
          {
            icon: "✔",
            title: "Verified Devices",
            desc: "Every phone is inspected and authenticated before sale.",
            color: "#1dbf73",
          },
          {
            icon: "⚡",
            title: "Fast Delivery",
            desc: "Quick and secure delivery to your door across Malawi.",
            color: "#f5c842",
          },
          {
            icon: "🔒",
            title: "Secure Ordering",
            desc: "Order with confidence via WhatsApp or online checkout.",
            color: "#42b0f5",
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ ...trustCard, borderColor: card.color + "33" }}
          >
            <div style={{ ...trustIconBox, background: card.color + "22", color: card.color }}>
              {card.icon}
            </div>
            <h3 style={trustTitle}>{card.title}</h3>
            <p style={trustDesc}>{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* FEATURED */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={featuredSection}
      >
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Featured Phones</h2>
          <Link href="/products" style={seeAll}>View All →</Link>
        </div>

        <div style={featuredGrid}>
          {featured.map((phone, i) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={`/products/${phone.id}`} style={featuredCard}>
                <div style={imgWrapper}>
                  <img
                    src={Object.values(phone.images)[0]}
                    alt={phone.name}
                    style={phoneImg}
                  />
                </div>
                <div style={cardBody}>
                  <h4 style={cardName}>{phone.name}</h4>
                  <p style={cardStorage}>
                    {phone.variants.length} storage options
                  </p>
                  <div style={cardFooter}>
                    <span style={cardPrice}>
                      From MWK {phone.variants[0].price.toLocaleString()}
                    </span>
                    <span style={cardArrow}>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={ctaBanner}
      >
        <div style={ctaLeft}>
          <h2 style={ctaTitle}>Not sure which phone to get?</h2>
          <p style={ctaDesc}>Chat with us on WhatsApp and we'll help you find the perfect match.</p>
        </div>
        <a href="https://wa.me/265882267019" style={ctaBtn}>
          💬 Chat Now
        </a>
      </motion.section>
    </div>
  );
}

/* ─── STYLES ─── */

const container = {
  minHeight: "100vh",
  background: "#060a07",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
};

const bgGrid = {
  position: "fixed",
  inset: 0,
  backgroundImage: `linear-gradient(rgba(29,191,115,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(29,191,115,0.04) 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
  pointerEvents: "none",
  zIndex: 0,
};

const bgGlow1 = {
  position: "fixed",
  width: "700px",
  height: "700px",
  background: "radial-gradient(circle, rgba(29,191,115,0.12) 0%, transparent 70%)",
  top: "-200px",
  right: "-200px",
  pointerEvents: "none",
  zIndex: 0,
};

const bgGlow2 = {
  position: "fixed",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(29,191,115,0.08) 0%, transparent 70%)",
  bottom: "0",
  left: "-100px",
  pointerEvents: "none",
  zIndex: 0,
};

const hero = {
  position: "relative",
  zIndex: 1,
  maxWidth: "860px",
  margin: "0 auto",
  padding: "100px 24px 60px",
  textAlign: "center",
};

const badge = {
  display: "inline-block",
  background: "rgba(29,191,115,0.15)",
  border: "1px solid rgba(29,191,115,0.4)",
  color: "#1dbf73",
  padding: "6px 18px",
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "0.05em",
  marginBottom: "28px",
};

const title = {
  fontSize: "clamp(40px, 7vw, 72px)",
  fontWeight: "900",
  lineHeight: "1.05",
  letterSpacing: "-0.03em",
  color: "#fff",
  margin: "0 0 20px",
};

const titleAccent = {
  color: "#1dbf73",
  display: "inline-block",
};

const subtitle = {
  fontSize: "clamp(15px, 2vw, 18px)",
  color: "rgba(255,255,255,0.6)",
  lineHeight: "1.7",
  margin: "0 0 40px",
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap",
};

const primaryBtn = {
  background: "#1dbf73",
  color: "#02130d",
  padding: "15px 30px",
  borderRadius: "100px",
  fontWeight: "700",
  fontSize: "15px",
  textDecoration: "none",
  letterSpacing: "0.01em",
  boxShadow: "0 0 30px rgba(29,191,115,0.4)",
};

const secondaryBtn = {
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  padding: "15px 30px",
  borderRadius: "100px",
  border: "1px solid rgba(255,255,255,0.15)",
  fontWeight: "600",
  fontSize: "15px",
  textDecoration: "none",
};

const statsRow = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  gap: "0",
  maxWidth: "700px",
  margin: "0 auto 80px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  overflow: "hidden",
};

const statItem = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "24px 16px",
  borderRight: "1px solid rgba(255,255,255,0.06)",
};

const statNum = {
  fontSize: "26px",
  fontWeight: "800",
  color: "#1dbf73",
};

const statLabel = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.45)",
  marginTop: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const trustSection = {
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  maxWidth: "1100px",
  margin: "0 auto 80px",
  padding: "0 24px",
};

const trustCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid",
  borderRadius: "20px",
  padding: "28px",
};

const trustIconBox = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  marginBottom: "16px",
};

const trustTitle = {
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 8px",
  color: "#fff",
};

const trustDesc = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.5)",
  lineHeight: "1.6",
  margin: 0,
};

const featuredSection = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1100px",
  margin: "0 auto 80px",
  padding: "0 24px",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const sectionTitle = {
  fontSize: "28px",
  fontWeight: "800",
  margin: 0,
  letterSpacing: "-0.02em",
};

const seeAll = {
  color: "#1dbf73",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
};

const featuredGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const featuredCard = {
  display: "block",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  textDecoration: "none",
  color: "#fff",
  overflow: "hidden",
  transition: "border-color 0.2s",
};

const imgWrapper = {
  background: "rgba(255,255,255,0.04)",
  padding: "32px",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const phoneImg = {
  height: "180px",
  objectFit: "contain",
};

const cardBody = {
  padding: "20px",
};

const cardName = {
  fontSize: "17px",
  fontWeight: "700",
  margin: "0 0 4px",
};

const cardStorage = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 16px",
};

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const cardPrice = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#1dbf73",
};

const cardArrow = {
  color: "#1dbf73",
  fontSize: "18px",
};

const ctaBanner = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1100px",
  margin: "0 auto 80px",
  padding: "0 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, rgba(29,191,115,0.15), rgba(29,191,115,0.05))",
  border: "1px solid rgba(29,191,115,0.25)",
  borderRadius: "24px",
  gap: "24px",
  flexWrap: "wrap",
  padding: "36px 40px",
};

const ctaLeft = {
  flex: 1,
};

const ctaTitle = {
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 8px",
  letterSpacing: "-0.02em",
};

const ctaDesc = {
  fontSize: "15px",
  color: "rgba(255,255,255,0.55)",
  margin: 0,
};

const ctaBtn = {
  background: "#1dbf73",
  color: "#02130d",
  padding: "14px 28px",
  borderRadius: "100px",
  fontWeight: "700",
  fontSize: "15px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  boxShadow: "0 0 24px rgba(29,191,115,0.35)",
};