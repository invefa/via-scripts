// ==UserScript==
// @name         优化知乎体验
// @namespace    invefa.me
// @version      1.2.7.3
// @description  为手机用户优化知乎体验,个人使用的via浏览器完全支持该脚本
// @author       invefa
// @run-at       document-end
// @match        http*://*.zhihu.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/invefa/via-scripts/refs/heads/master/optimize_for_zhihu.js
// ==/UserScript==


(function () {
    'use strict';

    const isPhone =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent);

    const enableHideUnnecessaryElements = true;
    const enableRemoveRedirectFromLinks = true;
    const enableClickCancelButton = false;
    const enableRestoreOverflow = true;

    if (!isPhone) return;

    function hideUnnecessaryElements() {
        const selectors = [
            ".KfeCollection-VipRecommendCard",
            ".MobileModal-wrapper",
            ".AdBelowMoreAnswers",
            ".OpenInAppButton",
            ".oia-action-bar",
            ".HotQuestions",
            ".css-1gapyfo",
            ".css-1yun6kn",
            ".css-wfkf2m",
            ".MBannerAd",
            ".Post-Sub",
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

})();
