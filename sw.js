const cacheName = 'aplus-hub-v1';
const assets = [
  './',
  './index.html',
  './core1.html',
  './core2.html'
];

// Install the service worker and cache files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(assets);
    })
  );
});

// Serve files from cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});