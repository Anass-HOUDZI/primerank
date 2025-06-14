
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { ExportData, ExportOptions, ExportProgress, ChartData } from '@/types/Export';

export class ExportManager {
  private onProgress?: (progress: ExportProgress) => void;

  constructor(onProgress?: (progress: ExportProgress) => void) {
    this.onProgress = onProgress;
  }

  private updateProgress(stage: string, progress: number, message: string) {
    this.onProgress?.({ stage, progress, message });
  }

  async exportData(data: ExportData, options: ExportOptions): Promise<void> {
    this.updateProgress('start', 0, 'Initialisation de l\'export...');

    switch (options.format) {
      case 'csv':
        await this.exportToCSV(data, options);
        break;
      case 'json':
        await this.exportToJSON(data, options);
        break;
      case 'pdf':
        await this.exportToPDF(data, options);
        break;
      case 'excel':
        await this.exportToExcel(data, options);
        break;
      case 'txt':
        await this.exportToTXT(data, options);
        break;
      case 'html':
        await this.exportToHTML(data, options);
        break;
    }

    this.updateProgress('complete', 100, 'Export terminé avec succès');
  }

  private async exportToCSV(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 25, 'Génération du fichier CSV...');
    
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

    this.downloadFile(csvContent, `${data.toolName}_${Date.now()}.csv`, 'text/csv');
    this.updateProgress('complete', 100, 'Fichier CSV téléchargé');
  }

  private async exportToJSON(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 50, 'Génération du fichier JSON...');
    
    const exportData = {
      tool: data.toolName,
      exportDate: new Date().toISOString(),
      analysisDate: data.analysisDate,
      data: data,
      options: options
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    this.downloadFile(jsonContent, `${data.toolName}_${Date.now()}.json`, 'application/json');
    this.updateProgress('complete', 100, 'Fichier JSON téléchargé');
  }

  private async exportToPDF(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 20, 'Initialisation du PDF...');
    
    const pdf = new jsPDF();
    let yPosition = 20;

    // Header avec branding
    if (options.branding.companyName) {
      pdf.setFontSize(16);
      pdf.setTextColor(options.branding.colors?.primary || '#000000');
      pdf.text(options.branding.companyName, 20, yPosition);
      yPosition += 10;
    }

    // Title
    pdf.setFontSize(20);
    pdf.setTextColor('#000000');
    pdf.text(`Rapport ${data.toolName}`, 20, yPosition);
    yPosition += 15;

    // Date
    pdf.setFontSize(12);
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 20, yPosition);
    pdf.text(`Analyse du: ${data.analysisDate}`, 20, yPosition + 7);
    yPosition += 20;

    if (data.url) {
      pdf.text(`URL analysée: ${data.url}`, 20, yPosition);
      yPosition += 10;
    }

    this.updateProgress('processing', 40, 'Ajout des métriques...');

    // Summary section
    if (options.includeSections.summary) {
      pdf.setFontSize(14);
      pdf.text('Résumé des métriques', 20, yPosition);
      yPosition += 10;

      const tableData = Object.entries(data.metrics).map(([key, value]) => [
        key, String(value)
      ]);

      autoTable(pdf, {
        head: [['Métrique', 'Valeur']],
        body: tableData,
        startY: yPosition,
        theme: 'grid',
        headStyles: { fillColor: options.branding.colors?.primary || '#4F46E5' }
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 15;
    }

    this.updateProgress('processing', 60, 'Ajout des graphiques...');

    // Charts section
    if (options.includeSections.charts && data.charts) {
      for (const chart of data.charts) {
        if (chart.element) {
          try {
            const canvas = await html2canvas(chart.element);
            const imgData = canvas.toDataURL('image/png');
            
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 20;
            }
            
            pdf.text(chart.title, 20, yPosition);
            pdf.addImage(imgData, 'PNG', 20, yPosition + 5, 170, 100);
            yPosition += 115;
          } catch (error) {
            console.warn('Erreur lors de la capture du graphique:', error);
          }
        }
      }
    }

    this.updateProgress('processing', 80, 'Ajout des recommandations...');

    // Recommendations
    if (options.includeSections.recommendations && data.recommendations) {
      if (yPosition > 200) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(14);
      pdf.text('Recommandations', 20, yPosition);
      yPosition += 10;

      data.recommendations.forEach((rec, index) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(12);
        const lines = pdf.splitTextToSize(`${index + 1}. ${rec}`, 170);
        pdf.text(lines, 20, yPosition);
        yPosition += lines.length * 7 + 5;
      });
    }

    // Custom notes
    if (options.customNotes) {
      if (yPosition > 200) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(14);
      pdf.text('Notes personnalisées', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      const noteLines = pdf.splitTextToSize(options.customNotes, 170);
      pdf.text(noteLines, 20, yPosition);
    }

    pdf.save(`${data.toolName}_${Date.now()}.pdf`);
    this.updateProgress('complete', 100, 'Fichier PDF téléchargé');
  }

  private async exportToExcel(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 30, 'Création du fichier Excel...');
    
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

    this.updateProgress('processing', 60, 'Ajout des données détaillées...');

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
    this.updateProgress('complete', 100, 'Fichier Excel téléchargé');
  }

  private async exportToTXT(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 50, 'Génération du fichier texte...');
    
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

    this.downloadFile(content, `${data.toolName}_${Date.now()}.txt`, 'text/plain');
    this.updateProgress('complete', 100, 'Fichier TXT téléchargé');
  }

  private async exportToHTML(data: ExportData, options: ExportOptions) {
    this.updateProgress('processing', 40, 'Génération du rapport HTML...');
    
    const primaryColor = options.branding.colors?.primary || '#4F46E5';
    const secondaryColor = options.branding.colors?.secondary || '#E5E7EB';
    
    let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport ${data.toolName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { border-bottom: 3px solid ${primaryColor}; padding-bottom: 20px; margin-bottom: 30px; }
        .title { color: ${primaryColor}; font-size: 28px; font-weight: bold; margin: 0; }
        .subtitle { color: #666; font-size: 16px; margin: 5px 0; }
        .section { margin: 30px 0; }
        .section-title { color: ${primaryColor}; font-size: 20px; font-weight: bold; margin-bottom: 15px; border-left: 4px solid ${primaryColor}; padding-left: 15px; }
        .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .metric-card { background: ${secondaryColor}; padding: 15px; border-radius: 8px; }
        .metric-label { font-weight: bold; color: #333; }
        .metric-value { font-size: 18px; color: ${primaryColor}; margin-top: 5px; }
        .recommendation { background: #f8f9ff; border-left: 4px solid ${primaryColor}; padding: 15px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .notes { background: #fffbf0; border: 1px solid #ffd700; padding: 20px; border-radius: 8px; }
        @media print { body { background: white; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ${options.branding.companyName ? `<div style="color: ${primaryColor}; font-size: 14px; margin-bottom: 10px;">${options.branding.companyName}</div>` : ''}
            <h1 class="title">Rapport ${data.toolName}</h1>
            <div class="subtitle">Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</div>
            <div class="subtitle">Analyse du ${data.analysisDate}</div>
            ${data.url ? `<div class="subtitle">URL: ${data.url}</div>` : ''}
        </div>

        <div class="section">
            <h2 class="section-title">Métriques</h2>
            <div class="metric-grid">
                ${Object.entries(data.metrics).map(([key, value]) => `
                    <div class="metric-card">
                        <div class="metric-label">${key}</div>
                        <div class="metric-value">${value}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        ${data.recommendations && options.includeSections.recommendations ? `
        <div class="section">
            <h2 class="section-title">Recommandations</h2>
            ${data.recommendations.map((rec, index) => `
                <div class="recommendation">
                    <strong>Recommandation ${index + 1}:</strong> ${rec}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${options.customNotes ? `
        <div class="section">
            <h2 class="section-title">Notes personnalisées</h2>
            <div class="notes">${options.customNotes.replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}

        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; text-align: center;">
            Rapport généré par SEO Tools Suite - ${new Date().toLocaleDateString('fr-FR')}
        </div>
    </div>
</body>
</html>`;

    this.downloadFile(html, `${data.toolName}_${Date.now()}.html`, 'text/html');
    this.updateProgress('complete', 100, 'Fichier HTML téléchargé');
  }

  private downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
