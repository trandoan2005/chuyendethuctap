"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-logo">
          Lumina
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/" className="nav-link">Trang Chủ</Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">Về Chúng Tôi</Link>
          </li>
          <li>
            <Link href="/menu" className="nav-link">Thực Đơn</Link>
          </li>
          <li>
            <Link href="/spaces" className="nav-link">Không Gian</Link>
          </li>
          <li>
            <Link href="/packages" className="nav-link">Gói Tiệc</Link>
          </li>
          <li>
            <Link href="/reservation" className="nav-link" style={{ color: "var(--accent-gold)" }}>Đặt Bàn</Link>
          </li>
          <li>
            <Link href="/banquet" className="nav-link" style={{ color: "var(--accent-gold)" }}>Dịch Vụ Tiệc</Link>
          </li>
        </ul>
        <div className="nav-auth" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/reservation" style={{ position: "relative", color: "var(--accent-gold)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemCount > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-12px",
                backgroundColor: "red", color: "white", fontSize: "0.7rem",
                width: "18px", height: "18px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>Đăng Nhập</Link>
        </div>
      </div>
    </nav>
  );
}
