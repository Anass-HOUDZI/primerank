
import React from 'react';
import { FilterState } from '../../types/Tool';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun outil trouvé</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Essayez de modifier vos critères de recherche ou effacez les filtres.
      </p>
      <button
        onClick={onClearFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Effacer tous les filtres
      </button>
    </div>
  );
};

export default EmptyState;
