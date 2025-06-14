
interface AnalyticsEvent {
  name: string;
  category: 'tool_usage' | 'navigation' | 'error' | 'performance' | 'conversion';
  properties?: Record<string, any>;
}

interface PerformanceMetrics {
  name: string;
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

class AnalyticsManager {
  private isEnabled: boolean = true;
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializePerformanceMonitoring();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Suivi des événements utilisateur
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    const payload = {
      ...event,
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Console pour développement
    console.log('Analytics Event:', payload);

    // Envoi vers service d'analytics (à remplacer par votre service)
    this.sendToAnalytics(payload);
  }

  // Suivi des performances Web Vitals
  private initializePerformanceMonitoring(): void {
    // Core Web Vitals avec web-vitals library (si disponible)
    this.measureWebVitals();
    
    // Navigation Timing API
    this.measureNavigationTiming();
    
    // Resource Timing
    this.measureResourceTiming();
  }

  private measureWebVitals(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.track({
            name: 'page_load_time',
            category: 'performance',
            properties: {
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              firstPaint: this.getFirstPaint(),
              firstContentfulPaint: this.getFirstContentfulPaint()
            }
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  private getFirstContentfulPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : null;
  }

  private measureNavigationTiming(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.timing;
        const metrics = {
          dns: timing.domainLookupEnd - timing.domainLookupStart,
          tcp: timing.connectEnd - timing.connectStart,
          ssl: timing.requestStart - timing.secureConnectionStart,
          ttfb: timing.responseStart - timing.requestStart,
          download: timing.responseEnd - timing.responseStart,
          dom: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
          total: timing.loadEventEnd - timing.navigationStart
        };

        this.track({
          name: 'navigation_timing',
          category: 'performance',
          properties: metrics
        });
      }, 0);
    });
  }

  private measureResourceTiming(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          this.track({
            name: 'resource_timing',
            category: 'performance',
            properties: {
              name: resource.name,
              type: this.getResourceType(resource.name),
              duration: resource.duration,
              size: resource.transferSize || 0,
              cached: resource.transferSize === 0
            }
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
    if (url.includes('.woff')) return 'font';
    return 'other';
  }

  // Suivi des erreurs
  trackError(error: Error, context?: Record<string, any>): void {
    this.track({
      name: 'javascript_error',
      category: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        context
      }
    });
  }

  // Suivi d'utilisation des outils
  trackToolUsage(toolName: string, action: string, properties?: Record<string, any>): void {
    this.track({
      name: `tool_${action}`,
      category: 'tool_usage',
      properties: {
        toolName,
        ...properties
      }
    });
  }

  // Envoi vers service d'analytics
  private async sendToAnalytics(payload: any): Promise<void> {
    try {
      // En mode développement, on log seulement
      if (process.env.NODE_ENV === 'development') {
        return;
      }

      // En production, envoyer vers votre service d'analytics
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // Méthodes utilitaires
  setUserId(userId: string): void {
    this.userId = userId;
  }

  disable(): void {
    this.isEnabled = false;
  }

  enable(): void {
    this.isEnabled = true;
  }
}

export const analytics = new AnalyticsManager();

// Hook React pour faciliter l'utilisation
export const useAnalytics = () => {
  return {
    track: (event: AnalyticsEvent) => analytics.track(event),
    trackError: (error: Error, context?: Record<string, any>) => analytics.trackError(error, context),
    trackToolUsage: (toolName: string, action: string, properties?: Record<string, any>) => 
      analytics.trackToolUsage(toolName, action, properties)
  };
};
