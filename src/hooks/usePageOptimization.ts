import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageOptimizationOptions {
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableResourcePreloading?: boolean;
  enableCacheOptimization?: boolean;
}

export const usePageOptimization = (options: PageOptimizationOptions = {}) => {
  const location = useLocation();
  const {
    enableLazyLoading = true,
    enableImageOptimization = true,
    enableResourcePreloading = true,
    enableCacheOptimization = true,
  } = options;

  useEffect(() => {
    // Optimisation des images lazy
    if (enableImageOptimization && 'IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src && !img.src) {
              img.src = img.dataset.src;
              img.classList.add('fade-in');
              imageObserver.unobserve(img);
            }
          }
        });
      }, { rootMargin: '50px', threshold: 0.1 });

      images.forEach(img => imageObserver.observe(img));
    }

    // Préchargement des ressources critiques
    if (enableResourcePreloading) {
      const timeoutId = setTimeout(() => {
        const criticalRoutes = ['/tools', '/about', '/contact'];
        const currentPath = location.pathname;
        
        criticalRoutes
          .filter(route => route !== currentPath)
          .forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
          });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    // Cache optimizations
    if (enableCacheOptimization && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Nettoyer les éléments DOM inutiles
        const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
        unusedElements.forEach(el => el.remove());
      });
    }

    // Performance measurement
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0];
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          domComplete: navigation.loadEventStart - navigation.domContentLoadedEventStart,
          total: navigation.loadEventEnd - navigation.fetchStart
        };
        console.log('Page Performance Metrics:', metrics);
      }
    }
  }, [location.pathname, enableImageOptimization, enableResourcePreloading, enableCacheOptimization]);

  // Fonctions utilitaires pour le cache
  const cacheData = (key: string, data: any, expiration = 300000) => {
    if (!enableCacheOptimization) return;
    
    const item = { data, timestamp: Date.now(), expiration };
    try {
      sessionStorage.setItem(`page_cache_${key}`, JSON.stringify(item));
    } catch (e) {
      console.warn('Cache storage failed:', e);
    }
  };

  const getCachedData = (key: string) => {
    if (!enableCacheOptimization) return null;
    
    try {
      const item = sessionStorage.getItem(`page_cache_${key}`);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > parsed.expiration) {
        sessionStorage.removeItem(`page_cache_${key}`);
        return null;
      }
      return parsed.data;
    } catch (e) {
      return null;
    }
  };

  return {
    cacheData,
    getCachedData
  };
};