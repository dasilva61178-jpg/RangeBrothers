"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, phones } from "../../data/phones";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  const sortPhones = (list) => {
    switch (sortOption) {
      case "price-low":
        return [...list].sort((a, b) =>
          Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price))
        );
      case "price-high":
        return [...list].sort((a, b) =>
          Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price))
        );
      case "name-az":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  };

  let filteredPhones = selectedCategory === "all"
    ? phones
    : phones.filter((p) => p.category === selectedCategory);

  filteredPhones = filteredPhones.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredPhones = sortPhones(filteredPhones);

  return (
    <div style={pageWrapper}>
      <div style={bgGrid} />
      <div style={bgGlow} />

      <div style={layout}>
        {/* SIDEBAR */}
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={sidebar}
        >
          <div style={sidebarInner}>
            <p style={sidebarLabel}>CATEGORIES</p>

            {[{ name: "All Phones", key: "all", count: phones.length }, ...categories.map((c) => ({
              ...c,
              count: phones.filter((p) => p.category === c.key).length,
            }))].map((cat, i) => (
              <motion.button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={catBtn(selectedCategory === cat.key)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{cat.name}</span>
                <span style={catCount}>{cat.count}</span>
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* MAIN */}
        <main style={main}>
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={mainHeader}
          >
            <h1 style={pageTitle}>
              {selectedCategory === "all"
                ? "All Phones"
                : categories.find((c) => c.key === selectedCategory)?.name}
            </h1>
            <p style={resultCount}>
              {filteredPhones.length} phone{filteredPhones.length !== 1 ? "s" : ""} found
            </p>
          </motion.div>

          {/* TOOLBAR */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={toolbar}
          >
            <div style={searchWrapper}>
              <span style={searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInput}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    style={clearBtn}
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={sortSelect}
            >
              <option value="none">Sort By</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name-az">Name: A → Z</option>
              <option value="name-za">Name: Z → A</option>
            </select>
          </motion.div>

          {/* GRID */}
          <AnimatePresence mode="wait">
            {filteredPhones.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={emptyState}
              >
                <motion.span
                  style={{ fontSize: "52px", display: "block" }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  📱
                </motion.span>
                <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
                  No phones found for "{searchQuery}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory + sortOption}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                style={grid}
              >
                {filteredPhones.map((product) => {
                  const startingPrice = Math.min(...product.variants.map((v) => v.price));
                  const img = Object.values(product.images)[0];

                  return (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 40px rgba(29,191,115,0.15)",
                        borderColor: "rgba(29,191,115,0.3)",
                        transition: { duration: 0.2 },
                      }}
                      style={card}
                    >
                      <Link href={`/products/${product.id}`} style={cardLink}>
                        <div style={cardImgBox}>
                          <motion.img
                            src={img}
                            alt={product.name}
                            style={cardImg}
                            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                          />
                        </div>
                        <div style={cardInfo}>
                          <h3 style={cardName}>{product.name}</h3>
                          <p style={cardVariants2}>
                            {product.variants.length} options · {product.colors.length} colors
                          </p>
                          <div style={cardBottom}>
                            <span style={cardPrice}>MWK {startingPrice.toLocaleString()}</span>
                            <motion.span
                              style={viewBtn}
                              whileHover={{ x: 3, transition: { duration: 0.15 } }}
                            >
                              View →
                            </motion.span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ─── STYLES ─── */

const pageWrapper = {
  minHeight: "100vh",
  background: "#060a07",
  color: "#fff",
  position: "relative",
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

const bgGlow = {
  position: "fixed",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, rgba(29,191,115,0.1) 0%, transparent 70%)",
  top: "0",
  right: "0",
  pointerEvents: "none",
  zIndex: 0,
};

const layout = {
  display: "flex",
  position: "relative",
  zIndex: 1,
  minHeight: "100vh",
};

const sidebar = {
  width: "240px",
  flexShrink: 0,
  borderRight: "1px solid rgba(255,255,255,0.07)",
  padding: "32px 0",
  position: "sticky",
  top: 0,
  height: "100vh",
  overflowY: "auto",
};

const sidebarInner = { padding: "0 16px" };

const sidebarLabel = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.12em",
  color: "rgba(255,255,255,0.3)",
  marginBottom: "12px",
  marginTop: 0,
};

const catBtn = (active) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  marginBottom: "6px",
  background: active ? "rgba(29,191,115,0.15)" : "transparent",
  borderRadius: "12px",
  border: active ? "1px solid rgba(29,191,115,0.35)" : "1px solid transparent",
  color: active ? "#1dbf73" : "rgba(255,255,255,0.65)",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: active ? "700" : "400",
  textAlign: "left",
});

const catCount = {
  fontSize: "12px",
  background: "rgba(255,255,255,0.08)",
  borderRadius: "100px",
  padding: "2px 8px",
  color: "rgba(255,255,255,0.4)",
};

const main = {
  flex: 1,
  padding: "32px 32px 80px",
  minWidth: 0,
};

const mainHeader = { marginBottom: "24px" };

const pageTitle = {
  fontSize: "32px",
  fontWeight: "900",
  letterSpacing: "-0.02em",
  margin: "0 0 4px",
};

const resultCount = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.4)",
  margin: 0,
};

const toolbar = {
  display: "flex",
  gap: "12px",
  marginBottom: "28px",
  flexWrap: "wrap",
};

const searchWrapper = {
  flex: 1,
  minWidth: "200px",
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const searchIcon = {
  position: "absolute",
  left: "14px",
  fontSize: "14px",
  opacity: 0.5,
};

const searchInput = {
  width: "100%",
  padding: "11px 40px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const clearBtn = {
  position: "absolute",
  right: "12px",
  background: "transparent",
  border: "none",
  color: "rgba(255,255,255,0.4)",
  cursor: "pointer",
  fontSize: "14px",
};

const sortSelect = {
  padding: "11px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "16px",
};

const emptyState = {
  textAlign: "center",
  padding: "80px 0",
};

const card = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  overflow: "hidden",
};

const cardLink = {
  display: "block",
  textDecoration: "none",
  color: "#fff",
};

const cardImgBox = {
  background: "rgba(255,255,255,0.03)",
  padding: "28px",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  overflow: "hidden",
};

const cardImg = {
  height: "140px",
  objectFit: "contain",
};

const cardInfo = { padding: "16px" };

const cardName = {
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 4px",
  color: "#fff",
};

const cardVariants2 = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 14px",
};

const cardBottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const cardPrice = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#1dbf73",
};

const viewBtn = {
  fontSize: "13px",
  color: "#1dbf73",
  fontWeight: "600",
  display: "inline-block",
};