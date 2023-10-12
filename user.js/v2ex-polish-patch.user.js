// ==UserScript==
// @name 🐻 V2EX Polish Patch
// @description V2EX Polish插件补丁
// @author anaer
// @version 1.0.2
// @grant none
// @noframes
// @run-at       document-start
// @include https://www.v2ex.com/*
// @include https://www.v2ex.com/t/*
// @icon https://www.v2ex.com/favicon.ico
// @downloadURL https://github.com/anaer/UserScript/raw/main/v2ex-polish-patch.user.js
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

/* 调整右侧栏顺序 移到左边 */
body #Rightbar {
    order: 1;
    float: none;
}
`

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = css;
document.documentElement.appendChild(styleEl);