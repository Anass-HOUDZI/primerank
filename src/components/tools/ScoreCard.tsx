
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'green' | 'orange' | 'red' | 'blue';
  className?: string;
}

export const ScoreCard = ({
  title,
  score,
  maxScore = 100,
  description,
  icon,
  trend,
  trendValue,
  color,
  className
}: ScoreCardProps) => {
  const getScoreColor = (score: number, maxScore: number) => {
    if (color) return color;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'orange';
    return 'red';
  };

  const scoreColor = getScoreColor(score, maxScore);
  const percentage = (score / maxScore) * 100;

  const colorClasses = {
    green: {
      bg: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-600 dark:text-green-400',
      progress: 'bg-green-500'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/20',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-600 dark:text-orange-400',
      progress: 'bg-orange-500'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-600 dark:text-red-400',
      progress: 'bg-red-500'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-600 dark:text-blue-400',
      progress: 'bg-blue-500'
    }
  };

  const colors = colorClasses[scoreColor];

  return (
    <Card className={cn(
      'p-6 transition-all hover:shadow-md',
      colors.bg,
      colors.border,
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={cn('p-2 rounded-lg', colors.bg)}>
              {React.cloneElement(icon as React.ReactElement, {
                className: cn('w-5 h-5', colors.text)
              })}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={cn(
            'flex items-center text-sm',
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          )}>
            <span className="mr-1">
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
            </span>
            {trendValue}
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="flex items-end space-x-2 mb-3">
        <span className={cn('text-3xl font-bold', colors.text)}>
          {score}
        </span>
        <span className="text-lg text-gray-500 dark:text-gray-400 mb-1">
          / {maxScore}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn('h-2 rounded-full transition-all duration-500', colors.progress)}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>0</span>
        <span>{percentage.toFixed(0)}%</span>
        <span>{maxScore}</span>
      </div>
    </Card>
  );
};
