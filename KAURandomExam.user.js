// ==UserScript==
// @name        KAURandomExam
// @namespace   http://sharparam.com/
// @description Gives the option to open a random exam from the list of exams on KAU
// @include     https://www3.kau.se/minsida/sips.php
// @version     1.0.0
// @grant       none
// @license     MIT; http://opensource.org/licenses/MIT
// @copyright   2016, Sharparam (http://sharparam.com/)
// @homepageURL https://github.com/Sharparam/UserScripts
// @supportURL  https://github.com/Sharparam/UserScripts/issues
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/KAURandomExam.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/KAURandomExam.meta.js
// ==/UserScript==

var div = document.createElement('div');
div.style = 'clear:both;';

var a = document.createElement('a');
a.href = '#';

var text = document.createTextNode('Open random exam.');

a.appendChild(text);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function openRandomExam() {
  var links = document.querySelectorAll('div#testList > table > tbody > tr > td:first-child > a');
  if (links.length == 0) {
    alert('Load some exams first!');
    return;
  }
  var link = links[getRandomInt(0, links.length - 1)].href;
  window.open(link, '_blank');
};

a.onclick = function(event) {
  console.log('onclick entered');
  event.preventDefault();
  event.stopPropagation();
  openRandomExam();
  console.log('onclick exiting');
};

div.appendChild(a);

var content = document.querySelector('div#content div.content');
var insertPoint = content.querySelector('div:nth-child(3)');

content.insertBefore(div, insertPoint);

