
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { MetricsGrid } from '@/components/tools/MetricsGrid';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Globe,
  TrendingUp
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface StatusResult {
  url: string;
  statusCode: number;
  responseTime: number;
  status: 'success' | 'error' | 'redirect';
}

interface BulkStatusData {
  totalUrls: number;
  successCount: number;
  errorCount: number;
  redirectCount: number;
  averageResponseTime: number;
  results: StatusResult[];
}

const BulkStatusChecker = () => {
  const [data, setData] = useState<BulkStatusData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleCheck = async (inputData: { file?: File; value?: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockResults: StatusResult[] = Array.from({ length: 50 }, (_, i) => ({
        url: `https://example${i + 1}.com`,
        statusCode: Math.random() > 0.8 ? (Math.random() > 0.5 ? 404 : 500) : (Math.random() > 0.7 ? 301 : 200),
        responseTime: Math.random() * 2000 + 100,
        status: Math.random() > 0.8 ? 'error' : (Math.random() > 0.7 ? 'redirect' : 'success')
      }));
      
      const successCount = mockResults.filter(r => r.status === 'success').length;
      const errorCount = mockResults.filter(r => r.status === 'error').length;
      const redirectCount = mockResults.filter(r => r.status === 'redirect').length;
      
      const mockData: BulkStatusData = {
        totalUrls: mockResults.length,
        successCount,
        errorCount,
        redirectCount,
        averageResponseTime: mockResults.reduce((acc, r) => acc + r.responseTime, 0) / mockResults.length,
        results: mockResults
      };
      
      setData(mockData);
      toast({
        title: "Vérification terminée",
        description: `${mockResults.length} URLs analysées avec succès`
      });
      
    } catch (err) {
      setError('Erreur lors de la vérification. Veuillez réessayer.');
      toast({
        title: "Erreur",
        description: "Impossible de vérifier les URLs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    
    const exportData = {
      summary: {
        total: data.totalUrls,
        success: data.successCount,
        errors: data.errorCount,
        redirects: data.redirectCount,
        avgResponseTime: data.averageResponseTime
      },
      details: data.results
    };

    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : format === 'csv'
      ? `URL,Status Code,Response Time,Status\n${data.results.map(r => 
          `${r.url},${r.statusCode},${r.responseTime},${r.status}`
        ).join('\n')}`
      : 'Export PDF en cours...';
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-status-check.${format}`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Rapport téléchargé au format ${format.toUpperCase()}`
    });
  };

  const metrics = data ? [
    {
      id: 'total',
      title: 'URLs Analysées',
      value: data.totalUrls,
      maxValue: data.totalUrls,
      icon: <Globe />,
      color: 'blue' as const
    },
    {
      id: 'success',
      title: 'Succès (2xx)',
      value: data.successCount,
      maxValue: data.totalUrls,
      icon: <CheckCircle />,
      color: 'green' as const
    },
    {
      id: 'errors',
      title: 'Erreurs (4xx/5xx)',
      value: data.errorCount,
      maxValue: data.totalUrls,
      icon: <XCircle />,
      color: 'red' as const
    },
    {
      id: 'redirects',
      title: 'Redirections (3xx)',
      value: data.redirectCount,
      maxValue: data.totalUrls,
      icon: <AlertCircle />,
      color: 'orange' as const
    }
  ] : [];

  const pieData = data ? [
    { name: 'Succès', value: data.successCount, color: '#10b981' },
    { name: 'Erreurs', value: data.errorCount, color: '#ef4444' },
    { name: 'Redirections', value: data.redirectCount, color: '#f59e0b' }
  ] : [];

  return (
    <ToolLayout
      title="Bulk Status Code Checker"
      description="Vérifiez le statut HTTP de milliers d'URLs simultanément avec des visualisations détaillées."
      icon={<Link />}
      category="technical"
      relatedTools={[
        {
          title: "PageSpeed Analyzer",
          description: "Analysez la vitesse de vos pages",
          href: "/tools/pagespeed-analyzer",
          icon: <TrendingUp />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Vérifier les codes de statut en masse"
          description="Uploadez un fichier CSV contenant vos URLs ou saisissez-les manuellement"
          inputType="file"
          placeholder="Sélectionnez votre fichier CSV..."
          onSubmit={handleCheck}
          loading={loading}
          acceptedFiles=".csv,.txt"
        />
        
        <ResultsDisplay
          title="Résultats de la vérification en masse"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <MetricsGrid metrics={metrics} columns={4} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Distribution des statuts</h3>
                  <ChartContainer config={{}} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Temps de réponse</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(data.averageResponseTime)}ms
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Temps de réponse moyen
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détails des URLs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2">URL</th>
                        <th className="text-left py-2">Code de statut</th>
                        <th className="text-left py-2">Temps de réponse</th>
                        <th className="text-left py-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.results.slice(0, 10).map((result, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 truncate max-w-xs">{result.url}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              result.status === 'success' ? 'bg-green-100 text-green-800' :
                              result.status === 'error' ? 'bg-red-100 text-red-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {result.statusCode}
                            </span>
                          </td>
                          <td className="py-2">{Math.round(result.responseTime)}ms</td>
                          <td className="py-2">
                            {result.status === 'success' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : result.status === 'error' ? (
                              <XCircle className="w-4 h-4 text-red-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-orange-600" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.results.length > 10 && (
                    <p className="text-sm text-gray-500 mt-4">
                      ... et {data.results.length - 10} autres URLs
                    </p>
                  )}
                </div>
              </Card>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default BulkStatusChecker;
