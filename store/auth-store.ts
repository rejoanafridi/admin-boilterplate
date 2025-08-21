import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { setAuthToken, removeAuthToken } from '@/lib/cookies'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User, token: string) => {
        // Set token in cookies
        setAuthToken(token)
        // Update store state
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        // Remove token from cookies
        removeAuthToken()
        // Update store state
        set({ user: null, token: null, isAuthenticated: false })
      },
      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
