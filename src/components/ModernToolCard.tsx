
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Tool } from '../types/Tool';

interface ModernToolCardProps {
  tool: Tool;
  onUse: (toolId: string) => void;
}

const ModernToolCard = ({ tool, onUse }: ModernToolCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Analyse':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'Optimisation':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'Suivi':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'Technique':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          text: 'text-orange-600 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800',
          button: 'bg-orange-600 hover:bg-orange-700'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          text: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Analyse': return 'POPULAIRE';
      case 'Optimisation': return 'SÉMANTIQUE';
      case 'Suivi': return 'SUIVI';
      case 'Technique': return 'TECHNIQUE';
      default: return category.toUpperCase();
    }
  };

  const colors = getCategoryColor(tool.category);

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 ${colors.border} hover:shadow-lg transition-all duration-300 group overflow-hidden`}>
      {/* Category Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full`}>
        {getCategoryLabel(tool.category)}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Icon */}
        <div className={`w-16 h-16 ${colors.bg} ${colors.text} rounded-xl flex items-center justify-center mb-4`}>
          {React.createElement(tool.icon as any, { className: 'w-8 h-8' })}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
          {tool.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {tool.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
              {feature}
            </div>
          ))}
        </div>

        {/* Action Button */}
        {tool.href ? (
          <Link
            to={tool.href}
            onClick={() => onUse(tool.id)}
            className={`w-full ${colors.button} text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-all duration-200 group-hover:translate-y-[-2px]`}
          >
            Utiliser →
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-xl font-medium flex items-center justify-center cursor-not-allowed"
          >
            Bientôt disponible
          </button>
        )}
      </div>

      {/* New Badge */}
      {tool.isNew && (
        <div className="absolute top-0 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg">
          NOUVEAU
        </div>
      )}
    </div>
  );
};

export default ModernToolCard;
