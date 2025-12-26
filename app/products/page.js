"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, phones } from "../../data/phones";

import { useCart } from "../context/cartcontext";
<button
  onClick={() =>
    addToCart({
      name: product.name,
      color: selectedColor,
      storage: selectedVariant.storage,
      price: selectedVariant.price
    })
  }
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    borderRadius: "30px",
    background: "#1dbf73",
    color: "#02130d",
    border: "none",
    fontSize: "16px",
    cursor: "pointer"
  }}
>
  Add to Cart
</button>


export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting Logic
  const sortPhones = (phonesList) => {
    switch (sortOption) {
      case "price-low":
        return [...phonesList].sort(
          (a, b) =>
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price))
        );

      case "price-high":
        return [...phonesList].sort(
          (a, b) =>
            Math.min(...b.variants.map((v) => v.price)) -
            Math.min(...a.variants.map((v) => v.price))
        );

      case "name-az":
        return [...phonesList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "name-za":
        return [...phonesList].sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      default:
        return phonesList;
    }
  };

  // Filter FIRST → Then Search → Then Sort
  let filteredPhones =
    selectedCategory === "all"
      ? phones
      : phones.filter((p) => p.category === selectedCategory);

  filteredPhones = filteredPhones.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredPhones = sortPhones(filteredPhones);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "25px 15px",
        }}
      >
        <h2 style={{ color: "#1dbf73", marginBottom: "20px" }}>Categories</h2>

        <button
          onClick={() => setSelectedCategory("all")}
          style={{
            padding: "10px",
            marginBottom: "10px",
            background: selectedCategory === "all" ? "#1dbf73" : "transparent",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            color: selectedCategory === "all" ? "#02130d" : "#d8e6df",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
        >
          All Phones
        </button>

        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              background:
                selectedCategory === cat.key ? "#1dbf73" : "transparent",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              color:
                selectedCategory === cat.key ? "#02130d" : "#d8e6df",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "30px" }}>
        <h1
          style={{
            fontSize: "36px",
            color: "#1dbf73",
            marginBottom: "20px",
          }}
        >
          Products
        </h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search phones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #1dbf73",
            background: "#02130d",
            color: "white",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />

        {/* SORTING DROPDOWN */}
        <div style={{ marginBottom: "20px" }}>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "#02130d",
              color: "white",
              border: "1px solid #1dbf73",
            }}
          >
            <option value="none">Sort By</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name-az">Name: A → Z</option>
            <option value="name-za">Name: Z → A</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPhones.map((product, index) => {
  const startingPrice = Math.min(
    ...product.variants.map((v) => v.price)
  );

  return (
    <div
      key={product.id}
      className={`product-card delay-${(index % 5) + 1}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >

                <Link
                  href={`/products/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <h3 style={{ marginBottom: "8px", color: "white" }}>
                    {product.name}
                  </h3>

                  <p style={{ margin: "4px 0", color: "#aaa" }}>
                    {product.variants.length} storage options
                  </p>

                  <p
                    style={{
                      color: "#1dbf73",
                      fontWeight: "bold",
                    }}
                  >
                    Starting at MWK{" "}
                    {startingPrice.toLocaleString()}
                  </p>

                  <button
                    style={{
                      marginTop: "12px",
                      padding: "8px 14px",
                      background: "#1dbf73",
                      borderRadius: "8px",
                      border: "none",
                      color: "#02130d",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

