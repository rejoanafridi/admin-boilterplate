# React Query Setup

This document explains how React Query is set up in this project.

## Architecture

React Query is set up using a hybrid approach that ensures:

1. Server-side rendering (SSR) works correctly
2. Each server request gets a fresh query cache
3. Client-side navigation reuses the cache
4. Hydration errors are prevented

## Implementation

The setup is in `providers/QueryProviders.tsx` and follows these principles:

```tsx
// Create factory function for QueryClient
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { ... }
  })
}

// Global singleton for browser
let browserQueryClient: QueryClient | undefined = undefined

// Function to get the appropriate QueryClient
function getQueryClient() {
  // For SSR, always create a new QueryClient
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }

  // For browser, use a singleton pattern
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

// Component uses useState to ensure stable reference during renders
export default function QueryProviders({ children }) {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## Key Points

1. **Server vs. Client Behavior**:

   - On the server: Creates a new QueryClient for each request
   - In the browser: Uses a singleton pattern

2. **useState Pattern**:

   - Using `useState(() => getQueryClient())` ensures the QueryClient is:
     - Created only once per component instance
     - Preserved across re-renders
     - Not shared between different users/requests

3. **Retry Configuration**:
   - Customized retry logic based on HTTP status codes
   - No retries for 4xx errors
   - Limited retries for server errors

## Usage in Components

To use React Query in your components:

```tsx
import { useQuery, useMutation } from '@tanstack/react-query'

// In your component:
const { data, isLoading } = useQuery({
  queryKey: ['your-key'],
  queryFn: () => fetchYourData(),
})
```

All components using React Query must be children of `AppProviders` which includes `QueryProviders`.

## Best Practices

1. Always use array notation for query keys: `['users']` instead of just `'users'`
2. Include dependencies in query keys: `['user', userId]`
3. Use proper invalidation when data changes: `queryClient.invalidateQueries({ queryKey: ['users'] })`
4. Prefer React Query for server state, use Zustand for UI state
