"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingCount: 0,
    partyCount: 0,
    totalCustomers: 0
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` };
      
      const statsRes = await fetch("http://localhost:8080/api/admin/stats", { headers });
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      
      const bookingsRes = await fetch("http://localhost:8080/api/bookings", { headers });
      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        // lấy 5 đơn mới nhất
        setRecent(data.slice(0, 5));
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Tổng Đơn Đặt Bàn</h3>
          <p className="stat-value">{stats.totalBookings}</p>
          <p className="stat-change positive">Đơn hệ thống</p>
        </div>
        <div className="admin-stat-card">
          <h3>Số Khách Hàng</h3>
          <p className="stat-value">{stats.totalCustomers}</p>
          <p className="stat-change positive">Người dùng đăng ký</p>
        </div>
        <div className="admin-stat-card">
          <h3>Đơn Đặt Tiệc</h3>
          <p className="stat-value">{stats.partyCount}</p>
          <p className="stat-change positive">Dịch vụ sự kiện</p>
        </div>
        <div className="admin-stat-card">
          <h3>Đơn Chờ Duyệt</h3>
          <p className="stat-value">{stats.pendingCount}</p>
          <p className="stat-change negative">Cần xử lý ngay</p>
        </div>
      </div>

      <div className="admin-recent-section">
        <h3>Đơn Đặt Bàn Gần Đây</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Số khách</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(b => (
              <tr key={b.bookingId}>
                <td>#{b.bookingType === 'PARTY' ? 'PTY' : 'ĐB'}-{String(b.bookingId).padStart(3, '0')}</td>
                <td>{b.user?.fullName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.bookingTime}</td>
                <td>{b.guestCount}</td>
                <td>
                  {b.status === 'CONFIRMED' && <span className="status-badge status-confirmed">Đã xác nhận</span>}
                  {b.status === 'PENDING' && <span className="status-badge status-pending">Chờ duyệt</span>}
                  {b.status === 'CANCELLED' && <span className="status-badge status-cancelled" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>Đã Hủy</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
