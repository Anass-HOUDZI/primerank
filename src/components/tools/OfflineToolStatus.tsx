
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { WifiOff, Wifi, Database, AlertCircle } from 'lucide-react';

interface OfflineToolStatusProps {
  toolType: 'offline' | 'online' | 'hybrid';
  children: React.ReactNode;
}

export const OfflineToolStatus = ({ toolType, children }: OfflineToolStatusProps) => {
  const { isOnline } = useOnlineStatus();

  const getStatusInfo = () => {
    switch (toolType) {
      case 'offline':
        return {
          available: true,
          icon: <Database className="w-3 h-3" />,
          text: 'Disponible hors ligne',
          variant: 'secondary' as const
        };
      
      case 'online':
        return {
          available: isOnline,
          icon: isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />,
          text: isOnline ? 'Connexion requise' : 'Indisponible hors ligne',
          variant: isOnline ? 'secondary' as const : 'destructive' as const
        };
      
      case 'hybrid':
        return {
          available: true,
          icon: isOnline ? <Wifi className="w-3 h-3" /> : <Database className="w-3 h-3" />,
          text: isOnline ? 'Données en temps réel' : 'Mode cache local',
          variant: isOnline ? 'secondary' as const : 'outline' as const
        };
      
      default:
        return {
          available: true,
          icon: <AlertCircle className="w-3 h-3" />,
          text: 'Statut inconnu',
          variant: 'outline' as const
        };
    }
  };

  const status = getStatusInfo();

  return (
    <div className={`relative ${!status.available ? 'opacity-60 pointer-events-none' : ''}`}>
      {children}
      
      <div className="absolute top-2 right-2">
        <Badge variant={status.variant} className="text-xs">
          {status.icon}
          <span className="ml-1">{status.text}</span>
        </Badge>
      </div>
      
      {!status.available && (
        <div className="absolute inset-0 bg-gray-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <div className="text-center p-4">
            <WifiOff className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">
              Connexion internet requise
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Cet outil nécessite une connexion active
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
