import api from '@/utils/api';

const TableService = {
  getAll: () => api.get('/tables'),
  getAvailable: () => api.get('/tables/available'),
  checkAvailability: (date) => api.get(`/tables/check-availability?date=${date}`),
  create: (data) => api.post('/tables', data),
  update: (id, data) => api.put(`/tables/${id}`, data),
  delete: (id) => api.delete(`/tables/${id}`),
};

export default TableService;
