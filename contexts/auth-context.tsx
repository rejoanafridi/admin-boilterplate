'use client'

import { createContext, useContext, useEffect } from 'react'
import { useAuthStore, User } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { isAuthenticated as checkAuthCookie, getAuthToken } from '@/lib/cookies'

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
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  // Verify token on mount and when auth state changes
  useEffect(() => {
    const verifyAuth = async () => {
      // Check if we have a token in cookies but not in store
      const hasTokenInCookies = checkAuthCookie()
      const tokenFromCookies = getAuthToken()
      
      if (hasTokenInCookies && !isAuthenticated && tokenFromCookies) {
        // TODO: Validate token with API if needed
        // For now, we'll just consider having a token as being authenticated
        setLoading(true)
        try {
          // Here you would typically make an API call to validate the token
          // and get the user data
          // For now, we'll just simulate a successful validation
          
          // This would be replaced with actual API call in production
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Mock user data - in production, this would come from the API
          const mockUser = {
            id: '1',
            name: 'Restored Session',
            email: 'user@example.com',
            role: 'admin',
          }
          
          // Login with the restored session
          login(mockUser, tokenFromCookies)
        } catch (error) {
          // If token validation fails, log out
          console.error('Token validation failed:', error)
          logout()
        } finally {
          setLoading(false)
        }
      } else if (!hasTokenInCookies && isAuthenticated) {
        // If we have no token in cookies but we're authenticated in store,
        // something is wrong - log out
        logout()
      }
    }

    verifyAuth()
  }, [isAuthenticated, login, logout, setLoading])

  // Auto-logout if token is invalid
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
