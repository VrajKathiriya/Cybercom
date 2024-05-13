const cacheArr = ["/"];
const CACHE_NAME = "cache-v3";

self.addEventListener("install", (event) => {
  console.log("service worker is installed");

  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     console.log("Opned cache");
  //     cache.addAll(cacheArr).then(() => self.skipWaiting());
  //   })
  // );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log(cacheName);
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // cache hit - return response
//       if (response) return response;
//       return fetch(event.request).catch(() => caches.match(event.request));
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const cacheRes = res.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, cacheRes));
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});
