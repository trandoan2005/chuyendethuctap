import api from '@/utils/api';

const AdminService = {
  getStats: () => api.get('/admin/stats'),
};

export default AdminService;
