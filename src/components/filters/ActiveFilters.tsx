
import React from 'react';
import { FilterState } from '../../types/Tool';

interface ActiveFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onFilterChange }) => {
  const hasActiveFilters = filters.categories.length > 0 || 
    filters.levels.length > 0 || 
    filters.tags.length > 0 || 
    filters.minRating > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filtres actifs:</h3>
      <div className="flex flex-wrap gap-2">
        {filters.categories.map(category => (
          <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {category}
            <button 
              onClick={() => onFilterChange({
                ...filters, 
                categories: filters.categories.filter(c => c !== category)
              })}
              className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              ×
            </button>
          </span>
        ))}
        {filters.levels.map(level => (
          <span key={level} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {level}
            <button 
              onClick={() => onFilterChange({
                ...filters, 
                levels: filters.levels.filter(l => l !== level)
              })}
              className="ml-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
            >
              ×
            </button>
          </span>
        ))}
        {filters.tags.map(tag => (
          <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            #{tag}
            <button 
              onClick={() => onFilterChange({
                ...filters, 
                tags: filters.tags.filter(t => t !== tag)
              })}
              className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
            >
              ×
            </button>
          </span>
        ))}
        {filters.minRating > 0 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⭐ {filters.minRating}+
            <button 
              onClick={() => onFilterChange({ ...filters, minRating: 0 })}
              className="ml-2 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
