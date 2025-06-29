
import React, { useState } from 'react';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield, Download } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');

  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Paramètres
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Personnalisez votre expérience SEO Tools
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Apparence */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Moon className="w-5 h-5 mr-2" />
                Apparence
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Mode sombre</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Activez le thème sombre pour réduire la fatigue oculaire
                    </p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Langue */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Langue
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Langue de l'interface
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Notifications push</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recevez des notifications pour les nouvelles fonctionnalités
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Confidentialité */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Confidentialité et Sécurité
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Données personnelles</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Nous ne collectons aucune donnée personnelle. Toutes les analyses sont effectuées localement.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir la politique de confidentialité
                  </button>
                </div>
              </div>
            </div>

            {/* Données */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Données
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Historique des analyses</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Gérez l'historique de vos analyses et exportez vos données.
                  </p>
                  <div className="space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Exporter mes données
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                      Effacer l'historique
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* À propos */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                À propos de l'application
              </h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Version: 1.0.0</p>
                <p>Dernière mise à jour: Décembre 2024</p>
                <p>Développé par: Anass Houdzi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default Settings;
