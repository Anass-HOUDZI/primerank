
/**
 * Gestion du stockage côté client avec compression et TTL
 */
export class ClientStorage {
  private static compress(data: string): string {
    // Compression basique avec btoa
    return btoa(encodeURIComponent(data));
  }

  private static decompress(data: string): string {
    return decodeURIComponent(atob(data));
  }

  static saveToolResult(toolName: string, data: any, ttl: number = 24 * 60 * 60 * 1000): void {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    try {
      const compressed = this.compress(JSON.stringify(item));
      localStorage.setItem(`seo-tool-${toolName}`, compressed);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  }
  
  static getToolResult(toolName: string): any | null {
    try {
      const item = localStorage.getItem(`seo-tool-${toolName}`);
      if (!item) return null;
      
      const decompressed = this.decompress(item);
      const parsed = JSON.parse(decompressed);
      
      // Vérifier TTL
      if (parsed.timestamp + parsed.ttl < Date.now()) {
        this.removeToolResult(toolName);
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.error('Erreur lecture:', error);
      return null;
    }
  }
  
  static removeToolResult(toolName: string): void {
    localStorage.removeItem(`seo-tool-${toolName}`);
  }
  
  static clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('seo-tool-')) {
        localStorage.removeItem(key);
      }
    });
  }
}
