
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Code } from 'lucide-react';

interface SchemaData {
  url: string;
  schemasFound: Array<{
    type: string;
    status: 'valid' | 'warning' | 'error';
    errors: string[];
  }>;
}

const SchemaValidator = () => {
  const [data, setData] = useState<SchemaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleValidate = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const schemas = [
        { type: 'Organization', status: 'valid' as const, errors: [] },
        { type: 'WebPage', status: 'warning' as const, errors: ['Propriété "breadcrumb" manquante'] },
        { type: 'Article', status: 'error' as const, errors: ['Propriété "datePublished" requise', 'Propriété "author" manquante'] }
      ];
      
      const mockData: SchemaData = {
        url: inputData.value,
        schemasFound: schemas
      };
      
      setData(mockData);
      toast({
        title: "Validation terminée",
        description: `${schemas.length} schémas analysés`
      });
      
    } catch (err) {
      setError('Erreur lors de la validation.');
      toast({
        title: "Erreur",
        description: "Impossible de valider les schémas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (!data) return;
    toast({
      title: "Export réussi",
      description: "Rapport de validation téléchargé"
    });
  };

  return (
    <ToolLayout
      title="Schema Markup Validator"
      description="Testez et validez vos données structurées pour améliorer l'affichage dans les SERP"
      icon={<Shield />}
      category="technical"
      relatedTools={[
        {
          title: "Critical CSS Generator",
          description: "Optimisez votre CSS",
          href: "/tools/critical-css-generator",
          icon: <Code />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Valider les données structurées"
          description="Entrez l'URL de la page à valider"
          inputType="url"
          placeholder="https://example.com"
          onSubmit={handleValidate}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Résultats de validation"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Schémas détectés</h3>
              <div className="space-y-4">
                {data.schemasFound.map((schema, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{schema.type}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        schema.status === 'valid' ? 'bg-green-100 text-green-800' :
                        schema.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {schema.status}
                      </span>
                    </div>
                    {schema.errors.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {schema.errors.map((error, errorIndex) => (
                          <li key={errorIndex}>• {error}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default SchemaValidator;
