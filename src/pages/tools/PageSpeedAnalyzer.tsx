
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { MetricsGrid } from '@/components/tools/MetricsGrid';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  ChartColumn, 
  Clock, 
  Smartphone, 
  Monitor,
  Gauge,
  Image,
  FileCode,
  Wifi
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PageSpeedData {
  url: string;
  mobileScore: number;
  desktopScore: number;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  recommendations: string[];
  metrics: {
    performanceScore: number;
    accessibilityScore: number;
    bestPracticesScore: number;
    seoScore: number;
  };
}

const PageSpeedAnalyzer = () => {
  const [data, setData] = useState<PageSpeedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleAnalyze = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulation d'une analyse PageSpeed (en production, ceci ferait appel à l'API PageSpeed Insights)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockData: PageSpeedData = {
        url: inputData.value,
        mobileScore: Math.floor(Math.random() * 40) + 50,
        desktopScore: Math.floor(Math.random() * 30) + 70,
        loadTime: Math.random() * 3 + 1,
        firstContentfulPaint: Math.random() * 2 + 0.5,
        largestContentfulPaint: Math.random() * 3 + 1,
        cumulativeLayoutShift: Math.random() * 0.3,
        recommendations: [
          'Optimiser les images pour réduire leur taille',
          'Minifier les fichiers CSS et JavaScript',
          'Utiliser un CDN pour servir les ressources statiques',
          'Implémenter la mise en cache du navigateur',
          'Éliminer les ressources bloquant le rendu'
        ],
        metrics: {
          performanceScore: Math.floor(Math.random() * 40) + 50,
          accessibilityScore: Math.floor(Math.random() * 20) + 80,
          bestPracticesScore: Math.floor(Math.random() * 30) + 70,
          seoScore: Math.floor(Math.random() * 20) + 80
        }
      };
      
      setData(mockData);
      toast({
        title: "Analyse terminée",
        description: "L'analyse de vitesse a été effectuée avec succès"
      });
      
    } catch (err) {
      setError('Erreur lors de l\'analyse. Veuillez vérifier l\'URL et réessayer.');
      toast({
        title: "Erreur",
        description: "Impossible d'analyser cette URL",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    
    const exportData = {
      url: data.url,
      scores: {
        mobile: data.mobileScore,
        desktop: data.desktopScore,
        performance: data.metrics.performanceScore,
        accessibility: data.metrics.accessibilityScore,
        bestPractices: data.metrics.bestPracticesScore,
        seo: data.metrics.seoScore
      },
      vitals: {
        loadTime: data.loadTime,
        fcp: data.firstContentfulPaint,
        lcp: data.largestContentfulPaint,
        cls: data.cumulativeLayoutShift
      },
      recommendations: data.recommendations
    };

    // Simulation de l'export
    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : format === 'csv'
      ? Object.entries(exportData.scores).map(([key, value]) => `${key},${value}`).join('\n')
      : 'Export PDF en cours...';
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pagespeed-${data.url.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Rapport téléchargé au format ${format.toUpperCase()}`
    });
  };

  const getMobileColor = (score: number) => {
    return score >= 90 ? 'green' : score >= 50 ? 'orange' : 'red';
  };

  const getDesktopColor = (score: number) => {
    return score >= 90 ? 'green' : score >= 50 ? 'orange' : 'red';
  };

  const getLoadTimeColor = (time: number) => {
    return time <= 1.5 ? 'green' : time <= 3 ? 'orange' : 'red';
  };

  const metrics = data ? [
    {
      id: 'mobile',
      title: 'Score Mobile',
      value: data.mobileScore,
      maxValue: 100,
      icon: <Smartphone />,
      color: getMobileColor(data.mobileScore) as const
    },
    {
      id: 'desktop', 
      title: 'Score Desktop',
      value: data.desktopScore,
      maxValue: 100,
      icon: <Monitor />,
      color: getDesktopColor(data.desktopScore) as const
    },
    {
      id: 'loadTime',
      title: 'Temps de chargement',
      value: Math.round(data.loadTime * 100) / 100,
      maxValue: 3,
      description: 'secondes',
      icon: <Clock />,
      color: getLoadTimeColor(data.loadTime) as const
    }
  ] : [];

  const chartData = data ? [
    { name: 'Performance', score: data.metrics.performanceScore },
    { name: 'Accessibilité', score: data.metrics.accessibilityScore },
    { name: 'Bonnes pratiques', score: data.metrics.bestPracticesScore },
    { name: 'SEO', score: data.metrics.seoScore }
  ] : [];

  return (
    <ToolLayout
      title="Analyseur de Vitesse PageSpeed"
      description="Analysez la vitesse de chargement de votre site et obtenez des recommandations détaillées pour améliorer les performances web."
      icon={<Gauge />}
      category="technical"
      relatedTools={[
        {
          title: "Bulk Status Checker",
          description: "Vérifiez le statut de plusieurs URLs",
          href: "/tools/bulk-status-checker",
          icon: <ChartColumn />
        },
        {
          title: "Optimiseur d'Images",
          description: "Compressez et optimisez vos images",
          href: "/tools/image-optimizer",
          icon: <Image />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Analyser la vitesse d'une page"
          description="Entrez l'URL complète de la page que vous souhaitez analyser"
          inputType="url"
          placeholder="https://example.com"
          onSubmit={handleAnalyze}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Résultats de l'analyse PageSpeed"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              {/* Métriques principales */}
              <MetricsGrid metrics={metrics} columns={3} />
              
              {/* Graphique des scores */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Scores détaillés</h3>
                <ChartContainer config={{}} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Core Web Vitals */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Wifi className="w-5 h-5 mr-2" />
                  Core Web Vitals
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{data.firstContentfulPaint.toFixed(1)}s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">First Contentful Paint</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{data.largestContentfulPaint.toFixed(1)}s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Largest Contentful Paint</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{data.cumulativeLayoutShift.toFixed(3)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Cumulative Layout Shift</div>
                  </div>
                </div>
              </Card>

              {/* Recommandations */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileCode className="w-5 h-5 mr-2" />
                  Recommandations d'optimisation
                </h3>
                <div className="space-y-3">
                  {data.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default PageSpeedAnalyzer;
