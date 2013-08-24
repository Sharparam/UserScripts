// ==UserScript==
// @name        PDHO Flair Linker
// @namespace   http://sharparam.com/
// @description Finds Steam flairs on /r/PaydayTheHeistOnline and makes them link to Steam profiles
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.user.js
// @updateURL https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.user.js
// @include     http://www.reddit.com/r/paydaytheheistonline*
// @include     http://reddit.com/r/paydaytheheistonline*
// @include     https://pay.reddit.com/r/paydaytheheistonline*
// @version     1.0.0
// @run-at      document-end
// ==/UserScript==

var flairs = document.querySelectorAll('span.flair');

// This regex will only catch flairs in the syntax of "Steam: <name>"
//var steam_re = /steam: (.*)/i

// Below is experimental regex that should catch more flairs
var steam_re = /(?:(?:https?:\/\/)?www\.)?steam(?:community\.com\/?(?:(id|profile)\/?)?)?[\/:\s\|]*([\w\d]+)/i

function get_text(e) {
    return e.innerText || e.textContent;
}

function set_text(e, t) {
    if (e.innerText)
        e.innerText = t;
    else
        e.textContent = t;
}

for (var i = 0; i < flairs.length; i++) {
    var span = flairs[i];
    var text = get_text(span);
    var match = steam_re.exec(text);
    if (match == null || match.length < 3)
        continue;
    var type = match[1] || 'id';
    var url = 'http://steamcommunity.com/' + type + '/' + match[2].replace(/ /g, '+');
    var a = document.createElement('a');
    a.href = url;
    a.className += 'steam-profile-link';
    var a_text = document.createTextNode(text);
    a.appendChild(a_text);
    set_text(span, '');
    span.appendChild(a);
}
