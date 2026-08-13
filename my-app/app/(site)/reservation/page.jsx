"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BookingService from "@/services/BookingService";
import PackageService from "@/services/PackageService";
import TableService from "@/services/TableService";

export default function UnifiedBookingPage() {
  const router = useRouter();
  const { cart, getTotalPrice } = useCart();
  
  const [packages, setPackages] = useState([]);
  const [tables, setTables] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  
  const tablesRef = useRef(null);
  const formRef = useRef(null);
  
  const [filterData, setFilterData] = useState({
    bookingType: "REGULAR", // REGULAR, PARTY, BIRTHDAY...
    date: "",
    time: "",
    guests: "2"
  });

  const [formData, setFormData] = useState({
    eventType: "", 
    packageId: "", 
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  useEffect(() => {
    PackageService.getActive().then(res => setPackages(res)).catch(e => console.error(e));

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setFormData(prev => ({
          ...prev,
          name: user.fullName || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      } catch (e) {}
    }
    
    // Set default date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${yyyy}-${mm}-${dd}`;
    setFilterData(prev => ({ ...prev, date: defaultDate }));
    
    // Initial fetch for today
    TableService.checkAvailability(defaultDate).then(availableTables => {
      // Default guests is 2
      let matchedTables = availableTables.filter(t => t.capacity >= 2);
      setTables(matchedTables);
    }).catch(e => console.error(e));
  }, []);

  const handleFilterChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    setSearched(false);
    setSelectedTable(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchTables = async () => {
    if (!filterData.date || !filterData.time || !filterData.guests) {
      return alert("Vui lòng nhập đủ Ngày, Giờ và Số lượng khách để tìm bàn!");
    }
    
    const selectedDate = new Date(filterData.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
      return alert("Ngày đặt không hợp lệ!");
    }

    try {
      setLoading(true);
      // Gọi API kiểm tra bàn trống trong ngày đó
      const availableTables = await TableService.checkAvailability(filterData.date);
      
      // Lọc tiếp trên Frontend theo sức chứa (Capacity >= Guests)
      const guestCount = parseInt(filterData.guests);
      let matchedTables = availableTables.filter(t => t.capacity >= guestCount);
      
      // Nếu là tiệc (từ 10 khách trở lên), ưu tiên hiển thị các bàn có sức chứa lớn
      if (["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType)) {
        if (guestCount < 10) {
          alert("Các loại Đặt Tiệc thường yêu cầu từ 10 khách trở lên. Đang tự động tìm bàn phù hợp.");
        }
      }

      setTables(matchedTables);
      setSearched(true);
      
      setTimeout(() => {
        tablesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      console.error(err);
      alert("Lỗi khi tìm kiếm bàn trống.");
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    // Scroll to form slightly after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTable) {
      return alert("Vui lòng chọn một Không gian / Bàn trước!");
    }
    
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Vui lòng đăng nhập trước khi xác nhận đặt bàn!");
      router.push("/login");
      return;
    }
    
    if (!formData.name || !formData.phone || !formData.email) {
      return alert("Vui lòng nhập đầy đủ thông tin liên hệ!");
    }

    setShowDepositModal(true);
  };

  const handleFinalSubmit = async () => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    
    setLoading(true);

    const bookingTypeEnum = ["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) ? "PARTY" : "REGULAR";

    const bookingRequest = {
      userId: user.userId,
      tableId: selectedTable.id || selectedTable.tableId,
      bookingType: bookingTypeEnum,
      packageId: bookingTypeEnum === "PARTY" && formData.packageId ? parseInt(formData.packageId) : null,
      eventType: filterData.bookingType === "BIRTHDAY" ? "Sinh Nhật" : filterData.bookingType === "COMPANY" ? "Tiệc Công Ty" : formData.eventType,
      bookingDate: filterData.date,
      bookingTime: filterData.time + ":00",
      guestCount: parseInt(filterData.guests),
      note: formData.requests,
      items: cart.map(item => ({ foodId: item.id, quantity: item.qty }))
    };

    try {
      await BookingService.createBooking(bookingRequest);
      setShowDepositModal(false);
      setSubmitted(true);
    } catch (err) {
      alert("Lỗi kết nối hoặc xử lý từ Server.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container section" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", paddingTop: "120px" }}>
        <div className="glass-panel animate-scale-in" style={{ padding: "4rem 3rem", textAlign: "center", maxWidth: "600px", width: "100%" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <h2 className="text-gradient-gold" style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontFamily: "var(--font-playfair)" }}>Đặt Bàn Thành Công!</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.8" }}>
            Cảm ơn quý khách <strong style={{ color: "white" }}>{formData.name}</strong>. Yêu cầu đặt bàn của quý khách tại <strong style={{ color: "white" }}>{selectedTable.name || selectedTable.tableNumber}</strong> vào lúc <strong style={{ color: "white" }}>{filterData.time} ngày {filterData.date}</strong> đã được ghi nhận. 
            <br/><br/>Hệ thống đã xác nhận tiền cọc của bạn. Quản lý nhà hàng sẽ liên hệ sớm nhất.
          </p>
          <button className="btn-primary" onClick={() => router.push("/")}>Về Trang Chủ</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" alt="Reservation Background" fill sizes="100vw" priority style={{ objectFit: "cover", opacity: 0.2 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,1) 100%)" }}></div>
      </div>

      <div className="container" style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "4rem", maxWidth: "1000px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 className="text-gradient-gold" style={{ fontSize: "2.5rem", fontFamily: "var(--font-playfair)", marginBottom: "0.5rem" }}>Lumina Reservation</h1>
          <p style={{ color: "var(--text-secondary)", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.85rem" }}>Tìm Kiếm Không Gian Trải Nghiệm</p>
        </div>

        {/* BƯỚC 1: BỘ LỌC TÌM BÀN */}
        <div className="glass-panel animate-fade-in-up" style={{ padding: "2rem", marginBottom: "3rem" }}>
          <div className="grid grid-cols-4" style={{ gap: "1rem", alignItems: "end" }}>
            <div className="modern-input-group" style={{ marginBottom: 0 }}>
              <select name="bookingType" className="modern-input" value={filterData.bookingType} onChange={handleFilterChange} required style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <option value="REGULAR">Bàn Thường (Gia đình/Bạn bè)</option>
                <option value="PARTY">Đặt Tiệc Chung</option>
                <option value="BIRTHDAY">Tiệc Sinh Nhật</option>
                <option value="COMPANY">Tiệc Công Ty / Hội Họp</option>
                <option value="DRINK">Bàn Nhậu / Chill</option>
              </select>
              <label className="modern-label" style={{ top: "-20px", fontSize: "0.8rem" }}>Mục Đích Đặt</label>
            </div>
            
            <div className="modern-input-group" style={{ marginBottom: 0 }}>
              <input type="number" name="guests" min="1" className="modern-input" value={filterData.guests} onChange={handleFilterChange} required />
              <label className="modern-label">Số Lượng Khách</label>
            </div>

            <div className="modern-input-group" style={{ marginBottom: 0 }}>
              <input type="date" name="date" className="modern-input" value={filterData.date} onChange={handleFilterChange} required />
              <label className="modern-label">Ngày Đến</label>
            </div>

            <div className="modern-input-group" style={{ marginBottom: 0 }}>
              <input type="time" name="time" className="modern-input" value={filterData.time} onChange={handleFilterChange} required />
              <label className="modern-label">Giờ Đến</label>
            </div>
          </div>
          
          <button 
            className="btn-primary" 
            style={{ width: "100%", padding: "1rem", marginTop: "2rem", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }} 
            onClick={handleSearchTables}
            disabled={loading}
          >
            {loading ? "ĐANG LỌC..." : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                LỌC BÀN PHÙ HỢP
              </>
            )}
          </button>
        </div>

        {/* BƯỚC 2: HIỂN THỊ DANH SÁCH BÀN TRỐNG */}
          <div ref={tablesRef} style={{ marginBottom: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", fontFamily: "var(--font-playfair)", textAlign: "center" }}>
              {tables.length > 0 ? `Chúng tôi tìm thấy ${tables.length} không gian phù hợp cho bạn` : "Rất tiếc, không có bàn trống phù hợp với yêu cầu của bạn!"}
            </h3>
            
            <div className="grid grid-cols-2" style={{ gap: "2rem" }}>
              {tables.map((table) => {
                const isSelected = selectedTable && (selectedTable.id === table.id || selectedTable.tableId === table.tableId);
                return (
                  <div 
                    key={table.id || table.tableId} 
                    className={`glass-panel glass-panel-hover ${isSelected ? 'selected' : ''}`}
                    style={{ 
                      padding: 0, overflow: "hidden", cursor: "pointer",
                      border: isSelected ? "2px solid var(--accent-gold)" : "1px solid rgba(255,255,255,0.05)" 
                    }}
                    onClick={() => handleTableSelect(table)}
                  >
                    <div style={{ position: "relative", height: "200px", width: "100%" }}>
                      <Image src={table.imageUrl || table.img || "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070"} alt={table.tableNumber || table.name} fill style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}></div>
                      <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(0,0,0,0.7)", padding: "0.3rem 0.8rem", color: "var(--accent-gold)", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", border: "1px solid var(--accent-gold)" }}>
                        {table.area || table.tag}
                      </div>
                      <h3 style={{ position: "absolute", bottom: "1rem", left: "1rem", fontSize: "1.5rem", margin: 0, color: "white" }}>
                        {table.tableNumber || table.name}
                      </h3>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <p style={{ color: "var(--text-secondary)", margin: "0 0 1rem 0", fontSize: "0.9rem", lineHeight: "1.5", height: "45px", overflow: "hidden" }}>
                        {table.description || table.desc}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>Sức chứa: <strong style={{ color: "var(--accent-gold)" }}>{table.capacity} khách</strong></span>
                        <button className={isSelected ? "btn-primary" : "btn-secondary"} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                          {isSelected ? "Đã Chọn" : "Chọn Bàn Này"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        {/* BƯỚC 3: FORM THÔNG TIN (CHỈ HIỆN KHI ĐÃ CHỌN BÀN) */}
        {selectedTable && (
          <div ref={formRef} className="glass-panel animate-fade-in-up" style={{ padding: "3rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 className="text-gradient-gold" style={{ fontSize: "2rem", fontFamily: "var(--font-playfair)", marginTop: "0.5rem" }}>
                Xác nhận đặt: {selectedTable.tableNumber || selectedTable.name}
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Thời gian: <strong>{filterData.time}</strong> ngày <strong>{filterData.date}</strong> — Số lượng: <strong>{filterData.guests} khách</strong>
              </p>
            </div>

            <form onSubmit={handlePreSubmit}>
              
              {/* DỊCH VỤ KÈM THEO */}
              {(["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) || cart.length > 0) && (
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", fontFamily: "var(--font-playfair)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", color: "var(--accent-gold)" }}>1. Dịch Vụ Kèm Theo</h3>
              )}

              {["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) && (
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Chọn Gói Dịch Vụ Tiệc (Tùy chọn):</h4>
                  <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
                    <div 
                      className={`selection-card package-card ${formData.packageId === "" ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, packageId: "" })}
                      style={{ padding: "1rem", textAlign: "center" }}
                    >
                      <h4 style={{ margin: 0, fontSize: "1rem" }}>Không dùng gói (Tự chọn món)</h4>
                    </div>
                    {packages.map(pkg => (
                      <div 
                        key={pkg.packageId}
                        className={`selection-card package-card ${formData.packageId === pkg.packageId.toString() ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, packageId: pkg.packageId.toString() })}
                        style={{ padding: "1rem", textAlign: "center" }}
                      >
                        <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "1rem" }}>{pkg.packageName}</h4>
                        <span className="text-gradient-gold" style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Từ {pkg.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cart.length > 0 && (
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "2rem" }}>
                  <h4 style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>Món ăn đã chọn trước (Từ Giỏ Hàng):</h4>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                      <span>{item.qty}x {item.name}</span>
                      <span style={{ color: "var(--accent-gold)" }}>{item.price}đ</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                    <span>Tổng tạm tính thực đơn:</span>
                    <span className="text-gradient-gold">{getTotalPrice().toLocaleString()}đ</span>
                  </div>
                </div>
              )}

              {/* THÔNG TIN LIÊN HỆ */}
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", marginTop: "2rem", fontFamily: "var(--font-playfair)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", color: "var(--accent-gold)" }}>2. Thông Tin Liên Hệ</h3>
              
              <div className="grid grid-cols-2" style={{ gap: "1rem", paddingBottom: "1rem" }}>
                <div className="modern-input-group" style={{ marginBottom: 0 }}>
                  <input type="text" name="name" className="modern-input" value={formData.name} onChange={handleFormChange} required />
                  <label className="modern-label">Họ và tên</label>
                </div>
                <div className="modern-input-group" style={{ marginBottom: 0 }}>
                  <input type="tel" name="phone" className="modern-input" value={formData.phone} onChange={handleFormChange} required />
                  <label className="modern-label">Số điện thoại</label>
                </div>
              </div>

              <div className="modern-input-group" style={{ marginBottom: "1rem" }}>
                <input type="email" name="email" className="modern-input" value={formData.email} onChange={handleFormChange} required />
                <label className="modern-label">Email</label>
              </div>

              <div className="modern-input-group" style={{ marginBottom: "2rem" }}>
                <textarea name="requests" className="modern-input" style={{ minHeight: "80px", resize: "vertical" }} placeholder="Dị ứng thực phẩm, yêu cầu trang trí đặc biệt..." value={formData.requests} onChange={handleFormChange}></textarea>
                <label className="modern-label">Yêu cầu đặc biệt (Ghi chú)</label>
              </div>

              {/* CỌC TIỀN */}
              <div style={{ background: "rgba(255, 68, 68, 0.1)", border: "1px solid rgba(255, 68, 68, 0.3)", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem" }}>
                <h4 style={{ color: "#ff4444", margin: "0 0 0.5rem 0", fontSize: "1rem" }}>⚠️ Quy định đặt chỗ</h4>
                <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Để đảm bảo trải nghiệm tốt nhất và giữ đúng không gian bàn <strong>{selectedTable.tableNumber || selectedTable.name}</strong>, nhà hàng yêu cầu <strong>thanh toán trước khoản cọc 500,000 VNĐ</strong>.
                </p>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", padding: "1.2rem", fontSize: "1.1rem" }} disabled={loading}>
                XÁC NHẬN & THANH TOÁN CỌC
              </button>
            </form>
          </div>
        )}

      </div>

      {/* MODAL THANH TOÁN CỌC */}
      {showDepositModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass-panel animate-scale-in" style={{ maxWidth: "450px", width: "90%", padding: "3rem 2rem", textAlign: "center", position: "relative" }}>
            <button 
              onClick={() => setShowDepositModal(false)} 
              style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer" }}
            >
              &times;
            </button>
            
            <h2 className="text-gradient-gold" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Thanh Toán Cọc</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "2rem" }}>
              Vui lòng quét mã QR để chuyển khoản <strong>500,000 VNĐ</strong> giữ chỗ.
            </p>

            <div style={{ background: "white", padding: "1rem", borderRadius: "12px", display: "inline-block", marginBottom: "2rem" }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAY_DEPOSIT_${Date.now()}`} alt="QR Code" style={{ display: "block" }} />
            </div>

            <div style={{ textAlign: "left", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>Ngân hàng: <strong>Vietcombank</strong></p>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>Số TK: <strong>1900 888 888</strong></p>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>Tên: <strong>LUMINA RESTAURANT</strong></p>
              <p style={{ margin: "0", fontSize: "0.9rem" }}>Nội dung: <strong>COC BAN {formData.phone}</strong></p>
            </div>

            <button className="btn-primary" style={{ width: "100%", padding: "1rem" }} onClick={handleFinalSubmit} disabled={loading}>
              {loading ? "ĐANG XỬ LÝ..." : "TÔI ĐÃ CHUYỂN KHOẢN"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
