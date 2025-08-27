import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Clock, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  dcl: number; // DOM Content Loaded
  bundleSize: number;
  memoryUsage: number;
  connectionType: string;
}

export const PerformanceMonitor: React.FC<{ showInDev?: boolean }> = ({ 
  showInDev = false 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const measurePerformance = useCallback(() => {
    if (!('performance' in window)) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    
    // First Contentful Paint
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : 0;

    // Time to First Byte
    const ttfb = navigation ? Math.round(navigation.responseStart - navigation.requestStart) : 0;

    // DOM Content Loaded
    const dcl = navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : 0;

    // Taille approximative du bundle (depuis les ressources chargées)
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(resource => resource.name.includes('.js'));
    const bundleSize = jsResources.reduce((total, resource) => {
      return total + ((resource as any).transferSize || 0);
    }, 0);

    // Utilisation mémoire (si disponible)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;

    // Type de connexion (si disponible)
    const connection = (navigator as any).connection;
    const connectionType = connection?.effectiveType || 'unknown';

    setMetrics({
      fcp,
      ttfb,
      dcl,
      bundleSize: Math.round(bundleSize / 1024), // en KB
      memoryUsage: Math.round(memoryUsage / 1048576), // en MB
      connectionType
    });
  }, []);

  useEffect(() => {
    // Ne montrer qu'en développement ou si activé explicitement
    if (import.meta.env.DEV || showInDev) {
      setIsVisible(true);
      measurePerformance();
    }
  }, [showInDev, measurePerformance]);

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'bg-green-500';
    if (value <= thresholds[1]) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="p-4 bg-black/80 backdrop-blur-md border-gray-700 text-white">
        <div className="flex items-center mb-3">
          <Activity className="w-4 h-4 mr-2 text-blue-400" />
          <h3 className="text-sm font-medium">Performance Monitor</h3>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              FCP
            </span>
            <Badge 
              variant="secondary" 
              className={`${getPerformanceColor(metrics.fcp, [1000, 2500])} text-white`}
            >
              {metrics.fcp}ms
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              TTFB
            </span>
            <Badge 
              variant="secondary" 
              className={`${getPerformanceColor(metrics.ttfb, [200, 500])} text-white`}
            >
              {metrics.ttfb}ms
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span>DCL</span>
            <Badge 
              variant="secondary" 
              className={`${getPerformanceColor(metrics.dcl, [1500, 3000])} text-white`}
            >
              {metrics.dcl}ms
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Bundle</span>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {metrics.bundleSize}KB
            </Badge>
          </div>
          
          {metrics.memoryUsage > 0 && (
            <div className="flex justify-between items-center">
              <span>Memory</span>
              <Badge 
                variant="secondary" 
                className={`${getPerformanceColor(metrics.memoryUsage, [50, 100])} text-white`}
              >
                {metrics.memoryUsage}MB
              </Badge>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Wifi className="w-3 h-3 mr-1" />
              Network
            </span>
            <Badge variant="secondary" className="bg-gray-600 text-white">
              {metrics.connectionType}
            </Badge>
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="mt-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          Masquer
        </button>
      </Card>
    </div>
  );
};