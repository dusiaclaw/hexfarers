// Hexfarers service worker: cache the app shell so the game works offline once installed.
const CACHE='hexfarers-v2.3-k1';
const FILES=['./','./index.html','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png','./app-icon-maskable-512.png','./apple-touch-icon-180.png','./app-icon-monochrome-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});
