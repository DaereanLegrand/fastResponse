self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('v1').then(cache => cache.addAll([
			'/',
			'/index.html',
            '/main.js',
			'/styles.css',
			'/validation.js',
			'/manifest.json',
		]))
	)
	self.skipWaiting()
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => response || fetch(event.request))
	)
})

self.addEventListener('push', event => {
	const data = event.data ? event.data.json() : {}
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: '/icon.png',
	})
})

