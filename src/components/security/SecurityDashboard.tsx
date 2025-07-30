import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download,
  RefreshCw
} from 'lucide-react';
import { enhancedSecurityLogger, type SecurityAlert, type SecurityMetrics } from '@/lib/enhanced-security-logger';
import { cspManager } from '@/lib/csp-manager';

export const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = React.useState<SecurityMetrics | null>(null);
  const [alerts, setAlerts] = React.useState<SecurityAlert[]>([]);
  const [securityScore, setSecurityScore] = React.useState<number>(100);
  const [cspViolations, setCSPViolations] = React.useState<any[]>([]);

  const refreshData = React.useCallback(() => {
    setMetrics(enhancedSecurityLogger.getSecurityMetrics());
    setAlerts(enhancedSecurityLogger.getUnresolvedAlerts());
    setSecurityScore(enhancedSecurityLogger.getSecurityScore());
    setCSPViolations(cspManager.getViolations());
  }, []);

  React.useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [refreshData]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const downloadReport = () => {
    const report = enhancedSecurityLogger.generateSecurityReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resolveAlert = (alertId: string) => {
    enhancedSecurityLogger.resolveAlert(alertId);
    refreshData();
  };

  if (!metrics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          Chargement des données de sécurité...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <CardTitle>Score de Sécurité</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>
                {securityScore}/100
              </span>
              {securityScore >= 90 ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              )}
            </div>
            <Progress value={securityScore} className="w-full" />
            <CardDescription>
              {securityScore >= 90 && "Excellent niveau de sécurité"}
              {securityScore >= 70 && securityScore < 90 && "Bon niveau de sécurité"}
              {securityScore >= 50 && securityScore < 70 && "Niveau de sécurité à améliorer"}
              {securityScore < 50 && "Niveau de sécurité critique"}
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.criticalAlerts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activités Suspectes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.suspiciousActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations Rate Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.rateLimitViolations}</div>
          </CardContent>
        </Card>
      </div>

      {/* Unresolved Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Alertes Non Résolues</CardTitle>
            <CardDescription>{alerts.length} alertes nécessitent votre attention</CardDescription>
          </div>
          <Button variant="outline" onClick={downloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapport
          </Button>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="flex items-center justify-center p-6 text-muted-foreground">
              <CheckCircle className="w-6 h-6 mr-2" />
              Aucune alerte non résolue
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <Alert key={alert.id}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity}
                        </Badge>
                        <span className="font-medium">{alert.message}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      Résoudre
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* CSP Violations */}
      {cspViolations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Violations CSP</CardTitle>
            <CardDescription>
              {cspViolations.length} violations détectées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cspViolations.slice(0, 3).map((violation, index) => (
                <Alert key={index}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <div className="font-medium">{violation.violatedDirective}</div>
                    <div className="text-xs text-muted-foreground">
                      {violation.blockedURI}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};