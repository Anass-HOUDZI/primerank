
import React from 'react';
import { FilterState } from '../types/Tool';
import { categories, levels, popularTags } from '../data/tools';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onClose,
  resultCount
}) => {
  const handleCategoryChange = (category: string) => {
    if (category === 'Toutes') {
      onFilterChange({ ...filters, categories: [] });
    } else {
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category];
      onFilterChange({ ...filters, categories: newCategories });
    }
  };

  const handleLevelChange = (level: string) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter(l => l !== level)
      : [...filters.levels, level];
    onFilterChange({ ...filters, levels: newLevels });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const clearAllFilters = () => {
    onFilterChange({
      searchQuery: filters.searchQuery,
      categories: [],
      levels: [],
      tags: [],
      minRating: 0,
      sortBy: filters.sortBy
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.levels.length > 0 || 
    filters.tags.length > 0 || 
    filters.minRating > 0;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results count and clear filters */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">{resultCount} outils trouvés</span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Effacer tout
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">📂 Catégories principales</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const isSelected = category === 'Toutes' 
                  ? filters.categories.length === 0 
                  : filters.categories.includes(category);
                
                return (
                  <label key={category} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Level */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">🎯 Niveau requis</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <label key={level} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.levels.includes(level)}
                    onChange={() => handleLevelChange(level)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">🏷️ Tags populaires</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">⭐ Évaluation minimale</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 0].map((rating) => (
                <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => onFilterChange({ ...filters, minRating: rating })}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-700 ml-1">
                      {rating === 0 ? 'Toutes' : `${rating}+`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
