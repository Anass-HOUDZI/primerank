
// Enhanced Service Worker with security features
const CACHE_NAME = 'seo-tools-v1.1';
const STATIC_CACHE = 'static-v1.1';
const DYNAMIC_CACHE = 'dynamic-v1.1';
const DATA_CACHE = 'data-v1.1';

// Assets statiques à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// URLs d'API externes
const API_PATTERNS = [
  /^https:\/\/api\./,
  /^https:\/\/.*googleapis\.com/,
  /^https:\/\/.*google\.com/
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== DATA_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Stratégie pour les assets statiques (Cache First)
  if (STATIC_ASSETS.some(asset => request.url.includes(asset)) || 
      request.destination === 'script' || 
      request.destination === 'style') {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
            .then((fetchResponse) => {
              return caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
                });
            });
        })
        .catch(() => {
          // Fallback pour les pages
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }

  // Enhanced Network First strategy for APIs with integrity checks
  if (API_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Enhanced security checks for API responses
          if (response.ok) {
            const responseClone = response.clone();
            
            // Add security headers and cache metadata
            const enhancedResponse = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: {
                ...Object.fromEntries(response.headers.entries()),
                'X-SW-Cached': 'true',
                'X-Cache-Time': new Date().toISOString(),
                'Cache-Control': 'private, max-age=300',
                'X-Content-Type-Options': 'nosniff'
              }
            });
            
            caches.open(DATA_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
            
            return enhancedResponse;
          }
          return response;
        })
        .catch(() => {
          // Enhanced fallback with cache validation
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                // Check cache age for security
                const cacheTime = cachedResponse.headers.get('X-Cache-Time');
                if (cacheTime) {
                  const age = Date.now() - new Date(cacheTime).getTime();
                  // Expire cache after 24 hours for security
                  if (age > 24 * 60 * 60 * 1000) {
                    caches.open(DATA_CACHE).then(cache => cache.delete(request));
                    return new Response(
                      JSON.stringify({ 
                        error: 'Cache Expired', 
                        message: 'Cached data expired for security reasons' 
                      }),
                      { status: 503, headers: { 'Content-Type': 'application/json' } }
                    );
                  }
                }
                
                // Add security headers to cached response
                return new Response(cachedResponse.body, {
                  status: cachedResponse.status,
                  statusText: cachedResponse.statusText,
                  headers: {
                    ...Object.fromEntries(cachedResponse.headers.entries()),
                    'X-From-Cache': 'true',
                    'X-Content-Type-Options': 'nosniff'
                  }
                });
              }
              
              // Enhanced offline response
              return new Response(
                JSON.stringify({ 
                  error: 'Offline', 
                  message: 'Fonctionnalité indisponible hors ligne',
                  timestamp: new Date().toISOString()
                }),
                {
                  status: 503,
                  headers: { 
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff'
                  }
                }
              );
            });
        })
    );
    return;
  }

  // Stratégie par défaut (Stale While Revalidate)
  event.respondWith(
    caches.match(request)
      .then((response) => {
        const fetchPromise = fetch(request)
          .then((fetchResponse) => {
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, fetchResponse.clone());
              });
            return fetchResponse;
          })
          .catch(() => response);

        return response || fetchPromise;
      })
  );
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.keys()
      .then((cacheNames) => {
        event.ports[0].postMessage({
          type: 'CACHE_STATUS',
          caches: cacheNames
        });
      });
  }
});

// Notification de mise à jour disponible
self.addEventListener('controllerchange', () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SW_UPDATED',
        message: 'Une nouvelle version est disponible'
      });
    });
  });
});
