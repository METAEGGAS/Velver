/* ════════════════════════════════════════════════════════════
   deposit.js  —  Vanilla JS  (no React / no bundler)
   Exposes:  window.DepositPage.mount(containerEl, opts)
   opts:     { addr: "TRON_TRC20_ADDRESS" }   (optional override)
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     CONSTANTS
  ══════════════════════════════════════ */
  const DEFAULT_ADDR = 'TJuW6QiLBZBgNgPZ4W2sUkqHa3i7gfvVch';
  const PROMO_CODE   = '70ZARCH';
  const BONUS_RATE   = 0.70;
  const CUR          = 'USD';
  const AMOUNTS      = [500, 900, 1300, 2200, 4300, 10550, 42350, 105800];

  /* ══════════════════════════════════════
     SCOPED CSS  (injected once into <head>)
  ══════════════════════════════════════ */
  const DEP_CSS = `
    :root{
      --dep-gold:#ffd700;
      --dep-gold2:#b8860b;
      --dep-bg:#0a0e1a;
      --dep-card:#12192e;
    }

    /* ─── Modal shell ─── */
    #depModal{
      position:fixed;inset:0;z-index:9900;
      background:var(--dep-bg);
      display:flex;flex-direction:column;overflow:hidden;
      font-family:Arial,sans-serif;font-size:11px;
      direction:ltr;color:#fff;
      transition:transform .32s cubic-bezier(.4,0,.2,1);
    }
    #depModal.dep-hidden{transform:translateY(100%);}

    /* ─── Screens ─── */
    #depModal .dScr{
      display:none;flex:1;flex-direction:column;
      overflow-y:auto;-webkit-overflow-scrolling:touch;
    }
    #depModal .dScr.on{display:flex;}

    /* ─── Top bar ─── */
    #depModal .dtop{
      flex-shrink:0;height:48px;display:flex;
      align-items:center;justify-content:space-between;
      padding:8px 11px;
      background:linear-gradient(135deg,#0d1527 0%,#1a1000 50%,#0d1527 100%);
      border-bottom:2.5px solid var(--dep-gold);
    }
    #depModal .dtop .t{
      font-size:14px;font-weight:900;
      color:var(--dep-gold);letter-spacing:.2px;
    }
    #depModal .dic{
      width:34px;height:34px;background:transparent;
      border:1.5px solid rgba(255,215,0,.4);
      border-radius:9px;display:flex;align-items:center;
      justify-content:center;cursor:pointer;
      color:rgba(255,215,0,.75);font-size:17px;transition:.2s;
    }
    #depModal .dic:hover{
      background:rgba(255,215,0,.1);
      color:var(--dep-gold);border-color:var(--dep-gold);
    }

    /* ─── Screen 1: Amount picker ─── */
    #depModal .dp{padding:12px 14px;}
    #depModal .dgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    #depModal .damt{
      background:rgba(17,31,53,.65);
      border:1.5px solid rgba(255,215,0,.2);
      border-radius:11px;padding:12px;color:#fff;
      text-align:center;font-weight:1000;cursor:pointer;
      position:relative;transition:.15s;user-select:none;
    }
    #depModal .damt:hover{border-color:rgba(255,215,0,.4);}
    #depModal .damt.on{
      background:rgba(255,215,0,.12);
      border-color:var(--dep-gold);color:var(--dep-gold);
    }
    #depModal .damt.on::after{
      content:"✓";position:absolute;left:9px;top:7px;
      font-size:11px;color:var(--dep-gold);
    }
    #depModal .dbar{margin-top:10px;display:flex;gap:8px;align-items:center;}
    #depModal .din{
      background:rgba(17,31,53,.65);
      border:1.5px solid rgba(255,215,0,.3);
      border-radius:11px;padding:10px 12px;
      color:#fff;font-weight:900;outline:none;transition:.2s;
      flex:1;text-align:right;
      font-family:Arial,sans-serif;font-size:11px;width:100%;
    }
    #depModal .din:focus{
      border-color:var(--dep-gold);
      box-shadow:0 0 0 3px rgba(255,215,0,.08);
    }
    #depModal .dhint{
      margin:12px 0 0;color:rgba(255,215,0,.6);font-size:11px;
      display:flex;align-items:center;gap:7px;font-weight:900;
    }
    #depModal .dhint .q{
      width:15px;height:15px;border-radius:999px;
      border:1px solid rgba(255,215,0,.35);
      display:grid;place-items:center;
      font-size:10px;color:rgba(255,215,0,.6);flex-shrink:0;
    }
    #depModal .dfoot{
      margin-top:auto;padding:15px 14px 18px;flex-shrink:0;
    }
    #depModal .dref{
      text-align:center;margin:15px 0 8px;
      font-size:12px;font-weight:900;
    }
    #depModal .dref a{
      color:var(--dep-gold);text-decoration:none;cursor:pointer;
    }
    #depModal .dchk{
      display:flex;align-items:flex-start;gap:8px;
      color:rgba(255,215,0,.7);font-size:11px;
      line-height:1.5;margin:8px 0 12px;font-weight:900;
    }
    #depModal .dchk input{margin-top:2px;accent-color:var(--dep-gold);}
    #depModal .dbtn{
      width:100%;height:44px;border:0;border-radius:11px;
      font-weight:1000;letter-spacing:.3px;cursor:pointer;
      transition:.18s;font-size:11px;font-family:Arial,sans-serif;
    }
    #depModal .dbtn.g{
      background:linear-gradient(135deg,var(--dep-gold),var(--dep-gold2));
      color:#000;box-shadow:0 8px 16px rgba(255,215,0,.2);
    }
    #depModal .dbtn.b{
      background:linear-gradient(135deg,#5ea1ff,#2f7cff);
      color:#fff;box-shadow:0 8px 16px rgba(94,161,255,.18);
    }
    #depModal .dbtn:hover{filter:brightness(1.08);transform:translateY(-1px);}
    #depModal .dbtn:active{filter:brightness(.96);transform:translateY(0);}

    /* ─── Card ─── */
    #depModal .dcard{
      margin:10px 10px 0;
      background:linear-gradient(180deg,#0d1527,#0a0e1a);
      border-radius:13px;padding:12px;
      box-shadow:0 8px 20px rgba(0,0,0,.3);
      border:1.5px solid rgba(255,215,0,.22);
    }
    #depModal .dttl{
      font-weight:1000;text-align:center;
      margin:2px 0 9px;letter-spacing:.3px;color:var(--dep-gold);
    }
    #depModal .dbig{
      font-size:40px;font-weight:1000;text-align:center;
      margin:0 0 10px;direction:ltr;color:var(--dep-gold);
    }
    #depModal .dkv{
      display:grid;grid-template-columns:1fr auto;gap:8px;
      align-items:center;padding:7px 0;
      border-top:1px solid rgba(255,215,0,.13);
    }
    #depModal .dkv:first-of-type{border-top:0;}
    #depModal .dkv .k{color:rgba(255,215,0,.6);font-size:11px;font-weight:900;}
    #depModal .dkv .v{
      font-weight:1000;font-size:11px;
      white-space:nowrap;direction:ltr;color:#fff;
    }
    #depModal .dnote{
      color:rgba(255,215,0,.6);font-size:11px;line-height:1.55;
      margin-top:9px;text-align:center;font-weight:900;
    }

    /* ─── Address bar ─── */
    #depModal .daddr{
      width:calc(100% - 28px);margin:3px 14px;
      background:rgba(17,31,53,.65);
      border:1.5px solid rgba(255,215,0,.4);
      border-radius:12px;padding:9px 10px;
      display:flex;align-items:center;
      justify-content:space-between;gap:8px;
    }
    #depModal .daddr code{
      color:#fff;font-weight:1000;
      white-space:nowrap;overflow:hidden;
      text-overflow:ellipsis;direction:ltr;font-size:10px;
    }
    #depModal .dcpy{
      border:0;background:transparent;
      color:rgba(255,215,0,.85);cursor:pointer;
      font-weight:1000;font-size:15px;flex-shrink:0;
    }
    #depModal .dsm{
      color:rgba(255,215,0,.5);font-size:10px;line-height:1.6;
      margin:7px 14px 14px;font-weight:900;text-align:center;
    }

    /* ─── Bonus box ─── */
    #depModal #dBonusBox{
      display:none;margin:8px 14px 0;padding:10px;
      border-radius:12px;border:1.5px solid rgba(255,215,0,.3);
      background:rgba(17,31,53,.55);
    }
    #depModal #dBonusBox.show{display:block;}
    #depModal #dBonusBox .h{
      font-weight:1000;margin-bottom:9px;
      color:var(--dep-gold);letter-spacing:.15px;
    }
    #depModal #dBonusBox .r{display:flex;gap:8px;align-items:center;}
    #depModal .dOk{
      display:inline-flex;align-items:center;gap:7px;
      margin-top:8px;color:#19d28f;font-weight:1000;font-size:11px;
    }
    #depModal .dBad{
      display:inline-flex;align-items:center;gap:7px;
      margin-top:8px;color:#ff4d5a;font-weight:1000;font-size:11px;
    }

    /* ─── Animations ─── */
    @keyframes depSpin{to{transform:rotate(360deg);}}
    @keyframes depPulse{
      0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,.55);}
      70%{box-shadow:0 0 0 10px rgba(255,215,0,0);}
    }
    @keyframes depFloat{
      0%,100%{transform:translateY(0);}
      50%{transform:translateY(-4px);}
    }
    @keyframes depGlow{
      0%,100%{opacity:.7;}
      50%{opacity:1;}
    }

    /* ─── Screen 3: Spinner & badges ─── */
    #depModal .dRing{
      position:absolute;inset:-4px;border-radius:50%;
      border:2.5px solid rgba(255,215,0,.12);
      border-top-color:var(--dep-gold);
      animation:depSpin .85s linear infinite;
    }
    #depModal .dRing2{
      position:absolute;inset:-10px;border-radius:50%;
      border:2px solid rgba(255,215,0,.06);
      border-bottom-color:rgba(255,215,0,.35);
      animation:depSpin 1.6s linear infinite reverse;
    }
    #depModal .dDot{
      width:9px;height:9px;background:var(--dep-gold);
      border-radius:50%;flex-shrink:0;
      animation:depPulse 1.6s ease infinite;
      box-shadow:0 0 7px rgba(255,215,0,.6);
    }
    #depModal .dWaitBadge{
      display:flex;align-items:center;gap:9px;
      background:rgba(255,215,0,.07);
      border:1.5px solid rgba(255,215,0,.3);
      border-radius:12px;padding:10px 18px;
      animation:depFloat 3s ease infinite;
    }
    #depModal .dNetBadge{
      display:inline-flex;align-items:center;gap:5px;
      background:rgba(255,215,0,.08);
      border:1px solid rgba(255,215,0,.25);
      border-radius:7px;padding:4px 10px;
      font-size:10px;font-weight:900;
      color:rgba(255,215,0,.85);
      animation:depGlow 2.5s ease infinite;
    }
    #depModal .dQR{
      width:170px;height:170px;background:#fff;
      border-radius:11px;padding:7px;
      border:1.5px solid rgba(255,215,0,.4);
      box-shadow:0 0 18px rgba(255,215,0,.13);
    }
  `;

  /* ══════════════════════════════════════
     HELPERS
  ══════════════════════════════════════ */
  const fmt = n =>
    String(Math.max(0, Math.floor(n || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const mny = n => '$' + fmt(n);
  const pad = n => String(n).padStart(2, '0');

  /* ══════════════════════════════════════
     MODULE STATE  (reset on each mount)
  ══════════════════════════════════════ */
  let ADDR         = DEFAULT_ADDR;
  let screen       = 0;      // 0 | 1 | 2
  let navHistory   = [0];
  let amt          = 4300;
  let bonusActive  = false;
  let bonusInput   = '';
  let bonusState   = '';     // '' | 'ok' | 'bad' | 'bad_empty'
  let bonusBoxOpen = false;
  let agreed       = true;
  let waitSecs     = 0;
  let timerRef     = null;
  let rootEl       = null;   // <section id="dep">

  /* Derived */
  const getBase  = () => Math.max(0, Math.floor(amt || 0));
  const getBon   = () => bonusActive ? Math.floor(getBase() * BONUS_RATE) : 0;
  const getTotal = () => getBase() + getBon();

  /* ══════════════════════════════════════
     CSS INJECTION
  ══════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById('dep-modal-css')) return;
    const s = document.createElement('style');
    s.id = 'dep-modal-css';
    s.textContent = DEP_CSS;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════
     TIMER
  ══════════════════════════════════════ */
  function startTimer() {
    stopTimer();
    waitSecs = 0;
    timerRef = setInterval(() => {
      waitSecs++;
      const el = document.getElementById('dWaitTime');
      if (el) el.textContent = pad(Math.floor(waitSecs / 60)) + ':' + pad(waitSecs % 60);
    }, 1000);
  }

  function stopTimer() {
    if (timerRef) { clearInterval(timerRef); timerRef = null; }
  }

  /* ══════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════ */
  function goTo(k) {
    screen = k;
    if (navHistory[navHistory.length - 1] !== k) navHistory.push(k);
    if (k === 2) startTimer(); else stopTimer();
    syncScreens();
    syncDerivedUI();
  }

  function goBack() {
    if (navHistory.length < 2) {
      closeDeposit();
      return;
    }
    navHistory.pop();
    screen = navHistory[navHistory.length - 1];
    if (screen === 2) startTimer(); else stopTimer();
    syncScreens();
    syncDerivedUI();
  }

  function closeDeposit() {
    stopTimer();
    document.body.style.overflow = '';
    if (window.AppNav) window.AppNav.go('home');
  }

  /* ══════════════════════════════════════
     SYNC DOM (no full re-render)
  ══════════════════════════════════════ */
  function syncScreens() {
    ['dS1', 'dS2', 'dS3'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('on', screen === i);
    });
    const back = document.getElementById('dBack');
    if (back) back.style.opacity = navHistory.length > 1 ? '1' : '0.45';
  }

  function syncDerivedUI() {
    const base  = getBase();
    const bon   = getBon();
    const total = getTotal();

    /* Pay button */
    const pb = document.getElementById('dPayBtn');
    if (pb) pb.textContent = 'Pay ' + mny(base);

    /* Screen 2 */
    const cb = document.getElementById('dConfBal');
    if (cb) cb.textContent = mny(base);

    /* Screen 3 */
    const bl = document.getElementById('dBaseLine');
    const bnl = document.getElementById('dBonusLine');
    const tl = document.getElementById('dTotalLine');
    const s3a = document.getElementById('dS3amt');
    if (bl)  bl.textContent  = mny(base);
    if (bnl) bnl.textContent = bonusActive
      ? '+' + mny(bon) + ' (' + Math.round(BONUS_RATE * 100) + '%)'
      : '—';
    if (tl)  tl.textContent  = mny(total);
    if (s3a) s3a.textContent = mny(total);

    /* QR */
    const qr = document.getElementById('dQRimg');
    if (qr) {
      qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=190x190&data='
        + encodeURIComponent(JSON.stringify({
            network: 'USDT_TRC20', address: ADDR,
            currency: CUR, base, bonus: bon, total,
          }));
    }
  }

  /* ══════════════════════════════════════
     BUILD HTML
  ══════════════════════════════════════ */
  function buildHTML() {
    const base = getBase();

    /* Amount grid items */
    const gridItems = AMOUNTS.map(v =>
      `<div class="damt${amt === v ? ' on' : ''}" data-v="${v}">${mny(v)}</div>`
    ).join('');

    /* Bonus state message */
    const bonMsg = bonusState === 'ok'
      ? `<div class="dOk">✔ Bonus activated: ${Math.round(BONUS_RATE * 100)}%</div>`
      : bonusState === 'bad'
        ? `<div class="dBad">✖ Invalid code</div>`
        : bonusState === 'bad_empty'
          ? `<div class="dBad">✖ Enter a promo code</div>`
          : '';

    /* QR src */
    const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=190x190&data='
      + encodeURIComponent(JSON.stringify({
          network: 'USDT_TRC20', address: ADDR,
          currency: CUR,
          base: getBase(), bonus: getBon(), total: getTotal(),
        }));

    return `
<div id="depModal" class="dep-hidden">

  <!-- ══ TOP BAR ══ -->
  <div class="dtop">
    <button class="dic" id="dBack" title="Back"
            style="opacity:${navHistory.length > 1 ? 1 : 0.45}">←</button>
    <div class="t">Deposit — USDT TRC20</div>
    <button class="dic" id="dClose" title="Close">×</button>
  </div>

  <!-- ══════════════════════════════
       SCREEN 1 — Amount picker
  ══════════════════════════════ -->
  <section class="dScr${screen === 0 ? ' on' : ''}" id="dS1">

    <div class="dp">
      <div class="dgrid" id="dAmtGrid">${gridItems}</div>
      <div class="dbar">
        <input class="din" id="dAmtIn" inputmode="numeric"
               value="${amt}" placeholder="Custom amount" />
      </div>
      <div class="dhint">
        <span class="q">?</span>
        <span>USD only (fixed currency)</span>
      </div>
    </div>

    <!-- Bonus box -->
    <div id="dBonusBox" class="${bonusBoxOpen ? 'show' : ''}">
      <div class="h">🎁 Promo code</div>
      <div class="r">
        <input class="din" id="dBonusIn" placeholder="Enter promo code"
               style="text-align:right" value="${bonusInput}" />
        <button class="dbtn b" id="dBonusApply"
                style="height:40px;width:130px;flex-shrink:0">Apply</button>
      </div>
      <div id="dBonusState">${bonMsg}</div>
    </div>

    <div class="dfoot">
      <div class="dref">
        <a href="javascript:void(0)" id="dBonusToggle">
          🎟 Do you have a promo code?
        </a>
      </div>
      <label class="dchk">
        <input type="checkbox" id="dAgree" ${agreed ? 'checked' : ''} />
        I agree to the Terms &amp; Conditions and Refund Policy
      </label>
      <button class="dbtn g" id="dPayBtn">Pay ${mny(base)}</button>
      <div style="height:8px"></div>
      <div style="text-align:center;font-size:10px;opacity:.7;
                  color:rgba(255,215,0,.6);font-weight:900">
        🔒 PCI DSS &nbsp;•&nbsp; Mastercard ID Check &nbsp;•&nbsp; VISA
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════
       SCREEN 2 — Confirmation
  ══════════════════════════════ -->
  <section class="dScr${screen === 1 ? ' on' : ''}" id="dS2">

    <div class="dcard">
      <div class="dttl">Payment confirmation</div>
      <div style="text-align:center;font-size:12px;margin-top:2px;
                  color:rgba(255,215,0,.6);font-weight:900">Amount</div>
      <div class="dbig" id="dConfBal">${mny(base)}</div>

      <div class="dkv">
        <div class="k">Payment method</div>
        <div class="v">USDT TRC20</div>
      </div>
      <div class="dkv">
        <div class="k">Network</div>
        <div class="v">TRON (TRC20)</div>
      </div>
      <div class="dkv">
        <div class="k">Currency</div>
        <div class="v">${CUR}</div>
      </div>
      <div class="dnote">
        Please review the details carefully before sending.
      </div>
    </div>

    <div class="dfoot">
      <button class="dbtn b" id="dPayNow">✅ Confirm &amp; Pay now</button>
    </div>
  </section>

  <!-- ══════════════════════════════
       SCREEN 3 — Waiting / QR
  ══════════════════════════════ -->
  <section class="dScr${screen === 2 ? ' on' : ''}" id="dS3">

    <!-- Spinner area -->
    <div style="display:flex;flex-direction:column;align-items:center;
                padding:18px 14px 8px;gap:12px">

      <div style="position:relative;width:68px;height:68px;
                  display:flex;align-items:center;justify-content:center">
        <div class="dRing2"></div>
        <div class="dRing"></div>
        <img src="https://static.expertoption.finance/crypto-icons/color/usdt_trc20.svg"
             style="width:34px;height:34px;border-radius:50%;position:relative;
                    z-index:1;box-shadow:0 0 14px rgba(255,215,0,.3)"
             alt="USDT" onerror="this.src=''" />
      </div>

      <div class="dWaitBadge">
        <div class="dDot"></div>
        <span style="font-weight:900;font-size:12.5px;color:var(--dep-gold)">
          Waiting for payment…
        </span>
      </div>

      <div style="font-size:10px;color:rgba(255,215,0,.55);font-weight:900;
                  display:flex;align-items:center;gap:5px">
        <span>⏱</span>
        <span id="dWaitTime"
              style="font-family:monospace;font-size:12px;
                     color:var(--dep-gold);font-weight:900">00:00</span>
        <span>since you opened this screen</span>
      </div>

      <div class="dNetBadge">
        🔗 TRON Network · TRC20
        <span style="opacity:.6">|</span>
        <span style="color:#19d28f">Active</span>
      </div>
    </div>

    <!-- Summary card -->
    <div class="dcard" style="margin:0 10px">
      <div class="dkv" style="border-top:0">
        <div class="k">Base amount</div>
        <div class="v" id="dBaseLine">${mny(getBase())}</div>
      </div>
      <div class="dkv">
        <div class="k">Bonus</div>
        <div class="v" id="dBonusLine">
          ${bonusActive
            ? '+' + mny(getBon()) + ' (' + Math.round(BONUS_RATE * 100) + '%)'
            : '—'}
        </div>
      </div>
      <div class="dkv">
        <div class="k">Total to send</div>
        <div class="v" id="dTotalLine"
             style="color:var(--dep-gold);font-size:13px">
          ${mny(getTotal())}
        </div>
      </div>
    </div>

    <!-- QR + Address -->
    <div style="display:flex;flex-direction:column;align-items:center;
                padding:12px 14px 5px;gap:7px">
      <div style="font-size:11px;color:rgba(255,215,0,.7);font-weight:900">
        Scan to deposit
        <b id="dS3amt" style="color:var(--dep-gold)">${mny(getTotal())}</b>
      </div>
      <div class="dQR">
        <img id="dQRimg" src="${qrSrc}"
             style="width:100%;height:100%;display:block" alt="QR Code" />
      </div>
    </div>

    <div style="margin:3px 14px;font-size:11px;text-align:center;
                color:rgba(255,215,0,.65);font-weight:900">
      Send exactly <b style="color:var(--dep-gold)">USDT (TRC20)</b> to this address:
    </div>

    <div class="daddr">
      <button class="dcpy" id="dCpy" title="Copy address">⎘</button>
      <code id="dAddrTxt">${ADDR}</code>
    </div>

    <div class="dsm">
      ✅ Payment confirmed automatically after network confirmation.<br>
      ⏳ Typically takes 1–10 minutes.
    </div>

  </section>

</div><!-- #depModal -->`;
  }

  /* ══════════════════════════════════════
     EVENT BINDING
  ══════════════════════════════════════ */
  function bindEvents() {
    /* ── Back ── */
    on('dBack', 'click', goBack);

    /* ── Close ── */
    on('dClose', 'click', closeDeposit);

    /* ── Amount grid ── */
    const grid = document.getElementById('dAmtGrid');
    if (grid) {
      grid.addEventListener('click', e => {
        const el = e.target.closest('.damt');
        if (!el) return;
        amt = parseInt(el.dataset.v, 10);
        grid.querySelectorAll('.damt').forEach(a =>
          a.classList.toggle('on', parseInt(a.dataset.v, 10) === amt)
        );
        syncDerivedUI();
      });
    }

    /* ── Manual input ── */
    on('dAmtIn', 'input', e => {
      amt = parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 0;
      const g = document.getElementById('dAmtGrid');
      if (g) g.querySelectorAll('.damt').forEach(a => a.classList.remove('on'));
      syncDerivedUI();
    });

    /* ── Promo toggle ── */
    on('dBonusToggle', 'click', e => {
      e.preventDefault();
      bonusBoxOpen = !bonusBoxOpen;
      const box = document.getElementById('dBonusBox');
      if (box) box.classList.toggle('show', bonusBoxOpen);
    });

    /* ── Promo input ── */
    on('dBonusIn', 'input', e => { bonusInput = e.target.value; });

    /* ── Promo apply ── */
    on('dBonusApply', 'click', () => {
      const c = bonusInput.trim();
      if (!c) {
        bonusState = 'bad_empty'; bonusActive = false;
      } else if (c === PROMO_CODE) {
        bonusState = 'ok'; bonusActive = true;
      } else {
        bonusState = 'bad'; bonusActive = false;
      }
      const msgs = {
        ok:        `<div class="dOk">✔ Bonus activated: ${Math.round(BONUS_RATE * 100)}%</div>`,
        bad:       `<div class="dBad">✖ Invalid code</div>`,
        bad_empty: `<div class="dBad">✖ Enter a promo code</div>`,
      };
      const el = document.getElementById('dBonusState');
      if (el) el.innerHTML = msgs[bonusState] || '';
      syncDerivedUI();
    });

    /* ── Agree checkbox ── */
    on('dAgree', 'change', e => { agreed = e.target.checked; });

    /* ── Pay (screen 0 → 1) ── */
    on('dPayBtn', 'click', () => {
      if (!agreed) { alert('Please accept the terms first.'); return; }
      goTo(1);
    });

    /* ── Pay now (screen 1 → 2) ── */
    on('dPayNow', 'click', () => goTo(2));

    /* ── Copy address ── */
    on('dCpy', 'click', async () => {
      const btn = document.getElementById('dCpy');
      try {
        await navigator.clipboard.writeText(ADDR);
        if (btn) { btn.textContent = '✓'; setTimeout(() => { btn.textContent = '⎘'; }, 900); }
      } catch {
        window.prompt('Copy address:', ADDR);
      }
    });
  }

  /* Helper: addEventListener by element id */
  function on(id, evt, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(evt, fn);
  }

  /* ══════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════ */
  window.DepositPage = {
    /**
     * mount(containerEl, opts)
     * @param {HTMLElement} containerEl  — <section id="dep">
     * @param {object}      opts         — { addr: "TRC20_address" }
     */
    mount(containerEl, opts) {
      /* ── Reset state ── */
      ADDR         = (opts && opts.addr) ? opts.addr : DEFAULT_ADDR;
      screen       = 0;
      navHistory   = [0];
      amt          = 4300;
      bonusActive  = false;
      bonusInput   = '';
      bonusState   = '';
      bonusBoxOpen = false;
      agreed       = true;
      waitSecs     = 0;
      stopTimer();

      rootEl = containerEl;

      /* ── Inject CSS once ── */
      injectCSS();

      /* ── Render HTML ── */
      rootEl.innerHTML = buildHTML();

      /* ── Slide-in animation ── */
      const modal = document.getElementById('depModal');
      if (modal) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          modal.classList.remove('dep-hidden');
        }));
      }

      /* ── Bind events ── */
      bindEvents();

      /* ── Lock body scroll ── */
      document.body.style.overflow = 'hidden';
    },
  };

})();
