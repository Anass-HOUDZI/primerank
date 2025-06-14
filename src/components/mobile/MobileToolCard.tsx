
import React from 'react';
import { Tool } from '../../types/Tool';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { useTouchGestures } from '../../hooks/useTouchGestures';

interface MobileToolCardProps {
  tool: Tool;
  onUse: (toolId: string) => void;
  onFavorite?: (toolId: string) => void;
}

export const MobileToolCard: React.FC<MobileToolCardProps> = ({ 
  tool, 
  onUse,
  onFavorite 
}) => {
  const touchGestures = useTouchGestures({
    onTap: () => onUse(tool.id),
    onLongPress: () => onFavorite?.(tool.id),
    onSwipeLeft: () => onFavorite?.(tool.id),
  });

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 active:scale-95 touch-manipulation"
      {...touchGestures}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-active:opacity-100 transition-opacity duration-200" />
      
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              {React.cloneElement(tool.icon as React.ReactElement, {
                className: "w-5 h-5"
              })}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {tool.category}
              </p>
            </div>
          </div>
          
          {/* Quick action button */}
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(tool.id);
            }}
          >
            <Star className="w-4 h-4" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800"
            >
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{tool.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{tool.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Instantané</span>
            </div>
          </div>
          
          <Button
            size="sm"
            className="h-7 px-3 text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={(e) => {
              e.stopPropagation();
              onUse(tool.id);
            }}
          >
            Utiliser
          </Button>
        </div>
      </div>

      {/* Touch feedback indicator */}
      <div className="absolute bottom-1 right-1 opacity-0 group-active:opacity-100 transition-opacity duration-200">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      </div>
    </Card>
  );
};
