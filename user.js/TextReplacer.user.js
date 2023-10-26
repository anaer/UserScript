// ==UserScript==
// @name         文本替换
// @description
// @author       anaer
// @namespace    https://github.com/anaer/UserScript
// @version      1.0.6
// @match        https://www.v2ex.com/*
// ==/UserScript==
'use strict'

// 定义要查询和替换的文本
const replacements = {
  '雀食': '确实',
  '反炸郭安': '反诈国安',
  '大便菊': '大变局',
  '郭嘉': '国家',
  '尊嘟假嘟': '真的假的',
  'fa 歪之地': '法外之地',
  '不李姐': '不理解',
  '谠和正府': '党和政府',
  'i 人': '社恐',
  'e 人': '社牛',
  '肛需': '刚需',
  '并夕夕': '拼多多',
  '拼夕夕': '拼多多',
  'PDD': '拼多多',
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

    const elements = node.parentNode.querySelectorAll('span.replace-icon'); // 对于同一段文本 存在多个替换词时, 只展示一次替换标识
    if (elements.length === 0 && node.nodeValue != oldValue) {
      node.parentNode.setAttribute('title', oldValue); // 修改节点的title属性为源文本

      const iconElement = document.createElement('span');
      iconElement.innerHTML = '&#x2714;';
      iconElement.className = 'replace-icon';
      iconElement.style.color = 'red';
      // iconElement.setAttribute('title', oldValue); // 红勾上显式原文tip
      node.parentNode.appendChild(iconElement);
    }
  }
}
