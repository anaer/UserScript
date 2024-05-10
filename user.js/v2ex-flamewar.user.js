// ==UserScript==
// @name                v2ex Tab栏添加flamewar
// @namespace           https://github.com/anaer/UserScript
// @version             2024.5.10.1335
// @description         v2ex Tab栏添加flamewar
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
  function addFlamewarNode() {
    var tabs = document.querySelector("#Tabs");
    if (tabs != null) {
      var flamewarNode = document.querySelector(".flamewar");
      if (flamewarNode == null) {
        var tempNode = document.createElement("a");
        tempNode.href = "https://www.v2ex.com/go/flamewar";
        tempNode.innerHTML = "水深火热";
        tempNode.className = "tab v2p-hover-btn flamewar ";
        // console.log(tempNode)
        tabs.appendChild(tempNode);
      }

      var balanceNode = document.querySelector(".balance");
      if (balanceNode == null) {
        var tempNode = document.createElement("a");
        tempNode.href = "https://v2ex.com/balance";
        tempNode.innerHTML = "账户余额";
        tempNode.className = "tab v2p-hover-btn balance";
        // console.log(tempNode)
        tabs.appendChild(tempNode);
      }
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
