
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { ResultsDisplay } from '@/components/tools/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Link } from 'lucide-react';

interface OpportunityData {
  keyword: string;
  opportunities: Array<{
    domain: string;
    authority: number;
    email: string;
    contactType: 'blog' | 'news' | 'directory';
  }>;
}

const BacklinkOpportunities = () => {
  const [data, setData] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleSearch = async (inputData: { value: string }) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const opportunities = Array.from({ length: 15 }, (_, i) => ({
        domain: `blog${i + 1}.com`,
        authority: Math.floor(Math.random() * 50) + 30,
        email: `contact@blog${i + 1}.com`,
        contactType: ['blog', 'news', 'directory'][Math.floor(Math.random() * 3)] as 'blog' | 'news' | 'directory'
      }));
      
      const mockData: OpportunityData = {
        keyword: inputData.value,
        opportunities
      };
      
      setData(mockData);
      toast({
        title: "Recherche terminée",
        description: `${opportunities.length} opportunités trouvées`
      });
      
    } catch (err) {
      setError('Erreur lors de la recherche.');
      toast({
        title: "Erreur",
        description: "Impossible de trouver des opportunités",
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
      description: "Opportunités de backlinks téléchargées"
    });
  };

  return (
    <ToolLayout
      title="Opportunités de Backlinks"
      description="Découvrez des sites de blogging et récupérez automatiquement les contacts pour votre outreach"
      icon={<Mail />}
      category="backlinks"
      relatedTools={[
        {
          title: "Backlink Profiler",
          description: "Analysez vos backlinks",
          href: "/tools/backlink-profiler",
          icon: <Link />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Rechercher des opportunités"
          description="Entrez votre mot-clé pour trouver des opportunités de backlinks"
          inputType="text"
          placeholder="seo, marketing digital..."
          onSubmit={handleSearch}
          loading={loading}
        />
        
        <ResultsDisplay
          title="Opportunités trouvées"
          data={data}
          loading={loading}
          error={error}
          onExport={handleExport}
        >
          {data && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sites de contact</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Domaine</th>
                      <th className="text-left py-2">Autorité</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.opportunities.map((opp, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2">{opp.domain}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            opp.authority >= 60 ? 'bg-green-100 text-green-800' :
                            opp.authority >= 40 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {opp.authority}
                          </span>
                        </td>
                        <td className="py-2">{opp.email}</td>
                        <td className="py-2">{opp.contactType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </ResultsDisplay>
      </div>
    </ToolLayout>
  );
};

export default BacklinkOpportunities;
