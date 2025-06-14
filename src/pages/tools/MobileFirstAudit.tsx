
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Smartphone, Monitor, Tablet, Zap, Eye, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface MobileAuditResult {
  url: string;
  overallScore: number;
  mobileReadiness: number;
  responseTime: number;
  usabilityScore: number;
  contentScore: number;
  technicalScore: number;
  issues: {
    critical: AuditIssue[];
    warnings: AuditIssue[];
    recommendations: AuditIssue[];
  };
  metrics: {
    viewport: boolean;
    textSize: boolean;
    touchTargets: boolean;
    contentSizing: boolean;
    flashUsage: boolean;
    popups: boolean;
  };
  performance: {
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
  };
  screenshots: {
    mobile: string;
    desktop: string;
  };
}

interface AuditIssue {
  type: 'critical' | 'warning' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  solution: string;
}

const MobileFirstAudit = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<MobileAuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!url.trim()) {
      alert('Veuillez saisir une URL à analyser');
      return;
    }

    setLoading(true);
    
    // Simulation d'un audit mobile
    setTimeout(() => {
      const mockResults: MobileAuditResult = {
        url: url,
        overallScore: Math.floor(Math.random() * 30) + 70,
        mobileReadiness: Math.floor(Math.random() * 25) + 75,
        responseTime: Math.floor(Math.random() * 2000) + 500,
        usabilityScore: Math.floor(Math.random() * 20) + 80,
        contentScore: Math.floor(Math.random() * 25) + 75,
        technicalScore: Math.floor(Math.random() * 30) + 70,
        issues: {
          critical: [
            {
              type: 'critical',
              title: 'Viewport non configuré',
              description: 'La balise viewport n\'est pas présente ou mal configurée',
              impact: 'high',
              solution: 'Ajoutez <meta name="viewport" content="width=device-width, initial-scale=1"> dans le <head>'
            }
          ],
          warnings: [
            {
              type: 'warning',
              title: 'Éléments trop petits pour le tactile',
              description: 'Certains boutons ont une taille inférieure à 48px',
              impact: 'medium',
              solution: 'Augmentez la taille des éléments interactifs à minimum 48px x 48px'
            }
          ],
          recommendations: [
            {
              type: 'recommendation',
              title: 'Optimisation des images',
              description: 'Utilisez des formats d\'image modernes pour améliorer les performances',
              impact: 'medium',
              solution: 'Convertissez vos images en WebP ou AVIF avec fallback'
            }
          ]
        },
        metrics: {
          viewport: Math.random() > 0.3,
          textSize: Math.random() > 0.2,
          touchTargets: Math.random() > 0.4,
          contentSizing: Math.random() > 0.3,
          flashUsage: Math.random() > 0.9,
          popups: Math.random() > 0.6
        },
        performance: {
          loadTime: Math.floor(Math.random() * 3000) + 1000,
          firstContentfulPaint: Math.floor(Math.random() * 2000) + 800,
          largestContentfulPaint: Math.floor(Math.random() * 1500) + 1200,
          cumulativeLayoutShift: Math.random() * 0.25
        },
        screenshots: {
          mobile: '/placeholder.svg',
          desktop: '/placeholder.svg'
        }
      };
      
      setResults(mockResults);
      setLoading(false);
    }, 3000);
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    console.log(`Exporting mobile audit in ${format} format`, results);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
    if (score >= 70) return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
  };

  const relatedTools = [
    {
      title: 'Analyseur de Vitesse PageSpeed',
      description: 'Testez les performances de votre site',
      href: '/tools/pagespeed-analyzer',
      icon: <Zap className="w-4 h-4" />
    },
    {
      title: 'Vérificateur de Structure',
      description: 'Vérifiez la structure technique',
      href: '/tools/structure-checker',
      icon: <Eye className="w-4 h-4" />
    }
  ];

  const performanceData = results ? [
    { name: 'Mobilité', score: results.mobileReadiness },
    { name: 'Utilisabilité', score: results.usabilityScore },
    { name: 'Contenu', score: results.contentScore },
    { name: 'Technique', score: results.technicalScore },
    { name: 'Performance', score: Math.max(0, 100 - (results.performance.loadTime / 50)) }
  ] : [];

  return (
    <ToolLayout
      title="Audit Mobile-First"
      description="Évaluez la compatibilité mobile de votre site web et obtenez des recommandations pour optimiser l'expérience utilisateur sur mobile."
      icon={<Smartphone className="w-6 h-6" />}
      category="technical"
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Formulaire d'audit */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            URL à analyser
          </h3>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="url">URL du site web</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://exemple.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAudit} 
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Audit en cours...' : 'Lancer l\'audit mobile'}
          </Button>
        </Card>

        {/* Résultats */}
        <ResultsDisplay
          title="Rapport d'audit mobile"
          data={results}
          loading={loading}
          onExport={handleExport}
        >
          {results && (
            <div className="space-y-6">
              {/* Score global */}
              <Card className={`p-6 ${getScoreBg(results.overallScore)}`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(results.overallScore)} mb-2`}>
                    {results.overallScore}/100
                  </div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    Score Mobile-First Global
                  </div>
                  <Progress value={results.overallScore} className="mt-4 max-w-xs mx-auto" />
                </div>
              </Card>

              {/* Métriques détaillées */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Mobilité</span>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(results.mobileReadiness)}`}>
                    {results.mobileReadiness}%
                  </div>
                  <Progress value={results.mobileReadiness} className="mt-2" />
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center mb-2">
                    <Eye className="w-5 h-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Utilisabilité</span>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(results.usabilityScore)}`}>
                    {results.usabilityScore}%
                  </div>
                  <Progress value={results.usabilityScore} className="mt-2" />
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center mb-2">
                    <Monitor className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Contenu</span>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(results.contentScore)}`}>
                    {results.contentScore}%
                  </div>
                  <Progress value={results.contentScore} className="mt-2" />
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Technique</span>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(results.technicalScore)}`}>
                    {results.technicalScore}%
                  </div>
                  <Progress value={results.technicalScore} className="mt-2" />
                </Card>
              </div>

              {/* Graphique radar des performances */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Analyse multidimensionnelle
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Métriques de compatibilité mobile */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Tests de compatibilité mobile
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(results.metrics).map(([key, passed]) => {
                    const labels = {
                      viewport: 'Configuration Viewport',
                      textSize: 'Taille du texte lisible',
                      touchTargets: 'Cibles tactiles adaptées',
                      contentSizing: 'Contenu adapté à l\'écran',
                      flashUsage: 'Absence de Flash',
                      popups: 'Popups non intrusives'
                    };
                    
                    return (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {labels[key as keyof typeof labels]}
                        </span>
                        {passed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Métriques de performance */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Métriques de performance mobile
                </h4>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {results.performance.loadTime}ms
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Temps de chargement
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {results.performance.firstContentfulPaint}ms
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      First Contentful Paint
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {results.performance.largestContentfulPaint}ms
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Largest Contentful Paint
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {results.performance.cumulativeLayoutShift.toFixed(3)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Cumulative Layout Shift
                    </div>
                  </div>
                </div>
              </Card>

              {/* Issues et recommandations */}
              <div className="space-y-4">
                {/* Issues critiques */}
                {results.issues.critical.length > 0 && (
                  <Card className="p-6 border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Problèmes critiques ({results.issues.critical.length})
                    </h4>
                    <div className="space-y-3">
                      {results.issues.critical.map((issue, index) => (
                        <div key={index} className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <div className="font-medium text-red-900 dark:text-red-100 mb-1">
                            {issue.title}
                          </div>
                          <div className="text-sm text-red-700 dark:text-red-300 mb-2">
                            {issue.description}
                          </div>
                          <div className="text-sm text-red-600 dark:text-red-400">
                            <strong>Solution:</strong> {issue.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Avertissements */}
                {results.issues.warnings.length > 0 && (
                  <Card className="p-6 border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Avertissements ({results.issues.warnings.length})
                    </h4>
                    <div className="space-y-3">
                      {results.issues.warnings.map((issue, index) => (
                        <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <div className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                            {issue.title}
                          </div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                            {issue.description}
                          </div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            <strong>Solution:</strong> {issue.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Recommandations */}
                {results.issues.recommendations.length > 0 && (
                  <Card className="p-6 border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Recommandations ({results.issues.recommendations.length})
                    </h4>
                    <div className="space-y-3">
                      {results.issues.recommendations.map((issue, index) => (
                        <div key={index} className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            {issue.title}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                            {issue.description}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Solution:</strong> {issue.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default MobileFirstAudit;
