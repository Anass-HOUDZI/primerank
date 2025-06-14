
import React, { Suspense, lazy } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface LazyToolLoaderProps {
  toolName: string;
  fallback?: React.ReactNode;
}

// Lazy loading des outils avec code splitting
const toolComponents = {
  'rank-checker': lazy(() => import('../pages/tools/RankChecker')),
  'keyword-generator': lazy(() => import('../pages/tools/KeywordGenerator')),
  'bulk-status-checker': lazy(() => import('../pages/tools/BulkStatusChecker')),
  'backlink-profiler': lazy(() => import('../pages/tools/BacklinkProfiler')),
  'pagespeed-analyzer': lazy(() => import('../pages/tools/PageSpeedAnalyzer')),
  'critical-css-generator': lazy(() => import('../pages/tools/CriticalCSSGenerator')),
  'image-compressor': lazy(() => import('../pages/tools/ImageCompressor')),
  'csv-converter': lazy(() => import('../pages/tools/CSVConverter')),
  'schema-validator': lazy(() => import('../pages/tools/SchemaValidator')),
  'gsc-integration': lazy(() => import('../pages/tools/GSCIntegration')),
  'ga-integration': lazy(() => import('../pages/tools/GAIntegration')),
  'semantic-cocoon-v1': lazy(() => import('../pages/tools/SemanticCocoonV1')),
  'semantic-cocoon-v2': lazy(() => import('../pages/tools/SemanticCocoonV2')),
};

const LoadingFallback = () => (
  <Card className="p-8">
    <div className="flex items-center justify-center space-x-3">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <span className="text-gray-600">Chargement de l'outil...</span>
    </div>
  </Card>
);

export const LazyToolLoader: React.FC<LazyToolLoaderProps> = ({ 
  toolName, 
  fallback = <LoadingFallback /> 
}) => {
  const ToolComponent = toolComponents[toolName as keyof typeof toolComponents];
  
  if (!ToolComponent) {
    return (
      <Card className="p-8 text-center">
        <p className="text-red-600">Outil non trouvé: {toolName}</p>
      </Card>
    );
  }

  return (
    <Suspense fallback={fallback}>
      <ToolComponent />
    </Suspense>
  );
};
