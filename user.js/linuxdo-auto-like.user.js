// ==UserScript==
// @name         Linux.do 自动点赞+阅读
// @namespace    https://github.com/anaer/UserScript
// @version      25.311.1657
// @description  停留片刻自动点赞
// @author       anaer
// @match        https://linux.do/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

// 定义日志方法
// 某些网站会重写 console.log，导致日志无法输出。
const logger = {
    log: (...args) => {
        try {
            // 使用 unsafeWindow 的原始 console
            unsafeWindow.console.log("[脚本日志]", ...args);
        } catch (e) {
            // 异常时回退到 Tampermonkey 内置日志
            // GM_log("日志输出失败: " + e.message);
            console.log("日志输出失败: " + e.message);
        }
    }
};

// 判断是否为上午
function isAM() {
    return new Date().getHours() < 12;
}

const headerButtons = document.querySelector(".header-buttons")

// 默认参数
const DEFAULT_CONFIG = {
    baseDelay: 2500,
    randomDelayRange: 800,
    minReqSize: 8,
    maxReqSize: 20,
    minReadTime: 800,
    maxReadTime: 3000,
    autoStart: true
}
let config = { ...DEFAULT_CONFIG }

const statusLabel = createStatusLabel("待命中")

headerButtons.appendChild(statusLabel)

/**
 * 状态标签封装
 */
function createStatusLabel(initialText) {
    const labelSpan = document.createElement("span")
    labelSpan.id = "statusLabel"
    labelSpan.style.marginLeft = "10px"
    labelSpan.style.marginRight = "10px"

    labelSpan.textContent = initialText
    return labelSpan
}


/**
 * 更新状态标签内容
 */
function updateStatus(text, color = "#555") {
    logger.log(text)
    const statusLabel = document.getElementById("statusLabel")
    if (statusLabel) {
        statusLabel.textContent = text
        statusLabel.style.color = color
    }
}

/**
 * 开始刷取已读帖子
 * @param {string} topicId 主题ID
 * @param {number} totalReplies 总回复数
 */
async function startReading() {
    updateStatus("启动中...")

    const topicId = window.location.pathname.split("/")[3]
    const repliesInfoElement = document.querySelector("div[class=timeline-replies]");
    // 判空 未查到回复数据 直接返回
    if (!repliesInfoElement) {
        return;
    }
    const repliesInfo = repliesInfoElement.textContent.trim();
    const [currentPosition, totalReplies] = repliesInfo.split("/").map(part => parseInt(part.trim(), 10))
    let csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute("content")

    const baseRequestDelay = config.baseDelay
    const randomDelayRange = config.randomDelayRange
    const minBatchReplyCount = config.minReqSize
    const maxBatchReplyCount = config.maxReqSize
    const minReadTime = config.minReadTime
    const maxReadTime = config.maxReadTime

    // 随机数生成
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // 发起读帖请求
    async function sendBatch(startId, endId) {
        const params = createBatchParams(startId, endId)
        try {
            const response = await fetch("https://linux.do/topics/timings", {
                headers: {
                    "accept": "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "discourse-background": "true",
                    "discourse-logged-in": "true",
                    "discourse-present": "true",
                    "priority": "u=1, i",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-csrf-token": csrfToken,
                    "x-requested-with": "XMLHttpRequest",
                    "x-silence-logger": "true"
                },
                referrer: `https://linux.do/`,
                body: params.toString(),
                method: "POST",
                mode: "cors",
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error(`HTTP请求失败，状态码：${response.status}`)
            }
            logger.log(`成功处理回复 ${startId} - ${endId}`)
            updateStatus(`成功处理回复 ${startId} - ${endId}`, "green")
        } catch (e) {
            csrfToken = null
            console.error(`处理回复 ${startId} - ${endId} 失败，自动跳过`)
            updateStatus(`处理回复 ${startId} - ${endId} ，自动跳过`, "red")
        }
        const delay = baseRequestDelay + getRandomInt(0, randomDelayRange)
        await new Promise(r => setTimeout(r, delay))
    }

    // 生成请求body参数
    function createBatchParams(startId, endId) {
        const params = new URLSearchParams()

        for (let i = startId; i <= endId; i++) {
            params.append(`timings[${i}]`, getRandomInt(minReadTime, maxReadTime).toString())
        }
        const topicTime = getRandomInt(minReadTime * (endId - startId + 1), maxReadTime * (endId - startId + 1)).toString()
        params.append('topic_time', topicTime)
        params.append('topic_id', topicId)
        return params
    }

      if (topicId && totalReplies && csrfToken) {
        // updateStatus('开始处理:' + topicId+' '+totalReplies)
        // 只处理未读数超过5的帖子
        if (totalReplies - currentPosition > 5){
          // 批量阅读处理
          for (let i = currentPosition; i <= totalReplies;) {
              const batchSize = getRandomInt(minBatchReplyCount, maxBatchReplyCount)
              const startId = i
              let endId = Math.min(i + batchSize - 1, totalReplies);
              if (totalReplies - endId <= 5) {
                  endId = totalReplies;
              }

              if (csrfToken) {
                await sendBatch(startId, endId)
                i = endId + 1
              } else {
                updateStatus(`处理中止`, "red")
                break
              }
          }
          updateStatus(`处理结束`, "green")
        } else {
          updateStatus(` `, "green")
        }
    }
  }

    // 目标按钮的选择器
    const buttonSelector = 'article#post_1 .discourse-reactions-reaction-button[title="点赞此帖子"]';
    const lastViewSelector = 'span.topic-post-visited-message';


    // 定义函数来启动定时任务
    const startTimer = () => {
        logger.log('目标按钮已加载，开始计时');
        setTimeout(function() {
            let likeButton = document.querySelector(buttonSelector);
            if (likeButton) {
                likeButton.click();
                logger.log('点赞按钮已被自动点击');
            } else {
                logger.log('定时任务执行时未找到点赞按钮');
            }
        }, 3000); // 60000毫秒等于1分钟
    };

    // 使用MutationObserver来监视DOM变化
    const observeDOMChanges = () => {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (document.querySelector(buttonSelector)) {
                    // 只在上午自动点赞, 因为有24小时50赞的限制
                    if (isAM()) {
                        startTimer();
                    }

                    // 自启动处理
                    startReading();

                    // 停止观察，避免多次触发
                    observer.disconnect();
                    break;
                }

              if (document.querySelector(lastViewSelector)) {
                    // 自启动处理
                    startReading();

                    // 停止观察，避免多次触发
                    observer.disconnect();
                    break;
              }
            }
        });

        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
        logger.log('MutationObserver已启动，正在监听DOM变化');
    };

    // 使用setInterval来反复检查页面是否重新加载
    const checkPageReload = () => {
        let lastTopicId = window.location.pathname.split("/")[3]
        setInterval(() => {
            let curTopicId = window.location.pathname.split("/")[3]
            if (curTopicId !== lastTopicId) {
                logger.log('检测到页面重新加载');
                lastTopicId = curTopicId;
                observeDOMChanges();
            }
        }, 1000); // 每秒检查一次
    };

    // 初次加载时启动观察和定时任务
    observeDOMChanges();
    checkPageReload();

})();