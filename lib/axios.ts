import axios from 'axios'

import { useAuthStore } from '@/store/auth-store'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      useAuthStore.getState().logout()
      window.location.href = '/auth/login'
    }

    return Promise.reject({
      message:
        error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data,
    })
  }
)

export default api
