
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Suite d'Outils SEO
            <span className="text-yellow-300"> Gratuits</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Analysez, optimisez et surveillez votre référencement avec notre collection complète d'outils SEO professionnels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Voir tous les outils
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rapide & Efficace</h3>
              <p className="text-blue-100">Obtenez des résultats en quelques secondes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Gratuit</h3>
              <p className="text-blue-100">Aucune limitation, aucun abonnement</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Résultats Professionnels</h3>
              <p className="text-blue-100">Qualité agence à portée de tous</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
