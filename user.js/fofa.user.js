// ==UserScript==
// @name FOFA IP and Domain Extractor
// @namespace http://tampermonkey.net/
// @version 24.801.1624
// @description Extract IP addresses and domains from FOFA search results and display them at a specific location with a copy button
// @author zephyrus
// @match https://fofa.info/result*
// @match https://*.fofa.info/result*
// @grant GM_setClipboard
// ==/UserScript==

(function () {
  "use strict";

  // Create a MutationObserver instance
  let observer = new MutationObserver(function (mutations) {
    // Check if the target element exists
    let targetElement = document.querySelector(
      "div#__layout > div > div.contentContainer.resultIndex > div:nth-child(1) > div.relatedSearch.relatedSearch-padding"
    );

    if (targetElement) {
      // If the target element exists, stop observing
      observer.disconnect();

      // Check if the IP display has already been inserted
      if (document.getElementById("ipDisplay")) {
        return;
      }

      // Extract the IP addresses and domains
      let elements = [
        ...document.querySelectorAll(
          ".hsxa-meta-data-list .hsxa-meta-data-list-lv1-lf span.hsxa-copy-btn"
        ),
      ]
        .map((e) => e.dataset.clipboardText)
        .reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, []);

      let ipList = elements.join(",");

      // Create a new element to display the IP addresses
      let ipDisplay = document.createElement("div");
      ipDisplay.id = "ipDisplay";
      ipDisplay.textContent = ipList;
      ipDisplay.style =
        "margin-top: 10px; word-wrap: break-word; background-color: #333; color: #fff; padding: 10px; border-radius: 5px; font-size: 14px; width: 85%; margin-left: 7.5%; margin-right: 7.5%;";

      // Create a copy button for IPs
      let copyButtonIPs = document.createElement("button");
      copyButtonIPs.textContent = "Copy";
      copyButtonIPs.style =
        "margin-left: 10px; background-color: #007bff; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;";
      copyButtonIPs.onclick = function () {
        GM_setClipboard(ips);
        alert("IPs copied to clipboard!");
      };

      // Add the copy buttons to the displays
      ipDisplay.appendChild(copyButtonIPs);

      // Insert the new elements before the target element
      targetElement.parentNode.insertBefore(ipDisplay, targetElement);
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });
})();
