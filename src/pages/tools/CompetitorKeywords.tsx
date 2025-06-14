
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, Target } from 'lucide-react';

interface CompetitorData {
  competitor: string;
  totalKeywords: number;
  gapKeywords: Array<{
    keyword: string;
    competitorPosition: number;
    yourPosition: number | null;
    volume: number;
    opportunity: 'high' | 'medium' | 'low';
  }>;
}

const CompetitorKeywords = () => {
  const [data, setData] = useState<CompetitorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleAnalyze = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const keywords = Array.from({ length: 25 }, (_, i) => ({
        keyword: `mot-clé ${i + 1}`,
        competitorPosition: Math.floor(Math.random() * 10) + 1,
        yourPosition: Math.random() > 0.4 ? Math.floor(Math.random() * 50) + 11 : null,
        volume: Math.floor(Math.random() * 5000) + 500,
        opportunity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low'
      }));
      
      const mockData: CompetitorData = {
        competitor: inputData.value,
        totalKeywords: keywords.length,
        gapKeywords: keywords
      };
      
      setData(mockData);
      toast({
        title: "Analyse terminée",
        description: `${keywords.length} opportunités identifiées`
      });
      
    } catch (err) {
      setError('Erreur lors de l\'analyse concurrentielle.');
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le concurrent",
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
      description: "Analyse concurrentielle téléchargée"
    });
  };

  return (
    <ToolLayout
      title="Analyse Concurrentielle"
      description="Découvrez les mots-clés sur lesquels se positionnent vos concurrents et identifiez les opportunités"
      icon={<Users />}
      category="research"
      relatedTools={[
        {
          title: "Générateur de Mots-clés",
          description: "Trouvez de nouveaux mots-clés",
          href: "/tools/keyword-generator",
          icon: <Target />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Analyser un concurrent"
          description="Entrez le domaine du concurrent à analyser"
          inputType="url"
          placeholder="competitor.com"
          onSubmit={handleAnalyze}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Analyse concurrentielle"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.totalKeywords}</div>
                <div className="text-sm text-gray-600">Opportunités détectées</div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gap Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Mot-clé</th>
                        <th className="text-left py-2">Position concurrent</th>
                        <th className="text-left py-2">Votre position</th>
                        <th className="text-left py-2">Volume</th>
                        <th className="text-left py-2">Opportunité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.gapKeywords.slice(0, 15).map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">{item.keyword}</td>
                          <td className="py-2 text-green-600">#{item.competitorPosition}</td>
                          <td className="py-2">{item.yourPosition ? `#${item.yourPosition}` : 'Non classé'}</td>
                          <td className="py-2">{item.volume.toLocaleString()}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              item.opportunity === 'high' ? 'bg-green-100 text-green-800' :
                              item.opportunity === 'medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.opportunity}
                            </span>
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

export default CompetitorKeywords;
