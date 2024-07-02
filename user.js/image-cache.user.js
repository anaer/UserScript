// ==UserScript==
// @name         图片缓存处理
// @description  为图片添加error事件
// @version      2024.07.02.1358
// @author       anaer
// @match        *://*/*
// @grant        none
// @icon         https://www.v2ex.com/favicon.ico
// @run-at       document-end
// @namespace    https://github.com/anaer/UserScript
// ==/UserScript==
// 2024.1.16.1410: 调整run-at执行时机, 更新版本号规则
// 2024.1.16.1658: 过滤base64图片, 只处理http链接

(function() {
    'use strict';

    // 处理imgur图片链接 偶尔访问过多时 会返回429状态码, 这种情况替换下链接
    var imgUrls = document.querySelectorAll('img');

    // 遍历每个图片链接
    imgUrls.forEach(function(img) {
        img.addEventListener('error', function () {
            // if (img.src.toLowerCase().indexOf('images.weserv.nl') === -1 && img.src.toLowerCase().startsWith("http")) {
                // img.src = 'https://images.weserv.nl/?url='+img.src;
            // }
            
            if (img.src.toLowerCase().indexOf('img.noobzone.ru') === -1 && img.src.toLowerCase().startsWith("http")) {
                img.src = 'https://img.noobzone.ru/getimg.php?url='+img.src;
            }
        });
    });
    
    const open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes('https://img.noobzone.ru/getimg.php')) {
            this.setRequestHeader('Referer', '');
        }
        return open.apply(this, arguments);
    }

})();