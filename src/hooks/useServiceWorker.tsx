import { useState, useEffect } from 'react';

interface ServiceWorkerStatus {
  isSupported: boolean;
  isRegistered: boolean;
  isUpdateAvailable: boolean;
  updateServiceWorker: () => void;
}

export const useServiceWorker = (): ServiceWorkerStatus => {
  const [status, setStatus] = useState<ServiceWorkerStatus>({
    isSupported: false,
    isRegistered: false,
    isUpdateAvailable: false,
    updateServiceWorker: () => {}
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setStatus(prev => ({ ...prev, isSupported: true }));
    }
  }, []);

  return status;
};