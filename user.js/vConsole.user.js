// ==UserScript==
// @name         自动注入vConsole调试工具
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

  // 检测是否已存在 vConsole
  if (window.VCONSOLE_LOADED || typeof VConsole !== "undefined") return;

  window.VCONSOLE_LOADED = true;

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
  const vConsoleUrl =
    "https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js";

  loadScript(
    vConsoleUrl,
    () => {
      const vConsole = new VConsole({
        theme: "dark", // 主题色：dark/light
        defaultPlugins: ["system", "network", "element", "storage"], // 内置插件
        enablePersistent: true, // 是否开启持久化存储
        maxLogNumber: 1000, // 最多保存的日志数量
        onReady() {
          console.log("vConsole is ready.");
        },
      });

      // 错误捕获增强
      const originalConsoleError = console.error;
      console.error = function (...args) {
        vConsole.show();
        originalConsoleError.apply(console, args);
      };
    },
    () => {
      window.VCONSOLE_LOADED = false;
      console.error("Failed to load vConsole.");
    }
  );
})();