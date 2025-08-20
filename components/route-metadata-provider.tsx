'use client';

import { ReactNode } from 'react';
import { useRouteMetadata } from '@/hooks/use-route-metadata';

interface RouteMetadataProviderProps {
  children: ReactNode;
}

/**
 * Provider component that handles route metadata updates
 * This component automatically updates document metadata when routes change
 */
export function RouteMetadataProvider({ children }: RouteMetadataProviderProps) {
  // Use the hook to automatically update metadata on route changes
  useRouteMetadata();

  return <>{children}</>;
}
