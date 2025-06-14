
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: string;
  description?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  gradient = 'from-blue-500 to-purple-600',
  description 
}: MetricsCardProps) => {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card className="relative overflow-hidden p-6 card-modern group hover:scale-105 transition-all duration-300">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon avec effet de glow */}
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-3 mb-4 shadow-lg group-hover:shadow-glow transition-all duration-300`}>
          <Icon className="w-full h-full text-white" />
        </div>

        {/* Contenu */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold font-display text-gradient">
              {value}
            </span>
            {change && (
              <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
                {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
              </span>
            )}
          </div>

          {description && (
            <p className="text-xs text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Animation de shimmer au survol */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>
    </Card>
  );
};
