
import React from 'react';
import { Search, Filter, Grid, List, ArrowUpDown } from 'lucide-react';
import SearchBar from './SearchBar';
import { FilterState, ViewMode } from '../types/Tool';

interface ToolsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: FilterState['sortBy'];
  onSortChange: (sortBy: FilterState['sortBy']) => void;
  onToggleFilters: () => void;
  totalResults: number;
  totalTools: number;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onToggleFilters,
  totalResults,
  totalTools
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'rating', label: 'Note utilisateurs' },
    { value: 'alphabetical', label: 'Alphabétique' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'fastest', label: 'Plus rapides' },
    { value: 'difficulty', label: 'Difficulté' }
  ] as const;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Outils SEO</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {totalTools} outils disponibles
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Rechercher un outil ou une fonction..."
            />

            {/* Mobile filter toggle */}
            <button
              onClick={onToggleFilters}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {totalResults} outils trouvés
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsHeader;
