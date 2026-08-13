import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    {
      name: "Món chính",
      desc: "Tinh hoa ẩm thực từ các nguyên liệu hảo hạng nhất, chế biến bởi những đầu bếp chuẩn Michelin.",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
    },
    {
      name: "Khai vị",
      desc: "Những món ăn nhẹ nhàng, kích thích vị giác để bắt đầu một bữa tiệc hoàn hảo.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Đồ uống",
      desc: "Bộ sưu tập rượu vang thượng hạng và các loại đồ uống tinh tế.",
      img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Tráng miệng",
      desc: "Sự kết thúc ngọt ngào và đáng nhớ cho trải nghiệm ẩm thực của bạn.",
      img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Combo",
      desc: "Những set menu được thiết kế riêng biệt để mang lại sự kết hợp hoàn hảo nhất.",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <header className="page-header" style={{ height: "40vh" }}>
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" alt="Categories Header" fill sizes="100vw" priority className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle text-gradient-gold">Khám Phá Hương Vị</p>
          <h1 className="page-title">Danh Mục Món Ăn</h1>
        </div>
      </header>

      <div className="container section" style={{ padding: "4rem 5%" }}>
        <div className="grid grid-cols-2" style={{ gap: "2rem" }}>
          {categories.map((cat, index) => (
            <Link 
              href="/menu" 
              key={cat.name} 
              className={`glass-panel glass-panel-hover animate-fade-in-up delay-${(index % 3) * 100}`}
              style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
            >
              <div style={{ position: "relative", height: "250px", width: "100%" }}>
                <Image src={cat.img} alt={cat.name} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}></div>
                <h3 style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", fontSize: "2rem", margin: 0, color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                  {cat.name}
                </h3>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "1rem", lineHeight: "1.6" }}>
                  {cat.desc}
                </p>
                <div style={{ marginTop: "1.5rem", color: "var(--accent-gold)", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
                  Xem Món Ăn ➔
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
