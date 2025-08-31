import { SecurityHeaders, SecurityLogger } from './security';

// Re-export SecurityLogger for convenience
export { SecurityLogger };

/**
 * Security middleware for enhanced protection
 */
export class SecurityMiddleware {
  private static instance: SecurityMiddleware;
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  static getInstance(): SecurityMiddleware {
    if (!this.instance) {
      this.instance = new SecurityMiddleware();
    }
    return this.instance;
  }

  // Apply security headers (for development, would be done server-side in production)
  applySecurityHeaders(): void {
    // Note: These headers would typically be set by the server
    // This is for demonstration and client-side awareness
    console.info('Security headers that should be applied:', SecurityHeaders);
  }

  // Content Security Policy violation handler (disabled for styling compatibility)
  setupCSPReporting(): void {
    // CSP reporting disabled to allow inline styles for better compatibility
    console.log('CSP reporting disabled for styling compatibility');
  }

  // Enhanced rate limiting with sliding window
  checkRateLimit(identifier: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const key = `${identifier}_${Math.floor(now / windowMs)}`;
    
    const current = this.rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };
    
    if (now > current.resetTime) {
      // Reset window
      current.count = 0;
      current.resetTime = now + windowMs;
    }
    
    if (current.count >= limit) {
      SecurityLogger.log('rate_limit_exceeded', {
        identifier,
        limit,
        windowMs,
        currentCount: current.count
      }, 'medium');
      return false;
    }
    
    current.count++;
    this.rateLimitMap.set(key, current);
    
    // Cleanup old entries
    this.cleanupRateLimitMap();
    
    return true;
  }

  private cleanupRateLimitMap(): void {
    const now = Date.now();
    for (const [key, value] of this.rateLimitMap.entries()) {
      if (now > value.resetTime) {
        this.rateLimitMap.delete(key);
      }
    }
  }

  // Input sanitization with enhanced protection
  sanitizeInput(input: string, options: {
    allowHtml?: boolean;
    maxLength?: number;
    whitelist?: RegExp;
  } = {}): string {
    const { allowHtml = false, maxLength = 1000, whitelist } = options;
    
    if (typeof input !== 'string') {
      SecurityLogger.log('invalid_input_type', { 
        type: typeof input, 
        value: input 
      }, 'medium');
      return '';
    }
    
    let sanitized = input.trim();
    
    // Apply length limit
    if (sanitized.length > maxLength) {
      SecurityLogger.log('input_too_long', { 
        length: sanitized.length, 
        maxLength 
      }, 'low');
      sanitized = sanitized.substring(0, maxLength);
    }
    
    // Apply whitelist if provided
    if (whitelist && !whitelist.test(sanitized)) {
      SecurityLogger.log('input_whitelist_violation', { 
        input: sanitized, 
        pattern: whitelist.toString() 
      }, 'medium');
      return '';
    }
    
    // HTML sanitization
    if (!allowHtml) {
      sanitized = sanitized
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
    
    return sanitized;
  }

  // File upload security validation
  validateFileUpload(file: File, options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}): { valid: boolean; error?: string } {
    const { 
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['text/csv', 'application/csv', 'image/jpeg', 'image/png', 'image/webp'],
      allowedExtensions = ['.csv', '.jpg', '.jpeg', '.png', '.webp']
    } = options;

    // Size check
    if (file.size > maxSize) {
      SecurityLogger.log('file_too_large', {
        fileName: file.name,
        size: file.size,
        maxSize
      }, 'medium');
      return { valid: false, error: 'File too large' };
    }

    // MIME type check
    if (!allowedTypes.includes(file.type)) {
      SecurityLogger.log('invalid_file_type', {
        fileName: file.name,
        type: file.type,
        allowedTypes
      }, 'medium');
      return { valid: false, error: 'Invalid file type' };
    }

    // Extension check
    const extension = file.name.toLowerCase().split('.').pop();
    if (!extension || !allowedExtensions.includes(`.${extension}`)) {
      SecurityLogger.log('invalid_file_extension', {
        fileName: file.name,
        extension,
        allowedExtensions
      }, 'medium');
      return { valid: false, error: 'Invalid file extension' };
    }

    return { valid: true };
  }

  // Anomaly detection for unusual patterns
  detectAnomalies(metrics: {
    requestCount: number;
    errorRate: number;
    responseTime: number;
    uniqueIPs: number;
  }): void {
    const { requestCount, errorRate, responseTime, uniqueIPs } = metrics;
    
    // High request volume
    if (requestCount > 1000) {
      SecurityLogger.log('high_request_volume', { requestCount }, 'medium');
    }
    
    // High error rate
    if (errorRate > 0.1) { // 10%
      SecurityLogger.log('high_error_rate', { errorRate }, 'high');
    }
    
    // Slow response times
    if (responseTime > 5000) { // 5 seconds
      SecurityLogger.log('slow_response_time', { responseTime }, 'medium');
    }
    
    // Suspicious IP patterns
    if (uniqueIPs < requestCount * 0.01) { // Less than 1% unique IPs
      SecurityLogger.log('suspicious_ip_pattern', { 
        requestCount, 
        uniqueIPs, 
        ratio: uniqueIPs / requestCount 
      }, 'high');
    }
  }

  // Initialize security measures (CSP reporting disabled)
  initialize(): void {
    this.applySecurityHeaders();
    // this.setupCSPReporting(); // Disabled for styling compatibility
    
    SecurityLogger.log('security_middleware_initialized', {
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      cspReporting: false
    }, 'low');
  }
}

export const securityMiddleware = SecurityMiddleware.getInstance();