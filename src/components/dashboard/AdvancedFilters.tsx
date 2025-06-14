
import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Tag, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  category: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

export const AdvancedFilters = ({ onFilterChange, activeFilters }: AdvancedFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories = [
    {
      name: 'Catégorie',
      icon: Tag,
      options: [
        { id: 'analysis', label: 'Analyse', value: 'analysis' },
        { id: 'optimization', label: 'Optimisation', value: 'optimization' },
        { id: 'monitoring', label: 'Suivi', value: 'monitoring' },
        { id: 'technical', label: 'Technique', value: 'technical' }
      ]
    },
    {
      name: 'Niveau',
      icon: TrendingUp,
      options: [
        { id: 'beginner', label: 'Débutant', value: 'beginner' },
        { id: 'intermediate', label: 'Intermédiaire', value: 'intermediate' },
        { id: 'advanced', label: 'Avancé', value: 'advanced' }
      ]
    },
    {
      name: 'Popularité',
      icon: Users,
      options: [
        { id: 'trending', label: 'Tendance', value: 'trending' },
        { id: 'popular', label: 'Populaire', value: 'popular' },
        { id: 'new', label: 'Nouveau', value: 'new' }
      ]
    }
  ];

  const handleFilterToggle = (category: string, value: string) => {
    const currentFilters = activeFilters[category] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((f: string) => f !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...activeFilters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <Card className="card-modern p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary p-2.5 shadow-lg">
            <Filter className="w-full h-full text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">Filtres Intelligents</h3>
            <p className="text-sm text-muted-foreground">
              Trouvez exactement ce que vous cherchez
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="animate-scale-in">
              {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="interactive-scale"
          >
            <Filter className="w-4 h-4 mr-2" />
            {isExpanded ? 'Réduire' : 'Étendre'}
          </Button>
        </div>
      </div>

      {/* Recherche intelligente */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Recherche intelligente... (ex: analyse backlink débutant)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      {/* Filtres par catégorie */}
      {isExpanded && (
        <div className="space-y-6 animate-slide-up">
          {filterCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.name} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                  <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                    {category.name}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.options.map((option) => {
                    const isActive = activeFilters[category.name.toLowerCase()]?.includes(option.value);
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleFilterToggle(category.name.toLowerCase(), option.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 interactive-scale ${
                          isActive
                            ? 'bg-gradient-primary text-white shadow-glow'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filtres actifs */}
      {activeFilterCount > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Filtres actifs</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <X className="w-4 h-4 mr-1" />
              Tout effacer
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([category, values]: [string, any]) =>
              values.map((value: string) => (
                <Badge
                  key={`${category}-${value}`}
                  variant="secondary"
                  className="animate-scale-in cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => handleFilterToggle(category, value)}
                >
                  {value}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
