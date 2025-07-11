
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Download, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: string;
}

const SitemapExtractor = () => {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SitemapUrl[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!sitemapUrl.trim()) {
      setError('Veuillez entrer une URL de sitemap valide');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulation d'extraction de sitemap
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults: SitemapUrl[] = [
        { url: `${sitemapUrl}/page1`, lastmod: '2024-01-15', priority: 1.0, changefreq: 'weekly' },
        { url: `${sitemapUrl}/page2`, lastmod: '2024-01-14', priority: 0.8, changefreq: 'monthly' },
        { url: `${sitemapUrl}/blog`, lastmod: '2024-01-13', priority: 0.6, changefreq: 'daily' },
        { url: `${sitemapUrl}/contact`, lastmod: '2024-01-12', priority: 0.4, changefreq: 'yearly' },
      ];

      setResults(mockResults);
      toast({
        title: "Sitemap extrait avec succès",
        description: `${mockResults.length} URLs trouvées`,
      });
    } catch (err) {
      setError('Erreur lors de l\'extraction du sitemap');
    } finally {
      setIsLoading(false);
    }
  };

  const exportResults = () => {
    const csvContent = [
      'URL,Last Modified,Priority,Change Frequency',
      ...results.map(item => 
        `${item.url},${item.lastmod || ''},${item.priority || ''},${item.changefreq || ''}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap-extraction.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Extracteur de Sitemap"
      description="Analysez et visualisez la structure de n'importe quel sitemap XML"
      icon={<Globe className="w-6 h-6" />}
      category="technical"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL du Sitemap
              </label>
              <Input
                placeholder="https://example.com/sitemap.xml"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="w-full"
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              onClick={handleExtract}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Extraction en cours...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Extraire le Sitemap
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Résultats ({results.length} URLs)
                </h3>
                <Button onClick={exportResults} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter CSV
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.url}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          {item.lastmod && <span>Modifié: {item.lastmod}</span>}
                          {item.priority && <span>Priorité: {item.priority}</span>}
                          {item.changefreq && <span>Fréquence: {item.changefreq}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default SitemapExtractor;
