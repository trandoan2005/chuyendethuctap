"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import FoodService from "@/services/FoodService";

export default function MenuPage() {
  const { addToCart, cart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const categories = ["Tất cả", "Món chính", "Khai vị", "Đồ uống", "Tráng miệng", "Combo"];

  useEffect(() => {
    FoodService.getAll()
      .then(data => {
        const mappedData = data.map(f => ({
          id: f.foodId,
          name: f.foodName,
          price: f.price.toLocaleString(),
          cat: f.category,
          desc: f.description,
          img: f.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
        }));
        setFoods(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi gọi API foods:", err);
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
  };

  const filteredFoods = activeTab === "Tất cả" ? foods : foods.filter(f => f.cat === activeTab);

  return (
    <>
      <header className="page-header" style={{ height: "50vh" }}>
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" alt="Menu Header" fill sizes="100vw" priority className="page-header-bg" />
        <div className="container page-header-content animate-fade-in-up">
          <p className="page-subtitle text-gradient-gold">A Culinary Journey</p>
          <h1 className="page-title" style={{ fontSize: "4.5rem" }}>Thực Đơn A La Carte</h1>
        </div>
      </header>

      <div className="container section" style={{ padding: "4rem 5%" }}>
        
        {/* Category Tabs */}
        <div className="animate-fade-in-up" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === cat ? "var(--accent-gold)" : "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                cursor: "pointer",
                borderBottom: activeTab === cat ? "2px solid var(--accent-gold)" : "2px solid transparent",
                paddingBottom: "5px",
                transition: "all 0.3s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p className="text-gradient-gold" style={{ fontSize: "1.5rem", letterSpacing: "2px" }}>ĐANG TẢI THỰC ĐƠN...</p>
          </div>
        ) : (
          <div className="masonry-grid animate-fade-in-up delay-100">
            {filteredFoods.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-img-wrapper">
                  <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="menu-card-img" />
                </div>
                <div className="menu-card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 className="menu-card-title">{item.name}</h3>
                    <span className="menu-card-price">{item.price}đ</span>
                  </div>
                  <p className="menu-card-desc" style={{ minHeight: "45px" }}>{item.desc}</p>
                  
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{item.cat}</span>
                    <button 
                      onClick={() => handleAdd(item)}
                      style={{
                        background: "var(--accent-gold)",
                        border: "none",
                        color: "#000",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        transition: "all 0.2s ease"
                      }}
                    >
                      + Đặt Trước
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <Link href="/reservation" className="fab-cart animate-scale-in">
          <span>🛒</span>
          <div className="fab-cart-badge">{cart.reduce((total, item) => total + item.qty, 0)}</div>
        </Link>
      )}
    </>
  );
}
