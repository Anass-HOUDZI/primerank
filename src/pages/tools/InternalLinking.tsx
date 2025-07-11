
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LinkingOpportunity {
  sourcePage: string;
  targetPage: string;
  anchorText: string;
  relevanceScore: number;
  context: string;
}

const InternalLinking = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [opportunities, setOpportunities] = useState<LinkingOpportunity[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const analyzeInternalLinking = async () => {
    if (!websiteUrl.trim()) {
      setError('Veuillez entrer une URL de site web valide');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Simulation d'analyse de maillage interne
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockOpportunities: LinkingOpportunity[] = [
        {
          sourcePage: '/blog/seo-guide',
          targetPage: '/services/seo-audit',
          anchorText: 'audit SEO professionnel',
          relevanceScore: 95,
          context: 'Pour optimiser votre SEO, considérez un audit SEO professionnel...'
        },
        {
          sourcePage: '/blog/content-marketing',
          targetPage: '/blog/seo-guide',
          anchorText: 'guide SEO complet',
          relevanceScore: 88,
          context: 'Consultez notre guide SEO complet pour plus de détails...'
        },
        {
          sourcePage: '/services',
          targetPage: '/case-studies',
          anchorText: 'études de cas',
          relevanceScore: 82,
          context: 'Découvrez nos études de cas pour voir nos résultats...'
        },
        {
          sourcePage: '/blog/technical-seo',
          targetPage: '/tools/sitemap-generator',
          anchorText: 'générateur de sitemap',
          relevanceScore: 78,
          context: 'Utilisez notre générateur de sitemap pour améliorer...'
        },
      ];

      setOpportunities(mockOpportunities);
      toast({
        title: "Analyse terminée",
        description: `${mockOpportunities.length} opportunités de maillage trouvées`,
      });
    } catch (err) {
      setError('Erreur lors de l\'analyse du maillage interne');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Bon';
    return 'Faible';
  };

  return (
    <ToolLayout
      title="Opportunités de Maillage Interne"
      description="Identifiez automatiquement les meilleures opportunités de liens internes pour votre site"
      icon={<Link className="w-6 h-6" />}
      category="optimize"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL du Site Web
              </label>
              <Input
                placeholder="https://monsite.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
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
              onClick={analyzeInternalLinking}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Analyser le Maillage Interne
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {opportunities.length > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Opportunités de Maillage ({opportunities.length})
                </h3>
              </div>

              <div className="space-y-4">
                {opportunities.map((opportunity, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Score and Pages */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${getScoreColor(opportunity.relevanceScore)} text-white`}
                          >
                            {opportunity.relevanceScore}% - {getScoreText(opportunity.relevanceScore)}
                          </Badge>
                        </div>
                      </div>

                      {/* Link Details */}
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Depuis:</span> 
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            {opportunity.sourcePage}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Vers:</span> 
                          <span className="ml-2 text-green-600 dark:text-green-400">
                            {opportunity.targetPage}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Texte d'ancrage suggéré:</span> 
                          <span className="ml-2 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {opportunity.anchorText}
                          </span>
                        </div>
                      </div>

                      {/* Context */}
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                        <span className="font-medium">Contexte:</span> {opportunity.context}
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

export default InternalLinking;
