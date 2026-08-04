import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <header className="page-header" style={{ padding: "140px 0 80px" }}>
        <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" alt="About Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">Câu Chuyện Của Chúng Tôi</p>
          <h1 className="page-title" style={{ fontSize: "3rem" }}>Về Lumina</h1>
        </div>
      </header>

      <div className="container section">
        <div className="grid grid-cols-2" style={{ alignItems: "center", gap: "4rem", marginBottom: "6rem" }}>
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: "2.5rem", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Hành trình tạo nên sự hoàn mỹ</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "1.1rem", lineHeight: "1.8" }}>
              Được thành lập vào năm 2015, Lumina khởi nguồn từ một ước mơ đơn giản: tạo ra một không gian nơi ẩm thực không chỉ là để thưởng thức, mà là một trải nghiệm đánh thức mọi giác quan.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8" }}>
              Chúng tôi tin rằng bữa ăn ngon nhất là bữa ăn được chuẩn bị bằng cả trái tim, sử dụng những nguyên liệu địa phương tươi ngon nhất, kết hợp cùng kỹ thuật nấu nướng hiện đại của phương Tây. Từng chi tiết nhỏ tại Lumina – từ ánh đèn pha lê, bản nhạc Jazz du dương đến cách trình bày món ăn – đều được chăm chút tỉ mỉ.
            </p>
          </div>
          <div className="luxury-card-img-wrapper" style={{ borderRadius: "8px", border: "1px solid var(--glass-border)" }}>
            <Image src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" alt="Restaurant Interior" fill className="luxury-card-img" />
          </div>
        </div>

        <div className="grid grid-cols-2" style={{ alignItems: "center", gap: "4rem" }}>
          <div className="luxury-card-img-wrapper" style={{ borderRadius: "8px", border: "1px solid var(--accent-gold)", order: -1 }}>
            <Image src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1984&auto=format&fit=crop" alt="Bếp trưởng" fill className="luxury-card-img" style={{ objectPosition: "top" }} />
          </div>
          <div className="animate-fade-in-up">
            <p className="page-subtitle" style={{ marginBottom: "0.5rem" }}>Bếp Trưởng Điều Hành</p>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Alain Nguyễn</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "1.1rem", lineHeight: "1.8" }}>
              Với hơn 15 năm kinh nghiệm làm việc tại các nhà hàng Michelin tại Pháp và Thụy Sĩ, Bếp trưởng Alain Nguyễn mang về Việt Nam một triết lý ẩm thực độc đáo: Tôn vinh nguyên liệu nguyên bản bằng kỹ thuật đương đại.
            </p>
            <blockquote style={{ borderLeft: "4px solid var(--accent-gold)", paddingLeft: "1.5rem", fontStyle: "italic", fontSize: "1.2rem", color: "white", marginBottom: "2rem" }}>
              "Mỗi món ăn là một tác phẩm nghệ thuật, một câu chuyện mà tôi muốn kể cho thực khách thông qua từng hương vị."
            </blockquote>
            <Image src="/signature.png" alt="Chữ ký" width={150} height={60} style={{ filter: "invert(1) brightness(2) sepia(1) hue-rotate(5deg) saturate(3)" }} />
          </div>
        </div>
      </div>
    </>
  );
}
