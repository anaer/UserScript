// ==UserScript==
// @name         Github 增强 - 高速下载
// @name:zh-CN   Github 增强 - 高速下载
// @name:zh-TW   Github 增强 - 高速下载
// @name:en      Github Enhancement - High Speed Download
// @version      2024.06.17.1556
// @author       X.I.U
// @description  高速下载 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)
// @description:zh-CN  高速下载 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)
// @description:zh-TW  高速下载 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)
// @description:en  High-speed download of Git Clone/SSH, Release, Raw, Code(ZIP) and other files, project list file quick download (☁)
// @match        *://github.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        window.onurlchange
// @license      GPL-3.0 License
// @run-at       document-end
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @namespace    https://greasyfork.org/scripts/412245
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function () {
    'use strict';
    var backColor = '#ffffff', fontColor = '#888888', menu_raw_fast = GM_getValue('xiu2_menu_raw_fast'), menu_menu_raw_fast_ID, menu_feedBack_ID;
    var aria2c = 'aria2c -d . --check-certificate=false --max-connection-per-server=5 --max-concurrent-downloads=10 --split=10 --min-split-size=1M --continue=true --optimize-concurrent-downloads=true --connect-timeout=3 --timeout=5 --lowest-speed-limit=10K --allow-overwrite=true ';
    const download_url = [
        ['https://github.com', '官方', '默认第一个'],
        ['https://hub.whtrys.space', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://git.988896.xyz/https://github.com', '网络', ''],
        ['https://raw.bunnyxyz.eu.org/https://github.com', '网络', ''],
        ['https://cf.ghproxy.cc/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@yionchiii lau] 提供'],
        ['https://cors.isteed.cc/github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@Lufs\'s] 提供'],
        ['https://dl.ghpig.top/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [feizhuqwq.com] 提供'],
        ['https://download.nuaa.cf', '美国', '[美国 洛杉矶] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://download.scholar.rr.nu', '美国', '[美国 纽约] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://download.yzuu.cf', '美国', '[美国 纽约] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://gh.con.sh/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [佚名] 提供'],
        ['https://gh.ddlc.top/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@mtr-static-official] 提供'],
        ['https://gh.jiasu.in/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@0-RTT] 提供'],
        ['https://gh.mixyun.cyou/https://github.com', '网络', ''],
        ['https://gh.mzec.top/https://github.com', '网络', ''],
        ['https://gh.nxnow.top/https://github.com', '网络', ''],
        ['https://ghproxy.053000.xyz/https://github.com', '网络', ''],
        ['https://ghproxy.cc/https://github.com', '美国', '[美国 洛杉矶] - 该公益加速源由 [@yionchiii lau] 提供'],
        ['https://ghproxy.liuzhicong.com/https://github.com', '网络', ''],
        ['https://ghproxy.net/https://github.com', '日本', '[日本 大阪] - 该公益加速源由 [ghproxy] 提供&#10;&#10;提示：希望大家尽量多使用前面的美国节点（每次随机 负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力，公益才能更持久~'],
        ['https://git.814560.xyz/https://github.com', '网络', ''],
        ['https://git.domob.org/https://github.com', '网络', ''],
        ['https://hub.gitmirror.com/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [GitMirror] 提供'],
        ['https://mirror.ghproxy.com/https://github.com', '韩国', '[日本、韩国、德国等]（CDN 不固定） - 该公益加速源由 [ghproxy] 提供&#10;&#10;提示：希望大家尽量多使用前面的美国节点（每次随机 负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力，公益才能更持久~'],
        ['https://sciproxy.com/github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [sciproxy.com] 提供'],
        ['https://slink.ltd/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [知了小站] 提供'],
        ['https://ghps.cc', '网络', ''],
        ['https://521github.com', '网络', ''],
        ['https://gh.900110.xyz/https://github.com', '网络', ''],
        // ['https://gh.h233.eu.org/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@X.I.U/XIU2] 提供'],
        // ['https://www.subook.link:88/https://github.com', '网络', ''],
        // ['https://shrill-pond-3e81.hunsh.workers.dev/https://github.com', '网络', ''],
        // ['https://git.xfj0.cn/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [佚名] 提供'],
        // ['https://kkgithub.com', '香港', '[香港、日本、新加坡等]'],
    ], clone_url = [
        ['https://ghproxy.com/https://github.com', '韩国', '[韩国 首尔] - 该公益加速源由 [ghproxy] 提供，有不同地区的服务器，不过国内一般分配为韩国'],
    ], clone_ssh_url = [
        ['git@ssh.fastgit.org', '香港', '[中国 香港] - 该公益加速源由 [FastGit] 提供'],
    ], raw_url = [
        ['https://git.988896.xyz/https://raw.githubusercontent.com', '网络', ''],
        ['https://ghps.cc/https://raw.githubusercontent.com', '网络', ''],
        ['https://raw.bunnyxyz.eu.org/https://raw.githubusercontent.com', '网络', ''],
        ['https://cf.ghproxy.cc/https://raw.githubusercontent.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@yionchiii lau] 提供'],
        ['https://jsd.cdn.zzko.cn/gh', '网络 3', '无缓存'], 
        ['https://jsd.onmicrosoft.cn/gh', '网络 2', '无缓存'], 
        ['https://hub.incept.pw', '网络', ''],
        ['https://fastraw.ixnic.net', '日本 3', '[日本 大阪] - 该公益加速源由 [FastGit 群组成员] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://ghproxy.net/https://raw.githubusercontent.com', '日本 4', '[日本 大阪]&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://github.moeyy.xyz/https://raw.githubusercontent.com', '其他 3', '[新加坡、中国香港、日本等]（CDN 不固定）&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://mirror.ghproxy.com/https://raw.githubusercontent.com', '韩国', '[日本、韩国、德国等]（CDN 不固定） - 该公益加速源由 [ghproxy] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://cdn.jsdelivr.us/gh', '其他 1', '[韩国、美国、马来西亚、罗马尼亚等]（CDN 不固定） - 该公益加速源由 [@ayao] 提供&#10;&#10; - 缓存：有'],
        ['https://fastly.jsdelivr.net/gh', '日本 2', '[日本 东京] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        ['https://gcore.jsdelivr.net/gh', '其他 1', '[移动走香港、电信走日本] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        ['https://testingcf.jsdelivr.net/gh', '其他 1', '[移动走香港、电信走日本] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        ['https://cdn.jsdelivr.net/gh', '其他 1', '[移动走香港、电信走日本] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        ['https://raw.cachefly.998111.xyz', '其他 4', '[新加坡、日本、印度等]（Anycast CDN 不固定） - 该公益加速源由 [@XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX0] 提供&#10;&#10; - 缓存：有（约 12 小时）'],
        ['https://raw.githubusercontent.com', 'Github 原生', '[日本 东京]'],
        // ['https://jsdelivr.b-cdn.net/gh', '其他 2', '[香港、台湾、日本、新加坡等]（CDN 不固定） - 该公益加速源由 [rttwyjz] 提供&#10;&#10; - 缓存：有'], // 500
        // ['https://raw.kkgithub.com', '香港', '[中国香港、日本、新加坡等] - 该公益加速源由 [help.kkgithub.com] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        // ['https://www.subook.link:88/https://raw.githubusercontent.com', '网络', ''],
        // ['https://shrill-pond-3e81.hunsh.workers.dev/https://raw.githubusercontent.com', '网络', ''],
        // ['https://p.ntnas.top/https://raw.githubusercontent.com', '网络', ''],
    ], svg = [
        '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>'
    ], style = ['padding:0 6px; margin-right: -1px; border-radius: 2px; background-color: var(--XIU2-back-Color); border-color: rgba(27, 31, 35, 0.1); font-size: 11px; color: var(--XIU2-font-Color);'];

    if (menu_raw_fast == null) { menu_raw_fast = 1; GM_setValue('xiu2_menu_raw_fast', 1); };
    registerMenuCommand();
    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_feedBack_ID) { // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_menu_raw_fast_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_raw_fast = GM_getValue('xiu2_menu_raw_fast');
        }
        if (menu_raw_fast > raw_url.length - 1) { // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
            menu_raw_fast = 0;
        }
        menu_menu_raw_fast_ID = GM_registerMenuCommand(`${menu_num(menu_raw_fast)} [ ${raw_url[menu_raw_fast][1]} ] 加速源 (☁) - 点击切换`, menu_toggle_raw_fast);
        menu_feedBack_ID = GM_registerMenuCommand('💬 反馈 & 建议 [Github]', function () { window.GM_openInTab('https://github.com/XIU2/UserScript', { active: true, insert: true, setParent: true }); window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412245/feedback', { active: true, insert: true, setParent: true }); });
    }

    // 切换加速源
    function menu_toggle_raw_fast() {
        // 如果当前加速源位置大于等于加速源总数，则改为第一个加速源，反之递增下一个加速源
        if (menu_raw_fast >= raw_url.length - 1) { menu_raw_fast = 0; } else { menu_raw_fast += 1; }
        GM_setValue('xiu2_menu_raw_fast', menu_raw_fast);
        delRawDownLink(); // 删除旧加速源
        addRawDownLink(); // 添加新加速源
        GM_notification({ text: "已切换加速源为：" + raw_url[menu_raw_fast][1], timeout: 3000 }); // 提示消息
        registerMenuCommand(); // 重新注册脚本菜单
    };

    // 菜单数字图标
    function menu_num(num) {
        return ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][num];
    }

    colorMode(); // 适配白天/夜间主题模式
    if (location.pathname.indexOf('/releases')) addRelease(); // Release 加速
    setTimeout(addRawFile, 2000); // Raw 加速
    setTimeout(addRawDownLink, 2000); // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉


    // Tampermonkey v4.11 版本添加的 onurlchange 事件 grant，可以监控 pjax 等网页的 URL 变化
    if (window.onurlchange === undefined) addUrlChangeEvent();
    window.addEventListener('urlchange', function () {
        colorMode(); // 适配白天/夜间主题模式
        if (location.pathname.indexOf('/releases')) addRelease(); // Release 加速
        setTimeout(addRawFile, 2000); // Raw 加速
        setTimeout(addRawDownLink, 2000); // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉
        setTimeout(addRawDownLink_, 2000); // 在浏览器返回/前进时重新添加 Raw 下载链接（☁）鼠标事件
    });

    // Github Git Clone/SSH、Release、Download ZIP 改版为动态加载文件列表，因此需要监控网页元素变化
    const callback = (mutationsList, observer) => {
        if (location.pathname.indexOf('/releases') > -1) { // Release
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType !== 1) return;
                    if (target.tagName === 'DIV' && target.dataset.viewComponent === 'true' && target.classList[0] === 'Box') addRelease();
                }
            }
        } else if (document.querySelector('#repository-container-header:not([hidden])')) { // 项目首页
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType !== 1) return;
                    if (target.tagName === 'DIV' && target.parentElement && target.parentElement.id === '__primerPortalRoot__') {
                        addDownloadZIP(target);
                        addGitClone(target);
                        addGitCloneSSH(target);
                    } else if (target.tagName === 'DIV' && target.className.indexOf('Box-sc-') != -1) {
                        if (target.querySelector('input[value^="https:"]')) {
                            addGitCloneClear('.XIU2-GCS'); addGitClone(target);
                        } else if (target.querySelector('input[value^="git@"]')) {
                            addGitCloneClear('.XIU2-GC'); addGitCloneSSH(target);
                        } else if (target.querySelector('input[value^="gh "]')) {
                            addGitCloneClear('.XIU2-GC, .XIU2-GCS');
                        }
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });

    // Release
    function addRelease() {
        let html = document.querySelectorAll('.Box-footer'); if (html.length == 0 || location.pathname.indexOf('/releases') == -1) return;
        let divDisplay = 'margin-left: -90px;';
        if (document.documentElement.clientWidth > 755) { divDisplay = 'margin-top: -3px;margin-left: 8px;display: inherit;'; }; // 调整小屏幕时的样式
        for (const current of html) {
            if (current.querySelector('.XIU2-RS')) continue;
            current.querySelectorAll('li.Box-row a').forEach(function (_this) {
                let href = _this.href.split(location.host), url = '', _html = `<div class="XIU2-RS" style="${divDisplay}">`;

                let aria2 = aria2c;
                for (let i = 0; i < download_url.length; i++) {
                    if (download_url[i][3] !== undefined && url.indexOf('/archive/') !== -1) {
                        url = download_url[i][3] + href[1];
                    } else {
                        url = download_url[i][0] + href[1];
                    }

                    if (location.host !== 'github.com') url = url.replace(location.host, 'github.com');

                    aria2 = aria2 + ' ' + url;

                    if (i < 3) {
                        _html += `<a style="${style[0]}" class="btn" href="${url}" title="${download_url[i][2]}" rel="noreferrer noopener nofollow">${download_url[i][1]}</a>`;
                    }
                }

                _html += `<clipboard-copy value="${aria2}" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton" tabindex="0" role="button">复制aria2链接</clipboard-copy>`;

                _this.parentElement.nextElementSibling.insertAdjacentHTML('beforeend', _html + '</div>');
            });
        }
    }


    // Download ZIP
    function addDownloadZIP(target) {
        let html = target.querySelector('ul[class^=List__ListBox-sc-] ul[class^=List__ListBox-sc-]>li:last-child'); if (!html) return;
        let href_script = document.querySelector('react-partial[partial-name=repos-overview]>script[data-target="react-partial.embeddedData"]'), 
            href_slice = href_script.textContent.slice(href_script.textContent.indexOf('"zipballUrl":"') + 14),
            href = href_slice.slice(0, href_slice.indexOf('"')), 
            url = '', _html = ''

        // 克隆原 Download ZIP 元素，并定位 <a> <span> 标签
        let html_clone = html.cloneNode(true),
            html_clone_a = html_clone.querySelector('a[href$=".zip"]'),
            html_clone_span = html_clone.querySelector('span[id]');

        for (let i = 0; i < download_url.length && i < 5; i++) { // 限制最多5个下载源
            if (download_url[i][3] === '') continue;

            if (download_url[i][3] !== undefined) {
                url = download_url[i][3] + href;
            } else {
                url = download_url[i][0] + href;
            }
            if (location.host !== 'github.com') url = url.replace(location.host, 'github.com');
            html_clone_a.href = url
            html_clone_a.setAttribute('title', download_url[i][2].replaceAll('&#10;','\n'))
            html_clone_span.textContent = 'Download ZIP ' + download_url[i][1]
            _html += html_clone.outerHTML
        }
        html.insertAdjacentHTML('afterend', _html);
    }

    // Git Clone 切换清理
    function addGitCloneClear(css) {
        document.querySelectorAll(css).forEach((e) => { e.remove(); });
    }

    // Git Clone
    function addGitClone(target) {
        let html = target.querySelector('input[value^="https:"]'); if (!html) return;
        let href_split = html.value.split(location.host)[1], 
            html_parent = '<div style="margin-top: 4px;" class="XIU2-GC ' + html.parentElement.className + '">', 
            url = '', _html = '', _gitClone = '';
        html.nextElementSibling.hidden = true; // 隐藏右侧复制按钮
        if (GM_getValue('menu_gitClone')) { _gitClone = 'git clone '; html.value = _gitClone + html.value; html.setAttribute('value', html.value); }
        for (let i = 0; i < clone_url.length; i++) {
            if (clone_url[i][0] === 'https://gitclone.com') {
                url = _gitClone + clone_url[i][0] + '/github.com' + href_split;
            } else {
                url = _gitClone + clone_url[i][0] + href_split;
            }
            let html_clone = html.cloneNode(true);
            html_clone.title = `加速源：${clone_url[i][1]} （点击可直接复制）`;
            html_clone.setAttribute('value', url);
            _html += html_parent + html_clone.outerHTML + '</div>';
        }
        html.parentElement.insertAdjacentHTML('afterend', _html);
    }


    // Git Clone SSH
    function addGitCloneSSH(target) {
        let html = target.querySelector('input[value^="git@"]'); if (!html) return;
        let href_split = html.value.split(':')[1], html_parent = '<div style="margin-top: 4px;" class="XIU2-GCS ' + html.parentElement.className + '">', url = '', _html = '', _gitClone = '';
        html.nextElementSibling.hidden = true; // 隐藏右侧复制按钮
        if (GM_getValue('menu_gitClone')) { _gitClone = 'git clone '; html.value = _gitClone + html.value; html.setAttribute('value', html.value); }
        for (let i = 0; i < clone_ssh_url.length; i++) {
            url = _gitClone + clone_ssh_url[i][0] + href_split;
            let html_clone = html.cloneNode(true);
            html_clone.title = `加速源：${clone_ssh_url[i][1]} （点击可直接复制）`;
            html_clone.setAttribute('value', url);
            _html += html_parent + html_clone.outerHTML + '</div>';
        }
        html.parentElement.insertAdjacentHTML('afterend', _html);
    }


    // Raw
    function addRawFile() {
        if (document.querySelector('.XIU2-RF')) return;
        let html = document.querySelector('#raw-url, a[data-testid="raw-button"]'); if (!html) return;
        let href = location.href.replace(`https://${location.host}`, ''), href2 = href.replace('/blob/', '/'), url = '', _html = '';

        let aria2 = aria2c;
        for (let i = 0; i < raw_url.length; i++) {
            if ((raw_url[i][0].indexOf('/gh') + 3 === raw_url[i][0].length) && raw_url[i][0].indexOf('cdn.staticaly.com') === -1) {
                url = raw_url[i][0] + href.replace('/blob/', '@');
            } else {
                url = raw_url[i][0] + href2;
            }
            aria2 = aria2 + ' ' + url;
        }

        _html += `<clipboard-copy value="${aria2}" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton XIU2-RF" tabindex="0" role="button">复制aria2链接</clipboard-copy>`;
        html.insertAdjacentHTML('afterend', _html);
    }


    // Raw 单文件快捷下载（☁）
    function addRawDownLink() {
        // 如果不是项目文件页面，就返回，如果网页有 Raw 下载链接（☁）就返回
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file'); if (files.length === 0) return; if (location.pathname.indexOf('/tags') > -1) return;
        let files1 = document.querySelectorAll('a.fileDownLink'); if (files1.length > 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function (evt) {
            let elem = evt.currentTarget, aElm_new = elem.querySelectorAll('.fileDownLink'), aElm_now = elem.querySelectorAll('svg.octicon.octicon-file');
            aElm_new.forEach(el => { el.style.cssText = 'display: inline'; });
            aElm_now.forEach(el => { el.style.cssText = 'display: none'; });
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function (evt) {
            let elem = evt.currentTarget, aElm_new = elem.querySelectorAll('.fileDownLink'), aElm_now = elem.querySelectorAll('svg.octicon.octicon-file');
            aElm_new.forEach(el => { el.style.cssText = 'display: none'; });
            aElm_now.forEach(el => { el.style.cssText = 'display: inline'; });
        };

        // 循环添加
        files.forEach(function (fileElm, i) {
            let trElm = fileElm.parentNode.parentNode, cntElm_a = trElm.querySelector('[role="rowheader"] > .css-truncate.css-truncate-target.d-block.width-fit > a'), cntElm_svg = trElm.querySelector('.mr-3.flex-shrink-0 svg.octicon.octicon-file'), Name = cntElm_a.innerText, href = cntElm_a.getAttribute('href'), href2 = href.replace('/blob/', '/'), url, url_name, url_tip = '';
            if ((raw_url[menu_raw_fast][0].indexOf('/gh') + 3 === raw_url[menu_raw_fast][0].length) && raw_url[menu_raw_fast][0].indexOf('cdn.staticaly.com') === -1) {
                url = raw_url[menu_raw_fast][0] + href.replace('/blob/', '@');
            } else {
                url = raw_url[menu_raw_fast][0] + href2;
            }

            url_name = raw_url[menu_raw_fast][1]; url_tip = raw_url[menu_raw_fast][2];
            cntElm_svg.insertAdjacentHTML('afterend', `<a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;" title="「${url_name}」&#10;&#10;[Alt + 左键] 或 [右键 - 另存为...] 下载文件。&#10;注意：鼠标点击 [☁] 图标，而不是左侧的文件名！&#10;&#10;${url_tip}提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ ${raw_url[menu_raw_fast][1]} ] 加速源 (☁) 即可切换。">${svg[0]}</a>`);
            // 绑定鼠标事件
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 移除 Raw 单文件快捷下载（☁）
    function delRawDownLink() {
        let aElm = document.querySelectorAll('.fileDownLink'); if (aElm.length === 0) return;
        aElm.forEach(function (fileElm) { fileElm.remove(); });
    }


    // 在浏览器返回/前进时重新添加 Raw 单文件快捷下载（☁）鼠标事件
    function addRawDownLink_() {
        // 如果不是项目文件页面，就返回，如果网页没有 Raw 下载链接（☁）就返回
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file'); if (files.length === 0) return;
        let files1 = document.querySelectorAll('a.fileDownLink'); if (files1.length === 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function (evt) {
            let elem = evt.currentTarget, aElm_new = elem.querySelectorAll('.fileDownLink'), aElm_now = elem.querySelectorAll('svg.octicon.octicon-file');
            aElm_new.forEach(el => { el.style.cssText = 'display: inline'; });
            aElm_now.forEach(el => { el.style.cssText = 'display: none'; });
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function (evt) {
            let elem = evt.currentTarget, aElm_new = elem.querySelectorAll('.fileDownLink'), aElm_now = elem.querySelectorAll('svg.octicon.octicon-file');
            aElm_new.forEach(el => { el.style.cssText = 'display: none'; });
            aElm_now.forEach(el => { el.style.cssText = 'display: inline'; });
        };

        // 循环添加
        files.forEach(function (fileElm, i) {
            let trElm = fileElm.parentNode.parentNode;
            // 绑定鼠标事件
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 适配白天/夜间主题模式
    function colorMode() {
        let style_Add;
        if (document.getElementById('XIU2-Github')) { style_Add = document.getElementById('XIU2-Github'); } else { style_Add = document.createElement('style'); style_Add.id = 'XIU2-Github'; style_Add.type = 'text/css'; }
        backColor = '#ffffff'; fontColor = '#888888';

        if (document.getElementsByTagName('html')[0].getAttribute('data-color-mode') === 'dark') { // 如果是夜间模式
            if (document.getElementsByTagName('html')[0].getAttribute('data-dark-theme') === 'dark_dimmed') {
                backColor = '#272e37'; fontColor = '#768390';
            } else {
                backColor = '#161a21'; fontColor = '#97a0aa';
            }
        } else if (document.getElementsByTagName('html')[0].getAttribute('data-color-mode') === 'auto') { // 如果是自动模式
            if (window.matchMedia('(prefers-color-scheme: dark)').matches || document.getElementsByTagName('html')[0].getAttribute('data-light-theme').indexOf('dark') > -1) { // 如果浏览器是夜间模式 或 白天模式是 dark 的情况
                if (document.getElementsByTagName('html')[0].getAttribute('data-dark-theme') === 'dark_dimmed') {
                    backColor = '#272e37'; fontColor = '#768390';
                } else if (document.getElementsByTagName('html')[0].getAttribute('data-dark-theme').indexOf('light') == -1) { // 排除夜间模式是 light 的情况
                    backColor = '#161a21'; fontColor = '#97a0aa';
                }
            }
        }

        document.lastElementChild.appendChild(style_Add).textContent = `.XIU2-RS a {--XIU2-back-Color: ${backColor}; --XIU2-font-Color: ${fontColor};}`;
    }


    // 自定义 urlchange 事件（用来监听 URL 变化），针对非 Tampermonkey 油猴管理器
    function addUrlChangeEvent() {
        history.pushState = (f => function pushState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.pushState);

        history.replaceState = (f => function replaceState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.replaceState);

        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('urlchange'));
        });
    }
})();
