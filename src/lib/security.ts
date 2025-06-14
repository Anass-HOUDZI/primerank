
import { z } from 'zod';

// Schémas de validation pour les inputs utilisateur
export const ValidationSchemas = {
  url: z.string()
    .url('URL invalide')
    .refine(url => {
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Seuls les protocoles HTTP et HTTPS sont autorisés'),

  email: z.string()
    .email('Email invalide')
    .max(254, 'Email trop long'),

  keywords: z.array(z.string()
    .min(1, 'Mot-clé requis')
    .max(100, 'Mot-clé trop long')
    .regex(/^[a-zA-Z0-9\s\-_À-ÿ]+$/, 'Caractères non autorisés'))
    .max(50, 'Maximum 50 mots-clés'),

  domain: z.string()
    .min(3, 'Domaine trop court')
    .max(253, 'Domaine trop long')
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/, 'Format de domaine invalide'),

  csvFile: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'Fichier trop volumineux (max 10MB)')
    .refine(file => ['text/csv', 'application/csv'].includes(file.type), 'Format de fichier non supporté'),

  imageFile: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'Image trop volumineuse (max 5MB)')
    .refine(file => file.type.startsWith('image/'), 'Le fichier doit être une image')
};

// Sanitization des données
export class DataSanitizer {
  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>\"'&]/g, match => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[match] || match;
      });
  }

  static sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      // Autoriser seulement HTTP et HTTPS
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Protocole non autorisé');
      }
      return parsed.toString();
    } catch {
      throw new Error('URL invalide');
    }
  }

  static sanitizeKeywords(keywords: string[]): string[] {
    return keywords
      .map(keyword => this.sanitizeString(keyword))
      .filter(keyword => keyword.length > 0)
      .slice(0, 50); // Limiter à 50 mots-clés
  }
}

// Rate limiting côté client
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limits: Map<string, { count: number; window: number }> = new Map();

  constructor() {
    // Configuration des limites par outil
    this.limits.set('rank-checker', { count: 10, window: 60000 }); // 10 requêtes par minute
    this.limits.set('keyword-generator', { count: 5, window: 60000 }); // 5 requêtes par minute
    this.limits.set('backlink-profiler', { count: 3, window: 60000 }); // 3 requêtes par minute
    this.limits.set('bulk-status-checker', { count: 2, window: 300000 }); // 2 requêtes par 5 minutes
  }

  isAllowed(toolId: string): boolean {
    const limit = this.limits.get(toolId);
    if (!limit) return true;

    const now = Date.now();
    const requests = this.requests.get(toolId) || [];
    
    // Supprimer les requêtes expirées
    const validRequests = requests.filter(time => now - time < limit.window);
    
    if (validRequests.length >= limit.count) {
      return false;
    }

    // Ajouter la nouvelle requête
    validRequests.push(now);
    this.requests.set(toolId, validRequests);
    
    return true;
  }

  getTimeUntilReset(toolId: string): number {
    const limit = this.limits.get(toolId);
    if (!limit) return 0;

    const requests = this.requests.get(toolId) || [];
    if (requests.length === 0) return 0;

    const oldestRequest = Math.min(...requests);
    const resetTime = oldestRequest + limit.window;
    
    return Math.max(0, resetTime - Date.now());
  }
}

export const rateLimiter = new RateLimiter();

// CSP Configuration
export const CSPConfig = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.google.com', 'https://www.gstatic.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'connect-src': ["'self'", 'https://api.example.com'],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

// Utilitaire pour générer le header CSP
export const generateCSPHeader = (): string => {
  return Object.entries(CSPConfig)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
};
