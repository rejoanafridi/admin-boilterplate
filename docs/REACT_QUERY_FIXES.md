# React Query Setup Fixes

## The Problem

We encountered the "No QueryClient set, use QueryClientProvider to set one" error because:

1. React Query requires a QueryClientProvider to be set before any hooks are used
2. In Next.js App Router, components can be rendered on both server and client
3. QueryClient instances need to be properly isolated between requests

## The Solution

We implemented a multi-layered approach:

### 1. Root-level QueryClient in AppProviders

```tsx
// providers/QueryProviders.tsx
export default function QueryProviders({ children }) {
  // Create a new QueryClient for each component instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { ... }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 2. Auth-specific QueryClient for Auth Routes

```tsx
// app/auth/providers.tsx
export default function AuthProviders({ children }) {
  // Create a new QueryClient specifically for auth routes
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

### 3. Auth Layout Using Auth-specific Providers

```tsx
// app/auth/layout.tsx
export default function AuthLayout({ children }) {
  return <AuthProviders>{children}</AuthProviders>
}
```

## Key Implementation Details

1. **useState for QueryClient Creation**

   - Using `useState(() => new QueryClient())` ensures the QueryClient is created only once per component instance
   - This prevents multiple instances during re-renders

2. **Route-specific Providers**

   - Auth routes have their own dedicated QueryClient
   - This isolates auth-related queries from the rest of the app

3. **Proper Provider Nesting**
   - QueryProviders is always the outermost provider
   - Other providers (Theme, Auth, etc.) are nested inside

## Best Practices

1. Always use the `useState` pattern when creating a QueryClient
2. Don't create QueryClient instances outside of components
3. For complex apps, consider route-specific QueryClient instances
4. Keep the provider hierarchy consistent
