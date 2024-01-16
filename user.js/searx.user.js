// ==UserScript==
// @name         searx.user.js
// @version      2024.1.16.1512
// @icon         https://docs.searxng.org/_static/searxng-wordmark.svg
// @description  SearXNG 搜索引擎优化
// @author       anaer
// @license      MIT License
// @match        https://baresearch.org/*
// @match        https://darmarit.org/searx/*
// @match        https://dynabyte.ca/*
// @match        https://etsi.me/*
// @match        https://fairsuch.net/*
// @match        https://git.poast.org/etsi/etsi.me/*
// @match        https://intelwinds.com/*
// @match        https://jackgoss.xyz/*
// @match        https://jsearch.pw/*
// @match        https://northboot.xyz/*
// @match        https://notsearch.uk/*
// @match        https://ooglester.com/*
// @match        https://opnxng.com/*
// @match        https://paulgo.io/*
// @match        https://priv.au/*
// @match        https://privatesearch.dev/*
// @match        https://privatus.live/*
// @match        https://s.frlt.one/*
// @match        https://s.trung.fun/*
// @match        https://s.zhaocloud.net/*
// @match        https://salsa.debian.org/debian/searx/*
// @match        https://search.0relay.com/*
// @match        https://search.0xgingi.com/*
// @match        https://search.affusio.com/*
// @match        https://search.bloodygang.com/*
// @match        https://search.bus-hit.me/*
// @match        https://search.charleseroop.com/*
// @match        https://search.chemicals-in-the-water.eu/*
// @match        https://search.cronobox.one/*
// @match        https://search.disroot.org/*
// @match        https://search.ethibox.fr/*
// @match        https://search.gcomm.ch/*
// @match        https://search.kiwitalk.de/*
// @match        https://search.kvj.ovh/*
// @match        https://search.mdosch.de/*
// @match        https://search.mpx.wtf/*
// @match        https://search.neet.works/*
// @match        https://search.ononoki.org/*
// @match        https://search.privacyguides.net/*
// @match        https://search.projectsegfau.lt/*
// @match        https://search.rabbit-company.com/*
// @match        https://search.rhscz.eu/*
// @match        https://search.rowie.at/*
// @match        https://search.sapti.me/*
// @match        https://search.serginho.dev/*
// @match        https://search.smnz.de/*
// @match        https://search.stinpriza.org/*
// @match        https://search.suenram.us/*
// @match        https://search.trom.tf/*
// @match        https://search.unlocked.link/*
// @match        https://search.us.projectsegfau.lt/*
// @match        https://search.uspersec.com/*
// @match        https://search.vidhukant.xyz/*
// @match        https://search.zzls.xyz/*
// @match        https://searx.baczek.me/*
// @match        https://searx.be/*
// @match        https://searx.becomesovran.com/*
// @match        https://searx.bissisoft.com/*
// @match        https://searx.catfluori.de/*
// @match        https://searx.chocoflan.net/*
// @match        https://searx.cthd.icu/*
// @match        https://searx.delicta.pp.ua/*
// @match        https://searx.divided-by-zero.eu/*
// @match        https://searx.dresden.network/*
// @match        https://searx.ericaftereric.top/*
// @match        https://searx.esmailelbob.xyz/*
// @match        https://searx.fi/*
// @match        https://searx.fmac.xyz/*
// @match        https://searx.gnous.eu/*
// @match        https://searx.gnu.style/*
// @match        https://searx.juancord.xyz/*
// @match        https://searx.mastodontech.de/*
// @match        https://searx.mha.fi/*
// @match        https://searx.mistli.net/*
// @match        https://searx.mxchange.org/*
// @match        https://searx.nakhan.net/*
// @match        https://searx.namejeff.xyz/*
// @match        https://searx.netzspielplatz.de/*
// @match        https://searx.nixnet.services/*
// @match        https://searx.oakleycord.dev/*
// @match        https://searx.orion-hub.fr/*
// @match        https://searx.priv.pw/*
// @match        https://searx.prvcy.eu/*
// @match        https://searx.rasp.fr/*
// @match        https://searx.rimkus.it/*
// @match        https://searx.roflcopter.fr/*
// @match        https://searx.ru/*
// @match        https://searx.sethforprivacy.com/*
// @match        https://searx.sev.monster/*
// @match        https://searx.slipfox.xyz/searx/*
// @match        https://searx.sp-codes.de/*
// @match        https://searx.stuehieyr.com/*
// @match        https://searx.tiekoetter.com/*
// @match        https://searx.tuxcloud.net/*
// @match        https://searx.tyil.nl/*
// @match        https://searx.vanwa.tech/*
// @match        https://searx.webheberg.info/*
// @match        https://searx.win/*
// @match        https://searx.work/*
// @match        https://searx.xyz/*
// @match        https://searx.zapashcanon.fr/*
// @match        https://searxng.au/*
// @match        https://searxng.nicfab.eu/*
// @match        https://sh0.it/*
// @match        https://spot.murena.io/*
// @match        https://srx.cosmohub.io/*
// @match        https://suche.tromdienste.de/*
// @match        https://swag.pw/*
// @match        https://sx.catgirl.cloud/*
// @match        https://sx.fukt.lol/*
// @match        https://www.gruble.de/*
// @match        https://xo.wtf/*

// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @namespace    https://github.com/anaer/UserScript
// ==/UserScript==

// 分类栏style
GM_addStyle(`
  select{
    outline: none!important;
    border: none!important;
    margin: .5em!important;
  }
  .dialog-error{
    display: none!important;
  }
  #categories_container{
    display: flex!important;
    flex-wrap: nowrap!important;
    overflow: auto;
    scrollbar-width: none;
  }
  #categories_container::-webkit-scrollbar{
    width: 0!important;
    height: .5px;
  }
  #categories_container .category{
    word-break: keep-all;
  }
  #sidebar{
    margin-bottom: 10px!important;
  }
  .search_box{
    height: 48px;
    border-radius: 24px!important;
  }
  .autocomplete,#answers{
    border-radius: 6px!important;
  }
  #q{
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }
  #send_search{
    border-radius: 0 24px 24px 0!important;
  }
  #suggestions .wrapper{
    gap: .5rem!important;
    justify-content: flex-start!important;
  }
  #suggestions .wrapper form{
    flex: unset;
  }
  #suggestions .submit_btn{
    text-align: left!important;
    border-radius: 6px!important;
    background-color:#f1f3f4!important;
    color: #202124!important;
  }
  #language{
    width: 5em!important;
  }
  .result-default{
    border-radius: 6px!important;
    padding: 10px!important;
    margin:0 0 10px 0!important;
    box-shadow:4px 4px 10px 4px rgb(191 209 225)!important;
  }
  article[data-vim-selected]{
    border-radius: 0 6px 6px 0!important;
  }
  .result-default .highlight{
    color:#ea4335!important;
  }
  .result-default .engines span{
    color:lightseagreen!important;
  }
  .result-default h3{
    margin: 1.3rem 0!important;
    display: flex;
    justify-content: space-between;
  }
  .result-default h3 a{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #pagination{
    margin: 0!important;
    display: flex;
    gap: 3rem!important;
    background: #ffffff!important;
    border-radius: 6px!important;
    box-shadow: 4px 4px 10px 4px rgb(191 209 225)!important;
  }
  #pagination  button[type=submit]{
    background: none!important;
    color: #190eab!important;
  }
  @media screen and  (max-width:50em){
    #search_header{
      display: block!important;
      padding-top: .3rem!important;
    }
    #search_logo{
      display: none!important;
    }
    #search_header .search_box{
      box-shadow: none;
      border: 1px solid #e5e5e5;
    }
    #q:focus{
      border-top-left-radius: 24px!important;
      border-bottom-left-radius: 24px!important;
    }
    .search_filters{
      border-radius: 3px!important;
      margin:0 0 10px 0!important;
      box-shadow:0px 0px 5px rgb(191 209 225)!important;
      display: flex!important;
      justify-content: space-between!important;
    }
  }
`);

(function() {
  "use strict";

  const rsts = document.querySelector("#results");
  rsts ? (rsts.style.marginTop = 0) : null;
  const results = document.querySelectorAll(".result-default");
  // 垃圾站点过滤
  const keywordsFilter =
    /2345|\w+\d+\.com|天极|(绿色|软件|单机|游戏|资源|东坡|极速|极光)下载|游民星空|林志忆|全本小说网|UU看书|汉化|补丁|破解版|游侠网|(?:下载|软件)(?:中心|联盟|之家|大全|站)|(?:迴|回)向|痞客邦|偈|佛(?:学|學|經|理)|趣历史|(?:下载|导航|知识|百科)网|码农书籍网|系统之家|程序员大本营|小白|医疗国际|推广|凤楼|红灯区|桑拿|按摩|楼凤|葡京|牛牛|德州扑克|彩金|大额无忧|(?:真|成)人|完整资源|影院|在线播放|挖矿|矿机|链游|代币|吴师兄|五分钟学算法|的博客-程序员|程序员ITS.*|程序员信息|cxy(?:xiaowu|mm)/i;
  const urlFilter =
    /csdn\.net|(?:(?<!fanyi|naotu|wenku|pan|baike|tieba)\.baidu|2345|\w+01|d\d+-vision|developer\.aliyun|1024sou)\.(?:com|today)|(linkedin|duote|waerfa|zditect)\.com|wanghi\.cn|zol\.com\.cn|pchome\.net|pc6|downxia|yesky|downza|firefox.*cn|alixixi/;
  let count = 0;
  results.forEach((item) => {
    const itemText = item.querySelector("h3").innerText;
    const link = item.querySelector(".url_i1");
    link.style = "color:#31708f;font-weight:bold";
    if (
      /^http:/.test(link.innerText.trim()) &&
      !/\.gov\.cn$/.test(link.innerText.trim())
    ) {
      const warning = document.createElement("span");
      warning.innerText = "危";
      warning.style =
        "padding:1px 3px;border: 1px solid;border-radius: 4px;color: yellow;background: red";
      item.querySelector("h3").appendChild(warning);
    }
    if (
      item.contains(item.querySelector(".content.empty_element")) || //空白描述结果
      keywordsFilter.test(itemText) ||
      urlFilter.test(link.innerText) ||
      item.hasAttribute("blocknotice")
    ) {
      count++;
      item.style.display = "none";
      console.log(item.textContent);
      if (count === results.length) {
        const msg = document.createElement("p");
        msg.innerText = "没有搜索到有价值的结果!";
        msg.style = "text-align:center;line-height:40px;height:40px";
        rsts.appendChild(msg);
      }
      return;
    }
    item.querySelector(".url_o2").style = "overflow: unset";
  });
  // 搜索建议优化
  const sugTitle = document.querySelector("#suggestions h4");
  if (sugTitle) {
    sugTitle.innerText = "搜索建议";
  }
  const suggestions = document.querySelectorAll("#suggestions form");
  suggestions.forEach((item) => {
    if (keywordsFilter.test(item.lastElementChild.value)) {
      item.style.display = "none";
    } else {
      const suggestion = item.querySelector('input[name="q"]').value;
      item.lastElementChild.remove();
      const btn = document.createElement("button");
      btn.innerText = suggestion.replace(
        /(?<=[\u4e00-\u9fa5])\s|\s(?=[\u4e00-\u9fa5])/g,
        ""
      );
      btn.setAttribute("type", "submit");
      btn.setAttribute("class", "submit_btn");
      item.appendChild(btn);
    }
  });
  const pagination = document.querySelector("#pagination");
  if (pagination) {
    if (pagination.children.length > 1) {
      pagination.style.justifyContent = "space-between";
    } else {
      pagination.style.justifyContent = "center";
    }
  }
  // 自动完成点击后自动搜索
  const isAutolang = localStorage.getItem('autolang') === 'true' ? true : false;
  const q = document.querySelector("#q");
  let qValue = q.value.trim();
  function search(newQValue) {
    if (isAutolang) {
      if (/:zh|:en/.test(newQValue)) {
        if (qValue === newQValue) {
          return;
        }
        q.value = newQValue;
      } else if (/[\u4e00-\u9fa5]/.test(newQValue)) {
        q.value = newQValue + " :zh";
      } else {
        q.value = newQValue + " :en";
      }
      qValue = q.value.trim();
      document.querySelector("#send_search").click();
    } else {
      if (qValue !== newQValue) {
        qValue = q.value.trim();
        document.querySelector("#send_search").click();
      }
    }
  }
  window.addEventListener("click", () => {
    const newQValue = document.querySelector("#q").value.trim();
    if (newQValue) {
      search(newQValue);
    }
  });
  window.addEventListener("keydown", e => {
    const newQValue = document.querySelector("#q").value.trim();
    if (newQValue && e.key === 'Enter') {
      search(newQValue);
    }
  });

  q.addEventListener('click', e => {
    e.stopPropagation()
  });
  if (isAutolang) {
    GM_registerMenuCommand("中英自动切换已开启", function() {
      localStorage.setItem('autolang', false);
      console.log('中英切换已关闭，请刷新浏览器重新加载脚本')
    }, "a");
  } else {
    GM_registerMenuCommand("开启中英自动切换", function() {
      localStorage.setItem('autolang', true);
      console.log('中英切换已开启，请刷新浏览器重新加载脚本')
    }, "a");
  }
})();
