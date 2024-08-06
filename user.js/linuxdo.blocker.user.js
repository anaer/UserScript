// ==UserScript==
// @name         社区低质量主题帖过滤器
// @name:en      Low Quality Posts Blocker
// @license      MIT
// @author       anaer
// @namespace    https://github.com/anaer/UserScript
// @version      24.806.1332
// @description  屏蔽常见类型的低质量主题帖，如重复提问、戾气帖子、日经抱怨等。支持手机电脑双平台，支持自定义屏蔽规则。默认规则开箱即用。
// @match        https://linux.do/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  var removeMode = "remove";
  var counter = 0; //屏蔽计数器
  var blacklistKeywords = [
    "蜜雪冰城",
    "😅",
    "贵物",
    "占座",
    "恶心",
    "分流",
    "你妈",
    "傻逼",
    "脑瘫",
    "死妈",
    "死个妈",
    "奇葩",
    "能洗鞋",
    "有病",
    "素质",
  ];
  //最高优先级：有白名单总会不屏蔽
  var whitelistWords = [
    "投喂",
    "公告",
    "搭子",
    "分享",
    "指北",
    "指南",
    "生存",
    "教程",
    "笔记",
    "接龙",
    "飞花令",
    "交流",
    "挑战",
    "每日",
    "闲谈",
    "经验",
    "通知",
    "Wiki",
    "wiki",
    "WIKI",
  ]; 
  var clickbaitList = [
    "！",
    "：",
    "，",
    "禁",
    "官",
    "竟",
    "@",
    "那个",
    "这个",
    "最新",
    "定了",
    "这项",
    "这份",
    "这场",
    "上榜",
    "全体成员",
  ];
  var whatsgoingonList = [
    "发生什",
    "发生啥",
    "怎么了",
    "怎么回事",
    "了？",
    "救护车",
    "向？",
    "什么事",
    "发生了",
  ];
  var customBlackList = [];
  // 检测 customBlacklistWord 是否存在自定义值
  if (localStorage.getItem("customBlacklistWord")) {
    var customBlacklistWord = localStorage.getItem("customBlacklistWord");
    blacklistKeywords = customBlacklistWord.split(",");
  }

  // 检测 customWhitelistWord 是否存在于 localStorage
  if (localStorage.getItem("customWhitelistWord")) {
    var customWhitelistWord = localStorage.getItem("customWhitelistWord");
    whitelistWords = customWhitelistWord.split(",");
  }

  // 检测 customcustomBlacklistWord 是否存在于 localStorage
  if (localStorage.getItem("customcustomBlacklistWord")) {
    var customcustomBlacklistWord = localStorage.getItem(
      "customcustomBlacklistWord"
    );
    customBlackList = customcustomBlacklistWord.split(",");
  }

  // 检测各屏蔽组件启用情况
  var isClickbaitBlockingOn = getRuleStatus("optionalBlockingRulesCheck01");
  var isWhatsgoingonBlockingOn = getRuleStatus("optionalBlockingRulesCheck02");
  var isCutsomBlacklistBlockingOn = getRuleStatus(
    "optionalBlockingRulesCheck03"
  );

  // 主页已屏蔽数量文字提示
  var blockTextInfo = "🛡: 0";
  var blocktext = document.createElement("div");
  blocktext.innerText = blockTextInfo;
  blocktext.style.height = "100%";
  blocktext.style.display = "flex";
  blocktext.style.alignItems = "center";
  blocktext.style.justifyContent = "center";
  blocktext.style.padding = "0 10px";
  blocktext.classList.add("block-number-text");
  blocktext.addEventListener("click", blockLogRead);

  //屏蔽模式自动识别
  var htmlElement = document.documentElement;
  var isDeviceMobile = htmlElement.classList.contains("mobile-view"); //已解决~~移动端设备采用无感屏蔽存在无法无限加载的问题。移动端不启用移除模式，而是使用隐藏模式，保留控件占位~~

  if (localStorage.getItem("removeMode") === null) {
    removeMode = "remove";
    localStorage.setItem("removeMode", removeMode);
  } else {
    removeMode = localStorage.getItem("removeMode");
  }
  //顺便读取过短标题阈值长度等阈值信号
  var shortTitleThresh = localStorage.getItem("shortTitleThresh");
  if (shortTitleThresh === null) {
    shortTitleThresh = 6; //默认
  }
  var fewReplyThresh = localStorage.getItem("fewReplyThresh");
  if (fewReplyThresh === null) {
    fewReplyThresh = 0; //默认
  }
  var highReplyThresh = localStorage.getItem("highReplyThresh");
  if (highReplyThresh === null) {
    highReplyThresh = 1000; //默认
  }

  function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");
    var currentDate = year + "-" + month + "-" + day;
    console.log("currentDate:" + currentDate);
    return currentDate;
  }

  //屏蔽日志
  function blockLogWrite(blockExplanation) {
    //console.log('Blocklog:', blockExplanation);
    //blockExplanation
    var blocklogtext = "";
    var blockLogDate = localStorage.getItem("blockLogDateV1");
    if (blockLogDate == getCurrentDate()) {
      blocklogtext = localStorage.getItem("blockLogV1");
    }
    //if(removeMode=="hide"){
    //    //hide模式会反复写入同一个标题
    if (!blocklogtext.includes(blockExplanation)) {
      localStorage.setItem(
        "blockLogV1",
        blockExplanation + "\n\n" + blocklogtext
      );
      localStorage.setItem("blockLogDateV1", getCurrentDate());
    }
    //}
    //else{
    //    localStorage.setItem('blockLogV1', blockExplanation+"\n"+blocklogtext);
    //    localStorage.setItem('blockLogDateV1', getCurrentDate());
    //}
  }

  function blockLogRead() {
    event.preventDefault();
    var blockLogDate = localStorage.getItem("blockLogDateV1");
    var blockLogText = localStorage.getItem("blockLogV1");
    console.log("blockLogRead_blockLogDateV1:" + blockLogDate);

    // 创建对话框的内容
    var blockLogDialogContent = `
    ${blockLogDate}

    ${blockLogText}`;

    // 弹出对话框
    window.alert(blockLogDialogContent);
  }

  function blockLogClear() {
    event.preventDefault();
    var blockLogDate = localStorage.setItem("blockLogDateV1", "logDeleted");
    var blockLogText = localStorage.setItem("blockLogV1", "clear");
    window.alert("log deleted");
  }

  //屏蔽函数
  function block(subject) {
    if (removeMode == "remove") {
      if (isDeviceMobile) {
        subject.parentElement.remove();
      } else {
        subject.remove();
      }
    } else if (removeMode == "hide") {
      subject.style.visibility = "hidden";
      //var classInfo = subject.classList;
      //console.log('classinfo:', classInfo);
    } else {
      console.log("错误：不存在的removeMode");
    }
  }

  // 查找目标位置并添加按钮
  function addTextToContainer(num) {
    if (num == 0) {
      blockTextInfo = "😍: 0";
    } else {
      blockTextInfo = "🚫: " + num;
    }
    var container = document.getElementById("navigation-bar");
    if (container) {
      var existingBlockText = container.querySelector(".block-number-text");
      if (existingBlockText) {
        existingBlockText.innerText = blockTextInfo;
      } else {
        var firstChild = container.firstElementChild;
        container.insertBefore(blocktext, firstChild);
      }
    }
  }

  var lastRoundElements = null;
  setInterval(function () {
    // 获取所有需要检测的元素
    var elements = document.querySelectorAll("a.title");
    if (elements.length == lastRoundElements) {
      console.log("网页内容未改变，跳过本轮处理");
    } else {
      lastRoundElements = elements.length;
      console.log("元素数量：", elements.length);

      var isTrashContentFlag;
      var blockExplanation;
      // 屏蔽检测与删除
      for (var i = 0; i < elements.length; i++) {
        isTrashContentFlag = false;

        //---白名单检测---
        var element = elements[i];
        var replyNum = getReplyNum(element);
        var textContent = element.innerText.trim();
        blockExplanation = "[" + textContent + "] ";
        var isPostInWhitelist = false;
        for (var j = 0; j < whitelistWords.length; j++) {
          if (textContent.includes(whitelistWords[j])) {
            isPostInWhitelist = true;
            console.log("白名单通过：", textContent, " ", whitelistWords[j]);
            blockExplanation =
              blockExplanation +
              "白名单通过：关键词保护（" +
              whitelistWords[j] +
              "）；";
            break;
          }
        }
        if (replyNum >= highReplyThresh) {
          isPostInWhitelist = true;
          console.log(
            "白名单通过：高回复数帖，回复&数量=" +
              textContent +
              " <" +
              replyNum +
              ">"
          );
          blockExplanation =
            blockExplanation +
            "白名单通过：高回复数帖，回复&数量=" +
            textContent +
            " <" +
            replyNum +
            ">；";
        }
        if (window.location.href.includes("shuiyuan.sjtu.edu.cn/search")) {
          isPostInWhitelist = true;
          console.log("白名单通过：目前处于搜索页面。");
          blockExplanation =
            blockExplanation +
            "白名单通过：目前处于搜索页面（" +
            window.location.href +
            "）；";
        }
        //---白名单检测：结束---

        var parentElement = element.parentElement;

        // 1. 如果文本内容少于等于六个字，判定为过短标题
        if (textContent.length <= shortTitleThresh) {
          console.log("标记：", textContent);
          if (
            parentElement &&
            parentElement.parentElement &&
            parentElement.parentElement.parentElement
          ) {
            isTrashContentFlag = true;
            blockExplanation =
              blockExplanation +
              "规则1：过短标题(文本内容少于等于一定长度：" +
              shortTitleThresh +
              ")；";
          }
        }

        // 2. 检查文本是否包含关键词
        var containsKeyword = false;
        for (j = 0; j < blacklistKeywords.length; j++) {
          if (textContent.includes(blacklistKeywords[j])) {
            containsKeyword = true;
            console.log("关键词检测：", textContent, " ", blacklistKeywords[j]);
            break;
          }
        }
        if (containsKeyword) {
          console.log("标记：", textContent);
          if (
            parentElement &&
            parentElement.parentElement &&
            parentElement.parentElement.parentElement
          ) {
            isTrashContentFlag = true;
            blockExplanation =
              blockExplanation + "规则2：黑名单屏蔽(标题命中黑名单关键词)；";
          }
        }

        // 3. 标题党专项屏蔽：逻辑为，短字段、含有敏感字符（！：，禁官竟），将导致指标增加
        var clickbaitScore = 0;
        for (j = 0; j < clickbaitList.length; j++) {
          if (textContent.includes(clickbaitList[j])) {
            clickbaitScore++;
          }
        }
        if (textContent.length <= 14) {
          clickbaitScore++;
        }
        if (textContent.length <= 8) {
          clickbaitScore++;
        }
        if (textContent.length >= 20) {
          clickbaitScore--;
        }
        if (textContent.length >= 3 && textContent[0] === "这") {
          clickbaitScore++;
        }
        if (textContent.length >= 3 && textContent.endsWith("!")) {
          clickbaitScore++;
        }
        if (textContent.length >= 3 && textContent[2] === "！") {
          clickbaitScore++;
        }
        if (textContent.length >= 3 && textContent[2] === "，") {
          clickbaitScore++;
        }
        if (clickbaitScore >= 3 && isClickbaitBlockingOn) {
          console.log("标记：", textContent);
          parentElement = element.parentElement;
          if (
            parentElement &&
            parentElement.parentElement &&
            parentElement.parentElement.parentElement
          ) {
            isTrashContentFlag = true;
            blockExplanation =
              blockExplanation +
              "规则3：疑似标题党(标题党指数过高：clickbaitScore=" +
              clickbaitScore +
              ")；";
          }
        }

        // 4. 发生什么事了专项屏蔽：逻辑为，短字段、含有敏感字符将导致指标上升
        var whatsgoingonScore = 0;
        for (j = 0; j < whatsgoingonList.length; j++) {
          if (textContent.includes(whatsgoingonList[j])) {
            whatsgoingonScore++;
          }
        }
        if (textContent.length <= 15) {
          whatsgoingonScore++;
        }
        if (textContent.length >= 25) {
          whatsgoingonScore--;
        }
        if (textContent.includes("救护车")) {
          whatsgoingonScore++;
        }
        if (whatsgoingonScore >= 2 && isWhatsgoingonBlockingOn) {
          console.log("标记：", textContent);
          parentElement = element.parentElement;
          if (
            parentElement &&
            parentElement.parentElement &&
            parentElement.parentElement.parentElement
          ) {
            isTrashContentFlag = true;
            blockExplanation =
              blockExplanation +
              "规则4：疑似“发生什么事了”帖(“吃瓜”指数过高：whatsgoingonScore=" +
              whatsgoingonScore +
              ")；";
          }
        }
        //customBlackList){
        //5. 额外黑名单
        if (isCutsomBlacklistBlockingOn) {
          var isInCustomBlacklist = false;
          for (j = 0; j < customBlackList.length; j++) {
            if (textContent.includes(customBlackList[j])) {
              isInCustomBlacklist = true;
              console.log(
                "额外黑名单关键词检测：",
                textContent,
                " ",
                customBlackList[j]
              );
              break;
            }
          }

          if (isInCustomBlacklist) {
            console.log("标记：", textContent);
            parentElement = element.parentElement;
            if (
              parentElement &&
              parentElement.parentElement &&
              parentElement.parentElement.parentElement
            ) {
              isTrashContentFlag = true;
              blockExplanation =
                blockExplanation + "规则5：命中额外黑名单关键词；";
            }
          }
        }

        //6. 回复数量过少
        console.log("回复+数量：", textContent + " " + replyNum);
        if (replyNum < fewReplyThresh) {
          if (
            parentElement &&
            parentElement.parentElement &&
            parentElement.parentElement.parentElement
          ) {
            isTrashContentFlag = true;
            blockExplanation =
              blockExplanation +
              "规则6：回复数量过少，replyNum=" +
              replyNum +
              "<" +
              fewReplyThresh +
              "；";
          }
        }

        //---开始屏蔽----
        if (isTrashContentFlag && !isPostInWhitelist) {
          block(parentElement.parentElement.parentElement);
          blockLogWrite(blockExplanation + "【结论】屏蔽");
          counter++;
        }
        if (isTrashContentFlag && isPostInWhitelist) {
          blockLogWrite(blockExplanation + "【结论】白名单保护，未屏蔽");
        }
        //---开始屏蔽：完成----
      }

      //显示屏蔽数量
      addTextToContainer(counter);
      if (removeMode == "hide") {
        counter = 0;
      }
    }
  }, 300);

  function addSettingArea() {
    //<div class="control-group theme" data-setting-name="user-theme">
    var targetElement = document.querySelector("fieldset.color-scheme");
    var createdElement = document.querySelector(".lowQualityPostsBlocker");

    // 检测指定代码是否存在
    if (targetElement && !createdElement) {
      console.log("已找到control-group theme标签");

      // 创建外层容器
      var containerElement = document.createElement("div");
      containerElement.style.backgroundColor = "#f4f4f4";
      containerElement.style.padding = "10px";
      containerElement.style.marginBottom = "10px";
      containerElement.classList.add("lowQualityPostsBlocker");

      // 创建标题元素
      var titleElement = document.createElement("h2");
      titleElement.style.fontWeight = "bold";
      titleElement.style.color = "black";
      titleElement.style.marginBottom = "10px";
      titleElement.textContent = "低质量主题帖过滤器";
      containerElement.appendChild(titleElement);

      //分割线
      var separator0 = document.createElement("hr");
      containerElement.appendChild(separator0);

      var titleElement0b = document.createElement("h4");
      //titleElement0b.style.fontWeight = 'bold';
      titleElement0b.style.color = "black";
      titleElement0b.style.marginTop = "10px";
      titleElement0b.style.marginBottom = "10px";
      titleElement0b.textContent = "日志信息";
      containerElement.appendChild(titleElement0b);
      // 创建按钮容器
      var buttonsContainer0b = document.createElement("div");
      buttonsContainer0b.style.display = "flex";
      buttonsContainer0b.style.gap = "10px";
      buttonsContainer0b.style.marginTop = "10px";
      containerElement.appendChild(buttonsContainer0b);

      // 创建查看日志按钮
      var logButton = document.createElement("button");
      logButton.textContent = "查看日志";
      logButton.style.padding = "6px 12px";
      logButton.style.backgroundColor = "#ccc";
      logButton.style.border = "none";
      logButton.style.color = "#000";
      logButton.addEventListener("click", blockLogRead);
      buttonsContainer0b.appendChild(logButton);

      // 创建清除日志按钮
      var logDeleteButton = document.createElement("button");
      logDeleteButton.textContent = "清空日志";
      logDeleteButton.style.padding = "6px 12px";
      logDeleteButton.style.backgroundColor = "#ccc";
      logDeleteButton.style.border = "none";
      logDeleteButton.style.color = "#000";
      logDeleteButton.addEventListener("click", blockLogClear);
      buttonsContainer0b.appendChild(logDeleteButton);

      //分割线
      var separator2 = document.createElement("hr");
      containerElement.appendChild(separator2);
      var titleElement2 = document.createElement("h3");
      titleElement2.style.fontWeight = "bold";
      titleElement2.style.color = "black";
      titleElement2.style.marginBottom = "10px";
      titleElement2.textContent = "屏蔽模式";
      containerElement.appendChild(titleElement2);

      // 创建单选框容器
      var radioContainer2 = document.createElement("div");
      radioContainer2.style.display = "flex";
      radioContainer2.style.gap = "10px";
      radioContainer2.style.marginTop = "10px";
      containerElement.appendChild(radioContainer2);

      // 创建兼容模式单选框
      var compatibilityRadio = document.createElement("input");
      compatibilityRadio.type = "radio";
      compatibilityRadio.name = "removeMode";
      compatibilityRadio.value = "hide";
      radioContainer2.appendChild(compatibilityRadio);

      // 创建兼容模式标签
      var compatibilityLabel = document.createElement("label");
      compatibilityLabel.textContent = "兼容模式";
      compatibilityLabel.setAttribute("for", "compatibilityRadio"); // 添加for属性
      compatibilityLabel.addEventListener("click", function () {
        compatibilityRadio.click(); // 点击文字时选中对应的单选框
      });
      radioContainer2.appendChild(compatibilityLabel);

      // 创建无感屏蔽单选框
      var removeRadio = document.createElement("input");
      removeRadio.type = "radio";
      removeRadio.name = "removeMode";
      removeRadio.value = "remove";
      radioContainer2.appendChild(removeRadio);

      // 创建无感屏蔽标签
      var removeLabel = document.createElement("label");
      removeLabel.textContent = "自动模式";
      removeLabel.setAttribute("for", "removeRadio"); // 添加for属性
      removeLabel.addEventListener("click", function () {
        removeRadio.click(); // 点击文字时选中对应的单选框
      });
      radioContainer2.appendChild(removeLabel);

      // 添加样式以确保水平对齐
      radioContainer2.style.display = "flex";
      radioContainer2.style.alignItems = "flex-start";

      // 创建按钮容器
      var actionButtonsContainer2 = document.createElement("div");
      actionButtonsContainer2.style.display = "flex";
      actionButtonsContainer2.style.gap = "10px";
      actionButtonsContainer2.style.marginTop = "10px";
      containerElement.appendChild(actionButtonsContainer2);

      // 创建保存按钮
      var saveButton4RemoveType = document.createElement("button");
      saveButton4RemoveType.textContent = "保存";
      saveButton4RemoveType.style.padding = "6px 12px";
      saveButton4RemoveType.style.backgroundColor = "#ccc";
      saveButton4RemoveType.style.border = "none";
      saveButton4RemoveType.style.color = "#000";
      actionButtonsContainer2.appendChild(saveButton4RemoveType);

      // 创建说明文本
      var descriptionTextRemoveMode = document.createElement("p");
      descriptionTextRemoveMode.style.fontSize = "12px";
      descriptionTextRemoveMode.innerHTML =
        "兼容模式适用于不同设备，屏蔽帖子时会保留其占位，也即显示一块空白区域。自动模式则会根据设备类型选择代码，将帖子直接移除。如若识别错误导致无法加载主页，请切换至兼容模式即可。";
      containerElement.appendChild(descriptionTextRemoveMode);

      // 从 localStorage 获取保存的单选框状态
      var savedMode = localStorage.getItem("removeMode");
      if (savedMode === "hide") {
        compatibilityRadio.checked = true;
      } else if (savedMode === "remove") {
        removeRadio.checked = true;
      }

      // 保存按钮点击事件处理函数
      saveButton4RemoveType.addEventListener("click", function () {
        var selectedMode = "";
        if (compatibilityRadio.checked) {
          selectedMode = "hide";
        } else if (removeRadio.checked) {
          selectedMode = "remove";
        }
        localStorage.setItem("removeMode", selectedMode);
        alert("已保存选择的屏蔽模式：" + selectedMode + "，刷新网页生效。");
      });

      //分割线
      var separator1 = document.createElement("hr");
      containerElement.appendChild(separator1);
      var titleElement1 = document.createElement("h3");
      titleElement1.style.fontWeight = "bold";
      titleElement1.style.color = "black";
      titleElement1.style.marginBottom = "10px";
      titleElement1.textContent = "基础屏蔽：屏蔽词库自定义";
      containerElement.appendChild(titleElement1);

      // 创建文本框
      var textBox = document.createElement("textarea");
      textBox.rows = 3;
      textBox.placeholder =
        "输入关键词，用英文逗号分割。例如：拔插头,震惊,占座";
      textBox.style.marginTop = "10px";
      handleReadButtonClick(
        textBox,
        blacklistRadio,
        whitelistRadio,
        customBlacklistRadio
      );
      containerElement.appendChild(textBox);

      // 创建单选框容器
      var radioContainer = document.createElement("div");
      radioContainer.style.display = "flex";
      radioContainer.style.gap = "10px";
      radioContainer.style.marginTop = "10px";
      containerElement.appendChild(radioContainer);

      // 创建黑名单词单选框
      var blacklistRadio = document.createElement("input");
      blacklistRadio.type = "radio";
      blacklistRadio.name = "filterType";
      blacklistRadio.checked = true; // 设置为默认选中
      radioContainer.appendChild(blacklistRadio);

      // 创建黑名单词标签
      var blacklistLabel = document.createElement("label");
      blacklistLabel.textContent = "黑名单";
      blacklistLabel.setAttribute("for", "blacklistRadio"); // 添加for属性
      blacklistLabel.addEventListener("click", function () {
        blacklistRadio.click(); // 点击文字时选中对应的单选框
      });
      radioContainer.appendChild(blacklistLabel);

      // 创建白名单词单选框
      var whitelistRadio = document.createElement("input");
      whitelistRadio.type = "radio";
      whitelistRadio.name = "filterType";
      radioContainer.appendChild(whitelistRadio);

      // 创建白名单词标签
      var whitelistLabel = document.createElement("label");
      whitelistLabel.textContent = "白名单";
      whitelistLabel.setAttribute("for", "whitelistRadio"); // 添加for属性
      whitelistLabel.addEventListener("click", function () {
        whitelistRadio.click(); // 点击文字时选中对应的单选框
      });
      radioContainer.appendChild(whitelistLabel);

      // 创建额外黑名单词单选框
      var customBlacklistRadio = document.createElement("input");
      customBlacklistRadio.type = "radio";
      customBlacklistRadio.name = "filterType";
      radioContainer.appendChild(customBlacklistRadio);

      // 创建额外黑名单词标签
      var customBlacklistLabel = document.createElement("label");
      customBlacklistLabel.textContent = "额外黑名单";
      customBlacklistLabel.setAttribute("for", "customBlacklistRadio"); // 添加for属性
      customBlacklistLabel.addEventListener("click", function () {
        customBlacklistRadio.click(); // 点击文字时选中对应的单选框
      });
      radioContainer.appendChild(customBlacklistLabel);

      // 添加样式以确保垂直对齐
      radioContainer.style.display = "flex";
      radioContainer.style.alignItems = "flex-start";

      // 创建按钮容器
      var actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.style.display = "flex";
      actionButtonsContainer.style.gap = "10px";
      actionButtonsContainer.style.marginTop = "10px";
      containerElement.appendChild(actionButtonsContainer);

      // 创建覆写按钮（保存）
      var overrideButton = document.createElement("button");
      overrideButton.textContent = "保存";
      overrideButton.style.padding = "6px 12px";
      overrideButton.style.backgroundColor = "#ccc";
      overrideButton.style.border = "none";
      overrideButton.style.color = "#000";
      actionButtonsContainer.appendChild(overrideButton);

      // 创建重写按钮
      var rewriteButton = document.createElement("button");
      rewriteButton.textContent = "恢复默认值";
      rewriteButton.style.padding = "6px 12px";
      rewriteButton.style.backgroundColor = "#ccc";
      rewriteButton.style.border = "none";
      rewriteButton.style.color = "#000";
      actionButtonsContainer.appendChild(rewriteButton);

      // 创建说明文字
      var descriptionText = document.createElement("p");
      descriptionText.style.fontSize = "12px";
      descriptionText.innerHTML =
        "标题命中黑名单词的帖子会被直接屏蔽；命中白名单的帖子永远不会被屏蔽；额外黑名单同黑名单，但不提供随脚本自动更新。<br>白名单规则具有最高优先级，如若一个符合其它规则的帖子没有被屏蔽，请优先检查其是否被白名单规则保护。<br>请注意：黑名单和白名单在您未自定义时，会使用随脚本更新的默认词库。一旦自定义，内置默认词库随即失效，直到您点击恢复默认。";
      containerElement.appendChild(descriptionText);

      overrideButton.addEventListener("click", function (event) {
        handleOverrideButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });

      rewriteButton.addEventListener("click", function (event) {
        handleRewriteButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });

      blacklistRadio.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      blacklistLabel.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      whitelistRadio.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      whitelistLabel.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      customBlacklistRadio.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      customBlacklistLabel.addEventListener("click", function (event) {
        handleReadButtonClick(
          textBox,
          blacklistRadio,
          whitelistRadio,
          customBlacklistRadio
        );
      });
      handleReadButtonClick(
        textBox,
        blacklistRadio,
        whitelistRadio,
        customBlacklistRadio
      );

      // 分割线
      var separator4 = document.createElement("hr");
      containerElement.appendChild(separator4);

      // 创建标题元素
      var titleElement4 = document.createElement("h3");
      titleElement4.style.fontWeight = "bold";
      titleElement4.style.color = "black";
      titleElement4.style.marginBottom = "10px";
      titleElement4.textContent = "专项屏蔽：可选规则集设置";
      containerElement.appendChild(titleElement4);

      // 创建多选项容器
      var checkboxContainer = document.createElement("div");
      checkboxContainer.style.display = "flex";
      checkboxContainer.style.flexDirection = "column";
      containerElement.appendChild(checkboxContainer);

      // 创建多选项1：启用标题党专项屏蔽
      var optionalBlockingRulesCheck01 = createCheckbox(
        "optionalBlockingRulesCheck01",
        "启用标题党屏蔽规则集",
        checkboxContainer
      );
      optionalBlockingRulesCheck01.checked = getRuleStatus(
        "optionalBlockingRulesCheck01"
      );

      // 创建多选项2：启用“发生什么事了”屏蔽
      var optionalBlockingRulesCheck02 = createCheckbox(
        "optionalBlockingRulesCheck02",
        "启用“发生什么事了”/吃瓜帖屏蔽规则集",
        checkboxContainer
      );
      optionalBlockingRulesCheck02.checked = getRuleStatus(
        "optionalBlockingRulesCheck02"
      );

      // 创建多选项3：启用“额外黑名单”屏蔽
      var optionalBlockingRulesCheck03 = createCheckbox(
        "optionalBlockingRulesCheck03",
        "允许使用额外黑名单词库进行基础屏蔽",
        checkboxContainer
      );
      optionalBlockingRulesCheck03.checked = getRuleStatus(
        "optionalBlockingRulesCheck03"
      );

      // 创建保存按钮
      var saveButton4optinalBlockingRules = document.createElement("button");
      saveButton4optinalBlockingRules.textContent = "保存";
      saveButton4optinalBlockingRules.style.padding = "6px 12px";
      saveButton4optinalBlockingRules.style.backgroundColor = "#ccc";
      saveButton4optinalBlockingRules.style.border = "none";
      saveButton4optinalBlockingRules.style.color = "#000";
      containerElement.appendChild(saveButton4optinalBlockingRules);

      // 从 localStorage 获取保存的多选项勾选状态
      restoreCheckboxStatus(checkboxContainer);

      // 保存按钮点击事件处理函数
      saveButton4optinalBlockingRules.addEventListener("click", function () {
        saveCheckboxStatus(checkboxContainer);
        alert("已保存选择的多选项配置，刷新网页生效。");
      });
      // 创建说明文本
      var descriptionText4optionalBlockingRules = document.createElement("p");
      descriptionText4optionalBlockingRules.style.fontSize = "12px";
      descriptionText4optionalBlockingRules.innerHTML =
        "可选规则集是针对某类帖子设计的一套相对黑名单更复杂的判定标准。简而言之，勾选某个可选规则集后，脚本会在其它规则生效的基础上，继续屏蔽被遗漏的所针对的目标帖。<br><br>相应规则匹配示例：<br>可能会被屏蔽的标题党帖：“华为：或全部禁止！”，“她，当选！”<br>可能会被屏蔽的吃瓜帖：“东三区救护车怎么回事？”，“玉兰苑的警察怎么回事呀？”<br><br>部分类型帖子如“涉政”、“钓鱼”，已有相对完善的tag标注，推荐您使用discourse框架自带的tag屏蔽功能进行处理，以获得更好兼容性和浏览体验。";
      containerElement.appendChild(descriptionText4optionalBlockingRules);

      // 分割线
      var separator3 = document.createElement("hr");
      containerElement.appendChild(separator3);

      // 创建标题元素
      var titleElement3 = document.createElement("h3");
      titleElement3.style.fontWeight = "bold";
      titleElement3.style.color = "black";
      titleElement3.style.marginBottom = "10px";
      titleElement3.textContent = "专项屏蔽：短标题屏蔽";
      containerElement.appendChild(titleElement3);

      // 创建数字调整框
      var numberInput4ShortTitle = document.createElement("input");
      numberInput4ShortTitle.type = "number";
      numberInput4ShortTitle.value =
        localStorage.getItem("shortTitleThresh") || 6; // 默认值为6
      containerElement.appendChild(numberInput4ShortTitle);

      // 创建保存按钮
      var saveButton4ShortTitle = document.createElement("button");
      saveButton4ShortTitle.textContent = "保存";
      saveButton4ShortTitle.style.padding = "6px 12px";
      saveButton4ShortTitle.style.backgroundColor = "#ccc";
      saveButton4ShortTitle.style.border = "none";
      saveButton4ShortTitle.style.marginLeft = "10px";
      saveButton4ShortTitle.style.color = "#000";
      containerElement.appendChild(saveButton4ShortTitle);

      // 创建说明文本
      var descriptionText4ShortTitle = document.createElement("p");
      descriptionText4ShortTitle.style.fontSize = "12px";
      descriptionText4ShortTitle.innerHTML =
        "【强力选项】当标题过短时，经验判断该帖为重复伸手党提问或牢骚帖的概率较大。你可以设置当标题长度小于等于阈值时默认屏蔽该帖。<br><br>本选项为【强力选项】，启用后可屏蔽绝大多数目标帖，但有一定误伤概率。请考虑使用白名单防止误伤。推荐设置：【7】<br><br>相应规则匹配示例：<br>可能会被屏蔽的短标题帖：“关于大物”，“保研问题”，“她，当选！”，“。。。。”，“🔒已解决”";
      containerElement.appendChild(descriptionText4ShortTitle);

      // 点击保存按钮时的事件处理函数
      saveButton4ShortTitle.addEventListener("click", function () {
        var value = numberInput4ShortTitle.value;
        if (value > 20 || value < 0) {
          alert(
            "阈值过大可能影响网页正常加载，请设置为0-20之间的值，默认为6。"
          );
        } else {
          localStorage.setItem("shortTitleThresh", value);
          alert("已保存选择的阈值：" + value + "，刷新网页生效。");
        }
      });

      // 分割线
      var separator5 = document.createElement("hr");
      containerElement.appendChild(separator5);

      // 创建标题元素
      var titleElement5 = document.createElement("h3");
      titleElement5.style.fontWeight = "bold";
      titleElement5.style.color = "black";
      titleElement5.style.marginBottom = "10px";
      titleElement5.textContent = "专项屏蔽：低回复帖屏蔽";
      containerElement.appendChild(titleElement5);

      // 创建数字调整框
      var numberInput4FewReply = document.createElement("input");
      numberInput4FewReply.type = "number";
      numberInput4FewReply.value = localStorage.getItem("fewReplyThresh") || 0; // 默认值为0
      containerElement.appendChild(numberInput4FewReply);

      // 创建保存按钮
      var saveButton4FewReply = document.createElement("button");
      saveButton4FewReply.textContent = "保存";
      saveButton4FewReply.style.padding = "6px 12px";
      saveButton4FewReply.style.backgroundColor = "#ccc";
      saveButton4FewReply.style.border = "none";
      saveButton4FewReply.style.marginLeft = "10px";
      saveButton4FewReply.style.color = "#000";
      containerElement.appendChild(saveButton4FewReply);

      // 创建说明文本
      var descriptionText4FewReply = document.createElement("p");
      descriptionText4FewReply.style.fontSize = "12px";
      descriptionText4FewReply.innerHTML =
        "【强力选项】默认值为0（也即关闭），但推荐开启。回复过少的帖子为重复伸手党提问的概率较大，然而也可能是刚发出的高质量帖。<br>你可以设置当主题帖回复数量少于某个值时默认屏蔽该帖。别担心，如果该帖后续回复数提升，你仍然能重新看到该帖。<br><br>本选项为【强力选项】，启用后可屏蔽绝大多数目标帖，但有一定误伤概率。若你不重视帖子时效性，则无需过度关注本选项的负面效果。推荐阈值：【3】";
      containerElement.appendChild(descriptionText4FewReply);

      // 点击保存按钮时的事件处理函数
      saveButton4FewReply.addEventListener("click", function () {
        var value = numberInput4FewReply.value;
        if (value > 30 || value < 0) {
          alert(
            "阈值过大可能影响网页正常加载，请设置为0-30之间的值，默认为0，推荐设置为3。"
          );
        } else {
          localStorage.setItem("fewReplyThresh", value);
          alert("已保存选择的阈值：" + value + "，刷新网页生效。");
        }
      });

      // 分割线
      var separator6 = document.createElement("hr");
      containerElement.appendChild(separator6);

      // 创建标题元素
      var titleElement6 = document.createElement("h3");
      titleElement6.style.fontWeight = "bold";
      titleElement6.style.color = "black";
      titleElement6.style.marginBottom = "10px";
      titleElement6.textContent = "专项保护：高回复数白名单";
      containerElement.appendChild(titleElement6);

      // 创建数字调整框
      var numberInput4HighReply = document.createElement("input");
      numberInput4HighReply.type = "number";
      numberInput4HighReply.value =
        localStorage.getItem("highReplyThresh") || 1000; // 默认值为0
      containerElement.appendChild(numberInput4HighReply);

      // 创建保存按钮
      var saveButton4HighReply = document.createElement("button");
      saveButton4HighReply.textContent = "保存";
      saveButton4HighReply.style.padding = "6px 12px";
      saveButton4HighReply.style.backgroundColor = "#ccc";
      saveButton4HighReply.style.border = "none";
      saveButton4HighReply.style.marginLeft = "10px";
      saveButton4HighReply.style.color = "#000";
      containerElement.appendChild(saveButton4HighReply);

      // 创建说明文本
      var descriptionText4HighReply = document.createElement("p");
      descriptionText4HighReply.style.fontSize = "12px";
      descriptionText4HighReply.innerHTML =
        "当回复数高于此值时，该帖可能为高讨论热帖，将被加入白名单，不再屏蔽。要关闭此功能，请将本项设置为99999. 请注意：像这样的白名单类规则具有最高优先级，满足任何白名单的帖子永远不会被屏蔽。<br><br>本选项为【强力选项】，启用后可保证热帖永远不被屏蔽。推荐阈值：此项建议设置为100-2000之间的值，默认值为【1000】。";
      containerElement.appendChild(descriptionText4HighReply);

      // 点击保存按钮时的事件处理函数
      saveButton4HighReply.addEventListener("click", function () {
        var value = numberInput4HighReply.value;
        if (value <= 5) {
          alert(
            "白名单阈值过小可能影响其它规则正常运行，导致过多低质量帖符合本规则而难以被屏蔽。请将此值设置为大于5的整数。"
          );
        } else {
          localStorage.setItem("highReplyThresh", value);
          alert("已保存选择的阈值：" + value + "，刷新网页生效。");
        }
      });

      // 分割线
      var separator7 = document.createElement("hr");
      containerElement.appendChild(separator7);

      // 将外层容器插入到目标元素之前
      targetElement.parentNode.insertBefore(containerElement, targetElement);
    }
  }

  // 创建多选框并添加到容器中的辅助函数
  function createCheckbox(checkboxId, labelText, containerElement) {
    var checkboxWrapper = document.createElement("div");
    checkboxWrapper.style.display = "flex";
    checkboxWrapper.style.alignItems = "center";
    containerElement.appendChild(checkboxWrapper);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkboxWrapper.appendChild(checkbox);

    var label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", checkboxId);
    checkboxWrapper.appendChild(label);

    return checkbox;
  }

  // 从 localStorage 恢复多选项的勾选状态
  function restoreCheckboxStatus(checkboxContainer) {
    var savedRules = localStorage.getItem("optionalBlockingRules");
    var checkboxes = checkboxContainer.getElementsByTagName("input");
    if (savedRules) {
      var rules = JSON.parse(savedRules);
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (rules.hasOwnProperty(checkbox.id)) {
          checkbox.checked = rules[checkbox.id];
        } else {
          checkbox.checked = true;
        }
      }
    } else {
      // 如果没有检测到 optionalBlockingRules，则将所有值视为 true
      for (var i_ckbox = 0; i_ckbox < checkboxes.length; i_ckbox++) {
        checkbox = checkboxes[i_ckbox];
        checkbox.checked = true;
      }
    }
  }

  // 保存多选项的勾选状态到 localStorage
  function saveCheckboxStatus(checkboxContainer) {
    var rules = {};
    var checkboxes = checkboxContainer.getElementsByTagName("input");
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      rules[checkbox.id] = checkbox.checked;
    }
    localStorage.setItem("optionalBlockingRules", JSON.stringify(rules));
  }

  // 通过规则名称获取是否启用该规则的状态
  function getRuleStatus(ruleName) {
    var savedRules = localStorage.getItem("optionalBlockingRules");
    if (savedRules) {
      var rules = JSON.parse(savedRules);
      // 如果之前没有写入过该索引，则视为启用状态
      // 检查规则名称是否存在
      if (rules.hasOwnProperty(ruleName)) {
        return rules[ruleName];
      } else {
        // 规则名称不存在，视为启用状态
        return true;
      }
    }
    return false;
  }

  function getSelectedFilterType(
    blacklistRadio,
    whitelistRadio,
    customBlacklistRadio
  ) {
    var selectedRadio = document.querySelector(
      'input[name="filterType"]:checked'
    );
    if (selectedRadio === blacklistRadio) {
      return "customBlacklistWord";
    } else if (selectedRadio === whitelistRadio) {
      return "customWhitelistWord";
    } else if (selectedRadio === customBlacklistRadio) {
      return "customcustomBlacklistWord";
    } else {
      //blacklistRadio.checked = true;
      return "customBlacklistWord";
    }
  }
  // 点击"覆写"按钮时的处理函数
  function handleOverrideButtonClick(
    textBox,
    blacklistRadio,
    whitelistRadio,
    customBlacklistRadio
  ) {
    event.preventDefault();
    var text = textBox.value.trim(); // 获取文本框内容并去除首尾空格

    if (text !== "") {
      var localStorageKey = getSelectedFilterType(
        blacklistRadio,
        whitelistRadio,
        customBlacklistRadio
      ); // 获取选中的过滤类型
      localStorage.setItem(localStorageKey, text); // 将文本框内容存储到对应的 localStorage
      window.alert("已保存，请刷新网页以生效");
    } else {
      textBox.placeholder = "不能为空"; // 修改文本框的提示词为"不能为空"
    }
  }

  // 点击"读取"按钮时的处理函数
  function handleReadButtonClick(
    textBox,
    blacklistRadio,
    whitelistRadio,
    customBlacklistRadio
  ) {
    //event.preventDefault();
    var localStorageKey = getSelectedFilterType(
      blacklistRadio,
      whitelistRadio,
      customBlacklistRadio
    ); // 获取选中的过滤类型
    var text = localStorage.getItem(localStorageKey); // 从对应的 localStorage 中读取内容

    if (text !== null) {
      textBox.value = text; // 将内容显示在文本框中
    } else {
      var nullKeywordsDefaultValue;
      if (localStorageKey == "customBlacklistWord")
        nullKeywordsDefaultValue = blacklistKeywords;
      else if (localStorageKey == "customWhitelistWord")
        nullKeywordsDefaultValue = whitelistWords;
      else if (localStorageKey == "customcustomBlacklistWord")
        nullKeywordsDefaultValue = [];
      else nullKeywordsDefaultValue = [];
      textBox.value = nullKeywordsDefaultValue.join(",");
    }
  }

  // 点击"默认"按钮时的处理函数
  function handleRewriteButtonClick(
    textBox,
    blacklistRadio,
    whitelistRadio,
    customBlacklistRadio
  ) {
    event.preventDefault();
    var localStorageKey = getSelectedFilterType(
      blacklistRadio,
      whitelistRadio,
      customBlacklistRadio
    ); // 获取选中的过滤类型
    localStorage.removeItem(localStorageKey); // 删除对应的 localStorage 中的内容
    textBox.value = "";
    textBox.placeholder = "已恢复默认设置，请刷新网页以生效";
  }

  // 执行函数并每秒检测
  function loadSetting() {
    //console.log("寻找control-group theme标签");
    setInterval(addSettingArea, 1000);
  }
  loadSetting();

  function getReplyNum(element) {
    var parentDiv = element.parentElement.parentElement;
    var pullRightDiv = parentDiv.querySelector(".pull-right");
    var numberElement = pullRightDiv
      ? pullRightDiv.querySelector(".number")
      : null;
    if (!numberElement) {
      //PC端页面结构略有不同
      parentDiv = parentDiv.parentElement;
      var pullRightDiv4PC = parentDiv.querySelector(".posts");
      numberElement = pullRightDiv4PC
        ? pullRightDiv4PC.querySelector(".number")
        : null;
    }
    var replyNumText = numberElement ? numberElement.textContent.trim() : "";
    var replyNumReturn;

    if (replyNumText.includes("k")) {
      replyNumReturn = parseFloat(replyNumText) * 1000;
    } else {
      replyNumReturn = parseInt(replyNumText);
    }

    if (isNaN(replyNumReturn)) {
      //可能是由于用户设置了关注，导致系统使用“新回复数量”代替了总回复数量，导致replynum在移动端为null。此处直接默认不屏蔽。
      replyNumReturn = 9999;
    }

    return replyNumReturn;
  }
  function getCurrentPageLink() {
    return window.location.href;
  }

})();
