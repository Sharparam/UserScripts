// ==UserScript==
// @name        PDHO Flair Linker
// @namespace   http://sharparam.com/
// @description Finds Steam flairs on /r/PaydayTheHeistOnline and makes them link to Steam profiles
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/PDHO_Flair_Linker.meta.js
// @include     http://www.reddit.com/r/paydaytheheistonline*
// @include     http://reddit.com/r/paydaytheheistonline*
// @include     https://pay.reddit.com/r/paydaytheheistonline*
// @version     1.1.29
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
var steam_re = /(?:(?:https?:\/\/)?www\.)?(?:steam|pc)(?:community\.com\/?(?:(id|profiles)\/?)?|[\s\-_]*id)?[\/:\s\|]*(.{2,}?)(?:[\/|:\-\[(] ?(?:\/?(?:ghost|enforcer|tech|mm))+[\[)]?)?$/i

function get_text(e) {
    return e.innerText || e.textContent;
}

function set_text(e, t) {
    if (e.innerText)
        e.innerText = t;
    else
        e.textContent = t;
}

var parser = new DOMParser();

for (var i = 0; i < flairs.length; i++) {
    var text = get_text(flairs[i]);
    var match = steam_re.exec(text);
    if (match == null || match.length < 3)
        continue;
    var type = match[1] || 'id';
    var name = encodeURIComponent(match[2]);
    var url = 'http://steamcommunity.com/' + type + '/' + name;
    var xml_url = url + '?xml=1';
    GM_xmlhttpRequest({
        method: 'GET',
        url: xml_url,
        accept: 'text/xml',
        context: {
            flair_index: i,
            flair_text: text,
            encoded_name: name,
            profile_url: url,
            query_url: xml_url
        },
        onreadystatechange: function(response) {
            if (response.readyState != 4)
                return;
            var context = response.context || this.context || context;
            var doc = parser.parseFromString(response.responseText, 'text/xml');
            var validProfile = doc.documentElement.nodeName == 'profile';
            var a = document.createElement('a');
            a.href = validProfile ?
                context.profile_url :
                ('http://steamcommunity.com/actions/SearchFriends?K=' + context.encoded_name);
            a.className += (validProfile ? 'steam-profile-link' : 'steam-profile-search-link');
            var a_text = document.createTextNode(context.flair_text);
            a.appendChild(a_text);
            set_text(flairs[context.flair_index], '');
            flairs[context.flair_index].appendChild(a);
        }
    });
}
