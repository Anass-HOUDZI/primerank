
export interface QueuedTask {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

export class OfflineQueue {
  private static instance: OfflineQueue;
  private queue: QueuedTask[] = [];
  private isProcessing = false;
  private listeners: Array<(queue: QueuedTask[]) => void> = [];

  static getInstance(): OfflineQueue {
    if (!OfflineQueue.instance) {
      OfflineQueue.instance = new OfflineQueue();
    }
    return OfflineQueue.instance;
  }

  constructor() {
    this.loadFromStorage();
    this.setupOnlineListener();
  }

  addTask(type: string, data: any, maxRetries = 3): string {
    const task: QueuedTask = {
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries
    };

    this.queue.push(task);
    this.saveToStorage();
    this.notifyListeners();
    
    // Essayer de traiter immédiatement si en ligne
    if (navigator.onLine) {
      this.processQueue();
    }

    return task.id;
  }

  removeTask(id: string): void {
    this.queue = this.queue.filter(task => task.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  getQueue(): QueuedTask[] {
    return [...this.queue];
  }

  clearQueue(): void {
    this.queue = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  subscribe(listener: (queue: QueuedTask[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || !navigator.onLine || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log('[OfflineQueue] Traitement de la queue:', this.queue.length, 'tâches');

    while (this.queue.length > 0 && navigator.onLine) {
      const task = this.queue[0];
      
      try {
        await this.executeTask(task);
        this.removeTask(task.id);
        console.log('[OfflineQueue] Tâche exécutée avec succès:', task.type);
      } catch (error) {
        console.error('[OfflineQueue] Erreur lors de l\'exécution:', error);
        
        task.retryCount++;
        if (task.retryCount >= task.maxRetries) {
          console.log('[OfflineQueue] Tâche abandonnée après', task.maxRetries, 'tentatives');
          this.removeTask(task.id);
        } else {
          // Attendre avant la prochaine tentative
          await new Promise(resolve => setTimeout(resolve, 1000 * task.retryCount));
        }
      }
    }

    this.isProcessing = false;
  }

  private async executeTask(task: QueuedTask): Promise<void> {
    switch (task.type) {
      case 'api_call':
        const response = await fetch(task.data.url, task.data.options);
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        break;
        
      case 'analytics_sync':
        // Synchroniser les données d'analytics
        await this.syncAnalytics(task.data);
        break;
        
      case 'cache_update':
        // Mettre à jour le cache avec de nouvelles données
        await this.updateCache(task.data);
        break;
        
      default:
        console.warn('[OfflineQueue] Type de tâche inconnu:', task.type);
    }
  }

  private async syncAnalytics(data: any): Promise<void> {
    // Implémentation de la synchronisation des analytics
    console.log('[OfflineQueue] Synchronisation analytics:', data);
  }

  private async updateCache(data: any): Promise<void> {
    // Implémentation de la mise à jour du cache
    console.log('[OfflineQueue] Mise à jour cache:', data);
  }

  private setupOnlineListener(): void {
    window.addEventListener('online', () => {
      console.log('[OfflineQueue] Connexion rétablie, traitement de la queue');
      this.processQueue();
    });
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('offline-queue');
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('[OfflineQueue] Erreur lors du chargement:', error);
      this.queue = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('offline-queue', JSON.stringify(this.queue));
    } catch (error) {
      console.error('[OfflineQueue] Erreur lors de la sauvegarde:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.queue));
  }
}

// Export de l'instance singleton
export const offlineQueue = OfflineQueue.getInstance();
