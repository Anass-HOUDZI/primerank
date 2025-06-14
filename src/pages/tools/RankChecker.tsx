
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Search, MapPin, Plus, X } from 'lucide-react';

interface RankData {
  keyword: string;
  position: number | null;
  url: string | null;
  previousPosition?: number;
  searchVolume: number;
  difficulty: number;
}

interface RankCheckResult {
  domain: string;
  keywords: RankData[];
  totalKeywords: number;
  avgPosition: number;
  improvements: number;
  declines: number;
}

const RankChecker = () => {
  const [data, setData] = useState<RankCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>(['']);
  const [domain, setDomain] = useState('');
  const { toast } = useToast();

  const addKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleAnalyze = async () => {
    if (!domain.trim() || keywords.filter(k => k.trim()).length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez renseigner un domaine et au moins un mot-clé",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulation d'une vérification de positions
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const validKeywords = keywords.filter(k => k.trim());
      const mockResults: RankData[] = validKeywords.map(keyword => {
        const position = Math.random() < 0.7 ? Math.floor(Math.random() * 100) + 1 : null;
        const previousPosition = position ? (Math.random() < 0.8 ? position + Math.floor(Math.random() * 20) - 10 : undefined) : undefined;
        
        return {
          keyword: keyword.trim(),
          position,
          url: position ? `${domain}/page-${Math.floor(Math.random() * 10) + 1}` : null,
          previousPosition,
          searchVolume: Math.floor(Math.random() * 10000) + 100,
          difficulty: Math.floor(Math.random() * 100)
        };
      });

      const positionedKeywords = mockResults.filter(r => r.position !== null);
      const avgPosition = positionedKeywords.length > 0 
        ? positionedKeywords.reduce((sum, r) => sum + (r.position || 0), 0) / positionedKeywords.length 
        : 0;

      const improvements = mockResults.filter(r => 
        r.position && r.previousPosition && r.position < r.previousPosition
      ).length;

      const declines = mockResults.filter(r => 
        r.position && r.previousPosition && r.position > r.previousPosition
      ).length;
      
      const result: RankCheckResult = {
        domain: domain.trim(),
        keywords: mockResults,
        totalKeywords: validKeywords.length,
        avgPosition: Math.round(avgPosition * 10) / 10,
        improvements,
        declines
      };
      
      setData(result);
      toast({
        title: "Vérification terminée",
        description: `${validKeywords.length} mots-clés analysés`
      });
      
    } catch (err) {
      setError('Erreur lors de la vérification des positions.');
      toast({
        title: "Erreur",
        description: "Impossible de vérifier les positions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    
    const exportData = data.keywords.map(k => ({
      keyword: k.keyword,
      position: k.position || 'Non classé',
      url: k.url || 'N/A',
      searchVolume: k.searchVolume,
      difficulty: k.difficulty,
      change: k.previousPosition && k.position 
        ? k.previousPosition - k.position 
        : 'N/A'
    }));

    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : format === 'csv'
      ? 'Keyword,Position,URL,Search Volume,Difficulty,Change\n' + 
        exportData.map(row => Object.values(row).join(',')).join('\n')
      : 'Export PDF en cours...';
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rank-check-${data.domain.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Rapport de positions téléchargé au format ${format.toUpperCase()}`
    });
  };

  const getPositionColor = (position: number | null) => {
    if (!position) return 'text-gray-400';
    if (position <= 3) return 'text-green-600 dark:text-green-400';
    if (position <= 10) return 'text-blue-600 dark:text-blue-400';
    if (position <= 20) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (current: number | null, previous: number | undefined) => {
    if (!current || !previous) return null;
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 text-gray-400">→</div>;
  };

  return (
    <ToolLayout
      title="Vérificateur de Positions"
      description="Surveillez vos positions sur Google pour vos mots-clés stratégiques avec un historique détaillé des évolutions."
      icon={<Search />}
      category="research"
      relatedTools={[
        {
          title: "Générateur de Mots-clés",
          description: "Trouvez de nouveaux mots-clés",
          href: "/tools/keyword-generator",
          icon: <TrendingUp />
        },
        {
          title: "Analyse SERP",
          description: "Analysez la concurrence",
          href: "/tools/serp-analyzer",
          icon: <MapPin />
        }
      ]}
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Configuration de la vérification
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="domain">Domaine à analyser</Label>
              <Input
                id="domain"
                type="url"
                placeholder="https://exemple.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Mots-clés à vérifier</Label>
              <div className="space-y-2 mt-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Mot-clé à vérifier"
                      value={keyword}
                      onChange={(e) => updateKeyword(index, e.target.value)}
                      className="flex-1"
                    />
                    {keywords.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeKeyword(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addKeyword}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un mot-clé
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Vérification en cours...
                </>
              ) : (
                'Vérifier les positions'
              )}
            </Button>
          </div>
        </Card>
        
        <ResultsDisplay
          title="Résultats de vérification"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              {/* Résumé */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{data.totalKeywords}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mots-clés</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{data.avgPosition || 'N/A'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Position moyenne</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{data.improvements}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Améliorations</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{data.declines}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Régressions</div>
                </Card>
              </div>

              {/* Tableau des résultats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détail des positions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium">Mot-clé</th>
                        <th className="text-center py-3 px-4 font-medium">Position</th>
                        <th className="text-center py-3 px-4 font-medium">Évolution</th>
                        <th className="text-center py-3 px-4 font-medium">Volume</th>
                        <th className="text-center py-3 px-4 font-medium">Difficulté</th>
                        <th className="text-left py-3 px-4 font-medium">URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.keywords.map((result, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4 font-medium">{result.keyword}</td>
                          <td className={`py-3 px-4 text-center font-bold ${getPositionColor(result.position)}`}>
                            {result.position || 'Non classé'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {getChangeIcon(result.position, result.previousPosition)}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                            {result.searchVolume.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${
                              result.difficulty >= 70 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              result.difficulty >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {result.difficulty}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                            {result.url || 'N/A'}
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

export default RankChecker;
