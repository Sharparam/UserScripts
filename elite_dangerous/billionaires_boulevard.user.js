// ==UserScript==
// @name        Billionaires Boulevard helper
// @description Enables easy tracking of progress in the Billionaires Boulevard page.
// @namespace   https://sharparam.com
// @match       https://cmdrs-toolbox.com/billionaires-boulevard
// @grant       none
// @version     0.1.0
// @author      Adam Hellberg <sharparam@sharparam.com>
// @downloadURL https://github.com/Sharparam/UserScripts/raw/main/elite_dangerous/billionaires_boulevard.user.js
// ==/UserScript==

'use strict';

const $ = (q, n = document) => n.querySelector(q);
const $$ = (q, n = document) => n.querySelectorAll(q);

const getSystems = () => $$('table#MatTable > tbody > tr');

const getSystemProgress = (system) => {
  const checks = $$('input[type="checkbox"]', system);
  const bioTotal = checks.length;
  const bioComplete = Array.from(checks).filter(c => c.checked).length;
  return [bioComplete, bioTotal];
}

const getTotalProgress = () => {
  const systems = getSystems();
  const total = systems.length;
  const complete = Array.from(systems).filter(s => {
    const [c, t] = getSystemProgress(s);
    return c === t;
  }).length;
  return [complete, total];
}

const update = () => {
  const [totalComplete, totalCount] = getTotalProgress();
  const th = $('table#MatTable > thead > tr:first-child > th:first-child');
  $('span > span:first-child', th).textContent = totalComplete;
  $('span > span:last-child', th).textContent = totalCount;
  const systems = getSystems();
  for (const system of systems) {
    const [complete, total] = getSystemProgress(system);
    const td = $('td:first-child', system);
    $('h3 span:first-child', td).textContent = complete;
    $('h3 span:last-child', td).textContent = total;
  }
}

const init = () => {
  const tbl = $('table#MatTable');
  const systemHeader = $('thead > tr:first-child > th:first-child', tbl);
  const systemCounterSpan = document.createElement('span');
  const systemCurrentSpan = document.createElement('span');
  const systemTotalSpan = document.createElement('span');
  const systemRows = $$('tbody > tr', tbl);
  systemTotalSpan.classList.add('system-total');
  systemCurrentSpan.classList.add('system-current');
  systemCounterSpan.append(systemCurrentSpan);
  systemCounterSpan.insertAdjacentHTML('beforeend', '&nbsp;/&nbsp;');
  systemCounterSpan.append(systemTotalSpan);
  systemCounterSpan.classList.add('system-counter');
  systemHeader.appendChild(systemCounterSpan);

  for (const systemRow of systemRows) {
    const center = $('td > center', systemRow);
    const sysHeading = $('h2', center);
    const sysCounter = document.createElement('h3');
    const sysCurrent = document.createElement('span');
    const sysTotal = document.createElement('span');
    sysCounter.append(sysCurrent);
    sysCounter.insertAdjacentHTML('beforeend', '&nbsp;/&nbsp;');
    sysCounter.append(sysTotal);
    center.insertBefore(sysCounter, sysHeading.nextSibling);
  }

  const checks = $$('input[type="checkbox"]', tbl);
  for (const check of checks) {
    check.addEventListener('change', () => { update(); });
  }

  const btn = document.createElement('button');
  btn.textContent = 'Update';
  btn.addEventListener('click', () => { update(); });
  tbl.parentNode.insertBefore(btn, tbl);

  update();
};

(function() { init(); })();
