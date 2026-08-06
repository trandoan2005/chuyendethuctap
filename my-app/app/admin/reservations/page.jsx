"use client";

import { useState, useEffect } from "react";

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/bookings/regular", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách đặt bàn:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/bookings/${id}/status`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchBookings(); // refresh
      } else {
        alert("Có lỗi xảy ra khi cập nhật trạng thái!");
      }
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setEditData({
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      guestCount: booking.guestCount,
      eventType: booking.eventType || "",
      note: booking.note || "",
      tableId: booking.table ? booking.table.tableId : ""
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveDetails = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn lưu những thay đổi này?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/bookings/${selectedBooking.bookingId}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingDate: editData.bookingDate,
          bookingTime: editData.bookingTime,
          guestCount: parseInt(editData.guestCount) || selectedBooking.guestCount,
          eventType: editData.eventType,
          note: editData.note,
          tableId: editData.tableId ? parseInt(editData.tableId) : null
        })
      });
      if (res.ok) {
        alert("Cập nhật thành công!");
        closeModal();
        fetchBookings();
      } else {
        alert("Có lỗi xảy ra khi lưu chi tiết!");
      }
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const filteredReservations = reservations.filter(r => 
    (r.user?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.user?.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Quản Lý Đặt Bàn (Thường)</h2>
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
              {loading ? (
                <tr><td colSpan="9" style={{ textAlign: "center", padding: "2rem" }}>Đang tải dữ liệu...</td></tr>
              ) : filteredReservations.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign: "center", padding: "2rem" }}>Không tìm thấy đơn đặt bàn nào.</td></tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.bookingId}>
                    <td>#ĐB-{String(res.bookingId).padStart(3, '0')}</td>
                    <td style={{ fontWeight: 500 }}>{res.user?.fullName || "Khách ẩn danh"}</td>
                    <td>{res.user?.phone || "-"}</td>
                    <td>{res.bookingDate} <br/> <span style={{ color: '#64748b' }}>{res.bookingTime}</span></td>
                    <td>{res.table ? res.table.tableNumber : "Chưa xếp"}</td>
                    <td>{res.guestCount}</td>
                    <td>{res.note}</td>
                    <td>
                      {res.status === 'CONFIRMED' && <span className="status-badge status-confirmed">Đã xác nhận</span>}
                      {res.status === 'PENDING' && <span className="status-badge status-pending">Chờ duyệt</span>}
                      {res.status === 'CANCELLED' && <span className="status-badge status-cancelled" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>Đã Hủy</span>}
                    </td>
                    <td>
                      <button className="admin-action-btn btn-view" onClick={() => openModal(res)}>Chi tiết</button>
                      {res.status === 'PENDING' && (
                        <button className="admin-action-btn btn-approve" onClick={() => updateStatus(res.bookingId, 'CONFIRMED')}>Duyệt</button>
                      )}
                      {res.status !== 'CANCELLED' && (
                        <button className="admin-action-btn btn-cancel" onClick={() => updateStatus(res.bookingId, 'CANCELLED')}>Hủy</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedBooking && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Chi Tiết Đơn Đặt Bàn #{String(selectedBooking.bookingId).padStart(3, '0')}</h3>
              <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="grid grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Khách Hàng</label>
                  <input type="text" className="form-input" style={{ color: "#000", background: "#f8fafc", borderColor: "#cbd5e1" }} value={selectedBooking.user?.fullName || ""} disabled />
                </div>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Số Điện Thoại</label>
                  <input type="text" className="form-input" style={{ color: "#000", background: "#f8fafc", borderColor: "#cbd5e1" }} value={selectedBooking.user?.phone || ""} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Ngày Đặt</label>
                  <input type="date" name="bookingDate" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.bookingDate} onChange={handleEditChange} />
                </div>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Giờ Đến</label>
                  <input type="time" name="bookingTime" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.bookingTime} onChange={handleEditChange} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Số Lượng Khách</label>
                <input type="number" name="guestCount" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.guestCount} onChange={handleEditChange} />
              </div>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Ghi Chú</label>
                <textarea name="note" className="form-textarea" rows="3" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.note} onChange={handleEditChange}></textarea>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Hủy bỏ</button>
              <button className="btn-primary" onClick={handleSaveDetails}>Xác nhận & Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
