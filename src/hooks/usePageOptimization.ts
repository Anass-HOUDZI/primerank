import { useEffect, useCallback } from 'react';
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

  // Optimisation des images lazy
  const optimizeImages = useCallback(() => {
    if (!enableImageOptimization) return;

    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Optimisation du chargement d'image
            if (img.dataset.src && !img.src) {
              img.src = img.dataset.src;
              img.classList.add('fade-in');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      images.forEach(img => {
        imageObserver.observe(img);
      });

      return () => {
        images.forEach(img => {
          imageObserver.unobserve(img);
        });
      };
    }
  }, [enableImageOptimization]);

  // Préchargement des ressources critiques
  const preloadCriticalResources = useCallback(() => {
    if (!enableResourcePreloading) return;

    // Précharger les routes principales
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

    // Précharger les assets critiques
    const criticalAssets = [
      '/placeholder.svg',
      // Ajouter d'autres assets selon les besoins
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = asset;
      document.head.appendChild(link);
    });
  }, [location.pathname, enableResourcePreloading]);

  // Optimisation du cache
  const optimizeCache = useCallback(() => {
    if (!enableCacheOptimization) return;

    // Cache intelligent des données de session
    const cacheData = (key: string, data: any, expiration = 300000) => { // 5 min par défaut
      const item = {
        data,
        timestamp: Date.now(),
        expiration
      };
      
      try {
        sessionStorage.setItem(`page_cache_${key}`, JSON.stringify(item));
      } catch (e) {
        // Gestion silencieuse de l'erreur de stockage
        console.warn('Cache storage failed:', e);
      }
    };

    const getCachedData = (key: string) => {
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

    return { cacheData, getCachedData };
  }, [enableCacheOptimization]);

  // Optimisation des performances de rendu
  const optimizeRendering = useCallback(() => {
    // Utiliser requestIdleCallback pour les tâches non critiques
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Nettoyer les éléments DOM inutiles
        const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
        unusedElements.forEach(el => el.remove());

        // Optimiser les styles inline
        const inlineStyles = document.querySelectorAll('[style]');
        inlineStyles.forEach(el => {
          if (el.getAttribute('style')?.includes('display: none')) {
            el.remove();
          }
        });
      });
    }

    // Optimisation des événements de scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Actions de scroll optimisées
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mesurer les performances de la page
  const measurePagePerformance = useCallback(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      // Mesures de navigation
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0];
        
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          request: navigation.responseStart - navigation.requestStart,
          response: navigation.responseEnd - navigation.responseStart,
          domLoading: navigation.domContentLoadedEventStart - navigation.responseEnd,
          domComplete: navigation.loadEventStart - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          total: navigation.loadEventEnd - navigation.fetchStart
        };

        // Log des métriques (peut être envoyé à un service d'analytics)
        console.log('Page Performance Metrics:', metrics);
        
        return metrics;
      }
    }
  }, []);

  useEffect(() => {
    const cleanupFunctions: Array<(() => void) | void> = [];

    // Appliquer les optimisations
    cleanupFunctions.push(optimizeImages());
    cleanupFunctions.push(optimizeRendering());
    
    // Délai pour les optimisations non critiques
    const timeoutId = setTimeout(() => {
      preloadCriticalResources();
      optimizeCache();
      measurePagePerformance();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanupFunctions.forEach(cleanup => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, [location.pathname, optimizeImages, preloadCriticalResources, optimizeCache, optimizeRendering, measurePagePerformance]);

  return {
    optimizeImages,
    preloadCriticalResources,
    optimizeCache: optimizeCache(),
    measurePagePerformance
  };
};