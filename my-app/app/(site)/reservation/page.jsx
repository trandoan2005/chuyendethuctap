"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Reservation() {
  const { cart, removeFromCart, updateQty, getTotalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="page-header" style={{ padding: "140px 0 80px" }}>
        <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" alt="Reservation Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">Secure Your Table</p>
          <h1 className="page-title" style={{ fontSize: "3rem" }}>Đặt Bàn</h1>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: "2rem" }}>
        <div className="grid grid-cols-2" style={{ gap: "4rem", gridTemplateColumns: "1fr 1.2fr" }}>
          
          {/* CỘT TRÁI: HIỂN THỊ MÓN ĂN ĐÃ CHỌN */}
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--bg-tertiary)", paddingBottom: "1rem" }}>
              Thực Đơn Tạm Tính
            </h2>
            
            {cart.length === 0 ? (
              <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem", border: "1px dashed var(--bg-tertiary)" }}>
                <p style={{ marginBottom: "1rem" }}>Bạn chưa chọn món ăn nào.</p>
                <Link href="/menu" className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                  Xem Thực Đơn
                </Link>
              </div>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid var(--bg-tertiary)" }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.name}</h4>
                      <div style={{ color: "var(--accent-gold)" }}>{item.price}đ</div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--glass-border)" }}>
                        <button type="button" onClick={() => updateQty(item.id, -1)} style={{ background: "transparent", border: "none", color: "white", padding: "0.5rem 0.8rem", cursor: "pointer" }}>-</button>
                        <span style={{ width: "20px", textAlign: "center" }}>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.id, 1)} style={{ background: "transparent", border: "none", color: "white", padding: "0.5rem 0.8rem", cursor: "pointer" }}>+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem" }}>×</button>
                    </div>
                  </div>
                ))}
                
                <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--bg-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "1px" }}>Tổng Tạm Tính:</span>
                  <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--accent-gold)" }}>
                    {getTotalPrice().toLocaleString()}đ
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: FORM ĐẶT BÀN */}
          <div>
            {submitted ? (
              <div className="luxury-card animate-fade-in-up" style={{ textAlign: "center", border: "1px solid var(--accent-gold)" }}>
                <div className="luxury-card-content">
                  <h2 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>Đặt Bàn Thành Công!</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                    Cảm ơn {formData.name}. Chúng tôi rất vui được đón tiếp bạn vào ngày <strong style={{ color: "white" }}>{formData.date}</strong> lúc <strong style={{ color: "white" }}>{formData.time}</strong>.
                  </p>
                  <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                    Đặt Bàn Khác
                  </button>
                </div>
              </div>
            ) : (
              <form className="luxury-card animate-fade-in-up" onSubmit={handleSubmit}>
                <div className="luxury-card-content">
                  <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--bg-tertiary)", paddingBottom: "1rem" }}>
                    Thông Tin Đặt Bàn
                  </h2>

                  <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="date">Ngày đến</label>
                      <input required type="date" id="date" name="date" className="form-input" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="time">Giờ đến</label>
                      <select required id="time" name="time" className="form-select" value={formData.time} onChange={handleChange}>
                        <option value="">Chọn giờ...</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="guests">Số lượng khách</label>
                    <select required id="guests" name="guests" className="form-select" value={formData.guests} onChange={handleChange}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n} khách</option>
                      ))}
                      <option value="10+">Trên 10 khách (Vui lòng liên hệ)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Họ và tên</label>
                      <input required type="text" id="name" name="name" className="form-input" placeholder="Nguyễn Văn A" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Số điện thoại</label>
                      <input required type="tel" id="phone" name="phone" className="form-input" placeholder="0912 345 678" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input required type="email" id="email" name="email" className="form-input" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="requests">Yêu cầu đặc biệt</label>
                    <textarea id="requests" name="requests" className="form-textarea" rows="4" placeholder="Dị ứng thực phẩm, vị trí bàn ưu tiên, dịp đặc biệt..." value={formData.requests} onChange={handleChange}></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                    Xác Nhận Đặt Bàn
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
