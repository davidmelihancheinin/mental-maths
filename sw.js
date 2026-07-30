/* Service worker : met l'app en cache pour un fonctionnement 100 % hors-ligne (métro). */
const CACHE = 'calcul-mental-v7';
const APP_FILE = './Calcul Mental (standalone).html';
const FILES = [APP_FILE, './index.html', './manifest.webmanifest', './icon.svg'];
// SDK du classement partagé + du compte + police : mis en cache en best-effort,
// ne doit jamais bloquer l'installation hors-ligne du reste de l'app si le
// réseau est absent/lent.
const EXTRA = [
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES).then(() =>
        Promise.all(EXTRA.map(u => fetch(u).then(r => r.ok && c.put(u, r)).catch(() => {})))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(APP_FILE)))
  );
});
