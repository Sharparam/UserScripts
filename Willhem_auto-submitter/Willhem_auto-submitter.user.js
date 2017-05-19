// ==UserScript==
// @name        Willhem auto-submitter
// @namespace   http://sharparam.com/
// @description Auto-submits apartment requests
// @include     https://www.willhem.se/intresseanmalan/*
// @version     1.0.0
// @grant       none
// @license     MIT; http://opensource.org/licenses/MIT
// @copyright   2017, Sharparam (http://sharparam.com/)
// @homepageURL https://github.com/Sharparam/UserScripts
// @supportURL  https://github.com/Sharparam/UserScripts/issues
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/Willhem_auto-submitter/Willhem_auto-submitter.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/Willhem_auto-submitter/Willhem_auto-submitter.meta.js
// @run-at      document-end
// ==/UserScript==

'use strict';

setTimeout(function() {
  console.log('Finding checkboxes and checking them');

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }

  setTimeout(function() {
    console.log('Pressing verify button');

    var verify = document.querySelector('button#btnToVerify');

    if (verify !== null)
      verify.click();

    setTimeout(function() {
      console.log('Sending request');

      var send = document.querySelector('button#btnSend');

      if (send !== null)
        send.click();
    }, 500);
  }, 500);
}, 1000);
