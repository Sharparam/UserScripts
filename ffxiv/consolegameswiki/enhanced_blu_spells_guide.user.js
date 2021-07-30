// ==UserScript==
// @name        Enhanced BLU Spells Guide
// @namespace   https://sharparam.com/
// @description Improves the BLU spells guide on FFXIV ConsoleGamesWiki
// @downloadURL https://github.com/Sharparam/UserScripts/raw/master/ffxiv/consolegameswiki/enhanced_blu_spells_guide.user.js
// @updateURL   https://github.com/Sharparam/UserScripts/raw/master/ffxiv/consolegameswiki/enhanced_blu_spells_guide.meta.js
// @match       https://ffxiv.consolegameswiki.com/wiki/Blue_Mage_Spells_Learning_Guide
// @version     1.0.0
// @grant       none
// ==/UserScript==

'use strict';

const table = document.querySelector('table.table.sortable');
const rows = Array.from(table.querySelectorAll('tr'));
let first = true;

for (const row of rows) {
  if (first) {
    let header = document.createElement('th');
    header.className = 'headersort';
    header.textContent = 'Acquired';
    row.appendChild(header);

    first = false;
  } else {
    let td = document.createElement('td');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
      const tr = this.parentElement.parentElement;
      if (this.checked) {
        tr.classList.add('acquired');
      } else {
        tr.classList.remove('acquired');
      }
    });
    td.appendChild(checkbox);
    row.appendChild(td);
    row.addEventListener('click', () => checkbox.click());
  }
}
