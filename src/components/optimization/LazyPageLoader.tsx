import React, { Suspense, lazy, ComponentType } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

interface LazyPageLoaderProps {
  importPath: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  retryDelay?: number;
}

const DefaultLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <p className="text-white font-medium">Chargement de la page...</p>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const DefaultErrorFallback = ({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            Une erreur est survenue lors du chargement de cette page.
          </p>
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </Card>
    </div>
  </div>
);

export const LazyPageLoader: React.FC<LazyPageLoaderProps> = ({
  importPath,
  fallback = <DefaultLoader />,
  errorFallback: ErrorFallback = DefaultErrorFallback,
  retryDelay = 1000
}) => {
  // Créer le composant lazy avec retry automatique
  const LazyComponent = lazy(() => 
    importPath().catch(error => {
      console.error('Lazy loading failed:', error);
      
      // Retry après délai
      return new Promise<{ default: ComponentType<any> }>((resolve, reject) => {
        setTimeout(() => {
          importPath().then(resolve).catch(reject);
        }, retryDelay);
      });
    })
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={fallback}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

// Factory function pour créer des pages lazy
export const createLazyPage = (
  importPath: () => Promise<{ default: ComponentType<any> }>,
  options?: Omit<LazyPageLoaderProps, 'importPath'>
) => {
  return () => (
    <LazyPageLoader 
      importPath={importPath} 
      {...options}
    />
  );
};

// Preload function pour les pages critiques
export const preloadPage = (importPath: () => Promise<{ default: ComponentType<any> }>) => {
  // Commencer le chargement mais ne pas attendre
  importPath().catch(console.error);
};

// Hook pour preloader les pages selon la route actuelle
export const usePagePreloading = (currentPath: string) => {
  React.useEffect(() => {
    const preloadMap: Record<string, () => void> = {
      '/': () => {
        // Précharger les outils populaires depuis la home
        preloadPage(() => import('../../pages/tools/RankChecker'));
        preloadPage(() => import('../../pages/tools/KeywordGenerator'));
      },
      '/tools/rank-checker': () => {
        // Précharger les outils connexes
        preloadPage(() => import('../../pages/tools/KeywordGenerator'));
        preloadPage(() => import('../../pages/tools/SERPComparator'));
      },
      '/tools/keyword-generator': () => {
        preloadPage(() => import('../../pages/tools/CompetitorKeywords'));
        preloadPage(() => import('../../pages/tools/RankChecker'));
      }
    };

    const preloadAction = preloadMap[currentPath];
    if (preloadAction) {
      // Délai pour ne pas impacter le chargement principal
      const timeoutId = setTimeout(preloadAction, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentPath]);
};