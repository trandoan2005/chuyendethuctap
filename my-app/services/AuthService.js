import api from '@/utils/api';

const AuthService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export default AuthService;
