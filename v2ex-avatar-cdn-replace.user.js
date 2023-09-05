// ==UserScript==
// @name         V2EX头像CDN替换
// @namespace    https://github.com/anaer/UserScript
// @version      1.0
// @description  自动替换V2EX网站上的头像CDN
// @author       anaer
// @match        https://www.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取所有头像图片元素
    var avatars = document.querySelectorAll('.avatar');

    // 循环遍历每个头像图片元素
    avatars.forEach(function(avatar) {
        // 获取原始头像图片URL
        var originalUrl = avatar.src;

        // 判断是否是V2EX默认头像
        if (originalUrl.includes('cdn.v2ex.com/avatar/')) {
            // 替换CDN地址
            var newUrl = originalUrl.replace('cdn.v2ex.com/avatar/', 'gravatar.loli.net/avatar/');

            // 替换头像图片URL
            avatar.src = newUrl;
        }
    });
})();
