
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
              SEO libre, 
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] mt-2">
              Succès garanti 👑
            </span>
          </h1>

          {/* Sous-titre avec effet de typing */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            La <strong className="text-white font-bold">suite SEO française</strong> qui maximise le ROI de votre visibilité organique. 
            <br />
            <strong className="text-white font-bold">24 outils professionnels gratuits</strong> conçus par des SEO exigeants 
            pour analyser, optimiser et tracker vos performances.
            <br /><br />
            <em className="text-purple-300 italic">Expertise technique démocratisée pour consultants, agences et entrepreneurs ambitieux.</em>
            <br /><br />
            <strong className="text-white font-bold">Revenue tracking, audit technique, cocons sémantiques, intégrations natives et bien plus</strong>
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

          {/* Bouton CTA centré */}
          <div className="flex justify-center mb-8">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevolutionaryHero;
