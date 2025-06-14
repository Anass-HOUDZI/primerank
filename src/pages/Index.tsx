
import React from 'react';
import { allTools } from '../data/tools';
import HeroSection from '../components/HeroSection';
import FilterSidebar from '../components/FilterSidebar';
import ToolsHeader from '../components/ToolsHeader';
import ActiveFilters from '../components/filters/ActiveFilters';
import EmptyState from '../components/filters/EmptyState';
import ToolsGrid from '../components/tools/ToolsGrid';
import { useToolFilters } from '../hooks/useToolFilters';

const Index = () => {
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
    console.log('Use tool:', toolId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Tools Section */}
      <div className="bg-white dark:bg-gray-900">
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
    </div>
  );
};

export default Index;
