self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Optional: pass-through fetch to enable PWA installability without caching
self.addEventListener('fetch', () => {});


