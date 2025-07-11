
import React from 'react';
import { PremiumCategoryCard } from './PremiumCategoryCard';

const categoriesData = [
  {
    title: "Analyse des Mots-Clés",
    description: "Découvrez les mots-clés les plus performants avec nos outils d'analyse avancés et notre IA prédictive.",
    toolCount: 5,
    imageSrc: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-600/80 to-pink-600/80",
    href: "/categories/mots-cles",
    badge: "IA AVANCÉE",
    popular: true
  },
  {
    title: "Analyse Technique",
    description: "Auditez la performance technique de votre site avec nos outils de diagnostic ultra-précis.",
    toolCount: 6,
    imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-600/80 to-cyan-600/80",
    href: "/categories/analyse-technique",
    badge: "TEMPS RÉEL"
  },
  {
    title: "Architecture Sémantique",
    description: "Optimisez la structure de votre contenu avec nos algorithmes de clustering sémantique.",
    toolCount: 3,
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-600/80 to-teal-600/80",
    href: "/categories/architecture-semantique",
    badge: "ALGORITHME"
  },
  {
    title: "Analyse de Backlinks",
    description: "Analysez votre profil de liens entrants et découvrez de nouvelles opportunités de netlinking.",
    toolCount: 3,
    imageSrc: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-600/80 to-red-600/80",
    href: "/categories/backlinks",
    badge: "PRÉCISION+"
  },
  {
    title: "Optimisation Contenu",
    description: "Créez du contenu optimisé SEO avec nos outils d'analyse sémantique et de densité de mots-clés.",
    toolCount: 4,
    imageSrc: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&q=80",
    gradient: "from-indigo-600/80 to-purple-600/80",
    href: "/categories/contenu",
    badge: "CRÉATION"
  },
  {
    title: "SEO Local",
    description: "Dominez les recherches locales avec nos outils spécialisés dans le référencement géolocalisé.",
    toolCount: 2,
    imageSrc: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    gradient: "from-yellow-600/80 to-orange-600/80",
    href: "/categories/seo-local",
    badge: "GÉOLOCALISATION"
  }
];

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            <span className="text-sm font-semibold">CATÉGORIES PREMIUM</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Explorez Nos Outils
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre suite complète d'outils SEO organisés par catégories, 
            chacun conçu pour vous donner un avantage concurrentiel décisif.
          </p>
        </div>

        {/* Grille de catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PremiumCategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
