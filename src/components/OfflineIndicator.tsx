
import React from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, Download, RefreshCw, Clock, Database } from 'lucide-react';

export const OfflineIndicator = () => {
  const onlineStatus = useOnlineStatus();
  const swStatus = useServiceWorker();

  if (onlineStatus.isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
          <Wifi className="w-3 h-3 mr-1" />
          En ligne
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-center space-x-3 mb-3">
          <WifiOff className="w-5 h-5 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">Mode hors ligne</h3>
            <p className="text-sm text-orange-700">
              Fonctionnalités limitées disponibles
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-orange-700">Outils disponibles:</span>
            <Badge variant="secondary" className="text-xs">
              <Database className="w-3 h-3 mr-1" />
              Cache local
            </Badge>
          </div>

          <ul className="text-orange-600 space-y-1">
            <li>• Analyseur de densité</li>
            <li>• Générateur de méta descriptions</li>
            <li>• Audit de lisibilité</li>
            <li>• Analyseur mobile-first</li>
          </ul>

          {onlineStatus.lastOnline && (
            <div className="flex items-center text-xs text-orange-500 mt-2">
              <Clock className="w-3 h-3 mr-1" />
              Dernière connexion: {onlineStatus.lastOnline.toLocaleTimeString()}
            </div>
          )}
        </div>

        {swStatus.isUpdateAvailable && (
          <Button
            size="sm"
            variant="outline"
            onClick={swStatus.updateServiceWorker}
            className="w-full mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <Download className="w-3 h-3 mr-2" />
            Mettre à jour l'app
          </Button>
        )}
      </Card>
    </div>
  );
};
