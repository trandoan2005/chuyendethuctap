"use client";

import { useState, useEffect } from "react";
import BookingService from "@/services/BookingService";

export default function BanquetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await BookingService.getPartyBookings();
      setBanquets(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách đặt tiệc:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await BookingService.updateStatus(id, status);
      fetchBookings();
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
      await BookingService.updateBooking(selectedBooking.bookingId, {
        bookingDate: editData.bookingDate,
        bookingTime: editData.bookingTime,
        guestCount: parseInt(editData.guestCount) || selectedBooking.guestCount,
        eventType: editData.eventType,
        note: editData.note,
        tableId: editData.tableId ? parseInt(editData.tableId) : null
      });
      alert("Cập nhật thành công!");
      closeModal();
      fetchBookings();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const filteredBanquets = banquets.filter(r => 
    (r.user?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.user?.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Quản Lý Dịch Vụ Tiệc</h2>
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
              {loading ? (
                <tr><td colSpan="10" style={{ textAlign: "center", padding: "2rem" }}>Đang tải dữ liệu...</td></tr>
              ) : filteredBanquets.length === 0 ? (
                <tr><td colSpan="10" style={{ textAlign: "center", padding: "2rem" }}>Không tìm thấy đơn đặt tiệc nào.</td></tr>
              ) : (
                filteredBanquets.map((banquet) => (
                  <tr key={banquet.bookingId}>
                    <td>#PTY-{String(banquet.bookingId).padStart(3, '0')}</td>
                    <td style={{ fontWeight: 500 }}>{banquet.user?.fullName || "Khách ẩn danh"}</td>
                    <td>{banquet.user?.phone || "-"}</td>
                    <td><span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>{banquet.eventType || "-"}</span></td>
                    <td>{banquet.partyPackage ? banquet.partyPackage.packageName : "-"}</td>
                    <td>{banquet.bookingDate} <br/> <span style={{ color: '#64748b' }}>{banquet.bookingTime}</span></td>
                    <td>{banquet.table ? banquet.table.tableNumber : "Chưa xếp"}</td>
                    <td>{banquet.guestCount}</td>
                    <td>
                      {banquet.status === 'CONFIRMED' && <span className="status-badge status-confirmed">Đã xác nhận</span>}
                      {banquet.status === 'PENDING' && <span className="status-badge status-pending">Chờ duyệt</span>}
                      {banquet.status === 'CANCELLED' && <span className="status-badge status-cancelled" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>Đã Hủy</span>}
                    </td>
                    <td>
                      <button className="admin-action-btn btn-view" onClick={() => openModal(banquet)}>Chi tiết</button>
                      {banquet.status === 'PENDING' && (
                        <button className="admin-action-btn btn-approve" onClick={() => updateStatus(banquet.bookingId, 'CONFIRMED')}>Duyệt</button>
                      )}
                      {banquet.status !== 'CANCELLED' && (
                        <button className="admin-action-btn btn-cancel" onClick={() => updateStatus(banquet.bookingId, 'CANCELLED')}>Hủy</button>
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
              <h3>Chi Tiết Đơn Tiệc #{String(selectedBooking.bookingId).padStart(3, '0')}</h3>
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
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Ngày Tổ Chức</label>
                  <input type="date" name="bookingDate" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.bookingDate} onChange={handleEditChange} />
                </div>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Giờ</label>
                  <input type="time" name="bookingTime" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.bookingTime} onChange={handleEditChange} />
                </div>
              </div>
              <div className="grid grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Số Lượng Khách</label>
                  <input type="number" name="guestCount" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.guestCount} onChange={handleEditChange} />
                </div>
                <div>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Loại Sự Kiện</label>
                  <input type="text" name="eventType" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={editData.eventType} onChange={handleEditChange} />
                </div>
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
