
import React from 'react';
import { ArrowRight, Zap, Shield, Clock, Globe, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricsCard } from '@/components/dashboard/MetricsCard';

const HeroSection = () => {
  const metrics = [
    {
      title: 'Outils Disponibles',
      value: '24+',
      change: '+3 ce mois',
      changeType: 'positive' as const,
      icon: Zap,
      gradient: 'from-blue-500 to-purple-600',
      description: 'Suite complète d\'outils SEO'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '2.1K',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Communauté grandissante'
    },
    {
      title: 'Analyses Effectuées',
      value: '45K+',
      change: '+8% cette semaine',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600',
      description: 'Analyses SEO réalisées'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/20 overflow-hidden">
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Principal */}
        <div className="text-center space-y-8 mb-16">
          {/* Badge avec animation */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-modern border border-white/20 dark:border-gray-700/20 shadow-soft animate-scale-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              🚀 Suite SEO gratuite - 100% Open Source
            </span>
          </div>

          {/* Titre principal avec gradient */}
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold">
              <span className="text-gradient">Suite SEO</span>
              <br />
              <span className="text-gray-900 dark:text-white">Professionnelle</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              24 outils SEO gratuits et puissants pour analyser, optimiser et suivre 
              vos performances dans les moteurs de recherche
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              className="btn-modern text-white px-8 py-4 text-lg font-semibold group"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 interactive-scale"
            >
              <Globe className="mr-2 w-5 h-5" />
              Voir la démo
            </Button>
          </div>

          {/* Points clés avec animations */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Résultats instantanés</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span>Sans inscription</span>
            </div>
          </div>
        </div>

        {/* Métriques avec cartes modernes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={metric.title}
              className="animate-slide-up"
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              <MetricsCard {...metric} />
            </div>
          ))}
        </div>

        {/* Call to action final */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow mb-6 animate-pulse-glow">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Prêt à booster votre SEO ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Découvrez nos outils ci-dessous et commencez à optimiser votre site web dès maintenant
          </p>
        </div>
      </div>

      {/* Effet de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </div>
  );
};

export default HeroSection;
