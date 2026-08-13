import api from '@/utils/api';

const PackageService = {
  getAll: () => api.get('/packages?all=true'), // For Admin
  getActive: () => api.get('/packages'), // For Client
  create: (data) => api.post('/packages', data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  delete: (id) => api.delete(`/packages/${id}`),
};

export default PackageService;
