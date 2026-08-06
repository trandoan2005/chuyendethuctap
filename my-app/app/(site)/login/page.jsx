"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errData = await res.text();
        throw new Error(errData || "Đã có lỗi xảy ra");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      
      alert(isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!");
      
      // Nếu là ADMIN thì chuyển hướng vào Dashboard Admin, ngược lại về Trang chủ
      if (data.role === 'ADMIN') {
        router.push("/admin");
      } else {
        router.push("/");
      }
      
      router.refresh();
    } catch (err) {
      let msg = err.message;
      try { msg = JSON.parse(err.message).message || err.message; } catch(e){}
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" alt="Background" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.3 }} />
      </div>

      <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>
        <div className="animate-fade-in-up" style={{ maxWidth: "450px", width: "100%", padding: "3rem", background: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>Lumina.</h1>
            <p style={{ color: "var(--accent-gold)", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.8rem" }}>
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </p>
          </div>
          
          {errorMsg && (
            <div style={{ padding: "0.75rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", marginBottom: "1.5rem", fontSize: "0.9rem", textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Họ và Tên</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" placeholder="Tên của bạn" required={!isLogin} />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="email@example.com" required />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Số Điện Thoại</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="0912 345 678" required={!isLogin} />
              </div>
            )}

            <div className="form-group" style={{ marginBottom: "2.5rem" }}>
              <label className="form-label">Mật khẩu</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "1.5rem" }} disabled={loading}>
              {loading ? "Đang xử lý..." : (isLogin ? "Đăng Nhập" : "Đăng Ký Tài Khoản")}
            </button>
          </form>

          <div style={{ textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1.5rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"} 
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
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
                borderBottom: "1px solid var(--accent-gold)"
              }}
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
