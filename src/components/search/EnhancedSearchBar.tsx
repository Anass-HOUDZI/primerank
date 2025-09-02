import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { allTools } from '../../data/tools';
import { popularTags } from '../../data/tools';
import { Link } from 'react-router-dom';

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
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-completion suggestions
  const suggestions = useMemo(() => {
    if (!value.trim()) return [];

    const query = value.toLowerCase();
    const matches = [];

    // Search in tools
    allTools.forEach(tool => {
      const searchString = `${tool.name} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase();
      if (searchString.includes(query)) {
        matches.push({
          type: 'tool',
          item: tool,
          score: tool.name.toLowerCase().includes(query) ? 10 : 
                 tool.tags.some(tag => tag.toLowerCase().includes(query)) ? 5 : 1
        });
      }
    });

    // Search in tags
    popularTags.forEach(tag => {
      if (tag.toLowerCase().includes(query)) {
        matches.push({
          type: 'tag',
          item: tag,
          score: tag.toLowerCase().startsWith(query) ? 8 : 3
        });
      }
    });

    // Sort by score and limit results
    return matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [value]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            const suggestion = suggestions[selectedIndex];
            if (suggestion.type === 'tool') {
              window.location.href = suggestion.item.href;
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
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, suggestions, selectedIndex, onChange]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'tool') {
      window.location.href = suggestion.item.href;
    } else {
      onChange(suggestion.item);
    }
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`} ref={resultsRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm pl-10 pr-10 py-3 text-sm transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.type}-${suggestion.type === 'tool' ? suggestion.item.id : suggestion.item}`}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  index === selectedIndex 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.type === 'tool' ? (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <suggestion.item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{suggestion.item.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{suggestion.item.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      Outil
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                      <Search className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">#{suggestion.item}</p>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      Tag
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};