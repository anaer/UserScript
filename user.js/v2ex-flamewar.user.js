// ==UserScript==
// @name                v2ex Tab栏添加flamewar
// @namespace           https://github.com/anaer/UserScript
// @version             1.0.0
// @description         v2ex Tab栏添加flamewar
// @author              anaer
// @match               https://www.v2ex.com/*
// @run-at              document-end
// @grant               none
// @license             LGPLv3
// ==/UserScript==

(function () {
    'use strict'
    function addFlamewarNode () {
        var flamewarNode = document.querySelector(".flamewar");
        if (flamewarNode == null) {
            var tabs = document.querySelector("#Tabs");
            if (tabs != null) {
                  var tempNode = document.createElement('a');
                  tempNode.href = 'https://www.v2ex.com/go/flamewar'
                  tempNode.innerHTML = '水深火热';
                  tempNode.className = 'tab v2p-hover-btn flamewar ';
                  // console.log(tempNode)
                  tabs.appendChild(tempNode);
            }
        }
    }


    var main = document.querySelector('#Main');
    if (main != null) {
        var observer = new MutationObserver(function (mutations, observer) {
            addFlamewarNode();
        })
        observer.observe(main, {
            childList: true
        })
        addFlamewarNode();
    }

})()