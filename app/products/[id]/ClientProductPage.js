"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/cartcontext";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientProductPage({ product }) {
  const { addToCart, cart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

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
    setTimeout(() => setAdded(false), 2000);
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={pageWrapper}>
      <div style={bgGrid} />
      <div style={bgGlow} />

      <div style={layout}>
        {/* IMAGE PANEL */}
        <div style={imagePanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={imgBox}
            >
              <img
                src={product.images[selectedColor]}
                alt={`${product.name} ${selectedColor}`}
                style={productImg}
              />
            </motion.div>
          </AnimatePresence>

          {/* COLOR DOTS */}
          <div style={colorDots}>
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={colorDot(selectedColor === color)}
                title={color}
              >
                <span style={colorDotLabel}>{color}</span>
              </button>
            ))}
          </div>
        </div>

        {/* INFO PANEL */}
        <div style={infoPanel}>
          {/* BREADCRUMB */}
          <p style={breadcrumb}>
            <a href="/products" style={breadcrumbLink}>Products</a>
            {" / "}
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{product.name}</span>
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={productName}
          >
            {product.name}
          </motion.h1>

          {/* PRICE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={priceBox}
          >
            <span style={price}>
              MWK {selectedVariant.price?.toLocaleString()}
            </span>
            <span style={priceBadge}>In Stock</span>
          </motion.div>

          {/* DIVIDER */}
          <div style={divider} />

          {/* COLOR SELECTION */}
          <div style={section}>
            <p style={sectionLabel}>
              Color — <span style={sectionValue}>{selectedColor}</span>
            </p>
            <div style={colorBtns}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={colorBtn(selectedColor === color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* STORAGE SELECTION */}
          <div style={section}>
            <p style={sectionLabel}>
              Storage — <span style={sectionValue}>{selectedVariant.storage}</span>
            </p>
            <div style={storageBtns}>
              {product.variants.map((variant) => (
                <button
                  key={variant.storage}
                  onClick={() => setSelectedVariant(variant)}
                  style={storageBtn(selectedVariant.storage === variant.storage)}
                >
                  <span style={storageBtnLabel}>{variant.storage}</span>
                  <span style={storageBtnPrice}>
                    MWK {variant.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div style={divider} />

          {/* ADD TO CART */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={added ? addedBtn : addBtn}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={added ? "added" : "add"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <a
            href="https://wa.me/265882267019"
            style={whatsappBtn}
            target="_blank"
            rel="noreferrer"
          >
            💬 Order via WhatsApp
          </a>

          {/* TRUST POINTS */}
          <div style={trustRow}>
            {["✔ Verified Device", "🚚 Fast Delivery", "🔒 Secure Order"].map((t) => (
              <span key={t} style={trustTag}>{t}</span>
            ))}
          </div>
        </div>
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
  gap: "0",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "60px 24px 100px",
  position: "relative",
  zIndex: 1,
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
  marginRight: "24px",
};

const imgBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "320px",
  marginBottom: "32px",
};

const productImg = {
  maxHeight: "300px",
  maxWidth: "100%",
  objectFit: "contain",
  filter: "drop-shadow(0 20px 40px rgba(29,191,115,0.2))",
};

const colorDots = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const colorDot = (active) => ({
  padding: "6px 14px",
  borderRadius: "100px",
  border: active ? "2px solid #1dbf73" : "1px solid rgba(255,255,255,0.15)",
  background: active ? "rgba(29,191,115,0.15)" : "transparent",
  color: active ? "#1dbf73" : "rgba(255,255,255,0.5)",
  fontSize: "12px",
  fontWeight: active ? "700" : "400",
  cursor: "pointer",
  transition: "all 0.15s",
});

const colorDotLabel = {
  pointerEvents: "none",
};

const infoPanel = {
  flex: "1 1 380px",
  paddingLeft: "8px",
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

const section = {
  marginBottom: "24px",
};

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
  transition: "all 0.15s",
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
  transition: "all 0.15s",
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
  transition: "all 0.2s",
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
  transition: "all 0.2s",
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
};