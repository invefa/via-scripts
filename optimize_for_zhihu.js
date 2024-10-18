// ==UserScript==
// @name         优化知乎体验
// @namespace    invefa.me
// @version      1.2.8.3
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

        const decreaseHeightOfLowerBar = true;

        const hideVipRecommendCard = true;
        const hideOpenInAppButton = true;
        const hideHotQuestions = true;
        const hideVoteButtons = true;
        const hideUpperBanner = true;
        const hideUpDownGap = true;
        const hideLowerBar = true;
        const hideNoisyBox = true;
        const hidePostSub = true;
        const hideAds = true;


        if (decreaseHeightOfLowerBar) {
            const lowerBarClass = ".ContentItem-actions.is-fixed.is-bottom";
            const lowerBar = document.querySelector(lowerBarClass);
            if (lowerBar) lowerBar.style.height = '0px';
        }

        const selectors = [];

        if (hideVipRecommendCard) selectors.push(".KfeCollection-VipRecommendCard");
        if (hideOpenInAppButton) selectors.push(".OpenInAppButton");
        if (hideHotQuestions) selectors.push(".Card.HotQuestions");
        if (hideUpperBanner) selectors.push(".css-wfkf2m");
        if (hideNoisyBox) selectors.push(".MobileModal-wrapper");
        if (hidePostSub) selectors.push(".Post-Sub");

        if (hideVoteButtons) {
            selectors.push(".VoteButton--down");
            selectors.push(".VoteButton--up");
        }

        if (hideUpDownGap) {
            selectors.push(".css-1gapyfo");
            selectors.push(".css-1yun6kn");
            // selectors.push(".css-apzej4");
        }

        if (hideLowerBar) {
            selectors.push(".css-24smt2");
            selectors.push(".oia-action-bar");
        }

        if (hideAds) {
            selectors.push(".AdBelowMoreAnswers");
            selectors.push(".MHotFeedAd");
            selectors.push(".MBannerAd");
            selectors.push(".AdvertImg");
        }

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
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
