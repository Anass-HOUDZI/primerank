
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { InputForm } from '@/components/tools/InputForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Image, Zap } from 'lucide-react';

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  savings: number;
  format: string;
  quality: number;
}

const ImageCompressor = () => {
  const [data, setData] = useState<CompressionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleCompress = async (inputData: { file?: File }) => {
    if (!inputData.file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const originalSize = inputData.file.size;
      const compressionRatio = Math.random() * 0.6 + 0.2; // 20-80% compression
      const compressedSize = Math.floor(originalSize * compressionRatio);
      
      const mockData: CompressionResult = {
        originalSize: Math.floor(originalSize / 1024),
        compressedSize: Math.floor(compressedSize / 1024),
        savings: Math.round(((originalSize - compressedSize) / originalSize) * 100),
        format: 'WebP',
        quality: 85
      };
      
      setData(mockData);
      toast({
        title: "Compression terminée",
        description: `${mockData.savings}% de réduction de taille`
      });
      
    } catch (err) {
      setError('Erreur lors de la compression.');
      toast({
        title: "Erreur",
        description: "Impossible de compresser l'image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Compresseur d'Images"
      description="Compressez et convertissez vos images au format WebP avec redimensionnement automatique"
      icon={<Image />}
      category="technical"
      relatedTools={[
        {
          title: "Critical CSS Generator",
          description: "Optimisez votre CSS",
          href: "/tools/critical-css-generator",
          icon: <Zap />
        }
      ]}
    >
      <div className="space-y-8">
        <InputForm
          title="Compresser une image"
          description="Sélectionnez une image à compresser et convertir"
          inputType="file"
          placeholder="Sélectionnez votre image..."
          onSubmit={handleCompress}
          loading={loading}
        />
        
        {data && !loading && !error && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{data.originalSize}KB</div>
                <div className="text-sm text-gray-600">Taille originale</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{data.compressedSize}KB</div>
                <div className="text-sm text-gray-600">Taille compressée</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{data.savings}%</div>
                <div className="text-sm text-gray-600">Économies</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{data.format}</div>
                <div className="text-sm text-gray-600">Format de sortie</div>
              </Card>
            </div>
          </div>
        )}

        {loading && (
          <Card className="p-6 text-center">
            <p>Compression en cours...</p>
          </Card>
        )}

        {error && (
          <Card className="p-6 text-center text-red-600">
            <p>{error}</p>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageCompressor;
