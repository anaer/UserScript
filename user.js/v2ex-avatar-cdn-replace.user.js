// ==UserScript==
// @name         V2EX头像CDN替换
// @namespace    https://github.com/anaer/UserScript
// @version      2024.1.15.1631
// @description  自动替换V2EX网站上的头像CDN
// @author       anaer
// @match        https://www.v2ex.com/*
// @match        https://v2ex.com/*
// @icon         https://www.v2ex.com/favicon.ico
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
        if (/cdn\.v2ex\.com\/(gravatar|avatar)\//.test(originalUrl)) {
            // 创建新的图片元素
            var newAvatar = new Image();

            // 监听加载成功事件
            newAvatar.onload = function() {
                // 加载成功，替换头像图片元素
                avatar.src = newAvatar.src;
            };

            // 监听加载失败事件
            newAvatar.onerror = function() {
                // 加载失败，替换CDN地址
                var newUrl = originalUrl.replace(/cdn\.v2ex\.com\/(gravatar|avatar)\//, 'gravatar.loli.net/avatar/');
                avatar.src = newUrl;
            };

            // 设置新的图片元素的src属性，开始加载头像
            newAvatar.src = originalUrl;
        }
    });
})();