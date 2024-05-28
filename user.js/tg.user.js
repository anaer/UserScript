// ==UserScript==
// @name         Redirect to Telegram and Close Tab
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  将特定的URL重定向到Telegram协议链接，并关闭当前标签页
// @author       ChatGPT
// @match        https://tgnav.github.io/*
// @match        https://tgnav.github.io/go/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取当前页面的URL
    const currentUrl = window.location.href;

    // 使用URL API解析URL
    const url = new URL(currentUrl);

    // 获取URL中的username参数
    const username = url.searchParams.get('username');

    // 检查username参数是否存在
    if (username) {
        // 构建新的Telegram协议链接
        const newUrl = `tg://resolve?domain=${username}`;

        // 执行重定向
        window.location.replace(newUrl);

        // 延迟一段时间后关闭标签页，确保重定向生效
        setTimeout(() => {
            window.close();
        }, 500);  // 延迟1秒
    }
})();
