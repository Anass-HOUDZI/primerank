
import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  tags: string[];
  rating: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  isFavorite?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  usageCount?: number;
  features?: string[];
  executionTime?: string;
  href?: string;
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  levels: string[];
  tags: string[];
  minRating: number;
  sortBy: 'name' | 'rating' | 'category' | 'newest';
}

export type ViewMode = 'grid' | 'list';

export interface ToolsByCategory {
  [category: string]: Tool[];
}
