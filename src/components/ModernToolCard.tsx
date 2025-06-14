
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import { Tool } from '../types/Tool';
import { useNavigate } from 'react-router-dom';

interface ModernToolCardProps {
  tool: Tool;
  onUse: (toolId: string) => void;
}

const ModernToolCard = ({ tool, onUse }: ModernToolCardProps) => {
  const navigate = useNavigate();

  const handleUse = () => {
    navigate(tool.href);
    onUse(tool.id);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Avancé': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            {tool.isNew && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Nouveau
              </Badge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {tool.description}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{tool.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{tool.usageCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{tool.executionTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Badge className={getLevelColor(tool.level)}>
          {tool.level}
        </Badge>
        
        <Button onClick={handleUse} className="bg-blue-600 hover:bg-blue-700">
          Utiliser l'outil
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {tool.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default ModernToolCard;
