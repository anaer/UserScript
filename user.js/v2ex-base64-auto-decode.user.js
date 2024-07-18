// ==UserScript==
// @version      2024.07.18.1518
// @name         V2EX base64自动解码
// @description  Decode Base64 encoded content on web pages
// @match        https://*.v2ex.com/t/*
// @match        https://v2ex.com/t/*
// @match        https://linux.do/t/topic/*
// @grant        none
// @author       anaer
// @icon         https://www.v2ex.com/favicon.ico
// @namespace    https://github.com/anaer/UserScript
// ==/UserScript==

(function() {
  'use strict';

    // 正则表达式匹配 Base64 编码的内容, 限制长度为8以上
  var base64Regex = /(?<!@)\b([A-Za-z0-9+/=]{8,})\b/g;

  // 获取页面上所有的回复内容
  if (document.URL.includes('linux.do')) {
    var replyContents = document.querySelectorAll('div.cooked');
  }else{
    var replyContents = document.querySelectorAll('div.reply_content, div.topic_content');
  }

  function isBase64(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return false;
    }
  
    // 检查是否只包含有效的Base64字符（包括填充符）
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(str)) {
      return false;
    }

    // 补充等号使长度成为4的倍数
    while (str.length % 4 !== 0) {
      str += '=';
    }
  
    try {
      // 检查编码和解码的一致性
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

                  console.log('Decoded Base64 content:', base64Data, " => ",  decodedData);

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
