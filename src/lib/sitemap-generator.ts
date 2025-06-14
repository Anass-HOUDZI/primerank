
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapUrl[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.generateToolUrls();
  }

  private generateToolUrls(): void {
    const tools = [
      { path: '/tools/rank-checker', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/tools/keyword-generator', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/tools/bulk-status-checker', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/tools/backlink-profiler', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/tools/pagespeed-analyzer', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/tools/critical-css-generator', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/tools/image-compressor', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/tools/csv-converter', priority: 0.6, changefreq: 'monthly' as const },
      { path: '/tools/schema-validator', priority: 0.7, changefreq: 'weekly' as const },
      { path: '/tools/gsc-integration', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/tools/ga-integration', priority: 0.8, changefreq: 'weekly' as const },
    ];

    // Page d'accueil
    this.addUrl('/', 1.0, 'daily');

    // Pages d'outils
    tools.forEach(tool => {
      this.addUrl(tool.path, tool.priority, tool.changefreq);
    });
  }

  addUrl(path: string, priority: number = 0.5, changefreq: SitemapUrl['changefreq'] = 'weekly'): void {
    this.urls.push({
      loc: `${this.baseUrl}${path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq,
      priority
    });
  }

  generateXML(): string {
    const urlsXML = this.urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXML}
</urlset>`;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${this.baseUrl}/sitemap.xml

# Optimizations
Crawl-delay: 1

# Disallow unnecessary paths
Disallow: /api/
Disallow: /_*
Disallow: *.js$
Disallow: *.css$
`;
  }

  // Méthode pour télécharger le sitemap
  downloadSitemap(): void {
    const xmlContent = this.generateXML();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }

  // Méthode pour télécharger robots.txt
  downloadRobotsTxt(): void {
    const robotsContent = this.generateRobotsTxt();
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }
}

// Instance globale
export const sitemapGenerator = new SitemapGenerator(window.location.origin);
