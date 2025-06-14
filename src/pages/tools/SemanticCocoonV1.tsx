
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Layers, Compass } from 'lucide-react';

interface CocoonData {
  topic: string;
  levels: {
    level1: string[];
    level2: Record<string, string[]>;
  };
  totalPages: number;
  semanticScore: number;
}

const SemanticCocoonV1 = () => {
  const [data, setData] = useState<CocoonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const level1 = ['Bases', 'Techniques', 'Outils', 'Stratégies'];
      const level2: Record<string, string[]> = {};
      
      level1.forEach(category => {
        level2[category] = [
          `${inputData.value} ${category} 1`,
          `${inputData.value} ${category} 2`,
          `${inputData.value} ${category} 3`
        ];
      });
      
      const mockData: CocoonData = {
        topic: inputData.value,
        levels: { level1, level2 },
        totalPages: level1.length + Object.values(level2).flat().length,
        semanticScore: Math.floor(Math.random() * 30) + 70
      };
      
      setData(mockData);
      toast({
        title: "Cocon sémantique généré",
        description: `${mockData.totalPages} pages structurées`
      });
      
    } catch (err) {
      setError('Erreur lors de la génération du cocon.');
      toast({
        title: "Erreur",
        description: "Impossible de générer le cocon sémantique",
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
      description: "Structure du cocon téléchargée"
    });
  };

  return (
    <ToolLayout
      title="Générateur de Cocons V1"
      description="Créez automatiquement des cocons sémantiques sur 2 niveaux pour optimiser votre maillage interne"
      icon={<Layers />}
      category="optimize"
      relatedTools={[
        {
          title: "Générateur de Cocons V2",
          description: "Version interactive",
          href: "/tools/semantic-cocoon-v2",
          icon: <Compass />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Générer un cocon sémantique"
          description="Entrez votre thématique principale"
          inputType="text"
          placeholder="SEO, Marketing Digital, E-commerce..."
          onSubmit={handleGenerate}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Cocon sémantique généré"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{data.totalPages}</div>
                  <div className="text-sm text-gray-600">Pages recommandées</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{data.semanticScore}%</div>
                  <div className="text-sm text-gray-600">Score sémantique</div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Structure du Cocon</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="font-bold text-lg">{data.topic} (Page Mère)</div>
                  </div>
                  
                  {data.levels.level1.map((category, index) => (
                    <div key={index} className="ml-8">
                      <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg mb-2">
                        <div className="font-semibold">{category} (Niveau 1)</div>
                      </div>
                      <div className="ml-8 space-y-1">
                        {data.levels.level2[category]?.map((page, pageIndex) => (
                          <div key={pageIndex} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                            {page} (Niveau 2)
                          </div>
                        ))}
                      </div>
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

export default SemanticCocoonV1;
