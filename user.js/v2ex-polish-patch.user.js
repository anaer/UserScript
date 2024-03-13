// ==UserScript==
// @name V2EX Polish Patch
// @description V2EX Polish插件补丁
// @author anaer
// @version 2024.3.13.1758
// @grant none
// @noframes
// @run-at       document-start
// @include https://*.v2ex.com/*
// @include https://*.v2ex.com/t/*
// @include https://v2ex.com/*
// @include https://v2ex.com/t/*
// @icon https://www.v2ex.com/favicon.ico
// ==/UserScript==
/*jshint multistr: true */

var css = `
/* 去广告等隐藏元素 */
ins.adsbygoogle,
.v2p-footer,
.v2p-topic-preview-btn
{
display: none !important;
}

/* 楼中楼 增加缩进 更明显 */
.cell > .cell {
    padding-left: 25px !important;
}

/* 修改content最大宽度, 更大利用屏幕宽度 */
.content {
    max-width: 85% !important;
}

/* 调整右侧栏顺序 移到左边; 用的不多 还是隐藏吧 */
body #Rightbar {
    order: 1;
    float: none;
    display: none !important;
}
`

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = css;
document.documentElement.appendChild(styleEl);