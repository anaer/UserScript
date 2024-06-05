// ==UserScript==
// @name         Telegram Link Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirect Telegram links to tg protocol
// @author       anaer
// @match        https://t.me/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Replace the URL and redirect
    window.location.href = window.location.href.replace('https://t.me/', 'tg://resolve?domain=');

    // 延迟一段时间后关闭标签页，确保重定向生效
    setTimeout(() => {
        window.close();
    }, 500);  // 延迟1秒
})();