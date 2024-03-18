// ==UserScript==
// @name         Nacos页面优化
// @namespace    https://github.com/anaer/UserScript
// @version 2024.3.18.1416
// @description Nacos配置详情页配置内容编辑框 高度调整
// @author anaer
// @grant none
// @noframes
// @include http://*/nacos/#/configdetail?*
// @include http://*/nacos/#/config*
// @icon https://nacos.io/favicon.ico
// ==/UserScript==
/*jshint multistr: true */

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = "\
#container{\
	/* 调整编辑框高度, 适配浏览器*/\
	height: 480px !important;\
}\
";
document.documentElement.appendChild(styleEl);
