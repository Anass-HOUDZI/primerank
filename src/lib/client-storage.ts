
export class ClientStorage {
  static saveToolResult(toolName: string, data: any): void {
    try {
      const key = `seo-tool-${toolName}`;
      const timestamp = new Date().toISOString();
      const result = { data, timestamp };
      localStorage.setItem(key, JSON.stringify(result));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  }

  static getToolResult(toolName: string): any | null {
    try {
      const key = `seo-tool-${toolName}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.data;
      }
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
    }
    return null;
  }

  static clearToolResults(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('seo-tool-'));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }
  }
}
