import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/api'
const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || 'http://localhost:5000/api'

// ============================================================
// AXIOS INSTANCE FOR SPRING BOOT
// ============================================================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medimind_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ============================================================
// AXIOS INSTANCE FOR FLASK ML
// ============================================================
const mlApi = axios.create({
  baseURL: ML_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ============================================================
// DOCTOR APIs
// ============================================================
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getBySpecialization: (spec) => api.get(`/doctors/specialization/${spec}`),
  getByCity: (city) => api.get(`/doctors/city/${city}`),
}

// ============================================================
// APPOINTMENT APIs
// ============================================================
export const appointmentAPI = {
  book: (data) => api.post('/appointments', data),
  getMyAppointments: () => api.get('/appointments'),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
}

// ============================================================
// MEDICATION APIs
// ============================================================
export const medicationAPI = {
  add: (data) => api.post('/medications', data),
  getAll: () => api.get('/medications'),
  getActive: () => api.get('/medications/active'),
  deactivate: (id) => api.put(`/medications/${id}/deactivate`),
}

// ============================================================
// ML PREDICTION APIs
// ============================================================
export const predictionAPI = {
  diabetes: (data) => mlApi.post('/predict/diabetes', data),
  heart: (data) => mlApi.post('/predict/heart', data),
  hypertension: (data) => mlApi.post('/predict/hypertension', data),
}

// ============================================================
// USER APIs
// ============================================================
export const userAPI = {
  getProfile: () => api.get('/users/me'),
}

export default api