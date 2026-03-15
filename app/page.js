"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { phones } from "../data/phones";

// Stagger container variant
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function HomePage() {
  const featured = phones.filter((p) =>
    ["iphone-14", "iphone-15-pro", "iphone-13-pro-max"].includes(p.id)
  );

  const [count, setCount] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < phones.length ? prev + 1 : prev));
    }, 18);
    return () => clearInterval(interval);
  }, []);

  // Subtle cursor glow effect
  useEffect(() => {
    const handleMove = (e) => {
      setGlowPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div style={container}>
      {/* ANIMATED BG */}
      <div style={bgGrid} />
      <div style={bgGlow1} />
      <div style={bgGlow2} />
      <div
        style={{
          ...cursorGlow,
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
        }}
      />

      {/* HERO — staggered entrance */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={hero}
      >
        <motion.div variants={itemVariants} style={badge}>
          🇲🇼 &nbsp;Malawi's #1 Phone Store
        </motion.div>

        <motion.h1 variants={itemVariants} style={title}>
          Premium Phones.
          <br />
          <motion.span
            style={titleAccent}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Real Deals.
          </motion.span>
        </motion.h1>

        <motion.p variants={itemVariants} style={subtitle}>
          Verified smartphones imported directly from trusted suppliers.
          <br />
          Transparent pricing. No surprises. Delivered across Malawi.
        </motion.p>

        <motion.div variants={itemVariants} style={actions}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/products" style={primaryBtn}>
              Browse {count}+ Phones →
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href="https://wa.me/265882267019" style={secondaryBtn}>
              💬 Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={statsRow}
      >
        {[
          { number: "50+", label: "Phone Models" },
          { number: "100%", label: "Verified Devices" },
          { number: "24hr", label: "Fast Delivery" },
          { number: "MWK", label: "Local Pricing" },
        ].map((s) => (
          <motion.div key={s.label} variants={itemVariants} style={statItem}>
            <span style={statNum}>{s.number}</span>
            <span style={statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* TRUST CARDS */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={trustSection}
      >
        {[
          { icon: "✔", title: "Verified Devices", desc: "Every phone is inspected and authenticated before sale.", color: "#1dbf73" },
          { icon: "⚡", title: "Fast Delivery", desc: "Quick and secure delivery to your door across Malawi.", color: "#f5c842" },
          { icon: "🔒", title: "Secure Ordering", desc: "Order with confidence via WhatsApp or online checkout.", color: "#42b0f5" },
        ].map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: `0 20px 40px ${card.color}22`,
              borderColor: card.color + "55",
              transition: { duration: 0.2 },
            }}
            style={{ ...trustCard, borderColor: card.color + "33" }}
          >
            <motion.div
              style={{ ...trustIconBox, background: card.color + "22", color: card.color }}
              whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.2 } }}
            >
              {card.icon}
            </motion.div>
            <h3 style={trustTitle}>{card.title}</h3>
            <p style={trustDesc}>{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* FEATURED */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        style={featuredSection}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={sectionHeader}
        >
          <h2 style={sectionTitle}>Featured Phones</h2>
          <Link href="/products" style={seeAll}>View All →</Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          style={featuredGrid}
        >
          {featured.map((phone) => (
            <motion.div
              key={phone.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 24px 48px rgba(29,191,115,0.15)",
                borderColor: "rgba(29,191,115,0.3)",
                transition: { duration: 0.2 },
              }}
            >
              <Link href={`/products/${phone.id}`} style={featuredCard}>
                <div style={imgWrapper}>
                  <motion.img
                    src={Object.values(phone.images)[0]}
                    alt={phone.name}
                    style={phoneImg}
                    whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
                  />
                </div>
                <div style={cardBody}>
                  <h4 style={cardName}>{phone.name}</h4>
                  <p style={cardStorage}>{phone.variants.length} storage options</p>
                  <div style={cardFooter}>
                    <span style={cardPrice}>From MWK {phone.variants[0].price.toLocaleString()}</span>
                    <motion.span
                      style={cardArrow}
                      whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55 }}
        whileHover={{ boxShadow: "0 0 60px rgba(29,191,115,0.12)", transition: { duration: 0.3 } }}
        style={ctaBanner}
      >
        <div style={ctaLeft}>
          <h2 style={ctaTitle}>Not sure which phone to get?</h2>
          <p style={ctaDesc}>Chat with us on WhatsApp and we'll help you find the perfect match.</p>
        </div>
        <motion.a
          href="https://wa.me/265882267019"
          style={ctaBtn}
          whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(29,191,115,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          💬 Chat Now
        </motion.a>
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

const cursorGlow = {
  position: "fixed",
  width: "400px",
  height: "400px",
  background: "radial-gradient(circle, rgba(29,191,115,0.06) 0%, transparent 60%)",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 0,
  transition: "left 0.4s ease, top 0.4s ease",
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
  display: "inline-block",
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
  display: "inline-block",
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
  cursor: "default",
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
};

const imgWrapper = {
  background: "rgba(255,255,255,0.04)",
  padding: "32px",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  overflow: "hidden",
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
  display: "inline-block",
};

const ctaBanner = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1100px",
  margin: "0 auto 80px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, rgba(29,191,115,0.15), rgba(29,191,115,0.05))",
  border: "1px solid rgba(29,191,115,0.25)",
  borderRadius: "24px",
  gap: "24px",
  flexWrap: "wrap",
  padding: "36px 40px",
  cursor: "default",
};

const ctaLeft = { flex: 1 };

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
  display: "inline-block",
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