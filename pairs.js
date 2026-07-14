/* Pair chooser — dynamically injected section. */
(function () {
  'use strict';
  var d = document;
  function addStyle(id, css) { if (d.getElementById(id)) return; var n = d.createElement('style'); n.id = id; n.textContent = css; d.head.appendChild(n); }
  function runClassic(id, code) { if (d.getElementById(id)) return; var n = d.createElement('script'); n.id = id; n.textContent = code; d.body.appendChild(n); }
  function runModule(id, code) { if (d.getElementById(id)) return; var n = d.createElement('script'); n.type = 'module'; n.id = id; n.textContent = code; d.body.appendChild(n); }
  var mount = d.getElementById("fxPairsMount");
  if (mount && !mount.dataset.fxInjected) { mount.innerHTML = "<div class=pk id=pk><div class=pkh><button class=pkx id=pkxb>×</button><div class=pkt>اختر الرمز</div></div><div class=pktb id=pktb></div><div class=pksr><input class=pksi id=pksi placeholder=بحث></div><div class=pkmb><div>المجموع <b id=pkn>66</b></div><select class=pksel><option>الكل</select></div><div class=pkth><div></div><div>الرموز</div><div>السعر<br>يتغير(%)</div><div>عائد<br>أقصى عائد</div><div></div></div><div class=pkl id=pkl></div></div>"; mount.dataset.fxInjected = '1'; }
}());
