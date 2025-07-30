
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  type?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'PrimeRank - Outils SEO Gratuits',
  description = 'Suite complète de 24 outils SEO gratuits pour optimiser votre référencement. Analyse technique, mots-clés, backlinks et plus.',
  keywords = 'SEO, outils SEO gratuits, référencement, analyse technique, mots-clés, backlinks',
  author = 'PrimeRank',
  type = 'website',
  image = '/placeholder.svg',
  url,
  siteName = 'PrimeRank'
}) => {
  const location = useLocation();
  const currentUrl = url || `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // Meta tags de base
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'fr_FR' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Viewport et mobile
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#4F46E5' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [title, description, keywords, author, type, image, currentUrl, siteName]);

  return null;
};
