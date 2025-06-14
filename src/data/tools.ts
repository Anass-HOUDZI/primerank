
import { Tool } from '../types/Tool';

export const toolsData: Tool[] = [
  {
    id: '1',
    name: 'Analyseur de Vitesse PageSpeed',
    description: 'Analysez la vitesse de chargement de votre site et obtenez des recommandations détaillées pour améliorer les performances.',
    category: 'Analyse technique',
    level: 'Débutant',
    icon: '⚡',
    rating: 4.8,
    usageCount: 2300,
    executionTime: '~30 secondes',
    features: ['Test multi-appareils', 'Export PDF', 'Analyse Core Web Vitals', 'Recommandations'],
    tags: ['gratuit', 'instantané', 'export', 'vitesse'],
    resultType: ['Score/Note', 'Rapport détaillé', 'Export PDF/Excel'],
    analysisType: ['URL/Domaine'],
    isFavorite: false,
    isNew: false,
    isTrending: true,
    isRecommended: true
  },
  {
    id: '2',
    name: 'Vérificateur de Structure',
    description: 'Vérifiez la structure de vos URLs, balises meta et optimisation technique de vos pages web.',
    category: 'Analyse technique',
    level: 'Intermédiaire',
    icon: '🔍',
    rating: 4.6,
    usageCount: 1800,
    executionTime: '~45 secondes',
    features: ['Analyse complète', 'Détection erreurs', 'Suggestions SEO', 'Export détaillé'],
    tags: ['technique', 'structure', 'meta', 'optimisation'],
    resultType: ['Rapport détaillé', 'Export PDF/Excel'],
    analysisType: ['URL/Domaine'],
    isFavorite: true,
    isNew: false,
    isTrending: false,
    isRecommended: true
  },
  {
    id: '3',
    name: 'Générateur de Mots-clés',
    description: 'Découvrez des mots-clés pertinents pour votre secteur avec volumes de recherche et difficulté.',
    category: 'Recherche mots-clés',
    level: 'Débutant',
    icon: '🎯',
    rating: 4.7,
    usageCount: 3200,
    executionTime: '~1 minute',
    features: ['Volumes de recherche', 'Analyse concurrence', 'Suggestions longue traîne', 'Export CSV'],
    tags: ['mots-clés', 'recherche', 'volumes', 'concurrence'],
    resultType: ['Export PDF/Excel', 'API disponible'],
    analysisType: ['Texte/Contenu'],
    isFavorite: false,
    isNew: true,
    isTrending: true,
    isRecommended: false
  },
  {
    id: '4',
    name: 'Optimiseur de Contenu',
    description: 'Optimisez vos textes pour le SEO en analysant la densité des mots-clés et la lisibilité.',
    category: 'Optimisation contenu',
    level: 'Intermédiaire',
    icon: '📝',
    rating: 4.5,
    usageCount: 1500,
    executionTime: '~20 secondes',
    features: ['Analyse densité', 'Score lisibilité', 'Suggestions amélioration', 'Prévisualisation SERP'],
    tags: ['contenu', 'densité', 'lisibilité', 'optimisation'],
    resultType: ['Score/Note', 'Rapport détaillé'],
    analysisType: ['Texte/Contenu'],
    isFavorite: false,
    isNew: false,
    isTrending: false,
    isRecommended: true
  },
  {
    id: '5',
    name: 'Validateur Schema Markup',
    description: 'Vérifiez et validez vos données structurées Schema.org pour améliorer votre référencement.',
    category: 'Outils techniques',
    level: 'Avancé',
    icon: '🏷️',
    rating: 4.9,
    usageCount: 950,
    executionTime: '~15 secondes',
    features: ['Validation complète', 'Détection erreurs', 'Aperçu rich snippets', 'Guide correction'],
    tags: ['schema', 'données structurées', 'rich snippets', 'technique'],
    resultType: ['Rapport détaillé'],
    analysisType: ['URL/Domaine', 'Texte/Contenu'],
    isFavorite: true,
    isNew: false,
    isTrending: false,
    isRecommended: false
  },
  {
    id: '6',
    name: 'Analyse SEO Local',
    description: 'Optimisez votre présence locale avec analyse de citations et cohérence NAP.',
    category: 'SEO local',
    level: 'Intermédiaire',
    icon: '📍',
    rating: 4.4,
    usageCount: 1200,
    executionTime: '~2 minutes',
    features: ['Analyse citations', 'Vérification NAP', 'Score visibilité locale', 'Recommandations'],
    tags: ['local', 'citations', 'NAP', 'géolocalisation'],
    resultType: ['Score/Note', 'Export PDF/Excel'],
    analysisType: ['Texte/Contenu'],
    isFavorite: false,
    isNew: true,
    isTrending: true,
    isRecommended: true
  }
];

// Add more tools to reach 24 total
export const allTools: Tool[] = [
  ...toolsData,
  {
    id: '7',
    name: 'Audit Mobile-First',
    description: 'Vérifiez la compatibilité mobile et l\'optimisation pour les appareils mobiles.',
    category: 'Analyse technique',
    level: 'Débutant',
    icon: '📱',
    rating: 4.6,
    usageCount: 1900,
    executionTime: '~25 secondes',
    features: ['Test responsive', 'Vitesse mobile', 'UX mobile', 'Recommandations'],
    tags: ['mobile', 'responsive', 'UX', 'vitesse'],
    resultType: ['Score/Note', 'Rapport détaillé'],
    analysisType: ['URL/Domaine'],
    isFavorite: false,
    isNew: false,
    isTrending: true,
    isRecommended: true
  },
  {
    id: '8',
    name: 'Comparateur de SERP',
    description: 'Comparez votre position avec vos concurrents sur les résultats de recherche.',
    category: 'Recherche mots-clés',
    level: 'Avancé',
    icon: '📊',
    rating: 4.3,
    usageCount: 800,
    executionTime: '~1.5 minutes',
    features: ['Analyse concurrence', 'Positions tracking', 'Évolution historique', 'Export détaillé'],
    tags: ['SERP', 'concurrence', 'positions', 'tracking'],
    resultType: ['Rapport détaillé', 'Export PDF/Excel'],
    analysisType: ['Texte/Contenu'],
    isFavorite: false,
    isNew: true,
    isTrending: false,
    isRecommended: false
  }
  // ... continuing with more tools to reach 24 total
];

export const categories = [
  'Toutes',
  'Analyse technique',
  'Optimisation contenu',
  'Recherche mots-clés',
  'SEO local',
  'Outils techniques'
];

export const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
export const analysisTypes = ['Analyse en temps réel', 'Upload de fichier', 'URL/Domaine', 'Texte/Contenu'];
export const resultTypes = ['Score/Note', 'Rapport détaillé', 'Export PDF/Excel', 'API disponible'];
export const popularTags = ['gratuit', 'instantané', 'export', 'mobile', 'technique', 'contenu', 'vitesse', 'schema'];
