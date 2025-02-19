/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
"use strict";

var precacheConfig = [
    [
        "/mail_smooth_web/Icon-72.b5763a7f.png",
        "ca8ebad6c1be0425f06a0772776e3c33",
    ],
    [
        "/mail_smooth_web/Icon-72.dc9ba8a6.png",
        "ca8ebad6c1be0425f06a0772776e3c33",
    ],
    ["/mail_smooth_web/index.html", "19bcb2126d3c4e7e1cc03d1a8d6a9854"],
    ["/mail_smooth_web/main.ad1146e4.js", "cd518dba7549001ecf4b64125836e21e"],
    ["/mail_smooth_web/main.c39d6dcf.css", "3f30c2c47d7d23c7a994db0c862d45a5"],
    ["/mail_smooth_web/main.c39d6dcf.js", "9da646d0d57473724f041187525557ad"],
    ["/mail_smooth_web/main.dd190a74.css", "3f30c2c47d7d23c7a994db0c862d45a5"],
    ["/mail_smooth_web/main.fecd1a2a.js", "49dde5343922ba4b7850746496c948c8"],
    ["/mail_smooth_web/mdpi.3e1950d7.png", "58ce5fde9ec6e2139db98950c9a6c41a"],
    ["/mail_smooth_web/mdpi.946aede6.png", "58ce5fde9ec6e2139db98950c9a6c41a"],
    ["/mail_smooth_web/service_worker.js", "a9f31019c5cf5ec2c101eb03ae571c2d"],
    ["/mail_smooth_web/xhdpi.4e75916f.png", "7f095ca2981426957869bc67653c62ae"],
    ["/mail_smooth_web/xhdpi.57618e9b.png", "7f095ca2981426957869bc67653c62ae"],
    [
        "/mail_smooth_web/xxhdpi.2eab82c1.png",
        "0bb20cf1fa72af65eca1e0f9be27c75c",
    ],
    [
        "/mail_smooth_web/xxhdpi.37c1e109.png",
        "0bb20cf1fa72af65eca1e0f9be27c75c",
    ],
    [
        "/mail_smooth_web/xxxhdpi.1be4c00c.png",
        "e5ef4ed715f96038482dde018e465265",
    ],
    [
        "/mail_smooth_web/xxxhdpi.97d2a669.png",
        "e5ef4ed715f96038482dde018e465265",
    ],
];
var cacheName =
    "sw-precache-v3-dev-" + (self.registration ? self.registration.scope : "");

var ignoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === "/") {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise =
        "body" in originalResponse
            ? Promise.resolve(originalResponse.body)
            : originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText,
        });
    });
};

var createCacheKey = function (
    originalUrl,
    paramName,
    paramValue,
    dontCacheBustUrlsMatching
) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (
        !dontCacheBustUrlsMatching ||
        !url.pathname.match(dontCacheBustUrlsMatching)
    ) {
        url.search +=
            (url.search ? "&" : "") +
            encodeURIComponent(paramName) +
            "=" +
            encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = new URL(absoluteUrlString).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (
    originalUrl,
    ignoreUrlParametersMatching
) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = "";

    url.search = url.search
        .slice(1) // Exclude initial '?'
        .split("&") // Split into an array of 'key=value' strings
        .map(function (kv) {
            return kv.split("="); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function (kv) {
            return kv.join("="); // Join each [key, value] array into a 'key=value' string
        })
        .join("&"); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};

var hashParamName = "_sw-precache";
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(
            absoluteUrl,
            hashParamName,
            hash,
            /\.\w{8}\./
        );
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache
        .keys()
        .then(function (requests) {
            return requests.map(function (request) {
                return request.url;
            });
        })
        .then(function (urls) {
            return new Set(urls);
        });
}

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
            .open(cacheName)
            .then(function (cache) {
                return setOfCachedUrls(cache).then(function (cachedUrls) {
                    return Promise.all(
                        Array.from(urlsToCacheKeys.values()).map(function (
                            cacheKey
                        ) {
                            // If we don't have a key matching url in the cache already, add it.
                            if (!cachedUrls.has(cacheKey)) {
                                var request = new Request(cacheKey, {
                                    credentials: "same-origin",
                                });
                                return fetch(request).then(function (response) {
                                    // Bail out of installation unless we get back a 200 OK for
                                    // every request.
                                    if (!response.ok) {
                                        throw new Error(
                                            "Request for " +
                                                cacheKey +
                                                " returned a " +
                                                "response with status " +
                                                response.status
                                        );
                                    }

                                    return cleanResponse(response).then(
                                        function (responseToCache) {
                                            return cache.put(
                                                cacheKey,
                                                responseToCache
                                            );
                                        }
                                    );
                                });
                            }
                        })
                    );
                });
            })
            .then(function () {
                // Force the SW to transition from installing -> active state
                return self.skipWaiting();
            })
    );
});

self.addEventListener("activate", function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches
            .open(cacheName)
            .then(function (cache) {
                return cache.keys().then(function (existingRequests) {
                    return Promise.all(
                        existingRequests.map(function (existingRequest) {
                            if (!setOfExpectedUrls.has(existingRequest.url)) {
                                return cache.delete(existingRequest);
                            }
                        })
                    );
                });
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

self.addEventListener("fetch", (event) => {
    // リクエストメソッドがPOSTで、パスが/share-targetの場合に処理を行う
    if (event.request.method === "POST" && url.pathname === "/share-target") {
        event.respondWith(handlePostRequest(event.request));
    }
});

async function handlePostRequest(request) {
    try {
        alert("handlePostRequest");
        // リクエストをクローンしてリクエストボディを取得
        const clonedRequest = request.clone();
        const requestData = await clonedRequest.formData();

        // リクエストボディから送信されたデータを取得する
        const postData = {};
        for (const [key, value] of requestData.entries()) {
            postData[key] = value;
        }
        console.log(postData);

        // 通常のリクエスト処理を行う
        const response = await fetch(request);
        return response;
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response(null, { status: 500 });
    }
}

