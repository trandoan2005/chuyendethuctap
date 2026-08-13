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
          <p className="page-subtitle text-gradient-gold">Nghệ Thuật Ẩm Thực Tinh Tế</p>
          <h1 className="page-title" style={{ fontSize: "5vw", textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
            Trải Nghiệm Ẩm Thực<br/>Đỉnh Cao
          </h1>
          
          <div style={{ marginTop: "4rem", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <Link href="/reservation" className="btn-primary" style={{ padding: "1.2rem 3rem" }}>Đặt Bàn Ngay</Link>
            <Link href="/menu" className="btn-secondary" style={{ padding: "1.2rem 3rem" }}>Khám Phá Thực Đơn</Link>
          </div>
        </div>
      </section>

      {/* Intro Section - Redesigned */}
      <section className="section container" style={{ maxWidth: "1000px", padding: "8rem 5%" }}>
        <div className="grid grid-cols-2" style={{ alignItems: "center", gap: "4rem" }}>
          <div className="animate-fade-in-up">
            <p className="page-subtitle text-gradient-gold">Về Lumina</p>
            <h2 style={{ fontSize: "3rem", marginBottom: "2rem", lineHeight: "1.2" }}>Tinh Hoa<br/>Ẩm Thực Đương Đại</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2rem" }}>
              Lumina mang đến trải nghiệm thưởng thức tinh tế nhất. Không gian nhà hàng được thiết kế theo 
              lối kiến trúc tối giản sang trọng, kết hợp cùng nguồn nguyên liệu hảo hạng nhất được tuyển chọn 
              khắt khe bởi Bếp trưởng Michelin 3 sao.
            </p>
            <Link href="/about" className="text-gradient-gold" style={{ textTransform: "uppercase", letterSpacing: "2px", fontWeight: "bold" }}>Tìm hiểu thêm ➔</Link>
          </div>
          <div className="animate-scale-in" style={{ position: "relative", height: "500px", borderRadius: "16px", overflow: "hidden" }}>
            <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Fine Dining" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Services Section - Modern Glass Cards */}
      <section className="section" style={{ background: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop') center/cover", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(5px)" }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "6rem 5%" }}>
          <div className="text-center" style={{ marginBottom: "5rem" }}>
            <h2 className="text-gradient-gold" style={{ fontSize: "3rem" }}>Dịch Vụ Nổi Bật</h2>
          </div>

          <div className="grid grid-cols-2" style={{ gap: "4rem" }}>
            <div className="glass-panel glass-panel-hover animate-fade-in-up delay-100" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🍽️</div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>A La Carte</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Sự giao thoa hoàn hảo giữa ẩm thực Á Đông và phương pháp nấu ăn hiện đại của Pháp.</p>
              <Link href="/menu" className="btn-secondary">Xem Thực Đơn</Link>
            </div>
            
            <div className="glass-panel glass-panel-hover animate-fade-in-up delay-200" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🥂</div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Sự Kiện Đặc Biệt</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Không gian linh hoạt, thiết kế cá nhân hóa dành riêng cho những buổi tiệc đẳng cấp.</p>
              <Link href="/reservation" className="btn-secondary">Thiết Kế Sự Kiện</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section" style={{ padding: "8rem 0" }}>
        <div className="container text-center" style={{ maxWidth: "800px" }}>
          <div className="text-gradient-gold" style={{ fontSize: "5rem", fontFamily: "var(--font-playfair)", lineHeight: "0", opacity: 0.5 }}>"</div>
          <p style={{ fontStyle: "italic", fontSize: "2rem", color: "var(--text-primary)", margin: "3rem 0", fontFamily: "var(--font-playfair)", lineHeight: "1.4" }}>
            Một bữa ăn ngon không chỉ làm no bụng, mà còn chạm đến tận cùng của cảm xúc và ký ức.
          </p>
          <div style={{ letterSpacing: "3px", fontSize: "0.85rem", textTransform: "uppercase", color: "var(--accent-gold)" }}>- Bếp Trưởng Pierre Gagnaire</div>
        </div>
      </section>
    </>
  );
}
