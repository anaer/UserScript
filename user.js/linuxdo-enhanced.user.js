// ==UserScript==
// @name         linux.do显示创建时间
// @namespace    https://github.com/anaer/UserScript
// @version      24.730.1531
// @description  linux.do显示创建时间
// @author       anaer
// @match        *://*.linux.do/*
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @icon         https://cdn.linux.do/uploads/default/optimized/3X/9/d/9dd49731091ce8656e94433a26a3ef36062b3994_2_32x32.png
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function formattedDate(time) {
    const timestamp = Number(time); // 将字符串转换为数字类型
    const date = new Date(timestamp);

    const ONE_SECOND = 1000;
    const ONE_MINUTE = 60000;
    const ONE_HOUR = 3600000;
    const ONE_DAY = 86400000;
    const ONE_WEEK = 604800000;
    const ONE_MONTH = 2629746000;
    const ONE_YEAR = 31556952000;
    const ONE_SECOND_AGO = "秒前";
    const ONE_MINUTE_AGO = "分钟前";
    const ONE_HOUR_AGO = "小时前";
    const ONE_DAY_AGO = "天前";
    const ONE_MONTH_AGO = "月前";
    const ONE_YEAR_AGO = "年前";
    let delta = new Date().getTime() - date.getTime();
    if (delta < 1 * ONE_MINUTE) {
      let seconds = ~~(delta / ONE_SECOND);
      return (seconds <= 0 ? 1 : seconds) + ONE_SECOND_AGO;
    }
    if (delta < 45 * ONE_MINUTE) {
      let minutes = ~~(delta / ONE_MINUTE);
      return (minutes <= 0 ? 1 : minutes) + ONE_MINUTE_AGO;
    }
    if (delta < 24 * ONE_HOUR) {
      let hours = ~~(delta / ONE_HOUR);
      return (hours <= 0 ? 1 : hours) + ONE_HOUR_AGO;
    }
    if (delta < 48 * ONE_HOUR) {
      return "昨天";
    }
    if (delta < 30 * ONE_DAY) {
      let days = ~~(delta / ONE_DAY);
      return (days <= 0 ? 1 : days) + ONE_DAY_AGO;
    }
    if (delta < 12 * 4 * ONE_WEEK) {
      let months = ~~(delta / ONE_MONTH);
      return (months <= 0 ? 1 : months) + ONE_MONTH_AGO;
    } else {
      let years = ~~(delta / ONE_YEAR);
      return (years <= 0 ? 1 : years) + ONE_YEAR_AGO;
    }
  }

  function convertToTimestamp(dateStr) {
    // 创建一个正则表达式来匹配日期和时间部分
    var datePattern = /(\d{4}) 年 (\d{1,2}) 月 (\d{1,2}) 日 (\d{2}):(\d{2})/;
    var dateMatch = dateStr.match(datePattern);

    if (dateMatch) {
      var year = parseInt(dateMatch[1], 10);
      var month = parseInt(dateMatch[2], 10) - 1; // 月份从0开始
      var day = parseInt(dateMatch[3], 10);
      var hours = parseInt(dateMatch[4], 10);
      var minutes = parseInt(dateMatch[5], 10);

      // 创建 Date 对象
      var date = new Date(year, month, day, hours, minutes);
      return date.getTime(); // 返回时间戳
    } else {
      return null; // 日期格式无效
    }
  }

  function init() {
    $(".topic-list .age").each(function () {
      const str = $(this).attr("title");
      var match = str.match(/创建日期：([\s\S]*?)最新：/);

      if (match && match[1]) {
        var creationDate = match[1].trim();
        var timestamp = convertToTimestamp(creationDate);
      }

      if ($(this).find(".linuxtime").length < 1) {
        $(".post-activity").attr(
          "style",
          "white-space:nowrap;display:inline-block;width:100%;text-align:left;"
        );

        if (timestamp) {
          var now = new Date().getTime();
          var oneDay = 1000 * 60 * 60 * 24;
          var oneWeek = oneDay * 7;
          var oneMonth = oneDay * 30; // 近似值
          var threeMonths = oneMonth * 3;

          var color;
          var timeDiff = now - timestamp;

          if (timeDiff < oneDay) {
            color = "#45B5AA";
          } else if (timeDiff < oneWeek) {
            color = "#66A586";
          } else if (timeDiff < oneMonth) {
            color = "#CFA94A";
          } else if (timeDiff < threeMonths) {
            color = "#3e8ed2";
          } else {
            color = "#cccccc";
          }
          $(this)
            .find(".post-activity")
            .append(
              `<span class="linuxtime" style="color:${color}"> / ${formattedDate(
                timestamp
              )}</span>`
            );
        }
      }
    });
  }

  // 显示创建时间
  function menu_showcreatetime() {
    setInterval(() => {
      init();
    }, 1000);
  }

  $(function () {
    let pollinglength = 0;
    setInterval(() => {
      if (pollinglength != $(".topic-list-body tr").length) {
        pollinglength = $(".topic-list-body tr").length;
        // 需要轮询的方法
        menu_showcreatetime(); // 显示创建时间
      }
    }, 1000);
  });
})();
