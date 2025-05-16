import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load images 200px before they come into view
  });

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className || ''}`}
      style={{ width, height }}
    >
      {(inView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
        />
      )}
    </div>
  );
}

// For responsive images that maintain aspect ratio
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div 
      ref={ref} 
      className={`relative w-full overflow-hidden ${className || ''}`}
      style={{ aspectRatio }}
    >
      {inView && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}

// For avatar images with fallback
export function AvatarImage({
  src,
  alt,
  size = 40,
  fallback,
  className,
}: {
  src?: string;
  alt: string;
  size?: number;
  fallback: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden rounded-full bg-gray-200 ${className || ''}`}
      style={{ width: size, height: size }}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
          {fallback}
        </div>
      )}
    </div>
  );
}
