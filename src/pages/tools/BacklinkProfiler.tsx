
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { MetricsGrid } from '@/components/tools/MetricsGrid';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Link2, 
  TrendingUp, 
  Shield, 
  Globe,
  ExternalLink
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

interface BacklinkData {
  domain: string;
  totalBacklinks: number;
  uniqueDomains: number;
  domainAuthority: number;
  trustFlow: number;
  topBacklinks: Array<{
    url: string;
    domain: string;
    anchor: string;
    authority: number;
    type: 'dofollow' | 'nofollow';
  }>;
  anchorDistribution: Array<{
    anchor: string;
    count: number;
  }>;
}

const BacklinkProfiler = () => {
  const [data, setData] = useState<BacklinkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleAnalyze = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const mockBacklinks = Array.from({ length: 20 }, (_, i) => ({
        url: `https://example${i + 1}.com/article-${i + 1}`,
        domain: `example${i + 1}.com`,
        anchor: ['mot-clé principal', 'lien naturel', 'cliquez ici', 'en savoir plus', 'site officiel'][Math.floor(Math.random() * 5)],
        authority: Math.floor(Math.random() * 50) + 20,
        type: Math.random() > 0.3 ? 'dofollow' : 'nofollow' as const
      }));

      const anchorCounts = mockBacklinks.reduce((acc, link) => {
        acc[link.anchor] = (acc[link.anchor] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mockData: BacklinkData = {
        domain: inputData.value,
        totalBacklinks: Math.floor(Math.random() * 5000) + 1000,
        uniqueDomains: Math.floor(Math.random() * 500) + 100,
        domainAuthority: Math.floor(Math.random() * 40) + 40,
        trustFlow: Math.floor(Math.random() * 30) + 35,
        topBacklinks: mockBacklinks,
        anchorDistribution: Object.entries(anchorCounts).map(([anchor, count]) => ({
          anchor,
          count
        }))
      };
      
      setData(mockData);
      toast({
        title: "Analyse terminée",
        description: "Le profil de backlinks a été analysé avec succès"
      });
      
    } catch (err) {
      setError('Erreur lors de l\'analyse. Veuillez vérifier le domaine et réessayer.');
      toast({
        title: "Erreur",
        description: "Impossible d'analyser ce domaine",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    
    const exportData = {
      domain: data.domain,
      metrics: {
        totalBacklinks: data.totalBacklinks,
        uniqueDomains: data.uniqueDomains,
        domainAuthority: data.domainAuthority,
        trustFlow: data.trustFlow
      },
      topBacklinks: data.topBacklinks,
      anchorDistribution: data.anchorDistribution
    };

    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : format === 'csv'
      ? `URL,Domain,Anchor,Authority,Type\n${data.topBacklinks.map(b => 
          `${b.url},${b.domain},${b.anchor},${b.authority},${b.type}`
        ).join('\n')}`
      : 'Export PDF en cours...';
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backlinks-${data.domain.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Profil de backlinks téléchargé au format ${format.toUpperCase()}`
    });
  };

  const metrics = data ? [
    {
      id: 'totalBacklinks',
      title: 'Backlinks Totaux',
      value: data.totalBacklinks,
      maxValue: 10000,
      icon: <Link2 />,
      color: 'blue' as const
    },
    {
      id: 'uniqueDomains',
      title: 'Domaines Uniques',
      value: data.uniqueDomains,
      maxValue: 1000,
      icon: <Globe />,
      color: 'green' as const
    },
    {
      id: 'domainAuthority',
      title: 'Autorité du Domaine',
      value: data.domainAuthority,
      maxValue: 100,
      icon: <Shield />,
      color: data.domainAuthority >= 70 ? 'green' : data.domainAuthority >= 40 ? 'orange' : 'red' as const
    },
    {
      id: 'trustFlow',
      title: 'Trust Flow',
      value: data.trustFlow,
      maxValue: 100,
      icon: <TrendingUp />,
      color: data.trustFlow >= 60 ? 'green' : data.trustFlow >= 30 ? 'orange' : 'red' as const
    }
  ] : [];

  return (
    <ToolLayout
      title="Analyseur de Profil de Backlinks"
      description="Analysez votre profil de backlinks avec des métriques de qualité et identifiez les opportunités d'amélioration."
      icon={<Link2 />}
      category="analyze"
      relatedTools={[
        {
          title: "Rank Checker",
          description: "Vérifiez vos positions sur Google",
          href: "/tools/rank-checker",
          icon: <TrendingUp />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Analyser le profil de backlinks"
          description="Entrez le domaine que vous souhaitez analyser (sans http://)"
          inputType="url"
          placeholder="example.com"
          onSubmit={handleAnalyze}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Profil de backlinks"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <MetricsGrid metrics={metrics} columns={4} />
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution des ancres</h3>
                <ChartContainer config={{}} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.anchorDistribution}>
                      <XAxis dataKey="anchor" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Backlinks</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2">URL Source</th>
                        <th className="text-left py-2">Domaine</th>
                        <th className="text-left py-2">Ancre</th>
                        <th className="text-left py-2">Autorité</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topBacklinks.slice(0, 10).map((backlink, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 truncate max-w-xs">{backlink.url}</td>
                          <td className="py-2">{backlink.domain}</td>
                          <td className="py-2">{backlink.anchor}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              backlink.authority >= 60 ? 'bg-green-100 text-green-800' :
                              backlink.authority >= 30 ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {backlink.authority}
                            </span>
                          </td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              backlink.type === 'dofollow' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {backlink.type}
                            </span>
                          </td>
                          <td className="py-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.topBacklinks.length > 10 && (
                    <p className="text-sm text-gray-500 mt-4">
                      ... et {data.topBacklinks.length - 10} autres backlinks
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

export default BacklinkProfiler;
