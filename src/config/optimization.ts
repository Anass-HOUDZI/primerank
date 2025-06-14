
// Configuration des optimisations de performance
export const PerformanceConfig = {
  // Lazy loading
  lazyLoadingThreshold: 0.1, // 10% du viewport
  
  // Debouncing
  searchDebounceMs: 300,
  analysisDebounceMs: 1000,
  
  // Cache
  maxCacheSize: 100, // Nombre maximum d'entrées en cache
  cacheExpirationMs: 5 * 60 * 1000, // 5 minutes
  
  // Images
  imageFormats: ['webp', 'avif', 'jpg', 'png'],
  maxImageSize: 5 * 1024 * 1024, // 5MB
  
  // Pagination/Virtualization
  virtualListItemHeight: 60,
  maxItemsPerPage: 50,
  
  // Bundle
  maxChunkSize: 250 * 1024, // 250KB
  
  // Analytics
  batchSize: 10, // Nombre d'événements avant envoi en lot
  flushInterval: 30000, // 30 secondes
};

// Configuration SEO
export const SEOConfig = {
  siteName: 'SEO Tools Suite',
  defaultTitle: 'Outils SEO Gratuits - Suite Complète',
  defaultDescription: 'Suite complète de 24 outils SEO gratuits pour optimiser votre référencement. Analyse technique, mots-clés, backlinks et plus.',
  defaultKeywords: 'SEO, outils SEO gratuits, référencement, analyse technique, mots-clés, backlinks',
  author: 'SEO Tools Suite',
  twitterHandle: '@seotools',
  
  // Structured data
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SEO Tools Suite',
    description: 'Suite complète d\'outils SEO gratuits',
    url: window.location.origin,
    logo: `${window.location.origin}/placeholder.svg`,
    sameAs: [
      'https://twitter.com/seotools',
      'https://linkedin.com/company/seotools'
    ]
  }
};

// Configuration de sécurité
export const SecurityConfig = {
  // Rate limiting
  rateLimits: {
    'rank-checker': { requests: 10, window: 60000 },
    'keyword-generator': { requests: 5, window: 60000 },
    'backlink-profiler': { requests: 3, window: 60000 },
    'bulk-status-checker': { requests: 2, window: 300000 },
    default: { requests: 20, window: 60000 }
  },
  
  // File upload
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['text/csv', 'application/csv', 'image/jpeg', 'image/png', 'image/webp'],
  
  // Input validation
  maxStringLength: 1000,
  maxArrayLength: 100,
  
  // CSP
  cspDirectives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'connect-src': ["'self'"],
  }
};

// Configuration de monitoring
export const MonitoringConfig = {
  // Error tracking
  enableErrorTracking: true,
  errorSampleRate: 1.0,
  
  // Performance monitoring
  enablePerformanceTracking: true,
  performanceSampleRate: 0.1, // 10% des sessions
  
  // Analytics
  enableAnalytics: true,
  
  // Feature flags
  features: {
    realTimeAnalysis: true,
    advancedExport: true,
    collaborativeFeatures: false,
    aiSuggestions: false
  },
  
  // A/B Testing
  experiments: {
    newUIDesign: { enabled: false, traffic: 0.1 },
    enhancedOnboarding: { enabled: false, traffic: 0.2 }
  }
};

// Configuration de déploiement
export const DeploymentConfig = {
  environment: process.env.NODE_ENV || 'development',
  apiBaseUrl: process.env.VITE_API_URL || 'http://localhost:3000',
  enableServiceWorker: process.env.NODE_ENV === 'production',
  enablePWA: true,
  
  // CDN Configuration
  cdnUrl: process.env.VITE_CDN_URL || '',
  
  // External services
  services: {
    googleAnalytics: process.env.VITE_GA_ID || '',
    sentry: process.env.VITE_SENTRY_DSN || '',
    hotjar: process.env.VITE_HOTJAR_ID || ''
  }
};
