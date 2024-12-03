const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/TugasPAW_AppPWA/',
  '/TugasPAW_AppPWA/index.html',
  '/TugasPAW_AppPWA/style.css',
  '/TugasPAW_AppPWA/offline.html',
  '/TugasPAW_AppPWA/about.html',
  '/TugasPAW_AppPWA/images/icons/new-icon-192x192.png',
  '/TugasPAW_AppPWA/images/icons/new-icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('/TugasPAW_AppPWA/offline.html'));
    })
  );
});

// Notification Click Event
self.addEventListener('notificationclick', event => {
    event.notification.close(); 
    if (event.action === 'about') {
        event.waitUntil(clients.openWindow('/TugasPAW_AppPWA/about.html')); 
    } else {
        event.waitUntil(clients.openWindow('/')); 
    }
});
