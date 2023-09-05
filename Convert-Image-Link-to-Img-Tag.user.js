// ==UserScript==
// @name         显示网页中的图片链接
// @namespace    https://github.com/anaer/UserScript
// @version      1.4
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
        // console.log('处理图片链接:', link.outerHTML)

        // 检查<a>元素的子节点是否包含<img>标签
        const hasImgTag = Array.from(link.childNodes).some(node => node.nodeName === "img");
        if(hasImgTag){
          // console.log('包含img标签跳过', link.href)
          return
        }
        // 创建 <img> 标签元素
        var img = document.createElement('img');

        // 设置 <img> 标签的 src 属性为图片链接的地址
        img.src = link.href;

        // 添加 CSS 样式，使图片自适应大小
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";

        // 替换图片链接为 <img> 标签
        link.parentNode.replaceChild(img, link);
    });

    // 处理imgur图片链接
    // 测试页面: https://www.v2ex.com/t/970489
    var imageUrs = document.querySelectorAll('a[href^="https://imgur.com/"]');

    // 遍历每个图片链接
    imageUrs.forEach(function(link) {

        const url = link.href;
        const replacedUrl = url.replace(/imgur\.com\/([\w\d]+)/, "i.imgur.com/$1_d.webp?maxwidth=760&fidelity=grand");

        // 创建 <img> 标签元素
        var img = document.createElement('img');

        // 设置 <img> 标签的 src 属性为图片链接的地址
        img.src = replacedUrl;

        // 添加 CSS 样式，使图片自适应大小
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";

        // 替换图片链接为 <img> 标签
        link.parentNode.replaceChild(img, link);
    });
})();