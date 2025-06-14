
import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'Article' | 'Tool';
  name: string;
  description: string;
  url?: string;
  author?: string;
  category?: string;
  operatingSystem?: string;
  applicationCategory?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name,
  description,
  url,
  author = 'SEO Tools Suite',
  category = 'SEO Tools',
  operatingSystem = 'Web Browser',
  applicationCategory = 'DeveloperApplication'
}) => {
  useEffect(() => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
      url: url || window.location.href,
      author: {
        '@type': 'Organization',
        name: author,
        url: window.location.origin
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    let schema;
    
    switch (type) {
      case 'WebApplication':
      case 'SoftwareApplication':
        schema = {
          ...baseSchema,
          operatingSystem,
          applicationCategory,
          category,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '250',
            bestRating: '5',
            worstRating: '1'
          }
        };
        break;
        
      case 'Tool':
        schema = {
          ...baseSchema,
          '@type': 'SoftwareApplication',
          operatingSystem,
          applicationCategory: 'WebApplication',
          category
        };
        break;
        
      default:
        schema = baseSchema;
    }

    // Supprimer le script existant s'il y en a un
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Ajouter le nouveau script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, name, description, url, author, category, operatingSystem, applicationCategory]);

  return null;
};
