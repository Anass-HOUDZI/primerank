/**
 * Enhanced Security Logger with detailed monitoring and alerting
 */

import { SecurityLogger } from './security';

export interface SecurityAlert {
  id: string;
  type: 'security_violation' | 'rate_limit_exceeded' | 'suspicious_activity' | 'data_breach_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: Record<string, any>;
  timestamp: string;
  userId?: string;
  userAgent?: string;
  ipAddress?: string;
  resolved: boolean;
}

export interface SecurityMetrics {
  totalEvents: number;
  criticalAlerts: number;
  suspiciousActivities: number;
  rateLimitViolations: number;
  lastIncident?: string;
  securityScore: number;
}

export class EnhancedSecurityLogger {
  private static instance: EnhancedSecurityLogger;
  private alerts: SecurityAlert[] = [];
  private metrics: SecurityMetrics = {
    totalEvents: 0,
    criticalAlerts: 0,
    suspiciousActivities: 0,
    rateLimitViolations: 0,
    securityScore: 100
  };

  public static getInstance(): EnhancedSecurityLogger {
    if (!EnhancedSecurityLogger.instance) {
      EnhancedSecurityLogger.instance = new EnhancedSecurityLogger();
    }
    return EnhancedSecurityLogger.instance;
  }

  public logSecurityEvent(
    eventType: string, 
    details: any, 
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ): void {
    // Log to base SecurityLogger
    SecurityLogger.log(eventType, details, severity);

    // Generate alert for high/critical events
    if (severity === 'high' || severity === 'critical') {
      this.createAlert(eventType, details, severity);
    }

    // Update metrics
    this.updateMetrics(eventType, severity);

    // Check for patterns that might indicate attacks
    this.analyzeSecurityPatterns();
  }

  private createAlert(
    eventType: string,
    details: any,
    severity: 'high' | 'critical'
  ): void {
    const alert: SecurityAlert = {
      id: crypto.randomUUID(),
      type: this.mapEventTypeToAlertType(eventType),
      severity,
      message: this.generateAlertMessage(eventType, details),
      details,
      timestamp: new Date().toISOString(),
      userId: details.userId,
      userAgent: navigator.userAgent,
      ipAddress: details.ipAddress || 'unknown',
      resolved: false
    };

    this.alerts.push(alert);

    // Auto-resolve low priority alerts after 24 hours
    if (severity !== 'critical') {
      setTimeout(() => {
        this.resolveAlert(alert.id);
      }, 24 * 60 * 60 * 1000);
    }

    // Notify if critical
    if (severity === 'critical') {
      this.notifyCriticalAlert(alert);
    }
  }

  private mapEventTypeToAlertType(eventType: string): SecurityAlert['type'] {
    const mapping: Record<string, SecurityAlert['type']> = {
      'rate_limit_exceeded': 'rate_limit_exceeded',
      'csp_violation': 'security_violation',
      'xss_attempt': 'security_violation',
      'unauthorized_access': 'data_breach_attempt',
      'suspicious_input': 'suspicious_activity'
    };

    return mapping[eventType] || 'suspicious_activity';
  }

  private generateAlertMessage(eventType: string, details: any): string {
    const messages: Record<string, string> = {
      'rate_limit_exceeded': `Rate limit exceeded for ${details.resource || 'unknown resource'}`,
      'csp_violation': `Content Security Policy violation detected: ${details.violatedDirective}`,
      'xss_attempt': `Potential XSS attempt detected in ${details.field || 'unknown field'}`,
      'unauthorized_access': `Unauthorized access attempt to ${details.resource || 'protected resource'}`,
      'suspicious_input': `Suspicious input detected: ${details.pattern || 'unknown pattern'}`
    };

    return messages[eventType] || `Security event: ${eventType}`;
  }

  private updateMetrics(eventType: string, severity: string): void {
    this.metrics.totalEvents++;

    if (severity === 'critical') {
      this.metrics.criticalAlerts++;
      this.metrics.securityScore = Math.max(0, this.metrics.securityScore - 10);
    } else if (severity === 'high') {
      this.metrics.securityScore = Math.max(0, this.metrics.securityScore - 5);
    }

    if (eventType === 'rate_limit_exceeded') {
      this.metrics.rateLimitViolations++;
    }

    if (eventType.includes('suspicious') || eventType.includes('attempt')) {
      this.metrics.suspiciousActivities++;
    }

    this.metrics.lastIncident = new Date().toISOString();
  }

  private analyzeSecurityPatterns(): void {
    // Analyze recent events for patterns
    const recentEvents = SecurityLogger.getEvents().filter(event => {
      const eventTime = new Date(event.timestamp).getTime();
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
      return eventTime > fiveMinutesAgo;
    });

    // Check for rapid fire events (potential attack)
    if (recentEvents.length > 10) {
      this.createAlert('rapid_fire_events', {
        eventCount: recentEvents.length,
        timeWindow: '5 minutes'
      }, 'high');
    }

    // Check for multiple different attack types
    const uniqueEventTypes = new Set(recentEvents.map(e => e.type));
    if (uniqueEventTypes.size > 3) {
      this.createAlert('multiple_attack_vectors', {
        eventTypes: Array.from(uniqueEventTypes),
        eventCount: recentEvents.length
      }, 'critical');
    }
  }

  private notifyCriticalAlert(alert: SecurityAlert): void {
    // In production, this would send to monitoring service
    console.error('[CRITICAL SECURITY ALERT]', alert);

    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Critical Security Alert', {
        body: alert.message,
        icon: '/favicon.ico',
        tag: 'security-alert'
      });
    }
  }

  public getAlerts(): SecurityAlert[] {
    return [...this.alerts];
  }

  public getUnresolvedAlerts(): SecurityAlert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  public resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  public getSecurityMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }

  public getSecurityScore(): number {
    // Calculate security score based on recent activity
    const recentAlerts = this.alerts.filter(alert => {
      const alertTime = new Date(alert.timestamp).getTime();
      const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
      return alertTime > dayAgo && !alert.resolved;
    });

    let score = 100;
    recentAlerts.forEach(alert => {
      switch (alert.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'high':
          score -= 10;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 1;
          break;
      }
    });

    return Math.max(0, score);
  }

  public generateSecurityReport(): string {
    const metrics = this.getSecurityMetrics();
    const unresolvedAlerts = this.getUnresolvedAlerts();
    
    return `
# Security Report - ${new Date().toLocaleDateString()}

## Security Score: ${this.getSecurityScore()}/100

## Metrics
- Total Events: ${metrics.totalEvents}
- Critical Alerts: ${metrics.criticalAlerts}
- Suspicious Activities: ${metrics.suspiciousActivities}
- Rate Limit Violations: ${metrics.rateLimitViolations}
- Last Incident: ${metrics.lastIncident || 'None'}

## Unresolved Alerts: ${unresolvedAlerts.length}
${unresolvedAlerts.map(alert => `
- **${alert.severity.toUpperCase()}**: ${alert.message}
  - Time: ${new Date(alert.timestamp).toLocaleString()}
  - Type: ${alert.type}
`).join('')}

## Recommendations
${this.generateRecommendations()}
    `.trim();
  }

  private generateRecommendations(): string {
    const score = this.getSecurityScore();
    const unresolvedAlerts = this.getUnresolvedAlerts();
    
    if (score >= 90) {
      return '- Security posture is excellent. Continue monitoring.';
    } else if (score >= 70) {
      return '- Security posture is good. Review recent alerts and resolve any outstanding issues.';
    } else if (score >= 50) {
      return '- Security posture needs attention. Investigate recent alerts and implement additional security measures.';
    } else {
      return '- Security posture is critical. Immediate action required to address security threats.';
    }
  }
}

// Export singleton instance
export const enhancedSecurityLogger = EnhancedSecurityLogger.getInstance();