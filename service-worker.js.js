const CACHE = 'soutenance-v1';
const FILES = ['./', './index.html', './manifest.json', './adam.png', './imset-logo.png', './hitech-logo.png'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keys) => 
        Promise.all(keys.map((k) => k !== CACHE ? caches.delete(k) : null))
    ));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});