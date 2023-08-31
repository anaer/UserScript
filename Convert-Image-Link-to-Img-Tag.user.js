// ==UserScript==
// @name         转换图片链接为图片标签
// @namespace    https://github.com/anaer/UserScript
// @version      1.0
// @description  Converts image links to <img> tags on webpages
// @description:zh-CN 转换页面上的图片链接为img标签进行展示
// @author       anaer
// @match        https://www.v2ex.com/t/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取页面上所有的图片链接
    var imageLinks = document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]');

    // 遍历每个图片链接
    imageLinks.forEach(function(link) {
        // 创建 <img> 标签元素
        var img = document.createElement('img');

        // 设置 <img> 标签的 src 属性为图片链接的地址
        img.src = link.href;

        // 添加 CSS 样式，使图片自适应大小
        img.style.maxWidth = "100%";
        img.style.height = "auto";

        // 替换图片链接为 <img> 标签
        link.parentNode.replaceChild(img, link);
    });
})();
