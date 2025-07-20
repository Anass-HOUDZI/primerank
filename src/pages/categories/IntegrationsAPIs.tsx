
import React from 'react';
import { Plug, Zap, Cloud, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModernCard, ModernGrid, ModernSection } from '@/components/modern/ModernDesignSystem';
import { allTools } from '@/data/tools';

const IntegrationsAPIs = () => {
  const categoryTools = allTools.filter(tool => tool.category === 'Intégrations APIs');

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
              Intégrations APIs
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
            <Plug className="w-5 h-5 mr-3 text-emerald-400" />
            <span className="text-lg font-semibold">Intégrations APIs</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
            Connectez vos Données
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Intégrez directement Google Search Console, Analytics et d'autres plateformes 
            pour un suivi complet et automatisé de vos performances SEO.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center">
              <Cloud className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{categoryTools.length}</div>
              <p className="text-gray-400">Intégrations</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Temps réel</div>
              <p className="text-gray-400">Données</p>
            </div>
            <div className="text-center">
              <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Auto</div>
              <p className="text-gray-400">Synchronisation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSection title="Outils d'Intégrations APIs">
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
                  onClick={() => window.location.href = `/tools/${tool.id}`}
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

export default IntegrationsAPIs;
