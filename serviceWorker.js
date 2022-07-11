var cacheName = 'v1.0.25';

self.addEventListener('fetch', event => {
  event.waitUntil(async function() {
    if (!event.clientId) return;

    const client = await clients.get(event.clientId);

    if (!client) return;

    client.postMessage({
     version: cacheName.replace('v', '')
    });

  }());
})

self.skipWaiting();