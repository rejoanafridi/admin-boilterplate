# Dynamic Metadata System

This project includes a comprehensive dynamic metadata system that automatically generates SEO-friendly metadata based on routes and allows for easy customization.

## Features

- **Route-based metadata**: Automatically generates metadata based on the current route
- **Server-side rendering**: Metadata is generated at build time for optimal SEO
- **Client-side updates**: Metadata updates dynamically during navigation
- **Easy customization**: Simple configuration file for route metadata
- **Type safety**: Full TypeScript support for metadata configuration

## How It Works

### 1. Metadata Configuration (`lib/metadata.ts`)

The `routeMetadataMap` contains metadata for each route:

```typescript
export const routeMetadataMap: Record<string, RouteMetadata> = {
  '/auth/login': {
    title: 'Sign In - Admin Dashboard',
    description: 'Sign in to your admin dashboard account...',
    keywords: ['login', 'sign in', 'admin', 'dashboard'],
    openGraph: {
      title: 'Sign In - Admin Dashboard',
      description: 'Access your admin dashboard...',
      type: 'website',
    },
  },
  // ... more routes
};
```

### 2. Utility Functions (`lib/generate-page-metadata.ts`)

Helper functions for generating metadata:

```typescript
// Generate auth page metadata
export const metadata: Metadata = generateAuthPageMetadata('login');

// Generate dashboard page metadata
export const metadata: Metadata = generateDashboardPageMetadata('settings');

// Generate custom page metadata
export const metadata: Metadata = generatePageMetadata('/custom-route', {
  title: 'Custom Title',
  description: 'Custom description',
});
```

### 3. Automatic Updates

The `RouteMetadataProvider` automatically updates metadata on route changes using the `useRouteMetadata` hook.

## Usage Examples

### Adding New Routes

1. **Add to metadata map** (`lib/metadata.ts`):

```typescript
'/dashboard/analytics': {
  title: 'Analytics - Admin Dashboard',
  description: 'View detailed analytics and reports.',
  keywords: ['analytics', 'reports', 'metrics', 'admin'],
  openGraph: {
    title: 'Analytics - Admin Dashboard',
    description: 'Comprehensive analytics dashboard.',
    type: 'website',
  },
},
```

2. **Create layout file** (`app/dashboard/analytics/layout.tsx`):

```typescript
import type { Metadata } from 'next';
import { generateDashboardPageMetadata } from '@/lib/generate-page-metadata';

export const metadata: Metadata = generateDashboardPageMetadata('analytics');

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

### Customizing Metadata

You can override default metadata in any layout or page:

```typescript
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/generate-page-metadata';

export const metadata: Metadata = generatePageMetadata('/dashboard/users', {
  title: 'User Management System',
  description: 'Advanced user management with role-based access control',
  openGraph: {
    image: '/images/user-management.png',
  },
});
```

### Dynamic Metadata

For truly dynamic metadata, you can use the `generateMetadata` function in page components:

```typescript
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/generate-page-metadata';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Fetch data based on params
  const user = await fetchUser(params.id);
  
  return generatePageMetadata(`/users/${params.id}`, {
    title: `User: ${user.name}`,
    description: `Profile and details for ${user.name}`,
  });
}
```

## Metadata Properties

### Basic Properties
- `title`: Page title
- `description`: Page description
- `keywords`: SEO keywords (comma-separated string or array)

### Open Graph Properties
- `openGraph.title`: Social media title
- `openGraph.description`: Social media description
- `openGraph.type`: Content type (website, article, etc.)
- `openGraph.image`: Social media image URL

### SEO Properties
- `robots`: Search engine indexing instructions
- `canonical`: Canonical URL
- `alternates`: Alternative language versions

## Best Practices

1. **Keep titles under 60 characters** for optimal display in search results
2. **Descriptions should be 150-160 characters** for search result snippets
3. **Use relevant keywords** naturally in titles and descriptions
4. **Set appropriate robots directives** (don't index private pages)
5. **Provide Open Graph images** for better social media sharing
6. **Use consistent naming conventions** across similar pages

## Troubleshooting

### Metadata Not Updating
- Ensure `RouteMetadataProvider` wraps your app in `layout.tsx`
- Check that route paths in `routeMetadataMap` match your actual routes
- Verify that layout files are properly exported

### Build Errors
- Check TypeScript types for metadata objects
- Ensure all required properties are provided
- Verify import paths are correct

### SEO Issues
- Use browser dev tools to inspect `<head>` section
- Check Google Search Console for indexing issues
- Verify Open Graph tags with Facebook Sharing Debugger

## Advanced Configuration

### Custom Metadata Generators

You can create custom metadata generators for specific use cases:

```typescript
export function generateBlogPostMetadata(slug: string, post: BlogPost): Metadata {
  return generatePageMetadata(`/blog/${slug}`, {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      image: post.featuredImage,
      type: 'article',
      publishedTime: post.publishedAt,
      author: post.author,
    },
  });
}
```

### Environment-based Metadata

Configure metadata based on environment:

```typescript
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  // ... other metadata
};
```
