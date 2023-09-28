// ==UserScript==
// @name 🐻 V2EX Polish Patch
// @description V2EX Polish插件补丁
// @author anaer
// @version 1.0.2
// @grant none
// @noframes
// @include https://www.v2ex.com/*
// @include https://www.v2ex.com/t/*
// @icon https://www.v2ex.com/favicon.ico
// @run-at       document-start
// ==/UserScript==
/*jshint multistr: true */

// 1. 隐藏右侧栏
// 2. 楼中楼 增加缩进 更明显
// 3. 修改content最大宽度, 更大利用屏幕宽度
// 4. 调整右侧栏顺序 移到左边
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = "\
\
ins.adsbygoogle,\
.v2p-footer,\
.v2p-topic-preview-btn\
{\
display: none !important;\
}\
\
.cell > .cell {\
    padding-left: 25px !important;\
}\
.content {\
    max-width: 85% !important;\
}\
body #Rightbar {\
    order: 1;\
    float: none;\
}\
";
document.documentElement.appendChild(styleEl);