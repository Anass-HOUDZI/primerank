
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ModernCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  href?: string;
  isPremium?: boolean;
  isNew?: boolean;
  onClick?: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  icon: Icon,
  title,
  description,
  category,
  href,
  isPremium,
  isNew,
  onClick
}) => {
  const getCategoryColor = (cat: string) => {
    const colors = {
      'Analyse de mots-clés': 'from-purple-500 to-violet-600',
      'Analyse technique': 'from-blue-500 to-indigo-600',
      'Architecture sémantique': 'from-cyan-500 to-teal-600',
      'Analyse de backlinks': 'from-pink-500 to-rose-600',
      'Intégrations APIs': 'from-emerald-500 to-green-600',
      'default': 'from-slate-500 to-gray-600'
    };
    return colors[cat as keyof typeof colors] || colors.default;
  };

  const cardContent = (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            PRO
          </span>
        </div>
      )}

      {/* New Badge */}
      {isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            NOUVEAU
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Icon with gradient background */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} p-3 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-full h-full text-white" />
        </div>

        {/* Title and Category */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getCategoryColor(category)} text-white opacity-80`}>
              {category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>

        {/* Action Button */}
        <button 
          onClick={onClick}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r ${getCategoryColor(category)} text-white hover:shadow-lg hover:scale-105 active:scale-95`}
        >
          Utiliser l'outil
        </button>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getCategoryColor(category)} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

export const ModernGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {children}
  </div>
);

export const ModernSection: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => (
  <section className={`space-y-6 ${className}`}>
    <h2 className="text-2xl font-bold text-white">
      {title}
    </h2>
    {children}
  </section>
);
