import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://portfoliohub-a6el.onrender.com'
const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`

export const api = axios.create({
  baseURL: API_URL,
})

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    const hasAuth = config.headers['Authorization'] || config.headers['authorization']
    if (token && !hasAuth) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
