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
        <div className="container page-header-content animate-fade-in-up">
          <p className="page-subtitle">A Culinary Journey</p>
          <h1 className="page-title">Thực Đơn A La Carte</h1>
        </div>
      </header>

      <div className="container section" style={{ maxWidth: "1000px" }}>
        {categories.map((category) => (
          <div key={category} className="menu-category animate-fade-in-up">
            <h2 className="menu-category-title text-gold">{category}</h2>
            
            <div>
              {loading ? (
                <p className="text-center text-muted">Đang tải thực đơn...</p>
              ) : foods.filter(m => m.cat === category).length === 0 ? (
                <p className="text-center text-muted">Đang cập nhật món ăn...</p>
              ) : foods.filter(m => m.cat === category).map((item) => (
                <div key={item.id} className="menu-item">
                  <div style={{ flex: 1, paddingRight: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 className="menu-item-name">{item.name}</h3>
                      <div className="menu-item-price">{item.price}đ</div>
                    </div>
                    <p className="menu-item-desc">{item.desc}</p>
                    <button 
                      onClick={() => handleAdd(item)}
                      style={{
                        background: "none", border: "none", color: "var(--accent-gold)", 
                        fontFamily: "var(--font-inter)", fontSize: "0.75rem", textTransform: "uppercase", 
                        letterSpacing: "1px", marginTop: "1rem", cursor: "pointer", borderBottom: "1px solid var(--accent-gold)",
                        paddingBottom: "2px"
                      }}
                    >
                      Thêm vào chọn món
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center mt-12" style={{ marginTop: "4rem" }}>
          <Link href="/reservation" className="btn-primary">Chuyển Đến Đặt Bàn</Link>
        </div>
      </div>
    </>
  );
}
