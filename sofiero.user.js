// ==UserScript==
// @name        SofieroCracker
// @namespace   http://sharparam.com/
// @description Cracks the memory game on Sofier's website.
// @include     http://www.sofierobeer.com/julkalender/
// @version     1.0.0
// @grant       none
// @license     MIT; http://opensource.org/licenses/MIT
// @copyright   2016, Sharparam (http://sharparam.com/)
// @homepageURL https://github.com/Sharparam/UserScripts
// @supportURL  https://github.com/Sharparam/UserScripts/issues
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/sofiero.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/sofiero.meta.js
// @run-at      document-end
// ==/UserScript==

'use-strict';

$('input[type="checkbox"]').click();

$('div[data-view="1"] button').click();

setTimeout(function() {
    console.log('Getting list of cards');

    var cards = gameOptions.cards;

    console.log('Card count: ' + cards.length);

    for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        var card = cards[cardIndex];
        var src = card.image.path;

        console.log('Processing image: ' + src);

        $('li.h5p-memory-card div.h5p-back img[src="' + src + '"]').parent().parent().children('div.h5p-front').click();
    }
}, 500);
