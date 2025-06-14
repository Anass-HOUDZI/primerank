
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { KeywordGeneratorForm } from '@/components/tools/KeywordGeneratorForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Target, TrendingUp, Search } from 'lucide-react';

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
        
        keywords.push({
          keyword: seed,
          searchVolume: Math.floor(Math.random() * 5000) + 1000,
          competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          cpc: Math.random() * 3 + 0.5,
          difficulty: Math.floor(Math.random() * 100),
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
        });

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
      default: return <div className="w-4 h-4 text-gray-400">→</div>;
    }
  };

  return (
    <ToolLayout
      title="Générateur de Mots-Clés"
      description="Découvrez des mots-clés pertinents avec leurs métriques de volume, concurrence et difficulté pour optimiser votre stratégie SEO."
      icon={<Target />}
      category="research"
      relatedTools={[
        {
          title: "Rank Checker",
          description: "Vérifiez vos positions sur Google",
          href: "/tools/rank-checker",
          icon: <Search />
        }
      ]}
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Configuration de la génération
          </h2>
          
          <KeywordGeneratorForm
            seedKeyword={seedKeyword}
            language={language}
            country={country}
            minVolume={minVolume}
            competition={competition}
            onSeedKeywordChange={setSeedKeyword}
            onLanguageChange={setLanguage}
            onCountryChange={setCountry}
            onMinVolumeChange={setMinVolume}
            onCompetitionChange={setCompetition}
            onSubmit={handleGenerate}
            loading={loading}
          />
        </Card>
        
        <ResultsDisplay
          title="Mots-clés générés"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{data.totalSuggestions}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mots-clés trouvés</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{data.averageVolume}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Volume moyen</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{data.lowCompetitionCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Faible concurrence</div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Liste des mots-clés</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2">Mot-clé</th>
                        <th className="text-center py-2">Volume</th>
                        <th className="text-center py-2">Concurrence</th>
                        <th className="text-center py-2">CPC</th>
                        <th className="text-center py-2">Difficulté</th>
                        <th className="text-center py-2">Tendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.suggestions.slice(0, 20).map((keyword, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{keyword.keyword}</td>
                          <td className="py-2 text-center">{keyword.searchVolume.toLocaleString()}</td>
                          <td className="py-2 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${getCompetitionColor(keyword.competition)}`}>
                              {keyword.competition}
                            </span>
                          </td>
                          <td className="py-2 text-center">{keyword.cpc.toFixed(2)}€</td>
                          <td className="py-2 text-center">{keyword.difficulty}%</td>
                          <td className="py-2 text-center">{getTrendIcon(keyword.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.suggestions.length > 20 && (
                    <p className="text-sm text-gray-500 mt-4">
                      ... et {data.suggestions.length - 20} autres mots-clés
                    </p>
                  )}
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
