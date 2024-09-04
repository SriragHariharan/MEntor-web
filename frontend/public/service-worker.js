//the callback function is triggered when the service worker is installed
this.addEventListener('install', (event) => {
  event.waitUntil(
    //caching the static assets on load of the browser
    caches.open('static-assets').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/static/js/bundle.js',
        '/static/css/style.css',
        '/static/js/0.chunk.js',

        //routes to be cached
        '/',
        //mentee routes to be cached
        "/mentee/dashboard",
        "/mentee/profile",
        "/mentee/mentors",
        "/mentee/notifications",
        "/mentee/interviews",
        "/mentee/webinars",

        //mentor routes
        "/mentor/dashboard",
        "/mentor/profile",
        "/mentor/notifications",
        "/mentor/interviews",
        "/mentor/mentees",
        "/mentor/revenue",
        "/mentor/webinars"
      ]);
    })
  );
});


//callback function is triggered when a fetch request is triggered
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    // Show notification for all requests when offline
    event.waitUntil(
      this.registration.showNotification("Internet", {
        body: "You are currently offline.",
      })
    );

    // Try to find a cached response for the request
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
         else {
          // If no cached response is found, return a fallback response
          return new Response("<div style=`text-align: center; margin-top: 20vh; font-size: 24px; font-weight: bold; color: #333;`><h1>Oops, you are offline!</h1><p>Please check your internet connection and try again.</p></div>", {
            status: 404,
            statusText: "Not Found",
            headers: new Headers({
              "Content-Type": "text/html",
            }),
          });
        }
      })
    );
  } else {
    // If online, allow the request to proceed as usual
    event.respondWith(fetch(event.request));
  }
});