// ==UserScript==
// @name         Nacos Style
// @name:zh-CN   Nacos页面优化
// @version      24.1119.1536
// @description  Nacos配置详情页配置内容编辑框 高度调整
// @author anaer
// @grant none
// @noframes
// @include http://*/nacos/*
// @include http://*/nacos/#/configdetail?*
// @include http://*/nacos/#/config*
// @icon https://nacos.io/favicon.ico
// @namespace    https://github.com/anaer/UserScript
// ==/UserScript==
/*jshint multistr: true */

var styleEl = document.createElement('style');
// styleEl.type = 'text/css';
styleEl.innerHTML = "\
#container{\
	/* 调整编辑框高度, 适配浏览器*/\
	height: 480px !important;\
}\
";
document.documentElement.appendChild(styleEl);