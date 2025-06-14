
import React from 'react';
import { AlertCircle, RefreshCw, Search, Clock, Share2, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExportData } from '@/types/Export';
import { FeedbackWidget } from '@/components/feedback/FeedbackWidget';
import { useAnalytics } from '@/lib/analytics';

interface ResultsDisplayProps {
  title: string;
  data: any;
  loading: boolean;
  error?: string;
  onExport?: (format: 'pdf' | 'csv' | 'json') => void;
  children?: React.ReactNode;
  exportData?: ExportData;
  url?: string;
  keywords?: string[];
  recommendations?: string[];
  toolName?: string;
}

export const ResultsDisplay = React.memo(({ 
  title, 
  data, 
  loading, 
  error, 
  onExport,
  children,
  exportData,
  url,
  keywords,
  recommendations,
  toolName
}: ResultsDisplayProps) => {
  const { track } = useAnalytics();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Résultats ${title}`,
        text: `Découvrez les résultats de l'analyse ${title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    
    track({
      name: 'results_shared',
      category: 'tool_usage',
      properties: { toolName, shareMethod: navigator.share ? 'native' : 'clipboard' }
    });
  };

  const handleSave = () => {
    const savedResults = JSON.parse(localStorage.getItem('savedResults') || '[]');
    const newResult = {
      id: Date.now(),
      toolName,
      title,
      data,
      url,
      timestamp: new Date().toISOString()
    };
    
    savedResults.push(newResult);
    localStorage.setItem('savedResults', JSON.stringify(savedResults.slice(-50))); // Garder les 50 derniers
    
    track({
      name: 'results_saved',
      category: 'tool_usage',
      properties: { toolName }
    });
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Analyse en cours...
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Nous analysons vos données, veuillez patienter quelques instants
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">
            Erreur d'analyse
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            {error}
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-8 border-dashed border-2 border-gray-300 dark:border-gray-700">
        <div className="text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Prêt pour l'analyse
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Saisissez vos données ci-dessus pour commencer l'analyse SEO
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header des résultats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analysé le {new Date().toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Contenu des résultats */}
      {children}
      
      {/* Actions bottom */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          Analyse effectuée en temps réel
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Bookmark className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Feedback Widget intégré */}
      <FeedbackWidget toolName={toolName} position="inline" />
    </div>
  );
});

ResultsDisplay.displayName = 'ResultsDisplay';
