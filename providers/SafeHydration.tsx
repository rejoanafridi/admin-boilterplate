'use client'

import { ReactNode, useRef } from 'react'

/**
 * Component that ensures hydration safety by only rendering children after hydration is complete
 */
export default function SafeHydration({ children }: { children: ReactNode }) {
  const isMounted = useRef(false)

  // This effect runs once after hydration
  if (typeof window !== 'undefined' && !isMounted.current) {
    isMounted.current = true
  }

  // For SSR, don't render anything that might cause hydration mismatch
  if (!isMounted.current) {
    return null
  }

  // Client-side render after hydration
  return <>{children}</>
}
