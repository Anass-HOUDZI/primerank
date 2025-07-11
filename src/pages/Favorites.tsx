
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, Filter, X } from 'lucide-react';
import { allTools } from '../data/tools';
import { ModernCard, ModernGrid, ModernSection } from '../components/modern/ModernDesignSystem';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '../hooks/use-mobile';

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('seo-tools-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const favoriteTools = allTools.filter(tool => favorites.includes(tool.id));
  
  const filteredTools = favoriteTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFavorite = (toolId: string) => {
    const newFavorites = favorites.filter(id => id !== toolId);
    setFavorites(newFavorites);
    localStorage.setItem('seo-tools-favorites', JSON.stringify(newFavorites));
  };

  const handleUseTool = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8 safe-area-pt">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Mes Outils Favoris
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Retrouvez rapidement vos outils SEO préférés sauvegardés
            </p>
          </div>

          {/* Search Bar */}
          <Card className="p-4 mb-8 bg-white/5 backdrop-blur-md border-white/10">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Rechercher dans vos favoris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <Card className="p-12 text-center bg-white/5 backdrop-blur-md border-white/10">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun favori pour le moment
              </h3>
              <p className="text-gray-400 mb-6">
                Ajoutez des outils à vos favoris pour les retrouver rapidement ici
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
              >
                Découvrir les outils
              </Button>
            </Card>
          ) : filteredTools.length === 0 ? (
            <Card className="p-8 text-center bg-white/5 backdrop-blur-md border-white/10">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-400">
                Essayez avec d'autres termes de recherche
              </p>
            </Card>
          ) : (
            <ModernSection title={`${filteredTools.length} outil${filteredTools.length > 1 ? 's' : ''} favori${filteredTools.length > 1 ? 's' : ''}`}>
              <ModernGrid>
                {filteredTools.map((tool) => (
                  <div key={tool.id} className="relative group">
                    <ModernCard
                      icon={tool.icon}
                      title={tool.name}
                      description={tool.description}
                      category={tool.category}
                      isPremium={tool.isPremium}
                      isNew={tool.isNew}
                      onClick={() => handleUseTool(tool.id)}
                    />
                    
                    {/* Remove from favorites button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(tool.id);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 z-10"
                      title="Retirer des favoris"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </ModernGrid>
            </ModernSection>
          )}

          {/* Statistics */}
          {favorites.length > 0 && (
            <Card className="p-6 mt-8 bg-white/5 backdrop-blur-md border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400">{favorites.length}</div>
                  <div className="text-sm text-gray-400">Outils favoris</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {new Set(favoriteTools.map(tool => tool.category)).size}
                  </div>
                  <div className="text-sm text-gray-400">Catégories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {favoriteTools.filter(tool => tool.isPremium).length}
                  </div>
                  <div className="text-sm text-gray-400">Outils premium</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default Favorites;
