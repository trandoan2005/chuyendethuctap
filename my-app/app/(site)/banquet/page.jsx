"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BanquetBooking() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventType: "",
    packageId: "",
    date: "",
    time: "",
    guests: "50",
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  useEffect(() => {
    // 1. Fetch Packages from Backend
    fetch("http://localhost:8080/api/packages")
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Lỗi tải gói tiệc:", err));

    // 2. Auto-fill user info if logged in
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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.eventType) {
        alert("Vui lòng chọn Loại sự kiện!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.date || !formData.time || !formData.guests) {
        alert("Vui lòng điền đủ Thời gian và Quy mô tiệc!");
        return;
      }
      
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate <= today) {
        alert("Ngày đặt tiệc phải lớn hơn ngày hiện tại!");
        return;
      }
      if (parseInt(formData.guests) < 10) {
        alert("Dịch vụ Tiệc yêu cầu tối thiểu 10 khách.");
        return;
      }
      
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Vui lòng đăng nhập trước khi tạo yêu cầu tiệc!");
      router.push("/login");
      return;
    }
    const user = JSON.parse(userStr);

    if (!formData.name || !formData.phone || !formData.email) {
      alert("Vui lòng nhập đầy đủ thông tin liên hệ!");
      return;
    }

    setLoading(true);
    const bookingRequest = {
      userId: user.userId,
      bookingType: "PARTY",
      packageId: formData.packageId ? parseInt(formData.packageId) : null,
      eventType: formData.eventType,
      bookingDate: formData.date,
      bookingTime: formData.time + ":00",
      guestCount: parseInt(formData.guests) || 50,
      note: formData.requests,
      items: []
    };

    try {
      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookingRequest)
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (err) {
      alert("Không kết nối được đến Server.");
    } finally {
      setLoading(false);
    }
  };

  const getPackageName = () => {
    if (!formData.packageId) return "Không chọn gói (Thiết kế riêng)";
    const pkg = packages.find(p => p.packageId.toString() === formData.packageId);
    return pkg ? pkg.packageName : "Đang tải...";
  };

  // Render Steps
  return (
    <>
      <header className="page-header" style={{ height: "40vh", minHeight: "300px" }}>
        <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" alt="Banquet Header" fill sizes="100vw" className="page-header-bg" />
        <div className="container page-header-content animate-fade-in-up">
          <h1 className="page-title">Thiết Kế Bữa Tiệc Của Bạn</h1>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: "2rem", maxWidth: "900px" }}>
        
        {submitted ? (
          <div className="animate-fade-in-up" style={{ padding: "4rem 3rem", background: "var(--bg-secondary)", border: "1px solid var(--accent-gold)", textAlign: "center", borderRadius: "8px" }}>
            <div style={{ fontSize: "4rem", margin: "0 auto 1rem auto" }}>✨</div>
            <h2 style={{ color: "var(--accent-gold)", marginBottom: "1.5rem", fontSize: "2.5rem", fontFamily: "var(--font-playfair)" }}>Yêu Cầu Đã Gửi Thành Công!</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.8" }}>
              Cảm ơn quý khách <strong style={{ color: "white", fontWeight: "normal" }}>{formData.name}</strong>. Bộ phận tổ chức sự kiện của Lumina sẽ liên hệ với quý khách trong vòng 24h tới để tư vấn chi tiết về bữa tiệc.
            </p>
            <Link href="/" className="btn-secondary" style={{ display: "inline-block" }}>Về Trang Chủ</Link>
          </div>
        ) : (
          <div className="animate-fade-in-up" style={{ padding: "3rem", background: "var(--bg-secondary)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px" }}>
            
            {/* PROGRESS BAR */}
            <div className="wizard-progress">
              <div className={`wizard-step ${currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'active') : ''}`}>
                {currentStep > 1 ? "✓" : "1"}
                <span className="wizard-step-label">Loại Tiệc</span>
              </div>
              <div className={`wizard-step ${currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'active') : ''}`}>
                {currentStep > 2 ? "✓" : "2"}
                <span className="wizard-step-label">Quy Mô</span>
              </div>
              <div className={`wizard-step ${currentStep >= 3 ? 'active' : ''}`}>
                3
                <span className="wizard-step-label">Liên Hệ</span>
              </div>
            </div>

            {/* STEP 1: EVENT TYPE & PACKAGE */}
            {currentStep === 1 && (
              <div className="animate-fade-in-up">
                <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-playfair)", marginBottom: "1.5rem", color: "var(--text-primary)" }}>1. Bạn muốn tổ chức sự kiện gì?</h3>
                
                <div className="grid grid-cols-3" style={{ gap: "1rem", marginBottom: "3rem" }}>
                  {["Sinh nhật", "Cưới hỏi", "Tiệc công ty", "Kỷ niệm", "Khác"].map((type) => (
                    <div 
                      key={type}
                      onClick={() => setFormData({ ...formData, eventType: type })}
                      className={`selection-card ${formData.eventType === type ? 'selected' : ''}`}
                      style={{ padding: "1.5rem 1rem" }}
                    >
                      <span className="selection-card-icon">{
                        type === "Sinh nhật" ? "🎂" : 
                        type === "Cưới hỏi" ? "💍" : 
                        type === "Tiệc công ty" ? "💼" : 
                        type === "Kỷ niệm" ? "🥂" : "✨"
                      }</span>
                      <h4 style={{ fontSize: "1.1rem", margin: 0 }}>{type}</h4>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-playfair)", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Chọn Gói Tiệc (Tùy chọn)</h3>
                <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
                  {/* Option: No package */}
                  <div 
                    onClick={() => setFormData({ ...formData, packageId: "" })}
                    className={`selection-card package-card ${formData.packageId === "" ? 'selected' : ''}`}
                  >
                    <div className="package-card-content" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <span style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎨</span>
                      <h3 style={{ textAlign: "center", fontSize: "1.3rem", margin: 0 }}>Thiết kế riêng (Custom)</h3>
                      <p style={{ textAlign: "center", marginTop: "0.5rem" }}>Tự do sáng tạo thực đơn và không gian theo ý thích của bạn.</p>
                    </div>
                  </div>

                  {/* API Packages */}
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.packageId}
                      onClick={() => setFormData({ ...formData, packageId: pkg.packageId.toString() })}
                      className={`selection-card package-card ${formData.packageId === pkg.packageId.toString() ? 'selected' : ''}`}
                    >
                      <div className="package-card-img">
                        <Image 
                          src={(pkg.imageUrl && pkg.imageUrl.trim() !== "") ? pkg.imageUrl : "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"} 
                          alt={pkg.packageName} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "cover" }} 
                        />
                      </div>
                      <div className="package-card-content">
                        <h3 style={{ fontSize: "1.3rem" }}>{pkg.packageName}</h3>
                        <p className="package-card-price">Từ {pkg.price.toLocaleString()} VNĐ</p>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>{pkg.description.substring(0, 80)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: DATE, TIME & GUESTS */}
            {currentStep === 2 && (
              <div className="animate-fade-in-up">
                <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-playfair)", marginBottom: "2rem", color: "var(--text-primary)" }}>2. Thời gian & Quy mô</h3>
                
                <div className="grid grid-cols-2" style={{ gap: "2rem", marginBottom: "2rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Ngày tổ chức</label>
                    <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Giờ bắt đầu</label>
                    <input type="time" name="time" className="form-input" value={formData.time} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Số lượng khách dự kiến</label>
                  <input type="number" name="guests" min="10" className="form-input" value={formData.guests} onChange={handleChange} required />
                  <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--accent-gold)" }}>* Dịch vụ tiệc áp dụng cho nhóm từ 10 người trở lên.</p>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & REVIEW */}
            {currentStep === 3 && (
              <div className="animate-fade-in-up">
                <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-playfair)", marginBottom: "2rem", color: "var(--text-primary)" }}>3. Xác nhận thông tin</h3>
                
                <div className="summary-box" style={{ marginBottom: "2.5rem" }}>
                  <h4 style={{ color: "var(--accent-gold)", marginBottom: "1rem", fontFamily: "var(--font-playfair)", fontSize: "1.2rem", margin: "0 0 1rem 0" }}>Tóm Tắt Yêu Cầu</h4>
                  <div className="summary-row">
                    <span className="summary-label">Loại Sự Kiện:</span>
                    <span className="summary-value">{formData.eventType}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Gói Dịch Vụ:</span>
                    <span className="summary-value">{getPackageName()}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Thời Gian:</span>
                    <span className="summary-value">{formData.time} | {formData.date}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Số Lượng Khách:</span>
                    <span className="summary-value">{formData.guests} người</span>
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: "2rem", marginBottom: "1.5rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Người liên hệ</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Số điện thoại</label>
                    <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Ghi chú đặc biệt (Trang trí, món ăn...)</label>
                  <textarea name="requests" className="form-textarea" rows="3" placeholder="Ví dụ: Khách dị ứng hải sản, cần hỗ trợ máy chiếu..." value={formData.requests} onChange={handleChange}></textarea>
                </div>
              </div>
            )}

            {/* WIZARD NAVIGATION BUTTONS */}
            <div className="wizard-nav">
              {currentStep > 1 ? (
                <button type="button" className="btn-secondary" onClick={handlePrev}>Quay Lại</button>
              ) : <div></div>}

              {currentStep < 3 ? (
                <button type="button" className="btn-primary" onClick={handleNext}>Tiếp Tục</button>
              ) : (
                <button type="button" className="btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Đang Gửi..." : "Xác Nhận Đặt Tiệc"}
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
