'use client'

import Cookies from 'js-cookie'

import { token as AUTH_TOKEN_KEY } from './Constants'

/**
 * Cookie utility functions for authentication
 * Provides type-safe methods to get, set, and remove cookies
 */

// Default cookie options
const DEFAULT_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
}

/**
 * Set authentication token in cookies
 * @param value - The token value to store
 * @param options - Cookie options (optional)
 */
export function setAuthToken(value: string, options = {}): void {
  Cookies.set(AUTH_TOKEN_KEY, value, { ...DEFAULT_OPTIONS, ...options })
}

/**
 * Get authentication token from cookies
 * @returns The token value or undefined if not found
 */
export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY)
}

/**
 * Remove authentication token from cookies
 */
export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY, { path: '/' })
}

/**
 * Check if user is authenticated based on cookie presence
 * @returns True if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/**
 * Set any cookie with options
 * @param key - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(key: string, value: string, options = {}): void {
  Cookies.set(key, value, { ...DEFAULT_OPTIONS, ...options })
}

/**
 * Get any cookie by key
 * @param key - Cookie name
 * @returns Cookie value or undefined
 */
export function getCookie(key: string): string | undefined {
  return Cookies.get(key)
}

/**
 * Remove any cookie by key
 * @param key - Cookie name
 * @param options - Cookie options
 */
export function removeCookie(key: string, options = {}): void {
  Cookies.remove(key, { path: '/', ...options })
}

/**
 * Clear all cookies (useful for logout)
 */
export function clearAllCookies(): void {
  // Get all cookies
  const cookies = document.cookie.split(';')

  // Remove each cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`
  }
}
