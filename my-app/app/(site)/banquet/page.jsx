"use client";

import { useState } from "react";
import Image from "next/image";

export default function Banquet() {
  const [formData, setFormData] = useState({
    eventType: "Cưới hỏi",
    packageId: "",
    date: "",
    time: "",
    guests: "50",
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="page-header" style={{ padding: "140px 0 80px" }}>
        <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" alt="Banquet Header" fill className="page-header-bg" />
        <div className="page-header-content animate-fade-in-up">
          <p className="page-subtitle">Unforgettable Events</p>
          <h1 className="page-title" style={{ fontSize: "3rem" }}>Dịch Vụ Tiệc</h1>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: "2rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {submitted ? (
            <div className="luxury-card animate-fade-in-up" style={{ textAlign: "center", border: "1px solid var(--accent-gold)" }}>
              <div className="luxury-card-content">
                <h2 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>Yêu Cầu Thành Công!</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                  Cảm ơn {formData.name}. Bộ phận tổ chức sự kiện của Lumina sẽ liên hệ với bạn trong thời gian sớm nhất.
                </p>
                <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                  Tạo Yêu Cầu Khác
                </button>
              </div>
            </div>
          ) : (
            <form className="luxury-card animate-fade-in-up" onSubmit={handleSubmit}>
              <div className="luxury-card-content">
                <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventType">Loại Sự Kiện</label>
                    <select id="eventType" name="eventType" className="form-select" value={formData.eventType} onChange={handleChange}>
                      <option value="Cưới hỏi">Cưới hỏi</option>
                      <option value="Sinh nhật">Sinh nhật</option>
                      <option value="Kỷ niệm">Kỷ niệm</option>
                      <option value="Tiệc công ty">Tiệc công ty</option>
                      <option value="Sự kiện ra mắt">Sự kiện ra mắt</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="packageId">Gói Dịch Vụ</label>
                    <select id="packageId" name="packageId" className="form-select" value={formData.packageId} onChange={handleChange}>
                      <option value="">Chọn gói tiệc (Tùy chọn)</option>
                      <option value="1">Gói Kỷ Niệm Lãng Mạn</option>
                      <option value="2">Gói Sinh Nhật Premium</option>
                      <option value="3">Gói Tiệc Công Ty Toàn Diện</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3" style={{ gap: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="date">Ngày tổ chức</label>
                    <input required type="date" id="date" name="date" className="form-input" value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="time">Giờ bắt đầu</label>
                    <input required type="time" id="time" name="time" className="form-input" value={formData.time} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="guests">Số khách dự kiến</label>
                    <input required type="number" id="guests" name="guests" min="10" className="form-input" value={formData.guests} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Người liên hệ</label>
                    <input required type="text" id="name" name="name" className="form-input" placeholder="Họ và tên" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Số điện thoại</label>
                    <input required type="tel" id="phone" name="phone" className="form-input" placeholder="0912..." value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input required type="email" id="email" name="email" className="form-input" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="requests">Chi tiết yêu cầu</label>
                  <textarea id="requests" name="requests" className="form-textarea" rows="4" placeholder="Mô tả ý tưởng trang trí, thực đơn mong muốn, các dịch vụ MC, âm thanh..." value={formData.requests} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                  Gửi Yêu Cầu Đặt Tiệc
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
