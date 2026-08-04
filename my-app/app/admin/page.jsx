"use client";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Tổng Đơn Đặt Bàn</h3>
          <p className="stat-value">124</p>
          <p className="stat-change positive">+12% tuần này</p>
        </div>
        <div className="admin-stat-card">
          <h3>Tiệc Sắp Tới</h3>
          <p className="stat-value">8</p>
          <p className="stat-change">Trong 30 ngày tới</p>
        </div>
        <div className="admin-stat-card">
          <h3>Doanh Thu</h3>
          <p className="stat-value">45.200.000₫</p>
          <p className="stat-change positive">+5.4% tháng này</p>
        </div>
        <div className="admin-stat-card">
          <h3>Đơn Chờ Duyệt</h3>
          <p className="stat-value">14</p>
          <p className="stat-change negative">Cần xử lý</p>
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
            <tr>
              <td>#ĐB-001</td>
              <td>Nguyễn Văn An</td>
              <td>2026-08-05</td>
              <td>18:30</td>
              <td>3</td>
              <td><span className="status-badge status-confirmed">Đã xác nhận</span></td>
            </tr>
            <tr>
              <td>#ĐB-002</td>
              <td>Trần Thị Bình</td>
              <td>2026-08-06</td>
              <td>19:00</td>
              <td>5</td>
              <td><span className="status-badge status-pending">Chờ duyệt</span></td>
            </tr>
            <tr>
              <td>#ĐB-003</td>
              <td>Lê Hoàng Cường</td>
              <td>2026-08-07</td>
              <td>20:00</td>
              <td>7</td>
              <td><span className="status-badge status-confirmed">Đã xác nhận</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
