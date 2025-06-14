
import React from 'react';
import { Tool } from '../../types/Tool';
import ModernToolCard from '../ModernToolCard';

interface ToolsGridProps {
  toolsByCategory: { [key: string]: Tool[] };
  onUseTool: (toolId: string) => void;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ toolsByCategory, onUseTool }) => {
  return (
    <div className="space-y-12">
      {Object.entries(toolsByCategory).map(([category, tools]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ModernToolCard
                key={tool.id}
                tool={tool}
                onUse={onUseTool}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsGrid;
