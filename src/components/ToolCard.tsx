
import React from 'react';
import { Tool } from '../types/Tool';
import { Star, Heart, ExternalLink, Eye } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  viewMode: 'grid' | 'list';
  onToggleFavorite: (toolId: string) => void;
  onUse: (toolId: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, viewMode, onToggleFavorite, onUse }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-300">
        <div className="text-2xl mr-4">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
            {tool.isNew && (
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Nouveau</span>
            )}
            {tool.isTrending && (
              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Tendance</span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{tool.description}</p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{tool.rating}</span>
          </div>
          <div className="text-sm text-gray-500">{tool.usageCount.toLocaleString()} uses</div>
          <button
            onClick={() => onUse(tool.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Utiliser
          </button>
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`p-2 rounded-lg transition-colors ${
              tool.isFavorite 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${tool.isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{tool.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {tool.category}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                {tool.level}
              </span>
              {tool.isNew && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Nouveau
                </span>
              )}
              {tool.isTrending && (
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  🔥 Tendance
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(tool.id)}
          className={`p-2 rounded-lg transition-colors ${
            tool.isFavorite 
              ? 'text-red-500 hover:bg-red-50' 
              : 'text-gray-400 hover:bg-gray-50 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${tool.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🎯 Fonctionnalités principales:</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {tool.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-1 text-gray-600">
              <span className="text-green-500">✓</span>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">📊 Métadonnées:</h4>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span>{tool.usageCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{tool.executionTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{tool.rating}/5</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUse(tool.id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Utiliser maintenant
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Eye className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToolCard;
