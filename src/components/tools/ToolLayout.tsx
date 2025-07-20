
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Shield, Lock, Lightbulb, Grid3X3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'analyze' | 'optimize' | 'research' | 'technical';
  children: React.ReactNode;
  relatedTools?: Array<{
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

export const ToolLayout = ({ 
  title, 
  description, 
  icon, 
  category, 
  children,
  relatedTools = []
}: ToolLayoutProps) => {
  const categoryConfig = {
    analyze: {
      color: 'purple',
      bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      categoryPath: '/category/analyse-mots-cles',
      categoryLabel: 'Analyse de mots-clés'
    },
    optimize: {
      color: 'cyan', 
      bgGradient: 'from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20',
      borderColor: 'border-cyan-200 dark:border-cyan-800',
      categoryPath: '/category/architecture-semantique',
      categoryLabel: 'Architecture sémantique'
    },
    research: {
      color: 'pink',
      bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20', 
      borderColor: 'border-pink-200 dark:border-pink-800',
      categoryPath: '/category/analyse-backlinks',
      categoryLabel: 'Analyse de backlinks'
    },
    technical: {
      color: 'blue',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      categoryPath: '/category/analyse-technique',
      categoryLabel: 'Analyse technique'
    }
  };

  const config = categoryConfig[category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Breadcrumb moderne */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Link to={config.categoryPath} className="text-gray-400 hover:text-white transition-colors">
              {config.categoryLabel}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-white font-medium">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section moderne */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
              <div className="p-1 rounded-md mr-3 bg-white/20">
                {React.cloneElement(icon as React.ReactElement, {
                  className: `w-5 h-5 text-${config.color}-400`
                })}
              </div>
              <span className="text-sm font-medium">
                Outil {config.categoryLabel}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {title}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {description}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2 text-green-400" />
                Résultats instantanés
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                100% gratuit
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Lock className="w-4 h-4 mr-2 text-purple-400" />
                Données privées
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content moderne */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              {children}
            </div>
          </div>
          
          {/* Sidebar moderne */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Tips */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                Conseils d'utilisation
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                {getToolTips(category).map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Grid3X3 className="w-5 h-5 mr-2 text-blue-400" />
                  Outils complémentaires
                </h3>
                <div className="space-y-3">
                  {relatedTools.map((tool, index) => (
                    <Link
                      key={index}
                      to={tool.href}
                      className="block p-3 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-1 rounded bg-white/10 group-hover:bg-purple-500/20">
                          {React.cloneElement(tool.icon as React.ReactElement, {
                            className: "w-4 h-4 text-gray-300 group-hover:text-purple-400"
                          })}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white text-sm group-hover:text-purple-400">
                            {tool.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025{' '}
            <a 
              href="https://www.linkedin.com/in/anasshoudzi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Anass Houdzi
            </a>
            {' '} – Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Fonctions utilitaires
const getToolTips = (category: string): string[] => {
  const tips = {
    analyze: [
      'Analysez une page à la fois pour des résultats précis',
      'Vérifiez que votre site est accessible publiquement',
      'Les résultats sont basés sur les dernières guidelines de Google'
    ],
    optimize: [
      'Commencez par optimiser votre page d\'accueil',
      'Utilisez des mots-clés pertinents et naturels',
      'Testez vos modifications après chaque optimisation'
    ],
    research: [
      'Explorez les mots-clés de longue traîne',
      'Analysez la concurrence avant de vous positionner',
      'Utilisez plusieurs outils pour croiser les données'
    ],
    technical: [
      'Effectuez ces vérifications régulièrement',
      'Corrigez les erreurs par ordre de priorité',
      'Documentez vos modifications techniques'
    ]
  };
  return tips[category as keyof typeof tips] || [];
};
