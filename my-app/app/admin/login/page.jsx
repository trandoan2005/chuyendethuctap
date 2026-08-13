"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await AuthService.login({ email, password });

      if (data.role !== "ADMIN") {
        setError("Tài khoản này không có quyền Quản trị viên.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/admin");
      router.refresh();
    } catch (err) {
      const msg = err.response?.data || "Sai email hoặc mật khẩu.";
      setError(typeof msg === "string" ? msg : "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
      padding: "2rem"
    }}>
      <div className="glass-panel animate-scale-in" style={{
        maxWidth: "420px",
        width: "100%",
        padding: "3rem 2.5rem"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, var(--accent-gold), #f3e5ab)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "1.5rem"
          }}>
            🔐
          </div>
          <h1 className="text-gradient-gold" style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "2rem",
            marginBottom: "0.5rem"
          }}>
            Lumina Admin
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}>
            Đăng nhập Quản trị
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: "1rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            color: "#f87171",
            fontSize: "0.9rem",
            textAlign: "center",
            marginBottom: "1.5rem"
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="modern-input-group">
            <input
              type="email"
              className="modern-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <label className="modern-label" style={{ background: "rgba(18,18,18,0.9)" }}>Email</label>
          </div>

          <div className="modern-input-group" style={{ marginBottom: "2.5rem" }}>
            <input
              type="password"
              className="modern-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label className="modern-label" style={{ background: "rgba(18,18,18,0.9)" }}>Mật khẩu</label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}
          >
            {loading ? "Đang xác thực..." : "Đăng Nhập"}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)"
        }}>
          <a
            href="/"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              transition: "color 0.2s"
            }}
          >
            ← Về trang chủ nhà hàng
          </a>
        </div>
      </div>
    </div>
  );
}
