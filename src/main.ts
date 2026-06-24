import { PrepareMailbody } from "./prepare";

// Custom styles (Editorial Dark Design System)
import "./styles.css"

/**
 * メルマガ音声化の前処理
 */
(function () {
    'use strict';
    console.log("run script.")
    const converter = new PrepareMailbody("app")
    converter.build()

    // 共有データのチェックとフィールドへの反映
    window.addEventListener('DOMContentLoaded', () => {
        loadSharedText();
    });

    // 共有テキストを入力欄に反映する
    function applySharedText(text: string) {
        if (!text) return;
        const fromField = PrepareMailbody.get_from_field();
        if (!fromField) return;
        fromField.value = text;
        PrepareMailbody.change_from();
        PrepareMailbody.autofill_subject(text);  // 見出しの自動検出

        // URLパラメータをクリア
        window.history.replaceState({}, document.title, window.location.pathname);
        console.log('Shared text loaded into from field');
    }

    // Share Target から渡された共有テキストを取得して反映する
    async function loadSharedText() {
        const params = new URLSearchParams(window.location.search);

        // 後方互換: 旧方式（?shared_text= でURLに載せる）
        const legacy = params.get('shared_text');
        if (legacy) {
            applySharedText(legacy);
            return;
        }

        // 現行方式: Service Worker が Cache に退避したテキストを読み出す
        if (params.get('shared') === '1' && 'caches' in window) {
            try {
                const cache = await caches.open('mailsmooth-share');
                const res = await cache.match('/mail_smooth_web/__shared__');
                if (res) {
                    const text = await res.text();
                    await cache.delete('/mail_smooth_web/__shared__');  // 一度きり
                    applySharedText(text);
                }
            } catch (e) {
                console.error('Failed to load shared text from cache:', e);
            }
        }
    }

})();
