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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Vui lòng đăng nhập trước khi đặt bàn!");
      window.location.href = "/login";
      return;
    }
    const user = JSON.parse(userStr);

    const bookingRequest = {
      userId: user.userId,
      bookingType: "REGULAR",
      bookingDate: formData.date,
      bookingTime: formData.time + ":00",
      guestCount: parseInt(formData.guests) || 2,
      note: formData.requests,
      items: cart.map(item => ({ foodId: item.id, quantity: item.qty }))
    };

    try {
      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookingRequest)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (err) {
      alert("Không kết nối được đến Server.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="page-header" style={{ height: "60vh", minHeight: "400px" }}>
        <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" alt="Reservation Header" fill className="page-header-bg" />
        <div className="container page-header-content animate-fade-in-up">
          <p className="page-subtitle">Secure Your Table</p>
          <h1 className="page-title">Đặt Bàn</h1>
        </div>
      </header>

      <div className="container section" style={{ maxWidth: "1200px" }}>
        <div className="grid grid-cols-2" style={{ gap: "6rem", alignItems: "flex-start" }}>
          
          {/* CỘT TRÁI: HIỂN THỊ MÓN ĂN ĐÃ CHỌN */}
          <div className="animate-fade-in-up delay-100">
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
              Thực Đơn Đã Chọn
            </h2>
            
            {cart.length === 0 ? (
              <div style={{ color: "var(--text-secondary)", padding: "3rem", border: "1px dashed rgba(255, 255, 255, 0.2)", textAlign: "center" }}>
                <p style={{ marginBottom: "1.5rem", fontSize: "1.05rem" }}>Quý khách chưa chọn món ăn nào.</p>
                <Link href="/menu" className="btn-secondary">
                  Khám Phá Thực Đơn
                </Link>
              </div>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", fontFamily: "var(--font-playfair)" }}>{item.name}</h4>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>{item.price}đ</div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--glass-border)", borderRadius: "4px" }}>
                        <button type="button" onClick={() => updateQty(item.id, -1)} style={{ background: "transparent", border: "none", color: "white", padding: "0.5rem 1rem", cursor: "pointer", fontSize: "1.2rem" }}>-</button>
                        <span style={{ width: "24px", textAlign: "center", fontSize: "0.9rem" }}>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.id, 1)} style={{ background: "transparent", border: "none", color: "white", padding: "0.5rem 1rem", cursor: "pointer", fontSize: "1.2rem" }}>+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.5rem", transition: "color 0.3s" }} onMouseOver={e => e.target.style.color="white"} onMouseOut={e => e.target.style.color="var(--text-muted)"}>×</button>
                    </div>
                  </div>
                ))}
                
                <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid var(--accent-gold)", paddingTop: "1.5rem" }}>
                  <span style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-secondary)" }}>Tổng Tạm Tính</span>
                  <span style={{ fontSize: "2rem", fontWeight: "400", color: "var(--accent-gold)", fontFamily: "var(--font-playfair)" }}>
                    {getTotalPrice().toLocaleString()}đ
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: FORM ĐẶT BÀN */}
          <div className="animate-fade-in-up delay-200">
            {submitted ? (
              <div style={{ padding: "4rem 3rem", background: "var(--bg-secondary)", border: "1px solid var(--accent-gold)", textAlign: "center" }}>
                <h2 style={{ color: "var(--accent-gold)", marginBottom: "1.5rem", fontSize: "2.5rem", fontFamily: "var(--font-playfair)" }}>Đặt Bàn Thành Công</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.8" }}>
                  Cảm ơn <strong style={{ color: "white", fontWeight: "normal" }}>{formData.name}</strong>. Chúng tôi rất vinh hạnh được đón tiếp quý khách vào ngày <strong style={{ color: "white", fontWeight: "normal" }}>{formData.date}</strong> lúc <strong style={{ color: "white", fontWeight: "normal" }}>{formData.time}</strong>. Nhân viên của Lumina sẽ liên hệ sớm để xác nhận.
                </p>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                  Đặt Thêm Bàn
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: "3rem", background: "var(--bg-secondary)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
                  Thông Tin Đặt Bàn
                </h2>

                <div className="grid grid-cols-2" style={{ gap: "2rem", marginBottom: "1.5rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="date">Ngày đến</label>
                    <input required type="date" id="date" name="date" className="form-input" value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
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

                <div className="grid grid-cols-2" style={{ gap: "2rem", marginBottom: "1.5rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="name">Họ và tên</label>
                    <input required type="text" id="name" name="name" className="form-input" placeholder="Nguyễn Văn A" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
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
                  <textarea id="requests" name="requests" className="form-textarea" rows="3" placeholder="Dị ứng thực phẩm, vị trí bàn ưu tiên, dịp đặc biệt..." value={formData.requests} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "2rem" }}>
                  Xác Nhận Đặt Bàn
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
