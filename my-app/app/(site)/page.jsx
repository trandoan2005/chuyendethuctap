import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative" }}>
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
          alt="Lumina Restaurant Interior"
          fill
          style={{ objectFit: "cover", opacity: 0.4, zIndex: -1 }}
          priority
        />
        <div className="container animate-fade-in-up" style={{ textAlign: "center", maxWidth: "900px", zIndex: 1 }}>
          <p style={{ color: "var(--accent-gold)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "1rem", fontWeight: "600" }}>
            The Art of Fine Dining
          </p>
          <h1 style={{ fontSize: "5rem", lineHeight: "1.1", marginBottom: "2rem", textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
            Trải Nghiệm Ẩm Thực<br/>Đẳng Cấp
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3rem", padding: "0 2rem" }}>
            Nơi hương vị tuyệt mỹ hòa quyện cùng không gian sang trọng, tạo nên những khoảnh khắc đáng nhớ nhất cho bạn và những người thân yêu.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <Link href="/reservation" className="btn-primary">Đặt Bàn Ngay</Link>
            <Link href="/banquet" className="btn-secondary">Dịch Vụ Tiệc</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="page-subtitle">Khám Phá</p>
          <h2 style={{ fontSize: "2.5rem" }}>Dịch Vụ Của Chúng Tôi</h2>
        </div>

        <div className="grid grid-cols-2">
          <div className="luxury-card">
            <div className="luxury-card-img-wrapper">
              <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Thực đơn tinh túy" fill className="luxury-card-img" />
            </div>
            <div className="luxury-card-content">
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Thực Đơn Tinh Túy</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flex: 1 }}>Thưởng thức những tuyệt tác ẩm thực được chế biến bởi bếp trưởng danh tiếng, từ nguyên liệu nhập khẩu cao cấp.</p>
              <Link href="/menu" style={{ color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9rem", fontWeight: "600" }}>Xem Thực Đơn &rarr;</Link>
            </div>
          </div>
          
          <div className="luxury-card">
            <div className="luxury-card-img-wrapper">
              <Image src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" alt="Không gian sang trọng" fill className="luxury-card-img" />
            </div>
            <div className="luxury-card-content">
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Tổ Chức Sự Kiện</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flex: 1 }}>Không gian đa dạng từ phòng VIP riêng tư đến sảnh tiệc lộng lẫy, đáp ứng mọi nhu cầu sự kiện của bạn.</p>
              <Link href="/spaces" style={{ color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9rem", fontWeight: "600" }}>Khám Phá Không Gian &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--bg-tertiary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="page-subtitle">Đánh Giá</p>
            <h2 style={{ fontSize: "2.5rem" }}>Khách Hàng Nói Gì Về Lumina</h2>
          </div>
          
          <div className="grid grid-cols-3">
            <div className="luxury-card" style={{ padding: "2rem", border: "none", borderTop: "3px solid var(--accent-gold)" }}>
              <div style={{ color: "var(--accent-gold)", fontSize: "1.5rem", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ color: "var(--text-primary)", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "1.1rem", flex: 1 }}>
                "Một trải nghiệm ẩm thực không thể tuyệt vời hơn. Bò Wagyu nướng đá thực sự tan chảy trong miệng. Không gian rất lãng mạn."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>N</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>Nguyễn Trần Trung</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: 0 }}>Thực khách VIP</p>
                </div>
              </div>
            </div>

            <div className="luxury-card" style={{ padding: "2rem", border: "none", borderTop: "3px solid var(--accent-gold)" }}>
              <div style={{ color: "var(--accent-gold)", fontSize: "1.5rem", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ color: "var(--text-primary)", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "1.1rem", flex: 1 }}>
                "Tôi đã tổ chức tiệc sinh nhật ở phòng Hoàng Gia. Dịch vụ cực kỳ chuyên nghiệp, nhân viên chu đáo, rượu vang ngon tuyệt."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>L</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>Lê Hà Anh</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: 0 }}>Khách đặt tiệc</p>
                </div>
              </div>
            </div>

            <div className="luxury-card" style={{ padding: "2rem", border: "none", borderTop: "3px solid var(--accent-gold)" }}>
              <div style={{ color: "var(--accent-gold)", fontSize: "1.5rem", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ color: "var(--text-primary)", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "1.1rem", flex: 1 }}>
                "Tính năng chọn món trực tiếp trên web rồi đặt bàn rất tiện lợi, đến nơi thức ăn được dọn lên nhanh chóng."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>H</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>Hoàng Tuấn</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: 0 }}>Thực khách</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
