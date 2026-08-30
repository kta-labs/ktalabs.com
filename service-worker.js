// Service worker minimal : juste ce qu'il faut pour que le site soit "installable"
// comme application (Chrome/Edge/Android exigent un fetch handler pour ça).
// Pas de cache agressif volontairement, pour ne jamais servir une version périmée
// du site ou des pages générées dynamiquement (factures, suivi de commande, etc.).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
