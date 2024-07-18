// ==UserScript==
// @name         Linux.do 自动点赞
// @namespace    https://github.com/anaer/UserScript
// @version      2024.07.18.1310
// @description  停留片刻自动点赞
// @author       anaer
// @match        https://linux.do/t/topic/*
// @icon         https://cdn.linux.do/uploads/default/original/3X/b/4/b4fa45d8b03df61f5d011e173c0adf8497028b16.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 目标按钮的选择器
    const buttonSelector = 'article#post_1 .discourse-reactions-reaction-button[title="点赞此帖子"]';


    // 定义函数来启动定时任务
    const startTimer = () => {
        console.log('目标按钮已加载，开始计时');
        setTimeout(function() {
            let likeButton = document.querySelector(buttonSelector);
            if (likeButton) {
                likeButton.click();
                console.log('点赞按钮已被自动点击');
            } else {
                console.log('定时任务执行时未找到点赞按钮');
            }
        }, 10000); // 60000毫秒等于1分钟
    };

    // 使用MutationObserver来监视DOM变化
    const observeDOMChanges = () => {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (document.querySelector(buttonSelector)) {
                    startTimer();
                    // 停止观察，避免多次触发
                    observer.disconnect();
                    break;
                }
            }
        });

        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
        console.log('MutationObserver已启动，正在监听DOM变化');
    };

    // 使用setInterval来反复检查页面是否重新加载
    const checkPageReload = () => {
        let lastHref = location.href;
        setInterval(() => {
            if (location.href !== lastHref) {
                console.log('检测到页面重新加载');
                lastHref = location.href;
                observeDOMChanges();
            }
        }, 1000); // 每秒检查一次
    };

    // 初次加载时启动观察和定时任务
    observeDOMChanges();
    checkPageReload();

})();