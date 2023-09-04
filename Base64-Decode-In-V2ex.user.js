// ==UserScript==
// @name         V2EX base64自动解码
// @namespace    https://github.com/anaer/UserScript
// @version      1.3
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

// 解码 处理中文乱码
function getDecode(str){
  return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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
                  // var decodedData = atob(base64Data);
                  var decodedData = getDecode(base64Data);

                  console.log('Decoded Base64 content:', decodedData);

                  var br = document.createElement('br');
                  // 处理链接, 添加a标签
                  if(decodedData.startsWith('http')) {
                    var a = document.createElement('a');
                    a.textContent = decodedData
                    a.href = decodedData
                    // 添加样式
                    a.style.color = '#0052cc';
                    a.style.fontSize = '16px';
                    content.appendChild(a).appendChild(br)
                  }else{
                    var span = document.createElement('span');
                    span.textContent = decodedData
                    // 添加样式
                    span.style.color = '#0052cc';
                    span.style.fontSize = '16px';
                    content.appendChild(span).appendChild(br)
                  }
                }
              }catch(err){}
          }
      }

  });

})();
