
import React, { useState, useMemo } from 'react';
import { Tool, FilterState, ViewMode } from '../types/Tool';
import { allTools } from '../data/tools';
import ToolsHeader from '../components/ToolsHeader';
import FilterSidebar from '../components/FilterSidebar';
import ToolCard from '../components/ToolCard';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    levels: [],
    analysisTypes: [],
    resultTypes: [],
    tags: [],
    minRating: 0,
    sortBy: 'popularity'
  });

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    let filtered = allTools.filter(tool => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDescription = tool.description.toLowerCase().includes(query);
        const matchesTags = tool.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesCategory = tool.category.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDescription && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(tool.category)) {
        return false;
      }

      // Levels
      if (filters.levels.length > 0 && !filters.levels.includes(tool.level)) {
        return false;
      }

      // Analysis types
      if (filters.analysisTypes.length > 0) {
        const hasMatchingType = filters.analysisTypes.some(type => 
          tool.analysisType.includes(type)
        );
        if (!hasMatchingType) return false;
      }

      // Result types
      if (filters.resultTypes.length > 0) {
        const hasMatchingResult = filters.resultTypes.some(type => 
          tool.resultType.includes(type)
        );
        if (!hasMatchingResult) return false;
      }

      // Tags
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          tool.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      // Rating
      if (filters.minRating > 0 && tool.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popularity':
          return b.usageCount - a.usageCount;
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'fastest':
          // Simple approximation based on execution time
          const aTime = parseInt(a.executionTime.match(/\d+/)?.[0] || '60');
          const bTime = parseInt(b.executionTime.match(/\d+/)?.[0] || '60');
          return aTime - bTime;
        case 'difficulty':
          const levelOrder = { 'Débutant': 0, 'Intermédiaire': 1, 'Avancé': 2 };
          return levelOrder[a.level] - levelOrder[b.level];
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const handleToggleFavorite = (toolId: string) => {
    console.log('Toggle favorite for tool:', toolId);
    // In a real app, this would update the tool's favorite status
  };

  const handleUseTool = (toolId: string) => {
    console.log('Use tool:', toolId);
    // In a real app, this would navigate to the tool's page
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          {(filters.categories.length > 0 || filters.levels.length > 0 || filters.tags.length > 0 || filters.minRating > 0) && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filtres actifs:</h3>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map(category => (
                  <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {category}
                    <button 
                      onClick={() => setFilters({
                        ...filters, 
                        categories: filters.categories.filter(c => c !== category)
                      })}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.levels.map(level => (
                  <span key={level} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {level}
                    <button 
                      onClick={() => setFilters({
                        ...filters, 
                        levels: filters.levels.filter(l => l !== level)
                      })}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                    #{tag}
                    <button 
                      onClick={() => setFilters({
                        ...filters, 
                        tags: filters.tags.filter(t => t !== tag)
                      })}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    ⭐ {filters.minRating}+
                    <button 
                      onClick={() => setFilters({ ...filters, minRating: 0 })}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tools grid/list */}
          {filteredAndSortedTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun outil trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou effacez les filtres.
              </p>
              <button
                onClick={() => setFilters({
                  searchQuery: '',
                  categories: [],
                  levels: [],
                  analysisTypes: [],
                  resultTypes: [],
                  tags: [],
                  minRating: 0,
                  sortBy: 'popularity'
                })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Effacer tous les filtres
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  viewMode={viewMode}
                  onToggleFavorite={handleToggleFavorite}
                  onUse={handleUseTool}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
