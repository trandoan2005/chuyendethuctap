"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = i.qty + amount;
          return { ...i, qty: newQty > 0 ? newQty : 1 };
        }
        return i;
      })
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const priceStr = item.price.toString().replace(/,/g, '');
      return total + parseInt(priceStr) * item.qty;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
