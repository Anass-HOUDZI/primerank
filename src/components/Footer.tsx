
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">PrimeRank</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Suite complète de 24 outils SEO gratuits pour démocratiser l'optimisation pour les moteurs de recherche.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Tous les outils
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/?category=Analyse de mots-clés" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Analyse de mots-clés
                </Link>
              </li>
              <li>
                <Link to="/?category=Analyse technique" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Analyse technique
                </Link>
              </li>
              <li>
                <Link to="/?category=Architecture sémantique" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Architecture sémantique
                </Link>
              </li>
              <li>
                <Link to="/?category=Analyse de backlinks" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Analyse de backlinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div className="flex space-x-4">
              <a href="mailto:anass.houdzigmail.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/anasshoudzi/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/Anass-HOUDZI/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Copyright © 2025{' '}
            <a 
              href="https://www.linkedin.com/in/anasshoudzi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Anass Houdzi
            </a>
            {' '} – Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
