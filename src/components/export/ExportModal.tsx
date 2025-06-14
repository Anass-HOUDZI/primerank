
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  FileJson,
  FileSpreadsheet,
  Code,
  Globe,
  Palette,
  Settings,
  Share2,
  Mail,
  MessageSquare,
  QrCode
} from 'lucide-react';
import { ExportData, ExportOptions, ExportFormat, ExportTemplate } from '@/types/Export';
import { useExport } from '@/hooks/useExport';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExportData;
}

const formatIcons: Record<ExportFormat, React.ElementType> = {
  csv: FileSpreadsheet,
  json: FileJson,
  pdf: FileText,
  excel: FileSpreadsheet,
  txt: FileText,
  html: Code,
};

const templateDescriptions: Record<ExportTemplate, string> = {
  executive: 'Résumé exécutif avec métriques clés et graphiques',
  technical: 'Rapport technique détaillé avec toutes les données',
  comparison: 'Rapport de comparaison avant/après optimisations',
  checklist: 'Liste de tâches et actions recommandées',
  presentation: 'Format présentation avec visuels optimisés',
};

export const ExportModal = ({ isOpen, onClose, data }: ExportModalProps) => {
  const { exportData, isExporting, progress } = useExport();
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    template: 'executive',
    includeSections: {
      summary: true,
      charts: true,
      detailed: true,
      recommendations: true,
      notes: false,
    },
    branding: {
      companyName: '',
      colors: {
        primary: '#4F46E5',
        secondary: '#E5E7EB',
      },
    },
    customNotes: '',
  });

  const handleExport = async () => {
    await exportData(data, options);
    if (!isExporting) {
      onClose();
    }
  };

  const updateIncludeSection = (section: keyof typeof options.includeSections, value: boolean) => {
    setOptions(prev => ({
      ...prev,
      includeSections: {
        ...prev.includeSections,
        [section]: value,
      },
    }));
  };

  const updateBranding = (field: string, value: string) => {
    setOptions(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value,
      },
    }));
  };

  const updateBrandingColors = (colorType: 'primary' | 'secondary', value: string) => {
    setOptions(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        colors: {
          ...prev.branding.colors,
          [colorType]: value,
        },
      },
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export avancé - {data.toolName}
          </DialogTitle>
        </DialogHeader>

        {isExporting && progress && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progress.message}</span>
                  <span>{progress.progress}%</span>
                </div>
                <Progress value={progress.progress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="format" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="share">Partage</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-4">
            <div>
              <Label className="text-lg font-semibold">Format d'export</Label>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {(Object.keys(formatIcons) as ExportFormat[]).map((format) => {
                  const Icon = formatIcons[format];
                  return (
                    <Card
                      key={format}
                      className={`cursor-pointer transition-colors ${
                        options.format === format
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, format }))}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">{format.toUpperCase()}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold">Template de rapport</Label>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {(Object.keys(templateDescriptions) as ExportTemplate[]).map((template) => (
                  <Card
                    key={template}
                    className={`cursor-pointer transition-colors ${
                      options.template === template
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setOptions(prev => ({ ...prev, template }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">{template}</div>
                          <div className="text-sm text-gray-600">{templateDescriptions[template]}</div>
                        </div>
                        {options.template === template && (
                          <Badge variant="default">Sélectionné</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <Label className="text-lg font-semibold">Sections à inclure</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {Object.entries(options.includeSections).map(([section, included]) => (
                  <div key={section} className="flex items-center justify-between p-3 border rounded-lg">
                    <Label className="capitalize cursor-pointer" htmlFor={section}>
                      {section === 'summary' && 'Résumé des métriques'}
                      {section === 'charts' && 'Graphiques et visualisations'}
                      {section === 'detailed' && 'Données détaillées'}
                      {section === 'recommendations' && 'Recommandations'}
                      {section === 'notes' && 'Notes personnalisées'}
                    </Label>
                    <Switch
                      id={section}
                      checked={included}
                      onCheckedChange={(checked) => updateIncludeSection(section as any, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="custom-notes">Notes personnalisées</Label>
              <Textarea
                id="custom-notes"
                placeholder="Ajoutez vos notes personnalisées qui seront incluses dans le rapport..."
                value={options.customNotes}
                onChange={(e) => setOptions(prev => ({ ...prev, customNotes: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personnalisation du branding
              </Label>
              
              <div className="grid grid-cols-1 gap-4 mt-3">
                <div>
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input
                    id="company-name"
                    placeholder="Mon Entreprise"
                    value={options.branding.companyName}
                    onChange={(e) => updateBranding('companyName', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color">Couleur principale</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={options.branding.colors?.primary}
                        onChange={(e) => updateBrandingColors('primary', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={options.branding.colors?.primary}
                        onChange={(e) => updateBrandingColors('primary', e.target.value)}
                        placeholder="#4F46E5"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondary-color">Couleur secondaire</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={options.branding.colors?.secondary}
                        onChange={(e) => updateBrandingColors('secondary', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={options.branding.colors?.secondary}
                        onChange={(e) => updateBrandingColors('secondary', e.target.value)}
                        placeholder="#E5E7EB"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Options de partage
              </Label>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Mail className="w-6 h-6" />
                  <span>Envoyer par email</span>
                  <span className="text-xs text-gray-500">Partager le rapport par email</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <MessageSquare className="w-6 h-6" />
                  <span>Slack/Teams</span>
                  <span className="text-xs text-gray-500">Intégrer à votre équipe</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Globe className="w-6 h-6" />
                  <span>Lien de partage</span>
                  <span className="text-xs text-gray-500">Générer un lien public</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <QrCode className="w-6 h-6" />
                  <span>QR Code</span>
                  <span className="text-xs text-gray-500">Partage mobile rapide</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Annuler
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? 'Export en cours...' : `Exporter en ${options.format.toUpperCase()}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
