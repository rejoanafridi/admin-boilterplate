# Cookie Management

This document explains how cookies are managed in the application.

## Overview

The application uses cookies for:
- Authentication token storage
- Session persistence
- User preferences (future)

## Implementation

Cookie management is implemented in `lib/cookies.ts` which provides utility functions for:

```typescript
// Authentication
setAuthToken(value: string, options = {})
getAuthToken(): string | undefined
removeAuthToken()
isAuthenticated(): boolean

// General cookie utilities
setCookie(key: string, value: string, options = {})
getCookie(key: string): string | undefined
removeCookie(key: string, options = {})
clearAllCookies()
```

## Integration with Auth System

The cookie management is integrated with the authentication system in two places:

1. **Auth Store (`store/auth-store.ts`)**:
   - When a user logs in, the token is stored in cookies
   - When a user logs out, the token is removed from cookies

```typescript
login: (user: User, token: string) => {
  // Set token in cookies
  setAuthToken(token)
  // Update store state
  set({ user, token, isAuthenticated: true })
}

logout: () => {
  // Remove token from cookies
  removeAuthToken()
  // Update store state
  set({ user: null, token: null, isAuthenticated: false })
}
```

2. **Auth Context (`contexts/auth-context.tsx`)**:
   - Verifies token on mount and when auth state changes
   - Synchronizes cookie state with store state
   - Handles token validation and session restoration

## Cookie Options

Default options for cookies:

```typescript
const DEFAULT_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
}
```

## Usage

To use cookies in your components:

```typescript
import { setAuthToken, getAuthToken, removeAuthToken } from '@/lib/cookies'

// Set a token
setAuthToken('your-token-value')

// Get the token
const token = getAuthToken()

// Remove the token
removeAuthToken()
```

For general cookie operations:

```typescript
import { setCookie, getCookie, removeCookie } from '@/lib/cookies'

// Set a cookie
setCookie('preference', 'dark-mode')

// Get a cookie
const preference = getCookie('preference')

// Remove a cookie
removeCookie('preference')
```

## Security Considerations

- Cookies use `sameSite: 'strict'` to prevent CSRF attacks
- In production, cookies are set with `secure: true` to ensure HTTPS-only
- Sensitive data should not be stored in cookies directly
