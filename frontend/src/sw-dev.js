export default function swDev(){
  //a service worker triggering file
  navigator.serviceWorker.register(process.env.PUBLIC_URL + "/service-worker.js")
    .then(registration => {
      console.log("Service worker registration completed", registration);
      console.log("Scope:", registration.scope);
    })
    .catch(error => {
      console.error("Service worker registration failed", error);
    });
}