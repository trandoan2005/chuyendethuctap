"use client";

import { useState, useEffect } from "react";
import FoodService from "@/services/FoodService";

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    foodName: "",
    category: "Món chính",
    price: "",
    imageUrl: "",
    description: "",
    isActive: true
  });

  const categories = ["Món chính", "Khai vị", "Đồ uống", "Tráng miệng", "Combo"];

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      // NOTE: Our backend FoodController currently returns only active foods for GET /api/foods.
      // For Admin, it would be better to have an endpoint for all foods including inactive ones.
      // But for this CRUD we'll use what we have.
      const data = await FoodService.getAll();
      setFoods(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách món ăn:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingFood(null);
    setFormData({
      foodName: "",
      category: "Món chính",
      price: "",
      imageUrl: "",
      description: "",
      isActive: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setFormData({
      foodName: food.foodName || food.name || "",
      category: food.category,
      price: food.price,
      imageUrl: food.imageUrl || "",
      description: food.description || "",
      isActive: food.isActive !== undefined ? food.isActive : true
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
    if (!window.confirm("Bạn có chắc chắn muốn lưu món ăn này?")) return;

    try {
      if (editingFood) {
        await FoodService.update(editingFood.foodId || editingFood.id, formData);
        alert("Cập nhật thành công!");
      } else {
        await FoodService.create(formData);
        alert("Thêm mới thành công!");
      }

      closeModal();
      fetchFoods();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn XÓA (Ẩn) món ăn này khỏi menu?")) return;

    try {
      await FoodService.delete(id);
      alert("Đã ẩn món ăn thành công!");
      fetchFoods();
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  const filteredFoods = foods.filter(f => 
    (f.foodName || f.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Quản Lý Thực Đơn</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm món ăn..." 
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-primary" onClick={openAddModal}>+ Thêm Món Mới</button>
        </div>
      </div>

      <div className="admin-recent-section">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình Ảnh</th>
                <th>Tên Món Ăn</th>
                <th>Danh Mục</th>
                <th>Giá (VND)</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>Đang tải dữ liệu...</td></tr>
              ) : filteredFoods.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>Không có món ăn nào.</td></tr>
              ) : (
                filteredFoods.map((food) => (
                  <tr key={food.foodId || food.id}>
                    <td>#{food.foodId || food.id}</td>
                    <td>
                      {food.imageUrl || food.img ? (
                        <img src={food.imageUrl || food.img} alt={food.foodName || food.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : "Không có"}
                    </td>
                    <td style={{ fontWeight: 500 }}>{food.foodName || food.name}</td>
                    <td><span className="status-badge" style={{ backgroundColor: '#e2e8f0', color: '#475569' }}>{food.category || food.cat}</span></td>
                    <td style={{ color: "var(--accent-gold)", fontWeight: "bold" }}>{new Intl.NumberFormat('vi-VN').format(food.price)} đ</td>
                    <td>
                      <button className="admin-action-btn btn-view" onClick={() => openEditModal(food)}>Sửa</button>
                      <button className="admin-action-btn btn-cancel" onClick={() => handleDelete(food.foodId || food.id)}>Xóa</button>
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
              <h3>{editingFood ? "Sửa Thông Tin Món Ăn" : "Thêm Món Ăn Mới"}</h3>
              <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Tên Món <span style={{color: 'red'}}>*</span></label>
                  <input type="text" name="foodName" required className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.foodName} onChange={handleInputChange} />
                </div>
                
                <div className="grid grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Giá (VND) <span style={{color: 'red'}}>*</span></label>
                    <input type="number" name="price" required min="0" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.price} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Danh Mục <span style={{color: 'red'}}>*</span></label>
                    <select name="category" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.category} onChange={handleInputChange} required>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>URL Hình Ảnh (Nếu có)</label>
                  <input type="text" name="imageUrl" className="form-input" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.imageUrl} onChange={handleInputChange} placeholder="https://images.unsplash.com/..." />
                </div>
                
                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem" }}>Mô Tả Món Ăn</label>
                  <textarea name="description" className="form-textarea" rows="4" style={{ color: "#000", borderColor: "#cbd5e1" }} value={formData.description} onChange={handleInputChange}></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: "1rem", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} />
                  <label htmlFor="isActive" className="form-label" style={{ color: "#1e293b", fontSize: "0.9rem", margin: 0 }}>Đang mở bán (Hiển thị trên Menu)</label>
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
