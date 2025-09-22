// Service Worker DÉSACTIVÉ pour debugging
console.log('Service Worker désactivé - cache supprimé')

// Supprimer TOUS les caches existants
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Suppression du cache:', cacheName)
          return caches.delete(cacheName)
        })
      )
    })
  )
})

// Ne plus mettre en cache AUCUNE ressource
const CACHE_NAME = 'DISABLED';
const API_CACHE_NAME = 'DISABLED';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other static resources
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/v1/products',
  '/api/v1/listings',
  '/api/v1/orders',
  '/api/v1/inventory',
  '/api/v1/analytics/dashboard'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }
  
  // Handle static resources
  if (request.method === 'GET') {
    event.respondWith(handleStaticRequest(request));
    return;
  }
});

// Handle API requests with cache-first strategy for GET requests
async function handleAPIRequest(request) {
  const url = new URL(request.url);
  
  // For GET requests to cacheable endpoints, try cache first
  if (request.method === 'GET' && shouldCacheAPIEndpoint(url.pathname)) {
    try {
      const cache = await caches.open(API_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        console.log('[SW] Serving API response from cache:', url.pathname);
        
        // Update cache in background
        fetch(request)
          .then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
          })
          .catch(err => console.log('[SW] Background cache update failed:', err));
        
        return cachedResponse;
      }
    } catch (error) {
      console.log('[SW] Cache lookup failed:', error);
    }
  }
  
  // For non-cacheable requests or cache miss, fetch from network
  try {
    const response = await fetch(request);
    
    // Cache successful GET responses
    if (request.method === 'GET' && response.ok && shouldCacheAPIEndpoint(url.pathname)) {
      const cache = await caches.open(API_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network request failed:', error);
    
    // For GET requests, try to serve from cache as fallback
    if (request.method === 'GET') {
      const cache = await caches.open(API_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        console.log('[SW] Serving stale API response from cache (offline):', url.pathname);
        return cachedResponse;
      }
    }
    
    // Return offline response
    return new Response(
      JSON.stringify({
        error: 'Network unavailable',
        message: 'This request requires an internet connection',
        offline: true
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static resources with cache-first strategy
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving static resource from cache:', request.url);
      return cachedResponse;
    }
  } catch (error) {
    console.log('[SW] Cache lookup failed:', error);
  }
  
  // If not in cache, fetch from network
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network request failed:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(CACHE_NAME);
      const offlineResponse = await cache.match('/offline');
      
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

// Check if API endpoint should be cached
function shouldCacheAPIEndpoint(pathname) {
  return API_ENDPOINTS.some(endpoint => pathname.startsWith(endpoint));
}

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'product-updates') {
    event.waitUntil(syncProductUpdates());
  } else if (event.tag === 'order-sync') {
    event.waitUntil(syncOrderUpdates());
  }
});

// Sync product updates when back online
async function syncProductUpdates() {
  try {
    // Get pending updates from IndexedDB
    const pendingUpdates = await getPendingUpdates('products');
    
    for (const update of pendingUpdates) {
      try {
        const response = await fetch(update.url, {
          method: update.method,
          headers: update.headers,
          body: update.body
        });
        
        if (response.ok) {
          await removePendingUpdate('products', update.id);
          console.log('[SW] Synced product update:', update.id);
        }
      } catch (error) {
        console.log('[SW] Failed to sync product update:', error);
      }
    }
  } catch (error) {
    console.log('[SW] Product sync failed:', error);
  }
}

// Sync order updates when back online
async function syncOrderUpdates() {
  try {
    // Similar to product updates but for orders
    const pendingUpdates = await getPendingUpdates('orders');
    
    for (const update of pendingUpdates) {
      try {
        const response = await fetch(update.url, {
          method: update.method,
          headers: update.headers,
          body: update.body
        });
        
        if (response.ok) {
          await removePendingUpdate('orders', update.id);
          console.log('[SW] Synced order update:', update.id);
        }
      } catch (error) {
        console.log('[SW] Failed to sync order update:', error);
      }
    }
  } catch (error) {
    console.log('[SW] Order sync failed:', error);
  }
}

// Handle push notifications
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'You have new updates in Goodlink Germany',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'goodlink-notification',
    renotify: true,
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.message || options.body;
    options.data = data;
  }
  
  event.waitUntil(
    self.registration.showNotification('Goodlink Germany', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    // Open the app or specific page based on notification data
    const url = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise open new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});

// Utility functions for IndexedDB operations (simplified)
async function getPendingUpdates(type) {
  // This would integrate with IndexedDB to store/retrieve offline actions
  return [];
}

async function removePendingUpdate(type, id) {
  // Remove completed update from IndexedDB
}

// Handle periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'marketplace-sync') {
    event.waitUntil(performMarketplaceSync());
  }
});

async function performMarketplaceSync() {
  try {
    // Sync critical data from marketplaces
    const response = await fetch('/api/v1/marketplaces/sync');
    if (response.ok) {
      console.log('[SW] Marketplace sync completed');
    }
  } catch (error) {
    console.log('[SW] Marketplace sync failed:', error);
  }
}