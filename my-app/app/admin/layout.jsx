"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }

    try {
      const parsed = JSON.parse(userStr);
      if (parsed.role !== "ADMIN") {
        alert("Bạn không có quyền truy cập trang Quản trị!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin/login");
        return;
      }
      setUser(parsed);
      setChecked(true);
    } catch (e) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  // Nếu đang ở trang login thì không hiện layout admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg-primary)" }}>
        <p className="text-gradient-gold" style={{ fontSize: "1.5rem", letterSpacing: "2px" }}>Đang kiểm tra quyền...</p>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "📊 Tổng Quan" },
    { href: "/admin/reservations", label: "📋 Đơn Đặt Bàn" },
    { href: "/admin/banquets", label: "🥂 Đơn Đặt Tiệc" },
    { href: "/admin/foods", label: "🥘 Thực Đơn" },
    { href: "/admin/packages", label: "📦 Các Gói Dịch Vụ" },
    { href: "/admin/customers", label: "👥 Khách Hàng" },
    { href: "/admin/settings", label: "⚙️ Cài Đặt" },
  ];

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Lumina Admin
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-logout" style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(212,175,55,0.05)", borderRadius: "8px", borderLeft: "3px solid var(--accent-gold)" }}>
            <p style={{ color: "var(--accent-gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>Đang đăng nhập</p>
            <p style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: "500" }}>{user?.fullName || "Admin"}</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
              fontSize: "0.85rem",
              fontWeight: "600",
              transition: "all 0.2s ease",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
            onMouseOver={e => e.target.style.background = "rgba(239, 68, 68, 0.25)"}
            onMouseOut={e => e.target.style.background = "rgba(239, 68, 68, 0.1)"}
          >
            🚪 Đăng Xuất
          </button>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h2>{navItems.find(n => n.href === pathname)?.label?.replace(/^.\s/, '') || "Bảng Điều Khiển"}</h2>
          <div className="admin-user-profile">
            👤 {user?.fullName || "Quản Trị Viên"}
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
