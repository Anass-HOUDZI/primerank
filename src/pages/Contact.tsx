
import React from 'react';
import { MobileOptimizedLayout } from '../components/mobile/MobileOptimizedLayout';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <MobileOptimizedLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter !
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a
              href="mailto:anass.houdzigmail.com"
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">anass.houdzigmail.com</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/anasshoudzi/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400">Anass Houdzi</p>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Anass-HOUDZI/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Github className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400">Anass-HOUDZI</p>
                </div>
              </div>
            </a>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Questions Fréquentes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Les outils sont-ils vraiment gratuits ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, tous nos outils sont 100% gratuits et le resteront. Notre mission est de 
                  démocratiser l'accès aux outils SEO professionnels.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Mes données sont-elles sécurisées ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolument. Nous ne stockons aucune donnée personnelle et toutes les analyses 
                  sont effectuées de manière sécurisée et confidentielle.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Puis-je suggérer de nouveaux outils ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Bien sûr ! N'hésitez pas à nous contacter par email avec vos suggestions. 
                  Nous sommes toujours à l'écoute de la communauté.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default Contact;
