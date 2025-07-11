
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Download, Eye, AlertCircle, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CocoonNode {
  id: string;
  keyword: string;
  level: number;
  parent?: string;
  children: string[];
  searchVolume: number;
  difficulty: number;
}

const SemanticCocoonV1 = () => {
  const [mainKeyword, setMainKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cocoonData, setCocoonData] = useState<CocoonNode[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const generateCocoon = async () => {
    if (!mainKeyword.trim()) {
      setError('Veuillez entrer un mot-clé principal');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Simulation de génération de cocon sémantique
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockCocoon: CocoonNode[] = [
        {
          id: '1',
          keyword: mainKeyword,
          level: 0,
          children: ['2', '3', '4'],
          searchVolume: 8900,
          difficulty: 75
        },
        {
          id: '2',
          keyword: `${mainKeyword} guide`,
          level: 1,
          parent: '1',
          children: ['5', '6'],
          searchVolume: 2100,
          difficulty: 45
        },
        {
          id: '3',
          keyword: `${mainKeyword} outils`,
          level: 1,
          parent: '1',
          children: ['7', '8'],
          searchVolume: 1800,
          difficulty: 52
        },
        {
          id: '4',
          keyword: `${mainKeyword} formation`,
          level: 1,
          parent: '1',
          children: ['9', '10'],
          searchVolume: 1500,
          difficulty: 38
        },
        {
          id: '5',
          keyword: `${mainKeyword} guide débutant`,
          level: 2,
          parent: '2',
          children: [],
          searchVolume: 890,
          difficulty: 28
        },
        {
          id: '6',
          keyword: `${mainKeyword} guide avancé`,
          level: 2,
          parent: '2',
          children: [],
          searchVolume: 650,
          difficulty: 42
        },
        {
          id: '7',
          keyword: `${mainKeyword} outils gratuits`,
          level: 2,
          parent: '3',
          children: [],
          searchVolume: 720,
          difficulty: 35
        },
        {
          id: '8',
          keyword: `${mainKeyword} outils payants`,
          level: 2,
          parent: '3',
          children: [],
          searchVolume: 480,
          difficulty: 58
        },
        {
          id: '9',
          keyword: `${mainKeyword} formation en ligne`,
          level: 2,
          parent: '4',
          children: [],
          searchVolume: 560,
          difficulty: 32
        },
        {
          id: '10',
          keyword: `${mainKeyword} certification`,
          level: 2,
          parent: '4',
          children: [],
          searchVolume: 380,
          difficulty: 45
        }
      ];

      setCocoonData(mockCocoon);
      toast({
        title: "Cocon sémantique généré",
        description: `${mockCocoon.length} mots-clés organisés sur 3 niveaux`,
      });
    } catch (err) {
      setError('Erreur lors de la génération du cocon sémantique');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportCocoon = () => {
    const jsonData = JSON.stringify(cocoonData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cocon-semantique-${mainKeyword.replace(/\s+/g, '-')}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'bg-green-500';
    if (difficulty < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty < 30) return 'Facile';
    if (difficulty < 60) return 'Moyen';
    return 'Difficile';
  };

  const getNodesByLevel = (level: number) => 
    cocoonData.filter(node => node.level === level);

  return (
    <ToolLayout
      title="Générateur de Cocons Sémantiques V1"
      description="Créez automatiquement des cocons sémantiques structurés pour optimiser votre référencement"
      icon={<Layers className="w-6 h-6" />}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mot-clé Principal
              </label>
              <Input
                placeholder="Ex: référencement naturel, marketing digital..."
                value={mainKeyword}
                onChange={(e) => setMainKeyword(e.target.value)}
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
              onClick={generateCocoon}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Network className="w-4 h-4 mr-2" />
                  Générer le Cocon Sémantique
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {cocoonData.length > 0 && (
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  Structure du Cocon Sémantique
                </h3>
                <Button onClick={exportCocoon} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter JSON
                </Button>
              </div>

              {/* Level 0 - Root */}
              {getNodesByLevel(0).map(node => (
                <div key={node.id} className="text-center">
                  <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl shadow-lg">
                    <div className="font-bold text-lg">{node.keyword}</div>
                    <div className="text-sm opacity-90">{node.searchVolume.toLocaleString()} recherches/mois</div>
                  </div>
                </div>
              ))}

              {/* Level 1 - Main Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getNodesByLevel(1).map(node => (
                  <div key={node.id} className="text-center">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md">
                      <div className="font-semibold">{node.keyword}</div>
                      <div className="text-sm opacity-90 flex items-center justify-center space-x-2 mt-2">
                        <span>{node.searchVolume.toLocaleString()}</span>
                        <Badge className={`${getDifficultyColor(node.difficulty)} text-white text-xs`}>
                          {getDifficultyText(node.difficulty)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Level 2 - Sub-categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {getNodesByLevel(2).map(node => (
                  <div key={node.id}>
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-sm">
                      <div className="font-medium text-sm">{node.keyword}</div>
                      <div className="text-xs opacity-90 flex items-center justify-between mt-2">
                        <span>{node.searchVolume.toLocaleString()}</span>
                        <Badge className={`${getDifficultyColor(node.difficulty)} text-white text-xs`}>
                          {node.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{cocoonData.length}</div>
                  <div className="text-sm text-gray-600">Mots-clés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Niveaux</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {cocoonData.reduce((sum, node) => sum + node.searchVolume, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Volume total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(cocoonData.reduce((sum, node) => sum + node.difficulty, 0) / cocoonData.length)}
                  </div>
                  <div className="text-sm text-gray-600">Difficulté moy.</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default SemanticCocoonV1;
