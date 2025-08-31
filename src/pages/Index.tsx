
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTools } from '../data/tools';
import RevolutionaryHero from '../components/hero/RevolutionaryHero';
import { SimplifiedFilter } from '../components/filters/SimplifiedFilter';
import { EnhancedToolCard } from '../components/tools/EnhancedToolCard';
import { EnhancedSearchBar } from '../components/search/EnhancedSearchBar';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { GlobalFooter } from '../components/layout/GlobalFooter';
import { useToolFilters } from '../hooks/useToolFilters';
import { useIsMobile } from '../hooks/use-mobile';
import { usePageOptimization } from '../hooks/usePageOptimization';
import { usePagePreloading } from '../components/optimization/LazyPageLoader';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Optimisations de performance pour la page d'accueil
  const { cacheData, getCachedData } = usePageOptimization({
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableResourcePreloading: true,
    enableCacheOptimization: true,
  });

  // Préchargement des pages populaires
  usePagePreloading('/');
  
  const {
    filters,
    setFilters,
    filteredAndSortedTools,
    clearAllFilters
  } = useToolFilters(allTools);

  const handleUseTool = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader showSearch={false} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <RevolutionaryHero />

        {/* Tools Section - Mobile First Layout */}
        <div className="bg-background" id="tools-section">
          <div className="container max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
            {/* Mobile-First Filter */}
            <SimplifiedFilter
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearAllFilters}
              isOpen={filterOpen}
              onToggle={() => setFilterOpen(!filterOpen)}
              resultCount={filteredAndSortedTools.length}
            />

            {/* Mobile-Optimized Tools Grid */}
            {filteredAndSortedTools.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">Aucun outil trouvé</p>
                <Button 
                  onClick={clearAllFilters} 
                  variant="outline"
                  className="touch-manipulation min-h-[44px]"
                >
                  Effacer les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredAndSortedTools.map((tool, index) => (
                  <EnhancedToolCard
                    key={tool.id}
                    tool={tool}
                    onUse={handleUseTool}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Index;
