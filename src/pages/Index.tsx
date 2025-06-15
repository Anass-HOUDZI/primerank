
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allTools } from '../data/tools';
import HeroSection from '../components/HeroSection';
import FilterSidebar from '../components/FilterSidebar';
import ToolsHeader from '../components/ToolsHeader';
import ActiveFilters from '../components/filters/ActiveFilters';
import EmptyState from '../components/filters/EmptyState';
import ToolsGrid from '../components/tools/ToolsGrid';
import { MobileToolCard } from '../components/mobile/MobileToolCard';
import { MobileFilterSheet } from '../components/mobile/MobileFilterSheet';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
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
    <div className="px-4 space-y-6">
      {/* Mobile Search and Filter Header */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher un outil..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileFilterOpen(true)}
          className="px-3 py-3 rounded-xl"
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
  );

  const renderDesktopContent = () => (
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
  );

  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero Section - hidden on mobile for better UX */}
        {!isMobile && <HeroSection />}

        {/* Main Content */}
        {isMobile ? renderMobileContent() : renderDesktopContent()}
      </div>
    </MobileOptimizedLayout>
  );
};

export default Index;
