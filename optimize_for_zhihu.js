// ==UserScript==
// @name         优化知乎体验
// @namespace    invefa.me
// @version      1.2.7.8
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

        const disableVipRecommendCard = true;
        const disableOpenInAppButton = true;
        const disableHotQuestions = true;
        const disableVoteButtons = true;
        const disableUpperBanner = true;
        const disableUpDownGap = true;
        const disableNoisyBox = true;
        const disablePostSub = true;
        const disableDownBar = true;
        const disableAds = true;

        const selectors = [];

        if (disableVipRecommendCard) selectors.push(".KfeCollection-VipRecommendCard");
        if (disableOpenInAppButton) selectors.push(".OpenInAppButton");
        if (disableHotQuestions) selectors.push(".Card.HotQuestions");
        if (disableUpperBanner) selectors.push(".css-wfkf2m");
        if (disableNoisyBox) selectors.push(".MobileModal-wrapper");
        if (disablePostSub) selectors.push(".Post-Sub");

        if (disableVoteButtons) {
            selectors.push(".VoteButton--down");
            selectors.push(".VoteButton--up");
        }

        if (disableUpDownGap) {
            selectors.push(".css-1gapyfo");
            selectors.push(".css-1yun6kn");
            // selectors.push(".css-apzej4");
        }

        if (disableDownBar) {
            selectors.push(".css-24smt2");
            selectors.push(".oia-action-bar");
        }

        if (disableAds) {
            selectors.push(".AdBelowMoreAnswers");
            selectors.push(".MHotFeedAd");
            selectors.push(".MBannerAd");
            selectors.push(".AdvertImg");
        }

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return;
            elements.forEach(element => {
                if (element) element.style.display = 'none';
            });
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
