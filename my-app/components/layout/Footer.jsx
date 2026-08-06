export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div>
            <div className="footer-logo">Lumina<span>.</span></div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "400px", lineHeight: "1.8" }}>
              Nơi hội tụ tinh hoa ẩm thực và nghệ thuật tổ chức sự kiện đẳng cấp. Trải nghiệm không gian sang trọng và dịch vụ hoàn hảo tại Lumina.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Khám Phá</h4>
            <ul className="footer-list">
              <li><a href="/menu">Thực Đơn A La Carte</a></li>
              <li><a href="/spaces">Không Gian Nhà Hàng</a></li>
              <li><a href="/packages">Gói Dịch Vụ Tiệc</a></li>
              <li><a href="/reservation">Đặt Bàn Ngay</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Liên Hệ</h4>
            <ul className="footer-list">
              <li style={{ color: "var(--text-secondary)" }}>📍 123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</li>
              <li style={{ color: "var(--text-secondary)" }}>📞 1900 8888 (Hotline)</li>
              <li style={{ color: "var(--text-secondary)" }}>✉️ contact@lumina.vn</li>
              <li style={{ color: "var(--text-secondary)" }}>🕒 Mở cửa: 10:00 - 23:00 hàng ngày</li>
            </ul>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lumina Restaurant & Banquet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
