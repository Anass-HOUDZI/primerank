
import { ExportData, ExportOptions } from '../types';
import { downloadFile, updateProgress } from '../utils';

export const exportToJSON = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 50, 'Génération du fichier JSON...');
  
  const exportData = {
    tool: data.toolName,
    exportDate: new Date().toISOString(),
    analysisDate: data.analysisDate,
    data: data,
    options: options
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  downloadFile(jsonContent, `${data.toolName}_${Date.now()}.json`, 'application/json');
  updateProgress(onProgress, 'complete', 100, 'Fichier JSON téléchargé');
};
