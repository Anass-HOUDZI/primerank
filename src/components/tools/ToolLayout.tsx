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
      color: 'blue',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    optimize: {
      color: 'green', 
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    research: {
      color: 'purple',
      bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20', 
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    technical: {
      color: 'orange',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    }
  };

  const config = categoryConfig[category];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              Outils
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className={cn("bg-gradient-to-br", config.bgGradient)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-3 py-2 rounded-lg mb-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 dark:border-gray-800/20">
              <div className="p-1 rounded-md mr-3 bg-white/80 dark:bg-gray-800/60">
                {React.cloneElement(icon as React.ReactElement, {
                  className: `w-5 h-5 text-${config.color}-600 dark:text-${config.color}-400`
                })}
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Outil {getCategoryLabel(category)}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            
            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                Résultats instantanés
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 mr-2" />
                100% gratuit
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                Données privées
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {children}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Tips */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Conseils d'utilisation
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                {getToolTips(category).map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Grid3X3 className="w-5 h-5 mr-2 text-blue-500" />
                  Outils complémentaires
                </h3>
                <div className="space-y-3">
                  {relatedTools.map((tool, index) => (
                    <Link
                      key={index}
                      to={tool.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-1 rounded bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20">
                          {React.cloneElement(tool.icon as React.ReactElement, {
                            className: "w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          })}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tool.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonctions utilitaires
const getCategoryLabel = (category: string): string => {
  const labels = {
    analyze: 'Analyse',
    optimize: 'Optimisation', 
    research: 'Recherche',
    technical: 'Technique'
  };
  return labels[category as keyof typeof labels] || 'SEO';
};

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
