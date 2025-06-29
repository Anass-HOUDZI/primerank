
import React, { useState } from 'react';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
import { Star, Heart, Search } from 'lucide-react';
import { allTools } from '../data/tools';
import { MobileToolCard } from '../components/mobile/MobileToolCard';
import ToolsGrid from '../components/tools/ToolsGrid';
import { useIsMobile } from '../hooks/use-mobile';

const Favorites = () => {
  const isMobile = useIsMobile();
  const [favoriteTools] = useState(allTools.slice(0, 6)); // Simuler quelques favoris

  const handleUseTool = (toolId: string) => {
    window.location.href = `/tools/${toolId}`;
  };

  const handleToggleFavorite = (toolId: string) => {
    console.log('Toggle favorite for tool:', toolId);
  };

  const toolsByCategory = favoriteTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof allTools>);

  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mes Favoris
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Retrouvez ici tous vos outils préférés
            </p>
          </div>

          {favoriteTools.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Aucun favori pour le moment
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Cliquez sur l'étoile de vos outils préférés pour les retrouver ici
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Découvrir les outils
              </button>
            </div>
          ) : (
            /* Favorites Grid */
            <div>
              {isMobile ? (
                <div className="space-y-8">
                  {Object.entries(toolsByCategory).map(([category, tools]) => (
                    <div key={category}>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {category}
                      </h2>
                      <div className="grid gap-4">
                        {tools.map((tool) => (
                          <MobileToolCard
                            key={tool.id}
                            tool={tool}
                            onUse={handleUseTool}
                            onFavorite={handleToggleFavorite}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ToolsGrid 
                  toolsByCategory={toolsByCategory} 
                  onUseTool={handleUseTool} 
                />
              )}
            </div>
          )}
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default Favorites;
