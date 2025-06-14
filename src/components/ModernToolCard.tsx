
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Zap } from 'lucide-react';
import { Tool } from '../types/Tool';
import { Badge } from '@/components/ui/badge';

interface ModernToolCardProps {
  tool: Tool;
  onUse: (toolId: string) => void;
}

const ModernToolCard = ({ tool, onUse }: ModernToolCardProps) => {
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Analyse':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
          badge: 'ANALYSE',
          badgeColor: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700',
          textGradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent'
        };
      case 'Optimisation':
        return {
          gradient: 'from-emerald-500 to-green-600',
          bgGradient: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
          badge: 'OPTIMISATION',
          badgeColor: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700',
          textGradient: 'bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent'
        };
      case 'Suivi':
        return {
          gradient: 'from-purple-500 to-violet-600',
          bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
          badge: 'SUIVI',
          badgeColor: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700',
          textGradient: 'bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent'
        };
      case 'Technique':
        return {
          gradient: 'from-orange-500 to-red-600',
          bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
          badge: 'TECHNIQUE',
          badgeColor: 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700',
          textGradient: 'bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent'
        };
      default:
        return {
          gradient: 'from-violet-500 to-blue-600',
          bgGradient: 'from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20',
          badge: 'AUTRE',
          badgeColor: 'bg-gradient-to-r from-violet-500 to-blue-600 text-white hover:text-white',
          textGradient: 'bg-gradient-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent'
        };
    }
  };

  const config = getCategoryConfig(tool.category);

  return (
    <div className="group relative">
      {/* Card principale */}
      <div className="card-modern p-0 overflow-hidden group-hover:scale-105 transition-all duration-500">
        {/* Header avec gradient */}
        <div className={`relative h-24 bg-gradient-to-br ${config.bgGradient} overflow-hidden`}>
          {/* Effets décoratifs */}
          <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-700" />
          
          {/* Badge catégorie */}
          <div className="absolute top-4 right-4">
            <Badge className={`${config.badgeColor} font-bold text-xs px-2 py-1 animate-scale-in transition-all duration-300`}>
              {config.badge}
            </Badge>
          </div>

          {/* Badge nouveau */}
          {tool.isNew && (
            <div className="absolute top-0 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow-lg animate-pulse">
              NOUVEAU
            </div>
          )}
        </div>

        {/* Contenu principal */}
        <div className="p-6 relative">
          {/* Icône avec effet moderne */}
          <div className="relative mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 p-4 shadow-large group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
              {React.createElement(tool.icon as any, { 
                className: 'w-full h-full text-white' 
              })}
            </div>
            
            {/* Indicateur de popularité */}
            {tool.usageCount > 1000 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Titre et description */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-gradient transition-all duration-300">
              {tool.name}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {tool.description}
            </p>
          </div>

          {/* Fonctionnalités clés */}
          <div className="space-y-2 mb-6">
            {tool.features?.slice(0, 3).map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mr-3 group-hover:scale-125 transition-transform" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Métriques */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{tool.executionTime}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                <span>{tool.rating?.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Bouton d'action */}
          {tool.href ? (
            <Link
              to={tool.href}
              onClick={() => onUse(tool.id)}
              className={`w-full bg-gradient-to-br from-violet-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-all duration-300 group-hover:shadow-glow hover:scale-105 interactive-scale relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center">
                Utiliser l'outil
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Effet de shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-3 px-4 rounded-xl font-medium cursor-not-allowed opacity-60"
            >
              Bientôt disponible
            </button>
          )}
        </div>

        {/* Effet de lueur au survol */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" 
             style={{ background: `linear-gradient(135deg, ${config.gradient.split(' ')[1]} 0%, ${config.gradient.split(' ')[3]} 100%)` }} />
      </div>
    </div>
  );
};

export default ModernToolCard;
