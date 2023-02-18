import { PrepareMailbody } from "./prepare";

import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

/**
 * メルマガ音声化の前処理
 */
(function () {
    'use strict';
    console.log("run script.")
    const converter = new PrepareMailbody("app")
    converter.build()

})();
