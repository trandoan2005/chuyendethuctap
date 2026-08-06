"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập bằng tài khoản Admin trước!");
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Lumina Admin
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item active">Tổng Quan</Link>
          <Link href="/admin/reservations" className="admin-nav-item">Quản Lý Đặt Bàn</Link>
          <Link href="/admin/banquets" className="admin-nav-item">Quản Lý Tiệc</Link>
          <Link href="/admin/customers" className="admin-nav-item">Khách Hàng</Link>
          <Link href="/admin/settings" className="admin-nav-item">Cài Đặt</Link>
        </nav>
        <div className="admin-logout">
          <Link href="/" className="admin-nav-item">← Về Trang Chủ</Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h2>Bảng Điều Khiển</h2>
          <div className="admin-user-profile">
            Quản Trị Viên
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
