
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, TrendingUp, Eye, Globe, Smartphone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SERPResult {
  position: number;
  title: string;
  url: string;
  description: string;
  domain: string;
  isAd: boolean;
  features: string[];
}

interface SERPComparison {
  keyword1: string;
  keyword2: string;
  location: string;
  device: string;
  results1: SERPResult[];
  results2: SERPResult[];
  similarity: number;
  commonDomains: string[];
  uniqueDomains1: string[];
  uniqueDomains2: string[];
  intentionMatch: number;
}

const SERPComparator = () => {
  const [formData, setFormData] = useState({
    keyword1: '',
    keyword2: '',
    location: 'France',
    device: 'desktop',
    language: 'fr'
  });
  const [results, setResults] = useState<SERPComparison | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!formData.keyword1.trim() || !formData.keyword2.trim()) {
      alert('Veuillez saisir les deux mots-clés à comparer');
      return;
    }

    setLoading(true);
    
    // Simulation d'une analyse SERP
    setTimeout(() => {
      const mockResults: SERPComparison = {
        keyword1: formData.keyword1,
        keyword2: formData.keyword2,
        location: formData.location,
        device: formData.device,
        results1: generateMockSERPResults(formData.keyword1),
        results2: generateMockSERPResults(formData.keyword2),
        similarity: Math.floor(Math.random() * 40) + 30, // 30-70%
        commonDomains: ['example.com', 'wikipedia.org', 'test-site.fr'],
        uniqueDomains1: ['unique1.com', 'special1.fr'],
        uniqueDomains2: ['unique2.com', 'special2.fr'],
        intentionMatch: Math.floor(Math.random() * 30) + 60 // 60-90%
      };
      
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  };

  const generateMockSERPResults = (keyword: string): SERPResult[] => {
    const domains = ['example.com', 'wikipedia.org', 'test-site.fr', 'demo.com', 'sample.org'];
    return Array.from({ length: 10 }, (_, i) => ({
      position: i + 1,
      title: `Résultat ${i + 1} pour "${keyword}" - Guide complet`,
      url: `https://${domains[i % domains.length]}/page-${i + 1}`,
      description: `Description détaillée du résultat ${i + 1} concernant ${keyword}. Découvrez tout ce qu'il faut savoir sur ce sujet avec nos experts.`,
      domain: domains[i % domains.length],
      isAd: i < 2 && Math.random() > 0.7,
      features: Math.random() > 0.5 ? ['featured_snippet'] : []
    }));
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    console.log(`Exporting SERP comparison in ${format} format`, results);
  };

  const relatedTools = [
    {
      title: 'Vérificateur de Positions',
      description: 'Surveillez vos positions sur Google',
      href: '/tools/rank-checker',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      title: 'Générateur de Mots-clés',
      description: 'Découvrez de nouveaux mots-clés',
      href: '/tools/keyword-generator',
      icon: <Eye className="w-4 h-4" />
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <ToolLayout
      title="Comparateur de SERP"
      description="Comparez les résultats de recherche entre différents mots-clés pour analyser l'intention de recherche et identifier les opportunités de positionnement."
      icon={<TrendingUp className="w-6 h-6" />}
      category="research"
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Formulaire d'analyse */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration de l'analyse
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="keyword1">Premier mot-clé</Label>
                <Input
                  id="keyword1"
                  placeholder="Ex: chaussures running"
                  value={formData.keyword1}
                  onChange={(e) => setFormData({ ...formData, keyword1: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="keyword2">Deuxième mot-clé</Label>
                <Input
                  id="keyword2"
                  placeholder="Ex: baskets sport"
                  value={formData.keyword2}
                  onChange={(e) => setFormData({ ...formData, keyword2: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Localisation</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Belgique">Belgique</SelectItem>
                    <SelectItem value="Suisse">Suisse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="device">Appareil</Label>
                <Select value={formData.device} onValueChange={(value) => setFormData({ ...formData, device: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablette</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Analyse en cours...' : 'Comparer les SERP'}
          </Button>
        </Card>

        {/* Résultats */}
        <ResultsDisplay
          title="Comparaison des SERP"
          data={results}
          loading={loading}
          onExport={handleExport}
        >
          {results && (
            <div className="space-y-6">
              {/* Métriques de similarité */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.similarity}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Similarité des SERP
                  </div>
                  <Progress value={results.similarity} className="mt-2" />
                </Card>
                
                <Card className="p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.intentionMatch}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Correspondance d'intention
                  </div>
                  <Progress value={results.intentionMatch} className="mt-2" />
                </Card>
                
                <Card className="p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {results.commonDomains.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Domaines communs
                  </div>
                </Card>
              </div>

              {/* Analyse des domaines */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Analyse des domaines
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">
                      Domaines communs ({results.commonDomains.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {results.commonDomains.map((domain, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                      Uniques à "{results.keyword1}" ({results.uniqueDomains1.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {results.uniqueDomains1.map((domain, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Uniques à "{results.keyword2}" ({results.uniqueDomains2.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {results.uniqueDomains2.map((domain, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Comparaison des positions */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Comparaison des résultats
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      "{results.keyword1}"
                    </h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {results.results1.slice(0, 5).map((result, index) => (
                        <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm text-blue-600 dark:text-blue-400 truncate">
                                {result.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {result.domain}
                              </div>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              #{result.position}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      "{results.keyword2}"
                    </h5>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {results.results2.slice(0, 5).map((result, index) => (
                        <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm text-blue-600 dark:text-blue-400 truncate">
                                {result.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {result.domain}
                              </div>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              #{result.position}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recommandations */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                  Recommandations stratégiques
                </h4>
                
                <div className="space-y-3">
                  {results.similarity > 70 && (
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="font-medium text-green-800 dark:text-green-200">
                        Intention similaire détectée
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Ces mots-clés ciblent une intention similaire. Vous pouvez optimiser une même page pour les deux.
                      </div>
                    </div>
                  )}
                  
                  {results.similarity < 40 && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="font-medium text-orange-800 dark:text-orange-200">
                        Intentions différentes
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                        Ces mots-clés ont des intentions différentes. Créez du contenu spécifique pour chacun.
                      </div>
                    </div>
                  )}
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="font-medium text-blue-800 dark:text-blue-200">
                      Opportunités identifiées
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Analysez les domaines présents dans les deux SERP pour identifier vos concurrents directs.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default SERPComparator;
