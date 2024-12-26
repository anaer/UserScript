// ==UserScript==
// @name         Clash Connection Monitor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  优雅地显示当前网页的Clash连接信息
// @author       Your name
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @icon         https://cdn.jsdelivr.net/gh/Dreamacro/clash/docs/logo.png
// ==/UserScript==

(function() {
    'use strict';

    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        #clash-monitor {
            position: fixed;
            bottom: 20px;
            left: 20px;
            padding: 4px;
            border-radius: 12px;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: none;
            border: 1px solid rgba(230, 230, 230, 0);
            color: #333;
        }

        #clash-monitor:hover {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(230, 230, 230, 0.8);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
            padding: 10px 16px;
            backdrop-filter: blur(8px);
        }

        #connection-indicator {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
        }

        #status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            transition: all 0.4s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        #connection-details {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.4s ease-out;
            margin-top: 0;
            font-size: 12px;
            color: #666;
        }

        #clash-monitor:hover #connection-details {
            max-height: 500px;
            opacity: 1;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid rgba(230, 230, 230, 0.8);
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin: 4px 0;
            white-space: nowrap;
        }

        /* 深色模式 */
        @media (prefers-color-scheme: dark) {
            #clash-monitor {
                color: #f0f0f0;
            }

            #clash-monitor:hover {
                background: rgba(40, 40, 40, 0.95);
                border: 1px solid rgba(70, 70, 70, 0.8);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            }

            #connection-details {
                color: #bbb;
            }
        }
    `;

    document.head.appendChild(style);

    // 创建监视器元素
    const monitor = document.createElement('div');
    monitor.id = 'clash-monitor';
    monitor.innerHTML = `
        <div id="connection-indicator">
            <span id="connection-text">等待连接...</span>
            <div id="status-dot"></div>
        </div>
        <div id="connection-details">
            <div class="detail-item">
                <span>代理链路:</span>
                <span id="proxy-chain">-</span>
            </div>
            <div class="detail-item">
                <span>规则:</span>
                <span id="rule-match">-</span>
            </div>
            <div class="detail-item">
                <span>上传:</span>
                <span id="upload-speed">-</span>
            </div>
            <div class="detail-item">
                <span>下载:</span>
                <span id="download-speed">-</span>
            </div>
        </div>
    `;

    document.body.appendChild(monitor);

    // Clash API 配置
    const CLASH_API = {
        BASE_URL: 'http://127.0.0.1:9090',
        SECRET: '666999'
    };

    // 格式化字节数
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 更新连接信息
    function updateConnectionInfo() {
        const currentHost = window.location.hostname;

        GM_xmlhttpRequest({
            method: 'GET',
            url: `${CLASH_API.BASE_URL}/connections`,
            headers: {
                'Authorization': `Bearer ${CLASH_API.SECRET}`
            },
            onload: function(response) {
                try {
                    const data = JSON.parse(response.responseText);
                    const connections = data.connections;
                    const currentConn = connections.find(conn => conn.metadata.host === currentHost);

                    const statusDot = document.getElementById('status-dot');
                    const connText = document.getElementById('connection-text');
                    const proxyChain = document.getElementById('proxy-chain');
                    const ruleMatch = document.getElementById('rule-match');
                    const uploadSpeed = document.getElementById('upload-speed');
                    const downloadSpeed = document.getElementById('download-speed');

                    if (currentConn) {
                        statusDot.style.backgroundColor = '#27ae60';
                        connText.textContent = '已连接';
                        proxyChain.textContent = currentConn.chains.join(' → ');
                        ruleMatch.textContent = currentConn.rule;
                        uploadSpeed.textContent = formatBytes(currentConn.upload);
                        downloadSpeed.textContent = formatBytes(currentConn.download);
                    } else {
                        statusDot.style.backgroundColor = '#95a5a6';
                        connText.textContent = '无连接';
                        proxyChain.textContent = '-';
                        ruleMatch.textContent = '-';
                        uploadSpeed.textContent = '-';
                        downloadSpeed.textContent = '-';
                    }
                } catch (error) {
                    console.error('解析连接信息失败:', error);
                }
            },
            onerror: function(error) {
                console.error('连接Clash API失败:', error);
            }
        });
    }

    // 初始化更新
    updateConnectionInfo();
    // 定期更新
    setInterval(updateConnectionInfo, 5000);

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateConnectionInfo();
        }
    });
})();