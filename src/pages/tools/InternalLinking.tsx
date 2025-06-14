
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link, Target } from 'lucide-react';

interface LinkingData {
  opportunities: Array<{
    fromPage: string;
    toPage: string;
    anchor: string;
    relevanceScore: number;
  }>;
}

const InternalLinking = () => {
  const [data, setData] = useState<LinkingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleAnalyze = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const opportunities = Array.from({ length: 15 }, (_, i) => ({
        fromPage: `/page-${i + 1}`,
        toPage: `/target-page-${i + 1}`,
        anchor: `lien pertinent ${i + 1}`,
        relevanceScore: Math.floor(Math.random() * 40) + 60
      }));
      
      setData({ opportunities });
      toast({
        title: "Analyse terminée",
        description: `${opportunities.length} opportunités trouvées`
      });
      
    } catch (err) {
      setError('Erreur lors de l\'analyse.');
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le maillage",
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
      description: "Opportunités de maillage téléchargées"
    });
  };

  return (
    <ToolLayout
      title="Opportunités de Maillage"
      description="Identifiez automatiquement les meilleures opportunités de liens internes pour votre site"
      icon={<Link />}
      category="optimize"
      relatedTools={[
        {
          title: "Générateur de Cocons V1",
          description: "Structurez votre contenu",
          href: "/tools/semantic-cocoon-v1",
          icon: <Target />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Analyser le maillage interne"
          description="Entrez l'URL de votre site à analyser"
          inputType="url"
          placeholder="https://example.com"
          onSubmit={handleAnalyze}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Opportunités de maillage"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Liens recommandés</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Page source</th>
                      <th className="text-left py-2">Page cible</th>
                      <th className="text-left py-2">Ancre suggérée</th>
                      <th className="text-left py-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.opportunities.map((opp, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2">{opp.fromPage}</td>
                        <td className="py-2">{opp.toPage}</td>
                        <td className="py-2">{opp.anchor}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            opp.relevanceScore >= 80 ? 'bg-green-100 text-green-800' :
                            opp.relevanceScore >= 60 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {opp.relevanceScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default InternalLinking;
