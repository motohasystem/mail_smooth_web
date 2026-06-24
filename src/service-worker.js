/* eslint-env worker, serviceworker */
"use strict";

/**
 * MailSmooth Service Worker
 *
 * 主目的は Web Share Target（Androidの「共有」→MailSmooth）の受け取り。
 * メルマガは2万字級になるため、共有テキストはURLクエリに載せず Cache Storage に
 * 退避してからアプリ本体へリダイレクトする（URL長制限を構造的に回避する）。
 *
 * 注意:
 *  以前のバージョンは sw-precache 由来の precache を持っていたが、ハッシュ付きの
 *  旧ファイル名を参照しており --no-content-hash ビルドでは全て404になって install が
 *  失敗し、SWが起動しなかった。precache は撤廃しオンライン優先とする。
 */

// 共有テキストの退避先（SWとアプリ本体で共有するキー）
const SHARE_CACHE = "mailsmooth-share";
const SHARE_KEY = "/mail_smooth_web/__shared__";
const SHARE_TARGET_PATH = "/mail_smooth_web/share-target";
const APP_URL = "/mail_smooth_web/";

// 即時有効化（古いSWを待たずに置き換える）
self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Share Target からのリクエストを処理（POST/GET両対応）
    if (url.pathname === SHARE_TARGET_PATH) {
        event.respondWith(handleShareTarget(event.request));
        return;
    }

    // それ以外はネットワークに委譲（オンライン優先）
});

/**
 * 共有データを取り出して Cache に退避し、アプリ本体へリダイレクトする。
 */
async function handleShareTarget(request) {
    try {
        let title = "";
        let text = "";
        let link = "";

        if (request.method === "POST") {
            const formData = await request.formData();
            title = formData.get("title") || "";
            text = formData.get("text") || "";
            link = formData.get("url") || "";
        } else {
            const params = new URL(request.url).searchParams;
            title = params.get("title") || "";
            text = params.get("text") || "";
            link = params.get("url") || "";
        }

        // タイトル・本文・URLを結合
        let combined = "";
        if (title) combined += title + "\n\n";
        if (text) combined += text;
        if (link) combined += "\n\n" + link;
        combined = combined.trim();

        // Cache に退避（URLには載せない）
        const cache = await caches.open(SHARE_CACHE);
        await cache.put(
            SHARE_KEY,
            new Response(combined, {
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
        );

        // shared=1 のフラグだけ付けてアプリ本体へ
        const redirectUrl = new URL(APP_URL, self.location.origin);
        redirectUrl.searchParams.set("shared", "1");
        return Response.redirect(redirectUrl.toString(), 303);
    } catch (error) {
        // 失敗してもアプリは開く
        return Response.redirect(APP_URL, 303);
    }
}
