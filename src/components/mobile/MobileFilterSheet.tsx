
import React from 'react';
import { FilterState } from '../../types/Tool';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const categories = ['Analyse de mots-clés', 'Analyse technique', 'Optimisation contenu', 'Suivi performances'];
const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
const popularTags = ['gratuit', 'rapide', 'api', 'export', 'temps-réel'];

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    const newLevels = checked
      ? [...filters.levels, level]
      : filters.levels.filter(l => l !== level);
    onFilterChange({ ...filters, levels: newLevels });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    onFilterChange({ ...filters, tags: newTags });
  };

  const activeFiltersCount = filters.categories.length + filters.levels.length + filters.tags.length + (filters.minRating > 0 ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <SheetTitle>Filtres</SheetTitle>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                disabled={activeFiltersCount === 0}
              >
                Effacer
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto pb-20">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Catégories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-3">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Niveau</h3>
            <div className="space-y-3">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-3">
                  <Checkbox
                    id={level}
                    checked={filters.levels.includes(level)}
                    onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                  />
                  <label htmlFor={level} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              Note minimale: {filters.minRating}★
            </h3>
            <Slider
              value={[filters.minRating]}
              onValueChange={([value]) => onFilterChange({ ...filters, minRating: value })}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tags populaires</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer transition-all duration-200 active:scale-95"
                  onClick={() => handleTagChange(tag, !filters.tags.includes(tag))}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Appliquer les filtres
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
