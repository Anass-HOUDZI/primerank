
import React, { useState, useEffect } from 'react';
import { Search, Star, Zap, Shield, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCounter } from './StatsCounter';
import { GlassSearchBar } from './GlassSearchBar';

const RevolutionaryHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-3xl animate-float"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-2xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400/25 to-purple-400/25 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero badge avec animation */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 animate-scale-in">
            <Star className="w-5 h-5 mr-3 text-yellow-400 animate-pulse" />
            <span className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              24 Outils SEO Révolutionnaires
            </span>
          </div>

          {/* Titre principal avec effet de dégradé animé */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Suite SEO
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] mt-2">
              Nouvelle Génération
            </span>
          </h1>

          {/* Sous-titre avec effet de typing */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Révolutionnez votre SEO avec des outils d'IA avancés, des analyses en temps réel 
            et des insights prédictifs qui transforment votre stratégie digitale.
          </p>

          {/* Statistiques animées */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <StatsCounter end={50000} duration={2000} />
              <p className="text-gray-400 mt-2">Analyses réalisées</p>
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <StatsCounter end={15000} duration={2500} />
              <p className="text-gray-400 mt-2">Utilisateurs actifs</p>
              <Users className="w-6 h-6 text-blue-400 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.9★</div>
              <p className="text-gray-400 mt-2">Note moyenne</p>
              <Award className="w-6 h-6 text-yellow-400 mx-auto mt-1" />
            </div>
          </div>

          {/* Barre de recherche glassmorphism */}
          <div className="mb-12">
            <GlassSearchBar onSearch={() => scrollToTools()} />
          </div>

          {/* Boutons CTA avec effets avancés */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              onClick={scrollToTools}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <Search className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Commencer l'Analyse
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              100% Gratuit
            </Button>
          </div>

          {/* Fonctionnalités avec animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
            {[
              {
                icon: Zap,
                title: "IA Révolutionnaire",
                description: "Analyses prédictives avec machine learning avancé",
                gradient: "from-yellow-400 to-orange-500",
                delay: "0s"
              },
              {
                icon: Shield,
                title: "Sécurité Absolue",
                description: "Chiffrement end-to-end et conformité RGPD",
                gradient: "from-green-400 to-emerald-500",
                delay: "0.2s"
              },
              {
                icon: Star,
                title: "Performance Elite",
                description: "Résultats instantanés avec précision professionnelle",
                gradient: "from-purple-400 to-pink-500",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                  <feature.icon className="w-10 h-10 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Rapproché des CTAs */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default RevolutionaryHero;
