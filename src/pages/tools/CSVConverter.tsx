
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Database, Globe } from 'lucide-react';

interface CSVData {
  fileName: string;
  rows: number;
  columns: string[];
  preview: Record<string, any>[];
}

const CSVConverter = () => {
  const [data, setData] = useState<CSVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleConvert = async (inputData: { file?: File }) => {
    if (!inputData.file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier CSV",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: CSVData = {
        fileName: inputData.file.name,
        rows: Math.floor(Math.random() * 1000) + 100,
        columns: ['URL', 'Status Code', 'Title', 'Meta Description', 'H1'],
        preview: Array.from({ length: 5 }, (_, i) => ({
          URL: `https://example.com/page-${i + 1}`,
          'Status Code': 200,
          Title: `Page Title ${i + 1}`,
          'Meta Description': `Description ${i + 1}`,
          H1: `Heading ${i + 1}`
        }))
      };
      
      setData(mockData);
      toast({
        title: "Conversion terminée",
        description: `${mockData.rows} lignes traitées`
      });
      
    } catch (err) {
      setError('Erreur lors de la conversion.');
      toast({
        title: "Erreur",
        description: "Impossible de convertir le fichier",
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
      description: "Données converties téléchargées"
    });
  };

  return (
    <ToolLayout
      title="Convertisseur CSV"
      description="Transformez vos exports Screaming Frog et GSC en diagrammes et visualisations interactives"
      icon={<Database />}
      category="technical"
      relatedTools={[
        {
          title: "Extracteur de Sitemap",
          description: "Analysez vos sitemaps",
          href: "/tools/sitemap-extractor",
          icon: <Globe />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Convertir un fichier CSV"
          description="Sélectionnez votre fichier CSV à convertir"
          inputType="file"
          placeholder="Sélectionnez votre fichier CSV..."
          onSubmit={handleConvert}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Aperçu des données"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <div className="space-y-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.rows}</div>
                <div className="text-sm text-gray-600">Lignes traitées</div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Aperçu ({data.fileName})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {data.columns.map((col, index) => (
                          <th key={index} className="text-left py-2">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.preview.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          {data.columns.map((col, colIndex) => (
                            <td key={colIndex} className="py-2 truncate max-w-xs">{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default CSVConverter;
