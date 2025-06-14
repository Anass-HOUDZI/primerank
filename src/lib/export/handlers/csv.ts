
import { ExportData, ExportOptions } from '../types';
import { downloadFile, updateProgress } from '../utils';

export const exportToCSV = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 25, 'Génération du fichier CSV...');
  
  const rows = [];
  
  // Headers
  rows.push(['Métrique', 'Valeur', 'Description']);
  
  // Basic info
  rows.push(['Outil', data.toolName, 'Nom de l\'outil utilisé']);
  rows.push(['Date d\'analyse', data.analysisDate, 'Date de l\'analyse']);
  if (data.url) rows.push(['URL analysée', data.url, 'URL cible de l\'analyse']);
  
  // Metrics
  Object.entries(data.metrics).forEach(([key, value]) => {
    rows.push([key, String(value), '']);
  });
  
  // Recommendations
  if (options.includeSections.recommendations && data.recommendations) {
    rows.push(['', '', '']);
    rows.push(['Recommandations', '', '']);
    data.recommendations.forEach((rec, index) => {
      rows.push([`Recommandation ${index + 1}`, rec, '']);
    });
  }

  const csvContent = rows.map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  downloadFile(csvContent, `${data.toolName}_${Date.now()}.csv`, 'text/csv');
  updateProgress(onProgress, 'complete', 100, 'Fichier CSV téléchargé');
};
