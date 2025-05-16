import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { Metadata } from 'next';

// SEO metadata generator
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gridirongloba.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'GridironGlobal',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Structured data for SEO
export function generateStructuredData({
  type,
  data,
}: {
  type: 'Organization' | 'Person' | 'JobPosting' | 'SportsTeam' | 'WebSite';
  data: Record<string, any>;
}) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return {
    ...baseStructure,
    ...data,
  };
}

// Google Analytics component
export function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
          `,
        }}
      />
    </>
  );
}

// Hook to handle canonical URLs
export function useCanonical() {
  const pathname = usePathname();
  
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gridirongloba.com';
    const canonicalUrl = `${baseUrl}${pathname}`;
    
    // Create or update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    return () => {
      // Clean up only if we created it
      if (canonicalLink && !document.querySelector('link[rel="canonical"][data-static]')) {
        document.head.removeChild(canonicalLink);
      }
    };
  }, [pathname]);
}

// Generate sitemap entries
export function generateSitemapEntries({
  baseUrl,
  routes,
}: {
  baseUrl: string;
  routes: {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  }[];
}) {
  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || 'weekly',
    priority: route.priority || 0.5,
  }));
}
