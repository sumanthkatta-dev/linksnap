
const SW_VERSION = '2026-01-08-1';
const STATIC_CACHE = `linksnap-static-${SW_VERSION}`;
const RUNTIME_CACHE = `linksnap-runtime-${SW_VERSION}`;
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/linksnap-logo.png',
];

const isNavigation = request => request.mode === 'navigate';
const isStatic = request => ['style', 'script', 'image', 'font'].includes(request.destination);
const isApi = request => request.url.includes('/api/') || request.url.includes('/analyze');

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(CORE_ASSETS);
    await cache.put('/__sw_version__', new Response(SW_VERSION, { headers: { 'Content-Type': 'text/plain' } }));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', event => {
  const { data } = event;
  if (data?.type === 'CHECK_VERSION' && data?.version !== SW_VERSION) {
    self.skipWaiting();
  }
  if (data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Network-only for API or non-GET to avoid caching sensitive data
  if (request.method !== 'GET' || isApi(request)) {
    event.respondWith(fetch(request));
    return;
  }

  if (isNavigation(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put('/index.html', copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  if (isStatic(request)) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request)
          .then(response => {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy)).catch(() => {});
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(request))
  );
});
