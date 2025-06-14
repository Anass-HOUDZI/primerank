
import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { MetricsGrid } from '@/components/tools/MetricsGrid';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Target, TrendingUp, FileText, AlertCircle } from 'lucide-react';
import { OfflineToolsEngine, KeywordAnalysis } from '@/lib/offline-tools';
import { ClientStorage } from '@/lib/client-storage';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const KeywordDensityAnalyzer = () => {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeContent = useCallback(async () => {
    if (!content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir du contenu à analyser",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulation d'un délai pour UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const result = OfflineToolsEngine.analyzeKeywordDensity(content);
      setAnalysis(result);
      
      // Sauvegarde pour historique
      ClientStorage.saveToolResult('keyword-density', result);
      
      toast({
        title: "Analyse terminée",
        description: `${result.keywords.length} mots-clés analysés`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le contenu",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [content, toast]);

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!analysis) return;

    let exportData: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'csv':
        exportData = 'Mot-clé,Occurrences,Densité (%),Recommandé\n' +
          analysis.keywords.map(k => 
            `${k.word},${k.count},${k.density.toFixed(2)},${k.isRecommended ? 'Oui' : 'Non'}`
          ).join('\n');
        filename = 'analyse-mots-cles.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        exportData = JSON.stringify(analysis, null, 2);
        filename = 'analyse-mots-cles.json';
        mimeType = 'application/json';
        break;
      default:
        exportData = `Analyse de densité des mots-clés\n\nNombre de mots: ${analysis.wordCount}\nCaractères: ${analysis.characterCount}\n\nTop mots-clés:\n${analysis.keywords.map(k => `- ${k.word}: ${k.count} occurrences (${k.density.toFixed(2)}%)`).join('\n')}`;
        filename = 'analyse-mots-cles.txt';
        mimeType = 'text/plain';
    }

    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: `Analyse téléchargée au format ${format.toUpperCase()}`
    });
  };

  const metrics = analysis ? [
    {
      id: 'wordCount',
      title: 'Nombre de mots',
      value: analysis.wordCount,
      maxValue: 1000,
      icon: <FileText />,
      color: 'blue' as const
    },
    {
      id: 'uniqueKeywords',
      title: 'Mots-clés uniques',
      value: analysis.keywords.length,
      maxValue: 50,
      icon: <Target />,
      color: 'green' as const
    },
    {
      id: 'readabilityScore',
      title: 'Score de lisibilité',
      value: analysis.readability.score,
      maxValue: 100,
      icon: <TrendingUp />,
      color: (analysis.readability.score >= 70 ? 'green' : analysis.readability.score >= 50 ? 'orange' : 'red') as 'green' | 'orange' | 'red'
    }
  ] : [];

  return (
    <ToolLayout
      title="Analyseur de Densité des Mots-Clés"
      description="Analysez la densité de vos mots-clés et optimisez votre contenu pour le SEO"
      icon={<Target />}
      category="analyze"
      relatedTools={[
        {
          title: "Générateur de Méta Descriptions",
          description: "Créez des méta descriptions optimisées",
          href: "/tools/meta-description-generator",
          icon: <FileText />
        }
      ]}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Contenu à analyser
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Collez votre contenu ici pour analyser la densité des mots-clés..."
              rows={10}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={analyzeContent}
            disabled={!content.trim() || isAnalyzing}
            className="w-full sm:w-auto"
          >
            {isAnalyzing ? 'Analyse en cours...' : 'Analyser la Densité'}
          </Button>
        </div>

        <ResultsDisplay
          title="Analyse de densité"
          data={analysis}
          loading={isAnalyzing}
          onExport={handleExport}
        >
          {analysis && (
            <div className="space-y-6">
              <MetricsGrid metrics={metrics} columns={3} />

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution des mots-clés</h3>
                <ChartContainer config={{}} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysis.keywords.slice(0, 10)}>
                      <XAxis dataKey="word" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="density" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Mots-Clés</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2">Mot-clé</th>
                        <th className="text-left py-2">Occurrences</th>
                        <th className="text-left py-2">Densité</th>
                        <th className="text-left py-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.keywords.slice(0, 15).map((keyword, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{keyword.word}</td>
                          <td className="py-2">{keyword.count}</td>
                          <td className="py-2">{keyword.density.toFixed(2)}%</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              keyword.isRecommended 
                                ? 'bg-green-100 text-green-800' 
                                : keyword.density > 5 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {keyword.isRecommended ? 'Optimal' : keyword.density > 5 ? 'Trop élevé' : 'Faible'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Analyse de lisibilité
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Score de lisibilité</span>
                    <span className="font-semibold">{analysis.readability.score}/100 ({analysis.readability.level})</span>
                  </div>
                  
                  {analysis.readability.improvements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                        Suggestions d'amélioration
                      </h4>
                      <ul className="space-y-1">
                        {analysis.readability.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            • {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

              {analysis.suggestions.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommandations SEO</h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default KeywordDensityAnalyzer;
