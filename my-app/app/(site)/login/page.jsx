"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const data = isLogin ? await AuthService.login(body) : await AuthService.register(body);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      
      // Navigate to previous page if booking, else home/admin
      if (data.role === 'ADMIN') {
        router.push("/admin");
      } else {
        router.back(); // Trở lại trang trước đó (rất tiện nếu đang đứng ở trang Đặt bàn)
      }
      
      router.refresh();
    } catch (err) {
      let msg = err.response?.data || err.message;
      try { msg = JSON.parse(err.response?.data).message || msg; } catch(e){}
      setErrorMsg(typeof msg === 'string' ? msg : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" alt="Background" fill sizes="100vw" priority style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(10px)" }}></div>
      </div>

      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>
        
        <div className="glass-panel animate-scale-in" style={{ maxWidth: "450px", width: "100%", padding: "3rem 2.5rem" }}>
          
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1 className="text-gradient-gold" style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>Lumina.</h1>
            <p style={{ color: "var(--text-secondary)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.8rem" }}>
              {isLogin ? "Thành viên Đăng Nhập" : "Đăng Ký Thành viên"}
            </p>
          </div>
          
          {errorMsg && (
            <div style={{ padding: "1rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", marginBottom: "1.5rem", fontSize: "0.9rem", textAlign: "center", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="modern-input-group">
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="modern-input" required={!isLogin} />
                <label className="modern-label">Họ và Tên</label>
              </div>
            )}
            
            <div className="modern-input-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="modern-input" required />
              <label className="modern-label">Email</label>
            </div>

            {!isLogin && (
              <div className="modern-input-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="modern-input" required={!isLogin} />
                <label className="modern-label">Số Điện Thoại</label>
              </div>
            )}

            <div className="modern-input-group" style={{ marginBottom: "2.5rem" }}>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="modern-input" required />
              <label className="modern-label">Mật khẩu</label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "1.5rem", padding: "1rem", borderRadius: "8px" }} disabled={loading}>
              {loading ? "Đang xử lý..." : (isLogin ? "Đăng Nhập" : "Đăng Ký")}
            </button>
          </form>

          <div style={{ textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1.5rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"} 
            </span>
            <button 
              onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}
              style={{ 
                background: "none", 
                border: "none", 
                color: "var(--accent-gold)", 
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                cursor: "pointer",
                marginLeft: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "600"
              }}
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
