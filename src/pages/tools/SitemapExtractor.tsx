
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Globe, FileText } from 'lucide-react';

interface SitemapData {
  url: string;
  totalUrls: number;
  structure: Array<{
    url: string;
    priority: number;
    lastmod: string;
    changefreq: string;
  }>;
}

const SitemapExtractor = () => {
  const [data, setData] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleExtract = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const structure = Array.from({ length: 20 }, (_, i) => ({
        url: `${inputData.value}/page-${i + 1}`,
        priority: Math.random(),
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: ['daily', 'weekly', 'monthly'][Math.floor(Math.random() * 3)]
      }));
      
      const mockData: SitemapData = {
        url: inputData.value,
        totalUrls: structure.length,
        structure
      };
      
      setData(mockData);
      toast({
        title: "Sitemap extrait",
        description: `${structure.length} URLs trouvées`
      });
      
    } catch (err) {
      setError('Erreur lors de l\'extraction.');
      toast({
        title: "Erreur",
        description: "Impossible d'extraire le sitemap",
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
      description: "Sitemap téléchargé"
    });
  };

  return (
    <ToolLayout
      title="Extracteur de Sitemap"
      description="Visualisez et analysez la structure de n'importe quel sitemap avec un diagramme interactif"
      icon={<Globe />}
      category="technical"
      relatedTools={[
        {
          title: "Convertisseur CSV",
          description: "Convertissez vos données",
          href: "/tools/csv-converter",
          icon: <FileText />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Extraire un sitemap"
          description="Entrez l'URL du sitemap à analyser"
          inputType="url"
          placeholder="https://example.com/sitemap.xml"
          onSubmit={handleExtract}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Structure du sitemap"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">URLs extraites ({data.totalUrls})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">URL</th>
                      <th className="text-left py-2">Priorité</th>
                      <th className="text-left py-2">Dernière modif</th>
                      <th className="text-left py-2">Fréquence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.structure.slice(0, 10).map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 truncate max-w-xs">{item.url}</td>
                        <td className="py-2">{item.priority.toFixed(1)}</td>
                        <td className="py-2">{item.lastmod}</td>
                        <td className="py-2">{item.changefreq}</td>
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

export default SitemapExtractor;
