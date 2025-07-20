
import { useState, useEffect } from 'react';

export interface OnlineStatus {
  isOnline: boolean;
  isLoading: boolean;
  lastOnline: Date | null;
  connectionType: string;
  effectiveType: string;
}

export const useOnlineStatus = () => {
  const [status, setStatus] = useState<OnlineStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isLoading: false,
    lastOnline: typeof navigator !== 'undefined' && navigator.onLine ? new Date() : null,
    connectionType: 'unknown',
    effectiveType: 'unknown'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setStatus(prev => ({
          ...prev,
          connectionType: connection.type || 'unknown',
          effectiveType: connection.effectiveType || 'unknown'
        }));
      }
    };

    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true,
        lastOnline: new Date(),
        isLoading: false
      }));
      updateConnectionInfo();
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false,
        isLoading: false
      }));
    };

    const handleConnectionChange = () => {
      updateConnectionInfo();
    };

    // Listeners d'événements
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Initialisation
    updateConnectionInfo();

    // Nettoyage
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return status;
};
