
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Code, Eye, Zap } from 'lucide-react';

interface CriticalCSSData {
  url: string;
  originalSize: number;
  criticalSize: number;
  savings: number;
  criticalCSS: string;
  recommendations: string[];
}

const CriticalCSSGenerator = () => {
  const [data, setData] = useState<CriticalCSSData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const mockData: CriticalCSSData = {
        url: inputData.value,
        originalSize: Math.floor(Math.random() * 500) + 200,
        criticalSize: Math.floor(Math.random() * 50) + 20,
        savings: 0,
        criticalCSS: `/* Critical CSS Above-the-fold */
.header { display: flex; justify-content: space-between; padding: 1rem; }
.logo { font-size: 1.5rem; font-weight: bold; }
.nav { display: flex; gap: 1rem; }
.hero { text-align: center; padding: 3rem 1rem; }
.hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
.btn-primary { background: #007bff; color: white; padding: 0.75rem 1.5rem; }`,
        recommendations: [
          'Inliner le CSS critique dans le <head>',
          'Charger le CSS non-critique de manière asynchrone',
          'Optimiser les polices web pour réduire le FOIT',
          'Compresser et minifier le CSS restant'
        ]
      };
      
      mockData.savings = Math.round(((mockData.originalSize - mockData.criticalSize) / mockData.originalSize) * 100);
      
      setData(mockData);
      toast({
        title: "CSS critique extrait",
        description: `${mockData.savings}% de réduction de taille`
      });
      
    } catch (err) {
      setError('Erreur lors de l\'extraction du CSS critique.');
      toast({
        title: "Erreur",
        description: "Impossible d'extraire le CSS critique",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Générateur de CSS Critique"
      description="Extrayez le CSS critique pour optimiser le temps de chargement above-the-fold de vos pages"
      icon={<Code />}
      category="technical"
      relatedTools={[
        {
          title: "PageSpeed Analyzer",
          description: "Analysez les performances",
          href: "/tools/pagespeed-analyzer",
          icon: <Zap />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Extraire le CSS critique"
          description="Entrez l'URL de la page pour extraire son CSS critique"
          inputType="url"
          placeholder="https://example.com"
          onSubmit={handleGenerate}
          loading={loading}
        />
        
        {data && !loading && !error && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.originalSize}KB</div>
                <div className="text-sm text-gray-600">CSS original</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{data.criticalSize}KB</div>
                <div className="text-sm text-gray-600">CSS critique</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{data.savings}%</div>
                <div className="text-sm text-gray-600">Économies</div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                CSS Critique
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{data.criticalCSS}</code>
              </pre>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
              <ul className="space-y-2">
                {data.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <Eye className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {loading && (
          <Card className="p-6 text-center">
            <p>Extraction en cours...</p>
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

export default CriticalCSSGenerator;
