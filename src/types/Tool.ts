export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icon: string;
  rating: number;
  usageCount: number;
  executionTime: string;
  features: string[];
  tags: string[];
  resultType: string[];
  analysisType: string[];
  isFavorite: boolean;
  isNew: boolean;
  isTrending: boolean;
  isRecommended: boolean;
  href?: string; // Ajout du lien vers la page de l'outil
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  levels: string[];
  analysisTypes: string[];
  resultTypes: string[];
  tags: string[];
  minRating: number;
  sortBy: 'popularity' | 'rating' | 'alphabetical' | 'newest' | 'fastest' | 'difficulty';
}

export type ViewMode = 'grid' | 'list';
