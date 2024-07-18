// ==UserScript==
// @name         图片缓存处理
// @description  为图片添加error事件
// @version      2024.07.09.1311
// @author       anaer
// @match        *://*/*
// @exclude-match https://linux.do/*
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
            if (img.src.toLowerCase().startsWith("http")) {
                const id = img.dataset.id || '0';


                switch (id) {
                    case '0':
                        img.src = 'https://images.weserv.nl/?url='+img.src;
                        img.dataset.id = '1';
                        break;
                    case '1':
                        img.src = img.src.replace('https://images.weserv.nl/?url=', 'https://search.pstatic.net/common?src=');
                        img.dataset.id = '2';
                        break;
                    case '2':
                        img.src = img.src.replace('https://search.pstatic.net/common?src=', 'https://img.noobzone.ru/getimg.php?url=');
                        img.dataset.id = '3';
                        break;
                    default:
                        break;
                }
            }
        });
    });

    // const originalOpen = XMLHttpRequest.prototype.open;
    // const originalSend = XMLHttpRequest.prototype.send;

    // XMLHttpRequest.prototype.open = function(method, url) {
    //     if (url) {
    //         this._isTargetUrl = url.includes('https://img.noobzone.ru/getimg.php');
    //     }
    //     return originalOpen.apply(this, arguments);
    // };

    // XMLHttpRequest.prototype.send = function() {
    //     if (this._isTargetUrl) {
    //         this.setRequestHeader('Referer', '');
    //     }
    //     return originalSend.apply(this, arguments);
    // };

})();