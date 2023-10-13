// ==UserScript==
// @name        网页自动翻译
// @namespace    https://github.com/anaer/UserScript
// @match       https://news.ycombinator.com/*
// @grant       none
// @version     1.0.1
// @author      anaer
// @description 2023/10/12 13:17:02
// ==/UserScript==

(function () {
    'use strict';

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://res.zvo.cn/translate/translate.js';
    script.onload = script.onreadystatechange = function () {
        translate.storage.set('to', 'chinese_simplified');
        //设置使用v2.x 版本
        translate.setUseVersion2();

        //SELECT 修改 onchange 事件
        translate.selectLanguageTag.selectOnChange = function (event) {
            var language = event.target.value;
            translate.changeLanguage(language);
        }

        translate.listener.start();	//开启html页面变化的监控，对变化部分会进行自动翻译。注意，这里变化区域，是指使用 translate.setDocuments(...) 设置的区域。如果未设置，那么为监控整个网页的变化
        translate.execute();
        document.getElementById('translate').style.position = 'fixed';
        document.getElementById('translate').style.left = '10px';
        document.getElementById('translate').style.bottom = '10px';
        document.getElementById('translate').style.zIndex = '9999999999999';


        setInterval(function () {
            try {
                if (document.getElementById('translateSelectLanguage') == null) {
                    return;
                }
                document.getElementById('translateSelectLanguage').style.fontSize = '2rem';
                document.getElementById('translateSelectLanguage').style.width = '150px';
            } catch (e) {
                //select数据是通过接口返回的
            }
        }, 1000);

    }
    head.appendChild(script);


})();