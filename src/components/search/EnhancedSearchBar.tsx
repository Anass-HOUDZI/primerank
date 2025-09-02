import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { allTools } from '../../data/tools';
import { popularTags } from '../../data/tools';
import { useNavigate } from 'react-router-dom';

interface EnhancedSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher un outil...",
  className = ""
}) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [query, setQuery] = useState(value || '');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrage et suggestions intelligentes
  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Recherche dans les outils
    const toolMatches = allTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) || 
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.category.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ).slice(0, 6);

    results.push(...toolMatches.map(tool => ({
      type: 'tool',
      item: {
        name: tool.name,
        description: tool.description,
        category: tool.category,
        href: `/tools/${tool.id}`
      }
    })));

    // Recherche dans les tags populaires
    const tagMatches = popularTags.filter(tag => 
      tag.toLowerCase().includes(searchTerm)
    ).slice(0, 3);

    results.push(...tagMatches.map(tag => ({
      type: 'tag',
      item: tag
    })));

    return results.slice(0, 8);
  }, [query]);

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            const suggestion = suggestions[selectedIndex];
            if (suggestion.type === 'tool') {
              navigate(suggestion.item.href);
            } else {
              onChange(suggestion.item);
            }
          }
          break;
        case 'Escape':
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFocused, suggestions, selectedIndex, onChange, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'tool') {
      navigate(suggestion.item.href);
    } else {
      onChange(suggestion.item);
    }
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    onChange('');
    inputRef.current?.focus();
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${
                  index === selectedIndex
                    ? 'bg-purple-100 dark:bg-purple-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.type === 'tool' ? (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {highlightMatch(suggestion.item.name, query)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {highlightMatch(suggestion.item.description, query)}
                      </p>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        {suggestion.item.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">#</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {highlightMatch(suggestion.item, query)}
                    </span>
                    <span className="text-xs text-gray-500">Tag</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};