
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Heart, ExternalLink, Crown } from 'lucide-react';
import { Tool, ViewMode } from '../types/Tool';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ToolCardProps {
  tool: Tool;
  viewMode: ViewMode;
  onToggleFavorite: (toolId: string) => void;
  onUse: (toolId: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, viewMode, onToggleFavorite, onUse }) => {
  const isListView = viewMode === 'list';
  
  const cardContent = (
    <Card className={`
      group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 
      ${isListView ? 'p-4' : 'p-6'}
      ${tool.isPremium ? 'ring-2 ring-yellow-400/50' : ''}
    `}>
      {/* Premium badge */}
      {tool.isPremium && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      {/* New badge */}
      {tool.isNew && (
        <div className="absolute top-2 left-2">
          <Badge variant="default" className="bg-green-500 text-white text-xs">
            Nouveau
          </Badge>
        </div>
      )}

      <div className={`${isListView ? 'flex items-center' : 'text-center'}`}>
        {/* Icon */}
        <div className={`${isListView ? 'mr-4' : 'mb-4'}`}>
          <div className={`
            flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg
            ${isListView ? 'w-12 h-12' : 'w-16 h-16 mx-auto'}
          `}>
            <tool.icon className={isListView ? 'w-6 h-6' : 'w-8 h-8'} />
          </div>
        </div>

        {/* Content */}
        <div className={`${isListView ? 'flex-1' : ''}`}>
          <div className={`${isListView ? 'flex items-center justify-between' : ''}`}>
            <div className={`${isListView ? '' : 'mb-4'}`}>
              <h3 className={`font-bold text-gray-900 dark:text-white ${isListView ? 'text-lg' : 'text-xl mb-2'}`}>
                {tool.name}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 ${isListView ? 'text-sm' : 'text-base mb-4'}`}>
                {tool.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.tags.slice(0, isListView ? 2 : 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {tool.tags.length > (isListView ? 2 : 3) && (
                  <Badge variant="outline" className="text-xs">
                    +{tool.tags.length - (isListView ? 2 : 3)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className={`${isListView ? 'ml-4' : ''}`}>
              <div className={`flex items-center justify-between ${isListView ? 'flex-col space-y-2' : 'mb-4'}`}>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>Instantané</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(tool.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className={`w-4 h-4 ${tool.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onUse(tool.id);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                size={isListView ? "sm" : "default"}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Utiliser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <Link to={`/tools/${tool.id}`} className="block">
      {cardContent}
    </Link>
  );
};

export default ToolCard;
