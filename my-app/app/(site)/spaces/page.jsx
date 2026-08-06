import Image from "next/image";
import Link from "next/link";

export default async function SpacesPage() {
  let spaces = [];
  try {
    const res = await fetch("http://localhost:8080/api/tables", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      spaces = data.map(t => ({
        id: t.tableId,
        name: t.tableNumber,
        capacity: t.capacity,
        desc: t.description,
        tag: t.area,
        img: t.imageUrl || "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop"
      }));
    }
  } catch (error) {
    console.error("Lỗi gọi API tables:", error);
  }

  if (spaces.length === 0) {
    spaces = [
    {
      id: 1,
      name: "Lumina Hall",
      capacity: 120,
      desc: "Không gian mở, thoáng đãng với trần cao và đèn chùm pha lê sang trọng. Phù hợp cho bữa tối gia đình hoặc gặp mặt bạn bè.",
      tag: "Sảnh Chính",
      img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Khu Vườn Kính",
      capacity: 12,
      desc: "Phòng riêng biệt với vách kính cách âm, nhìn ra view thành phố. Thích hợp cho tiếp đối tác hoặc họp mặt riêng tư.",
      tag: "VIP",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Phòng Hoàng Gia",
      capacity: 20,
      desc: "Thiết kế tân cổ điển, tông màu vàng hoàng gia, có phục vụ riêng. Trải nghiệm ẩm thực cao cấp nhất.",
      tag: "VIP",
      img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Sky Lounge",
      capacity: 50,
      desc: "Tận hưởng làn gió mát và ngắm nhìn toàn cảnh thành phố lung linh về đêm. Cực kỳ lãng mạn cho các cặp đôi.",
      tag: "Sân Thượng",
      img: "https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=2070&auto=format&fit=crop"
    }
    ];
  }

  return (
    <>
      <header className="page-header">
        <Image src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1974&auto=format&fit=crop" alt="Spaces Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">Ambiance & Atmosphere</p>
          <h1 className="page-title">Không Gian</h1>
        </div>
      </header>

      <div className="container section" style={{ maxWidth: "1200px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {spaces.map((space, index) => (
            <div key={space.id} className="animate-fade-in-up" style={{ 
              display: "flex", 
              flexDirection: index % 2 === 0 ? "row" : "row-reverse", 
              alignItems: "center", 
              gap: "4rem" 
            }}>
              {/* Image Side */}
              <div style={{ flex: "1 1 50%", position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image src={space.img} alt={space.name} fill style={{ objectFit: "cover" }} />
                <div style={{ 
                  position: "absolute", top: "1.5rem", right: index % 2 === 0 ? "1.5rem" : "auto", left: index % 2 !== 0 ? "1.5rem" : "auto", 
                  background: "rgba(0,0,0,0.8)", padding: "0.5rem 1rem", border: "1px solid var(--accent-gold)", 
                  color: "var(--accent-gold)", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase" 
                }}>
                  {space.tag}
                </div>
              </div>

              {/* Text Side */}
              <div style={{ flex: "1 1 50%", padding: "2rem" }}>
                <h2 style={{ fontSize: "3rem", marginBottom: "1rem", color: "var(--text-primary)" }}>{space.name}</h2>
                <div style={{ 
                  color: "var(--accent-gold)", marginBottom: "2rem", fontWeight: "400", 
                  fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.3)", paddingBottom: "1rem", display: "inline-block"
                }}>
                  Sức chứa tối đa: {space.capacity} khách
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1.05rem", lineHeight: "1.8" }}>
                  {space.desc}
                </p>
                <Link href="/reservation" className="btn-secondary">
                  Đặt Bàn Khu Vực Này
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
