import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Github, Linkedin } from 'lucide-react';
import { allTools } from '../../data/tools';

export const GlobalFooter: React.FC = () => {
  // Group tools by category for the footer
  const toolsByCategory = allTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof allTools>);

  const categoryList = Object.keys(toolsByCategory);

  return (
    <footer className="bg-background border-t border-border/40 mt-auto">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo et description */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SEO Tools
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Suite complète de 24 outils SEO gratuits pour démocratiser l'accès aux techniques 
              d'optimisation pour les moteurs de recherche.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:anass.houdzi@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/anasshoudzi/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/Anass-HOUDZI/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories d'outils */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              {categoryList.slice(0, 4).map((category) => (
                <li key={category}>
                  <Link 
                    to={`/?category=${encodeURIComponent(category)}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Outils populaires */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Outils Populaires</h3>
            <ul className="space-y-2 text-sm">
              {allTools
                .sort((a, b) => b.usageCount - a.usageCount)
                .slice(0, 5)
                .map((tool) => (
                  <li key={tool.id}>
                    <Link 
                      to={tool.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Tous les outils */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tous les Outils</h3>
            <div className="grid grid-cols-1 gap-1 text-xs max-h-48 overflow-y-auto scrollbar-thin">
              {allTools.map((tool) => (
                <Link 
                  key={tool.id}
                  to={tool.href}
                  className="text-muted-foreground hover:text-foreground transition-colors truncate py-1"
                  title={tool.name}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
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

      {/* Scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: hsl(var(--muted-foreground) / 0.3);
            border-radius: 2px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--muted-foreground) / 0.5);
          }
        `
      }} />
    </footer>
  );
};