
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PieChart, MonitorSpeaker } from 'lucide-react';

const GAIntegration = () => {
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const connectGA = () => {
    setConnected(true);
    toast({
      title: "Connexion GA4",
      description: "Intégration Google Analytics activée"
    });
  };

  return (
    <ToolLayout
      title="Google Analytics"
      description="Tableaux de bord comportement visiteurs et métriques de conversion intégrés"
      icon={<PieChart />}
      category="technical"
      relatedTools={[
        {
          title: "Google Search Console",
          description: "Intégration GSC",
          href: "/tools/gsc-integration",
          icon: <MonitorSpeaker />
        }
      ]}
    >
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Google Analytics 4</h2>
        <p className="text-gray-600 mb-6">Connectez votre propriété GA4 pour les tableaux de bord</p>
        {!connected ? (
          <Button onClick={connectGA} size="lg">
            Connecter Google Analytics
          </Button>
        ) : (
          <div className="p-8 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">✓ Google Analytics connecté</p>
            <p className="text-sm text-gray-600 mt-2">Tableaux de bord en cours de développement</p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default GAIntegration;
