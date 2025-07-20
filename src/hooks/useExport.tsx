import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export interface ExportData {
  title: string;
  data: any[];
  headers?: string[];
}

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data: ExportData) => {
    setIsExporting(true);
    try {
      const ws = XLSX.utils.json_to_sheet(data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${data.title}.csv`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = (data: ExportData) => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.text(data.title, 20, 20);
      
      if (data.headers && data.data.length > 0) {
        const tableData = data.data.map(item => 
          data.headers!.map(header => item[header] || '')
        );
        
        (doc as any).autoTable({
          head: [data.headers],
          body: tableData,
          startY: 30,
        });
      }
      
      doc.save(`${data.title}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToExcel = (data: ExportData) => {
    setIsExporting(true);
    try {
      const ws = XLSX.utils.json_to_sheet(data.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${data.title}.xlsx`);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportToCSV,
    exportToPDF,
    exportToExcel
  };
};