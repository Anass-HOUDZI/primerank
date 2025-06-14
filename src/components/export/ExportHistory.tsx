
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Calendar, 
  FileText, 
  FileSpreadsheet, 
  FileJson, 
  Code,
  Trash2 
} from 'lucide-react';

interface ExportHistoryItem {
  id: string;
  toolName: string;
  format: string;
  template: string;
  exportDate: string;
  fileSize: string;
  downloadUrl?: string;
}

interface ExportHistoryProps {
  history: ExportHistoryItem[];
  onDownload: (item: ExportHistoryItem) => void;
  onDelete: (id: string) => void;
}

const formatIcons = {
  pdf: FileText,
  csv: FileSpreadsheet,
  excel: FileSpreadsheet,
  json: FileJson,
  txt: FileText,
  html: Code,
};

export const ExportHistory = ({ history, onDownload, onDelete }: ExportHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun export disponible
          </h3>
          <p className="text-gray-600">
            Vos exports apparaîtront ici après avoir utilisé les outils d'export.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Historique des exports
        </CardTitle>
        <CardDescription>
          Retrouvez tous vos exports précédents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => {
            const Icon = formatIcons[item.format as keyof typeof formatIcons] || FileText;
            
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-medium">{item.toolName}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {item.exportDate}
                      <span>•</span>
                      <span>{item.fileSize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {item.format}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {item.template}
                  </Badge>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownload(item)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
