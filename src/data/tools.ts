
import { Tool } from '../types/Tool';
import { 
  Search, Target, Link, Activity, Code, Image, Hash, Users, 
  Layers, Compass, Globe, Database, Shield, Mail, Share2, 
  PieChart, MonitorSpeaker, Zap, Eye, TrendingUp
} from 'lucide-react';

export const allTools: Tool[] = [
  // Outils d'analyse de mots-clés
  {
    id: 'rank-checker',
    name: 'Rank Checker',
    description: 'Suivez vos positions sur Google avec historique et alertes automatiques',
    icon: TrendingUp,
    category: 'Analyse de mots-clés',
    tags: ['positions', 'suivi', 'google', 'temps-réel'],
    rating: 4.8,
    level: 'Intermédiaire',
    isNew: true
  },
  {
    id: 'keyword-generator',
    name: 'Générateur de Mots-clés',
    description: 'Trouvez des milliers de mots-clés avec volumes et concurrence via Google Keyword Planner',
    icon: Target,
    category: 'Analyse de mots-clés',
    tags: ['mots-clés', 'recherche', 'volume', 'api'],
    rating: 4.9,
    level: 'Débutant'
  },
  {
    id: 'keyword-combinations',
    name: 'Générateur de Combinaisons',
    description: 'Générez automatiquement des milliers de variations de mots-clés',
    icon: Hash,
    category: 'Analyse de mots-clés',
    tags: ['combinaisons', 'variations', 'longue-traîne'],
    rating: 4.6,
    level: 'Intermédiaire'
  },
  {
    id: 'competitor-keywords',
    name: 'Analyse Concurrentielle',
    description: 'Découvrez les mots-clés de vos concurrents et identifiez les opportunités',
    icon: Users,
    category: 'Analyse de mots-clés',
    tags: ['concurrence', 'gap-analysis', 'opportunités'],
    rating: 4.7,
    level: 'Avancé'
  },
  {
    id: 'serp-comparator',
    name: 'Comparateur SERP',
    description: 'Analysez la similarité des résultats de recherche et les intentions',
    icon: Search,
    category: 'Analyse de mots-clés',
    tags: ['serp', 'intention', 'comparaison'],
    rating: 4.5,
    level: 'Avancé'
  },

  // Outils d'architecture sémantique
  {
    id: 'semantic-cocoon-v1',
    name: 'Générateur de Cocons V1',
    description: 'Créez automatiquement des cocons sémantiques sur 2 niveaux',
    icon: Layers,
    category: 'Architecture sémantique',
    tags: ['cocon', 'sémantique', 'maillage', 'automatique'],
    rating: 4.8,
    level: 'Avancé'
  },
  {
    id: 'semantic-cocoon-v2',
    name: 'Générateur de Cocons V2',
    description: 'Interface interactive pour construire vos cocons avec drag & drop',
    icon: Compass,
    category: 'Architecture sémantique',
    tags: ['cocon', 'interactif', 'drag-drop', 'visuel'],
    rating: 4.9,
    level: 'Avancé',
    isNew: true
  },
  {
    id: 'internal-linking',
    name: 'Opportunités de Maillage',
    description: 'Identifiez automatiquement les meilleures opportunités de liens internes',
    icon: Link,
    category: 'Architecture sémantique',
    tags: ['maillage', 'liens-internes', 'optimisation'],
    rating: 4.7,
    level: 'Intermédiaire'
  },

  // Outils d'analyse technique
  {
    id: 'bulk-status-checker',
    name: 'Bulk Status Checker',
    description: 'Vérifiez simultanément le statut de 1000 URLs avec visualisations',
    icon: Activity,
    category: 'Analyse technique',
    tags: ['status-code', 'bulk', 'urls', 'rapide'],
    rating: 4.8,
    level: 'Intermédiaire'
  },
  {
    id: 'critical-css-generator',
    name: 'Critical CSS Generator',
    description: 'Extrayez le CSS critique pour optimiser le temps de chargement',
    icon: Code,
    category: 'Analyse technique',
    tags: ['css', 'performance', 'critique', 'optimisation'],
    rating: 4.6,
    level: 'Avancé'
  },
  {
    id: 'image-compressor',
    name: 'Compresseur d\'Images',
    description: 'Compressez et convertissez vos images au format WebP',
    icon: Image,
    category: 'Analyse technique',
    tags: ['images', 'compression', 'webp', 'optimisation'],
    rating: 4.7,
    level: 'Débutant'
  },
  {
    id: 'pagespeed-analyzer',
    name: 'PageSpeed Analyzer',
    description: 'Analysez les performances de vos pages avec des recommandations détaillées',
    icon: Zap,
    category: 'Analyse technique',
    tags: ['performance', 'vitesse', 'core-web-vitals'],
    rating: 4.8,
    level: 'Intermédiaire'
  },
  {
    id: 'sitemap-extractor',
    name: 'Extracteur de Sitemap',
    description: 'Visualisez et analysez la structure de n\'importe quel sitemap',
    icon: Globe,
    category: 'Analyse technique',
    tags: ['sitemap', 'structure', 'visualisation'],
    rating: 4.5,
    level: 'Débutant'
  },
  {
    id: 'csv-converter',
    name: 'Convertisseur CSV',
    description: 'Transformez vos exports Screaming Frog et GSC en diagrammes',
    icon: Database,
    category: 'Analyse technique',
    tags: ['csv', 'conversion', 'screaming-frog', 'export'],
    rating: 4.4,
    level: 'Intermédiaire'
  },

  // Outils d'analyse de backlinks
  {
    id: 'backlink-profiler',
    name: 'Backlink Profiler',
    description: 'Analysez votre profil de backlinks avec métriques de qualité avancées',
    icon: Link,
    category: 'Analyse de backlinks',
    tags: ['backlinks', 'profil', 'qualité', 'métriques'],
    rating: 4.9,
    level: 'Avancé'
  },
  {
    id: 'backlink-opportunities',
    name: 'Opportunités de Backlinks',
    description: 'Découvrez des sites de blogging et récupérez les contacts automatiquement',
    icon: Mail,
    category: 'Analyse de backlinks',
    tags: ['opportunités', 'outreach', 'contacts', 'prospection'],
    rating: 4.6,
    level: 'Avancé'
  },
  {
    id: 'website-backlink-analyzer',
    name: 'Analyseur de Backlinks Site',
    description: 'Exportez vers Google Sheets l\'analyse détaillée des backlinks',
    icon: Share2,
    category: 'Analyse de backlinks',
    tags: ['analyse', 'export', 'google-sheets', 'ancres'],
    rating: 4.5,
    level: 'Intermédiaire'
  },

  // Intégrations APIs
  {
    id: 'gsc-integration',
    name: 'Google Search Console',
    description: 'Dashboard intégré pour surveiller vos performances et soumettre vos sitemaps',
    icon: MonitorSpeaker,
    category: 'Intégrations APIs',
    tags: ['gsc', 'google', 'integration', 'dashboard'],
    rating: 4.8,
    level: 'Intermédiaire',
    isPremium: true
  },
  {
    id: 'ga-integration',
    name: 'Google Analytics',
    description: 'Tableaux de bord comportement visiteurs et métriques de conversion',
    icon: PieChart,
    category: 'Intégrations APIs',
    tags: ['analytics', 'google', 'conversion', 'comportement'],
    rating: 4.7,
    level: 'Intermédiaire',
    isPremium: true
  },
  {
    id: 'schema-validator',
    name: 'Schema Markup Validator',
    description: 'Testez et validez vos données structurées pour améliorer l\'affichage SERP',
    icon: Shield,
    category: 'Intégrations APIs',
    tags: ['schema', 'données-structurées', 'validation'],
    rating: 4.6,
    level: 'Avancé'
  },
  {
    id: 'positioned-keywords',
    name: 'Mots-clés Positionnés',
    description: 'Liste complète de vos mots-clés positionnés avec positions moyennes',
    icon: Activity,
    category: 'Intégrations APIs',
    tags: ['positions', 'suivi', 'mots-clés', 'évolution'],
    rating: 4.8,
    level: 'Intermédiaire'
  }
];
