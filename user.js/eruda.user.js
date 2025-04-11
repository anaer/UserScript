// ==UserScript==
// @name         自动注入eruda调试工具
// @namespace    https://github.com/anaer/UserScript
// @version      25.411.1518
// @description  自动为所有网页注入移动端调试控制台，支持查看日志、网络请求等信息
// @author       anaer
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // 检测是否已存在
  if (window.ERUDA_LOADED || typeof eruda !== "undefined") return;

  window.ERUDA_LOADED = true;

  /**
   * 动态加载脚本的通用函数
   * @param {string} src - 脚本地址
   * @param {Function} onLoad - 加载成功回调
   * @param {Function} [onError] - 加载失败回调
   */
  function loadScript(src, onLoad, onError) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = onLoad;
    script.onerror =
      onError || (() => console.error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  }

  // 加载 vConsole 主脚本
  const erudaUrl =
    "https://cdn.jsdelivr.net/npm/eruda";

  loadScript(
    erudaUrl,
    () => {
      eruda.init();
      console.log("eruda is ready.");
    },
    () => {
      window.ERUDA_LOADED = false;
      console.error("Failed to load eruda.");
    }
  );
})();