
import * as XLSX from 'xlsx';
import { ExportData, ExportOptions } from '../types';
import { updateProgress } from '../utils';

export const exportToExcel = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 30, 'Création du fichier Excel...');
  
  const workbook = XLSX.utils.book_new();

  // Feuille principale avec résumé
  const summaryData = [
    ['Outil', data.toolName],
    ['Date d\'analyse', data.analysisDate],
    ['Date d\'export', new Date().toLocaleDateString('fr-FR')],
    ...(data.url ? [['URL', data.url]] : []),
    ['', ''],
    ['Métriques', ''],
    ...Object.entries(data.metrics).map(([key, value]) => [key, value])
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Résumé');

  updateProgress(onProgress, 'processing', 60, 'Ajout des données détaillées...');

  // Feuille avec recommandations
  if (data.recommendations && options.includeSections.recommendations) {
    const recData = [
      ['Recommandation', 'Description'],
      ...data.recommendations.map((rec, index) => [`Recommandation ${index + 1}`, rec])
    ];
    const recSheet = XLSX.utils.aoa_to_sheet(recData);
    XLSX.utils.book_append_sheet(workbook, recSheet, 'Recommandations');
  }

  XLSX.writeFile(workbook, `${data.toolName}_${Date.now()}.xlsx`);
  updateProgress(onProgress, 'complete', 100, 'Fichier Excel téléchargé');
};
