
import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
    fontLink.as = 'font';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical images
    const criticalImages = [
      '/placeholder.svg',
      // Add other critical images here
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Optimize images with intersection observer
  const optimizeImages = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }, []);

  // Minimize main thread work
  const optimizeMainThread = useCallback(() => {
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Perform non-critical optimizations here
        console.log('Performing idle optimizations...');
      });
    }
  }, []);

  // Enable service worker for caching
  const enableServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  useEffect(() => {
    preloadCriticalResources();
    optimizeImages();
    optimizeMainThread();
    enableServiceWorker();
  }, [preloadCriticalResources, optimizeImages, optimizeMainThread, enableServiceWorker]);

  return {
    preloadCriticalResources,
    optimizeImages,
    optimizeMainThread
  };
};
