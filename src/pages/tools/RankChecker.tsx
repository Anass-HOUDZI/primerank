
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { KeywordConfigForm } from '@/components/tools/KeywordConfigForm';
import { RankResults } from '@/components/tools/RankResults';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Search, MapPin } from 'lucide-react';

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
          
          <KeywordConfigForm
            keywords={keywords}
            domain={domain}
            onKeywordsChange={setKeywords}
            onDomainChange={setDomain}
            onSubmit={handleAnalyze}
            loading={loading}
          />
        </Card>
        
        <ResultsDisplay
          title="Résultats de vérification"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && <RankResults data={data} />}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default RankChecker;
