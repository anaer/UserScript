// ==UserScript==
// @name         自动注入vConsole调试工具
// @namespace    https://github.com/anaer/UserScript
// @version      25.411.1438
// @description  自动为所有网页注入移动端调试控制台，支持查看日志、网络请求等信息
// @author       anaer
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 检测是否已存在vConsole
    if (window.VCONSOLE_LOADED || typeof VConsole !== 'undefined') return;
    window.VCONSOLE_LOADED = true;

    // 动态加载vConsole
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js';
    script.onload = () => {
        const vConsole = new VConsole({
            theme: 'dark',              // 主题色：dark/light
            defaultPlugins: ['system', 'network', 'element', 'storage'], // 内置插件
            onReady() {
            }
        });

        // 错误捕获增强
        const originalConsoleError = console.error;
        console.error = function(...args) {
            vConsole.show();
            originalConsoleError.apply(console, args);
        };
    };

    script.onerror = () => {
        window.VCONSOLE_LOADED = false;
    };

    document.body.appendChild(script);
})();
