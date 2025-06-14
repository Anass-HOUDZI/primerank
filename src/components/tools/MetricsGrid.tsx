
import React from 'react';
import { ScoreCard } from './ScoreCard';

interface Metric {
  id: string;
  title: string;
  value: number;
  maxValue?: number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'green' | 'orange' | 'red' | 'blue';
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const MetricsGrid = ({ 
  metrics, 
  columns = 3,
  className = ""
}: MetricsGridProps) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {metrics.map((metric) => (
        <ScoreCard
          key={metric.id}
          title={metric.title}
          score={metric.value}
          maxScore={metric.maxValue}
          description={metric.description}
          icon={metric.icon}
          trend={metric.trend}
          trendValue={metric.trendValue}
          color={metric.color}
        />
      ))}
    </div>
  );
};
