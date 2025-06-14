
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X } from 'lucide-react';

export const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 max-w-sm bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Download className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-sm">Installer l'app</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInstall(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Ajoutez cette app à votre écran d'accueil pour un accès rapide.
        </p>
        <Button size="sm" onClick={handleInstall} className="w-full">
          Installer
        </Button>
      </Card>
    </div>
  );
};
