import api from '@/utils/api';

const FoodService = {
  getAll: () => api.get('/foods'),
  create: (data) => api.post('/foods', data),
  update: (id, data) => api.put(`/foods/${id}`, data),
  delete: (id) => api.delete(`/foods/${id}`)
};

export default FoodService;
