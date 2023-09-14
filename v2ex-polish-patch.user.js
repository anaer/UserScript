// ==UserScript==
// @name V2EX Polish Patch
// @description V2EX Polish插件补丁
// @author anaer
// @version 1.0.1
// @grant none
// @noframes
// @include https://www.v2ex.com/*
// @include https://www.v2ex.com/t/*
// @icon https://www.v2ex.com/favicon.ico
// ==/UserScript==
/*jshint multistr: true */

// 1. 隐藏右侧栏
// 2. 楼中楼 增加缩进 更明显
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = "\
\
ins.adsbygoogle,\
.v2p-footer,\
.v2p-topic-preview-btn,\
#Rightbar {\
display: none !important;\
}\
\
.cell > .cell {\
    padding-left: 25px !important;\
}\
";
document.documentElement.appendChild(styleEl);
