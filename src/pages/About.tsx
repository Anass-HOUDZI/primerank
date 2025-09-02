
import React from 'react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { GlobalFooter } from '../components/layout/GlobalFooter';
import { Search, Target, Shield, Zap, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader showSearch={false} />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                À propos de SEO Tools
              </h1>
              <p className="text-xl text-muted-foreground">
                Démocratiser l'accès aux techniques d'optimisation pour les moteurs de recherche
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card rounded-xl p-8 mb-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Notre Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SEO Tools est une suite complète de 24 outils SEO gratuits destinée à démocratiser l'accès 
                aux techniques d'optimisation pour les moteurs de recherche. Cette plateforme intégrée couvre 
                l'analyse technique, l'optimisation sémantique, le netlinking et le suivi de performances, 
                avec des fonctionnalités avancées d'exportation et de visualisation.
              </p>
            </div>

            {/* Fonctionnalités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <Target className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Analyse de Mots-Clés
                </h3>
                <p className="text-muted-foreground">
                  5 outils pour suivre vos positions, générer des mots-clés et analyser la concurrence.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <Zap className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Analyse Technique
                </h3>
                <p className="text-muted-foreground">
                  6 outils pour auditer vos performances, optimiser vos images et analyser votre code.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <Globe className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Architecture Sémantique
                </h3>
                <p className="text-muted-foreground">
                  3 outils pour créer des cocons sémantiques et optimiser votre maillage interne.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <Shield className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Intégrations APIs
                </h3>
                <p className="text-muted-foreground">
                  7 intégrations natives avec Google Search Console, Analytics et plus encore.
                </p>
              </div>
            </div>

            {/* Valeurs */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Nos Valeurs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Gratuit</h3>
                  <p className="text-sm text-muted-foreground">
                    Tous nos outils sont 100% gratuits et accessibles à tous
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Sécurisé</h3>
                  <p className="text-sm text-muted-foreground">
                    Vos données restent confidentielles et sécurisées
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Communauté</h3>
                  <p className="text-sm text-muted-foreground">
                    Créé par et pour la communauté SEO francophone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Copyright notice */}
      <div className="bg-muted/30 border-t">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
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

export default About;
