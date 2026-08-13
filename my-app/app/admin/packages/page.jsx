"use client";

import { useState, useEffect } from "react";
import PackageService from "@/services/PackageService";

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    imageUrl: "",
    description: "",
    isActive: true
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await PackageService.getAll();
      setPackages(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách gói tiệc:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({
      packageName: "",
      price: "",
      imageUrl: "",
      description: "",
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      packageName: pkg.packageName,
      price: pkg.price,
      imageUrl: pkg.imageUrl || "",
      description: pkg.description || "",
      isActive: pkg.isActive
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Bạn có chắc chắn muốn lưu gói tiệc này?")) return;

    try {
      if (editingPackage) {
        await PackageService.update(editingPackage.packageId, formData);
        alert("Cập nhật thành công!");
      } else {
        await PackageService.create(formData);
        alert("Thêm mới thành công!");
      }

      closeModal();
      fetchPackages();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn XÓA MỀM (Ẩn) gói tiệc này?\nCác đơn đặt tiệc cũ dùng gói này sẽ không bị ảnh hưởng, nhưng người dùng sẽ không thấy gói này nữa.")) return;

    try {
      await PackageService.delete(id);
      alert("Đã ẩn gói tiệc thành công!");
      fetchPackages();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const handleRestore = async (id) => {
    if (!window.confirm("Khôi phục (hiện lại) gói tiệc này?")) return;
    
    // Tìm gói hiện tại để lấy dữ liệu update
    const pkg = packages.find(p => p.packageId === id);
    if (!pkg) return;

    try {
      await PackageService.update(id, {
        ...pkg,
        isActive: true
      });
      alert("Đã khôi phục thành công!");
      fetchPackages();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const filteredPackages = packages.filter(p => 
    (p.packageName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Quản Lý Các Gói Dịch Vụ</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm gói tiệc..." 
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-primary" onClick={openAddModal}>+ Thêm Gói Mới</button>
        </div>
      </div>

      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Gói Dịch Vụ</th>
                <th>Giá (VND)</th>
                <th>Hình Ảnh</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>Đang tải dữ liệu...</td></tr>
              ) : filteredPackages.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>Không có gói tiệc nào.</td></tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.packageId} style={{ opacity: pkg.isActive ? 1 : 0.5 }}>
                    <td>#{pkg.packageId}</td>
                    <td style={{ fontWeight: 500 }}>{pkg.packageName}</td>
                    <td>{new Intl.NumberFormat('vi-VN').format(pkg.price)} đ</td>
                    <td>
                      {pkg.imageUrl ? (
                        <img src={pkg.imageUrl} alt={pkg.packageName} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : "Không có"}
                    </td>
                    <td>
                      {pkg.isActive 
                        ? <span className="status-badge status-confirmed">Đang HĐ</span>
                        : <span className="status-badge status-cancelled" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>Đã Ẩn</span>
                      }
                    </td>
                    <td>
                      <button className="admin-action-btn btn-view" onClick={() => openEditModal(pkg)}>Sửa</button>
                      {pkg.isActive ? (
                        <button className="admin-action-btn btn-cancel" onClick={() => handleDelete(pkg.packageId)}>Xóa</button>
                      ) : (
                        <button className="admin-action-btn btn-approve" onClick={() => handleRestore(pkg.packageId)}>Khôi phục</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingPackage ? "Sửa Thông Tin Gói Dịch Vụ" : "Thêm Gói Dịch Vụ Mới"}</h3>
              <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Tên Gói <span style={{color: 'red'}}>*</span></label>
                  <input type="text" name="packageName" required className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.packageName} onChange={handleInputChange} />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Giá (VND) <span style={{color: 'red'}}>*</span></label>
                  <input type="number" name="price" required min="0" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.price} onChange={handleInputChange} />
                </div>

                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>URL Hình Ảnh (Nếu có)</label>
                  <input type="text" name="imageUrl" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Mô Tả Gói (Dịch vụ bao gồm những gì?)</label>
                  <textarea name="description" className="form-textarea" rows="4" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.description} onChange={handleInputChange}></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: "1rem", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} />
                  <label htmlFor="isActive" className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem", margin: 0 }}>Cho phép khách hàng nhìn thấy và đặt gói này</label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>Hủy bỏ</button>
                <button type="submit" className="btn-primary">Xác nhận & Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
