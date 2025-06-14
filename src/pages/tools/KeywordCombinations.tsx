
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Hash, Target } from 'lucide-react';

interface CombinationData {
  keywords: string[];
  totalCombinations: number;
  suggestions: Array<{
    keyword: string;
    volume: number;
    difficulty: number;
  }>;
}

const KeywordCombinations = () => {
  const [data, setData] = useState<CombinationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseKeywords = inputData.value.split(',').map(k => k.trim());
      const modifiers = ['meilleur', 'gratuit', 'pas cher', '2024', 'france', 'professionnel'];
      
      const combinations = [];
      baseKeywords.forEach(base => {
        modifiers.forEach(modifier => {
          combinations.push({
            keyword: `${modifier} ${base}`,
            volume: Math.floor(Math.random() * 1000) + 100,
            difficulty: Math.floor(Math.random() * 100)
          });
          combinations.push({
            keyword: `${base} ${modifier}`,
            volume: Math.floor(Math.random() * 1000) + 100,
            difficulty: Math.floor(Math.random() * 100)
          });
        });
      });
      
      const mockData: CombinationData = {
        keywords: baseKeywords,
        totalCombinations: combinations.length,
        suggestions: combinations.slice(0, 30)
      };
      
      setData(mockData);
      toast({
        title: "Combinaisons générées",
        description: `${combinations.length} variations créées`
      });
      
    } catch (err) {
      setError('Erreur lors de la génération.');
      toast({
        title: "Erreur",
        description: "Impossible de générer les combinaisons",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Générateur de Combinaisons"
      description="Générez automatiquement des milliers de variations de mots-clés pour maximiser votre couverture"
      icon={<Hash />}
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
          title="Générer des combinaisons"
          description="Entrez vos mots-clés de base séparés par des virgules"
          inputType="text"
          placeholder="seo, marketing, digital"
          onSubmit={handleGenerate}
          loading={loading}
        />
        
        {data && !loading && !error && (
          <div className="space-y-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{data.totalCombinations}</div>
              <div className="text-sm text-gray-600">Combinaisons générées</div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Combinaisons</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Mot-clé</th>
                      <th className="text-left py-2">Volume</th>
                      <th className="text-left py-2">Difficulté</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.suggestions.slice(0, 15).map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2">{item.keyword}</td>
                        <td className="py-2">{item.volume}</td>
                        <td className="py-2">{item.difficulty}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {loading && (
          <Card className="p-6 text-center">
            <p>Génération en cours...</p>
          </Card>
        )}

        {error && (
          <Card className="p-6 text-center text-red-600">
            <p>{error}</p>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default KeywordCombinations;
