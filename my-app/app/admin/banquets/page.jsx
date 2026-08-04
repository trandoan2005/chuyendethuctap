"use client";

import { useState } from "react";

export default function BanquetsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockBanquets = [
    {
      id: 4,
      customerName: "Nguyễn Văn An",
      phone: "0912345678",
      eventType: "Sinh nhật",
      package: "Gói Sinh Nhật Premium",
      date: "2026-08-10",
      time: "18:00",
      table: "VIP 01",
      guests: 10,
      status: "PENDING"
    },
    {
      id: 5,
      customerName: "Phạm Minh Duy",
      phone: "0945678901",
      eventType: "Tiệc công ty",
      package: "Gói Tiệc Công Ty",
      date: "2026-08-15",
      time: "17:30",
      table: "VIP 03",
      guests: 18,
      status: "CONFIRMED"
    },
    {
      id: 6,
      customerName: "Trần Thị Bình",
      phone: "0923456789",
      eventType: "Kỷ niệm",
      package: "Gói Kỷ Niệm Lãng Mạn",
      date: "2026-08-20",
      time: "19:00",
      table: "VIP 02",
      guests: 12,
      status: "PENDING"
    }
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2 style={{ color: "#0f172a" }}>Quản Lý Dịch Vụ Tiệc</h2>
        <input 
          type="text" 
          placeholder="Tìm kiếm tiệc..." 
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã Tiệc</th>
                <th>Khách Hàng</th>
                <th>SĐT</th>
                <th>Loại Sự Kiện</th>
                <th>Gói Tiệc</th>
                <th>Ngày & Giờ</th>
                <th>Khu Vực</th>
                <th>Số Khách</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {mockBanquets.map((banquet) => (
                <tr key={banquet.id}>
                  <td>#PTY-{String(banquet.id).padStart(3, '0')}</td>
                  <td style={{ fontWeight: 500 }}>{banquet.customerName}</td>
                  <td>{banquet.phone}</td>
                  <td><span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>{banquet.eventType}</span></td>
                  <td>{banquet.package}</td>
                  <td>{banquet.date} <br/> <span style={{ color: '#64748b' }}>{banquet.time}</span></td>
                  <td>{banquet.table}</td>
                  <td>{banquet.guests}</td>
                  <td>
                    {banquet.status === 'CONFIRMED' && <span className="status-badge status-confirmed">Đã xác nhận</span>}
                    {banquet.status === 'PENDING' && <span className="status-badge status-pending">Chờ duyệt</span>}
                  </td>
                  <td>
                    <button className="admin-action-btn btn-view">Chi tiết</button>
                    {banquet.status === 'PENDING' && (
                      <button className="admin-action-btn btn-approve">Duyệt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
