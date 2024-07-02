// ==UserScript==
// @name         文本替换
// @description
// @author       anaer
// @version      2024.07.02.1101
// @match        https://www.v2ex.com/*
// @match        https://v2ex.com/*
// @match        https://www.oschina.net/comment/*
// @namespace    https://github.com/anaer/UserScript
// ==/UserScript==
'use strict'

// 定义要查询和替换的文本
const replacements = {
  '农夫三拳': '农夫山泉',
  '蒸馍(.*?)你不扶器(.*?)': '怎么$1你不服气$2',
  '(?<![A-Za-z0-9-])[Dd][Yy](?![A-Za-z0-9-])': '抖音',
  '(?<![A-Za-z0-9])[Xx][Dd][Mm](?![A-Za-z0-9])': '兄弟们',
  '(?<![A-Za-z0-9])[Ll][Jj](?![A-Za-z0-9])': '垃圾',
  '(?<![A-Za-z0-9])[Ss][Bb](?![A-Za-z0-9])': '傻逼',
  '(?<![A-Za-z0-9])[Pp][Dd][Dd](?![A-Za-z0-9])': '拼多多',
  '(?<![A-Za-z0-9])[Yy][Yy][Ll][Xx](?![A-Za-z0-9])': '遥遥领先',
  '(?<![A-Za-z0-9])[Tt][Ss][Ll](?![A-Za-z0-9])': '特斯拉',
  '依托答辩': '一坨大便',
  '某乎': '知乎',
  '某宝': '淘宝',
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