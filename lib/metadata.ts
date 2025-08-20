export interface RouteMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    image?: string;
  };
}

export const routeMetadataMap: Record<string, RouteMetadata> = {
  // Auth routes
  '/auth/login': {
    title: 'Sign In - Admin Dashboard',
    description: 'Sign in to your admin dashboard account to access the management system.',
    keywords: ['login', 'sign in', 'admin', 'dashboard', 'authentication'],
    openGraph: {
      title: 'Sign In - Admin Dashboard',
      description: 'Access your admin dashboard with secure authentication.',
      type: 'website',
    },
  },
  '/auth/register': {
    title: 'Create Account - Admin Dashboard',
    description: 'Create a new admin dashboard account to get started with the management system.',
    keywords: ['register', 'sign up', 'create account', 'admin', 'dashboard'],
    openGraph: {
      title: 'Create Account - Admin Dashboard',
      description: 'Join the admin dashboard with a new account.',
      type: 'website',
    },
  },
  
  // Dashboard routes
  '/dashboard': {
    title: 'Dashboard - Admin Panel',
    description: 'Main dashboard for managing your admin panel and viewing key metrics.',
    keywords: ['dashboard', 'admin', 'panel', 'overview', 'metrics'],
    openGraph: {
      title: 'Dashboard - Admin Panel',
      description: 'Comprehensive overview of your admin panel.',
      type: 'website',
    },
  },
  '/dashboard/settings': {
    title: 'Settings - Admin Dashboard',
    description: 'Configure your admin dashboard settings and preferences.',
    keywords: ['settings', 'configuration', 'admin', 'dashboard', 'preferences'],
    openGraph: {
      title: 'Settings - Admin Dashboard',
      description: 'Customize your admin dashboard experience.',
      type: 'website',
    },
  },
  '/dashboard/users': {
    title: 'User Management - Admin Dashboard',
    description: 'Manage users, roles, and permissions in your admin dashboard.',
    keywords: ['users', 'user management', 'roles', 'permissions', 'admin'],
    openGraph: {
      title: 'User Management - Admin Dashboard',
      description: 'Comprehensive user management system.',
      type: 'website',
    },
  },
  
  // Default metadata
  default: {
    title: 'Admin Dashboard',
    description: 'Professional admin dashboard and management system',
    keywords: ['admin', 'dashboard', 'management', 'system'],
    openGraph: {
      title: 'Admin Dashboard',
      description: 'Professional admin dashboard and management system',
      type: 'website',
    },
  },
};

/**
 * Get metadata for a specific route
 * @param pathname - The current route pathname
 * @returns RouteMetadata object for the route
 */
export function getRouteMetadata(pathname: string): RouteMetadata {
  // Remove trailing slash for consistent matching
  const cleanPath = pathname.replace(/\/$/, '');
  
  // Try to find exact match first
  if (routeMetadataMap[cleanPath]) {
    return routeMetadataMap[cleanPath];
  }
  
  // Try to find partial matches for nested routes
  const matchingRoute = Object.keys(routeMetadataMap).find(route => {
    if (route === 'default') return false;
    return cleanPath.startsWith(route);
  });
  
  if (matchingRoute) {
    return routeMetadataMap[matchingRoute];
  }
  
  // Return default metadata if no match found
  return routeMetadataMap.default;
}

/**
 * Generate dynamic metadata object for Next.js
 * @param pathname - The current route pathname
 * @returns Metadata object compatible with Next.js
 */
export function generateMetadata(pathname: string) {
  const metadata = getRouteMetadata(pathname);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords?.join(', '),
    openGraph: metadata.openGraph,
    robots: {
      index: true,
      follow: true,
    },
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#000000',
  };
}
