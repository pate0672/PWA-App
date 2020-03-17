importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

var CACHE_NAME = "PWA-v1";
var urlsToCache = [
  "/",
  "/offline.html",
  "/css/offline.css",
  "/js/main.js",
  "/img/headeroffline.png",
  "/img/4k-wallpaper-beatiful-landscape-beautiful-view-2425397.jpg",
  "http://api.weatherbit.io/v2.0/current?key=b3090c4d10124a92bc72bc826a815035&lat=45.35&lon=-75.75"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("Service worker is activated");
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      if (!navigator.onLine) {
        return caches.match(new Request("/offline.html"));
      }
      return fetch(event.request);
    })
  );
});
