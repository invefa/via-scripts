// ==UserScript==
// @name         优化知乎体验
// @namespace    invefa.me
// @version      1.2.4
// @description  为手机用户优化知乎体验,个人使用的via浏览器完全支持该脚本
// @author       invefa
// @run-at       document-end
// @match        http*://*.zhihu.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/invefa/via-scripts/refs/heads/master/optimize_for_zhihu.js
// ==/UserScript==


(function () {
    'use strict';

    const enableHideUnnecessaryElements = true;
    const enableRemoveRedirectFromLinks = true;
    const enableClickCancelButton = false;
    const enableRestoreOverflow = true;

    function hideUnnecessaryElements() {
        const selectors = [
            ".MobileModal-wrapper",
            ".css-1gapyfo",
            ".css-wfkf2m",
            ".OpenInAppButton",
            ".KfeCollection-VipRecommendCard",
            ".oia-action-bar",
            ".css-1yun6kn",
            ".Post-Sub",
            ".MBannerAd",
            ".KfeCollection-VipRecommendCard",
            ".AdBelowMoreAnswers",
            ".HotQuestions",
            ".css-1yun6kn",
        ];

        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.style.display = 'none';
        });
    }

    function clickCancelButton() {
        const cancelButtonClass = ".css-fbcqx2 button.Button.Button--secondary";
        var cancelButton = document.querySelector(cancelButtonClass);
        if (cancelButton) cancelButton.click();
    }

    function restoreOverflow() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    function removeRedirectFromLinks() {
        var links = document.querySelectorAll('a');
        links.forEach(function (link) {
            const matchRule = /^https?:\/\/link\.zhihu\.com\/\?target=(.+)$/;
            var matchResult = link.href.match(matchRule);
            if (matchResult) link.href = decodeURIComponent(matchResult[1]);
        });
    }

    if (enableHideUnnecessaryElements) hideUnnecessaryElements();
    if (enableRemoveRedirectFromLinks) removeRedirectFromLinks();

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (enableHideUnnecessaryElements) hideUnnecessaryElements();
            if (enableRemoveRedirectFromLinks) removeRedirectFromLinks();
            if (enableClickCancelButton) clickCancelButton();
            if (enableRestoreOverflow) restoreOverflow();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // setInterval(clickCancelButton, 500);
})();
