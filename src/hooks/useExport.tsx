
import { useState, useCallback } from 'react';
import { ExportManager } from '@/lib/export-utils';
import { ExportData, ExportOptions, ExportProgress } from '@/types/Export';
import { useToast } from '@/hooks/use-toast';

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const { toast } = useToast();

  const exportData = useCallback(async (data: ExportData, options: ExportOptions) => {
    if (isExporting) return;

    setIsExporting(true);
    setProgress(null);

    try {
      const exportManager = new ExportManager((progress) => {
        setProgress(progress);
      });

      await exportManager.exportData(data, options);
      
      toast({
        title: "Export réussi",
        description: `Le fichier ${options.format.toUpperCase()} a été téléchargé avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setProgress(null);
    }
  }, [isExporting, toast]);

  const batchExport = useCallback(async (dataList: ExportData[], options: ExportOptions[]) => {
    if (isExporting) return;

    setIsExporting(true);
    setProgress(null);

    try {
      const exportManager = new ExportManager((progress) => {
        setProgress(progress);
      });

      await exportManager.batchExport(dataList, options);
      
      toast({
        title: "Export en lot réussi",
        description: `${dataList.length} fichiers ont été exportés avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export en lot:', error);
      toast({
        title: "Erreur d'export en lot",
        description: "Une erreur est survenue lors de l'export en lot.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setProgress(null);
    }
  }, [isExporting, toast]);

  return {
    exportData,
    batchExport,
    isExporting,
    progress
  };
};
