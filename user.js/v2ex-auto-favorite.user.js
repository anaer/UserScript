// ==UserScript==
// @name         自动收藏
// @namespace    https://github.com/anaer/UserScript
// @version      2024.07.02.1618
// @description  自动点击 "Favorite This Node" 链接
// @author       anaer
// @match        https://*.v2ex.com/*
// @match        https://v2ex.com/*
// @icon         https://www.v2ex.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 等待页面加载完成
    window.addEventListener('load', function() {
        // 查找所有 a 标签
        var links = document.getElementsByTagName('a');

        // 遍历所有 a 标签
        for (var i = 0; i < links.length; i++) {
            // 判断 a 标签的文本内容是否为 "Favorite This Node"
            if (links[i].textContent.trim() === "Favorite This Node") {
                // 如果匹配，则点击该链接
                links[i].click();
                break;
            }
        }
    }, false);
})();
