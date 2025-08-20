'use client'

import { createContext, useContext, useEffect } from 'react'
import { useAuthStore, User } from '@/store/auth-store'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore()
  const router = useRouter()

  const handleLogin = (user: User, token: string) => {
    login(user, token)
    router.push('/dashboard')
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  useEffect(() => {
    // Auto-logout if token expires or is invalid
    if (isAuthenticated && !user) {
      handleLogout()
    }
  }, [isAuthenticated, user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
