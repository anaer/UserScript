// ==UserScript==
// @name         Remove Referer for Noobzone Images
// @namespace    https://github.com/anaer/UserScript
// @version      1.0
// @description  去掉referer参数在请求https://img.noobzone.ru/getimg.php时
// @author       anaer
// @match        *://img.noobzone.ru/getimg.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes('https://img.noobzone.ru/getimg.php')) {
            this.setRequestHeader('Referer', '');
        }
        return open.apply(this, arguments);
    };
})();