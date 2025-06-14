
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ServiceWorkerStatus {
  isSupported: boolean;
  isRegistered: boolean;
  isUpdateAvailable: boolean;
  isInstalling: boolean;
  registration: ServiceWorkerRegistration | null;
}

export const useServiceWorker = () => {
  const [status, setStatus] = useState<ServiceWorkerStatus>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isUpdateAvailable: false,
    isInstalling: false,
    registration: null
  });

  const { toast } = useToast();

  useEffect(() => {
    if (!status.isSupported) {
      console.log('Service Worker non supporté');
      return;
    }

    const registerSW = async () => {
      try {
        setStatus(prev => ({ ...prev, isInstalling: true }));
        
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        setStatus(prev => ({
          ...prev,
          isRegistered: true,
          isInstalling: false,
          registration
        }));

        // Écouter les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setStatus(prev => ({ ...prev, isUpdateAvailable: true }));
                
                toast({
                  title: "Mise à jour disponible",
                  description: "Une nouvelle version de l'application est prête",
                  action: (
                    <button 
                      onClick={() => updateServiceWorker(registration)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      Mettre à jour
                    </button>
                  )
                });
              }
            });
          }
        });

        // Écouter les messages du Service Worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SW_UPDATED') {
            toast({
              title: "Application mise à jour",
              description: "L'application a été mise à jour avec succès"
            });
          }
        });

        console.log('Service Worker enregistré avec succès');
        
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
        setStatus(prev => ({ ...prev, isInstalling: false }));
      }
    };

    registerSW();
  }, [status.isSupported, toast]);

  const updateServiceWorker = async (registration: ServiceWorkerRegistration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const getCacheStatus = async (): Promise<string[]> => {
    if (!status.registration) return [];
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data && event.data.type === 'CACHE_STATUS') {
          resolve(event.data.caches);
        }
      };

      status.registration.active?.postMessage(
        { type: 'GET_CACHE_STATUS' },
        [messageChannel.port2]
      );
    });
  };

  return {
    ...status,
    updateServiceWorker: () => status.registration && updateServiceWorker(status.registration),
    getCacheStatus
  };
};
