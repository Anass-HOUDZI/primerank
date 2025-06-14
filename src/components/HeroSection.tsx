
import React from 'react';
import { Search, Star, TrendingUp, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Outils <span className="text-blue-600">SEO</span>{' '}
            <span className="text-green-500">Gratuits</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Découvrez une suite complète de 24 outils SEO gratuits conçus pour propulser 
            votre site au sommet des résultats de recherche. De l'analyse technique à 
            l'optimisation sémantique, en passant par le netlinking, nous avons ce qu'il 
            vous faut.
          </p>
          
          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Search className="w-4 h-4 mr-2" />
              Mots-clés & SEO
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              Sémantique
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Technique
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Netlinking
            </span>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Outils gratuits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Utilisations illimitées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">0€</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">100% gratuit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">&lt; 2s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Temps de réponse</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
