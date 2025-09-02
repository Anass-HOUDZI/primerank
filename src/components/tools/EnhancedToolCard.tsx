import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tool } from '../../types/Tool';

interface EnhancedToolCardProps {
  tool: Tool;
  onUse?: (toolId: string) => void;
  className?: string;
}

export const EnhancedToolCard: React.FC<EnhancedToolCardProps> = ({ 
  tool, 
  onUse,
  className = "" 
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Analyse de mots-clés': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      'Architecture sémantique': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      'Analyse technique': 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
      'Analyse de backlinks': 'from-orange-500/20 to-red-500/20 border-orange-500/30',
      'Intégrations APIs': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500/20 to-gray-500/20 border-gray-500/30';
  };

  const getCategoryTextColor = (category: string) => {
    const colors = {
      'Analyse de mots-clés': 'text-blue-600 dark:text-blue-400',
      'Architecture sémantique': 'text-green-600 dark:text-green-400',
      'Analyse technique': 'text-purple-600 dark:text-purple-400',
      'Analyse de backlinks': 'text-orange-600 dark:text-orange-400',
      'Intégrations APIs': 'text-indigo-600 dark:text-indigo-400',
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className={`group relative ${className}`}>
      <div className={`relative overflow-hidden rounded-lg sm:rounded-xl border-2 bg-gradient-to-br ${getCategoryColor(tool.category)} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 touch-manipulation`}>
        {/* Premium Badge */}
        {tool.isPremium && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}

        {/* New Badge */}
        {tool.isNew && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse text-xs">
              Nouveau
            </Badge>
          </div>
        )}

        <div className="p-4 sm:p-6">
          {/* Header - Mobile Optimized */}
          <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${getCategoryColor(tool.category)} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <tool.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${getCategoryTextColor(tool.category)}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {tool.name}
              </h3>
              <p className={`text-xs font-medium ${getCategoryTextColor(tool.category)}`}>
                {tool.category}
              </p>
            </div>
          </div>

          {/* Description - Mobile Optimized */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
            {tool.description}
          </p>

          {/* Features - Mobile Responsive */}
          {tool.features && tool.features.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <div className="flex flex-wrap gap-1">
                {tool.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs h-5 sm:h-6">
                    {feature}
                  </Badge>
                ))}
                {tool.features.length > 2 && (
                  <Badge variant="outline" className="text-xs h-5 sm:h-6">
                    +{tool.features.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Metrics - Mobile Responsive */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{tool.rating}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{tool.usageCount?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">{tool.executionTime}</span>
                <span className="sm:hidden">2min</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs h-5">
              {tool.level}
            </Badge>
          </div>

          {/* CTA Button - Touch Optimized */}
          <Link to={tool.href} className="block">
            <Button 
              variant="cta" 
              size="sm" 
              className="w-full group-hover:scale-105 transition-transform touch-manipulation min-h-[44px] text-sm"
              onClick={() => onUse?.(tool.id)}
            >
              Utiliser l'outil
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg sm:rounded-xl" />
      </div>
    </div>
  );
};