"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/cartcontext";

export default function ClientProductPage({ product }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({});

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        style={{
          width: "260px",
          marginBottom: "25px",
          transition: "0.3s ease",
        }}
      />

      <h1 style={{ fontSize: "36px", color: "#1dbf73" }}>{product.name}</h1>

      <h3 style={{ marginTop: "30px" }}>Choose Color</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        {product.colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border:
                selectedColor === color ? "2px solid #1dbf73" : "1px solid #555",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "30px" }}>Choose Storage</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        {product.variants.map((variant) => (
          <button
            key={variant.storage}
            onClick={() => setSelectedVariant(variant)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border:
                selectedVariant.storage === variant.storage
                  ? "2px solid #1dbf73"
                  : "1px solid #555",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {variant.storage}
          </button>
        ))}
      </div>

      <h2 style={{ marginTop: "30px", color: "#1dbf73" }}>
        MWK {selectedVariant.price?.toLocaleString()}
      </h2>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            color: selectedColor,
            storage: selectedVariant.storage,
            price: selectedVariant.price,
            quantity: 1,
          })
        }
        style={{
          marginTop: "35px",
          background: "#1dbf73",
          padding: "14px 36px",
          borderRadius: "30px",
          color: "#02130d",
          fontSize: "18px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          transition: "0.25s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Add to Cart
      </button>
    </div>
  );
}