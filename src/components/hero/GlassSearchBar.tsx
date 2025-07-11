
import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface GlassSearchBarProps {
  onSearch: (query: string) => void;
}

export const GlassSearchBar: React.FC<GlassSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    'Analyser la vitesse de mon site',
    'Vérifier mes backlinks',
    'Optimiser mes mots-clés',
    'Audit SEO complet'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center bg-white/10 backdrop-blur-md border-2 rounded-2xl transition-all duration-300 ${
          isFocused 
            ? 'border-purple-400/50 shadow-2xl shadow-purple-500/25 bg-white/15' 
            : 'border-white/20 hover:border-white/30'
        }`}>
          <Search className={`w-6 h-6 ml-6 transition-colors ${
            isFocused ? 'text-purple-400' : 'text-gray-400'
          }`} />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Que souhaitez-vous analyser aujourd'hui ?"
            className="w-full px-6 py-5 text-lg text-white placeholder-gray-400 bg-transparent border-none outline-none"
          />
          
          <button
            type="submit"
            className="mr-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-200 hover:scale-105 group"
          >
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden animate-scale-in">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300 font-medium">Suggestions populaires</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion);
                }}
                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-3 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
