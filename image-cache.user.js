// ==UserScript==
// @name         😄 图片缓存处理
// @namespace    https://github.com/anaer/UserScript
// @version      1.10
// @description  为图片添加error事件
// @author       anaer
// @match        http://*
// @match        https://*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 处理imgur图片链接 偶尔访问过多时 会返回429状态码, 这种情况替换下链接
    var imgUrls = document.querySelectorAll('img');

    // 遍历每个图片链接
    imgUrls.forEach(function(img) {
        img.addEventListener('error', function () {
            if (img.src.toLowerCase().indexOf('images.weserv.nl') === -1) {
                img.src = 'https://images.weserv.nl/?url='+img.src;
            }
        });
    });

})();