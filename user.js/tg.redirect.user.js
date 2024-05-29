// ==UserScript==
// @name         快速跳转TG
// @version      2024.5.29.1105
// @description  快速跳转TG
// @author       anaer
// @match        https://tgnav.github.io/*
// @match        https://tgnav.github.io/go/*
// @namespace    https://github.com/anaer/UserScript
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
