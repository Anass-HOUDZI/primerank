
import { useState, useEffect, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

interface CacheOptions {
  expiresIn?: number; // in milliseconds
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

export const useSmartCache = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) => {
  const { expiresIn = 5 * 60 * 1000, storage = 'memory' } = options; // 5 minutes default
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In-memory cache
  const memoryCache = new Map<string, CacheEntry<any>>();

  const getFromStorage = useCallback((cacheKey: string): CacheEntry<T> | null => {
    try {
      switch (storage) {
        case 'localStorage':
          const localData = localStorage.getItem(cacheKey);
          return localData ? JSON.parse(localData) : null;
        case 'sessionStorage':
          const sessionData = sessionStorage.getItem(cacheKey);
          return sessionData ? JSON.parse(sessionData) : null;
        case 'memory':
        default:
          return memoryCache.get(cacheKey) || null;
      }
    } catch {
      return null;
    }
  }, [storage]);

  const setToStorage = useCallback((cacheKey: string, entry: CacheEntry<T>) => {
    try {
      switch (storage) {
        case 'localStorage':
          localStorage.setItem(cacheKey, JSON.stringify(entry));
          break;
        case 'sessionStorage':
          sessionStorage.setItem(cacheKey, JSON.stringify(entry));
          break;
        case 'memory':
        default:
          memoryCache.set(cacheKey, entry);
          break;
      }
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }, [storage]);

  const isExpired = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp > entry.expiresIn;
  }, []);

  const fetchData = useCallback(async (force = false) => {
    const cacheKey = `cache_${key}`;
    
    // Check cache first
    if (!force) {
      const cachedEntry = getFromStorage(cacheKey);
      if (cachedEntry && !isExpired(cachedEntry)) {
        setData(cachedEntry.data);
        return cachedEntry.data;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      
      // Cache the result
      const entry: CacheEntry<T> = {
        data: result,
        timestamp: Date.now(),
        expiresIn
      };
      
      setToStorage(cacheKey, entry);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, expiresIn, getFromStorage, setToStorage, isExpired]);

  const invalidateCache = useCallback(() => {
    const cacheKey = `cache_${key}`;
    switch (storage) {
      case 'localStorage':
        localStorage.removeItem(cacheKey);
        break;
      case 'sessionStorage':
        sessionStorage.removeItem(cacheKey);
        break;
      case 'memory':
      default:
        memoryCache.delete(cacheKey);
        break;
    }
  }, [key, storage]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidateCache
  };
};
