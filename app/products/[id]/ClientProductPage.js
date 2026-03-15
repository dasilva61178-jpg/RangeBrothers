"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/cartcontext";
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function ClientProductPage({ product }) {
  const { addToCart, cart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({});
  const [added, setAdded] = useState(false);
  const [prevColor, setPrevColor] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleColorChange = (color) => {
    setPrevColor(selectedColor);
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      color: selectedColor,
      storage: selectedVariant.storage,
      price: selectedVariant.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={pageWrapper}>
      <div style={bgGrid} />
      <div style={bgGlow} />

      <div style={layout}>
        {/* IMAGE PANEL */}
        <motion.div
          custom={0}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          style={imagePanel}
        >
          {/* IMAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={imgBox}
            >
              <motion.img
                src={product.images[selectedColor]}
                alt={`${product.name} ${selectedColor}`}
                style={productImg}
                animate={{
                  filter: [
                    "drop-shadow(0 20px 40px rgba(29,191,115,0.15))",
                    "drop-shadow(0 28px 50px rgba(29,191,115,0.28))",
                    "drop-shadow(0 20px 40px rgba(29,191,115,0.15))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* COLOR CHIPS */}
          <motion.div
            style={colorChips}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {product.colors.map((color, i) => (
              <motion.button
                key={color}
                onClick={() => handleColorChange(color)}
                style={colorChip(selectedColor === color)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.94 }}
              >
                {color}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* INFO PANEL */}
        <motion.div
          custom={0.15}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          style={infoPanel}
        >
          {/* BREADCRUMB */}
          <motion.p
            style={breadcrumb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="/products" style={breadcrumbLink}>Products</a>
            {" / "}
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{product.name}</span>
          </motion.p>

          <motion.h1
            style={productName}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {product.name}
          </motion.h1>

          {/* PRICE */}
          <motion.div
            style={priceBox}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedVariant.price}
                style={price}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                MWK {selectedVariant.price?.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            <span style={priceBadge}>In Stock</span>
          </motion.div>

          <div style={divider} />

          {/* COLOR */}
          <motion.div
            style={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p style={sectionLabel}>
              Color — <span style={sectionValue}>{selectedColor}</span>
            </p>
            <div style={colorBtns}>
              {product.colors.map((color, i) => (
                <motion.button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  style={colorBtn(selectedColor === color)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 + i * 0.05 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* STORAGE */}
          <motion.div
            style={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p style={sectionLabel}>
              Storage — <span style={sectionValue}>{selectedVariant.storage}</span>
            </p>
            <div style={storageBtns}>
              {product.variants.map((variant, i) => (
                <motion.button
                  key={variant.storage}
                  onClick={() => setSelectedVariant(variant)}
                  style={storageBtn(selectedVariant.storage === variant.storage)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52 + i * 0.06 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span style={storageBtnLabel}>{variant.storage}</span>
                  <span style={storageBtnPrice}>MWK {variant.price.toLocaleString()}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div style={divider} />

          {/* ADD TO CART */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={handleAddToCart}
              style={added ? addedBtn : addBtn}
              whileHover={!added ? { scale: 1.02, boxShadow: "0 0 40px rgba(29,191,115,0.5)" } : {}}
              whileTap={{ scale: 0.97 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={added ? "added" : "add"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="https://wa.me/265882267019"
              style={whatsappBtn}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.09)", transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
            >
              💬 Order via WhatsApp
            </motion.a>
          </motion.div>

          {/* TRUST TAGS */}
          <motion.div
            style={trustRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            {["✔ Verified Device", "🚚 Fast Delivery", "🔒 Secure Order"].map((t, i) => (
              <motion.span
                key={t}
                style={trustTag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.78 + i * 0.07 }}
                whileHover={{ scale: 1.05, background: "rgba(29,191,115,0.1)", transition: { duration: 0.15 } }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
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
  width: "700px",
  height: "700px",
  background: "radial-gradient(circle, rgba(29,191,115,0.1) 0%, transparent 70%)",
  top: "-200px",
  left: "-200px",
  pointerEvents: "none",
  zIndex: 0,
};

const layout = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "60px 24px 100px",
  position: "relative",
  zIndex: 1,
  gap: "24px",
};

const imagePanel = {
  flex: "1 1 400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "28px",
};

const imgBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "320px",
  marginBottom: "32px",
  width: "100%",
};

const productImg = {
  maxHeight: "300px",
  maxWidth: "100%",
  objectFit: "contain",
};

const colorChips = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const colorChip = (active) => ({
  padding: "6px 14px",
  borderRadius: "100px",
  border: active ? "2px solid #1dbf73" : "1px solid rgba(255,255,255,0.15)",
  background: active ? "rgba(29,191,115,0.15)" : "transparent",
  color: active ? "#1dbf73" : "rgba(255,255,255,0.5)",
  fontSize: "12px",
  fontWeight: active ? "700" : "400",
  cursor: "pointer",
});

const infoPanel = {
  flex: "1 1 380px",
};

const breadcrumb = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "16px",
};

const breadcrumbLink = {
  color: "#1dbf73",
  textDecoration: "none",
};

const productName = {
  fontSize: "clamp(28px, 4vw, 42px)",
  fontWeight: "900",
  letterSpacing: "-0.03em",
  margin: "0 0 20px",
  lineHeight: "1.1",
};

const priceBox = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "24px",
};

const price = {
  fontSize: "32px",
  fontWeight: "900",
  color: "#1dbf73",
  letterSpacing: "-0.02em",
  display: "inline-block",
};

const priceBadge = {
  background: "rgba(29,191,115,0.15)",
  border: "1px solid rgba(29,191,115,0.3)",
  color: "#1dbf73",
  padding: "4px 12px",
  borderRadius: "100px",
  fontSize: "12px",
  fontWeight: "600",
};

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.07)",
  margin: "24px 0",
};

const section = { marginBottom: "24px" };

const sectionLabel = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.45)",
  marginBottom: "12px",
  fontWeight: "500",
};

const sectionValue = {
  color: "#fff",
  fontWeight: "600",
};

const colorBtns = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const colorBtn = (active) => ({
  padding: "8px 18px",
  borderRadius: "100px",
  border: active ? "2px solid #1dbf73" : "1px solid rgba(255,255,255,0.15)",
  background: active ? "rgba(29,191,115,0.12)" : "transparent",
  color: active ? "#1dbf73" : "rgba(255,255,255,0.7)",
  fontSize: "13px",
  fontWeight: active ? "700" : "400",
  cursor: "pointer",
});

const storageBtns = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const storageBtn = (active) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px 20px",
  borderRadius: "14px",
  border: active ? "2px solid #1dbf73" : "1px solid rgba(255,255,255,0.12)",
  background: active ? "rgba(29,191,115,0.1)" : "rgba(255,255,255,0.03)",
  cursor: "pointer",
  gap: "4px",
});

const storageBtnLabel = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#fff",
};

const storageBtnPrice = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.4)",
};

const addBtn = {
  width: "100%",
  padding: "16px",
  borderRadius: "16px",
  background: "#1dbf73",
  color: "#02130d",
  fontSize: "16px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
  marginBottom: "12px",
  boxShadow: "0 0 30px rgba(29,191,115,0.35)",
  boxSizing: "border-box",
};

const addedBtn = {
  ...addBtn,
  background: "rgba(29,191,115,0.2)",
  color: "#1dbf73",
  border: "1px solid rgba(29,191,115,0.4)",
  boxShadow: "none",
};

const whatsappBtn = {
  display: "block",
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  marginBottom: "24px",
  boxSizing: "border-box",
};

const trustRow = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const trustTag = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.45)",
  background: "rgba(255,255,255,0.05)",
  padding: "6px 12px",
  borderRadius: "100px",
  cursor: "default",
};