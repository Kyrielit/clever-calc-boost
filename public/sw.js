const CACHE_NAME = 'kyrie-calc-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Initialize IndexedDB for storing user analytics
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('KCPAnalytics', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('usage')) {
        db.createObjectStore('usage', { keyPath: 'timestamp' });
      }
    };
  });
};

// Log usage data
const logUsage = async (action) => {
  try {
    const db = await initDB();
    const transaction = db.transaction(['usage'], 'readwrite');
    const store = transaction.objectStore('usage');
    
    const data = {
      timestamp: new Date().toISOString(),
      action,
      userAgent: self.navigator?.userAgent,
      online: self.navigator?.onLine
    };
    
    await store.add(data);
  } catch (error) {
    console.error('Error logging usage:', error);
  }
};

// Enhanced install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache)),
      logUsage('app_installed')
    ])
  );
  self.skipWaiting();
});

// Enhanced fetch event with offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Return cached response
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return a custom offline page or fallback content
            return new Response(
              '<html><body><h1>Offline</h1><p>Please check your internet connection.</p></body></html>',
              {
                headers: { 'Content-Type': 'text/html' }
              }
            );
          });
      })
  );
});

// Enhanced activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      logUsage('app_activated')
    ])
  );
  self.clients.claim();
});

// Listen for online/offline events
self.addEventListener('online', () => {
  logUsage('app_online');
});

self.addEventListener('offline', () => {
  logUsage('app_offline');
});

// Periodic sync for data upload when online
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'upload-analytics') {
    event.waitUntil(uploadAnalytics());
  }
});

// Function to upload analytics when online
async function uploadAnalytics() {
  if (!navigator.onLine) return;

  try {
    const db = await initDB();
    const transaction = db.transaction(['usage'], 'readonly');
    const store = transaction.objectStore('usage');
    const data = await store.getAll();

    // Here you could implement the actual data upload to your server
    console.log('Analytics data ready for upload:', data);
    
    // Clear uploaded data
    const clearTx = db.transaction(['usage'], 'readwrite');
    const clearStore = clearTx.objectStore('usage');
    await clearStore.clear();
  } catch (error) {
    console.error('Error uploading analytics:', error);
  }
}