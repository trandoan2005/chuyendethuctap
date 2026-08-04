"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockMenu = [
    { id: 1, name: "Súp Hải Sản Tổ Yến", price: "250,000", cat: "Khai vị", desc: "Súp hảo hạng từ hải sản tươi và tổ yến.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, name: "Salad Cá Hồi", price: "180,000", cat: "Khai vị", desc: "Cá hồi Na Uy tươi ăn kèm rau xanh hữu cơ.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop" },
    { id: 3, name: "Bò Wagyu Nướng Đá", price: "950,000", cat: "Món chính", desc: "Bò Wagyu A5 thượng hạng nướng trên đá tảng nhiệt độ cao.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" },
    { id: 4, name: "Tôm Hùm Bỏ Lò", price: "1,200,000", cat: "Món chính", desc: "Tôm hùm Alaska bỏ lò phô mai Pháp béo ngậy.", img: "https://images.unsplash.com/photo-1559742811-822873691fc8?q=80&w=1974&auto=format&fit=crop" },
    { id: 5, name: "Panna Cotta", price: "90,000", cat: "Tráng miệng", desc: "Kem sữa panna cotta mềm mịn quyện sốt chanh dây.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop" },
    { id: 6, name: "Vang Đỏ Manto", price: "1,500,000", cat: "Đồ uống", desc: "Vang đỏ Cabernet Sauvignon cao cấp.", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop" },
  ];

  const categories = ["Món chính", "Đồ uống", "Tráng miệng", "Combo"]; // Dựa theo DB

  useEffect(() => {
    fetch("http://localhost:8080/api/foods")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
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
        setFoods(mockMenu); // Fallback nếu server chưa bật
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    alert(`Đã thêm ${item.name} vào yêu cầu đặt bàn!`);
  };

  return (
    <>
      <header className="page-header">
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" alt="Menu Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">A Culinary Journey</p>
          <h1 className="page-title">Thực Đơn</h1>
        </div>
      </header>

      <div className="container section">
        {categories.map((category) => (
          <div key={category} style={{ marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "2.5rem", borderBottom: "1px solid var(--bg-tertiary)", paddingBottom: "1rem", marginBottom: "3rem", color: "var(--accent-gold)" }}>
              {category}
            </h2>
            <div className="grid grid-cols-2">
              {loading ? (
                <p style={{ color: "var(--text-secondary)" }}>Đang tải thực đơn...</p>
              ) : foods.filter(m => m.cat === category).length === 0 ? (
                <p style={{ color: "var(--text-secondary)" }}>Đang cập nhật món ăn...</p>
              ) : foods.filter(m => m.cat === category).map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "1.5rem", alignItems: "center", borderBottom: "1px solid var(--bg-tertiary)", paddingBottom: "1.5rem" }}>
                  <div style={{ position: "relative", width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid var(--accent-gold)" }}>
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.4rem", margin: 0 }}>{item.name}</h3>
                      <div style={{ color: "var(--accent-gold)", fontWeight: "600", fontSize: "1.2rem", borderBottom: "1px dotted var(--accent-gold)" }}>
                        {item.price}đ
                      </div>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "0.8rem" }}>{item.desc}</p>
                    <button 
                      onClick={() => handleAdd(item)}
                      style={{ 
                        background: "transparent", border: "1px solid var(--glass-border)", 
                        color: "white", padding: "0.4rem 1rem", fontSize: "0.8rem", 
                        cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px",
                        transition: "all 0.3s"
                      }}
                      onMouseOver={(e) => {e.target.style.background = 'var(--accent-gold)'; e.target.style.color = 'black'; e.target.style.borderColor = 'var(--accent-gold)';}}
                      onMouseOut={(e) => {e.target.style.background = 'transparent'; e.target.style.color = 'white'; e.target.style.borderColor = 'var(--glass-border)';}}
                    >
                      + Chọn món
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link href="/reservation" className="btn-primary">Hoàn Tất & Đặt Bàn</Link>
        </div>
      </div>
    </>
  );
}
