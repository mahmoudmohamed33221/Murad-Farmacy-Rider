// service worker: تشغيل أوفلاين للواجهة + إشعارات Firebase في الخلفية للمتصفح
const BUILD = "__BUILD__";
const CACHE = "mrf-" + BUILD;
const SHELL = ["./", "index.html", "config.js", "assets/style.css", "assets/app.js", "assets/logo.png", "manifest.webmanifest"];

importScripts("config.js");
try {
  const F = self.APP_CONFIG && self.APP_CONFIG.FIREBASE;
  if (F && F.apiKey && F.projectId && F.messagingSenderId && F.appId) {
    importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js", "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
    firebase.initializeApp(F);
    firebase.messaging();   // إشعارات (notification) بتتعرض لوحدها في الخلفية
  }
} catch (e) {}

self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("mrf-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// الشبكة أولاً (علشان أي تحديث يظهر فوراً) وبعدها الكاش لو النت واقع. طلبات الشيت والخطوط مش بتتخزن.
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); } return res; }).catch(() => caches.match(r).then((m) => m || caches.match("index.html"))));
});
self.addEventListener("message", (e) => { if (e.data === "skipWaiting") self.skipWaiting(); });
