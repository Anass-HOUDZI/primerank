
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTools } from '../data/tools';
import RevolutionaryHero from '../components/hero/RevolutionaryHero';
import FilterSidebar from '../components/FilterSidebar';
import ToolsHeader from '../components/ToolsHeader';
import ActiveFilters from '../components/filters/ActiveFilters';
import EmptyState from '../components/filters/EmptyState';
import ToolsGrid from '../components/tools/ToolsGrid';
import { MobileToolCard } from '../components/mobile/MobileToolCard';
import { MobileFilterSheet } from '../components/mobile/MobileFilterSheet';
import { Footer } from '../components/Footer';
import { useToolFilters } from '../hooks/useToolFilters';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    viewMode,
    setViewMode,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,
    filteredAndSortedTools,
    toolsByCategory,
    clearAllFilters
  } = useToolFilters(allTools);

  const handleToggleFavorite = (toolId: string) => {
    console.log('Toggle favorite for tool:', toolId);
  };

  const handleUseTool = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  const renderMobileContent = () => (
    <div className="space-y-6">
      {/* Hero Section révolutionnaire sur mobile */}
      <div className="min-h-screen relative">
        <RevolutionaryHero />
        {isMobile && <div className="h-16" />}
      </div>

        <div className="px-4 space-y-4">
          {/* Mobile Search and Filter Header */}
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher un outil..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/60"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="px-3 py-3 rounded-xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

        {/* Active filters for mobile */}
        <ActiveFilters filters={filters} onFilterChange={setFilters} />

        {/* Mobile Tools Grid */}
        {filteredAndSortedTools.length === 0 ? (
          <EmptyState onClearFilters={clearAllFilters} />
        ) : (
          <div className="space-y-6 pb-20">
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category}>
                <h2 className="text-xl font-bold text-white mb-4">
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
        )}

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={clearAllFilters}
        />
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <>
      {/* Hero Section révolutionnaire */}
      <RevolutionaryHero />

      <div className="bg-white dark:bg-gray-900" id="tools-section">
        {/* Header */}
        <ToolsHeader
          searchQuery={filters.searchQuery}
          onSearchChange={(query) => setFilters({ ...filters, searchQuery: query })}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={filters.sortBy}
          onSortChange={(sortBy) => setFilters({ ...filters, sortBy })}
          onToggleFilters={() => setIsFilterOpen(!isFilterOpen)}
          totalResults={filteredAndSortedTools.length}
          totalTools={allTools.length}
        />

        {/* Main content */}
        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            resultCount={filteredAndSortedTools.length}
          />

          {/* Main content area */}
          <main className="flex-1 p-6">
            {/* Active filters display */}
            <ActiveFilters filters={filters} onFilterChange={setFilters} />

            {/* Tools grid by category or empty state */}
            {filteredAndSortedTools.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <ToolsGrid 
                toolsByCategory={toolsByCategory} 
                onUseTool={handleUseTool} 
              />
            )}
          </main>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {isMobile ? renderMobileContent() : renderDesktopContent()}
      <Footer />
    </div>
  );
};

export default Index;
