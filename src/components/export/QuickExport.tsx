
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Download, 
  FileText, 
  FileJson, 
  FileSpreadsheet, 
  Code, 
  Settings 
} from 'lucide-react';
import { ExportData, ExportFormat } from '@/types/Export';
import { useExport } from '@/hooks/useExport';
import { ExportModal } from './ExportModal';

interface QuickExportProps {
  data: ExportData;
}

export const QuickExport = ({ data }: QuickExportProps) => {
  const { exportData } = useExport();
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);

  const quickExport = async (format: ExportFormat) => {
    const defaultOptions = {
      format,
      template: 'executive' as const,
      includeSections: {
        summary: true,
        charts: true,
        detailed: true,
        recommendations: true,
        notes: false,
      },
      branding: {
        colors: {
          primary: '#4F46E5',
          secondary: '#E5E7EB',
        },
      },
    };

    await exportData(data, defaultOptions);
  };

  const formatIcons = {
    pdf: FileText,
    csv: FileSpreadsheet,
    json: FileJson,
    excel: FileSpreadsheet,
    txt: FileText,
    html: Code,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-sm font-medium text-gray-500">Export rapide</div>
          {(['pdf', 'csv', 'excel'] as ExportFormat[]).map((format) => {
            const Icon = formatIcons[format];
            return (
              <DropdownMenuItem
                key={format}
                onClick={() => quickExport(format)}
                className="cursor-pointer"
              >
                <Icon className="w-4 h-4 mr-2" />
                {format.toUpperCase()}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5 text-sm font-medium text-gray-500">Autres formats</div>
          {(['json', 'txt', 'html'] as ExportFormat[]).map((format) => {
            const Icon = formatIcons[format];
            return (
              <DropdownMenuItem
                key={format}
                onClick={() => quickExport(format)}
                className="cursor-pointer"
              >
                <Icon className="w-4 h-4 mr-2" />
                {format.toUpperCase()}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowAdvancedModal(true)}
            className="cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Export avancé
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExportModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
        data={data}
      />
    </>
  );
};
