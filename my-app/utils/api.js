import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để tự động thêm Token vào header
api.interceptors.request.use(
  (config) => {
    // Chỉ chạy ở môi trường browser (client-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi (ví dụ 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        // Tránh redirect liên tục nếu đang ở trang login
        if (window.location.pathname !== '/login') {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
