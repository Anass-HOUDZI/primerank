
import { ExportData, ExportOptions, ExportProgress } from './types';
import { updateProgress } from './utils';
import { exportToCSV } from './handlers/csv';
import { exportToJSON } from './handlers/json';
import { exportToPDF } from './handlers/pdf';
import { exportToExcel } from './handlers/excel';
import { exportToTXT } from './handlers/txt';
import { exportToHTML } from './handlers/html';

export class ExportManager {
  private onProgress?: (progress: ExportProgress) => void;

  constructor(onProgress?: (progress: ExportProgress) => void) {
    this.onProgress = onProgress;
  }

  private updateProgress(stage: string, progress: number, message: string) {
    updateProgress(this.onProgress, stage, progress, message);
  }

  async exportData(data: ExportData, options: ExportOptions): Promise<void> {
    this.updateProgress('start', 0, 'Initialisation de l\'export...');

    switch (options.format) {
      case 'csv':
        await exportToCSV(data, options, this.onProgress);
        break;
      case 'json':
        await exportToJSON(data, options, this.onProgress);
        break;
      case 'pdf':
        await exportToPDF(data, options, this.onProgress);
        break;
      case 'excel':
        await exportToExcel(data, options, this.onProgress);
        break;
      case 'txt':
        await exportToTXT(data, options, this.onProgress);
        break;
      case 'html':
        await exportToHTML(data, options, this.onProgress);
        break;
    }

    this.updateProgress('complete', 100, 'Export terminé avec succès');
  }

  // Batch export functionality
  async batchExport(dataList: ExportData[], options: ExportOptions[]) {
    this.updateProgress('start', 0, 'Démarrage de l\'export en lot...');
    
    for (let i = 0; i < dataList.length; i++) {
      const progress = Math.round((i / dataList.length) * 100);
      this.updateProgress('processing', progress, `Export ${i + 1}/${dataList.length}: ${dataList[i].toolName}`);
      
      await this.exportData(dataList[i], options[i] || options[0]);
      
      // Petit délai pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.updateProgress('complete', 100, 'Export en lot terminé');
  }
}
