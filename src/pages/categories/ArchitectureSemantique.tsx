
import React from 'react';
import { Network, GitBranch, Share2, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ModernCard, ModernGrid, ModernSection } from '@/components/modern/ModernDesignSystem';
import { allTools } from '@/data/tools';

const ArchitectureSemantique = () => {
  const navigate = useNavigate();
  const categoryTools = allTools.filter(tool => tool.category === 'Architecture sémantique');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Accueil
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-white font-medium">
              Architecture sémantique
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
            <Network className="w-5 h-5 mr-3 text-cyan-400" />
            <span className="text-lg font-semibold">Architecture sémantique</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Structurez Sémantiquement
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Créez des cocons sémantiques parfaits et optimisez votre maillage interne 
            pour maximiser la puissance de votre référencement naturel.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center">
              <Network className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{categoryTools.length}</div>
              <p className="text-gray-400">Outils disponibles</p>
            </div>
            <div className="text-center">
              <GitBranch className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">∞</div>
              <p className="text-gray-400">Liens analysés</p>
            </div>
            <div className="text-center">
              <Share2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Auto</div>
              <p className="text-gray-400">Génération</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSection title="Outils d'Architecture Sémantique">
            <ModernGrid>
              {categoryTools.map((tool) => (
                <ModernCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.name}
                  description={tool.description}
                  category={tool.category}
                  isPremium={tool.isPremium}
                  isNew={tool.isNew}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                />
              ))}
            </ModernGrid>
          </ModernSection>
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

export default ArchitectureSemantique;
