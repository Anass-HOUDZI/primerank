
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSecurity } from '@/hooks/useSecurity';
import { DataSanitizer } from '@/lib/security';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Rechercher un outil ou une fonction..." 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { validateInput, logSecurityEvent } = useSecurity('search-bar');

  const mockSuggestions = [
    'Analyseur de vitesse',
    'Vérificateur de structure',
    'Générateur de mots-clés',
    'analyser vitesse site',
    'améliorer SEO',
    'site trop lent',
    'optimiser contenu'
  ];

  useEffect(() => {
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className={`relative flex items-center bg-white border-2 rounded-xl transition-all duration-200 ${
        isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <Search className="w-5 h-5 text-gray-400 ml-4" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            const validation = validateInput(e.target.value);
            if (validation.valid && validation.sanitized) {
              onChange(validation.sanitized);
            } else {
              logSecurityEvent('invalid_search_input', { 
                input: e.target.value.slice(0, 20), 
                error: validation.error 
              }, 'low');
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-1 mr-3 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-gray-400" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
