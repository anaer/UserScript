// ==UserScript==
// @name         文本替换
// @description
// @author       anaer
// @namespace    https://github.com/anaer/UserScript
// @version      1.0.0
// @match        *://**/*
// ==/UserScript==
'use strict'

// 定义要查询和替换的文本
const replacements = {
  '反炸郭安': '反诈国安',
  '大便菊': '大变局'
};


// 遍历所有文本节点进行替换
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  null,
  false
);

let node;
while ((node = walker.nextNode())) {
  for (const search in replacements) {
    const replace = replacements[search];
    const regex = new RegExp(search, 'g');
    const oldValue = node.nodeValue
    node.nodeValue = node.nodeValue.replace(regex, replace);
    if(node.nodeValue != oldValue){
      node.parentNode.setAttribute('title', oldValue); // 修改节点的title属性为源文本

      const iconElement = document.createElement('span');
      iconElement.innerHTML = '&#x2714;';
      iconElement.className = 'replace-icon';
      iconElement.style.color = 'red';
      node.parentNode.appendChild(iconElement);
    }
  }
}