import React from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator = () => {
  const { isOnline } = useOnlineStatus();

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
          <Wifi className="w-3 h-3 mr-1" />
          En ligne
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-destructive/20 text-destructive">
        <WifiOff className="w-3 h-3 mr-1" />
        Hors ligne
      </Badge>
    </div>
  );
};