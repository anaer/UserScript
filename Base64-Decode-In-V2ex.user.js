// ==UserScript==
// @name         将页面上的base64编码进行转码
// @namespace    https://github.com/anaer/UserScript
// @version      1.0
// @description  Decode Base64 encoded content on web pages
// @author       anaer
// @match        https://www.v2ex.com/t/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

      // 正则表达式匹配 Base64 编码的内容, 限制长度为10以上
    var base64Regex = /(?<!@)([A-Za-z0-9+/=]{10,})/g;

    // 获取页面上所有的回复内容
    var replyContents = document.querySelectorAll('div.reply_content');

    // 例外如 120G 返回true
    function isBase64(str) {
      try {
        return btoa(atob(str)) === str;
      } catch (error) {
        return false;
      }
    }

    // 遍历每个回复内容
    replyContents.forEach(function(content) {

        var replyContent = content.innerText
        var base64Matches = replyContent.match(base64Regex);
        // 解码并展示 Base64 编码的内容
        if (base64Matches) {
            for (var i = 0; i < base64Matches.length; i++) {
                try{
                  var base64Data = base64Matches[i];
                  if (isBase64(base64Data)) {
                    var decodedData = atob(base64Data);

                    console.log('Decoded Base64 content:', decodedData);

                    var span = document.createElement('a');
                    span.textContent = decodedData
                    span.href = decodedData
                    // 添加样式
                    span.style.color = 'red';
                    span.style.fontSize = '16px';

                    var br = document.createElement('br');

                    content.appendChild(span).appendChild(br)
                  }
                }catch(err){}
            }
        }

    });

})();
