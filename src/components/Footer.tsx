
import React from 'react';
import { Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Copyright © 2025</span>
          <a
            href="https://www.linkedin.com/in/anasshoudzi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <span>Anass Houdzi</span>
            <Linkedin className="w-4 h-4" />
          </a>
          <span>– Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
};
