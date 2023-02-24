// キャッシュファイルの指定
var CACHE_NAME = 'mailsmooth-pwa-caches';

// Service Worker のバージョン
const CACHE_VERSION = 1;

// キャッシュするリソースのリスト
const CACHE_LIST = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/mail_smooth_web/index.html',
];

// Service Worker のインストール処理
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-v${CACHE_VERSION}`).then(cache => {
      return cache.addAll(CACHE_LIST);
    })
  );
});

// Service Worker のアクティブ化処理
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !key.startsWith(`cache-v${CACHE_VERSION}`);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

// Service Worker のフェッチ処理
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
