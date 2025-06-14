
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { ExportData, ExportOptions } from '../types';
import { updateProgress } from '../utils';

export const exportToPDF = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 20, 'Initialisation du PDF...');
  
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

  updateProgress(onProgress, 'processing', 40, 'Ajout des métriques...');

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

  updateProgress(onProgress, 'processing', 60, 'Ajout des graphiques...');

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

  updateProgress(onProgress, 'processing', 80, 'Ajout des recommandations...');

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
  updateProgress(onProgress, 'complete', 100, 'Fichier PDF téléchargé');
};
