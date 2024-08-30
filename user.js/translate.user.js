/* globals Vue */
// ==UserScript==
// @name         智能划词翻译
// @namespace    translate.xinggsf
// @version      24.830.958
// @description  划词翻译。谷歌翻译和有道词典双引擎；CTRL + ?翻译剪贴板
// @author       xinggsf  田雨菲
// @include      http*
// @include      file://*
// @exclude      https://nnyy.in/*
// @exclude      https://www.dandanzan.net/*
// @exclude      https://www.dandanzan.com/*
// @run-at       document-body
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdn.staticfile.org/vue/2.6.11/vue.min.js
// @connect      121.43.55.188
// @connect      47.99.104.56
// @connect      translate.googleapis.com
// @downloadURL https://update.greasyfork.org/scripts/41076/%E6%99%BA%E8%83%BD%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91.user.js
// @updateURL https://update.greasyfork.org/scripts/41076/%E6%99%BA%E8%83%BD%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91.meta.js
// ==/UserScript==

"use strict";
const googleUrl =
  "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&dt=bd&dj=1&source=input&hl=zh-CN&sl=auto&tl=";
// http://121.43.55.188:1188/translate
const deeplxUrl = "http://47.99.104.56/translate";
const reHZ = /^[\u4E00-\u9FA5\uFF00-\uFF20\u3000-\u301C]/;

const g_svg =
  '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo AAB1MAAA6mAAADqYAAAXcJy6UTwAAAEXUExURQAAAP7+/v39/f39/f39/f39/f39/f////////39 /f7+/v39/f39/f39/f39/f39/f39/f39/f7+/v39/f39/f////////75+faspe5pXetKPOpHOu5m WvWpov3q6O5jWOpDNfB2bO1iVutJO/SclfrSz/rU0fSdlu1eUvzj4fvPkuxSN+pGOPrU0P/9/fzJ NfmyCvaka/u+C/u8Bf7stkKF9Huq9/u9Cv7rtXWm9/HELO28EbDRjYKu+I21+M3WiUiqSziqVs7q 1djm/UaH9MPY/Pn8+le3cTSoUzqqWJHQoszp1M7q1pvUqkqjmUGG8Ged9v7+/+n17Fi3cVivjujw /vn9+qfZtF26djqrWFm4cp3VrPb7+Iuoq/wAAAAWdFJOUwAymdv62pgwCp0Jw8GW2PnXlC6Vvwhl LiriAAAAAWJLR0QHFmGI6wAAAAd0SU1FB+gIHAk2OcW0slsAAADOSURBVBjTPY/pVoJQFIWPgBCo 4LixySw1zdQspdLSRk2ch8zM3v85vBfB78dZZ+91RiKGTxAlyS8rtONAhYugOToAM3l4dHxyaiLI HRWps7TDOSCzfpgX6Uw2d5kvXLEuhQQUr0tlPqHCQ4hE3FRvsUcnCXe1Ossszj0MZjzUHj2jwQw/ mk/Pu/KW1UaYZLy8vr1z/fFpdRAhBd2vnt0fDEfjyXSGKLG980XP4XuJGLtUC+Jn9bu2/zb/iCf4 M5rgHRFLuP8qId0wwpEoz7eIzR2QKLmXUwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wOC0yOFQw OTo1NDo1NyswMDowMIzd0cUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDgtMjhUMDk6NTQ6NTcr MDA6MDD9gGl5AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTA4LTI4VDA5OjU0OjU3KzAwOjAw qpVIpgAAAABJRU5ErkJggg=="/></svg>';

const d_svg =
  '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo AAB1MAAA6mAAADqYAAAXcJy6UTwAAABvUExURQAAABArRRAsSA8rRw8rRhAwSBAwUA4rRg4rRw4s Rw8sRhApRw8rRg8rRxAoSBArRg8sRhArRRArSA8rRi1GXVpuf8PK0f///2l7i3iIlrS9xYeVo/Dy 9HiIl3iHl5ajrh45UUtgdNLX3aWvueHl6CGOdagAAAATdFJOUwBgQL/fIBCPn2/vcO/fIKCvMGD7 86y1AAAAAWJLR0QXC9aYjwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gIHAoAMDcyJdMA AAB5SURBVBjTVc/rEoIgEAVgvFsJqatgaYWX939Gd44Ycv7A+WbYYYU4EkXimjghSrN/zQtCSke3 O3U9JH0A+KbNAKlOeL31CDmBM+jpEwB9zc+D7efFztaDNqv1MyQP3Tp0CVBPN4Vq5b7aSPTrOi1T GazH72IRRuU4drWrCnc+CDVgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA4LTI4VDEwOjAwOjQ4 KzAwOjAw1BlGFAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wOC0yOFQxMDowMDo0OCswMDowMKVE /qgAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDgtMjhUMTA6MDA6NDgrMDA6MDDyUd93AAAA AElFTkSuQmCC"/></svg>';

const countOfWord = (s) => (s ? s.split(/\s+/).length : 0);
const isChina = (s) => reHZ.test(s);
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
const xfetch = (url, type = "json") =>
  new Promise((success, fail) => {
    GM_xmlhttpRequest({
      method: "GET",
      timeout: 3000,
      url: url,
      responseType: type,
      onload: success,
      onerror: fail,
      ontimeout: fail,
    });
  });

const xpost = (url, data = {}) =>
  new Promise((success, fail) => {
    GM_xmlhttpRequest({
      method: "POST",
      timeout: 3000,
      url: url,
      data: data,
      responseType: "json",
      onload: success,
      onerror: fail,
      ontimeout: fail,
    });
  });

const comTranslate = {
  template: `<div class="gm-gg-yd-translate" height="0">
		<span class="icon" v-show="selText.length" :style="setPositionStyle" @click="doClick" @mousedown.stop.prevent @mouseup.stop.prevent>
		<svg style="margin:4px!important;" viewBox="0 0 768 768">
			<path d="M672 640.5v-417c0-18-13.5-31.5-31.5-31.5h-282l37.5 129h61.5v-33h34.5v33h115.5v33h-40.5c-10.5 40.5-33 79.5-61.5 112.5l87 85.5-22.5 24-87-85.5-28.5 28.5 25.5 88.5-64.5 64.5h225c18 0 31.5-13.5 31.5-31.5zM447 388.5c7.5 15 19.5 34.5 36 54 39-46.5 49.5-88.5 49.5-88.5h-127.5l10.5 34.5h31.5zM423 412.5l19.5 70.5 18-16.5c-15-16.5-27-34.5-37.5-54zM355.5 339c0-7.381-0.211-16.921-3-22.5h-126v49.5h70.5c-4.5 19.5-24 48-67.5 48-42 0-76.5-36-76.5-78s34.5-78 76.5-78c24 0 39 10.5 48 19.5l3 1.5 39-37.5-3-1.5c-24-22.5-54-34.5-87-34.5-72 0-130.5 58.5-130.5 130.5s58.5 130.5 130.5 130.5c73.5 0 126-52.5 126-127.5zM640.5 160.5c34.5 0 63 28.5 63 63v417c0 34.5-28.5 63-63 63h-256.5l-31.5-96h-225c-34.5 0-63-28.5-63-63v-417c0-34.5 28.5-63 63-63h192l28.5 96h292.5z" style="fill:#3e84f4;"></path>
		</svg>
		</span>
		<div class="tip" v-if="resultDOM.length" v-html="resultDOM" :style="setPositionStyle" @mouseup.stop></div>
	</div>`,
  data() {
    return {
      selText: "",
      resultDOM: "",
      position: { left: 0, top: 0 },
    };
  },
  methods: {
    showResult(text) {
      //显示翻译文本
      if (!this.resultDOM) this.resultDOM = text;
      else this.resultDOM += "<br><hr>" + text;
    },
    query() {
      const enc = encodeURIComponent(this.selText);
      const url =
        googleUrl + (isChina(this.selText) ? "en&q=" : "zh-CN&q=") + enc;

      xfetch(url)
        .then((r) => {
          const ra = r.response.sentences; // 翻译结果数组
          if (ra)
            this.showResult(g_svg + " " + ra.map((s) => s.trans).join(""));
        })
        .catch((e) => {
          this.showResult("谷歌服务器连接失败");
        });

      var data = JSON.stringify({
        text: this.selText,
        source_lang: "auto",
        target_lang: isChina(this.selText) ? "EN" : "ZH",
      });
      xpost(deeplxUrl, data)
        .then((r) => {
          const ra = r.response;
          console.log(deeplxUrl, data, ra);
          let msg = d_svg + " " + ra.data;
          if (ra.alternatives) msg += "<br>" + ra.alternatives.map((s) => s).join("<br>");
          this.showResult(msg);
        })
        .catch((e) => {
          this.showResult("DeepLX服务器连接失败");
        });

      this.selText = ""; // hide icon
    },
    async doClick(ev) {
      this.selText = this.selText.trim().replace(/\s{2,}/g, " ");
      if (!this.selText) return;
      this.position.top = Math.min(this.position.top, window.innerHeight - 168);
      this.position.left = Math.min(
        this.position.left,
        window.innerWidth - 450
      );
      this.query();
    },
  },
  computed: {
    setPositionStyle() {
      return `left:${this.position.left}px;top:${this.position.top}px;`;
    },
  },
  mounted() {
    document.addEventListener("mouseup", async (ev) => {
      this.resultDOM = "";
      this.position.left = ev.clientX;
      this.position.top = ev.clientY + 12;
      this.selText = String(window.getSelection())
        .trim()
        .replace(/\s{2,}/g, " ");
      if (this.selText) {
        await sleep(2000);
        this.selText = "";
      }
    });
  },
};

GM_addStyle(`.gm-gg-yd-translate > .tip {
	position:fixed;
	z-index:21474836466 !important;
	font-size:13px!important;
	overflow:auto!important;
	background:#fff!important;
	font-family:sans-serif,Arial!important;
	font-weight:normal!important;
	text-align:left!important;
	color:#000!important;
	padding:0.5em 1em!important;
	line-height:1.5em!important;
	border-radius:5px!important;
	border:1px solid #ccc!important;
	box-shadow:4px 4px 8px #888!important;
	max-width:450px!important;
	max-height:333px!important;
}
.gm-gg-yd-translate > .icon {
	position:fixed;
	z-index:21474836466 !important;
	width:32px!important;
	height:32px!important;
	background:#fff!important;
	border-radius:50%!important;
	box-shadow:4px 4px 8px #888!important;
}`);

const vm = new Vue({
  render: (h) => h(comTranslate),
}).$mount();
document.documentElement.appendChild(vm.$el);
