"use client";

import { createContext, useContext, useState } from "react";

const cartcontext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.color === item.color &&
          p.storage === item.storage
      );

      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQty(index, qty) {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <cartcontext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </cartcontext.Provider>
  );
}

export function useCart() {
  return useContext(cartcontext);
}

