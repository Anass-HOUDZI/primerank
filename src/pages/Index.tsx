
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
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  
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
      <GlobalHeader 
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => setFilters({ ...filters, searchQuery: query })}
      />
      
      <main className="flex-1">
        {/* Hero Section */}
        <RevolutionaryHero />

        {/* Tools Section */}
        <div className="bg-background" id="tools-section">
          <div className="container max-w-screen-2xl mx-auto px-4 py-8">
            {/* Simplified Filter */}
            <SimplifiedFilter
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearAllFilters}
              isOpen={filterOpen}
              onToggle={() => setFilterOpen(!filterOpen)}
              resultCount={filteredAndSortedTools.length}
            />

            {/* Tools Grid */}
            {filteredAndSortedTools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Aucun outil trouvé</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Effacer les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTools.map((tool) => (
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
