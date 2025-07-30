import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '../../data/tools';
import { FilterState } from '../../types/Tool';

interface SimplifiedFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  resultCount: number;
}

export const SimplifiedFilter: React.FC<SimplifiedFilterProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
  resultCount
}) => {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           (filters.searchQuery ? 1 : 0) + 
           (filters.minRating > 0 ? 1 : 0);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="h-9"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Effacer
            </Button>
          )}
        </div>
        
        <span className="text-sm text-muted-foreground">
          {resultCount} outil{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.searchQuery && (
            <Badge variant="outline" className="h-7">
              Recherche: "{filters.searchQuery}"
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.categories.map(category => (
            <Badge key={category} variant="outline" className="h-7">
              {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {filters.minRating > 0 && (
            <Badge variant="outline" className="h-7">
              Note min: {filters.minRating}⭐
              <button
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Options */}
      {isOpen && (
        <div className="space-y-4 border-t border-border/30 pt-4">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-sm mb-3">Catégories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => cat !== 'Toutes').map(category => (
                <Button
                  key={category}
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  size="xs"
                  onClick={() => handleCategoryToggle(category)}
                  className="h-8 text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-medium text-sm mb-3">Note minimale</h3>
            <div className="flex space-x-2">
              {[0, 4, 4.5, 4.8].map(rating => (
                <Button
                  key={rating}
                  variant={filters.minRating === rating ? "default" : "outline"}
                  size="xs"
                  onClick={() => onFilterChange({ ...filters, minRating: rating })}
                  className="h-8 text-xs"
                >
                  {rating === 0 ? 'Toutes' : `${rating}⭐+`}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};