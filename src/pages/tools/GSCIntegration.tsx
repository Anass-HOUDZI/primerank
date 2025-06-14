
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MonitorSpeaker, BarChart3 } from 'lucide-react';

const GSCIntegration = () => {
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const connectGSC = () => {
    setConnected(true);
    toast({
      title: "Connexion GSC",
      description: "Intégration Google Search Console activée"
    });
  };

  return (
    <ToolLayout
      title="Google Search Console"
      description="Dashboard intégré pour surveiller vos performances et soumettre vos sitemaps directement"
      icon={<MonitorSpeaker />}
      category="technical"
      relatedTools={[
        {
          title: "Google Analytics",
          description: "Intégration GA4",
          href: "/tools/ga-integration",
          icon: <BarChart3 />
        }
      ]}
    >
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Google Search Console</h2>
        <p className="text-gray-600 mb-6">Connectez votre compte GSC pour accéder au dashboard intégré</p>
        {!connected ? (
          <Button onClick={connectGSC} size="lg">
            Connecter Google Search Console
          </Button>
        ) : (
          <div className="p-8 bg-green-50 dark:bg-green-900 rounded-lg">
            <p className="text-green-800 dark:text-green-200">✓ Google Search Console connecté</p>
            <p className="text-sm text-gray-600 mt-2">Dashboard en cours de développement</p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default GSCIntegration;
