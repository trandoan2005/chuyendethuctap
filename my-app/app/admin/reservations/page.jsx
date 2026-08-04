"use client";

import { useState } from "react";

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockReservations = [
    {
      id: 1,
      customerName: "Nguyễn Văn An",
      phone: "0912345678",
      date: "2026-08-05",
      time: "18:30",
      table: "Bàn 01",
      guests: 3,
      note: "Xin bàn gần cửa sổ",
      status: "CONFIRMED"
    },
    {
      id: 2,
      customerName: "Trần Thị Bình",
      phone: "0923456789",
      date: "2026-08-06",
      time: "19:00",
      table: "Bàn 04",
      guests: 5,
      note: "-",
      status: "PENDING"
    },
    {
      id: 3,
      customerName: "Lê Hoàng Cường",
      phone: "0934567890",
      date: "2026-08-07",
      time: "20:00",
      table: "Bàn 05",
      guests: 7,
      note: "Có trẻ em, cần ghế cao",
      status: "CONFIRMED"
    }
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2 style={{ color: "#0f172a" }}>Quản Lý Đặt Bàn (Thường)</h2>
        <input 
          type="text" 
          placeholder="Tìm kiếm theo tên hoặc SĐT..." 
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
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>SĐT</th>
                <th>Ngày & Giờ</th>
                <th>Bàn</th>
                <th>Số Khách</th>
                <th>Ghi Chú</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {mockReservations.map((res) => (
                <tr key={res.id}>
                  <td>#ĐB-{String(res.id).padStart(3, '0')}</td>
                  <td style={{ fontWeight: 500 }}>{res.customerName}</td>
                  <td>{res.phone}</td>
                  <td>{res.date} <br/> <span style={{ color: '#64748b' }}>{res.time}</span></td>
                  <td>{res.table}</td>
                  <td>{res.guests}</td>
                  <td>{res.note}</td>
                  <td>
                    {res.status === 'CONFIRMED' && <span className="status-badge status-confirmed">Đã xác nhận</span>}
                    {res.status === 'PENDING' && <span className="status-badge status-pending">Chờ duyệt</span>}
                  </td>
                  <td>
                    {res.status === 'PENDING' && (
                      <button className="admin-action-btn btn-approve">Duyệt</button>
                    )}
                    <button className="admin-action-btn btn-cancel">Hủy</button>
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
