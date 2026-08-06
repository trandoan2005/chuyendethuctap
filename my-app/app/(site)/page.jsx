import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="page-header" style={{ height: "100vh" }}>
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
          alt="Lumina Restaurant"
          fill
          style={{ objectFit: "cover" }}
          className="page-header-bg"
          priority
        />
        <div className="container page-header-content animate-fade-in-up">
          <p className="page-subtitle">The Art of Fine Dining</p>
          <h1 className="page-title" style={{ fontSize: "5vw", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            Trải Nghiệm Ẩm Thực<br/>Đỉnh Cao
          </h1>
          <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", justifyContent: "center" }}>
            <Link href="/reservation" className="btn-primary">Đặt Bàn Ngay</Link>
            <Link href="/menu" className="btn-secondary">Khám Phá Thực Đơn</Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container text-center" style={{ maxWidth: "800px" }}>
        <p className="page-subtitle text-gold">Về Chúng Tôi</p>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Tinh Hoa Ẩm Thực Đương Đại</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8" }}>
          Lumina mang đến trải nghiệm thưởng thức tinh tế nhất. Không gian nhà hàng được thiết kế theo 
          lối kiến trúc tối giản sang trọng, kết hợp cùng nguồn nguyên liệu hảo hạng nhất được tuyển chọn 
          khắt khe bởi Bếp trưởng Michelin 3 sao.
        </p>
      </section>

      {/* Services Section */}
      <section className="section container">
        <div className="grid grid-cols-2" style={{ gap: "4rem" }}>
          <div className="premium-card animate-fade-in-up delay-100">
            <div className="premium-card-img-wrapper">
              <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Thực đơn tinh túy" fill className="premium-card-img" />
            </div>
            <div className="premium-card-content text-center">
              <h3 className="premium-card-title">Thực Đơn A La Carte</h3>
              <p className="premium-card-desc">Sự giao thoa hoàn hảo giữa ẩm thực Á Đông và phương pháp nấu ăn hiện đại của Pháp.</p>
              <Link href="/menu" className="text-gold" style={{ letterSpacing: "2px", fontSize: "0.85rem", textTransform: "uppercase" }}>Xem Chi Tiết</Link>
            </div>
          </div>
          
          <div className="premium-card animate-fade-in-up delay-200">
            <div className="premium-card-img-wrapper">
              <Image src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" alt="Không gian sang trọng" fill className="premium-card-img" />
            </div>
            <div className="premium-card-content text-center">
              <h3 className="premium-card-title">Sự Kiện Đặc Biệt</h3>
              <p className="premium-card-desc">Không gian linh hoạt, thiết kế cá nhân hóa dành riêng cho những buổi tiệc đẳng cấp.</p>
              <Link href="/packages" className="text-gold" style={{ letterSpacing: "2px", fontSize: "0.85rem", textTransform: "uppercase" }}>Khám Phá Dịch Vụ</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section" style={{ background: "var(--bg-secondary)", padding: "8rem 0" }}>
        <div className="container text-center" style={{ maxWidth: "700px" }}>
          <div style={{ color: "var(--accent-gold)", fontSize: "4rem", fontFamily: "var(--font-playfair)", lineHeight: "0" }}>"</div>
          <p style={{ fontStyle: "italic", fontSize: "1.5rem", color: "var(--text-primary)", margin: "2rem 0", fontFamily: "var(--font-playfair)" }}>
            Một bữa ăn ngon không chỉ làm no bụng, mà còn chạm đến tận cùng của cảm xúc và ký ức.
          </p>
          <div style={{ letterSpacing: "2px", fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-secondary)" }}>- Bếp Trưởng Pierre Gagnaire</div>
        </div>
      </section>
    </>
  );
}
