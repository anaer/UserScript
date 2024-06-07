// ==UserScript==
// @name                V2EX Tab栏添加节点
// @namespace           https://github.com/anaer/UserScript
// @version             2024.6.7.2107
// @description         V2EX Tab栏添加节点
// @author              anaer
// @match               https://*.v2ex.com/*
// @match               https://v2ex.com/*
// @icon                https://www.v2ex.com/favicon.ico
// @run-at              document-end
// @grant               none
// @license             LGPLv3
// ==/UserScript==

(function () {
  "use strict";

  function addNode(tabs, name, url, className) {
    var node = document.querySelector("."+className);
    if(node == null){
        var tempNode = document.createElement("a");
        tempNode.href = url;
        tempNode.innerHTML = name;
        tempNode.className = "tab v2p-hover-btn ${className}";
        tabs.appendChild(tempNode);
    }
  }

  function addFlamewarNode() {
    var tabs = document.querySelector("#Tabs");
    if (tabs != null) {
      addNode(tabs, '水深火热', 'https://www.v2ex.com/go/flamewar', 'flamewar');
      addNode(tabs, '账户余额', 'https://v2ex.com/balance', 'balance');
    }
  }

  var main = document.querySelector("#Main");
  if (main != null) {
    var observer = new MutationObserver(function (mutations, observer) {
      addFlamewarNode();
    });
    observer.observe(main, {
      childList: true,
    });
    addFlamewarNode();
  }
})();
