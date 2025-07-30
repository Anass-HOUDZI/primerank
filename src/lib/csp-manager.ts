/**
 * Content Security Policy (CSP) Manager
 * Provides runtime CSP enforcement and violation reporting
 */

export interface CSPConfig {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  imgSrc: string[];
  connectSrc: string[];
  fontSrc: string[];
  objectSrc: string[];
  mediaSrc: string[];
  frameSrc: string[];
  reportUri?: string;
}

export class CSPManager {
  private static instance: CSPManager;
  private config: CSPConfig;
  private violations: CSPViolation[] = [];

  private constructor() {
    this.config = {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Required for Vite dev
        "'unsafe-eval'", // Required for development
        "https://cdn.jsdelivr.net",
        "https://unpkg.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for CSS-in-JS
        "https://fonts.googleapis.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https:"
      ],
      connectSrc: [
        "'self'",
        "https://api.openai.com",
        "https://*.googleapis.com",
        "https://*.google.com",
        "wss:"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    };

    this.setupViolationReporting();
  }

  public static getInstance(): CSPManager {
    if (!CSPManager.instance) {
      CSPManager.instance = new CSPManager();
    }
    return CSPManager.instance;
  }

  private setupViolationReporting(): void {
    document.addEventListener('securitypolicyviolation', (event) => {
      const violation: CSPViolation = {
        blockedURI: event.blockedURI,
        documentURI: event.documentURI,
        effectiveDirective: event.effectiveDirective,
        originalPolicy: event.originalPolicy,
        referrer: event.referrer,
        statusCode: event.statusCode,
        violatedDirective: event.violatedDirective,
        timestamp: new Date().toISOString()
      };

      this.violations.push(violation);
      this.reportViolation(violation);
    });
  }

  private reportViolation(violation: CSPViolation): void {
    // Log violation for monitoring
    console.warn('[CSP Violation]', violation);

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production' && this.config.reportUri) {
      fetch(this.config.reportUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(violation)
      }).catch(error => {
        console.error('Failed to report CSP violation:', error);
      });
    }
  }

  public generateCSPHeader(): string {
    const directives = Object.entries(this.config)
      .filter(([key]) => key !== 'reportUri')
      .map(([directive, sources]) => {
        const kebabDirective = directive.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebabDirective} ${sources.join(' ')}`;
      });

    if (this.config.reportUri) {
      directives.push(`report-uri ${this.config.reportUri}`);
    }

    return directives.join('; ');
  }

  public updateConfig(newConfig: Partial<CSPConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getViolations(): CSPViolation[] {
    return [...this.violations];
  }

  public clearViolations(): void {
    this.violations = [];
  }

  public validateInlineStyle(style: string): boolean {
    // Basic validation for inline styles
    const dangerousPatterns = [
      /javascript:/i,
      /expression\(/i,
      /behavior:/i,
      /binding:/i,
      /vbscript:/i,
      /@import/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(style));
  }

  public generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }
}

interface CSPViolation {
  blockedURI: string;
  documentURI: string;
  effectiveDirective: string;
  originalPolicy: string;
  referrer: string;
  statusCode: number;
  violatedDirective: string;
  timestamp: string;
}

// Export singleton instance
export const cspManager = CSPManager.getInstance();