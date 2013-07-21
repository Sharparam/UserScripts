// ==UserScript==
// @name AutoCheckSteamMarketToSBox
// @description Automatically checks the ToS box when making a purchase on the Steam market
// @author Adam Hellberg (sharparam) <sharparam@sharparam.com>
// @namespace https://github.com/Sharparam
// @license MIT
// @copyright Copyright (c) 2013 by Adam Hellberg
// @include http://steamcommunity.com/market/listings/*
// @version 1.0
// ==/UserScript==

(function() {
    document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
})();

