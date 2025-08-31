
import React from 'react';
import { Search, Star, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            24 outils SEO gratuits et professionnels
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Suite <span className="bg-gradient-to-r from-[#2525bd] to-[#dd0d2f] bg-clip-text text-transparent">PrimeRank</span>
            <br />
            Complète et Gratuite
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Optimisez votre référencement naturel avec notre collection d'outils professionnels. 
            Analyse de mots-clés, audit technique, suivi de positions et bien plus encore.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToTools}
              size="lg"
              className="bg-gradient-to-r from-[#2525bd] to-[#dd0d2f] hover:from-[#2525bd]/90 hover:to-[#dd0d2f]/90 text-white px-8 py-4 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Découvrir les outils
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-gray-400"
            >
              <Shield className="w-5 h-5 mr-2" />
              100% Gratuit
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Rapide et Efficace
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Résultats instantanés avec nos algorithmes optimisés
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sécurisé et Privé
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vos données restent confidentielles et sécurisées
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Qualité Professionnelle
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Outils utilisés par les experts SEO du monde entier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
