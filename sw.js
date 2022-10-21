const cacheName = 'random-generator-cache';
const cacheVersion = '1.0.1'; // Needed for service worker auto update

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.delete(cacheName).then((deleted) => {
			caches.open(cacheName).then((cache) => cache.addAll([
				'/random-generator/',
				'/random-generator/manifest.json',
				'/random-generator/assets/images/icon.png',
				'/random-generator/assets/images/icon-192x192.png',
				'/random-generator/assets/css/bootstrap.min.css',
				'/random-generator/assets/css/bootstrap-icons.min.css',
				'/random-generator/assets/css/fonts/bootstrap-icons.woff2',
				// '/random-generator/assets/css/style.min.css',
				'/random-generator/assets/js/bootstrap.bundle.min.js',
				'/random-generator/assets/js/script.min.js',
			]));
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.open(cacheName).then((cache) => cache.match(event.request).then((response) => response || fetch(event.request))));
});