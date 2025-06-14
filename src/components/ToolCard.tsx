
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart, Bookmark, ExternalLink } from 'lucide-react';
import { Tool, ViewMode } from '../types/Tool';

interface ToolCardProps {
  tool: Tool;
  viewMode: ViewMode;
  onToggleFavorite: (toolId: string) => void;
  onUse: (toolId: string) => void;
}

const ToolCard = ({ tool, viewMode, onToggleFavorite, onUse }: ToolCardProps) => {
  const isListView = viewMode === 'list';
  
  const cardContent = (
    <>
      {/* Icône */}
      <div className={`
        ${isListView ? 'mr-4' : 'mb-4'}
        ${tool.isNew ? 'relative' : ''}
      `}>
        <div className={`
          flex items-center justify-center rounded-lg
          ${isListView ? 'w-12 h-12' : 'w-16 h-16'}
          ${tool.category === 'Analyse' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
            tool.category === 'Optimisation' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
            tool.category === 'Suivi' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
            'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'}
        `}>
          {React.createElement(tool.icon as any, { 
            className: isListView ? 'w-6 h-6' : 'w-8 h-8'
          })}
        </div>
        {tool.isNew && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className={`flex-1 ${isListView ? '' : ''}`}>
        {/* Header */}
        <div className={`${isListView ? 'flex items-start justify-between' : ''}`}>
          <div className={isListView ? 'flex-1' : ''}>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
            </div>
            
            <p className={`text-gray-600 dark:text-gray-300 ${isListView ? 'text-sm' : ''}`}>
              {tool.description}
            </p>
          </div>

          {/* Actions (en list view) */}
          {isListView && (
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(tool.id);
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-4 h-4 ${tool.isFavorite ? 'fill-current text-red-500' : ''}`} />
              </button>
              
              {tool.href && (
                <Link
                  to={tool.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUse(tool.id);
                  }}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Utiliser
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Métadonnées */}
        <div className={`${isListView ? 'mt-2' : 'mt-4'}`}>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{tool.executionTime}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{tool.usageCount.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span>{tool.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Tags */}
          {!isListView && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tool.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {tool.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                  +{tool.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions (en grid view) */}
        {!isListView && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(tool.id);
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-4 h-4 ${tool.isFavorite ? 'fill-current text-red-500' : ''}`} />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {tool.href && (
              <Link
                to={tool.href}
                onClick={(e) => {
                  e.stopPropagation();
                  onUse(tool.id);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Utiliser maintenant
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );

  if (tool.href) {
    return (
      <Link 
        to={tool.href}
        className={`
          group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
          hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200
          ${isListView ? 'flex items-center p-4' : 'p-6'}
          cursor-pointer
        `}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`
      group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
      hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200
      ${isListView ? 'flex items-center p-4' : 'p-6'}
    `}>
      {cardContent}
    </div>
  );
};

export default ToolCard;
