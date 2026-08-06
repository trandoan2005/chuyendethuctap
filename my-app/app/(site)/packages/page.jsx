import Image from "next/image";
import Link from "next/link";

export default async function PackagesPage() {
  let packages = [];
  try {
    const res = await fetch("http://localhost:8080/api/packages", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      packages = data.map(p => ({
        id: p.packageId,
        name: p.packageName,
        price: p.price.toLocaleString(),
        desc: p.description,
        features: ["Trang trí cơ bản", "Dịch vụ tận tâm", "Thiết kế riêng"],
        img: (p.imageUrl && p.imageUrl.trim() !== "") ? p.imageUrl : "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
      }));
    }
  } catch (error) {
    console.error("Lỗi gọi API packages:", error);
  }

  if (packages.length === 0) {
    packages = [
    {
      id: 1,
      name: "Lãng Mạn",
      price: "1,500,000",
      desc: "Trang trí bàn tiệc với hoa hồng đỏ, nến thơm. Tặng kèm 2 ly vang sủi và 1 bánh kem mini.",
      features: ["Hoa hồng & nến", "2 ly champagne", "Bánh kem mini", "Violin tại bàn"],
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Sinh Nhật VIP",
      price: "3,000,000",
      desc: "Trang trí không gian sinh nhật cực chill. Background chụp ảnh, bóng bay nghệ thuật.",
      features: ["Trang trí background", "Bóng bay nghệ thuật", "Bánh sinh nhật lớn", "Hoa tươi trang trí"],
      img: "https://images.unsplash.com/photo-1530103862676-de8892b1265b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Tiệc Công Ty",
      price: "5,000,000",
      desc: "Phù hợp cho công ty từ 30 người trở lên. Bao gồm MC chuyên nghiệp, màn chiếu, máy chiếu.",
      features: ["MC hoạt náo", "Âm thanh & Ánh sáng", "Màn chiếu sân khấu", "Thợ chụp ảnh"],
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
    }
    ];
  }

  return (
    <>
      <header className="page-header">
        <Image src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop" alt="Packages Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">Celebrate With Us</p>
          <h1 className="page-title">Gói Dịch Vụ Tiệc</h1>
        </div>
      </header>

      <div className="container section" style={{ maxWidth: "1200px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="animate-fade-in-up" style={{ 
              display: "flex", 
              flexDirection: index % 2 === 0 ? "row" : "row-reverse", 
              alignItems: "center", 
              gap: "4rem" 
            }}>
              {/* Image Side */}
              <div style={{ flex: "1 1 50%", position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image src={pkg.img} alt={pkg.name} fill style={{ objectFit: "cover" }} />
              </div>

              {/* Text Side */}
              <div style={{ flex: "1 1 50%", padding: "2rem" }}>
                <h2 style={{ fontSize: "3rem", marginBottom: "1rem", color: "var(--text-primary)" }}>{pkg.name}</h2>
                <div style={{ 
                  color: "var(--accent-gold)", marginBottom: "2rem", fontWeight: "400", 
                  fontSize: "1.5rem", fontFamily: "var(--font-playfair)",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.3)", paddingBottom: "1rem", display: "inline-block"
                }}>
                  Từ {pkg.price} VNĐ
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1.05rem", lineHeight: "1.8" }}>
                  {pkg.desc}
                </p>
                
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "3rem" }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: "1rem", paddingLeft: "1.5rem", position: "relative", color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>❖</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/banquet" className="btn-primary">
                  Đặt Tiệc Ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
