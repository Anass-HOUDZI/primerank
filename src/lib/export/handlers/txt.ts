
import { ExportData, ExportOptions } from '../types';
import { downloadFile, updateProgress } from '../utils';

export const exportToTXT = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 50, 'Génération du fichier texte...');
  
  let content = '';
  content += `=== RAPPORT ${data.toolName.toUpperCase()} ===\n\n`;
  content += `Date d'analyse: ${data.analysisDate}\n`;
  content += `Date d'export: ${new Date().toLocaleDateString('fr-FR')}\n`;
  if (data.url) content += `URL analysée: ${data.url}\n`;
  content += '\n';

  // Metrics
  content += '=== MÉTRIQUES ===\n';
  Object.entries(data.metrics).forEach(([key, value]) => {
    content += `${key}: ${value}\n`;
  });
  content += '\n';

  // Recommendations
  if (data.recommendations && options.includeSections.recommendations) {
    content += '=== RECOMMANDATIONS ===\n';
    data.recommendations.forEach((rec, index) => {
      content += `${index + 1}. ${rec}\n`;
    });
    content += '\n';
  }

  if (options.customNotes) {
    content += '=== NOTES PERSONNALISÉES ===\n';
    content += options.customNotes + '\n';
  }

  downloadFile(content, `${data.toolName}_${Date.now()}.txt`, 'text/plain');
  updateProgress(onProgress, 'complete', 100, 'Fichier TXT téléchargé');
};
