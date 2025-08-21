import api from '@/lib/axios'

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  role?: string
  status?: 'active' | 'inactive'
}

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export const userService = {
  getUsers: async (params?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }): Promise<UsersResponse> => {
    const response = await api.get('/users', { params })
    return response.data
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', userData)
    return response.data
  },

  updateUser: async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
