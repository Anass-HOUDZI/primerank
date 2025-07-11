
import React, { Suspense, lazy } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface LazyComponentProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: any;
}

const DefaultFallback = () => (
  <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10">
    <div className="flex items-center justify-center space-x-3">
      <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
      <span className="text-white">Chargement...</span>
    </div>
  </Card>
);

export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  importFunc, 
  fallback = <DefaultFallback />,
  props = {}
}) => {
  const Component = lazy(importFunc);
  
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Utility for creating lazy route components
export const createLazyRoute = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return lazy(importFunc);
};

// Preload function for critical routes
export const preloadRoute = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  // Start loading the component but don't wait for it
  importFunc().catch(console.error);
};
