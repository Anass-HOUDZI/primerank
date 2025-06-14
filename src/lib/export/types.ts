
export interface ExportManagerOptions {
  onProgress?: (progress: ExportProgress) => void;
}

export interface ExportProgress {
  stage: string;
  progress: number;
  message: string;
}

export interface ExportData {
  toolName: string;
  analysisDate: string;
  url?: string;
  keywords?: string[];
  metrics: Record<string, any>;
  charts?: ChartData[];
  recommendations?: string[];
  notes?: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  data: any[];
  element?: HTMLElement;
}

export interface ExportOptions {
  format: ExportFormat;
  template: ExportTemplate;
  includeSections: {
    summary: boolean;
    charts: boolean;
    detailed: boolean;
    recommendations: boolean;
    notes: boolean;
  };
  branding: {
    logo?: string;
    companyName?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
  customNotes?: string;
}

export type ExportFormat = 'csv' | 'json' | 'pdf' | 'excel' | 'txt' | 'html';
export type ExportTemplate = 'executive' | 'technical' | 'comparison' | 'checklist' | 'presentation';
