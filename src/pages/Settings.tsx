
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Bell, Database, Shield, User, Moon, Sun, Monitor } from 'lucide-react';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoSave: boolean;
  defaultExportFormat: 'csv' | 'json' | 'pdf';
  cacheEnabled: boolean;
  language: 'fr' | 'en';
  userName: string;
  email: string;
}

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    notifications: true,
    autoSave: true,
    defaultExportFormat: 'csv',
    cacheEnabled: true,
    language: 'fr',
    userName: '',
    email: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('seo-tools-settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('seo-tools-settings', JSON.stringify(newSettings));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('seo-tools-settings', JSON.stringify(settings));
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  const handleResetSettings = () => {
    const defaultSettings: UserSettings = {
      theme: 'system',
      notifications: true,
      autoSave: true,
      defaultExportFormat: 'csv',
      cacheEnabled: true,
      language: 'fr',
      userName: '',
      email: ''
    };
    setSettings(defaultSettings);
    localStorage.setItem('seo-tools-settings', JSON.stringify(defaultSettings));
    toast({
      title: "Paramètres réinitialisés",
      description: "Les paramètres par défaut ont été restaurés.",
    });
  };

  const clearCache = () => {
    // Clear various caches
    localStorage.removeItem('seo-tools-cache');
    sessionStorage.clear();
    
    // Clear any API caches if they exist
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }

    toast({
      title: "Cache vidé",
      description: "Toutes les données en cache ont été supprimées.",
    });
  };

  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8 safe-area-pt">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <SettingsIcon className="w-8 h-8 text-purple-500 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Paramètres
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Personnalisez votre expérience avec la suite d'outils SEO
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Profil Utilisateur</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName" className="text-gray-300">Nom d'utilisateur</Label>
                  <Input
                    id="userName"
                    value={settings.userName}
                    onChange={(e) => updateSetting('userName', e.target.value)}
                    placeholder="Votre nom"
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </Card>

            {/* Appearance Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Apparence</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Thème</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: 'light' | 'dark' | 'system') => updateSetting('theme', value)}
                  >
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <span className="flex items-center">
                          <Sun className="w-4 h-4 mr-2" />
                          Clair
                        </span>
                      </SelectItem>
                      <SelectItem value="dark">
                        <span className="flex items-center">
                          <Moon className="w-4 h-4 mr-2" />
                          Sombre
                        </span>
                      </SelectItem>
                      <SelectItem value="system">
                        <span className="flex items-center">
                          <Monitor className="w-4 h-4 mr-2" />
                          Système
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Langue</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value: 'fr' | 'en') => updateSetting('language', value)}
                  >
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Notifications Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-green-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Notifications activées</Label>
                    <p className="text-sm text-gray-500">Recevoir des alertes pour les changements importants</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                  />
                </div>
              </div>
            </Card>

            {/* Data & Export Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 text-orange-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Données et Export</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Sauvegarde automatique</Label>
                    <p className="text-sm text-gray-500">Sauvegarder automatiquement vos analyses</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Format d'export par défaut</Label>
                  <Select
                    value={settings.defaultExportFormat}
                    onValueChange={(value: 'csv' | 'json' | 'pdf') => updateSetting('defaultExportFormat', value)}
                  >
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Performance Settings */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-red-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Performance et Cache</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Cache activé</Label>
                    <p className="text-sm text-gray-500">Améliore les performances en gardant les données en cache</p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => updateSetting('cacheEnabled', checked)}
                  />
                </div>
                <div className="pt-4 border-t border-white/10">
                  <Button
                    onClick={clearCache}
                    variant="destructive"
                    className="w-full md:w-auto"
                  >
                    Vider le cache
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <Button
                onClick={handleSaveSettings}
                className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
              >
                Sauvegarder les paramètres
              </Button>
              <Button
                onClick={handleResetSettings}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default Settings;
