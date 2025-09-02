
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Target, TrendingUp, Search, Filter, Download } from 'lucide-react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  cpc: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
}

interface KeywordResult {
  seedKeyword: string;
  suggestions: KeywordData[];
  totalSuggestions: number;
  averageVolume: number;
  lowCompetitionCount: number;
}

const KeywordGenerator = () => {
  const [data, setData] = useState<KeywordResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [seedKeyword, setSeedKeyword] = useState('');
  const [language, setLanguage] = useState('fr');
  const [country, setCountry] = useState('FR');
  const [minVolume, setMinVolume] = useState('100');
  const [competition, setCompetition] = useState('all');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!seedKeyword.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez renseigner un mot-clé de base",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulation d'une génération de mots-clés
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const variations = [
        'comment', 'meilleur', 'gratuit', 'prix', 'avis', 'guide', 'tutoriel', 
        'comparatif', 'test', 'acheter', 'vendre', 'conseil', 'astuce', 'exemple'
      ];
      
      const suffixes = [
        '2024', 'france', 'paris', 'pas cher', 'professionnel', 'débutant',
        'expert', 'rapide', 'facile', 'efficace', 'complet', 'détaillé'
      ];

      const generateKeywords = () => {
        const keywords: KeywordData[] = [];
        const seed = seedKeyword.trim().toLowerCase();
        
        // Ajouter le mot-clé exact
        keywords.push({
          keyword: seed,
          searchVolume: Math.floor(Math.random() * 5000) + 1000,
          competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          cpc: Math.random() * 3 + 0.5,
          difficulty: Math.floor(Math.random() * 100),
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
        });

        // Générer des variations
        variations.forEach(prefix => {
          if (Math.random() > 0.3) {
            keywords.push({
              keyword: `${prefix} ${seed}`,
              searchVolume: Math.floor(Math.random() * 2000) + 100,
              competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
              cpc: Math.random() * 2 + 0.2,
              difficulty: Math.floor(Math.random() * 100),
              trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
            });
          }
        });

        suffixes.forEach(suffix => {
          if (Math.random() > 0.5) {
            keywords.push({
              keyword: `${seed} ${suffix}`,
              searchVolume: Math.floor(Math.random() * 1500) + 50,
              competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
              cpc: Math.random() * 2.5 + 0.1,
              difficulty: Math.floor(Math.random() * 100),
              trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
            });
          }
        });

        return keywords
          .filter(k => k.searchVolume >= parseInt(minVolume))
          .filter(k => competition === 'all' || k.competition === competition)
          .sort((a, b) => b.searchVolume - a.searchVolume)
          .slice(0, 50);
      };

      const suggestions = generateKeywords();
      const avgVolume = suggestions.reduce((sum, k) => sum + k.searchVolume, 0) / suggestions.length;
      const lowCompCount = suggestions.filter(k => k.competition === 'low').length;
      
      const result: KeywordResult = {
        seedKeyword: seedKeyword.trim(),
        suggestions,
        totalSuggestions: suggestions.length,
        averageVolume: Math.round(avgVolume),
        lowCompetitionCount: lowCompCount
      };
      
      setData(result);
      toast({
        title: "Génération terminée",
        description: `${suggestions.length} mots-clés générés`
      });
      
    } catch (err) {
      setError('Erreur lors de la génération des mots-clés.');
      toast({
        title: "Erreur",
        description: "Impossible de générer les mots-clés",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    
    const exportData = data.suggestions.map(k => ({
      keyword: k.keyword,
      searchVolume: k.searchVolume,
      competition: k.competition,
      cpc: k.cpc.toFixed(2),
      difficulty: k.difficulty,
      trend: k.trend
    }));

    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : format === 'csv'
      ? 'Keyword,Search Volume,Competition,CPC,Difficulty,Trend\n' + 
        exportData.map(row => Object.values(row).join(',')).join('\n')
      : 'Export PDF en cours...';
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${data.seedKeyword.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Liste de mots-clés téléchargée au format ${format.toUpperCase()}`
    });
  };

  const getCompetitionColor = (comp: string) => {
    switch (comp) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 text-gray-400">→</div>;
      default: return null;
    }
  };

  return (
    <ToolLayout
      title="Générateur de Mots-Clés"
      description="Découvrez des milliers de mots-clés pertinents avec volumes de recherche, niveau de concurrence et estimations CPC pour optimiser votre stratégie SEO."
      icon={<Target />}
      category="research"
      relatedTools={[
        {
          title: "Vérificateur de Positions",
          description: "Suivez vos positions",
          href: "/tools/rank-checker",
          icon: <Search />
        },
        {
          title: "Analyse SERP",
          description: "Analysez la concurrence",
          href: "/tools/serp-analyzer",
          icon: <Filter />
        }
      ]}
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Configuration de la recherche
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="seed">Mot-clé de base</Label>
              <Input
                id="seed"
                placeholder="seo, marketing digital..."
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="minVol">Volume minimum</Label>
              <Select value={minVolume} onValueChange={setMinVolume}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Tous</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="1000">1000+</SelectItem>
                  <SelectItem value="5000">5000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="lang">Langue</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">Anglais</SelectItem>
                  <SelectItem value="es">Espagnol</SelectItem>
                  <SelectItem value="de">Allemand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comp">Concurrence</Label>
              <Select value={competition} onValueChange={setCompetition}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Génération en cours...
              </>
            ) : (
              'Générer les mots-clés'
            )}
          </Button>
        </Card>
        
        <ResultsDisplay
          title="Suggestions de mots-clés"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              {/* Résumé */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{data.totalSuggestions}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mots-clés trouvés</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{data.averageVolume.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Volume moyen</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{data.lowCompetitionCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Faible concurrence</div>
                </Card>
              </div>

              {/* Tableau des mots-clés */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Liste des mots-clés</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium">Mot-clé</th>
                        <th className="text-center py-3 px-4 font-medium">Volume</th>
                        <th className="text-center py-3 px-4 font-medium">Concurrence</th>
                        <th className="text-center py-3 px-4 font-medium">CPC</th>
                        <th className="text-center py-3 px-4 font-medium">Difficulté</th>
                        <th className="text-center py-3 px-4 font-medium">Tendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.suggestions.map((keyword, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4 font-medium">{keyword.keyword}</td>
                          <td className="py-3 px-4 text-center text-blue-600 dark:text-blue-400 font-medium">
                            {keyword.searchVolume.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                              {keyword.competition}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                            {keyword.cpc.toFixed(2)}€
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-2 bg-gray-200 rounded-full mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    keyword.difficulty >= 70 ? 'bg-red-500' :
                                    keyword.difficulty >= 40 ? 'bg-orange-500' : 'bg-green-500'
                                  }`}
                                  style={{ "--difficulty-width": `${keyword.difficulty}%` } as React.CSSProperties}
                                />
                              </div>
                              <span className="text-xs text-gray-500">{keyword.difficulty}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {getTrendIcon(keyword.trend)}
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

export default KeywordGenerator;
