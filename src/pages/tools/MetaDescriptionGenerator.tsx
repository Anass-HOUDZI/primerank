
import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Copy, Star, Target } from 'lucide-react';
import { OfflineToolsEngine, MetaDescription } from '@/lib/offline-tools';
import { ClientStorage } from '@/lib/client-storage';

const MetaDescriptionGenerator = () => {
  const [content, setContent] = useState('');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [generated, setGenerated] = useState<MetaDescription[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDescriptions = useCallback(async () => {
    if (!content.trim() || !primaryKeyword.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le contenu et le mot-clé principal",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulation d'un délai pour UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const keywords = secondaryKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const descriptions = OfflineToolsEngine.generateMetaDescription(
        content,
        primaryKeyword,
        keywords
      );

      setGenerated(descriptions);
      ClientStorage.saveToolResult('meta-descriptions', descriptions);

      toast({
        title: "Descriptions générées",
        description: `${descriptions.length} méta descriptions créées avec succès`
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les descriptions",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [content, primaryKeyword, secondaryKeywords, toast]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copié",
        description: "Méta description copiée dans le presse-papiers"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le texte",
        variant: "destructive"
      });
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!generated.length) return;

    let exportData: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'csv':
        exportData = 'Description,Longueur,Score,CTA,Émotionnel\n' +
          generated.map(desc => 
            `"${desc.text}",${desc.length},${desc.score},${desc.cta ? 'Oui' : 'Non'},${desc.emotional ? 'Oui' : 'Non'}`
          ).join('\n');
        filename = 'meta-descriptions.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        exportData = JSON.stringify(generated, null, 2);
        filename = 'meta-descriptions.json';
        mimeType = 'application/json';
        break;
      default:
        exportData = generated.map((desc, index) => 
          `Méta Description ${index + 1} (Score: ${desc.score}/100)\n${desc.text}\n`
        ).join('\n');
        filename = 'meta-descriptions.txt';
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
      description: `Descriptions téléchargées au format ${format.toUpperCase()}`
    });
  };

  return (
    <ToolLayout
      title="Générateur de Méta Descriptions"
      description="Créez des méta descriptions optimisées pour améliorer votre CTR dans les résultats de recherche"
      icon={<FileText />}
      category="optimize"
      relatedTools={[
        {
          title: "Analyseur de Densité",
          description: "Analysez la densité de vos mots-clés",
          href: "/tools/keyword-density-analyzer",
          icon: <Target />
        }
      ]}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Contenu de la page
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Décrivez le contenu principal de votre page..."
              rows={4}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mot-clé principal *
            </label>
            <Input
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              placeholder="ex: SEO, marketing digital, recettes..."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mots-clés secondaires (optionnel)
            </label>
            <Input
              value={secondaryKeywords}
              onChange={(e) => setSecondaryKeywords(e.target.value)}
              placeholder="mot1, mot2, mot3..."
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Séparez les mots-clés par des virgules</p>
          </div>

          <Button 
            onClick={generateDescriptions}
            disabled={!content.trim() || !primaryKeyword.trim() || isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? 'Génération...' : 'Générer les Méta Descriptions'}
          </Button>
        </div>

        <ResultsDisplay
          title="Méta descriptions générées"
          data={generated.length > 0 ? generated : null}
          loading={isGenerating}
          onExport={handleExport}
        >
          {generated.length > 0 && (
            <div className="space-y-4">
              {generated.map((description, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">
                        Description #{index + 1}
                      </span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(description.score / 20) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {description.score}/100
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(description.text)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copier
                    </Button>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg leading-relaxed p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      {description.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Longueur:</span>
                      <div className={`font-medium ${
                        description.length >= 150 && description.length <= 160 
                          ? 'text-green-600' 
                          : description.length >= 140 && description.length <= 170
                          ? 'text-orange-600'
                          : 'text-red-600'
                      }`}>
                        {description.length} caractères
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">Densité mot-clé:</span>
                      <div className="font-medium">
                        {description.keywordDensity.toFixed(1)}%
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">Call-to-Action:</span>
                      <div className={`font-medium ${description.cta ? 'text-green-600' : 'text-gray-400'}`}>
                        {description.cta ? 'Oui' : 'Non'}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">Émotionnel:</span>
                      <div className={`font-medium ${description.emotional ? 'text-green-600' : 'text-gray-400'}`}>
                        {description.emotional ? 'Oui' : 'Non'}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default MetaDescriptionGenerator;
