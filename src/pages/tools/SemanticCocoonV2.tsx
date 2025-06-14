
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Compass, Layers } from 'lucide-react';

const SemanticCocoonV2 = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const { toast } = useToast();

  const startInteractive = () => {
    setIsInteractive(true);
    toast({
      title: "Mode interactif activé",
      description: "Commencez à construire votre cocon"
    });
  };

  return (
    <ToolLayout
      title="Générateur de Cocons V2"
      description="Interface interactive pour explorer et construire vos cocons sémantiques avec drag & drop"
      icon={<Compass />}
      category="optimize"
      relatedTools={[
        {
          title: "Générateur de Cocons V1",
          description: "Version automatique",
          href: "/tools/semantic-cocoon-v1",
          icon: <Layers />
        }
      ]}
    >
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Interface Interactive</h2>
        <p className="text-gray-600 mb-6">Construisez votre cocon sémantique de manière interactive</p>
        {!isInteractive ? (
          <Button onClick={startInteractive} size="lg">
            Lancer l'Interface Interactive
          </Button>
        ) : (
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p>Interface interactive simulée - Fonctionnalité en développement</p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default SemanticCocoonV2;
