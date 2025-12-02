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
    });

})();
