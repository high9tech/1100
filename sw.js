// HIGH TECH PS - Service Worker for Offline Support
const CACHE_NAME = 'hightech-ps4-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './cache.manifest',
    './sw.js',
    './includes/style.css',
    './includes/script.js',
    './src/loader.js',
    './src/lapse.js',
    './src/workers.js',
    './src/worker.js',
    './src/utils.mjs',
    './src/netctrl.js',
    './src/misc.js',
    './src/main.js',
    './src/webkit_psfree.js',
    './src/psfree.js',
    './src/ps4/userland.js',
    './src/ps4/offsets.mjs',
    './src/ps4/kernel.js',
    './src/ps4/constants.js',
    './src/ps4/userland.mjs',
    './src/ps4/patches/600.bin',
    './src/ps4/patches/620.bin',
    './src/ps4/patches/650.bin',
    './src/ps4/patches/670.bin',
    './src/ps4/patches/700.bin',
    './src/ps4/patches/750.bin',
    './src/ps4/patches/800.bin',
    './src/ps4/patches/850.bin',
    './src/ps4/patches/900.bin',
    './src/ps4/patches/903.bin',
    './src/ps4/patches/950.bin',
    './src/ps4/patches/1000.bin',
    './src/ps4/patches/1050.bin',
    './src/ps4/patches/1100.bin',
    './src/ps4/patches/1102.bin',
    './src/ps4/patches/payload.bin'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[HIGH TECH PS] Caching assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
