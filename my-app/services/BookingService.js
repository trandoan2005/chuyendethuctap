import api from '@/utils/api';

const BookingService = {
  getAll: () => api.get('/bookings'),
  getRegularBookings: () => api.get('/bookings/regular'),
  getPartyBookings: () => api.get('/bookings/party'),
  createBooking: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
};

export default BookingService;
