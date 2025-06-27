
import { useState, useMemo } from 'react';
import { Tool, FilterState, ViewMode, ToolsByCategory } from '../types/Tool';

const initialFilters: FilterState = {
  searchQuery: '',
  categories: [],
  levels: [],
  tags: [],
  minRating: 0,
  sortBy: 'name'
};

export const useToolFilters = (tools: Tool[]) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!tool.name.toLowerCase().includes(query) && 
            !tool.description.toLowerCase().includes(query) &&
            !tool.tags.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(tool.category)) {
        return false;
      }

      // Level filter
      if (filters.levels.length > 0 && !filters.levels.includes(tool.level)) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => tool.tags.includes(tag))) {
        return false;
      }

      // Rating filter
      if (tool.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort tools
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tools, filters]);

  const toolsByCategory = useMemo(() => {
    const grouped: ToolsByCategory = {};
    filteredAndSortedTools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });
    return grouped;
  }, [filteredAndSortedTools]);

  const clearAllFilters = () => {
    setFilters(initialFilters);
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
