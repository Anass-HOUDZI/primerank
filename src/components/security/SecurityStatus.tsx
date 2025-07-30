import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecurityLogger } from '@/lib/security-middleware';

interface SecurityStatusProps {
  showDetails?: boolean;
}

export const SecurityStatus = ({ showDetails = false }: SecurityStatusProps) => {
  const [securityEvents, setSecurityEvents] = useState<any[]>([]);
  const [securityScore, setSecurityScore] = useState<number>(100);

  useEffect(() => {
    const updateSecurityStatus = () => {
      const events = SecurityLogger.getEvents();
      setSecurityEvents(events.slice(-10)); // Last 10 events

      // Calculate security score based on recent events
      const recentEvents = events.filter(
        event => Date.now() - event.timestamp < 24 * 60 * 60 * 1000
      );
      
      let score = 100;
      recentEvents.forEach(event => {
        switch (event.severity) {
          case 'critical':
            score -= 25;
            break;
          case 'high':
            score -= 15;
            break;
          case 'medium':
            score -= 5;
            break;
          case 'low':
            score -= 1;
            break;
        }
      });

      setSecurityScore(Math.max(0, score));
    };

    updateSecurityStatus();
    const interval = setInterval(updateSecurityStatus, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  const getSecurityIcon = () => {
    if (securityScore >= 90) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (securityScore >= 70) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getSecurityStatus = () => {
    if (securityScore >= 90) return { text: 'Excellent', color: 'green' };
    if (securityScore >= 70) return { text: 'Bon', color: 'yellow' };
    if (securityScore >= 50) return { text: 'Attention', color: 'orange' };
    return { text: 'Critique', color: 'red' };
  };

  const status = getSecurityStatus();

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2 text-sm">
        {getSecurityIcon()}
        <span>Sécurité: {status.text}</span>
        <Badge variant="outline" className={`text-${status.color}-600`}>
          {securityScore}%
        </Badge>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Statut de Sécurité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getSecurityIcon()}
            <span className="font-medium">Score de sécurité</span>
          </div>
          <Badge variant="outline" className={`text-${status.color}-600`}>
            {securityScore}% - {status.text}
          </Badge>
        </div>

        {securityEvents.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Événements récents</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {securityEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs p-2 rounded bg-muted"
                >
                  <span className="font-mono">{event.type}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      event.severity === 'critical' ? 'text-red-600' :
                      event.severity === 'high' ? 'text-orange-600' :
                      event.severity === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}
                  >
                    {event.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>• Chiffrement AES-256 activé</p>
          <p>• Validation d'intégrité en cours</p>
          <p>• Rate limiting configuré</p>
          <p>• Headers de sécurité appliqués</p>
        </div>
      </CardContent>
    </Card>
  );
};