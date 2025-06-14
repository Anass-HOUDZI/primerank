
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Filter } from 'lucide-react';
import { FilterState } from '../types/Tool';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose, resultCount }: FilterSidebarProps) => {
  const categories = ['Recherche de mots-clés', 'Analyse technique', 'Analyse de backlinks', 'Optimisation de contenu'];
  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
  const tags = ['SERP', 'mots-clés', 'backlinks', 'vitesse', 'contenu', 'méta description'];

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

  const clearAllFilters = () => {
    onFilterChange({
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto">
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={onClose} />
      
      <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl lg:relative lg:w-64 lg:shadow-none overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Catégories</Label>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Niveau</Label>
              <div className="space-y-2">
                {levels.map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={filters.levels.includes(level)}
                      onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                    />
                    <Label htmlFor={level} className="text-sm">{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Tags</Label>
              <div className="space-y-2">
                {tags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={filters.tags.includes(tag)}
                      onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                    />
                    <Label htmlFor={tag} className="text-sm">#{tag}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={clearAllFilters} className="w-full">
                Effacer tous les filtres
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              {resultCount} outil{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
