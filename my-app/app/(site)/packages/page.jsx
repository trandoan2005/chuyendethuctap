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
        img: p.imageUrl || "https://images.unsplash.com/photo-1522416390514-99cebe94713a?q=80&w=2070&auto=format&fit=crop"
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
      img: "https://images.unsplash.com/photo-1522416390514-99cebe94713a?q=80&w=2070&auto=format&fit=crop"
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

      <div className="container section">
        <div className="grid grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="luxury-card" style={{ borderTop: "3px solid var(--accent-gold)" }}>
              <div className="luxury-card-img-wrapper" style={{ paddingTop: "50%" }}>
                <Image src={pkg.img} alt={pkg.name} fill className="luxury-card-img" />
              </div>
              <div className="luxury-card-content">
                <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>{pkg.name}</h2>
                <div style={{ textAlign: "center", color: "var(--accent-gold)", fontSize: "1.8rem", fontWeight: "bold", margin: "1rem 0" }}>
                  {pkg.price} <span style={{ fontSize: "1rem", fontWeight: "normal" }}>VNĐ</span>
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", textAlign: "center" }}>{pkg.desc}</p>
                
                <div style={{ flex: 1, marginBottom: "2rem" }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {pkg.features.map((feature, i) => (
                      <li key={i} style={{ marginBottom: "1rem", paddingLeft: "1.5rem", position: "relative", color: "var(--text-primary)" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>❖</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/banquet" className="btn-primary" style={{ width: "100%" }}>
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
