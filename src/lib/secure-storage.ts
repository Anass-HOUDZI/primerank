import { z } from 'zod';

/**
 * Enhanced secure storage with AES encryption using Web Crypto API
 */
export class SecureStorage {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private static readonly TAG_LENGTH = 16;

  private static async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      false, // extractable
      ['encrypt', 'decrypt']
    );
  }

  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  private static async encrypt(data: string, key: CryptoKey): Promise<string> {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv,
      },
      key,
      encoder.encode(data)
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  private static async decrypt(encryptedData: string, key: CryptoKey): Promise<string> {
    const combined = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const iv = combined.slice(0, this.IV_LENGTH);
    const encrypted = combined.slice(this.IV_LENGTH);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv,
      },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  private static getStorageKey(): string {
    // Use a combination of user agent and timestamp for key derivation
    return btoa(navigator.userAgent + Date.now().toString()).substring(0, 32);
  }

  private static async getOrCreateKey(): Promise<CryptoKey> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const password = this.getStorageKey();
    return await this.deriveKey(password, salt);
  }

  static async saveSecure(key: string, data: any, ttl: number = 24 * 60 * 60 * 1000): Promise<void> {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl,
        integrity: await this.calculateIntegrity(data)
      };

      const cryptoKey = await this.getOrCreateKey();
      const encrypted = await this.encrypt(JSON.stringify(item), cryptoKey);
      
      localStorage.setItem(`secure_${key}`, encrypted);
    } catch (error) {
      console.error('Secure storage save failed:', error);
      throw new Error('Failed to save secure data');
    }
  }

  static async getSecure(key: string): Promise<any | null> {
    try {
      const encrypted = localStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;

      const cryptoKey = await this.getOrCreateKey();
      const decrypted = await this.decrypt(encrypted, cryptoKey);
      const item = JSON.parse(decrypted);

      // Check TTL
      if (item.timestamp + item.ttl < Date.now()) {
        this.removeSecure(key);
        return null;
      }

      // Verify integrity
      const currentIntegrity = await this.calculateIntegrity(item.data);
      if (currentIntegrity !== item.integrity) {
        console.warn('Data integrity check failed for key:', key);
        this.removeSecure(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.error('Secure storage read failed:', error);
      this.removeSecure(key);
      return null;
    }
  }

  static removeSecure(key: string): void {
    localStorage.removeItem(`secure_${key}`);
  }

  static clearSecure(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  }

  private static async calculateIntegrity(data: any): Promise<string> {
    const encoder = new TextEncoder();
    const dataString = JSON.stringify(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataString));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

// Validation schemas for secure storage
export const SecureStorageSchemas = {
  toolResult: z.object({
    toolName: z.string(),
    results: z.any(),
    metadata: z.object({
      timestamp: z.number(),
      userId: z.string().optional(),
      version: z.string().optional()
    }).optional()
  }),

  userPreferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    language: z.string().optional(),
    notifications: z.boolean().optional(),
    autoSave: z.boolean().optional()
  }),

  analyticsData: z.object({
    events: z.array(z.object({
      name: z.string(),
      timestamp: z.number(),
      properties: z.record(z.any()).optional()
    })),
    sessionId: z.string(),
    userId: z.string().optional()
  })
};