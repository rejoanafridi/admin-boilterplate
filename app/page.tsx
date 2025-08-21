'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/contexts/auth-context'
import { defaultLocale } from '@/lib/i18n-config'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(
        defaultLocale === 'en' ? '/dashboard' : `/${defaultLocale}/dashboard`
      )
    } else {
      router.push(
        defaultLocale === 'en' ? '/auth/login' : `/${defaultLocale}/auth/login`
      )
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}
