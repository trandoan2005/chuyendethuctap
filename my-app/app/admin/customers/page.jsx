"use client";

import { useState } from "react";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockCustomers = [
    {
      id: 2,
      fullName: "Nguyễn Văn An",
      email: "an.nguyen@gmail.com",
      phone: "0912345678",
      createdAt: "2026-07-28 10:15",
      totalBookings: 2
    },
    {
      id: 3,
      fullName: "Trần Thị Bình",
      email: "binh.tran@gmail.com",
      phone: "0923456789",
      createdAt: "2026-07-29 14:20",
      totalBookings: 2
    },
    {
      id: 4,
      fullName: "Lê Hoàng Cường",
      email: "cuong.le@gmail.com",
      phone: "0934567890",
      createdAt: "2026-07-30 09:00",
      totalBookings: 1
    },
    {
      id: 5,
      fullName: "Phạm Minh Duy",
      email: "duy.pham@gmail.com",
      phone: "0945678901",
      createdAt: "2026-07-30 11:30",
      totalBookings: 1
    }
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Danh Sách Khách Hàng</h2>
        <input 
          type="text" 
          placeholder="Tìm kiếm khách hàng..." 
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
                <th>ID</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Ngày Đăng Ký</th>
                <th>Tổng Số Đơn</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td style={{ fontWeight: 500 }}>{customer.fullName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.createdAt}</td>
                  <td><span style={{ padding: "0.2rem 0.6rem", background: "#f1f5f9", borderRadius: "1rem", fontWeight: "bold" }}>{customer.totalBookings}</span></td>
                  <td>
                    <button className="admin-action-btn btn-view">Lịch sử</button>
                    <button className="admin-action-btn btn-cancel">Khóa</button>
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
