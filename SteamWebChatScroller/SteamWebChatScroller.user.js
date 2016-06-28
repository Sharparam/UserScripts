// ==UserScript==
// @name Steam web chat scroller
// @namespace http://sharparam.com/
// @description Scrolls the message view on new messages in the Steam web chat.
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/SteamWebChatScroller/SteamWebChatScroller.user.js
// @updateURL https://github.com/Sharparam/UserScripts/raw/master/SteamWebChatScroller/SteamWebChatScroller.meta.js
// @include https://steamcommunity.com/chat/*
// @version 1.0.2
// @grant none
// @run-at document-end
// ==/UserScript==

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function(node) {
            if (node.className == 'chat_dialog') {
                observer.disconnect();
                observer.observe(node.querySelector('.chat_dialog_content_inner'), {
                    childList: true
                });
            } else if (node.classList.contains('chat_message')) {
                node.scrollIntoView(true);
            }
        });
    });
});

observer.observe(document.querySelector('#chatlog'), {
    childList: true
});
