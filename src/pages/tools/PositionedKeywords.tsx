
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity, TrendingUp } from 'lucide-react';

interface PositionData {
  domain: string;
  totalKeywords: number;
  keywords: Array<{
    keyword: string;
    position: number;
    previousPosition: number;
    volume: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
}

const PositionedKeywords = () => {
  const [data, setData] = useState<PositionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleAnalyze = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const keywords = Array.from({ length: 30 }, (_, i) => {
        const currentPos = Math.floor(Math.random() * 50) + 1;
        const previousPos = currentPos + Math.floor(Math.random() * 20) - 10;
        const change = previousPos - currentPos;
        
        return {
          keyword: `mot-clé ${i + 1}`,
          position: currentPos,
          previousPosition: previousPos,
          volume: Math.floor(Math.random() * 5000) + 100,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable' as 'up' | 'down' | 'stable',
          change
        };
      });
      
      const mockData: PositionData = {
        domain: inputData.value,
        totalKeywords: keywords.length,
        keywords
      };
      
      setData(mockData);
      toast({
        title: "Analyse terminée",
        description: `${keywords.length} mots-clés positionnés trouvés`
      });
      
    } catch (err) {
      setError('Erreur lors de l\'analyse.');
      toast({
        title: "Erreur",
        description: "Impossible d'analyser les positions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    toast({
      title: "Export réussi",
      description: "Mots-clés positionnés téléchargés"
    });
  };

  return (
    <ToolLayout
      title="Mots-clés Positionnés"
      description="Liste complète de vos mots-clés positionnés avec positions moyennes et évolutions"
      icon={<Activity />}
      category="research"
      relatedTools={[
        {
          title: "Rank Checker",
          description: "Vérifiez vos positions",
          href: "/tools/rank-checker",
          icon: <TrendingUp />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Analyser les mots-clés positionnés"
          description="Entrez votre domaine pour voir tous vos mots-clés positionnés"
          inputType="url"
          placeholder="example.com"
          onSubmit={handleAnalyze}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Mots-clés positionnés"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.totalKeywords}</div>
                <div className="text-sm text-gray-600">Mots-clés positionnés</div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Suivi des positions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Mot-clé</th>
                        <th className="text-left py-2">Position</th>
                        <th className="text-left py-2">Évolution</th>
                        <th className="text-left py-2">Volume</th>
                        <th className="text-left py-2">Tendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.keywords.slice(0, 15).map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">{item.keyword}</td>
                          <td className="py-2 font-bold">#{item.position}</td>
                          <td className="py-2">
                            <span className={`text-sm ${
                              item.change > 0 ? 'text-green-600' :
                              item.change < 0 ? 'text-red-600' :
                              'text-gray-600'
                            }`}>
                              {item.change > 0 ? '+' : ''}{item.change}
                            </span>
                          </td>
                          <td className="py-2">{item.volume.toLocaleString()}</td>
                          <td className="py-2">
                            {item.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : item.trend === 'down' ? (
                              <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                            ) : (
                              <div className="w-4 h-4 text-gray-400">→</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default PositionedKeywords;
