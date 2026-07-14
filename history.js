/* FXER History module — dynamically mounted like profile.js. */
(function () {
  'use strict';
  if (window.__fxHistoryModuleLoaded) return;
  window.__fxHistoryModuleLoaded = true;

  function mountHistory() {
    var mount = document.getElementById('fxHistoryMount');
    if (!mount || document.getElementById('hpg')) return;
    var style = document.createElement('style');
    style.id = 'fxHistoryModuleStyle';
    style.textContent = '\n#fxHistoryMount{display:contents}\n.hpg{background:#0a0e17;flex-direction:column;flex:1;min-height:0;display:none;overflow:hidden}\n.hpg.s{display:flex}.hpg .hpf{direction:ltr;background:#0a0e17;flex:none;justify-content:space-between;align-items:center;padding:18px 16px 14px;display:flex}.hpg .sel-wrap{display:inline-block;position:relative}.hpg .hpf .sel{color:#fff;cursor:pointer;direction:rtl;background:#1a1f2e;border:1px solid #2a3040;border-radius:8px;justify-content:space-between;align-items:center;gap:8px;width:auto;min-width:110px;height:auto;padding:10px 14px;font-size:14px;display:flex}.hpg .hpf .sel:after{content:"▼";color:#8a92a5;font-size:9px;transition:transform .2s}.hpg .hpf .sel.op:after{transform:rotate(180deg)}.hpg .dd{z-index:50;background:#1a1f2e;border:1px solid #2a3040;border-radius:8px;min-width:140px;display:none;position:absolute;top:calc(100% + 4px);left:0;overflow:hidden}.hpg .dd.dsh{height:auto;display:block}.hpg .dd div{color:#fff;cursor:pointer;direction:rtl;border-bottom:1px solid #2a3040;padding:10px 14px;font-size:14px}.hpg .dd div:last-child{border-bottom:none}.hpg .dd div.a,.hpg .dd div:hover{background:#2a3040}.hpg .hpf-r{color:#fff;direction:rtl;align-items:center;gap:10px;font-size:15px;display:flex}.hpg .hpf-r:before{content:"";background:#3a4152;width:1px;height:18px}.hpg .hpl{direction:ltr;background:#0a0e17;flex:1;overflow-y:auto;padding:0}.hpg .hpl .dh{color:#8a92a5;text-align:left;direction:ltr;background:#141824;padding:8px 16px;font-size:13px}.hpi{direction:ltr;background:#0a0e17;border-bottom:1px solid #1a1f2e;align-items:center;gap:12px;padding:14px 16px;display:flex}.hpi.pending{background:#2b3a6b26}.hpi.completed{background:#10141d;opacity:.58;filter:saturate(.72)}.hpi.completed [data-live-countdown]{visibility:hidden}.hpe{text-align:center;color:#7d8fae;padding:20px;font-size:12px}.hpsk{padding:8px 12px}.hpsk .hpsr{border-bottom:1px solid #101a30;grid-template-columns:48px 1fr 78px 78px 22px;align-items:center;gap:8px;padding:10px 0;display:grid}.hpsk i{background:linear-gradient(90deg,#1a2340 0,#2a3760 50%,#1a2340 100%) 0 0/200% 100%;border-radius:4px;height:10px;animation:1.1s linear infinite hpsh;display:block}.hpsk .hpsc1{border-radius:6px;width:34px;height:22px}.hpsk .hpsc2{width:70%}.hpsk .hpsc3,.hpsk .hpsc4{width:60px;height:12px;margin-left:auto}.hpsk .hpsc5{border-radius:3px;width:14px;height:14px;margin-left:auto}@keyframes hpsh{to{background-position:-200% 0}}\n';
    document.head.appendChild(style);
    mount.innerHTML = '<div class=hpg id=hpg><div class=hpf><div class=sel-wrap><div onclick=\'var d=document.getElementById("hpDD");this.classList.toggle("op"),d.classList.toggle("dsh")\'class=sel id=hpSel><span id=hpSelV>تجريبي</span></div><div class=dd id=hpDD><div class=a data-v=تجريبي onclick=hpPickMode(this)>تجريبي</div><div data-v=حقيقي onclick=hpPickMode(this)>حقيقي</div><div data-v=الكل onclick=hpPickMode(this)>الكل</div></div></div><div class=hpf-r>آخر 3 أشهر</div></div><div class=hpl id=hpList></div></div>';
  }

  mountHistory();

  /*
   * Live history controller.
   * The page renderer can keep its current markup: register each row once with
   * bindRow(), then this controller only changes the affected text/status nodes.
   * No list re-render is performed on the one-second timer.
   */
  var records = new Map();
  var rows = new Map();
  var timer = null;
  var lastClockSecond = -1;
  var renderHook = null;

  function nowMs() { return Date.now(); }
  function number(v, fallback) {
    v = Number(v);
    return isFinite(v) ? v : fallback;
  }
  function idOf(trade) {
    return String(trade && (trade.id || trade.tradeId || trade.orderId || trade.uuid || ''));
  }
  function expiryOf(trade) {
    var value = trade && (trade.expiresAt || trade.expiryAt || trade.endTime || trade.closeTime);
    if (value == null) return 0;
    if (typeof value === 'string') value = Date.parse(value);
    value = number(value, 0);
    return value > 0 && value < 100000000000 ? value * 1000 : value;
  }
  function createdOf(trade) {
    var value = trade && (trade.createdAt || trade.openedAt || trade.created || trade.timestamp || trade.time);
    if (typeof value === 'string') value = Date.parse(value);
    value = number(value, 0);
    return value > 0 && value < 100000000000 ? value * 1000 : value;
  }
  function isOpen(trade) {
    return !!trade && !trade.finalized && !trade.settled && !trade.closed && expiryOf(trade) > nowMs();
  }
  function directionOf(trade) {
    return String((trade && (trade.direction || trade.side || trade.type)) || '').toLowerCase();
  }
  function isUp(trade) {
    var d = directionOf(trade);
    return d === 'up' || d === 'call' || d === 'buy' || d === 'higher' || d === 'صعود';
  }
  function isDown(trade) {
    var d = directionOf(trade);
    return d === 'down' || d === 'put' || d === 'sell' || d === 'lower' || d === 'هبوط';
  }
  function priceOf(trade) { return number(trade && (trade.currentPrice != null ? trade.currentPrice : trade.marketPrice), NaN); }
  function entryOf(trade) { return number(trade && (trade.entryPrice != null ? trade.entryPrice : trade.openPrice), NaN); }
  function marketState(trade) {
    var current = priceOf(trade), entry = entryOf(trade);
    if (!isFinite(current) || !isFinite(entry)) return 'pending';
    if (current === entry) return 'draw';
    return (isUp(trade) && current > entry) || (isDown(trade) && current < entry) ? 'win' : 'loss';
  }
  function stateFor(trade) {
    if (trade && trade.finalized) return String(trade.finalState || 'ended').toLowerCase();
    return marketState(trade);
  }
  function amountFor(trade, state) {
    var stake = number(trade.stake != null ? trade.stake : trade.amount, 0);
    var rate = number(trade.payoutRate != null ? trade.payoutRate : trade.returnRate, 0);
    if (rate > 1) rate /= 100;
    if (state === 'win') return stake * (1 + rate);
    if (state === 'draw') return stake;
    if (state === 'loss') return 0;
    return number(trade.expectedAmount != null ? trade.expectedAmount : trade.expectedReturn, stake * (1 + rate));
  }
  function pad(v) { return String(v).padStart(2, '0'); }
  function countdownFor(trade) {
    var left = Math.max(0, Math.ceil((expiryOf(trade) - nowMs()) / 1000));
    return pad(Math.floor(left / 60)) + ':' + pad(left % 60);
  }
  function formatAmount(value, trade) {
    if (typeof window.formatCurrency === 'function') return window.formatCurrency(value, trade && trade.currency);
    var digits = number(trade && trade.amountDigits, 2);
    return value.toFixed(Math.max(0, digits));
  }
  function statusLabel(state) {
    return { win: 'ربح متوقع', loss: 'خسارة متوقعة', draw: 'تعادل', pending: 'قيد التنفيذ', won: 'ربح', lost: 'خسارة', ended: 'منتهية' }[state] || state;
  }
  function notify(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail: detail }));
  }
  function refreshRow(id, force) {
    var trade = records.get(id), binding = rows.get(id);
    if (!trade || !binding) return;
    var state = stateFor(trade);
    var active = isOpen(trade);
    var amount = active ? amountFor(trade, state) : number(trade.finalAmount, amountFor(trade, state));
    var snapshot = { id: id, trade: trade, active: active, state: state, amount: amount, countdown: active ? countdownFor(trade) : '' };
    var signature = [snapshot.active, snapshot.state, snapshot.amount, snapshot.countdown].join('|');
    if (!force && binding.signature === signature) return;
    binding.signature = signature;
    if (binding.countdown) binding.countdown.textContent = snapshot.countdown;
    if (binding.status) binding.status.textContent = statusLabel(snapshot.state);
    if (binding.amount) binding.amount.textContent = formatAmount(snapshot.amount, trade);
    if (binding.root) {
      binding.root.classList.toggle('pending', snapshot.active);
      binding.root.classList.toggle('completed', !snapshot.active);
      binding.root.dataset.historyState = snapshot.state;
      binding.root.dataset.historyActive = String(snapshot.active);
    }
    if (typeof binding.update === 'function') binding.update(snapshot);
  }
  function refreshAll(force) {
    records.forEach(function (_, id) { refreshRow(id, force); });
  }
  function settleExpired() {
    records.forEach(function (trade, id) {
      if (!trade.finalized && expiryOf(trade) && expiryOf(trade) <= nowMs()) {
        var state = marketState(trade);
        trade.finalized = true;
        trade.finalState = state === 'win' ? 'won' : state === 'loss' ? 'lost' : 'draw';
        trade.finalAmount = amountFor(trade, state);
        notify('fxhistory:settled', { id: id, trade: trade });
      }
    });
  }
  function tick() {
    var second = Math.floor(nowMs() / 1000);
    if (second === lastClockSecond) return;
    lastClockSecond = second;
    settleExpired();
    refreshAll(false);
  }
  function startTicker() {
    if (timer) return;
    timer = window.setInterval(tick, 250);
    tick();
  }
  function sortedTrades() {
    return Array.from(records.values()).sort(function (a, b) { return createdOf(b) - createdOf(a); });
  }
  function moveRowToTop(id) {
    var binding = rows.get(id), list = document.getElementById('hpList');
    if (binding && binding.root && list && binding.root.parentNode === list && list.firstChild !== binding.root) {
      list.insertBefore(binding.root, list.firstChild);
    }
  }
  function upsert(trade) {
    var id = idOf(trade);
    if (!id) throw new Error('FX history trade requires id, tradeId, orderId, or uuid.');
    var current = records.get(id) || {};
    var isNew = !records.has(id);
    records.set(id, Object.assign(current, trade, { id: id }));
    moveRowToTop(id);
    refreshRow(id, true);
    notify(isNew ? 'fxhistory:created' : 'fxhistory:updated', { id: id, trade: records.get(id) });
    return records.get(id);
  }
  function updatePrice(symbol, price) {
    price = number(price, NaN);
    if (!isFinite(price)) return;
    records.forEach(function (trade, id) {
      var tradeSymbol = trade.symbol || trade.asset;
      if (!symbol || !tradeSymbol || String(tradeSymbol) === String(symbol)) {
        trade.currentPrice = price;
        refreshRow(id, false);
      }
    });
  }
  function bindRow(id, binding) {
    id = String(id);
    rows.set(id, binding || {});
    var root = binding && binding.root;
    if (root) {
      root.dataset.historyTradeId = id;
      root.classList.add('hpi');
    }
    moveRowToTop(id);
    refreshRow(id, true);
  }
  function unbindRow(id) { rows.delete(String(id)); }
  function setRenderer(fn) { renderHook = typeof fn === 'function' ? fn : null; }
  function render() {
    var data = sortedTrades();
    if (renderHook) renderHook(data);
    notify('fxhistory:render', { trades: data });
    refreshAll(true);
    return data;
  }
  /* Standard event bridge: dispatch these from the trade/price feed, with no page reload.
     fxtrade:created / fxtrade:updated -> detail: trade
     fxmarket:price -> detail: { symbol: 'EURUSD', price: 1.2345 }
     Each history row must be registered once through bindRow(id, {
       root, countdown, status, amount
     }); the references are DOM elements, not selector strings. */
  window.addEventListener('fxtrade:created', function (event) { upsert(event.detail || {}); });
  window.addEventListener('fxtrade:updated', function (event) { upsert(event.detail || {}); });
  window.addEventListener('fxmarket:price', function (event) {
    var quote = event.detail || {};
    updatePrice(quote.symbol || quote.asset, quote.price != null ? quote.price : quote.currentPrice);
  });

  function hideTopBar() {
    var page = document.getElementById('hpg');
    if (!page) return;
    var bar = page.querySelector('.hpf');
    if (bar) bar.hidden = true;
  }

  window.fxHistoryLive = {
    upsert: upsert,
    updatePrice: updatePrice,
    bindRow: bindRow,
    unbindRow: unbindRow,
    setRenderer: setRenderer,
    render: render,
    getTrades: sortedTrades,
    tick: tick
  };

  /* Hide the page's own top bar every time this history view becomes active. */
  hideTopBar();
  new MutationObserver(hideTopBar).observe(document.getElementById('hpg'), { attributes: true, attributeFilter: ['class'] });
  startTicker();

  function hpPickMode(t){try{var e=t.getAttribute(`data-v`)||t.textContent.trim();document.getElementById(`hpSelV`).textContent=e,document.querySelectorAll(`#hpDD div`).forEach(function(t){t.classList.remove(`a`)}),t.classList.add(`a`),document.getElementById(`hpDD`).classList.remove(`dsh`),document.getElementById(`hpSel`).classList.remove(`op`),window.__histMode=e;try{typeof renderLog==`function`&&renderLog()}catch{}}catch{}}
})();
