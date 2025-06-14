
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  analysisType: string[];
  resultType: string[];
  tags: string[];
  rating: number;
  usageCount: number;
  executionTime: string;
  isNew?: boolean;
  isFavorite?: boolean;
  href: string;
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  levels: string[];
  analysisTypes: string[];
  resultTypes: string[];
  tags: string[];
  minRating: number;
  sortBy: string;
}

export type ViewMode = 'grid' | 'list';
