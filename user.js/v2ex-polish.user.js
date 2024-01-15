// ==UserScript==
// @name         V2EX Polish
// @namespace    https://github.com/anaer/UserScript
// @version      2024.1.15.1630
// @description  一款专为 V2EX 用户设计的浏览器插件，提供了丰富的扩展功能，让原生页面焕然一新！✨
// @author       anaer
// @match        https://*.v2ex.com/*
// @match        https://v2ex.com/*
// @icon         https://www.v2ex.com/favicon.ico
// @run-at       document-start
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==
// 原版功能太多, 因为只需要楼中楼, 所以基于1.7.18版本, 做些调整

"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};

// src/constants.ts
var EXTENSION_NAME, biliEmojiLink, emoticons, READABLE_CONTENT_HEIGHT, MAX_CONTENT_HEIGHT, READING_CONTENT_LIMIT, dataExpiryTime, imgurClientIdPool, defaultOptions;
var init_constants = __esm({
  "src/constants.ts"() {
    "use strict";
    EXTENSION_NAME = "V2EX_Polish";
    biliEmojiLink = {
      ["[\u8131\u5355doge]" /* 脱单doge */]: "https://i.imgur.com/L62ZP7V.png",
      ["[doge]" /* doge */]: "https://i.imgur.com/agAJ0Rd.png",
      ["[\u8FA3\u773C\u775B]" /* 辣眼睛 */]: "https://i.imgur.com/n119Wvk.png",
      ["[\u7591\u60D1]" /* 疑惑 */]: "https://i.imgur.com/U3hKhrT.png",
      ["[\u6342\u8138]" /* 捂脸 */]: "https://i.imgur.com/14cwgsI.png",
      ["[\u54E6\u547C]" /* 哦呼 */]: "https://i.imgur.com/km62MY2.png",
      ["[\u50B2\u5A07]" /* 傲娇 */]: "https://i.imgur.com/TkdeN49.png",
      ["[\u601D\u8003]" /* 思考 */]: "https://i.imgur.com/MAyk5GN.png",
      ["[\u5403\u74DC]" /* 吃瓜 */]: "https://i.imgur.com/Ug1iMq4.png",
      ["[\u65E0\u8BED]" /* 无语 */]: "https://i.imgur.com/e1q9ScT.png",
      ["[\u5927\u54ED]" /* 大哭 */]: "https://i.imgur.com/YGIx7lh.png",
      ["[\u9178\u4E86]" /* 酸了 */]: "https://i.imgur.com/5FDsp6L.png",
      ["[\u6253call]" /* 打call */]: "https://i.imgur.com/pmNOo2w.png",
      ["[\u6B6A\u5634]" /* 歪嘴 */]: "https://i.imgur.com/XzEYBoY.png",
      ["[\u661F\u661F\u773C]" /* 星星眼 */]: "https://i.imgur.com/2spsghH.png",
      ["[OK]" /* OK */]: "https://i.imgur.com/6DMydmQ.png",
      ["[\u8DEA\u4E86]" /* 跪了 */]: "https://i.imgur.com/TYtySHv.png",
      ["[\u54CD\u6307]" /* 响指 */]: "https://i.imgur.com/Ac88cMm.png",
      ["[\u54ED\u60F9R]" /* 哭惹 */]: "https://i.imgur.com/HgxsUD2.png",
      ["[\u54C7R]" /* 哇 */]: "https://i.imgur.com/OZySWIG.png",
      ["[\u6C57\u989CR]" /* 汗颜 */]: "https://i.imgur.com/jrVZoLi.png",
      ["[\u5BB3\u7F9ER]" /* 害羞 */]: "https://i.imgur.com/OVQjxIr.png",
      ["[\u840C\u840C\u54D2R]" /* 萌萌哒 */]: "https://i.imgur.com/Ue1kikn.png",
      ["[\u5077\u7B11R]" /* 偷笑 */]: "https://i.imgur.com/aF7QiE5.png"
    };
    emoticons = [
      {
        title: "\u6D41\u884C",
        list: [
          "[\u8131\u5355doge]" /* 脱单doge */,
          "[doge]" /* doge */,
          "[\u6253call]" /* 打call */,
          "[\u661F\u661F\u773C]" /* 星星眼 */,
          "[\u5403\u74DC]" /* 吃瓜 */,
          "[OK]" /* OK */,
          "[\u54E6\u547C]" /* 哦呼 */,
          "[\u601D\u8003]" /* 思考 */,
          "[\u7591\u60D1]" /* 疑惑 */,
          "[\u8FA3\u773C\u775B]" /* 辣眼睛 */,
          "[\u50B2\u5A07]" /* 傲娇 */,
          "[\u6342\u8138]" /* 捂脸 */,
          "[\u65E0\u8BED]" /* 无语 */,
          "[\u5927\u54ED]" /* 大哭 */,
          "[\u9178\u4E86]" /* 酸了 */,
          "[\u6B6A\u5634]" /* 歪嘴 */,
          "[\u8DEA\u4E86]" /* 跪了 */,
          "[\u54CD\u6307]" /* 响指 */,
          "[\u54C7R]" /* 哇 */,
          "[\u840C\u840C\u54D2R]" /* 萌萌哒 */,
          "[\u5BB3\u7F9ER]" /* 害羞 */,
          "[\u5077\u7B11R]" /* 偷笑 */,
          "[\u54ED\u60F9R]" /* 哭惹 */,
          "[\u6C57\u989CR]" /* 汗颜 */
        ]
      },
      {
        title: "\u5C0F\u9EC4\u8138",
        list: [
          "\u{1F600}",
          "\u{1F601}",
          "\u{1F602}",
          "\u{1F923}",
          "\u{1F605}",
          "\u{1F60A}",
          "\u{1F60B}",
          "\u{1F618}",
          "\u{1F970}",
          "\u{1F617}",
          "\u{1F929}",
          "\u{1F914}",
          "\u{1F928}",
          "\u{1F610}",
          "\u{1F611}",
          "\u{1F644}",
          "\u{1F60F}",
          "\u{1F62A}",
          "\u{1F62B}",
          "\u{1F971}",
          "\u{1F61C}",
          "\u{1F612}",
          "\u{1F614}",
          "\u{1F628}",
          "\u{1F630}",
          "\u{1F631}",
          "\u{1F975}",
          "\u{1F621}",
          "\u{1F973}",
          "\u{1F97A}",
          "\u{1F92D}",
          "\u{1F9D0}",
          "\u{1F60E}",
          "\u{1F913}",
          "\u{1F62D}",
          "\u{1F911}",
          "\u{1F92E}"
        ]
      },
      {
        title: "\u624B\u52BF",
        list: [
          "\u{1F64B}",
          "\u{1F64E}",
          "\u{1F645}",
          "\u{1F647}",
          "\u{1F937}",
          "\u{1F90F}",
          "\u{1F449}",
          "\u270C\uFE0F",
          "\u{1F918}",
          "\u{1F919}",
          "\u{1F44C}",
          "\u{1F90C}",
          "\u{1F44D}",
          "\u{1F44E}",
          "\u{1F44B}",
          "\u{1F91D}",
          "\u{1F64F}",
          "\u{1F44F}"
        ]
      },
      {
        title: "\u5E86\u795D",
        list: ["\u2728", "\u{1F389}", "\u{1F38A}"]
      },
      {
        title: "\u5176\u4ED6",
        list: ["\u{1F47B}", "\u{1F921}", "\u{1F414}", "\u{1F440}", "\u{1F4A9}", "\u{1F434}", "\u{1F984}", "\u{1F427}", "\u{1F436}", "\u{1F412}", "\u{1F648}", "\u{1F649}", "\u{1F64A}", "\u{1F435}"]
      }
    ];
    READABLE_CONTENT_HEIGHT = 250;
    MAX_CONTENT_HEIGHT = 850;
    READING_CONTENT_LIMIT = 150;
    dataExpiryTime = 60 * 60 * 1e3;
    imgurClientIdPool = [
      "3107b9ef8b316f3",
      // 以下 Client ID 来自「V2EX Plus」
      "442b04f26eefc8a",
      "59cfebe717c09e4",
      "60605aad4a62882",
      "6c65ab1d3f5452a",
      "83e123737849aa9",
      "9311f6be1c10160",
      "c4a4a563f698595",
      "81be04b9e4a08ce"
    ];
    defaultOptions = {
      openInNewTab: false,
      autoCheckIn: {
        enabled: true
      },
      theme: {
        autoSwitch: false
      },
      reply: {
        preload: "off"
      },
      replyContent: {
        autoFold: true,
        hideReplyTime: true,
        hideRefName: false
      },
      nestedReply: {
        display: "indent",
        multipleInsideOne: "nested"
      },
      userTag: {
        display: "inline"
      }
    };
  }
});

// src/icons.ts
var iconLoading, iconLogo, iconGitHub;
var init_icons = __esm({
  "src/icons.ts"() {
    "use strict";
    iconLoading = `
<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="currentcolor" stroke="none" cx="6" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.1"/>    
  </circle>
  <circle fill="currentcolor" stroke="none" cx="26" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.2"/>       
  </circle>
  <circle fill="currentcolor" stroke="none" cx="46" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.3"/>     
  </circle>
</svg>
`;
    iconLogo = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 88 88"><g style="mix-blend-mode:passthrough"><path d="M87.92 86.098v-.052a.592.592 0 0 0 0-.07L44.978.72l-.059-.105c-.16-.3-.415-.511-.705-.586a.961.961 0 0 0-.841.19 1.315 1.315 0 0 0-.336.378l-.058.115a2571.004 2571.004 0 0 1-8.695 17.172c-.59 1.024-.59 2.382 0 3.406 3.856 7.57 7.7 15.142 11.532 22.718.641 1.108.641 2.58 0 3.688C39.5 60.23 32.826 73.406 26.45 85.993c-.291.661-.086 1.482.46 1.84.16.104.341.158.525.158h18.52c.415.003.797-.272.992-.713l.635-1.285 8.585-17.023c.142-.317.383-.552.67-.653a.949.949 0 0 1 .855.116c.156.1.289.245.386.423l8.506 16.723.787 1.558c.199.433.575.702.985.704h.518c.087.009.175.009.263 0h17.74c.617 0 1.119-.601 1.123-1.347a1.615 1.615 0 0 0-.08-.396Z" fill="currentColor" style="mix-blend-mode:passthrough"/><path d="m38.551 48.541.62-1.232a3.095 3.095 0 0 0 0-3.02l-3.807-7.446-4.377-8.511c-.155-.308-.406-.527-.697-.61a.957.957 0 0 0-.85.17 1.252 1.252 0 0 0-.4.502L.132 86.002c-.29.658-.085 1.477.46 1.83.161.113.345.17.532.168h16.981c.41 0 .788-.27.985-.705l.65-1.302c.029-.048.055-.098.08-.15l.729-1.408c6.047-12.103 11.839-23.66 17.9-35.7.038-.062.072-.127.102-.194Z" fill="currentColor" style="mix-blend-mode:passthrough"/></g></svg>
`;
    iconGitHub = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
</svg>
`;
  }
});

// src/components/toast.ts
function createToast(props) {
  const { message, duration = 3e3 } = props;
  const $existTosat = $(".v2p-toast");
  if ($existTosat.length > 0) {
    $existTosat.remove();
  }
  const $toast = $(`<div class="v2p-toast">${message}</div>`).hide();
  $(document.body).append($toast);
  $toast.fadeIn("fast");
  if (duration !== 0) {
    setTimeout(() => {
      $toast.fadeOut("fast", () => {
        $toast.remove();
      });
    }, duration);
  }
  return {
    clear() {
      $toast.remove();
    }
  };
}
var init_toast = __esm({
  "src/components/toast.ts"() {
    "use strict";
  }
});

// src/utils.ts
function getOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
  const windowsPlatforms = /(win32|win64|windows|wince)/i;
  const iosPlatforms = /(iphone|ipad|ipod)/i;
  let os = null;
  if (macosPlatforms.test(userAgent)) {
    os = "macos";
  } else if (iosPlatforms.test(userAgent)) {
    os = "ios";
  } else if (windowsPlatforms.test(userAgent)) {
    os = "windows";
  } else if (userAgent.includes("android")) {
    os = "android";
  } else if (userAgent.includes("linux")) {
    os = "linux";
  }
  return os;
}
function formatTimestamp(timestamp, { format = "YMD" } = {}) {
  const date = new Date(timestamp.toString().length === 10 ? timestamp * 1e3 : timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const YMD = `${year}-${month}-${day}`;
  if (format === "YMDHMS") {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${YMD} ${hour}:${minute}:${second}`;
  }
  return YMD;
}
function isSameDay(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function deepMerge(target, source) {
  const result = {};
  for (const key in target) {
    const targetProp = target[key];
    const sourceProp = source[key];
    if (isObject(targetProp) && isObject(sourceProp)) {
      result[key] = deepMerge(targetProp, sourceProp);
    } else if (Reflect.has(source, key)) {
      result[key] = sourceProp;
    } else {
      result[key] = targetProp;
    }
  }
  for (const key in source) {
    if (!Reflect.has(target, key)) {
      result[key] = source[key];
    }
  }
  return result;
}
function getRunEnv() {
  if (typeof chrome === "object" && typeof chrome.extension !== "undefined") {
    return "chrome";
  }
  if (typeof browser === "object" && typeof browser.extension !== "undefined") {
    return "web-ext";
  }
  return null;
}
function getStorage(useCache = true) {
  return new Promise((resolve, reject) => {
    if (useCache) {
      if (window.__V2P_StorageCache) {
        resolve(window.__V2P_StorageCache);
      }
    }
    const runEnv = getRunEnv();
    if (!(runEnv === "chrome" || runEnv === "web-ext")) {
      const data = { ["options" /* Options */]: defaultOptions };
      if (typeof window !== "undefined") {
        window.__V2P_StorageCache = data;
      }
      resolve(data);
    } else {
      chrome.storage.sync.get().then((items) => {
        let data;
        const options = items["options" /* Options */];
        if (options) {
          data = { ...items, ["options" /* Options */]: deepMerge(defaultOptions, options) };
        } else {
          data = { ...items, ["options" /* Options */]: defaultOptions };
        }
        if (typeof window !== "undefined") {
          window.__V2P_StorageCache = data;
        }
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}
function getStorageSync() {
  const storage = window.__V2P_StorageCache;
  if (!storage) {
    throw new Error(`${EXTENSION_NAME}: \u65E0\u53EF\u7528\u7684 Storage \u7F13\u5B58\u6570\u636E`);
  }
  return storage;
}
async function setStorage(storageKey, storageItem) {
  switch (storageKey) {
    case "options" /* Options */:
    case "api" /* API */:
    case "daily" /* Daily */:
    case "member-tag" /* MemberTag */:
    case "settings-sync" /* SyncInfo */:
    case "reading-list" /* ReadingList */:
      try {
        await chrome.storage.sync.set({ [storageKey]: storageItem });
      } catch (err) {
        if (String(err).includes("QUOTA_BYTES_PER_ITEM quota exceeded")) {
          console.error(
            `${EXTENSION_NAME}: \u65E0\u6CD5\u8BBE\u7F6E ${storageKey}\uFF0C \u5355\u4E2A item \u4E0D\u80FD\u8D85\u51FA 8 KB\uFF0C\u8BE6\u60C5\u67E5\u770B\uFF1Ahttps://developer.chrome.com/docs/extensions/reference/storage/#storage-areas`
          );
          createToast({ message: "\u274C \u7528\u6237\u6570\u636E\u8D85\u51FA\u5B58\u50A8\u7A7A\u95F4\u9650\u5236" });
        }
        throw new Error(`\u274C \u65E0\u6CD5\u8BBE\u7F6E\uFF1A${storageKey}`);
      }
      break;
    default:
      throw new Error(`\u672A\u77E5\u7684 storageKey\uFF1A ${storageKey}`);
  }
}
function escapeHTML(htmlString) {
  return htmlString.replace(/[<>&"'']/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return match;
    }
  });
}
function injectScript(scriptSrc) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", scriptSrc);
  document.body.appendChild(script);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var init_utils = __esm({
  "src/utils.ts"() {
    "use strict";
    init_toast();
    init_constants();
  }
});

// src/contents/globals.ts
function updateCommentCells() {
  $commentCells = $commentBox.find('.cell[id^="r_"]');
  $commentTableRows = $commentCells.find("> table > tbody > tr");
}
var loginName, topicOwnerName, $wrapper, $topicList, $topicHeader, $topicContentBox, $commentBox, $commentCells, $commentTableRows, $replyBox, $replyForm, colorTheme, $replyTextArea, replyTextArea;
var init_globals = __esm({
  "src/contents/globals.ts"() {
    "use strict";
    loginName = $('#Top .tools > a[href^="/member"]').text();
    topicOwnerName = $('#Main > .box > .header > small > a[href^="/member"]').text();
    $wrapper = $("#Wrapper");
    $topicList = $(
      "#Main #Tabs ~ .cell.item, #Main #TopicsNode > .cell, #Main .cell.item:has(.item_title > .topic-link)"
    );
    $topicHeader = $("#Main .header");
    $topicContentBox = $("#Main .box:has(.topic_content)");
    $commentBox = $('#Main .box:has(.cell[id^="r_"])');
    $commentCells = $commentBox.find('.cell[id^="r_"]');
    $commentTableRows = $commentCells.find("> table > tbody > tr");
    $replyBox = $("#reply-box");
    $replyForm = $replyBox.find('form[action^="/t"]');
    colorTheme = $("#Wrapper").hasClass("Night") ? "dark" : "light";
    $replyTextArea = $("#reply_content");
    replyTextArea = document.querySelector("#reply_content");
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/createElement.js
var createElement, createElement$1;
var init_createElement = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/createElement.js"() {
    "use strict";
    createElement = (tag, attrs, children = []) => {
      const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.keys(attrs).forEach((name) => {
        element.setAttribute(name, String(attrs[name]));
      });
      if (children.length) {
        children.forEach((child) => {
          const childElement = createElement(...child);
          element.appendChild(childElement);
        });
      }
      return element;
    };
    createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/replaceElement.js
var getAttrs, getClassNames, combineClassNames, toPascalCase, replaceElement;
var init_replaceElement = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/replaceElement.js"() {
    "use strict";
    init_createElement();
    getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
      attrs[attr.name] = attr.value;
      return attrs;
    }, {});
    getClassNames = (attrs) => {
      if (typeof attrs === "string")
        return attrs;
      if (!attrs || !attrs.class)
        return "";
      if (attrs.class && typeof attrs.class === "string") {
        return attrs.class.split(" ");
      }
      if (attrs.class && Array.isArray(attrs.class)) {
        return attrs.class;
      }
      return "";
    };
    combineClassNames = (arrayOfClassnames) => {
      const classNameArray = arrayOfClassnames.flatMap(getClassNames);
      return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index).join(" ");
    };
    toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
    replaceElement = (element, { nameAttr, icons, attrs }) => {
      const iconName = element.getAttribute(nameAttr);
      if (iconName == null)
        return;
      const ComponentName = toPascalCase(iconName);
      const iconNode = icons[ComponentName];
      if (!iconNode) {
        return console.warn(
          `${element.outerHTML} icon name was not found in the provided icons object.`
        );
      }
      const elementAttrs = getAttrs(element);
      const [tag, iconAttributes, children] = iconNode;
      const iconAttrs = {
        ...iconAttributes,
        "data-lucide": iconName,
        ...attrs,
        ...elementAttrs
      };
      const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
      if (classNames) {
        Object.assign(iconAttrs, {
          class: classNames
        });
      }
      const svgElement = createElement$1([tag, iconAttrs, children]);
      return element.parentNode?.replaceChild(svgElement, element);
    };
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/defaultAttributes.js
var defaultAttributes;
var init_defaultAttributes = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/defaultAttributes.js"() {
    "use strict";
    defaultAttributes = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    };
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/book-open-check.js
var BookOpenCheck;
var init_book_open_check = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/book-open-check.js"() {
    "use strict";
    init_defaultAttributes();
    BookOpenCheck = [
      "svg",
      defaultAttributes,
      [
        ["path", { d: "M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" }],
        ["path", { d: "m16 12 2 2 4-4" }],
        ["path", { d: "M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/chevrons-up.js
var ChevronsUp;
var init_chevrons_up = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/chevrons-up.js"() {
    "use strict";
    init_defaultAttributes();
    ChevronsUp = [
      "svg",
      defaultAttributes,
      [
        ["polyline", { points: "17 11 12 6 7 11" }],
        ["polyline", { points: "17 18 12 13 7 18" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/clock-4.js
var Clock4;
var init_clock_4 = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/clock-4.js"() {
    "use strict";
    init_defaultAttributes();
    Clock4 = [
      "svg",
      defaultAttributes,
      [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["polyline", { points: "12 6 12 12 16 14" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/eye-off.js
var EyeOff;
var init_eye_off = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/eye-off.js"() {
    "use strict";
    init_defaultAttributes();
    EyeOff = [
      "svg",
      defaultAttributes,
      [
        ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }],
        [
          "path",
          {
            d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
          }
        ],
        [
          "path",
          {
            d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
          }
        ],
        ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/heart.js
var Heart;
var init_heart = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/heart.js"() {
    "use strict";
    init_defaultAttributes();
    Heart = [
      "svg",
      defaultAttributes,
      [
        [
          "path",
          {
            d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          }
        ]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/message-square-plus.js
var MessageSquarePlus;
var init_message_square_plus = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/message-square-plus.js"() {
    "use strict";
    init_defaultAttributes();
    MessageSquarePlus = [
      "svg",
      defaultAttributes,
      [
        [
          "path",
          { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }
        ],
        ["line", { x1: "9", x2: "15", y1: "10", y2: "10" }],
        ["line", { x1: "12", x2: "12", y1: "7", y2: "13" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/message-square.js
var MessageSquare;
var init_message_square = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/message-square.js"() {
    "use strict";
    init_defaultAttributes();
    MessageSquare = [
      "svg",
      defaultAttributes,
      [
        [
          "path",
          { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }
        ]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/moon.js
var Moon;
var init_moon = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/moon.js"() {
    "use strict";
    init_defaultAttributes();
    Moon = [
      "svg",
      defaultAttributes,
      [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/package-plus.js
var PackagePlus;
var init_package_plus = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/package-plus.js"() {
    "use strict";
    init_defaultAttributes();
    PackagePlus = [
      "svg",
      defaultAttributes,
      [
        ["path", { d: "M16 16h6" }],
        ["path", { d: "M19 13v6" }],
        [
          "path",
          {
            d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
          }
        ],
        ["path", { d: "M16.5 9.4 7.55 4.24" }],
        ["polyline", { points: "3.29 7 12 12 20.71 7" }],
        ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/smile.js
var Smile;
var init_smile = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/smile.js"() {
    "use strict";
    init_defaultAttributes();
    Smile = [
      "svg",
      defaultAttributes,
      [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
        ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
        ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/star.js
var Star;
var init_star = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/star.js"() {
    "use strict";
    init_defaultAttributes();
    Star = [
      "svg",
      defaultAttributes,
      [
        [
          "polygon",
          {
            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          }
        ]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/sun.js
var Sun;
var init_sun = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/sun.js"() {
    "use strict";
    init_defaultAttributes();
    Sun = [
      "svg",
      defaultAttributes,
      [
        ["circle", { cx: "12", cy: "12", r: "4" }],
        ["path", { d: "M12 2v2" }],
        ["path", { d: "M12 20v2" }],
        ["path", { d: "m4.93 4.93 1.41 1.41" }],
        ["path", { d: "m17.66 17.66 1.41 1.41" }],
        ["path", { d: "M2 12h2" }],
        ["path", { d: "M20 12h2" }],
        ["path", { d: "m6.34 17.66-1.41 1.41" }],
        ["path", { d: "m19.07 4.93-1.41 1.41" }]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/twitter.js
var Twitter;
var init_twitter = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/icons/twitter.js"() {
    "use strict";
    init_defaultAttributes();
    Twitter = [
      "svg",
      defaultAttributes,
      [
        [
          "path",
          {
            d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
          }
        ]
      ]
    ];
  }
});

// node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/lucide.js
var createIcons;
var init_lucide = __esm({
  "node_modules/.pnpm/lucide@0.258.0/node_modules/lucide/dist/esm/lucide.js"() {
    "use strict";
    init_replaceElement();
    init_createElement();
    init_book_open_check();
    init_chevrons_up();
    init_clock_4();
    init_eye_off();
    init_heart();
    init_message_square_plus();
    init_message_square();
    init_moon();
    init_package_plus();
    init_smile();
    init_star();
    init_sun();
    init_twitter();
    createIcons = ({ icons = {}, nameAttr = "data-lucide", attrs = {} } = {}) => {
      if (!Object.values(icons).length) {
        throw new Error(
          "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
        );
      }
      if (typeof document === "undefined") {
        throw new Error("`createIcons()` only works in a browser environment.");
      }
      const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
      Array.from(elementsToReplace).forEach(
        (element) => replaceElement(element, { nameAttr, icons, attrs })
      );
      if (nameAttr === "data-lucide") {
        const deprecatedElements = document.querySelectorAll("[icon-name]");
        if (deprecatedElements.length > 0) {
          console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide");
          Array.from(deprecatedElements).forEach(
            (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
          );
        }
      }
    };
  }
});

// src/contents/helpers.ts
function isV2EX_RequestError(error) {
  if ("cause" in error) {
    const cause = error["cause"];
    if ("success" in cause && "message" in cause) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof cause["success"] === "boolean" && // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !cause["success"] && // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof cause["message"] === "string"
      );
    }
  }
  return false;
}
function focusReplyInput() {
  if (replyTextArea instanceof HTMLTextAreaElement) {
    replyTextArea.focus();
  }
}
function insertTextToReplyInput(text) {
  if (replyTextArea instanceof HTMLTextAreaElement) {
    const startPos = replyTextArea.selectionStart;
    const endPos = replyTextArea.selectionEnd;
    const valueToStart = replyTextArea.value.substring(0, startPos);
    const valueFromEnd = replyTextArea.value.substring(endPos, replyTextArea.value.length);
    replyTextArea.value = `${valueToStart}${text}${valueFromEnd}`;
    focusReplyInput();
    replyTextArea.selectionStart = replyTextArea.selectionEnd = startPos + text.length;
  }
}
async function setMemberTags(memberName, tags) {
  const storage = await getStorage(false);
  const tagData = storage["member-tag" /* MemberTag */];
  const runEnv = getRunEnv();
  if (!(runEnv === "chrome" || runEnv === "web-ext")) {
    return;
  }
  if (tags && tags.length > 0) {
    const newTagData = { ...tagData, [memberName]: { tags } };
    await setStorage("member-tag" /* MemberTag */, newTagData);
  } else {
    if (tagData && Reflect.has(tagData, memberName)) {
      delete tagData[memberName];
      await setStorage("member-tag" /* MemberTag */, tagData);
    }
  }
}
async function addToReadingList(params) {
  const { url, title, content } = params;
  if (!(typeof url === "string" || typeof title === "string" || typeof content === "string")) {
    const message = "\u65E0\u6CD5\u8BC6\u522B\u5C06\u8BE5\u4E3B\u9898\u7684\u5143\u6570\u636E";
    createToast({ message });
    throw new Error(message);
  }
  const storage = await getStorage();
  const currentData = storage["reading-list" /* ReadingList */]?.data || [];
  const exist = currentData.findIndex((it) => it.url === url) !== -1;
  if (exist) {
    createToast({ message: "\u8BE5\u4E3B\u9898\u5DF2\u5B58\u5728\u4E8E\u7A0D\u540E\u9605\u8BFB" });
  } else {
    if (window.__V2P_AddingReading !== true) {
      window.__V2P_AddingReading = true;
      try {
        await setStorage("reading-list" /* ReadingList */, {
          data: [
            {
              url,
              title: title.replace(" - V2EX", ""),
              content: content.length > READING_CONTENT_LIMIT ? content.substring(0, READING_CONTENT_LIMIT) + "..." : content,
              addedTime: Date.now()
            },
            ...currentData
          ]
        });
        createToast({ message: "\u2705 \u5DF2\u6DFB\u52A0\u8FDB\u7A0D\u540E\u9605\u8BFB" });
        await sleep(500);
      } finally {
        window.__V2P_AddingReading = false;
      }
    }
  }
}
function decodeBase64TopicPage() {
  const dataTitle = "\u70B9\u51FB\u590D\u5236";
  if (window.__V2P_DecodeStatus === "decodeed") {
    createToast({ message: "\u5DF2\u89E3\u6790\u5B8C\u672C\u9875\u6240\u6709\u7684 Base64 \u5B57\u7B26\u4E32" });
  } else {
    const $topicContentBox2 = $("#Main .box:has(.topic_content)");
    const $commentBox2 = $('#Main .box:has(.cell[id^="r_"])');
    const $commentCells2 = $commentBox2.find('.cell[id^="r_"]');
    let count = 0;
    const excludeList = [
      "boss",
      "bilibili",
      "Bilibili",
      "Encrypto",
      "encrypto",
      "Window10",
      "airpords",
      "Windows7"
    ];
    const convertHTMLText = (text, excludeTextList) => {
      if (text.length % 4 !== 0 || text.length <= 8) {
        return text;
      }
      if (excludeList.includes(text)) {
        return text;
      }
      if (text.includes("=")) {
        const paddingIndex = text.indexOf("=");
        if (paddingIndex !== text.length - 1 && paddingIndex !== text.length - 2) {
          return text;
        }
      }
      if (excludeTextList?.some((excludeText) => excludeText.includes(text))) {
        return text;
      }
      try {
        const decodedStr = decodeURIComponent(window.atob(text));
        count += 1;
        return `${text}<span class="v2p-decode-block">(<ins class="v2p-decode" data-title="${dataTitle}">${decodedStr}</ins>)</span>`;
      } catch (err) {
        if (err instanceof Error) {
          console.error(`\u89E3\u6790 Base64 \u51FA\u9519\uFF1A${err.message}`);
        }
        return text;
      }
    };
    const base64regex = /[A-z0-9+/=]+/g;
    const contentHandler = (_, content) => {
      const excludeTextList = [
        ...content.getElementsByTagName("a"),
        ...content.getElementsByTagName("img")
      ].map((ele) => ele.outerHTML);
      content.innerHTML = content.innerHTML.replace(
        base64regex,
        (htmlText) => convertHTMLText(htmlText, excludeTextList)
      );
    };
    $commentCells2.find(".reply_content").each(contentHandler);
    $topicContentBox2.find(".topic_content").each(contentHandler);
    if (count === 0) {
      createToast({ message: "\u672C\u9875\u672A\u53D1\u73B0 Base64 \u5B57\u7B26\u4E32" });
    } else {
      window.__V2P_DecodeStatus = "decodeed";
      createToast({ message: `\u2705 \u5DF2\u89E3\u6790\u672C\u9875\u6240\u6709\u7684 Base64 \u5B57\u7B26\u4E32\uFF0C\u5171 ${count} \u6761` });
    }
    $(".v2p-decode").on("click", (ev) => {
      const text = ev.target.innerText;
      void navigator.clipboard.writeText(text).then(() => {
        ev.target.dataset.title = "\u2705 \u5DF2\u590D\u5236";
        setTimeout(() => {
          ev.target.dataset.title = dataTitle;
        }, 1e3);
      });
    });
  }
}
function postTask(expression, callback) {
  const runEnv = getRunEnv();
  if (!runEnv) {
    const result = Function(`"use strict"; ${expression}`)();
    callback?.(result);
  } else {
    if (callback) {
      if (window.__V2P_Tasks) {
        window.__V2P_Tasks.set(Date.now(), callback);
      } else {
        window.__V2P_Tasks = /* @__PURE__ */ new Map([[Date.now(), callback]]);
      }
    }
    const messageData = {
      from: 0 /* Content */,
      payload: { task: { id: Date.now(), expression } }
    };
    window.postMessage(messageData);
  }
}
function loadIcons() {
  setTimeout(() => {
    createIcons({
      attrs: {
        width: "100%",
        height: "100%"
      },
      icons: {
        MessageSquarePlus,
        MessageSquare,
        BookOpenCheck,
        ChevronsUp,
        Heart,
        EyeOff,
        Sun,
        Moon,
        Smile,
        PackagePlus,
        Star,
        Twitter
      }
    });
  }, 0);
}
function transformEmoji(textValue) {
  return textValue.replace(/\[[^\]]+\]/g, (x) => {
    const emojiLink = biliEmojiLink[x];
    if (typeof emojiLink === "string") {
      return `${emojiLink} `;
    }
    return x;
  });
}
var init_helpers = __esm({
  "src/contents/helpers.ts"() {
    "use strict";
    init_lucide();
    init_toast();
    init_constants();
    init_utils();
    init_globals();
  }
});

// src/contents/common.ts
var common_exports = {};
var init_common = __esm({
  "src/contents/common.ts"() {
    "use strict";
    init_constants();
    init_icons();
    init_utils();
    init_globals();
    init_helpers();
    void (async () => {
      const storage = await getStorage();
      const options = storage["options" /* Options */];
      const $toggle = $("#Rightbar .light-toggle").addClass("v2p-color-mode-toggle");
      if (options.theme.autoSwitch) {
        const perfersDark = window.matchMedia("(prefers-color-scheme: dark)");
        const toggleTheme = (preferDark) => {
          const shouldSync = preferDark && !$wrapper.hasClass("Night") || !preferDark && $wrapper.hasClass("Night");
          if (shouldSync) {
            const href = $toggle.attr("href");
            if (typeof href === "string") {
              fetch(href);
            }
            if (preferDark) {
              $toggle.prop("title", "\u4F7F\u7528\u6D45\u8272\u4E3B\u9898");
              $toggle.html('<i data-lucide="sun"></i>');
            } else {
              $toggle.prop("title", "\u4F7F\u7528\u6DF1\u8272\u4E3B\u9898");
              $toggle.html('<i data-lucide="moon"></i>');
            }
            loadIcons();
          }
          if (preferDark) {
            $("body").addClass("v2p-theme-dark");
            $wrapper.addClass("Night");
          } else {
            $("body").removeClass("v2p-theme-dark");
            $wrapper.removeClass("Night");
          }
        };
        toggleTheme(perfersDark.matches);
        perfersDark.addEventListener("change", ({ matches }) => {
          toggleTheme(matches);
        });
        $toggle.on("click", () => {
          void setStorage("options" /* Options */, deepMerge(options, { theme: { autoSwitch: false } }));
        });
      }
      {
        const $toggleImg = $toggle.find("> img");
        const alt = $toggleImg.prop("alt");
        if (alt === "Light") {
          $toggle.prop("title", "\u4F7F\u7528\u6DF1\u8272\u4E3B\u9898");
          $toggleImg.replaceWith('<i data-lucide="moon"></i>');
        } else if (alt === "Dark") {
          $toggle.prop("title", "\u4F7F\u7528\u6D45\u8272\u4E3B\u9898");
          $toggleImg.replaceWith('<i data-lucide="sun"></i>');
        }
      }
      {
        $("#Top .site-nav .tools > .top").addClass("v2p-hover-btn");
      }
      {
        const $searchItem = $('<a class="search-item cell" target="_blank">');
        $searchItem.on("mouseover", () => {
          $("#search-result .search-item.active").addClass("v2p-no-active");
          $searchItem.addClass("active");
        }).on("mouseleave", () => {
          $("#search-result .search-item.active").removeClass("v2p-no-active");
          $searchItem.removeClass("active");
        });
        const $search = $("#search");
        $search.on("input", (ev) => {
          const value = ev.target.value;
          const $searchGroup = $("#search-result .search-item-group:last-of-type");
          $searchItem.text(`SOV2EX ${value}`).prop("href", `https://www.sov2ex.com/?q=${value}`);
          $searchGroup.append($searchItem);
        });
      }
      {
        const runEnv = getRunEnv();
        if (runEnv === "chrome" || runEnv === "web-ext") {
          injectScript(chrome.runtime.getURL("scripts/web_accessible_resources.min.js"));
          window.addEventListener("message", (ev) => {
            if (ev.data.from === 1 /* Web */) {
              const payload = ev.data.payload;
              const task = payload?.task;
              if (payload?.status === "ready") {
                postTask('if (typeof window.once === "string") { return window.once; }', (result) => {
                  if (typeof result === "string") {
                    window.once = result;
                  }
                });
              }
              if (task) {
                window.__V2P_Tasks?.get(task.id)?.(task.result);
              }
            }
          });
        }
      }
      {
        const $extraFooter = $(`
    <div class="v2p-footer">
      <div class="v2p-footer-text">\u6269\u5C55\u81EA V2EX Polish </div>
  
      <div class="v2p-footer-links">
        <a class="v2p-footer-link v2p-hover-btn" href="${"https://v2p.app" /* Home */}" target="_blank">\u63D2\u4EF6\u5B98\u7F51</a>
        <a class="v2p-footer-link v2p-hover-btn" href="${"https://github.com/coolpace/V2EX_Polish/discussions/1?sort=new" /* Feedback */}" target="_blank">\u95EE\u9898\u53CD\u9988</a>
      </div>
  
      <div class="v2p-footer-brand">
        <span>
          <a
            href="https://github.com/coolpace/V2EX_Polish"
            target="_blank"
            title="GitHub \u4ED3\u5E93"
          >
            ${iconGitHub}
          </a>
        </span>
      </div>
    </div>
    `);
        $(`<div class="v2p-footer-logo">${iconLogo}</div>`).prependTo($extraFooter);
        $("#Bottom .content").append($extraFooter);
      }
    })();
  }
});

// src/components/button.ts
function createButton(props) {
  const { children, className = "", type = "button", tag = "button" } = props;
  const $button = $(`<${tag} class="normal button ${className}">${children}</${tag}>`);
  if (tag === "button") {
    $button.prop("type", type);
  }
  return $button;
}
var init_button = __esm({
  "src/components/button.ts"() {
    "use strict";
  }
});

// src/components/model.ts
function createModel(props) {
  const { root, title, onOpen, onClose, onMount } = props;
  const $mask = $('<div class="v2p-model-mask">');
  const $content = $('<div class="v2p-model-content">');
  const $closeBtn = createButton({
    children: "\u5173\u95ED<kbd>Esc</kbd>",
    className: "v2p-model-close-btn"
  });
  const $title = $(`<div class="v2p-model-title">${title ?? ""}</div>`);
  const $actions = $('<div class="v2p-model-actions">').append($closeBtn);
  const $header = $('<div class="v2p-model-header">').append($title, $actions);
  const $main = $('<div class="v2p-model-main">').append($header, $content).on("click", (ev) => {
    ev.stopPropagation();
  });
  const $container = $mask.append($main).hide();
  const modelElements = {
    $mask,
    $main,
    $container,
    $title,
    $actions,
    $content
  };
  let boundEvent = false;
  const maskClickHandler = () => {
    handleModalClose();
  };
  const keyupHandler = (ev) => {
    if (ev.key === "Escape") {
      handleModalClose();
    }
  };
  const handleModalClose = () => {
    $mask.off("click", maskClickHandler);
    $(document).off("keydown", keyupHandler);
    boundEvent = false;
    $container.fadeOut("fast");
    document.body.classList.remove("v2p-modal-open");
    onClose?.(modelElements);
  };
  const handleModalOpen = () => {
    setTimeout(() => {
      if (!boundEvent) {
        $mask.on("click", maskClickHandler);
        $(document).on("keydown", keyupHandler);
        boundEvent = true;
      }
    });
    $container.fadeIn("fast");
    document.body.classList.add("v2p-modal-open");
    onOpen?.(modelElements);
  };
  $closeBtn.on("click", handleModalClose);
  onMount?.(modelElements);
  if (root) {
    root.append($container);
  }
  return { ...modelElements, open: handleModalOpen, close: handleModalClose };
}
var init_model = __esm({
  "src/components/model.ts"() {
    "use strict";
    init_button();
  }
});

// src/services.ts
async function legacyRequest(url, options) {
  const res = await fetch(url, options);
  return res.json();
}
function fetchUserInfo(memberName, options) {
  return legacyRequest(
    `${V2EX_LEGACY_API}/members/show.json?username=${memberName}`,
    options
  );
}
async function request(url, options) {
  const storage = await getStorage();
  const PAT = storage["api" /* API */]?.pat;
  const res = await fetch(url, {
    ...options,
    headers: { Authorization: PAT ? `Bearer ${PAT}` : "", ...options?.headers }
  });
  {
    const limit = res.headers.get("X-Rate-Limit-Limit");
    const reset = res.headers.get("X-Rate-Limit-Reset");
    const remaining = res.headers.get("X-Rate-Limit-Remaining");
    const api = {
      pat: PAT,
      limit: limit ? Number(limit) : void 0,
      reset: reset ? Number(reset) : void 0,
      remaining: remaining ? Number(remaining) : void 0
    };
    void setStorage("api" /* API */, api);
  }
  const resultData = await res.json();
  if (typeof resultData.success === "boolean" && !resultData.success) {
    throw new Error(resultData.message, { cause: resultData });
  }
  return resultData;
}
function fetchTopic(topicId, options) {
  return request(`${V2EX_API}/topics/${topicId}`, { method: "GET", ...options });
}
function fetchTopicReplies(topicId, options) {
  return request(`${V2EX_API}/topics/${topicId}/replies`, {
    method: "GET",
    ...options
  });
}
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const randomIndex = Math.floor(Math.random() * imgurClientIdPool.length);
  const clidenId = imgurClientIdPool[randomIndex];
  const res = await fetch("https://api.imgur.com/3/upload", {
    method: "POST",
    headers: { Authorization: `Client-ID ${clidenId}` },
    body: formData
  });
  if (res.ok) {
    const resData = await res.json();
    if (resData.success) {
      return resData.data.link;
    }
  }
  throw new Error("\u4E0A\u4F20\u5931\u8D25");
}
async function refreshMoney() {
  const res = await fetch("/ajax/money", { method: "POST" });
  const data = await res.text();
  $("#money").html(data);
}
async function thankReply(params) {
  try {
    const res1 = await fetch(`/poll_once`, {
      method: "GET"
    });
    const once = await res1.text();
    console.log('once', once);

    const res = await fetch(`/thank/reply/${params.replyId}?once=${once}`, {
      method: "POST"
    });
    const data = await res.json();
    postTask(`window.once = ${data.once}`);
    window.once = data.once;
    if (data.success) {
      $("#thank_area_" + params.replyId).addClass("thanked").html("\u611F\u8C22\u5DF2\u53D1\u9001");
      params.onSuccess?.();
      await refreshMoney();
    } else {
      alert(data.message);
    }
  } catch {
    params.onFail?.();
  }
}
async function crawalTopicPage(path, page) {
  const res = await fetch(`${"https://www.v2ex.com" /* Origin */}${path}?p=${page}`);
  const htmlText = await res.text();
  return htmlText;
}
async function getPreviewContent(params) {
  const formData = new FormData();
  formData.append("text", params.text);
  const res = await fetch(`${"https://www.v2ex.com" /* Origin */}/preview/${params.syntax}`, {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    const renderedContent = await res.text();
    return renderedContent;
  } else {
    throw new Error("\u9884\u89C8\u5931\u8D25");
  }
}
var V2EX_ORIGIN, V2EX_LEGACY_API, V2EX_API, mark;
var init_services = __esm({
  "src/services.ts"() {
    "use strict";
    init_constants();
    init_helpers();
    init_utils();
    V2EX_ORIGIN = window.location.origin.includes("v2ex.com") ? window.location.origin : "https://www.v2ex.com" /* Origin */;
    V2EX_LEGACY_API = `${V2EX_ORIGIN}/api`;
    V2EX_API = `${V2EX_ORIGIN}/api/v2`;
    mark = `${EXTENSION_NAME}_settings`;
  }
});

// src/contents/home/topic-list.ts
function handlingTopicList() {
  const runEnv = getRunEnv();
  if (!runEnv) {
    return;
  }
  const storage = getStorageSync();
  const options = storage["options" /* Options */];
  const PAT = storage["api" /* API */]?.pat;
  let abortController = null;
  const $detailBtn = createButton({
    children: "\u8FDB\u5165\u4E3B\u9898",
    className: "special",
    tag: "a"
  });
  if (options.openInNewTab) {
    $detailBtn.prop("target", "_blank");
  }
  const model = createModel({
    root: $(document.body),
    onMount: ({ $actions }) => {
      $actions.prepend($detailBtn);
    },
    onClose: ({ $title, $content }) => {
      $title.empty();
      $content.empty();
      abortController?.abort();
    }
  });
  const topicDataCache = /* @__PURE__ */ new Map();
  const handlePreview = (params) => {
    const { topicId, topicTitle, linkHref } = params;
    if (topicId) {
      model.open();
      $detailBtn.prop("href", linkHref);
      const $titleLink = $(
        `<a class="v2p-topic-preview-title-link" title="${topicTitle}">${topicTitle}</a>`
      );
      model.$title.empty().append($titleLink);
      if (PAT) {
        void (async () => {
          let cacheData = topicDataCache.get(topicId);
          if (!cacheData || Date.now() - cacheData.cacheTime > 1e3 * 60 * 10) {
            try {
              abortController = new AbortController();
              model.$content.empty().append(`
                    <div class="v2p-model-loading">
                      <div class="v2p-icon-loading">${iconLoading}</div>
                    </div>
                    `);
              const promises = [
                fetchTopic(topicId, { signal: abortController.signal }),
                fetchTopicReplies(topicId, { signal: abortController.signal })
              ];
              const [{ result: topic }, { result: topicReplies }] = await Promise.all(promises);
              const data = {
                topic,
                topicReplies,
                cacheTime: Date.now()
              };
              topicDataCache.set(topicId, data);
              cacheData = data;
            } catch (err) {
              if (isV2EX_RequestError(err)) {
                const message = err.cause.message;
                if (
                  /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
                  message === "Token expired" /* TokenExpired */ || message === "Invalid token" /* InvalidToken */
                ) {
                  model.$content.empty().append(invalidTemplate("\u60A8\u7684 PAT \u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\u3002"));
                }
              }
            }
          }
          if (cacheData) {
            const { topic, topicReplies } = cacheData;
            const $topicPreview = $('<div class="v2p-topic-preview">');
            $titleLink.prop("href", topic.url);
            if (options.openInNewTab) {
              $titleLink.prop("target", "_blank");
            }
            const $infoBar = $(`
              <div class="v2p-tp-info-bar">
                <div class="v2p-tp-info">
                  <a class="v2p-tp-member" href="${topic.member.url}">
                    <img class="v2p-tp-avatar" src="${topic.member.avatar}">
                    <span>${topic.member.username}</span>
                  </a>

                  <span>
                    ${formatTimestamp(topic.created, { format: "YMDHMS" })}
                  </span>

                  <span>${topic.replies} \u6761\u56DE\u590D</span>
                </div>
              </div>
            `);
            const iconBook = createElement$1(BookOpenCheck);
            iconBook.setAttribute("width", "100%");
            iconBook.setAttribute("height", "100%");
            const $readingBtn = $(`
                  <div class="v2p-tp-read"><span class="v2p-tp-read-icon"></span>\u7A0D\u540E\u9605\u8BFB</div>
                  `);
            $readingBtn.find(".v2p-tp-read-icon").append(iconBook);
            $readingBtn.on("click", () => {
              void addToReadingList({
                url: topic.url,
                title: topic.title,
                content: topic.content
              });
            }).appendTo($infoBar);
            $topicPreview.append($infoBar);
            if (topic.content_rendered) {
              $topicPreview.append(
                `<div class="v2p-topic-preview-content markdown_body">${topic.content_rendered}</div>`
              );
            } else {
              $topicPreview.append(`
                <div class="v2p-empty-content">
                  <div class="v2p-text-emoji">\xAF\\_(\u30C4)_/\xAF</div>
                  <p>\u8BE5\u4E3B\u9898\u6CA1\u6709\u6B63\u6587\u5185\u5BB9</p>
                </div>
              `);
            }
            if (topic.supplements && topic.supplements.length > 0) {
              $topicPreview.append(`
                <div class="v2p-topic-preview-addons">
                  ${topic.supplements.map((addon, idx) => {
                return `
                      <div class="v2p-topic-preview-addon subtle">
                        <div class="fade" style="margin-bottom:10px;">\u9644\u8A00 ${idx + 1}\uFF1A</div>
                        <div class="topic_content markdown_body">${addon.content_rendered}</div>
                      </div>
                      `;
              }).join("")}
                </div>
              `);
            }
            if (topicReplies.length > 0) {
              const $template = $("<div>");
              const op = topic.member.username;
              topicReplies.forEach((r) => {
                $template.append(`
                  <div class="v2p-topic-reply">
                    <div class="v2p-topic-reply-member">
                      <a href="${r.member.url}">
                        <img class="v2p-topic-reply-avatar" src="${r.member.avatar}">
                        <span>${r.member.username}</span>
                        <span style="
                          display: ${op === r.member.username ? "unset" : "none"};
                          margin-left:${op === r.member.username ? "3px" : "0"};
                        ">
                          <span class="badge op mini">OP</span>
                        </span>
                      </a>\uFF1A
                    </div>
                    <div class="v2p-topic-reply-content">${escapeHTML(r.content)}</div>
                  </div>
                `);
              });
              $('<div class="v2p-topic-reply-box">').append($template.html()).append(
                `
                  <div class="v2p-more-reply-tip">
                    <a
                      href="${linkHref || ""}"
                      style="color: currentColor;"
                      target="${options.openInNewTab ? "_blank" : "_self"}"
                    >
                        \u5728\u4E3B\u9898\u5185\u67E5\u770B\u5B8C\u6574\u8BC4\u8BBA...
                    </a>
                  </div>
                  `
              ).appendTo($topicPreview);
            }
            model.$content.empty().append($topicPreview);
          }
        })();
      } else {
        model.$content.empty().append(invalidTemplate("\u60A8\u9700\u8981\u5148\u8BBE\u7F6E PAT \u624D\u80FD\u83B7\u53D6\u9884\u89C8\u5185\u5BB9\u3002"));
      }
    }
  };
  const $previewBtn = $('<button class="v2p-topic-preview-btn">\u9884\u89C8</button>');
  $topicList.each((_, topicItem) => {
    const $topicItem = $(topicItem);
    const $itemTitle = $topicItem.find(".item_title");
    const topicTitle = $itemTitle.find(".topic-link").text();
    $previewBtn.clone().on("click", () => {
      const linkHref = $topicItem.find(".topic-link").attr("href");
      const match = linkHref?.match(/\/t\/(\d+)/);
      const topicId = match?.at(1);
      handlePreview({ topicId, topicTitle, linkHref });
    }).appendTo($itemTitle);
  });
  if (PAT) {
    $("#TopicsHot,#my-recent-topics").find(".cell .item_hot_topic_title").each((_, topicTitle) => {
      const $topicItem = $(topicTitle);
      $previewBtn.clone().on("click", () => {
        const $link = $topicItem.find("> a");
        const linkHref = $link.attr("href");
        const match = linkHref?.match(/\/t\/(\d+)/);
        const topicId = match?.at(1);
        const topicTitle2 = $link.text();
        handlePreview({ topicId, topicTitle: topicTitle2, linkHref });
      }).appendTo($topicItem);
    });
  }
}
var invalidTemplate;
var init_topic_list = __esm({
  "src/contents/home/topic-list.ts"() {
    "use strict";
    init_lucide();
    init_button();
    init_model();
    init_constants();
    init_icons();
    init_services();
    init_utils();
    init_globals();
    init_helpers();
    invalidTemplate = (tip) => `
<div class="v2p-no-pat">
  <div class="v2p-no-pat-title">${tip}</div>
  <div class="v2p-no-pat-desc">
    \u8BF7\u524D\u5F80<span class="v2p-no-pat-block"><span class="v2p-icon-logo">${iconLogo}</span> <span style="margin: 0 5px;">></span> \u8BBE\u7F6E</span> \u8FDB\u884C\u8BBE\u7F6E\u3002
  </div>

  <div class="v2p-no-pat-steps">
    <div class="v2p-no-pat-step">
      <div style="font-weight:bold;margin-bottom:10px;font-size:15px;">1. \u5728\u6269\u5C55\u7A0B\u5E8F\u5217\u8868\u4E2D\u627E\u5230\u5E76\u70B9\u51FB\u300CV2EX Polish\u300D\u3002</div>
      <img class="v2p-no-pat-img" src="https://i.imgur.com/UfNkuTF.png">
    </div>
    <div class="v2p-no-pat-step">
      <div style="font-weight:bold;margin-bottom:10px;font-size:15px;">2. \u5728\u5F39\u51FA\u7684\u5C0F\u7A97\u53E3\u4E2D\u627E\u5230\u300C\u2699\uFE0F \u6309\u94AE\u300D\uFF0C\u8F93\u5165 PAT\u3002</div>
      <img class="v2p-no-pat-img" src="https://i.imgur.com/O6hP86A.png">
    </div>
  </div>
</div>
`;
  }
});

// src/contents/home/index.ts
var home_exports = {};
var init_home = __esm({
  "src/contents/home/index.ts"() {
    "use strict";
    init_constants();
    init_utils();
    init_helpers();
    init_topic_list();
    void (async () => {
      const storage = await getStorage();
      const options = storage["options" /* Options */];
      {
        $("#Main .tab").addClass("v2p-hover-btn");
        if (options.openInNewTab) {
          $('#Main .topic-link, .item_hot_topic_title > a, .item_node, a[href="/write"]').prop(
            "target",
            "_blank"
          );
        }
      }
      handlingTopicList();
      {
        const dailyInfo = storage["daily" /* Daily */];
        if (dailyInfo?.lastCheckInTime) {
          if (isSameDay(dailyInfo.lastCheckInTime, Date.now())) {
            const $info = $(`
          <a class="cell v2p-info-row" href="/mission/daily">
            \u4ECA\u65E5\u5DF2\u81EA\u52A8\u7B7E\u5230
          </a>
        `);
            $('#Rightbar > .box:has("#member-activity")').append($info);
          }
        }
      }
      loadIcons();
    })();
  }
});

// node_modules/.pnpm/@floating-ui+utils@0.1.1/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
var min, max, oppositeSideMap, oppositeAlignmentMap;
var init_floating_ui_utils = __esm({
  "node_modules/.pnpm/@floating-ui+utils@0.1.1/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    "use strict";
    min = Math.min;
    max = Math.max;
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/.pnpm/@floating-ui+core@1.4.1/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var computePosition, flip, offset, shift;
var init_floating_ui_core = __esm({
  "node_modules/.pnpm/@floating-ui+core@1.4.1/node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    "use strict";
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x,
        y
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i = 0; i < validMiddleware.length; i++) {
        const {
          name,
          fn
        } = validMiddleware[i];
        const {
          x: nextX,
          y: nextY,
          data,
          reset
        } = await fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x,
              y
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i = -1;
          continue;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          const side = getSide(placement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$map$so;
                  const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    offset = function(options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          const {
            x,
            y
          } = state;
          const diffCoords = await convertValueToCoords(state, options);
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: diffCoords
          };
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x,
            y,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x2,
                  y: y2
                } = _ref;
                return {
                  x: x2,
                  y: y2
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min3 = mainAxisCoord + overflow[minSide];
            const max3 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min3, mainAxisCoord, max3);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min3 = crossAxisCoord + overflow[minSide];
            const max3 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min3, crossAxisCoord, max3);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y
            }
          };
        }
      };
    };
  }
});

// node_modules/.pnpm/@floating-ui+dom@1.4.5/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const safari = isSafari();
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !safari && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !safari && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function isSafari() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x = ($2 ? round(rect.width) : rect.width) / width;
  let y = ($2 ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isSafari() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max2(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max2(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max2(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isSafari();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
var min2, max2, round, createCoords, noOffsets, getElementRects, platform, computePosition2;
var init_floating_ui_dom = __esm({
  "node_modules/.pnpm/@floating-ui+dom@1.4.5/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    "use strict";
    init_floating_ui_core();
    init_floating_ui_core();
    min2 = Math.min;
    max2 = Math.max;
    round = Math.round;
    createCoords = (v) => ({
      x: v,
      y: v
    });
    noOffsets = /* @__PURE__ */ createCoords(0);
    getElementRects = async function(_ref) {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
        floating: {
          x: 0,
          y: 0,
          ...await getDimensionsFn(floating)
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    computePosition2 = (reference, floating, options) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// src/components/popup.ts
function createPopup(props) {
  const {
    root,
    trigger,
    triggerType = "click",
    content,
    options,
    onOpen,
    onClose,
    placement = "bottom-start",
    offsetOptions = { mainAxis: 5, crossAxis: 5 }
  } = props;
  const $popupContent = $('<div class="v2p-popup-content">');
  const $popup = $('<div class="v2p-popup" tabindex="0">').css("visibility", "hidden").append($popupContent);
  root.append($popup);
  if (content) {
    $popup.append(content);
  }
  const popup = $popup.get(0);
  const handleClickOutside = (ev) => {
    if ($(ev.target).closest(popup).length === 0) {
      handlePopupClose();
    }
  };
  const handlePopupClose = () => {
    $popup.css("visibility", "hidden");
    $(document).off("click", handleClickOutside);
    onClose?.();
    popupControl2.onClose?.();
  };
  const handlePopupOpen = ($reference) => {
    if (!$reference) {
      return;
    }
    setTimeout(() => {
      $(document).on("click", handleClickOutside);
    });
    const referenceElement = $reference.get(0);
    computePosition2(referenceElement, popup, {
      placement,
      middleware: [offset(offsetOptions), flip(), shift({ padding: 8 })],
      ...options
    }).then(({ x, y }) => {
      Object.assign(popup.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      $popup.css("visibility", "visible");
    }).catch(() => {
      handlePopupClose();
      createToast({ message: "\u274C Popup \u6E32\u67D3\u5931\u8D25" });
    });
    onOpen?.();
  };
  const popupControl2 = {
    $content: $popupContent,
    isOver: false,
    open: (reference) => {
      handlePopupOpen(reference);
    },
    close: handlePopupClose
  };
  if (triggerType === "hover") {
    $popup.on("mouseover", () => {
      if (!popupControl2.isOver) {
        popupControl2.isOver = true;
        $popup.off("mouseleave").on("mouseleave", () => {
          popupControl2.isOver = false;
          setTimeout(() => {
            if (!popupControl2.isOver) {
              popupControl2.close();
            }
          }, hoverDelay);
        });
      }
    });
  }
  trigger?.on("click", () => {
    if (popup.style.visibility !== "hidden") {
      handlePopupClose();
    } else {
      handlePopupOpen(trigger);
    }
  });
  return popupControl2;
}
var hoverDelay, popupControl;
var init_popup = __esm({
  "src/components/popup.ts"() {
    "use strict";
    init_floating_ui_dom();
    init_globals();
    init_toast();
    hoverDelay = 350;
    popupControl = createPopup({
      root: $commentBox,
      triggerType: "hover",
      placement: "right-start",
      offsetOptions: { mainAxis: 8, crossAxis: -4 }
    });
  }
});

// src/contents/topic/content.ts
function handlingContent() {
  const storage = getStorageSync();
  const options = storage["options" /* Options */];
  if (options.openInNewTab) {
    $topicContentBox.find(".topic_content a[href]").prop("target", "_blank").prop("rel", "noopener noreferrer");
  }
  {
    const $topicContents = $topicContentBox.find(".subtle > .topic_content");
    const textLength = $topicContents.text().length;
    if (textLength >= 200) {
      $topicContents.each((_, topicContent) => {
        if (textLength >= 400) {
          topicContent.style.fontSize = "14px";
        }
        topicContent.style.fontSize = "14.5px";
      });
    }
  }
  {
    const topicBtn = $(".topic_buttons .tb").addClass("v2p-tb v2p-hover-btn");
    const $favoriteBtn = topicBtn.eq(0);
    $favoriteBtn.append('<span class="v2p-tb-icon"><i data-lucide="star"></i></span>');
    topicBtn.eq(1).append('<span class="v2p-tb-icon"><i data-lucide="twitter"></i></span>');
    topicBtn.eq(2).append('<span class="v2p-tb-icon"><i data-lucide="eye-off"></i></span>');
    topicBtn.eq(3).append('<span class="v2p-tb-icon"><i data-lucide="heart"></i></span>');
    loadIcons();
  }
}
function processReplyContent($cellDom, replyContentOptions) {
  if (!replyContentOptions.autoFold || $cellDom.find(".v2p-reply-content").length > 0) {
    return;
  }
  const $replyContent = $cellDom.find(".reply_content");
  const contentHeight = $replyContent.height() ?? 0;
  const shouldCollapsed = contentHeight + READABLE_CONTENT_HEIGHT >= MAX_CONTENT_HEIGHT;
  if (shouldCollapsed) {
    const collapsedCSS = {
      maxHeight: `${READABLE_CONTENT_HEIGHT}px`,
      overflow: "hidden",
      paddingBottom: "0"
    };
    const $contentBox = $('<div class="v2p-reply-content v2p-collapsed">').css(collapsedCSS);
    const $expandBtn = createButton({ children: "\u5C55\u5F00\u56DE\u590D", className: "v2p-expand-btn" });
    const toggleContent = () => {
      const collapsed = $contentBox.hasClass("v2p-collapsed");
      $contentBox.toggleClass("v2p-collapsed").css(
        collapsed ? { maxHeight: "none", overflow: "auto", paddingBottom: "40px" } : collapsedCSS
      );
      $expandBtn.html(collapsed ? "\u6536\u8D77\u56DE\u590D" : "\u5C55\u5F00\u56DE\u590D");
    };
    $expandBtn.on("click", () => {
      toggleContent();
    });
    $contentBox.append($replyContent.clone()).replaceAll($replyContent).append($expandBtn);
  }
}
function updateMemberTag(memberName, tags, options) {
  const $v2pTags = $(`.v2p-tags-${memberName}`);
  const tagsValue = tags?.map((it) => it.name).join("\uFF0C");
  if ($v2pTags.length > 0) {
    if (tagsValue) {
      $v2pTags.html(`<b>#</b>&nbsp;${tagsValue}`);
    } else {
      $v2pTags.remove();
    }
  } else {
    if (tagsValue) {
      const $tags = $(
        `<div class="v2p-reply-tags v2p-tags-${memberName}" title="${tagsValue}"><b>#</b>&nbsp;${tagsValue}</div>`
      );
      $tags.on("click", () => {
        openTagsSetter(memberName);
      });
      if (memberName === topicOwnerName) {
        $topicHeader.append($tags.clone(true));
      }
      if (options.userTag.display === "inline") {
        $tags.addClass("v2p-reply-tags-inline").insertBefore(
          $commentCells.filter(`:has(> table strong > a[href="/member/${memberName}"])`).find("> table .badges")
        );
      } else {
        $tags.insertBefore(
          $commentCells.filter(`:has(> table strong > a[href="/member/${memberName}"])`).find("> table .reply_content")
        );
      }
    }
  }
}
function openTagsSetter(memberName) {
  void (async () => {
    const storage = await getStorage(false);
    const latestTagsData = storage["member-tag" /* MemberTag */];
    const options = storage["options" /* Options */];
    const tagsValue = latestTagsData ? Reflect.has(latestTagsData, memberName) ? latestTagsData[memberName].tags?.map((it) => it.name).join("\uFF0C") : void 0 : void 0;
    const newTagsValue = window.prompt(
      `\u5BF9 @${memberName} \u8BBE\u7F6E\u6807\u7B7E\uFF0C\u591A\u4E2A\u6807\u7B7E\u4EE5\u9017\u53F7\uFF08\uFF0C\uFF09\u5206\u9694\u3002`,
      tagsValue
    );
    if (newTagsValue !== null) {
      const tags = newTagsValue.trim().length > 0 ? newTagsValue.split(/,|，/g).map((it) => ({ name: it })) : void 0;
      await setMemberTags(memberName, tags);
      updateMemberTag(memberName, tags, options);
    }
  })();
}
var init_content = __esm({
  "src/contents/topic/content.ts"() {
    "use strict";
    init_button();
    init_constants();
    init_utils();
    init_globals();
    init_helpers();
  }
});

// src/contents/topic/avatar.ts
function processAvatar(params) {
  const { $trigger, popupControl: popupControl2, commentData, onSetTagsClick: onSetTags } = params;
  const { memberName, memberAvatar, memberLink } = commentData;
  let abortController = null;
  const handleOver = () => {
    popupControl2.close();
    popupControl2.open($trigger);
    const $content = $(`
      <div class="v2p-member-card">
        <div class="v2p-info">
          <div class="v2p-info-left">
            <a class="v2p-avatar-box" href="${memberLink}">
              <img class="v2p-avatar" src="${memberAvatar}">
            </a>
          </div>

          <div class="v2p-info-right">
            <div class="v2p-username">
              <a href="${memberLink}">${memberName}</a>
            </div>
            <div class="v2p-no v2p-loading"></div>
            <div class="v2p-created-date v2p-loading"></div>
          </div>

          </div>

          <div class="v2p-bio" style="disply:none;"></div>

          <div class="v2p-member-card-actions"></div>
      </div>
    `);
    popupControl2.$content.empty().append($content);
    createButton({ children: "\u6DFB\u52A0\u7528\u6237\u6807\u7B7E" }).on("click", () => {
      popupControl2.close();
      openTagsSetter(memberName);
      onSetTags?.();
    }).appendTo($(".v2p-member-card-actions"));
    void (async () => {
      if (!memberDataCache.has(memberName)) {
        abortController = new AbortController();
        popupControl2.onClose = () => {
          abortController?.abort();
        };
        try {
          const memberData = await fetchUserInfo(memberName, {
            signal: abortController.signal
          });
          memberDataCache.set(memberName, memberData);
        } catch (err) {
          if (err && typeof err === "object" && "name" in err && err.name !== "AbortError") {
            $content.html(`<span>\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25</span>`);
          }
          return null;
        }
      }
      const data = memberDataCache.get(memberName);
      if (data) {
        $content.find(".v2p-no").removeClass("v2p-loading").text(`V2EX \u7B2C ${data.id} \u53F7\u4F1A\u5458`);
        $content.find(".v2p-created-date").removeClass("v2p-loading").text(`\u52A0\u5165\u4E8E ${formatTimestamp(data.created)}`);
        if (data.bio && data.bio.trim().length > 0) {
          $content.find(".v2p-bio").css("disply", "block").text(data.bio);
        }
      }
    })();
  };
  let isOver = false;
  $trigger.on("mouseover", () => {
    isOver = true;
    setTimeout(() => {
      if (isOver) {
        handleOver();
      }
    }, hoverDelay);
  }).on("mouseleave", () => {
    isOver = false;
    setTimeout(() => {
      if (!popupControl2.isOver && !isOver) {
        popupControl2.close();
      }
    }, hoverDelay);
  }).wrap(`<a href="/member/${commentData.memberName}" style="cursor: pointer;">`);
}
var memberDataCache;
var init_avatar = __esm({
  "src/contents/topic/avatar.ts"() {
    "use strict";
    init_button();
    init_popup();
    init_services();
    init_utils();
    init_content();
    memberDataCache = /* @__PURE__ */ new Map();
  }
});

// src/contents/topic/comment.ts
function handlingPopularComments() {
  const popularCommentData = commentDataList.filter(({ likes }) => likes > 0).sort((a, b) => b.likes - a.likes);
  const popularCount = popularCommentData.length;
  const iconHeart = createElement$1(Heart);
  iconHeart.setAttribute("width", "100%");
  iconHeart.setAttribute("height", "100%");
  const $popularBtn = $(
    `<span class="v2p-tool v2p-hover-btn"><span class="v2p-tool-icon"></span>\u70ED\u95E8\u56DE\u590D</span>`
  );
  $popularBtn.find(".v2p-tool-icon").append(iconHeart);
  $(".v2p-tools").prepend($popularBtn);
  if (popularCount <= 0) {
    $popularBtn.addClass("v2p-hover-btn-disabled").contents().last().replaceWith("\u6682\u65E0\u70ED\u95E8");
    return;
  }
  const model = createModel({
    root: $commentBox,
    title: `\u672C\u9875\u5171\u6709 ${popularCommentData.length} \u6761\u70ED\u95E8\u56DE\u590D`,
    onMount: ({ $content }) => {
      const $template = $("<div>");
      popularCommentData.forEach(({ index, refMemberNames }) => {
        const $clonedCells = $commentCells.eq(index).clone();
        $clonedCells.find(".v2p-controls > a:has(.v2p-control-reply)").remove();
        $clonedCells.find(".no").css("pointer-events", "none");
        const firstRefMember = refMemberNames?.at(0);
        if (firstRefMember) {
          const replyMember = commentDataList.findLast(
            (it, idx) => idx < index && it.memberName === firstRefMember
          );
          if (replyMember) {
            const $refCell = $(`
              <div class="v2p-topic-reply-ref">
                <div class="v2p-topic-reply">
                  <div class="v2p-topic-reply-member">
                    <a href="${replyMember.memberAvatar}">
                      <img class="v2p-topic-reply-avatar" src="${replyMember.memberAvatar}">
                      <span>${replyMember.memberName}</span>
                    </a>\uFF1A
                  </div>
                  <div class="v2p-topic-reply-content">${escapeHTML(replyMember.content)}</div>
                </div>
              </div>
            `);
            $clonedCells.prepend($refCell);
          }
        }
        $template.append($clonedCells);
      });
      $content.css({ padding: "0 20px" }).append($template.html());
    },
    onOpen: ({ $container }) => {
      $container.find('.cell[id^="r_"]').each((_, cellDom) => {
        const storage = getStorageSync();
        const options = storage["options" /* Options */];
        processReplyContent($(cellDom), options.replyContent);
      });
    }
  });
  $popularBtn.on("click", () => {
    model.open();
  });
  {
    const commentBoxCount = $commentBox.find(".cell:first-of-type > span.gray");
    const countText = commentBoxCount.text();
    const newCountText = countText.substring(0, countText.indexOf("\u56DE\u590D") + 2);
    const countTextSpan = `<span class="count-text">${newCountText}</span><span class="v2p-dot">\xB7</span>${popularCount} \u6761\u70ED\u95E8\u56DE\u590D`;
    commentBoxCount.empty().append(countTextSpan);
  }
}
function handlingRecentComments() {
  if (commentDataList.length <= 5) {
    return;
  }
  const len = commentDataList.length;
  const displayNum = len <= 10 ? 5 : len <= 30 ? 10 : len <= 60 ? 20 : len <= 100 ? 40 : len <= 200 ? 60 : 90;
  const recentCommentData = commentDataList.slice(-1 * displayNum).reverse();
  const iconClock = createElement$1(Clock4);
  iconClock.setAttribute("width", "100%");
  iconClock.setAttribute("height", "100%");
  const $recentBtn = $(
    `<span class="v2p-tool v2p-hover-btn"><span class="v2p-tool-icon"></span>\u6700\u8FD1\u56DE\u590D</span>`
  );
  $recentBtn.find(".v2p-tool-icon").append(iconClock);
  $(".v2p-tools").prepend($recentBtn);
  const model = createModel({
    root: $commentBox,
    title: `\u6700\u8FD1 ${displayNum} \u6761\u56DE\u590D`,
    onMount: ({ $content }) => {
      const $template = $("<div>");
      recentCommentData.forEach(({ index, refMemberNames }) => {
        const $clonedCells = $commentCells.eq(index).clone();
        $clonedCells.find(".v2p-controls > a:has(.v2p-control-reply)").remove();
        $clonedCells.find(".no").css("pointer-events", "none");
        const firstRefMember = refMemberNames?.at(0);
        if (firstRefMember) {
          const replyMember = commentDataList.findLast(
            (it, idx) => idx < index && it.memberName === firstRefMember
          );
          if (replyMember) {
            const $refCell = $(`
              <div class="v2p-topic-reply-ref">
                <div class="v2p-topic-reply">
                  <div class="v2p-topic-reply-member">
                    <a href="${replyMember.memberAvatar}">
                      <img class="v2p-topic-reply-avatar" src="${replyMember.memberAvatar}">
                      <span>${replyMember.memberName}</span>
                    </a>\uFF1A
                  </div>
                  <div class="v2p-topic-reply-content">${escapeHTML(replyMember.content)}</div>
                </div>
              </div>
            `);
            $clonedCells.prepend($refCell);
          }
        }
        $template.append($clonedCells);
      });
      $content.css({ padding: "0 20px" }).append($template.html());
    },
    onOpen: ({ $container }) => {
      $container.find('.cell[id^="r_"]').each((_, cellDom) => {
        const storage = getStorageSync();
        const options = storage["options" /* Options */];
        processReplyContent($(cellDom), options.replyContent);
      });
    }
  });
  $recentBtn.on("click", () => {
    model.open();
  });
}
function processActions($cellDom, data) {
  const $actions = $cellDom.find("> table > tbody > tr > td:last-of-type > .fr");
  const $controls = $('<span class="v2p-controls">');
  const $thankIcon = $(
    `<span
      class="v2p-control v2p-control-thank"
      data-id="${data.id}"
      data-member-name="${data.memberName}"
     >
        <i data-lucide="heart"></i>
     </span>`
  );
  const thankArea = $actions.find("> .thank_area");
  const thanked = thankArea.hasClass("thanked");
  if (thanked) {
    $thankIcon.addClass("v2p-thanked");
    $controls.append($("<a>").append($thankIcon));
  } else {
    const thankEle = thankArea.find("> .thank");
    const $hide = thankEle.eq(0).removeClass("thank");
    const $thank = thankEle.eq(1).removeClass("thank");
    $hide.html(
      `<span class="v2p-control v2p-hover-btn v2p-control-hide"><i data-lucide="eye-off"></i></span>`
    );
    $thankIcon.addClass("v2p-hover-btn").replaceAll($thank);
    $controls.append($hide).append($thankIcon);
  }
  const $reply = $actions.find("a:last-of-type");
  $reply.find('> img[alt="Reply"]').replaceWith(
    `<span class="v2p-control v2p-hover-btn v2p-control-reply"><i data-lucide="message-square"></i></span>`
  );
  $controls.append($reply);
  thankArea.remove();
  const floorNum = $actions.find(".no").clone();
  $reply.on("click", () => {
    const replyVal = $replyTextArea.val();
    if (typeof replyVal === "string" && replyVal.length > 0) {
      const floor = floorNum.text();
      const replyComment = commentDataList.find((it) => it.floor === floor);
      if (replyComment) {
        const replyMemberName = replyComment.memberName;
        const moreThanOneReply = commentDataList.findIndex(
          (it) => it.memberName === replyMemberName && it.floor !== floor
        ) !== -1;
        if (moreThanOneReply) {
          insertTextToReplyInput(`#${floor} `);
        } else {
          const $page = $(".v2p-paging").eq(0).find(".page_normal, .page_current");
          if ($page.length > 1) {
            const onLastPage = $page.last().hasClass("page_current");
            if (!onLastPage) {
              insertTextToReplyInput(`#${floor} `);
            }
          }
        }
      }
    }
  });
  $actions.empty().append($controls, floorNum);
}
async function handlingComments() {
  const storage = getStorageSync();
  const tagData = storage["member-tag" /* MemberTag */];
  const options = storage["options" /* Options */];
  if (options.replyContent.hideReplyTime) {
    $(".cell .ago").addClass("v2p-auto-hide");
  }
  if (options.reply.preload !== "off") {
    const $paging = $(".v2p-paging");
    if ($paging.length > 0) {
      const $pagingTop = $paging.eq(0);
      const $pagingBottom = $paging.eq(1);
      const $pageNormal = $paging.find(".page_normal");
      const $pagingTopNormal = $pagingTop.find(".page_normal");
      const toastControl = createToast({ message: "\u6B63\u5728\u9884\u52A0\u8F7D\u56DE\u590D\uFF0C\u8BF7\u7A0D\u5019...", duration: 0 });
      try {
        const $pagingBottomNormal = $pagingBottom.find(".page_normal");
        const $pageCurrent = $pagingTop.find(".page_current");
        const currentPage = $pageCurrent.text();
        if (currentPage === "1") {
          const pages = [];
          $pagingTopNormal.each((i, ele) => {
            if (i <= 1) {
              if (ele.textContent) {
                ele.classList.add("page_current");
                ele.classList.remove("page_normal");
                $pagingBottomNormal.eq(i).addClass("page_current").removeClass("page_normal");
                pages.push(ele.textContent);
              }
            }
          });
          if (pages.length > 0) {
            const pagesText = await Promise.all(
              pages.map((p) => crawalTopicPage(window.location.pathname, p))
            );
            pagesText.map((pageText) => {
              $pagingBottom.before($(pageText).find('.cell[id^="r_"]'));
            });
          }
          updateCommentCells();
        }
        toastControl.clear();
      } catch (err) {
        if (err instanceof Error) {
          console.error(`\u52A0\u8F7D\u591A\u9875\u56DE\u590D\u51FA\u9519\uFF1A${err.message}`);
        }
        createToast({ message: "\u274C \u52A0\u8F7D\u591A\u9875\u56DE\u590D\u5931\u8D25" });
        $pageNormal.removeClass("page_current").addClass("page_normal");
      }
    }
  }
  const canHideRefName = options.nestedReply.display === "indent" && !!options.replyContent.hideRefName;
  commentDataList = $commentTableRows.map((idx, tr) => {
    const id = $commentCells[idx].id;
    const $tr = $(tr);
    const $td = $tr.find("> td:nth-child(3)");
    const thanked = $tr.find("> td:last-of-type > .fr").find("> .thank_area").hasClass("thanked");
    const $member = $td.find("> strong > a");
    const memberName = $member.text();
    const memberLink = $member.prop("href");
    const memberAvatar = $tr.find(".avatar").prop("src");
    const $content = $td.find("> .reply_content");
    const content = $content.text();
    const likes = Number($td.find("span.small").text());
    const floor = $td.find("span.no").text();
    const memberNameMatches = Array.from(content.matchAll(/@([a-zA-Z0-9]+)/g));
    const refMemberNames = memberNameMatches.length > 0 ? memberNameMatches.map(([, name]) => {
      return name;
    }) : void 0;
    const floorNumberMatches = Array.from(content.matchAll(/#(\d+)/g));
    const refFloors = floorNumberMatches.length > 0 ? floorNumberMatches.map(([, floor2]) => {
      return floor2;
    }) : void 0;
    let contentHtml = void 0;
    if (refMemberNames) {
      if (canHideRefName) {
        if (refMemberNames.length === 1) {
          contentHtml = $content.html();
          const pattern = /(@<a href="\/member\/\w+">[\w\s]+<\/a>)\s+/g;
          const replacement = '<span class="v2p-member-ref">$1</span> ';
          contentHtml = contentHtml.replace(pattern, replacement);
        }
      }
    }
    return {
      id,
      memberName,
      memberLink,
      memberAvatar,
      content,
      contentHtml,
      likes,
      floor,
      index: idx,
      refMemberNames,
      refFloors,
      thanked
    };
  }).get();
  {
    const membersHasSetTags = /* @__PURE__ */ new Set();
    $commentCells.each((i, cellDom) => {
      const currentComment = commentDataList.at(i);
      if (currentComment?.id !== cellDom.id) {
        return;
      }
      const $cellDom = $(cellDom);
      const { memberName, thanked } = currentComment;
      processAvatar({
        $trigger: $cellDom.find(".avatar"),
        popupControl,
        commentData: currentComment
      });
      if (memberName === loginName) {
        $cellDom.find(".badges").append(`<div class="badge ${memberName === topicOwnerName ? "mod" : "you"}">YOU</div>`);
      }
      const $likesBox = $cellDom.find(".small.fade").addClass("v2p-likes-box");
      $likesBox.find('img[alt="\u2764\uFE0F"]').replaceWith('<span class="v2p-icon-heart"><i data-lucide="heart"></i></span>');
      if (thanked) {
        $likesBox.addClass("v2p-thanked");
      }
      if (tagData && Reflect.has(tagData, memberName) && !membersHasSetTags.has(memberName)) {
        updateMemberTag(memberName, tagData[memberName].tags, options);
        membersHasSetTags.add(memberName);
      }
      processActions($cellDom, currentComment);
      if (canHideRefName) {
        if (currentComment.contentHtml) {
          $cellDom.find(".reply_content").html(currentComment.contentHtml);
        }
      }
    });
    updateCommentCells();
    handlingRecentComments();
    handlingPopularComments();
    $(".v2p-control-thank").on("click", (ev) => {
      ev.stopPropagation();
      const id = ev.currentTarget.dataset.id;
      const memberName = ev.currentTarget.dataset.memberName;
      if (typeof id === "string" && typeof memberName === "string") {
        if (confirm(`${memberName} 说的在理, 赏 10 铜币?`)) {
          const replyId = id.split("_").at(1);
          if (replyId) {
            void thankReply({
              replyId,
              onSuccess: () => {
                const $cell = $(`.cell[id="r_${replyId}"]`);
                const $tableInCell = $cell.find("> table");
                const $likesBox = $tableInCell.find(".v2p-likes-box");
                const $firstLikesBox = $likesBox.eq(0);
                const likes = Number($firstLikesBox.text());
                const $clonedIconHeart = $firstLikesBox.find(".v2p-icon-heart").clone();
                if (likes > 0) {
                  $likesBox.addClass("v2p-thanked").empty().append($clonedIconHeart, ` ${likes + 1}`);
                } else {
                  $(`
                      <span class="small v2p-likes-box v2p-thanked" style="position:relative;top:-1px;">
                        &nbsp;&nbsp;<span class="v2p-icon-heart"><i data-lucide="heart"></i></span>1
                      </span>
                      `).insertAfter($tableInCell.find(".ago"));
                  loadIcons();
                }
                const $thankAction = $tableInCell.find(".v2p-control-thank");
                $thankAction.addClass("v2p-thanked").off("click");
                $thankAction.siblings().has(".v2p-control-hide").hide();
              },
              onFail: () => {
                createToast({ message: "\u274C \u611F\u8C22\u56DE\u590D\u5931\u8D25" });
              }
            });
          }
        }
      }
    });
  }
  {
    const display = options.nestedReply.display;
    if (display !== "off") {
      $commentCells.each((i, cellDom) => {
        const $cellDom = $(cellDom);
        const dataFromIndex = commentDataList.at(i);
        processReplyContent($cellDom, options.replyContent);
        const currentComment = dataFromIndex?.id === cellDom.id ? dataFromIndex : commentDataList.find((data) => data.id === cellDom.id);
        if (currentComment) {
          const { refMemberNames, refFloors } = currentComment;
          if (!refMemberNames || refMemberNames.length === 0) {
            return;
          }
          if (options.nestedReply.multipleInsideOne === "off" && refMemberNames.length > 1) {
            return;
          }
          for (const refName of refMemberNames) {
            for (let j = i - 1; j >= 0; j--) {
              const { memberName: compareName, floor: eachFloor } = commentDataList.at(j) || {};
              if (compareName === refName) {
                let refCommentIdx = j;
                const firstRefFloor = refFloors?.at(0);
                if (firstRefFloor && firstRefFloor !== eachFloor) {
                  const targetIdx = commentDataList.slice(0, j).findIndex(
                    (data) => data.floor === firstRefFloor && data.memberName === refName
                  );
                  if (targetIdx >= 0) {
                    refCommentIdx = targetIdx;
                  }
                }
                if (display === "indent") {
                  cellDom.classList.add("v2p-indent");
                }
                $commentCells.eq(refCommentIdx).append(cellDom);
                return;
              }
            }
          }
        }
      });
    }
  }
  {
    const $opAvatar = $topicHeader.find(".avatar");
    const $opName = $topicHeader.find('.gray a[href^="/member"]');
    const memberName = $opAvatar.prop("alt");
    const memberAvatar = $opAvatar.prop("src");
    const memberLink = $topicHeader.find(".fr > a").prop("href");
    if (typeof memberName === "string" && typeof memberAvatar === "string" && typeof memberLink === "string") {
      processAvatar({
        $trigger: $opAvatar,
        popupControl,
        commentData: { memberName, memberAvatar, memberLink }
      });
      processAvatar({
        $trigger: $opName,
        popupControl,
        commentData: { memberName, memberAvatar, memberLink }
      });
    }
  }
}
var commentDataList;
var init_comment = __esm({
  "src/contents/topic/comment.ts"() {
    "use strict";
    init_lucide();
    init_model();
    init_popup();
    init_toast();
    init_constants();
    init_services();
    init_utils();
    init_globals();
    init_helpers();
    init_avatar();
    init_content();
    commentDataList = [];
  }
});

// src/contents/topic/paging.ts
function handlingPaging() {
  const $notCommentCells = $commentBox.find('> .cell:not([id^="r_"])');
  if ($notCommentCells.length <= 1) {
    return;
  }
  const pagingCells = $notCommentCells.slice(1).addClass("v2p-paging");
  const pageBtns = pagingCells.find(".super.button");
  pageBtns.eq(0).addClass("v2p-prev-btn");
  pageBtns.eq(1).addClass("v2p-next-btn");
}
var init_paging = __esm({
  "src/contents/topic/paging.ts"() {
    "use strict";
    init_globals();
  }
});

// src/components/image-upload.ts
function bindImageUpload(props) {
  const { $wrapper: $wrapper2, $input, insertText, replaceText } = props;
  const $uploadBar = $(`<div class="v2p-reply-upload-bar">${uploadTip}</div>`);
  const handleUploadImage = (file) => {
    const placeholder = "[\u4E0A\u4F20\u56FE\u7247\u4E2D...]";
    insertText(` ${placeholder} `);
    $uploadBar.addClass("v2p-reply-upload-bar-disabled").text("\u6B63\u5728\u4E0A\u4F20\u56FE\u7247...");
    uploadImage(file).then((imgLink) => {
      replaceText(placeholder, imgLink);
    }).catch(() => {
      replaceText(placeholder, "");
      window.alert("\u274C \u4E0A\u4F20\u56FE\u7247\u5931\u8D25\uFF0C\u8BF7\u6253\u5F00\u63A7\u5236\u53F0\u67E5\u770B\u539F\u56E0");
    }).finally(() => {
      $uploadBar.removeClass("v2p-reply-upload-bar-disabled").text(uploadTip);
    });
  };
  const handleClickUploadImage = () => {
    const imgInput = document.createElement("input");
    imgInput.style.display = "none";
    imgInput.type = "file";
    imgInput.accept = "image/*";
    imgInput.addEventListener("change", () => {
      const selectedFile = imgInput.files?.[0];
      if (selectedFile) {
        handleUploadImage(selectedFile);
      }
    });
    imgInput.click();
  };
  document.addEventListener("paste", (ev) => {
    if (!(ev instanceof ClipboardEvent)) {
      return;
    }
    if ($input && !$input.get(0)?.matches(":focus")) {
      return;
    }
    const items = ev.clipboardData?.items;
    if (!items) {
      return;
    }
    const imageItem = Array.from(items).find((item) => item.type.includes("image"));
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        handleUploadImage(file);
      }
    }
  });
  $wrapper2.get(0)?.addEventListener("drop", (ev) => {
    ev.preventDefault();
    if (!(ev instanceof DragEvent)) {
      return;
    }
    const file = ev.dataTransfer?.files[0];
    if (file) {
      handleUploadImage(file);
    }
  });
  $(".flex-one-row:last-of-type > .gray").text("");
  $uploadBar.on("click", () => {
    if (!$uploadBar.hasClass("v2p-reply-upload-bar-disabled")) {
      handleClickUploadImage();
    }
  });
  $wrapper2.append($uploadBar);
  return {
    uploadBar: $uploadBar
  };
}
var uploadTip;
var init_image_upload = __esm({
  "src/components/image-upload.ts"() {
    "use strict";
    init_services();
    uploadTip = "\u9009\u62E9\u3001\u7C98\u8D34\u3001\u62D6\u653E\u4E0A\u4F20\u56FE\u7247\u3002";
  }
});

// src/contents/topic/reply.ts
function handlingReplyActions() {
  const os = getOS();
  const replyBtnText = `\u56DE\u590D<kbd>${os === "macos" ? "Cmd" : "Ctrl"}+Enter</kbd>`;
  const $replyBtn = createButton({
    children: replyBtnText,
    type: "submit"
  }).replaceAll($replyBox.find('input[type="submit"]'));
  $replyForm.on("submit", () => {
    const replyVal = $replyTextArea.val();
    if (typeof replyVal === "string") {
      $replyTextArea.val(transformEmoji(replyVal));
    }
    $replyBtn.text("\u63D0\u4EA4\u56DE\u590D\u4E2D...").prop("disabled", true);
    setTimeout(() => {
      $replyBtn.html(replyBtnText).prop("disabled", false);
    }, 5e3);
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault();
      $replyForm.trigger("submit");
    }
  });
  {
    const emoticonGroup = $('<div class="v2p-emoji-group">');
    const emoticonList = $('<div class="v2p-emoji-list">');
    const emoticonSpan = $('<span class="v2p-emoji">');
    const groups = emoticons.map((emojiGroup) => {
      const group = emoticonGroup.clone();
      const list = emoticonList.clone();
      group.append(`<div class="v2p-emoji-title">${emojiGroup.title}</div>`);
      list.append(
        emojiGroup.list.map((emoji) => {
          const emoticon = emoticonSpan.clone();
          if (emojiGroup.title === "\u6D41\u884C") {
            const emojiLink = biliEmojiLink[emoji];
            emoticon.html(`<img src="${emojiLink}" />`).prop("title", emoji);
          } else {
            emoticon.text(emoji);
          }
          emoticon.on("click", () => {
            insertTextToReplyInput(emoji);
          });
          return emoticon;
        })
      );
      group.append(list);
      return group;
    });
    const emoticonsBox = $('<div class="v2p-emoticons-box">').append(groups);
    const $emojiBtn = createButton({
      children: '<span style="width:18px; height:18px;"><i data-lucide="smile"></i></span>'
    }).insertAfter($replyBtn);
    const $emojiContent = $('<div class="v2p-emoji-container">').append(emoticonsBox).appendTo($replyBox).on("click", () => {
      focusReplyInput();
    });
    const keyupHandler = (ev) => {
      if (ev.key === "Escape") {
        ev.preventDefault();
        emojiPopup.close();
      }
    };
    $emojiBtn.on("click", () => {
      focusReplyInput();
    });
    const emojiPopup = createPopup({
      root: $replyBox,
      trigger: $emojiBtn,
      content: $emojiContent,
      options: { placement: "right-end" },
      onOpen: () => {
        $(document.body).on("keydown", keyupHandler);
      },
      onClose: () => {
        $(document.body).off("keydown", keyupHandler);
      }
    });
  }
  {
    $replyBox.find("#undock-button, #undock-button + a").addClass("v2p-hover-btn").css("padding", "5px 4px");
  }
}
function handleReply() {
  $replyTextArea.attr("placeholder", "\u7559\u4E0B\u5BF9\u4ED6\u4EBA\u6709\u5E2E\u52A9\u7684\u56DE\u590D").wrap('<div class="v2p-reply-wrap">');
  const $replyWrap = $(".v2p-reply-wrap");
  const $replyPreview = $('<div class="v2p-reply-preview">');
  $replyPreview.hide().insertAfter($replyWrap);
  bindImageUpload({
    $wrapper: $replyWrap,
    $input: $replyTextArea,
    insertText: (text) => {
      insertTextToReplyInput(text);
    },
    replaceText: (find, replace) => {
      const val = $replyTextArea.val();
      if (typeof val === "string") {
        const newVal = val.replace(find, replace);
        $replyTextArea.val(newVal).trigger("focus");
      }
    }
  });
  {
    const $replyTabs = $('<div class="v2p-reply-tabs">');
    const $replyTabEdit = $('<div class="v2p-reply-tab active">\u7F16\u8F91</div>');
    const $replyTabPreview = $('<div class="v2p-reply-tab">\u9884\u89C8</div>');
    $replyTabEdit.on("click", () => {
      $replyTabEdit.addClass("active");
      $replyTabPreview.removeClass("active");
      $replyWrap.show();
      $replyPreview.hide();
    }).appendTo($replyTabs);
    let lastPreviewText = null;
    $replyTabPreview.on("click", () => {
      if (!$replyTabPreview.hasClass("active")) {
        $replyTabPreview.addClass("active");
        $replyTabEdit.removeClass("active");
        const replyText = $replyTextArea.val();
        if (typeof replyText === "string") {
          $replyWrap.hide();
          $replyPreview.show();
          if (replyText.trim() === "") {
            $replyPreview.html("\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u5185\u5BB9");
          } else {
            const textToPreview = transformEmoji(replyText);
            const handlePreview = async () => {
              $replyPreview.html("\u6B63\u5728\u52A0\u8F7D\u9884\u89C8...");
              try {
                const renderedContent = await getPreviewContent({
                  text: textToPreview,
                  syntax: "default"
                });
                $replyPreview.html(renderedContent);
                lastPreviewText = textToPreview;
              } catch {
                $replyPreview.html('\u9884\u89C8\u5931\u8D25\uFF0C<a class="v2p-preview-retry">\u70B9\u51FB\u91CD\u8BD5</a>\u3002');
                $replyPreview.find(".v2p-preview-retry").on("click", () => {
                  void handlePreview();
                });
              }
            };
            if (replyText !== lastPreviewText) {
              void handlePreview();
            }
          }
        }
      }
    }).appendTo($replyTabs);
    $replyBox.find("> .cell:first-of-type > div:first-of-type").replaceWith($replyTabs);
  }
  $(".flex-one-row:last-of-type > .gray").text("");
  handlingReplyActions();
}
var init_reply = __esm({
  "src/contents/topic/reply.ts"() {
    "use strict";
    init_button();
    init_image_upload();
    init_popup();
    init_constants();
    init_services();
    init_utils();
    init_globals();
    init_helpers();
  }
});

// src/contents/topic/index.ts
var topic_exports = {};
var init_topic = __esm({
  "src/contents/topic/index.ts"() {
    "use strict";
    init_popup();
    init_toast();
    init_constants();
    init_utils();
    init_globals();
    init_helpers();
    init_comment();
    init_content();
    init_paging();
    init_reply();
    void (async () => {
      const storage = await getStorage();
      const options = storage["options" /* Options */];
      if (options.openInNewTab) {
        $commentTableRows.find("> td:nth-child(3) > strong > a").prop("target", "_blank");
      }
      {
        const $tools = $(`
      <div class="cell v2p-tools">
        <span class="v2p-tool v2p-hover-btn v2p-tool-reply">
          <span class="v2p-tool-icon"><i data-lucide="message-square-plus"></i></span>\u56DE\u590D\u4E3B\u9898
        </span>
        <span class="v2p-tool v2p-hover-btn v2p-tool-reading">
          <span class="v2p-tool-icon"><i data-lucide="book-open-check"></i></span>\u7A0D\u540E\u9605\u8BFB
        </span>
        <span class="v2p-tool v2p-hover-btn v2p-tool-scroll-top">
          <span class="v2p-tool-icon"><i data-lucide="chevrons-up"></i></span>\u56DE\u5230\u9876\u90E8
        </span>
        <span class="v2p-tool v2p-hover-btn v2p-tool-more">
          <span class="v2p-tool-icon"><i data-lucide="package-plus"></i></span>\u66F4\u591A\u529F\u80FD
        </span>
      </div>
    `);
        $tools.find(".v2p-tool-reply").on("click", () => {
          $replyTextArea.trigger("focus");
        });
        $tools.find(".v2p-tool-reading").on("click", () => {
          void addToReadingList({
            url: window.location.href,
            title: document.title.replace(" - V2EX", ""),
            content: String($('head meta[property="og:description"]').prop("content"))
          });
        });
        $tools.find(".v2p-tool-scroll-top").on("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        {
          const $moreTool = $tools.find(".v2p-tool-more");
          $moreTool;
          const $toolContent = $(`
        <div class="v2p-reply-tool-content">
          <div class="v2p-reply-tool v2p-reply-tool-decode">\u89E3\u6790\u672C\u9875 Base64</div>
          <div class="v2p-reply-tool v2p-reply-tool-encode">\u6587\u672C\u8F6C Base64</div>
          <div class="v2p-reply-tool v2p-reply-tool-share">\u751F\u6210\u5206\u4EAB\u56FE\u7247</div>
        </div>
      `);
          const toolsPopup = createPopup({
            root: $replyBox,
            trigger: $moreTool,
            content: $toolContent,
            offsetOptions: { mainAxis: 5, crossAxis: -5 }
          });
          $toolContent.find(".v2p-reply-tool-decode").on("click", () => {
            decodeBase64TopicPage();
          });
          $toolContent.find(".v2p-reply-tool-encode").on("click", () => {
            focusReplyInput();
            toolsPopup.close();
            setTimeout(() => {
              const inputText = window.prompt("\u8F93\u5165\u8981\u52A0\u5BC6\u7684\u5B57\u7B26\u4E32\uFF0C\u5B8C\u6210\u540E\u5C06\u586B\u5199\u5230\u56DE\u590D\u6846\u4E2D\uFF1A");
              if (inputText) {
                let encodedText;
                try {
                  encodedText = window.btoa(encodeURIComponent(inputText));
                } catch (err) {
                  const errorTip = "\u8BE5\u6587\u672C\u65E0\u6CD5\u7F16\u7801\u4E3A Base64";
                  console.error(err, `${errorTip}\uFF0C\u53EF\u80FD\u7684\u9519\u8BEF\u539F\u56E0\uFF1A\u6587\u672C\u5305\u542B\u4E2D\u6587\u3002`);
                  createToast({ message: errorTip });
                }
                if (encodedText) {
                  insertTextToReplyInput(encodedText);
                }
              }
            });
          });
          $toolContent.find(".v2p-reply-tool-share").on("click", () => {
            const splits = window.location.pathname.split("/");
            const topicId = splits.at(-1);
            if (topicId && splits.at(-2) === "t") {
              window.open(`${"https://v2p.app" /* Home */}/share/${topicId}`, "_blank");
            }
          });
          const canHideRefName = options.nestedReply.display === "indent" && !!options.replyContent.hideRefName;
          if (canHideRefName) {
            let isHidden = options.replyContent.hideRefName;
            const $toolToggleDisplay = $(
              '<div class="v2p-reply-tool v2p-reply-tool-decode">\u663E\u793A @ \u7528\u6237\u540D</div>'
            );
            $toolToggleDisplay.on("click", () => {
              if (isHidden) {
                isHidden = false;
                $toolToggleDisplay.text("\u9690\u85CF @ \u7528\u6237\u540D");
                $(".v2p-member-ref").addClass("v2p-member-ref-show");
              } else {
                isHidden = true;
                $toolToggleDisplay.text("\u663E\u793A @ \u7528\u6237\u540D");
                $(".v2p-member-ref").removeClass("v2p-member-ref-show");
              }
            });
            $toolContent.prepend($toolToggleDisplay);
          }
        }
        $('#Rightbar > .box:has("#member-activity")').addClass("v2p-tool-box").append($tools);
        loadIcons();
      }
      {
        $(document).on("keydown", (ev) => {
          if (!ev.isDefaultPrevented()) {
            if (ev.key === "Escape") {
              const $replyContent = $("#reply_content");
              if ($replyBox.hasClass("reply-box-sticky")) {
                $replyBox.removeClass("reply-box-sticky");
                $("#undock-button").css("display", "none");
              }
              $replyContent.trigger("blur");
            }
          }
        });
      }
      handlingContent();
      if (document.referrer !== "") {
        if (document.referrer.includes(document.location.pathname)) {
          const url = new URL(document.location.href);
          const page = url.searchParams.get("p");
          if (page && page !== "1") {
            document.querySelector(".topic_buttons")?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      handlingPaging();
      await handlingComments();
      handleReply();
      loadIcons();
    })();
  }
});

// src/contents/write/write.ts
function handlingWrite() {
  bindImageUpload({
    $wrapper: $("#workspace"),
    insertText: (text) => {
      postTask(`editor.getDoc().replaceRange("${text}", editor.getCursor())`);
    },
    replaceText: (find, replace) => {
      if (replace) {
        const mode = $("input[name=syntax]:checked").val();
        if (mode === "markdown") {
          replace = `![](${replace})`;
        }
      }
      postTask(`
      editor.setValue(editor.getValue().replace("${find}", "${replace}"));
      const doc = editor.getDoc(); 
      const lastLine = doc.lastLine(); 
      const lastChar = doc.getLine(lastLine).length; 
      doc.setCursor({ line: doc.lastLine(), ch: lastChar });
      `);
    }
  });
}
var init_write = __esm({
  "src/contents/write/write.ts"() {
    "use strict";
    init_image_upload();
    init_helpers();
  }
});

// src/contents/write/index.ts
var write_exports = {};
var init_write2 = __esm({
  "src/contents/write/index.ts"() {
    "use strict";
    init_helpers();
    init_write();
    handlingWrite();
    loadIcons();
  }
});

// node_modules/.pnpm/webext-patterns@1.3.0/node_modules/webext-patterns/index.js
var patternValidationRegex = /^(https?|wss?|file|ftp|\*):\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^file:\/\/\/.*$|^resource:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^about:/;
var isFirefox = typeof navigator === "object" && navigator.userAgent.includes("Firefox/");
var allStarsRegex = isFirefox ? /^(https?|wss?):[/][/][^/]+([/].*)?$/ : /^https?:[/][/][^/]+([/].*)?$/;
var allUrlsRegex = /^(https?|file|ftp):[/]+/;
function getRawPatternRegex(matchPattern) {
  if (!patternValidationRegex.test(matchPattern)) {
    throw new Error(matchPattern + " is an invalid pattern, it must match " + String(patternValidationRegex));
  }
  let [, protocol, host, pathname] = matchPattern.split(/(^[^:]+:[/][/])([^/]+)?/);
  protocol = protocol.replace("*", isFirefox ? "(https?|wss?)" : "https?").replace(/[/]/g, "[/]");
  host = (host !== null && host !== void 0 ? host : "").replace(/^[*][.]/, "([^/]+.)*").replace(/^[*]$/, "[^/]+").replace(/[.]/g, "[.]").replace(/[*]$/g, "[^.]+");
  pathname = pathname.replace(/[/]/g, "[/]").replace(/[.]/g, "[.]").replace(/[*]/g, ".*");
  return "^" + protocol + host + "(" + pathname + ")?$";
}
function patternToRegex(...matchPatterns) {
  if (matchPatterns.length === 0) {
    return /$./;
  }
  if (matchPatterns.includes("<all_urls>")) {
    return allUrlsRegex;
  }
  if (matchPatterns.includes("*://*/*")) {
    return allStarsRegex;
  }
  return new RegExp(matchPatterns.map((x) => getRawPatternRegex(x)).join("|"));
}

// src/user-scripts/style.ts
var style = `:root{--zidx-serach: 100;--zidx-tabs: 10;--zidx-tools-card: 10;--zidx-reply-box: 99;--zidx-model-header: 50;--zidx-model-mask: 888;--zidx-toast: 999;--zidx-tip: 10;--zidx-popup: 99;--zidx-expand-mask: 10;--zidx-expand-btn: 20;--v2p-underline-offset: 0.5ex;--v2p-layout-gap: 25px}:root body{--v2p-color-main-50: #f7f9fb;--v2p-color-main-100: #f1f5f9;--v2p-color-main-200: #e2e8f0;--v2p-color-main-300: #cbd5e1;--v2p-color-main-350: #94a3b8cc;--v2p-color-main-400: #94a3b8;--v2p-color-main-500: #64748b;--v2p-color-main-600: #475569;--v2p-color-main-700: #334155;--v2p-color-main-800: #1e293b;--v2p-color-accent-50: #ecfdf5;--v2p-color-accent-100: #d1fae5;--v2p-color-accent-200: #a7f3d0;--v2p-color-accent-300: #6ee7b7;--v2p-color-accent-400: #34d399;--v2p-color-accent-500: #10b981;--v2p-color-accent-600: #059669;--v2p-color-orange-50: #fff7ed;--v2p-color-orange-100: #ffedd5;--v2p-color-orange-400: #fb923c;--v2p-color-background: #f2f3f5;--v2p-color-foreground: var(--v2p-color-main-800);--v2p-color-font-secondary: var(--v2p-color-main-500);--v2p-color-bg-content: #fff;--v2p-color-bg-footer: var(--v2p-color-bg-content);--v2p-color-bg-hover-btn: var(--v2p-color-main-200);--v2p-color-bg-subtle: rgb(236 253 245 / 90%);--v2p-color-bg-input: var(--v2p-color-main-50);--v2p-color-bg-search: var(--v2p-color-main-100);--v2p-color-bg-search-active: var(--v2p-color-main-200);--v2p-color-bg-widget: rgb(255 255 255 / 70%);--v2p-color-bg-reply: var(--v2p-color-main-100);--v2p-color-bg-tooltip: var(--v2p-color-bg-content);--v2p-color-heart: #ef4444;--v2p-color-heart-fill: #fee2e2;--v2p-color-mask: rgb(0 0 0 / 25%);--v2p-color-divider: var(--v2p-color-main-200);--v2p-color-border: var(--v2p-color-main-200);--v2p-color-border-darker: var(--v2p-color-main-300);--v2p-box-shadow: 0 3px 5px 0 rgb(0 0 0 / 4%);--v2p-widget-shadow: 0 9px 24px -3px rgb(0 0 0 / 6%), 0 4px 8px -1px rgb(0 0 0 /12%);--v2p-toast-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);--color-fade: var(--v2p-color-font-secondary);--color-gray: var(--v2p-color-font-secondary);--link-color: var(--v2p-color-foreground);--link-darker-color: var(--v2p-color-main-600);--link-hover-color: var(--v2p-color-foreground);--link-caution-color: var(--v2p-color-orange-400);--box-border-color: var(--v2p-color-border);--box-foreground-color: var(--v2p-color-foreground);--box-background-color: var(--v2p-color-bg-content);--box-background-alt-color: var(--v2p-color-main-100);--box-background-hover-color: var(--v2p-color-main-200);--box-border-focus-color: var(--v2p-color-main-200);--box-border-radius: 10px;--button-background-color: var(--v2p-color-main-100);--button-background-hover-color: var(--v2p-color-main-200);--button-hover-color: var(--button-background-hover-color);--button-foreground-color: var(--v2p-color-main-500);--button-foreground-hover-color: var(--v2p-color-main-600);--button-border-color: var(--v2p-color-main-300);--button-border-hover-color: var(--v2p-color-main-400);color:var(--v2p-color-foreground);font-family:system-ui,sans-serif;background-color:var(--v2p-color-background)}:root body #Logo{background-image:url("https://www.v2ex.com/static/img/v2ex@2x.png")}:root body ::selection{color:var(--v2p-color-main-100);background-color:var(--v2p-color-main-700)}:root body img::selection{background-color:var(--v2p-color-main-500)}:root body.v2p-theme-dark,:root[data-darkreader-scheme=dark] body{--v2p-color-main-100: #2d333b;--v2p-color-main-200: #374151;--v2p-color-main-300: #374151;--v2p-color-main-350: #6b7280cc;--v2p-color-main-400: #6b7280;--v2p-color-main-500: #9ca3af;--v2p-color-main-600: #9ca3af;--v2p-color-main-700: #d1d5db;--v2p-color-main-800: #e5e7eb;--v2p-color-main-900: #111827;--v2p-color-main-950: #030712;--v2p-color-accent-50: #064e3b;--v2p-color-accent-100: #065f46;--v2p-color-accent-200: #047857;--v2p-color-accent-300: #059669;--v2p-color-accent-400: #10b981;--v2p-color-accent-500: #34d399;--v2p-color-accent-600: #6ee7b7;--v2p-color-orange-50: #593600;--v2p-color-orange-100: #9a3412;--v2p-color-orange-400: #fbe090;--v2p-color-background: #1c2128;--v2p-color-foreground: #adbac7;--v2p-color-font-secondary: var(--v2p-color-main-600);--v2p-color-bg-content: #22272e;--v2p-color-bg-subtle: rgb(6 78 59 / 30%);--v2p-color-bg-input: var(--v2p-color-background);--v2p-color-bg-search: var(--v2p-color-main-100);--v2p-color-bg-search-active: var(--v2p-color-main-200);--v2p-color-bg-widget: var(--v2p-color-bg-content);--v2p-color-bg-reply: var(--v2p-color-main-100);--v2p-color-bg-tooltip: var(--v2p-color-main-100);--v2p-color-heart: #ef4444;--v2p-color-heart-fill: #fca5a5;--v2p-color-mask: rgb(99 110 123 / 40%);--v2p-color-border: #444c56;--v2p-color-border-darker: #444c56;--v2p-box-shadow: 0 0 0 1px var(--v2p-color-border);--v2p-toast-shadow: none;--link-color: var(--v2p-color-foreground);--box-background-color: var(--v2p-color-bg-content);--box-background-alt-color: var(--v2p-color-main-100);--box-background-hover-color: var(--v2p-color-main-300);--button-background-color: #373e47;--button-background-hover-color: #444c56;--button-hover-color: var(--button-background-hover-color);--button-foreground-color: var(--v2p-color-foreground);--button-foreground-hover-color: var(--v2p-color-foreground);--button-border-color: var(--v2p-color-border);--button-border-hover-color: #768390}:root body.v2p-theme-dark #Logo,:root[data-darkreader-scheme=dark] body #Logo{background-image:url("https://www.v2ex.com/static/img/v2ex-alt@2x.png")}:root body.v2p-theme-dark ::selection,:root[data-darkreader-scheme=dark] body ::selection{color:var(--v2p-color-background);background-color:var(--v2p-color-foreground)}:root body.v2p-theme-dark img::selection,:root[data-darkreader-scheme=dark] body img::selection{background-color:var(--v2p-color-foreground)}@supports selector(:has(*)){:root body:has(#Wrapper.Night){--v2p-color-main-100: #2d333b;--v2p-color-main-200: #374151;--v2p-color-main-300: #374151;--v2p-color-main-350: #6b7280cc;--v2p-color-main-400: #6b7280;--v2p-color-main-500: #9ca3af;--v2p-color-main-600: #9ca3af;--v2p-color-main-700: #d1d5db;--v2p-color-main-800: #e5e7eb;--v2p-color-main-900: #111827;--v2p-color-main-950: #030712;--v2p-color-accent-50: #064e3b;--v2p-color-accent-100: #065f46;--v2p-color-accent-200: #047857;--v2p-color-accent-300: #059669;--v2p-color-accent-400: #10b981;--v2p-color-accent-500: #34d399;--v2p-color-accent-600: #6ee7b7;--v2p-color-orange-50: #593600;--v2p-color-orange-100: #9a3412;--v2p-color-orange-400: #fbe090;--v2p-color-background: #1c2128;--v2p-color-foreground: #adbac7;--v2p-color-font-secondary: var(--v2p-color-main-600);--v2p-color-bg-content: #22272e;--v2p-color-bg-subtle: rgb(6 78 59 / 30%);--v2p-color-bg-input: var(--v2p-color-background);--v2p-color-bg-search: var(--v2p-color-main-100);--v2p-color-bg-search-active: var(--v2p-color-main-200);--v2p-color-bg-widget: var(--v2p-color-bg-content);--v2p-color-bg-reply: var(--v2p-color-main-100);--v2p-color-bg-tooltip: var(--v2p-color-main-100);--v2p-color-heart: #ef4444;--v2p-color-heart-fill: #fca5a5;--v2p-color-mask: rgb(99 110 123 / 40%);--v2p-color-border: #444c56;--v2p-color-border-darker: #444c56;--v2p-box-shadow: 0 0 0 1px var(--v2p-color-border);--v2p-toast-shadow: none;--link-color: var(--v2p-color-foreground);--box-background-color: var(--v2p-color-bg-content);--box-background-alt-color: var(--v2p-color-main-100);--box-background-hover-color: var(--v2p-color-main-300);--button-background-color: #373e47;--button-background-hover-color: #444c56;--button-hover-color: var(--button-background-hover-color);--button-foreground-color: var(--v2p-color-foreground);--button-foreground-hover-color: var(--v2p-color-foreground);--button-border-color: var(--v2p-color-border);--button-border-hover-color: #768390}:root body:has(#Wrapper.Night) #Logo{background-image:url("https://www.v2ex.com/static/img/v2ex-alt@2x.png")}:root body:has(#Wrapper.Night) ::selection{color:var(--v2p-color-background);background-color:var(--v2p-color-foreground)}:root body:has(#Wrapper.Night) img::selection{background-color:var(--v2p-color-foreground)}}@supports not selector(:has(*)){:root #Wrapper.Night{--v2p-color-main-100: #2d333b;--v2p-color-main-200: #374151;--v2p-color-main-300: #374151;--v2p-color-main-350: #6b7280cc;--v2p-color-main-400: #6b7280;--v2p-color-main-500: #9ca3af;--v2p-color-main-600: #9ca3af;--v2p-color-main-700: #d1d5db;--v2p-color-main-800: #e5e7eb;--v2p-color-main-900: #111827;--v2p-color-main-950: #030712;--v2p-color-accent-50: #064e3b;--v2p-color-accent-100: #065f46;--v2p-color-accent-200: #047857;--v2p-color-accent-300: #059669;--v2p-color-accent-400: #10b981;--v2p-color-accent-500: #34d399;--v2p-color-accent-600: #6ee7b7;--v2p-color-orange-50: #593600;--v2p-color-orange-100: #9a3412;--v2p-color-orange-400: #fbe090;--v2p-color-background: #1c2128;--v2p-color-foreground: #adbac7;--v2p-color-font-secondary: var(--v2p-color-main-600);--v2p-color-bg-content: #22272e;--v2p-color-bg-subtle: rgb(6 78 59 / 30%);--v2p-color-bg-input: var(--v2p-color-background);--v2p-color-bg-search: var(--v2p-color-main-100);--v2p-color-bg-search-active: var(--v2p-color-main-200);--v2p-color-bg-widget: var(--v2p-color-bg-content);--v2p-color-bg-reply: var(--v2p-color-main-100);--v2p-color-bg-tooltip: var(--v2p-color-main-100);--v2p-color-heart: #ef4444;--v2p-color-heart-fill: #fca5a5;--v2p-color-mask: rgb(99 110 123 / 40%);--v2p-color-border: #444c56;--v2p-color-border-darker: #444c56;--v2p-box-shadow: 0 0 0 1px var(--v2p-color-border);--v2p-toast-shadow: none;--link-color: var(--v2p-color-foreground);--box-background-color: var(--v2p-color-bg-content);--box-background-alt-color: var(--v2p-color-main-100);--box-background-hover-color: var(--v2p-color-main-300);--button-background-color: #373e47;--button-background-hover-color: #444c56;--button-hover-color: var(--button-background-hover-color);--button-foreground-color: var(--v2p-color-foreground);--button-foreground-hover-color: var(--v2p-color-foreground);--button-border-color: var(--v2p-color-border);--button-border-hover-color: #768390}:root #Wrapper.Night #Logo{background-image:url("https://www.v2ex.com/static/img/v2ex-alt@2x.png")}:root #Wrapper.Night ::selection{color:var(--v2p-color-background);background-color:var(--v2p-color-foreground)}:root #Wrapper.Night img::selection{background-color:var(--v2p-color-foreground)}}
:root{color-scheme:light}:root:has(#Wrapper.Night){color-scheme:dark}:root:has(#Wrapper.Night) #Top{background-color:rgba(0,0,0,0)}:root:has(#Wrapper.Night) #search-container::before{background-image:url("/static/img/search_icon_light.png")}:root html,:root body{min-height:100vh}body{overflow:overlay;scrollbar-gutter:stable}body h1{font-weight:bold}body a{text-decoration:none;cursor:default}body a[href]{cursor:pointer}body a:hover{text-decoration:underline 1px;text-underline-offset:var(--v2p-underline-offset)}body pre{max-width:calc(830px - 2*var(--v2p-layout-gap) - 24px)}body #Top{height:55px;background-color:var(--v2p-color-bg-content);border:none}body #Bottom{color:var(--v2p-color-font-secondary);background-color:var(--v2p-color-bg-footer);border:none}body #Wrapper{background-color:inherit;background-image:none}body #Wrapper.Night{background-color:inherit;background-image:none}body #Wrapper .content{display:flex;gap:var(--v2p-layout-gap)}body #Leftbar{order:1;float:none}body #Main{flex:1;order:2;max-width:85vw;margin:0}body #Rightbar{order:3;float:none}body #search-container{height:30px;margin:0 30px;background-color:var(--v2p-color-bg-search);border:none;border-radius:6px}body #search-container::before{top:0;left:4px;background-size:14px 14px;opacity:.6;filter:none}body #search-container.active{background-color:var(--v2p-color-bg-search-active)}body #search-container #search-result{top:42px;z-index:var(--zidx-serach);color:var(--v2p-color-main-600);font-size:14px;background:var(--v2p-color-bg-widget);border:1px solid var(--box-border-color);box-shadow:var(--v2p-widget-shadow);backdrop-filter:blur(16px)}body #search-container #search-result .fade{color:var(--v2p-color-main-600)}body #search-container #search-result .search-item{color:var(--v2p-color-foreground);font-weight:bold;border-radius:5px}body #search-container #search-result .search-item.active{color:var(--v2p-color-foreground)}body #search-container #search-result .search-item.active.v2p-no-active{background-color:rgba(0,0,0,0)}body .box{color:var(--box-foreground-color);background-color:var(--v2p-color-bg-content);border:none;border-radius:var(--box-border-radius);box-shadow:var(--v2p-box-shadow)}body .box .header>h1{font-weight:bold;font-size:22px}body .box .header .gray{color:var(--color-gray)}body .button{--button-hover-shadow: 0 1.8px 0 var(--button-border-color), 0 1.8px 0 var(--button-background-color)}body .button.normal,body .button.super{position:relative;display:inline-flex;gap:5px;align-items:center;height:28px;padding:0 12px;color:var(--button-foreground-color);font-weight:500;font-size:14px;font-family:inherit;line-height:28px;white-space:nowrap;text-shadow:none;background:var(--button-background-color);border:none;border-radius:6px;outline:none;box-shadow:0 1.8px 0 var(--box-background-hover-color),0 1.8px 0 var(--button-background-color);cursor:pointer;transition:color .25s,background-color .25s,box-shadow .25s;user-select:none}body .button.normal:is(:hover:enabled,:active:enabled),body .button.super:is(:hover:enabled,:active:enabled){color:var(--button-foreground-hover-color);font-weight:500;text-shadow:none;background:var(--button-hover-color);border:none;box-shadow:var(--button-hover-shadow)}body .button.normal:is(.hover_now,.disable_now),body .button.super:is(.hover_now,.disable_now){color:var(--button-foreground-color) !important;text-shadow:none !important;background:var(--button-background-color) !important;border:none !important;box-shadow:0 1.8px 0 var(--box-background-hover-color) !important,0 1.8px 0 var(--button-background-color) !important}body .button.normal:is(.disable_now,:disabled),body .button.super:is(.disable_now,:disabled){color:var(--button-foreground-color);font-weight:500;text-shadow:none;background:var(--button-background-color);box-shadow:0 1.8px 0 var(--box-background-hover-color),0 1.8px 0 var(--button-background-color);cursor:default;opacity:.8;pointer-events:none}body .button.normal kbd,body .button.super kbd{position:relative;right:-4px;padding:0 3px;font-size:90%;font-family:inherit;line-height:initial;border:1px solid var(--button-border-color);border-radius:4px}body .button.special{--button-hover-shadow: 0 1.8px 0 var(--v2p-color-accent-200), 0 1.8px 0 var(--v2p-color-accent-100);color:var(--v2p-color-accent-500);background:var(--v2p-color-accent-100);box-shadow:var(--button-hover-shadow)}body .button.special:hover,body .button.special:hover:enabled{color:var(--v2p-color-accent-600);background:var(--v2p-color-accent-100);border:none;box-shadow:var(--button-hover-shadow)}body .button a{color:inherit;text-decoration:none}body .badge{padding:2px 5px;font-weight:bold;border:1px solid var(--v2p-color-accent-400);user-select:none}body .badge:first-child{border:1px solid var(--v2p-color-accent-400);border-top-left-radius:4px;border-bottom-left-radius:4px}body .badge:last-child{border:1px solid var(--v2p-color-accent-400);border-top-right-radius:4px;border-bottom-right-radius:4px}body .badge.op{color:var(--v2p-color-accent-500);background-color:var(--v2p-color-accent-50)}body .badge.mod{color:var(--v2p-color-bg-content);background-color:var(--v2p-color-accent-400)}body .badge.you{color:var(--v2p-color-orange-400);background-color:var(--v2p-color-orange-50);border:1px solid var(--v2p-color-orange-400)}body .badge.mini{height:1.2em;padding:0 3px;font-weight:normal;font-size:12px;line-height:1}body a.node:is(:active,:link,:visited){padding:5px 6px;color:var(--v2p-color-font-secondary);font-size:13px;background-color:var(--v2p-color-main-100);border-radius:4px}body a.node:is(:active,:link,:visited):hover{color:var(--v2p-color-main-500);background-color:var(--v2p-color-main-200)}body .outdated{font-size:12px;border-color:var(--v2p-color-main-200);border-bottom:none}body :is(.page_normal,.page_current):is(:link,:visited){padding:6px 9px;font-size:14px;border:none;border-radius:4px;user-select:none}body .page_normal:is(:link,:visited){font-weight:500;background-color:var(--v2p-color-bg-content);box-shadow:0 2px 2px var(--box-background-hover-color);transition:transform .25s}body .page_normal:is(:link,:visited):hover{transform:scale(1.1) translateY(-2px)}body .page_current:is(:link,:visited){font-weight:bold;background-color:var(--box-background-hover-color);box-shadow:none;pointer-events:none}body .page_input{display:none}body .dock_area{background:var(--v2p-color-main-100)}body .member-activity-bar{background-color:var(--v2p-color-main-200)}body .member-activity-bar .member-activity-start{background-color:var(--v2p-color-accent-200)}body .member-activity-bar .member-activity-fourth{background-color:var(--v2p-color-accent-400)}body .member-activity-bar .member-activity-half{background-color:var(--v2p-color-accent-500)}body .member-activity-bar .member-activity-almost{background-color:var(--v2p-color-accent-600)}body .member-activity-bar .member-activity-done{background-color:var(--v2p-color-orange-400)}body .online{padding:6px 8px;color:var(--v2p-color-bg-content);font-size:13px;background:var(--v2p-color-accent-400);border-radius:5px;user-select:none}body #topic_supplement{height:unset;min-height:550px !important;max-height:800px !important;overflow:hidden;color:currentColor;font-size:15px;background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color);border-radius:8px;transition:opacity .25s;resize:none;overflow-y:auto}body #topic_supplement::placeholder{color:var(--v2p-color-main-500);font-size:15px}body #topic_supplement:is(:focus,:focus-within){background-color:rgba(0,0,0,0);outline:none;box-shadow:0 0 0 1px var(--button-border-color)}body .item_hot_topic_title{--offset: 2.4px;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.4;position:relative;padding:var(--offset) 0;text-shadow:none}body .item_hot_topic_title>a:hover{text-underline-offset:var(--offset)}body form textarea#topic_title{height:unset;min-height:75px !important;max-height:800px !important;overflow:hidden;color:currentColor;font-size:15px;background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color);border-radius:8px;transition:opacity .25s;resize:none}body form textarea#topic_title::placeholder{color:var(--v2p-color-main-500);font-size:15px}body form textarea#topic_title:is(:focus,:focus-within){background-color:rgba(0,0,0,0);outline:none;box-shadow:0 0 0 1px var(--button-border-color)}body form #topic_title{height:unset;min-height:30px !important;max-height:800px !important;overflow:hidden;color:currentColor;font-size:15px;background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color);border-radius:8px;transition:opacity .25s;resize:none}body form #topic_title::placeholder{color:var(--v2p-color-main-500);font-size:15px}body form #topic_title:is(:focus,:focus-within){background-color:rgba(0,0,0,0);outline:none;box-shadow:0 0 0 1px var(--button-border-color)}body form #topic_content{height:unset;min-height:120px !important;max-height:800px !important;overflow:hidden;color:currentColor;font-size:15px;background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color);border-radius:8px;transition:opacity .25s;resize:none}body form #topic_content::placeholder{color:var(--v2p-color-main-500);font-size:15px}body form #topic_content:is(:focus,:focus-within){background-color:rgba(0,0,0,0);outline:none;box-shadow:0 0 0 1px var(--button-border-color)}body #syntax-selector .radio-group{padding:3px;background-color:var(--v2p-color-background)}body #syntax-selector .radio-group>input[type=radio]:checked+label{background-color:var(--v2p-color-accent-100)}body #syntax-selector .radio-group>input[type=radio]+label{font-size:13px;cursor:pointer}body #syntax-selector label{color:var(--v2p-color-foreground)}body .snow{color:var(--v2p-color-main-400)}body .orange-dot{background:var(--v2p-color-orange-400)}body form[action^="/notes"] .cell{background-color:rgba(0,0,0,0) !important}body .alt{background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color)}body a.btn_hero{border-color:var(--v2p-color-foreground)}body a.btn_hero:hover{background-color:var(--v2p-color-foreground)}body .cell_ops{background-color:rgba(0,0,0,0)}body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^=http]{text-decoration:underline 1.5px;text-underline-offset:.46ex;color:currentColor;background-color:var(--v2p-color-main-100)}body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^=http]:hover{background-color:var(--v2p-color-main-200)}body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href*="v2ex.com/t"],body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^="/t"],body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^="/go"]{text-decoration:underline 1.5px;text-underline-offset:.46ex;color:var(--v2p-color-accent-500);background-color:var(--v2p-color-accent-50)}body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href*="v2ex.com/t"]:hover,body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^="/t"]:hover,body :is(.topic_content,.reply_content,.v2p-topic-preview-content,.v2p-topic-preview-addons,.v2p-reply-preview) a[href^="/go"]:hover{color:var(--v2p-color-accent-500);background-color:var(--v2p-color-accent-50)}body .CodeMirror .CodeMirror-focused.cm-s-one-dark{background-color:rgba(0,0,0,0)}body .CodeMirror .CodeMirror-gutters{padding-right:5px;background-color:var(--v2p-color-bg-input);border-right:1px solid var(--v2p-color-main-300)}body .CodeMirror .CodeMirror-linenumber{color:var(--v2p-color-main-400)}body .cm-s-one-dark{background-color:var(--v2p-color-bg-input)}body #workspace{overflow:hidden;border:1px solid var(--button-border-color);border-radius:8px}body .select2-container{width:200px !important}body .select2-container .select2-selection{background-color:var(--v2p-color-background);border:1px solid var(--v2p-color-border)}body .select2-container .select2-selection .select2-selection__rendered,body .select2-container .select2-selection .select2-selection__placeholder{color:var(--v2p-color-foreground)}body .select2-container .select2-dropdown{font-size:14px;background:var(--v2p-color-bg-widget);border:1px solid var(--box-border-color);border-radius:8px;box-shadow:var(--v2p-widget-shadow);backdrop-filter:blur(16px);transform:translateY(5px)}body .select2-container .select2-dropdown .select2-search{padding:5px}body .select2-container .select2-dropdown .select2-search .select2-search__field{padding:6px 4px;background-color:rgba(0,0,0,0);border:1px solid var(--v2p-color-main-200);border-radius:4px}body .select2-container .select2-dropdown .select2-search .select2-search__field:focus-visible{border-color:var(--v2p-color-main-400);outline:none}body .select2-container .select2-dropdown .select2-results>.select2-results__options{padding:5px}body .select2-container .select2-dropdown .select2-container--default .select2-results__option--selected{color:currentColor;background-color:var(--v2p-color-accent-100)}body .select2-container .select2-results__option{border-radius:4px}body .select2-container .select2-results__option--highlighted.select2-results__option--selectable{color:currentColor;background-color:var(--v2p-color-main-200)}body .select2-container .select2-results__option--selected{color:currentColor !important;background-color:var(--v2p-color-accent-100) !important}body .problem{color:currentColor;color:var(--v2p-color-orange-400);background-color:var(--v2p-color-orange-50);border-color:var(--v2p-color-orange-400);border-bottom:none}body .markdown_body table{border-top:1px solid var(--v2p-color-border-darker);box-shadow:none}body .markdown_body table tr th,body .markdown_body table tr td{border:1px solid var(--v2p-color-border-darker)}body .markdown_body table tr:nth-child(2n){background-color:var(--box-background-alt-color)}body .social_label:is(:link,:visited,:active){background-color:var(--v2p-color-main-100);box-shadow:none}body .social_label:is(:link,:visited,:active):hover{background-color:var(--v2p-color-main-200)}body .green{color:var(--v2p-color-accent-500)}body .message{color:var(--v2p-color-orange-400);background-color:var(--v2p-color-orange-50);border:none}body .balance_area,body a.balance_area:is(:link,:visited){display:inline-flex;gap:3px;align-items:center;color:var(--v2p-color-foreground);font-weight:600;text-shadow:none;background:var(--v2p-color-main-100)}body .balance_area:hover,body a.balance_area:is(:link,:visited):hover{background:var(--v2p-color-main-200)}body :is(.subtle){background-color:var(--v2p-color-bg-subtle);border-left:3px solid var(--v2p-color-accent-200)}body :is(.subtle) .topic_content{font-size:15px}body .onoffswitch label .frame::before{color:#fff;background-color:var(--v2p-color-accent-400)}body .onoffswitch label .frame::after{color:var(--v2p-color-main-100);background-color:var(--v2p-color-main-400)}body select{color:var(--v2p-color-foreground);background-color:var(--v2p-color-background);border:1px solid var(--v2p-color-border);border-radius:4px;padding:4px 6px}.box .tag:link,.box .tag:visited{color:var(--v2p-color-font-secondary);font-size:12px;background-color:var(--v2p-color-main-100);border-radius:5px}.box .tag::before{color:var(--v2p-color-main-500)}.box .tag>li{opacity:.6}#Top .content{height:100%}#Top .site-nav{height:100%;padding:0}#Top .tools{display:flex;gap:8px 14px;align-items:center;justify-content:flex-end;font-weight:400;font-size:14px}#Top .tools .top{height:26px;margin-left:0;padding:0 6px;color:var(--v2p-color-main-500);line-height:26px;white-space:nowrap;border-radius:4px}#Top .tools .top:hover{color:var(--v2p-color-foreground)}#Top .tools .top:not(.v2p-hover-btn):hover{background-color:var(--v2p-color-main-100)}#Main>.box{padding:0 12px}#Main>.box.node-header>.cell{margin:0 -12px}#Main>.box .cell{padding:20px 10px;background-image:none !important}#Main>.box .cell_ops{padding:15px 5px}#Main>.box:has(form[action="/write"]) .cell:nth-child(1),#Main>.box:has(form[action="/write"]) .cell:nth-child(2){border:none}#Main>.box:has(form[action="/write"]) .cell:has(#syntax-selector){padding:8px 0 !important}#Main>.box:has(form[action="/write"]) .cell:has(#syntax-selector) .tab-alt-container{gap:0 8px}#Main>.box:has(form[action="/write"]) .cell:has(#syntax-selector) .tab-alt{padding:4px 2px;border-bottom-width:2px;transition:none}#Main>.box:has(form[action="/write"]) .cell:has(#syntax-selector) .tab-alt:not(.active):hover{border-color:rgba(0,0,0,0)}#Main .topic_buttons{display:flex;flex-wrap:wrap;align-items:center;padding:8px 0;column-gap:5px;background:none}#Main .topic_buttons .topic_stats{flex:1;order:99;float:none;margin-left:10px;padding:0 !important;font-size:12px;text-shadow:none}#Main .topic_buttons .topic_thanked{font-size:12px}#Main .topic_buttons a.tb:link{display:flex;flex-direction:row-reverse;align-items:center;padding:5px;white-space:nowrap;text-shadow:none;column-gap:5px;background:none;border-radius:4px}#Main .topic_buttons a.tb:link:not(.v2p-hover-btn){color:var(--v2p-color-font-secondary)}#Main .topic_buttons a.tb:link:hover:not(.v2p-hover-btn){color:currentColor;background:var(--v2p-color-main-100)}#Main .vote:link{color:var(--v2p-color-main-500);border-color:var(--v2p-color-main-300);border-radius:5px}#Main .vote:link:hover{box-shadow:0 2px 2px var(--v2p-color-main-200)}#Main .cell .topic-link{color:var(--v2p-color-foreground);text-decoration:none}#Main .cell .topic-link:visited{color:var(--v2p-color-main-400)}#Main .cell .topic_info{position:relative;display:flex;align-items:center;user-select:none;pointer-events:none}#Main .cell .topic_info::after{position:absolute;inset:0 0 -6px;z-index:1;background-color:var(--v2p-color-bg-content);content:""}#Main .cell .topic_info .votes,#Main .cell .topic_info .node,#Main .cell .topic_info strong:first-of-type,#Main .cell .topic_info span:first-of-type{position:relative;z-index:2;pointer-events:auto}#Main .cell .topic_info a[href^="/member"]{color:var(--v2p-color-main-500);font-weight:500}#Main .cell .count_livid{display:inline-block;padding:5px 10px;font-weight:400;font-size:12px;white-space:nowrap;border-radius:5px;user-select:none;color:var(--v2p-color-main-500);background-color:var(--v2p-color-main-200)}#Main .cell .count_orange{display:inline-block;padding:5px 10px;font-weight:400;font-size:12px;white-space:nowrap;border-radius:5px;user-select:none;color:var(--v2p-color-main-100);font-weight:bold;background-color:var(--v2p-color-orange-400)}#Main .cell .item_title .topic-link{font-weight:bold}#Main .cell.item tr>td:nth-child(2){width:30px}#Main .box>.cell[id^=r]:not(:has(.cell[id^=r])) .reply_content{padding-bottom:0}#Main .cell[id^=r]{--bg-reply: var(--v2p-color-bg-content);background-color:var(--bg-reply)}#Main .cell[id^=r]:not(:has(+.cell[id^=r])){border-bottom:none}#Main .cell[id^=r]:hover>table td:last-of-type .fr a{opacity:1}#Main .cell[id^=r] .ago{color:var(--v2p-color-main-400);font-size:12px;white-space:nowrap}#Main .cell[id^=r] .reply_content{padding-bottom:10px;line-height:1.5}#Main .cell[id^=r]>table:first-of-type td:first-of-type{width:40px}#Main .cell[id^=r]>table:first-of-type td:first-of-type .avatar{width:40px !important;height:40px !important;border-radius:5px;aspect-ratio:1}#Main .cell[id^=r]>table~.cell[id^=r]{--bg-reply: var(--v2p-color-bg-reply);position:relative;z-index:var(--zidx-expand-btn);padding:15px 0 0 15px;border:none;border-radius:0;box-shadow:-2.4px 0 var(--v2p-color-border-darker)}#Main .cell[id^=r]>table~.cell[id^=r] .cell[id^=r]{padding:0;box-shadow:none}#Main .cell[id^=r]>table~.cell[id^=r] .cell[id^=r].v2p-indent{padding-left:15px;border-left:1px solid var(--v2p-color-border-darker)}#Main .cell[id^=r]>table~.cell[id^=r] tr td:first-of-type{width:25px}#Main .cell[id^=r]>table~.cell[id^=r] tr td:first-of-type .avatar{width:25px !important;height:25px !important;border-radius:4px}#Main .cell[id^=r]>table~.cell[id^=r] tr td:nth-child(3) strong a{font-size:13px}#Main .cell[id^=r]>table~.cell[id^=r] .reply_content{padding-right:5px}#Main .cell[id^=r]>table td:nth-of-type(2){width:15px}#Main .cell[id^=r]>table td:last-of-type a.dark{color:var(--v2p-color-main-600);text-decoration:none}#Main .cell[id^=r]>table td:last-of-type a.dark:hover{text-decoration:none}#Main .cell[id^=r]>table td:last-of-type .fr{position:relative;top:-3px;user-select:none}#Main .cell[id^=r]>table td:last-of-type .fr a{opacity:0}#Main .cell[id^=r]>table td:last-of-type .fr+.sep3{height:0}#Main .cell[id^=r]:last-of-type{border:none}#Main .cell[id^=r] .no{position:relative;top:-4px;padding:5px 10px;color:var(--v2p-color-main-350);font-size:12px;background-color:rgba(0,0,0,0);border-radius:5px;user-select:none}#Main #Tabs{position:sticky;top:0;z-index:var(--zidx-tabs);display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;padding:10px;background-color:var(--v2p-color-bg-content);border-bottom:1px solid var(--box-border-color);user-select:none}#Main #Tabs .tab{margin:0}#Main #SecondaryTabs{padding:10px;background-color:var(--v2p-color-main-100);border-radius:5px}#Main .topic_content,#Main .reply_content{font-size:15px;line-height:1.6;color:currentColor}#Main .topic_content a[href^="/member"],#Main .reply_content a[href^="/member"]{position:relative;bottom:1px;color:var(--v2p-color-main-500);font-size:13px;text-decoration:underline;text-underline-offset:.4ex}#Main .thank_area{font-size:12px}#Main .tab{color:var(--v2p-color-foreground);background-color:rgba(0,0,0,0);user-select:none}#Main .tab:not(.v2p-hover-btn):hover{background-color:var(--v2p-color-main-100)}#Main .tab_current{color:var(--box-background-color);background-color:var(--box-foreground-color);user-select:none}#Main #reply-box.reply-box-sticky{bottom:20px;z-index:var(--zidx-reply-box);margin:0 -10px;padding:0 22px;overflow:visible;border:none;border-radius:var(--box-border-radius);outline:2px solid var(--v2p-color-main-200)}#Main #reply-box .v2p-reply-wrap #reply_content{background-color:rgba(0,0,0,0);border:none}#Main #reply-box .v2p-reply-wrap #reply_content:focus{background-color:var(--v2p-color-bg-content);outline:none}#Main #reply-box .v2p-reply-wrap #reply_content::placeholder{color:var(--v2p-color-main-500);font-size:14px}#Main #reply-box .flex-one-row:last-of-type{flex-direction:row-reverse;gap:10px;justify-content:flex-start}#Main #reply-box .flex-one-row:last-of-type .gray{margin-right:auto}#Main #reply-box>.cell{font-size:12px}#Main #reply-box>.cell.flex-one-row{min-height:45px;padding:0 10px;border:none}#Main #reply-box>.cell.flex-row-end{padding:12px 10px;border:none}#Main #reply-box>.cell:has(form){padding-top:0}#Main #no-comments-yet{color:var(--color-gray);border-color:var(--color-gray)}#Main #notifications .cell[id^=n]:hover .node{opacity:1}#Main #notifications .cell[id^=n] .node{opacity:0}#Main #notifications .cell[id^=n] .payload{color:var(--v2p-color-foreground);background-color:var(--v2p-color-main-100)}#Main #notifications .cell[id^=n] .topic-link:visited{color:var(--v2p-color-main-400)}#Main .cell_tabs .cell_tab_current{font-weight:bold;border-color:var(--v2p-color-foreground)}#Main .cell_tabs .cell_tab{color:var(--v2p-color-foreground)}#Main .cell_tabs .cell_tab:hover{border-color:var(--v2p-color-main-300)}#Rightbar .cell:has(.light-toggle){font-size:13px}#Rightbar a.dark:is(:link,:active,:visited,:hover){color:var(--v2p-color-main-500)}#Rightbar a.dark:is(:link,:active,:visited,:hover):hover{color:var(--v2p-color-main-600)}#Bottom{position:sticky;top:100%}#Bottom a.dark{font-weight:400;font-size:13px}#Bottom a.dark:is(:link,:active,:visited,:hover){color:var(--v2p-color-main-500)}
\uFEFFbody{position:relative}body.v2p-modal-open{overflow:hidden}body .button.v2p-prev-btn,body .button.v2p-next-btn{padding:0 15px}.v2p-hover-btn{position:relative;z-index:1;margin:0;white-space:nowrap;text-decoration:none;background:none;background-color:rgba(0,0,0,0);cursor:pointer;transition:color .2s;user-select:none}.v2p-hover-btn::before{position:absolute;inset:0 -5px;z-index:-1;background-color:var(--v2p-color-bg-hover-btn);border-radius:5px;transform:scale(0.65);opacity:0;transition:background-color .2s,color .2s,transform .2s,opacity .2s;content:""}.v2p-hover-btn:hover{text-decoration:none}.v2p-hover-btn:hover::before{transform:scale(1);opacity:1}.v2p-hover-btn-disabled{opacity:.8;pointer-events:none}.v2p-icon-heart{display:inline-flex;width:16px;height:16px;color:var(--v2p-color-heart)}.v2p-icon-heart svg{fill:var(--v2p-color-heart-fill)}#Main .cell[id^=r] .v2p-auto-hide{display:inline-flex;width:0;overflow:hidden}#Main #reply-box .v2p-reply-preview{font-size:15px;line-height:1.6}#Main .cell:hover .v2p-topic-preview-btn,#Rightbar .cell:hover .v2p-topic-preview-btn{visibility:visible}#Rightbar .v2p-info-row{display:block;color:var(--v2p-color-accent-500);font-size:12px;text-align:center}#Rightbar .v2p-info-row:hover{text-decoration:none;background-color:var(--v2p-color-accent-50)}#Rightbar .v2p-topic-preview-btn{position:absolute;right:0;bottom:0;height:20px;font-size:12px;box-shadow:0 0 0 3px var(--v2p-color-bg-content)}.v2p-tool-box{position:sticky;top:20px;z-index:var(--zidx-tools-card)}.v2p-tool-box .v2p-tools{display:grid;grid-auto-rows:auto;grid-template-columns:repeat(3, 1fr);gap:8px 15px;align-items:center;justify-content:center;color:var(--v2p-color-main-600);font-size:12px}.v2p-tool{display:inline-flex;gap:0 5px;align-items:center;padding:3px 0}.v2p-tool .v2p-tool-icon{width:16px;height:16px}.v2p-topic-preview-btn{position:relative;top:-1px;margin-left:10px;color:var(--button-foreground-color);font-size:14px;background-color:var(--button-hover-color);border:none;border-radius:3px;outline:none;visibility:hidden;cursor:pointer}.v2p-topic-preview{font-size:15px;line-height:1.6;padding:25px}.v2p-tp-info-bar{display:flex;gap:10px;align-items:center;margin-bottom:10px}.v2p-tp-info,.v2p-tp-read{display:inline-flex;gap:20px;align-items:center;padding:5px 10px;overflow:hidden;font-size:13px;background-color:var(--v2p-color-main-200);border-radius:5px}.v2p-tp-read{gap:4px;cursor:pointer;user-select:none}.v2p-tp-read-icon{width:16px;height:16px}.v2p-tp-member{display:inline-flex;gap:5px;align-items:center;font-weight:bold}.v2p-tp-avatar{width:20px;height:20px;border-radius:3px}.v2p-topic-preview-addons{margin-top:30px}a.v2p-topic-preview-title-link:hover{text-decoration:underline 1.5px;text-underline-offset:.46ex}.v2p-dot{margin:0 8px;font-weight:800;font-size:15px}.v2p-paging{background:none !important}.v2p-paging.cell{border-bottom:none}.v2p-model-mask{position:fixed;z-index:var(--zidx-model-mask);padding:60px;overflow:hidden;overflow-y:auto;background-color:var(--v2p-color-mask);inset:0}.v2p-popup{position:absolute;top:0;left:0;z-index:var(--zidx-popup);font-size:14px;background:var(--v2p-color-bg-widget);border:1px solid var(--box-border-color);border-radius:8px;box-shadow:var(--v2p-widget-shadow);backdrop-filter:blur(16px)}.v2p-popup-content{width:max-content;overflow-y:auto}.v2p-toast{position:fixed;top:50px;left:50%;z-index:var(--zidx-toast);padding:10px 15px;color:var(--v2p-color-background);font-size:14px;background:var(--v2p-color-foreground);border-radius:8px;box-shadow:var(--v2p-toast-shadow);transform:translateX(-50%)}.v2p-model-main{position:relative;box-sizing:border-box;width:800px;height:100%;margin:0 auto;overflow-x:hidden;overflow-y:auto;background-color:var(--v2p-color-bg-content);border-radius:var(--box-border-radius)}.v2p-model-header{position:sticky;top:0;right:0;left:0;z-index:var(--zidx-model-header);display:flex;gap:0 20px;align-items:center;padding:15px 20px 20px;background-color:var(--v2p-color-bg-content);border-bottom:1px solid var(--box-border-color)}.v2p-model-title{padding:2px 0;overflow:hidden;font-weight:bold;font-size:16px;white-space:nowrap;text-overflow:ellipsis}.v2p-model-actions{display:flex;gap:0 10px;align-items:center;margin-left:auto}.v2p-model-loading{display:flex;align-items:center;justify-content:center;padding:50px 0;color:currentColor}.v2p-model-loading .v2p-icon-loading{position:relative;right:-13px;width:50px}.v2p-no-pat{padding:30px 10px;font-size:15px;text-align:center}.v2p-no-pat .v2p-no-pat-title{font-weight:bold;font-size:16px}.v2p-no-pat .v2p-no-pat-desc{display:flex;align-items:center;justify-content:center;margin-top:15px}.v2p-no-pat .v2p-no-pat-block{display:inline-flex;align-items:center;margin:0 5px;padding:2px 10px;background-color:var(--v2p-color-main-100);border-radius:2px}.v2p-no-pat .v2p-no-pat-steps{display:flex;flex-wrap:wrap;gap:20px;max-width:800px;margin-top:20px;padding:20px;background-color:var(--v2p-color-main-100);border-radius:10px}.v2p-no-pat .v2p-no-pat-step{flex:1}.v2p-no-pat .v2p-no-pat-img{width:100%;border-radius:8px;box-shadow:var(--v2p-widget-shadow)}.v2p-no-pat .v2p-icon-logo{width:15px;height:15px}.v2p-likes-box{position:relative;top:3px;display:inline-flex;align-items:center;column-gap:5px;user-select:none}.v2p-likes-box.v2p-thanked{color:var(--v2p-color-heart);font-weight:bold;opacity:.8}.v2p-likes-box.v2p-thanked .v2p-icon-heart svg{fill:var(--v2p-color-heart)}@supports not selector(:has(*)){#Main .cell[id^=r]>table:hover .v2p-controls{opacity:1}}@supports selector(:has(*)){#Main .cell[id^=r]:not(:has(.cell:hover))>table:hover .v2p-auto-hide{width:auto}#Main .cell[id^=r]:not(:has(.cell:hover))>table:hover .v2p-controls{opacity:1}}.v2p-controls{display:inline-flex;align-items:center;margin-right:15px;font-size:12px;column-gap:15px;opacity:0}.v2p-controls>a{text-decoration:none}.v2p-control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:4px 0;color:var(--v2p-color-main-500)}.v2p-control:hover{color:var(--v2p-color-main-600)}.v2p-control.v2p-thanked{color:var(--v2p-color-heart);cursor:default}.v2p-control::after{z-index:var(--zidx-tip);width:max-content;min-width:30px;padding:2px 5px;overflow:hidden;color:var(--v2p-color-foreground);font-size:12px;white-space:nowrap;text-align:center;background-color:var(--v2p-color-bg-tooltip);border-radius:4px;box-shadow:var(--v2p-widget-shadow);pointer-events:none;position:absolute;top:-8px;transform:translateY(-100%);opacity:0}.v2p-control:hover::after{opacity:1}.v2p-control.v2p-control-hide::after{content:"\u9690\u85CF\u56DE\u590D"}.v2p-control.v2p-control-thank::after{content:"\u611F\u8C22\u56DE\u590D"}.v2p-control.v2p-control-thank.v2p-thanked::after{content:"\u5DF2\u611F\u8C22"}.v2p-control.v2p-control-reply::after{content:"\u56DE\u590D"}.topic_buttons .v2p-tb.v2p-hover-btn{color:var(--v2p-color-font-secondary)}.topic_buttons .v2p-tb.v2p-hover-btn:hover{color:currentColor}.topic_buttons .v2p-tb.v2p-hover-btn::after{display:none}.v2p-tb-icon{width:15px;height:15px}.v2p-emoji-container{max-height:285px;padding:15px 18px;overflow-y:auto;color:var(--v2p-color-main-600)}.v2p-member-card{max-width:300px;max-height:285px;padding:12px;font-size:13px;text-align:left}.v2p-member-card .v2p-info{display:flex;gap:15px}.v2p-member-card .v2p-info-right{padding:2px 0}.v2p-member-card .v2p-avatar-box{display:inline-block;width:73px;height:73px;overflow:hidden;background-color:var(--button-background-hover-color);border-radius:5px}.v2p-member-card .v2p-avatar{width:100%;height:100%}.v2p-member-card .v2p-username{font-weight:bold;font-size:16px}.v2p-member-card .v2p-no{margin:5px 0}.v2p-member-card .v2p-no,.v2p-member-card .v2p-created-date{width:160px;height:16px}.v2p-member-card .v2p-loading{background-color:var(--button-background-hover-color);border-radius:4px}.v2p-member-card .v2p-bio{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-height:1.4;margin-top:10px}.v2p-member-card-actions{padding:10px 0 0}.v2p-reply-tags{display:inline-flex;margin:0 0 2px;padding:0 3px;font-size:12px;background-color:var(--v2p-color-main-200);border-radius:3px;cursor:pointer}.v2p-reply-tags-inline{max-width:300px;margin:0 5px 0 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.v2p-emoticons-box{font-size:15px}.v2p-emoji-group~.v2p-emoji-group{margin-top:10px}.v2p-emoji-title{margin:0 0 10px;font-size:14px;text-align:left}.v2p-emoji-list{display:grid;grid-template-columns:repeat(8, 1fr);gap:5px;font-size:20px}.v2p-emoji{height:20px;padding:3px;line-height:20px;border-radius:4px;cursor:pointer}.v2p-emoji:hover{background-color:var(--box-background-hover-color)}.v2p-decode{position:relative;padding:2px 4px;color:var(--v2p-color-orange-400);font-size:13px;text-decoration:none;background-color:var(--v2p-color-orange-50);cursor:copy}.v2p-decode:hover{color:var(--v2p-color-orange-400)}.v2p-decode:hover::after{opacity:1}.v2p-decode::after{z-index:var(--zidx-tip);width:max-content;min-width:30px;padding:2px 5px;overflow:hidden;color:var(--v2p-color-foreground);font-size:12px;white-space:nowrap;text-align:center;background-color:var(--v2p-color-bg-tooltip);border-radius:4px;box-shadow:var(--v2p-widget-shadow);pointer-events:none;position:absolute;top:-8px;left:50%;transform:translate(-50%, -100%);opacity:0;content:attr(data-title)}.v2p-reply-content{position:relative}.v2p-reply-content .v2p-expand-btn.normal.button{position:absolute;bottom:5px;left:50%;z-index:var(--zidx-expand-btn);font-weight:400;font-size:12px;transform:translateX(-50%)}.v2p-reply-content.v2p-collapsed::before{position:absolute;right:0;bottom:0;left:0;z-index:var(--zidx-expand-mask);height:130px;background:linear-gradient(to top, var(--bg-reply) 10px, transparent);content:"";pointer-events:none}.v2p-reply-content.v2p-collapsed .v2p-expand-btn.normal.button{bottom:10px;transform:translateX(-50%)}.cell[id^=r] .cell[id^=r] .v2p-reply-content .v2p-expand-btn.normal.button{color:var(--button-foreground-color);background:var(--button-hover-color);box-shadow:var(--button-hover-shadow)}.v2p-empty-content{display:flex;flex-direction:column;align-items:center;padding-top:20px;color:var(--v2p-color-font-secondary);font-size:14px}.v2p-empty-content .v2p-text-emoji{font-size:20px}.v2p-topic-reply-ref{margin:0 -10px 15px;padding:5px 10px;color:var(--v2p-color-main-500);font-size:13px;background-color:var(--v2p-color-main-100);border-radius:5px}.v2p-topic-reply-box{margin-top:50px;padding:30px 0;color:var(--v2p-color-main-500);font-size:14px;line-height:1.55;border-top:1px solid var(--v2p-color-divider)}.v2p-topic-reply~.v2p-topic-reply{margin-top:15px}.v2p-topic-reply-member{display:inline;color:var(--v2p-color-main-700);font-weight:bold}.v2p-topic-reply-avatar{position:relative;top:2px;width:15px;height:15px;margin-right:5px;object-fit:cover;overflow:hidden;background-color:var(--v2p-color-main-200);border-radius:2px}.v2p-topic-reply-content{display:inline}.v2p-more-reply-tip{margin-top:20px;color:var(--v2p-color-main-400);font-size:13px;text-align:center}.v2p-reply-wrap{height:unset;min-height:140px !important;max-height:800px !important;overflow:hidden;color:currentColor;font-size:15px;background-color:var(--v2p-color-bg-input);border:1px solid var(--button-border-color);border-radius:8px;transition:opacity .25s;resize:none}.v2p-reply-wrap::placeholder{color:var(--v2p-color-main-500);font-size:15px}.v2p-reply-wrap:is(:focus,:focus-within){background-color:rgba(0,0,0,0);outline:none;box-shadow:0 0 0 1px var(--button-border-color)}.v2p-reply-upload-bar{padding:6px 10px;color:var(--v2p-color-main-500);font-size:12px;background-color:var(--v2p-color-bg-input);border-top:1px dashed var(--v2p-color-main-300);cursor:pointer}.v2p-reply-upload-bar-disabled{pointer-events:none}.v2p-footer{position:relative;display:flex;align-items:center;justify-content:space-between;padding:35px 10px;color:var(--v2p-color-main-500);font-size:12px;border-top:1px solid var(--v2p-color-divider)}.v2p-footer a:hover{text-decoration:none}.v2p-footer-logo{--logo-size: 16px;position:absolute;top:calc(-1*(var(--logo-size) + 5px)/2);left:50%;display:inline-flex;box-sizing:border-box;padding:3px 25px;background-color:var(--v2p-color-bg-footer);transform:translateX(-50%)}.v2p-footer-logo svg{width:var(--logo-size)}.v2p-footer-text{display:inline-flex;align-items:center;justify-content:flex-start;width:240px;color:var(--v2p-color-font-secondary)}.v2p-footer-links{display:inline-flex;gap:0 8px;align-items:center}.v2p-footer-link{padding:4px 5px;color:currentColor}.v2p-footer-brand{display:inline-flex;gap:0 15px;align-items:center;justify-content:flex-end;width:240px}.v2p-footer-brand>span{width:20px}.v2p-color-mode-toggle{width:22px;height:22px;opacity:.8}.v2p-color-mode-toggle:hover{opacity:1}.v2p-reply-tabs{display:flex;gap:0 6px;align-items:center;font-size:14px}.v2p-reply-tabs .v2p-reply-tab{padding:2px 3px;cursor:pointer}.v2p-reply-tabs .v2p-reply-tab.active{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px;text-decoration-color:var(--v2p-color-main-500)}.v2p-reply-tool-content{padding:5px;font-size:12px;border-radius:5px}.v2p-reply-tool{padding:5px 10px;white-space:nowrap;border-radius:4px;cursor:pointer}.v2p-reply-tool:hover{background-color:var(--v2p-color-main-200)}.v2p-preview-retry{text-decoration:underline 1px;text-underline-offset:var(--v2p-underline-offset);cursor:pointer}.v2p-member-ref{display:none}.v2p-member-ref.v2p-member-ref-show{display:inline}
`;

// src/user-scripts/index.ts
if (typeof window.GM_addStyle !== "undefined") {
  window.GM_addStyle(style);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    $(`<style type='text/css'>${style}</style>`).appendTo("head");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const commonRegex = patternToRegex(
    "https://v2ex.com/*",
    "https://www.v2ex.com/*",
    "https://cn.v2ex.com/*"
  );
  const topicRegex = patternToRegex(
    "https://v2ex.com/t/*",
    "https://www.v2ex.com/t/*",
    "https://cn.v2ex.com/t/*"
  );
  const writeRegex = patternToRegex(
    "https://v2ex.com/write*",
    "https://www.v2ex.com/write*",
    "https://cn.v2ex.com/write*"
  );
  const url = window.location.href;
  void (async () => {
    if (commonRegex.test(url)) {
      await Promise.resolve().then(() => (init_common(), common_exports));
      await Promise.resolve().then(() => (init_home(), home_exports));
    }
    if (topicRegex.test(url)) {
      await Promise.resolve().then(() => (init_topic(), topic_exports));
    }
    if (writeRegex.test(url)) {
      await Promise.resolve().then(() => (init_write2(), write_exports));
    }
  })();
});
