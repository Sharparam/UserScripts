// ==UserScript==
// @name        PDHO Flair Linker
// @namespace   http://sharparam.com/
// @description Finds Steam flairs on /r/PaydayTheHeistOnline and makes them link to Steam profiles
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.meta.js
// @include     http://www.reddit.com/r/paydaytheheistonline*
// @include     http://reddit.com/r/paydaytheheistonline*
// @include     https://pay.reddit.com/r/paydaytheheistonline*
// @version     1.1.7
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==

/* 
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 by Adam Hellberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var flairs = document.querySelectorAll('span.flair');

// This regex will only catch flairs in the syntax of "Steam: <name>"
//var steam_re = /steam: (.*)/i

// Below is experimental regex that should catch more flairs
var steam_re = /(?:(?:https?:\/\/)?www\.)?steam(?:community\.com\/?(?:(id|profiles)\/?)?)?[\/:\s\|]*([\w\d ]+)/i

function get_text(e) {
    return e.innerText || e.textContent;
}

function set_text(e, t) {
    if (e.innerText)
        e.innerText = t;
    else
        e.textContent = t;
}

console.info('running for loop');
for (var i = 0; i < flairs.length; i++) {
    var span = flairs[i];
    var text = get_text(span);
    var match = steam_re.exec(text);
    if (match == null || match.length < 3)
        continue;
    var type = match[1] || 'id';
    var name = match[2].replace(/ /g, '+');
    var url = 'http://steamcommunity.com/' + type + '/' + name + '?xml=1';
    console.info('Requesting: ' + url);
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        accept: 'text/xml',
        onreadystatechange: function(response) {
            if (response.readyState != response.DONE || !response.responseText)
                return;
            var doc = new DOMParser().parseFromString(response.responseText, 'text/xml');
            var validProfile = doc && doc.documentElement && doc.documentElement.nodeName == 'profile';
            var a = document.createElement('a');
            a.href = validProfile ? url : 'http://steamcommunity.com/actions/Search?K=' + name;
            a.className += 'steam-profile-link';
            var a_text = document.createTextNode(text);
            a.appendChild(a_text);
            set_text(span, '');
            span.appendChild(a);
        },
        onload: function(response) {
            if (!response.responseText)
                return;
            var doc = new DOMParser().parseFromString(response.responseText, 'text/xml');
            var validProfile = doc && doc.documentElement && doc.documentElement.nodeName == 'profile';
            var a = document.createElement('a');
            a.href = validProfile ? url : 'http://steamcommunity.com/actions/Search?K=' + name;
            a.className += 'steam-profile-link';
            var a_text = document.createTextNode(text);
            a.appendChild(a_text);
            set_text(span, '');
            span.appendChild(a);
        },
        onerror: function(response) {
            console.error('Failed to load ' + url);
        },
        onabort: function(response) {
            console.error('Request aborted: ' + url);
        },
        ontimeout: function(response) {
            console.error('Request timed out: ' + url);
        }
    });
}
