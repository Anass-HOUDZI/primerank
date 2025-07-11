
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PremiumCategoryCardProps {
  title: string;
  description: string;
  toolCount: number;
  imageSrc: string;
  gradient: string;
  href: string;
  badge?: string;
  popular?: boolean;
}

export const PremiumCategoryCard: React.FC<PremiumCategoryCardProps> = ({
  title,
  description,
  toolCount,
  imageSrc,
  gradient,
  href,
  badge,
  popular
}) => {
  return (
    <Link to={href} className="group block">
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Image de fond avec overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
          
          {/* Badge populaire */}
          {popular && (
            <div className="absolute top-4 right-4 flex items-center px-3 py-1 bg-yellow-400/90 backdrop-blur-sm rounded-full">
              <Sparkles className="w-3 h-3 text-yellow-800 mr-1" />
              <span className="text-xs font-bold text-yellow-800">POPULAIRE</span>
            </div>
          )}

          {/* Badge de statut */}
          {badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-xs font-semibold text-white">{badge}</span>
            </div>
          )}

          {/* Effet shine au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
              {title}
            </h3>
            <div className="flex items-center text-sm text-gray-400">
              <span>{toolCount} outils</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Bouton d'action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
              <span className="text-sm font-medium">Explorer</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Indicateur de progression */}
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* Effet de lueur au survol */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  );
};
