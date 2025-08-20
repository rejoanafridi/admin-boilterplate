'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getRouteMetadata } from '@/lib/metadata';

/**
 * Hook to update document metadata based on current route
 * This is useful for client-side navigation and dynamic updates
 */
export function useRouteMetadata() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const metadata = getRouteMetadata(pathname);
      
      // Update document title
      document.title = metadata.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', metadata.description);
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', metadata.keywords?.join(', ') || '');
      
      // Update Open Graph tags
      const updateOpenGraphTag = (property: string, content: string) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      };
      
      if (metadata.openGraph?.title) {
        updateOpenGraphTag('og:title', metadata.openGraph.title);
      }
      if (metadata.openGraph?.description) {
        updateOpenGraphTag('og:description', metadata.openGraph.description);
      }
      if (metadata.openGraph?.type) {
        updateOpenGraphTag('og:type', metadata.openGraph.type);
      }
      if (metadata.openGraph?.image) {
        updateOpenGraphTag('og:image', metadata.openGraph.image);
      }
    }
  }, [pathname]);

  return {
    currentPath: pathname,
    metadata: getRouteMetadata(pathname),
  };
}
