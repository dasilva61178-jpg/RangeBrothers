"use client";

import { useCart } from "../context/cartcontext";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const whatsappMessage = encodeURIComponent(
    cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} | ${item.storage} | ${item.color} x${
            item.quantity
          } | MWK ${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n") +
      `\n\nTOTAL: MWK ${total.toLocaleString()}`
  );

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#1dbf73", fontSize: "36px" }}>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            border: "1px solid rgba(29,191,115,0.4)",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "20px",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "90px", borderRadius: "10px" }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, color: "#1dbf73" }}>{item.name}</h3>
            <p>{item.storage} • {item.color}</p>
            <p>
              MWK {(item.price * item.quantity).toLocaleString()}
            </p>

            {/* QUANTITY CONTROLS */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => decreaseQty(index)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(index)}>+</button>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(index)}
            style={{ color: "red" }}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 style={{ marginTop: "20px" }}>
            Total: <span style={{ color: "#1dbf73" }}>
              MWK {total.toLocaleString()}
            </span>
          </h2>

          <a
            href={`https://wa.me/265882267019?text=${whatsappMessage}`}
            target="_blank"
            style={{
              display: "inline-block",
              marginTop: "30px",
              background: "#1dbf73",
              padding: "14px 34px",
              borderRadius: "30px",
              color: "#02130d",
              fontSize: "18px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Checkout on WhatsApp
          </a>

          <br />

          <button onClick={clearCart} style={{ marginTop: "15px" }}>
            Clear Cart
          </button>
        </>
      )}
    </main>
  );
}

