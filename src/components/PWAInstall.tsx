
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstall = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as any).standalone ||
                         document.referrer.includes('android-app://');
    
    setIsInstalled(isStandalone);

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      
      // Afficher le prompt après un délai
      setTimeout(() => {
        if (!isStandalone) {
          setIsVisible(true);
        }
      }, 3000);
    };

    // Écouter l'installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation acceptée');
      } else {
        console.log('PWA installation refusée');
      }
      
      setInstallPrompt(null);
      setIsVisible(false);
    } catch (error) {
      console.error('Erreur lors de l\'installation PWA:', error);
    }
  };

  const handleDismiss = async () => {
    setIsVisible(false);
    // Use secure storage instead of sessionStorage
    try {
      const { SecureStorage } = await import('@/lib/secure-storage');
      await SecureStorage.saveSecure('pwa-install-dismissed', true, 24 * 60 * 60 * 1000); // 24h TTL
    } catch (error) {
      console.warn('Failed to save PWA dismissal state securely, falling back to sessionStorage');
      sessionStorage.setItem('pwa-install-dismissed', 'true');
    }
  };

  // Enhanced dismissal check with secure storage
  const [isDismissed, setIsDismissed] = React.useState(false);
  
  React.useEffect(() => {
    const checkDismissalState = async () => {
      try {
        const { SecureStorage } = await import('@/lib/secure-storage');
        const dismissed = await SecureStorage.getSecure('pwa-install-dismissed');
        setIsDismissed(!!dismissed);
      } catch (error) {
        // Fallback to sessionStorage
        setIsDismissed(!!sessionStorage.getItem('pwa-install-dismissed'));
      }
    };
    checkDismissalState();
  }, []);

  // Ne pas afficher si déjà installé ou rejeté dans cette session
  if (isInstalled || !installPrompt || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <h3 className="font-semibold">Installer l'application</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-blue-100 mb-4">
          Installez PrimeRank pour un accès rapide et une expérience optimisée, 
          même hors ligne !
        </p>

        <div className="flex space-x-2">
          <Button
            onClick={handleInstall}
            size="sm"
            className="flex-1 bg-white text-blue-600 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Installer
          </Button>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            Plus tard
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-blue-200">
          <span>✓ Accès hors ligne</span>
          <span>✓ Notifications</span>
          <span>✓ Performance optimisée</span>
        </div>
      </Card>
    </div>
  );
};
