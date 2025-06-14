
import { useState, useMemo } from 'react';
import { Tool, FilterState, ViewMode } from '../types/Tool';

export const useToolFilters = (allTools: Tool[]) => {
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
  }, [allTools, filters]);

  // Group tools by category for better display
  const toolsByCategory = useMemo(() => {
    const groups: { [key: string]: Tool[] } = {};
    filteredAndSortedTools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredAndSortedTools]);

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      levels: [],
      analysisTypes: [],
      resultTypes: [],
      tags: [],
      minRating: 0,
      sortBy: 'popularity'
    });
  };

  return {
    viewMode,
    setViewMode,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,
    filteredAndSortedTools,
    toolsByCategory,
    clearAllFilters
  };
};
