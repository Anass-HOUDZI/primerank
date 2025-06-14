
import { ExportData, ExportOptions } from '../types';
import { downloadFile, updateProgress } from '../utils';

export const exportToHTML = async (
  data: ExportData,
  options: ExportOptions,
  onProgress?: (progress: any) => void
) => {
  updateProgress(onProgress, 'processing', 40, 'Génération du rapport HTML...');
  
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

  downloadFile(html, `${data.toolName}_${Date.now()}.html`, 'text/html');
  updateProgress(onProgress, 'complete', 100, 'Fichier HTML téléchargé');
};
