import React from 'react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { GlobalFooter } from '../layout/GlobalFooter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Users, Clock, Lightbulb, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedTool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  children: React.ReactNode;
  relatedTools?: RelatedTool[];
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon,
  category,
  children,
  relatedTools = []
}) => {
  // Map categories to proper display names and colors
  const getCategoryConfig = (cat: string) => {
    const categoryMap: { [key: string]: { name: string; color: string; bgColor: string } } = {
      'research': { name: 'Analyse de mots-clés', color: 'text-blue-600', bgColor: 'bg-blue-100' },
      'analyze': { name: 'Analyse de mots-clés', color: 'text-blue-600', bgColor: 'bg-blue-100' },
      'technical': { name: 'Analyse technique', color: 'text-purple-600', bgColor: 'bg-purple-100' },
      'optimize': { name: 'Architecture sémantique', color: 'text-green-600', bgColor: 'bg-green-100' },
      'backlinks': { name: 'Analyse de backlinks', color: 'text-orange-600', bgColor: 'bg-orange-100' },
      'integration': { name: 'Intégrations APIs', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    };
    return categoryMap[cat] || { name: cat, color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const categoryConfig = getCategoryConfig(category);

  const getToolTips = (category: string): string[] => {
    const tips: { [key: string]: string[] } = {
      'research': [
        'Analysez une page à la fois pour des résultats précis',
        'Vérifiez que votre site est accessible publiquement',
        'Les résultats sont basés sur les dernières guidelines de Google'
      ],
      'analyze': [
        'Analysez une page à la fois pour des résultats précis',
        'Vérifiez que votre site est accessible publiquement',
        'Les résultats sont basés sur les dernières guidelines de Google'
      ],
      'optimize': [
        'Commencez par optimiser votre page d\'accueil',
        'Utilisez des mots-clés pertinents et naturels',
        'Testez vos modifications après chaque optimisation'
      ],
      'technical': [
        'Effectuez ces vérifications régulièrement',
        'Corrigez les erreurs par ordre de priorité',
        'Documentez vos modifications techniques'
      ],
      'backlinks': [
        'Explorez les mots-clés de longue traîne',
        'Analysez la concurrence avant de vous positionner',
        'Utilisez plusieurs outils pour croiser les données'
      ]
    };
    return tips[category] || [
      'Suivez les instructions pour obtenir les meilleurs résultats',
      'Testez régulièrement vos modifications',
      'Consultez la documentation pour plus d\'aide'
    ];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />
      
      <main className="flex-1">
        {/* Tool Header */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
          <div className="container max-w-screen-2xl mx-auto px-4 py-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <Badge variant="outline" className={`${categoryConfig.bgColor} ${categoryConfig.color} border-current`}>
                {categoryConfig.name}
              </Badge>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg border-2 border-primary/20">
                {React.cloneElement(icon as React.ReactElement, {
                  className: "w-8 h-8 text-primary"
                })}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
                  {description}
                </p>
                
                {/* Tool Stats */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8/5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>1,250+ utilisateurs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>~30s d'exécution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Content */}
        <div className="container max-w-screen-2xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {children}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Tips */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Conseils d'utilisation
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {getToolTips(category).map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <Grid3X3 className="w-5 h-5 mr-2 text-blue-500" />
                    Outils complémentaires
                  </h3>
                  <div className="space-y-3">
                    {relatedTools.map((tool, index) => (
                      <Link
                        key={index}
                        to={tool.href}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            {React.cloneElement(tool.icon as React.ReactElement, {
                              className: "w-4 h-4 text-primary"
                            })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {tool.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              {/* Help Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Besoin d'aide ?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Consultez notre documentation ou contactez notre équipe support.
                </p>
                <div className="space-y-2">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      Contactez-nous
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="ghost" size="sm" className="w-full">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Copyright notice */}
      <div className="bg-muted/30 border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025{' '}
            <a 
              href="https://www.linkedin.com/in/anasshoudzi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Anass Houdzi
            </a>
            {' '} – Tous droits réservés.
          </p>
        </div>
      </div>
      
      <GlobalFooter />
    </div>
  );
};