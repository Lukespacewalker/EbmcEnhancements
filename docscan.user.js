// ==UserScript==
// @namespace     https://github.com/lukespacewalker
// @name          Docscan Enhancement
// @author        Suttisak Denduangchai
// @description   Multiple enhancements for Docscan
// @copyright     2025, Suttisak Denduangchai (https://github.com/lukespacewalker)
// @license       MIT
// @version       1.0.1
// @include       https://dscanweb.bdms.co.th/*
// @grant         GM_addStyle
// ==/UserScript==

function removeTimeout() {
    window.clearInterval(unsafeWindow.timer)
    unsafeWindow.timer = null
}

function main() {
    removeTimeout();
}

/*
    Run the main function on DOMContentLoaded
*/
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}
