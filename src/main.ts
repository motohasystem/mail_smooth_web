import { PrepareMailbody } from "./prepare";

import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

// TutorialWidgetの型定義
declare global {
    interface Window {
        TutorialWidget: {
            new (config: { configUrl: string; storageKey: string }): {
                init(): Promise<void>;
                close(): void;
            };
            reset(storageKey?: string): void;
        };
    }
}

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
        const params = new URLSearchParams(window.location.search);
        const sharedText = params.get('shared_text');

        if (sharedText) {
            const fromField = PrepareMailbody.get_from_field();
            if (fromField) {
                fromField.value = sharedText;
                PrepareMailbody.change_from();

                // URLパラメータをクリア
                window.history.replaceState({}, document.title, window.location.pathname);

                console.log('Shared text loaded into from field');
            }
        }

        // チュートリアルの初期化
        if (window.TutorialWidget) {
            const tutorial = new window.TutorialWidget({
                configUrl: 'tutorial/tutorial-config.json',
                storageKey: 'mailsmooth-tutorial-dismissed'
            });
            tutorial.init().catch(error => {
                console.error('Failed to initialize tutorial:', error);
            });
        }
    });

})();
