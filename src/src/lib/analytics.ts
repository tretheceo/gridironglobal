import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Custom hook for analytics tracking
export const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);
};

// Track page view
const trackPageView = (url: string) => {
  // This would connect to your analytics service in production
  console.log(`Page view: ${url}`);
  
  // Example implementation with Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  // This would connect to your analytics service in production
  console.log(`Event: ${action}, Category: ${category}, Label: ${label}, Value: ${value}`);
  
  // Example implementation with Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
