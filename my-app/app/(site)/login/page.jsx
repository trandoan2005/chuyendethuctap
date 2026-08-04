"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 style={{ textAlign: "center", color: "var(--accent-gold)", marginBottom: "2rem" }}>
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Họ và Tên</label>
              <input type="text" className="form-input" placeholder="Nhập họ tên của bạn" />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Nhập địa chỉ email" />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Số Điện Thoại</label>
              <input type="tel" className="form-input" placeholder="Nhập số điện thoại" />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label className="form-label">Mật khẩu</label>
            <input type="password" className="form-input" placeholder="Nhập mật khẩu" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "1rem" }}>
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{ color: "var(--text-secondary)" }}>
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"} 
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--accent-gold)", 
              fontWeight: "600", 
              cursor: "pointer",
              marginLeft: "0.5rem"
            }}
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}
