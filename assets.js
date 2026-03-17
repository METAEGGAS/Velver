/* ============================================================
   AIMBIT — Vanilla JS (no HTML template)
   ============================================================ */
(function () {

  /* ── 1. META & BASE SETUP ─────────────────────────────── */
  document.documentElement.lang = 'ar';
  document.documentElement.dir  = 'rtl';
  document.title = 'AIMBIT';

  const meta1 = Object.assign(document.createElement('meta'), { charset: 'utf-8' });
  const meta2 = Object.assign(document.createElement('meta'), { name: 'viewport',
    content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' });
  document.head.append(meta1, meta2);

  /* ── 2. STYLES ────────────────────────────────────────── */
  const css = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;
  font-family:Segoe UI,Tahoma,Arial,sans-serif}
body{background:#0d0e1a;color:#fff;min-height:100vh}
button,input{font:inherit}
a{color:inherit;text-decoration:none}
.app{max-width:560px;margin:0 auto;min-height:100vh;background:#0d0e1a;padding-bottom:22px}
.top{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;
  position:sticky;top:0;z-index:9;background:#0d0e1a;border-bottom:1px solid rgba(255,255,255,.05)}
.top .l{color:#cfd2e6;font-weight:800;font-size:14px;opacity:.95}
.top .r{display:flex;align-items:center;gap:10px;color:#cfd2e6;font-weight:900;font-size:14px}
.plus{width:22px;height:22px;border-radius:7px;border:1px solid rgba(245,166,35,.6);
  display:inline-flex;align-items:center;justify-content:center;color:#f5a623;
  font-weight:900;line-height:1;cursor:pointer}
.wrap{padding:12px 16px}
.label{display:flex;align-items:center;justify-content:flex-end;gap:10px;color:#b5b8cc;font-size:14px}
.eye{width:22px;height:22px;cursor:pointer;touch-action:none;
  filter:drop-shadow(0 8px 18px rgba(0,0,0,.35))}
.eye path,.eye circle{stroke:#e6e8f7;stroke-width:2.4;fill:none}
.vals{display:flex;justify-content:flex-end;align-items:baseline;gap:10px;margin-top:8px}
.usd{color:#8f93ad;font-size:14px}
.amt{font-size:40px;font-weight:950;letter-spacing:.6px}
.mid{padding:10px 16px 6px;text-align:center}
.card{background:linear-gradient(180deg,#141526,#101122);border:1px solid #1e1f2e;
  border-radius:18px;padding:14px;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.ill{width:150px;height:130px;margin:4px auto 8px;display:block;
  filter:drop-shadow(0 12px 26px rgba(0,0,0,.45))}
.msg{color:#b5b8cc;font-size:14px;line-height:1.8;text-align:center;
  margin:6px auto 12px;max-width:420px}
.btn{width:100%;border:0;border-radius:28px;padding:14px 18px;
  background:linear-gradient(90deg,#000,#0b0b10);color:#fff;font-weight:950;
  font-size:16px;cursor:pointer;box-shadow:0 10px 22px rgba(0,0,0,.35)}
.btn:active{opacity:.82}
.box{margin:14px 16px 0;background:#141526;border:1px solid #1e1f2e;border-radius:18px;
  padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.28)}
.pieRow{display:flex;gap:14px;align-items:center}
.pie{width:120px;height:120px;border-radius:50%;
  background:conic-gradient(#66c7ff 0 92deg,transparent 92deg 96deg,
    #6a66ff 96deg 188deg,transparent 188deg 192deg,
    #a855f7 192deg 284deg,transparent 284deg 288deg,
    #f5a623 288deg 360deg);
  position:relative;flex:0 0 auto}
.pie:after{content:"";position:absolute;inset:16px;border-radius:50%;
  background:#141526;border:1px solid rgba(255,255,255,.06)}
.leg{flex:1;display:flex;flex-direction:column;gap:10px}
.it{display:flex;align-items:center;justify-content:space-between;gap:12px;
  color:#cfd2e6;font-size:14px}
.dot{width:10px;height:10px;border-radius:50%;display:inline-block;flex:0 0 10px}
.nm{display:flex;align-items:center;gap:10px}
.pct{color:#8f93ad}
.d1{background:#66c7ff}.d2{background:#6a66ff}
.d3{background:#a855f7}.d4{background:#f5a623}
.sec{margin:12px 16px 0;background:#141526;border:1px solid #1e1f2e;border-radius:18px;
  padding:14px;box-shadow:0 14px 34px rgba(0,0,0,.28)}
.hd{display:flex;align-items:center;justify-content:space-between;gap:10px}
.hd b{font-size:16px;font-weight:950}
.tog{display:flex;align-items:center;gap:10px;color:#b5b8cc;font-size:13px;user-select:none}
.ck{width:18px;height:18px;border-radius:50%;border:1px solid rgba(255,255,255,.25);
  display:inline-flex;align-items:center;justify-content:center;
  background:#0d0e1a;cursor:pointer;flex:0 0 18px}
.ck.on{background:#000;border-color:#000}
.ck svg{width:14px;height:14px;stroke:#fff;fill:none;stroke-width:2;opacity:0}
.ck.on svg{opacity:1}
.sub{margin-top:12px;border-top:1px solid rgba(255,255,255,.06);padding-top:12px;
  display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}
.lab{color:#8f93ad;font-size:12px}
.val{color:#cfd2e6;font-weight:950;margin-top:4px;font-size:13px}
.rt{text-align:right}.lt{text-align:left}
.mut{opacity:.65}
/* hint: مخفي دائماً */
.hint{display:none !important}
.toast{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;
  background:rgba(20,21,38,.95);border:1px solid rgba(245,166,35,.25);
  color:#e9ecff;border-radius:14px;padding:10px 12px;font-size:13px;
  display:none;z-index:9999;max-width:min(520px,92vw);text-align:center;
  backdrop-filter:blur(6px)}
.toast.on{display:block}
.bar{height:4px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:8px}
.bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#f5a623,#ffd089)}
/* deposit */
#dep{display:none}
.depTop{display:flex;align-items:center;gap:10px;padding:14px 16px;position:sticky;
  top:0;background:#0d0e1a;z-index:9;border-bottom:1px solid rgba(255,255,255,.05)}
.bk{width:36px;height:36px;border-radius:12px;background:#141526;border:1px solid #1e1f2e;
  display:flex;align-items:center;justify-content:center;cursor:pointer}
.bk svg{width:22px;height:22px;stroke:#fff;fill:none;stroke-width:2}
.depTitle{flex:1;text-align:center;font-weight:950;color:#f5a623}
.depCard{margin:14px 16px;background:#141526;border:1px solid rgba(245,166,35,.18);
  border-radius:18px;padding:14px;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.in{width:100%;background:#0d0e1a;border:1.6px solid rgba(245,166,35,.3);
  color:#fff;border-radius:12px;padding:12px;outline:none;font-weight:900;direction:ltr}
.in:focus{border-color:#f5a623;box-shadow:0 0 0 3px rgba(245,166,35,.12)}
.lbl{display:block;color:#b5b8cc;font-size:12px;margin:0 0 8px;font-weight:900}
.b2{width:100%;margin-top:10px;border:0;border-radius:14px;padding:13px;
  background:linear-gradient(90deg,#f5a623,#ffb93e);color:#0d0e1a;
  font-weight:950;cursor:pointer;box-shadow:0 10px 22px rgba(245,166,35,.25)}
.b2:active{opacity:.85}
.mini{margin-top:10px;color:#8f93ad;font-size:12px;line-height:1.7}
/* masked balance */
.amt.masked{letter-spacing:6px;filter:blur(6px);user-select:none}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── 3. HELPERS ───────────────────────────────────────── */
  const mk = (tag, props = {}) => Object.assign(document.createElement(tag), props);
  const svgNS = 'http://www.w3.org/2000/svg';

  function mkSvg(vb, inner) {
    const s = document.createElementNS(svgNS, 'svg');
    s.setAttribute('viewBox', vb);
    s.setAttribute('xmlns', svgNS);
    s.innerHTML = inner;
    return s;
  }

  const nf4 = x => Number(x || 0).toFixed(4);
  const nf2 = x => Number(x || 0).toFixed(2);

  const S = { balKey: 'aimbit_vbal', hideKey: 'aimbit_hide_small', rateKey: 'aimbit_rate_usd' };
  const getBal  = () => +localStorage.getItem(S.balKey)  || 0;
  const getRate = () => +localStorage.getItem(S.rateKey) || 1;
  const setBal  = v  => {
    v = Math.max(0, +v || 0);
    localStorage.setItem(S.balKey, String(v));
    render();
  };

  /* ── 4. BUILD DOM ─────────────────────────────────────── */

  /* root */
  const app = mk('div', { className: 'app' });
  document.body.appendChild(app);

  /* -------- HOME SECTION -------- */
  const home = mk('section', { id: 'home' });

  /* header */
  const header = mk('header', { className: 'top' });
  const backBtn = mk('div', { className: 'l', id: 'backBtn', textContent: 'عرض' });
  const rDiv    = mk('div', { className: 'r' });
  const secTip  = mk('span', { id: 'secTip', textContent: 'نصيحة أمنية' });
  const plus    = mk('span', { className: 'plus', id: 'plus', textContent: '+' });
  rDiv.append(secTip, plus);
  header.append(backBtn, rDiv);
  home.appendChild(header);

  /* wrap */
  const wrap  = mk('div', { className: 'wrap' });
  const label = mk('div', { className: 'label' });
  label.innerHTML = '<span>(USDT) القيمة الإجمالية المقدرة</span>';

  /* eye SVG */
  const eyeSvg = document.createElementNS(svgNS, 'svg');
  eyeSvg.setAttribute('viewBox', '0 0 24 24');
  eyeSvg.setAttribute('aria-label', 'عين');
  eyeSvg.classList.add('eye');
  eyeSvg.id = 'eye';
  eyeSvg.innerHTML = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>`;
  label.appendChild(eyeSvg);
  wrap.appendChild(label);

  const vals = mk('div', { className: 'vals' });
  const usdEl = mk('div', { className: 'usd', id: 'usd', textContent: '$0.00 ≈' });
  const amtEl = mk('div', { className: 'amt', id: 'amt', textContent: '0.0000' });
  vals.append(usdEl, amtEl);
  wrap.appendChild(vals);
  home.appendChild(wrap);

  /* mid / card */
  const mid  = mk('div', { className: 'mid' });
  const card = mk('div', { className: 'card' });

  /* illustration SVG */
  const illSvg = document.createElementNS(svgNS, 'svg');
  illSvg.setAttribute('viewBox', '0 0 220 180');
  illSvg.setAttribute('aria-hidden', 'true');
  illSvg.classList.add('ill');
  illSvg.innerHTML = `
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#60a5fa"/>
        <stop offset="1" stop-color="#2563eb"/>
      </linearGradient>
    </defs>
    <ellipse cx="130" cy="44" rx="28" ry="22" fill="#22c55e"/>
    <ellipse cx="170" cy="30" rx="16" ry="14" fill="#f59e0b"/>
    <ellipse cx="96"  cy="64" rx="30" ry="24" fill="#111827"/>
    <path d="M70 60l80-18 18 84-80 18z" fill="url(#g)"/>
    <path d="M92 78l70-16 13 60-70 16z" fill="#93c5fd"/>
    <path d="M96 80l62-14 10 46-62 14z" fill="#60a5fa" opacity=".35"/>
    <path d="M128 58c-8 2-14 10-12 18l10 46c2 8 10 14 18 12l38-9-16-71z" fill="#0b1220" opacity=".95"/>
    <path d="M120 101l40-9" stroke="#0b1220" stroke-width="10" stroke-linecap="round"/>
    <circle cx="120" cy="106" r="11" fill="#0b1220"/>
    <circle cx="120" cy="106" r="6"  fill="#111827"/>
    <path d="M80 52l70-16" stroke="#e5e7eb" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;

  const emptyMsg  = mk('div',    { className: 'msg', id: 'emptyMsg',
    textContent: 'الحساب فارغ، قم بإعادة الشحن أو الشراء الآن لفرصة الفوز بـ 1000USDT!' });
  const buyBtn    = mk('button', { className: 'btn', id: 'buyBtn', textContent: 'شراء سريع' });
  /* holdHint مخفي دائماً — موجود في DOM لكن CSS يخفيه */
  const holdHint  = mk('div',    { className: 'hint', id: 'holdHint',
    textContent: 'اضغط مطوّلًا على 👁️ لمدة 10 ثواني لإضافة رصيد افتراضي' });

  card.append(illSvg, emptyMsg, buyBtn, holdHint);
  mid.appendChild(card);
  home.appendChild(mid);

  /* box / pie */
  const box    = mk('div', { className: 'box' });
  const pieRow = mk('div', { className: 'pieRow' });
  const pieEl  = mk('div', { className: 'pie' });
  const leg    = mk('div', { className: 'leg' });

  const pieItems = [
    { cls: 'd1', label: 'السوق الفوري'  },
    { cls: 'd2', label: 'العقود الآجلة' },
    { cls: 'd3', label: 'الهامش'         },
    { cls: 'd4', label: 'التسليم'        },
  ];
  pieItems.forEach(p => {
    const it  = mk('div', { className: 'it' });
    const nm  = mk('div', { className: 'nm' });
    const dot = mk('span', { className: `dot ${p.cls}` });
    const lbl = mk('span', { textContent: p.label });
    const pct = mk('span', { className: 'pct', textContent: '0.00%' });
    nm.append(dot, lbl);
    it.append(nm, pct);
    leg.appendChild(it);
  });
  pieRow.append(pieEl, leg);
  box.appendChild(pieRow);
  home.appendChild(box);

  /* sec / wallet */
  const sec = mk('div', { className: 'sec' });
  const hd  = mk('div', { className: 'hd' });
  const hdB = mk('b',   { textContent: 'محفظتي' });
  const tog = mk('div', { className: 'tog' });

  const togLabel = mk('span', { textContent: 'إخفاء الأصول أقل من 1 USDT' });
  const ck       = mk('span', { className: 'ck on', id: 'hideCk',
    role: 'checkbox', tabIndex: 0 });
  ck.setAttribute('aria-checked', 'true');
  const ckSvg = document.createElementNS(svgNS, 'svg');
  ckSvg.setAttribute('viewBox', '0 0 24 24');
  ckSvg.innerHTML = `<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>`;
  ck.appendChild(ckSvg);
  tog.append(togLabel, ck);
  hd.append(hdB, tog);
  sec.appendChild(hd);

  const sub = mk('div', { className: 'sub', id: 'sub' });

  /* sub grid items */
  function makeSubItem(side, labText, valHTML) {
    const d   = mk('div', { className: side });
    const lab = mk('div', { className: 'lab', textContent: labText });
    const val = mk('div', { className: 'val' });
    val.innerHTML = valHTML;
    d.append(lab, val);
    return d;
  }
  sub.append(
    makeSubItem('rt', 'نسخ تداول العقد',
      '<span class="mut">مبلغ الربح</span> USDT <span id="profit">0.00</span>'),
    makeSubItem('lt', 'إجمالي مبلغ النسخ',
      'USDT <span id="copyTotal">0.00</span>'),
    makeSubItem('lt', 'معدل العائد',
      '<span id="roi">0.00</span>%'),
    makeSubItem('rt', '\u00a0', '\u00a0')
  );
  sec.appendChild(sub);
  home.appendChild(sec);
  app.appendChild(home);

  /* -------- DEPOSIT SECTION -------- */
  const dep = mk('section', { id: 'dep' });

  const depTop   = mk('div', { className: 'depTop' });
  const depBack  = mk('div', { className: 'bk', id: 'depBack' });
  const depBackSvg = document.createElementNS(svgNS, 'svg');
  depBackSvg.setAttribute('viewBox', '0 0 24 24');
  depBackSvg.innerHTML = `<path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>`;
  depBack.appendChild(depBackSvg);

  const depTitle   = mk('div', { className: 'depTitle', textContent: 'Deposit' });
  const depSpacer  = mk('div');
  depSpacer.style.width = '36px';
  depTop.append(depBack, depTitle, depSpacer);
  dep.appendChild(depTop);

  const depCard  = mk('div', { className: 'depCard' });
  const depLbl   = mk('label', { className: 'lbl', textContent: 'المبلغ (USDT)' });
  const depAmt   = mk('input', { className: 'in', id: 'depAmt',
    inputMode: 'decimal', placeholder: 'مثال: 25.5' });
  const depAddBtn = mk('button', { className: 'b2', id: 'depAdd', textContent: 'إضافة الرصيد' });
  const depMini  = mk('div', { className: 'mini',
    textContent: 'ملاحظة: دي صفحة إيداع تجريبية داخل نفس الملف—هتضيف رصيد افتراضي وتترجع تلقائيًا للرئيسية.' });
  depCard.append(depLbl, depAmt, depAddBtn, depMini);
  dep.appendChild(depCard);
  app.appendChild(dep);

  /* -------- TOAST -------- */
  const toastEl   = mk('div', { className: 'toast', id: 'toast' });
  const toastTxt  = mk('div', { id: 'toastTxt' });
  const barWrap   = mk('div', { className: 'bar' });
  const barFill   = mk('i',   { id: 'bar' });
  barWrap.appendChild(barFill);
  toastEl.append(toastTxt, barWrap);
  app.appendChild(toastEl);

  /* ── 5. LOGIC ─────────────────────────────────────────── */

  /* toast */
  let toastAnim = null;
  function toastShow(txt, ms = 2200) {
    toastTxt.textContent = txt;
    toastEl.classList.add('on');
    barFill.style.width = '0%';
    if (toastAnim) cancelAnimationFrame(toastAnim);
    const start = Date.now();
    const tick  = () => {
      const p = Math.min(1, (Date.now() - start) / ms);
      barFill.style.width = (p * 100) + '%';
      if (p < 1) { toastAnim = requestAnimationFrame(tick); }
      else        { toastEl.classList.remove('on'); toastAnim = null; }
    };
    toastAnim = requestAnimationFrame(tick);
  }

  /* balance masked state */
  let balMasked = false;

  /* render */
  function render() {
    const b = getBal(), r = getRate();
    usdEl.textContent  = '$' + nf2(b * r) + ' ≈';

    if (balMasked) {
      amtEl.textContent  = '••••';
      amtEl.classList.add('masked');
      usdEl.style.filter = 'blur(5px)';
    } else {
      amtEl.textContent  = nf4(b);
      amtEl.classList.remove('masked');
      usdEl.style.filter = '';
    }

    emptyMsg.style.display  = b > 0 ? 'none' : 'block';
    // holdHint is ALWAYS hidden via CSS — never touched

    document.getElementById('copyTotal').textContent = nf2(b);
    document.getElementById('profit').textContent    = nf2(0);
    document.getElementById('roi').textContent       = nf2(0);
  }

  /* page nav */
  function go(page) {
    if (page === 'dep') {
      home.style.display = 'none';
      dep.style.display  = 'block';
      window.scrollTo(0, 0);
      depAmt.focus();
    } else {
      dep.style.display  = 'none';
      home.style.display = 'block';
      window.scrollTo(0, 0);
    }
  }

  /* ── Eye: CLICK = toggle mask, LONG-PRESS 10s = add balance ── */
  const eye = document.getElementById('eye');
  let holdTimer = null, holdStart = 0, isArmed = false;

  function clearHold() {
    if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
    isArmed = false;
  }

  function startHold() {
    clearHold();
    isArmed   = true;
    holdStart = Date.now();

    toastShow('⌛ استمر ضاغط 10 ثواني لإضافة رصيد...', 10000);

    holdTimer = setTimeout(() => {
      isArmed = false;
      const v = prompt('أدخل الرصيد الافتراضي المراد إضافته (USDT):', '10');
      if (v == null) return;
      const n = parseFloat((v + '').trim().replace(',', '.'));
      if (!n || isNaN(n) || n <= 0) return toastShow('مبلغ غير صحيح');
      setBal(getBal() + n);
      toastShow('✅ تم إضافة ' + n + ' USDT');
    }, 10000);
  }

  function endHold(e) {
    if (isArmed && Date.now() - holdStart < 9800) {
      /* short tap → toggle mask */
      toastEl.classList.remove('on'); // cancel the 10s toast
      if (toastAnim) { cancelAnimationFrame(toastAnim); toastAnim = null; }
      balMasked = !balMasked;
      render();
    }
    clearHold();
  }

  eye.addEventListener('pointerdown',  e => { e.preventDefault(); startHold(); });
  eye.addEventListener('pointerup',    endHold);
  eye.addEventListener('pointercancel', endHold);
  eye.addEventListener('pointerleave', e => {
    if (isArmed && Date.now() - holdStart < 9800) {
      toastEl.classList.remove('on');
      clearHold();
    }
  });

  /* ── Other buttons ── */
  buyBtn.onclick     = () => go('dep');
  depBack.onclick    = () => go('home');

  depAddBtn.onclick  = () => {
    const v = (depAmt.value || '').trim().replace(',', '.');
    const n = parseFloat(v);
    if (!n || isNaN(n) || n <= 0) return toastShow('أدخل مبلغ صحيح');
    setBal(getBal() + n);
    depAmt.value = '';
    toastShow('✅ تم إضافة الرصيد');
    setTimeout(() => go('home'), 500);
  };

  secTip.onclick  = () => toastShow('نصيحة أمنية: فعّل 2FA ولا تشارك بياناتك.');
  plus.onclick    = () => secTip.click();
  backBtn.onclick = () => history.length > 1 ? history.back() : toastShow('رجوع');

  /* ── hide-small toggle ── */
  let hideSmall = localStorage.getItem(S.hideKey) !== '0';
  function setHide(v) {
    localStorage.setItem(S.hideKey, v ? '1' : '0');
    ck.classList.toggle('on', v);
    ck.setAttribute('aria-checked', v ? 'true' : 'false');
    sub.style.opacity = v ? '.75' : '1';
  }
  setHide(hideSmall);
  const doToggle = () => { hideSmall = !hideSmall; setHide(hideSmall); };
  ck.onclick   = doToggle;
  ck.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doToggle(); } };

  /* ── init ── */
  render();

})();
