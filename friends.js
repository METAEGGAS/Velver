// ============================================================
//  invitations.js  –  Vanilla JS  (لا حاجة لـ HTML)
// ============================================================

// ── 1. توليد كود دعوة عشوائي ─────────────────────────────
function genCode(len = 7) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < len; i++)
    c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

// ── 2. توليد نطاق عشوائي ────────────────────────────────
function genDomain() {
  const names = [
    'tradeflow','cryptovex','bitpulse','coinloop',
    'tradevault','nexcoin','cryptorise','tradepeak',
    'vaultex','bitzone','coinpro','tradehub'
  ];
  const tlds = ['.com', '.io', '.app', '.pro', '.net', '.trade'];
  return (
    names[Math.floor(Math.random() * names.length)] +
    tlds[Math.floor(Math.random() * tlds.length)]
  );
}

// ── 3. القيم العشوائية ──────────────────────────────────
const INVITE_CODE = genCode();
const DOMAIN      = genDomain();
const INVITE_LINK = `https://${DOMAIN}/register?inviteCode=${INVITE_CODE}`;

// ── 4. ضخ الـ CSS ────────────────────────────────────────
const css = `
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;
  font-family:Segoe UI,Tahoma,Arial,sans-serif}
body{margin:0;background:#0d0e1a;color:#fff;min-height:100vh;
  overflow-x:hidden;padding-bottom:92px;direction:rtl}
.app{width:100%;padding:0 12px 110px}
.top{position:sticky;top:0;z-index:20;background:#0d0e1a;
  display:flex;align-items:center;justify-content:center;padding:14px 0 12px}
.top h1{margin:0;font-size:22px;font-weight:900;letter-spacing:.2px}
.ic{border:0;background:none;color:#fff;padding:8px;cursor:pointer;
  display:flex;align-items:center;justify-content:center}
.back{position:absolute;left:4px;top:8px;width:40px;height:40px}
.back svg,.i svg{width:24px;height:24px;fill:none;stroke:#fff;
  stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.card{background:#141526;border:1.5px solid rgba(245,166,35,.18);
  border-radius:16px;padding:26px 10px 24px;
  box-shadow:0 10px 30px rgba(0,0,0,.22)}
.g{display:grid;grid-template-columns:1fr 1fr;gap:34px 8px;text-align:center}
.it b{display:block;font-size:16px;font-weight:800;color:#fff;
  margin-bottom:8px;line-height:1.5}
.it span{font-size:20px;font-weight:900;color:#f5a623}
.lbl{display:block;margin:24px 2px 9px;color:#a8afc7;font-size:15px;
  font-weight:700;text-align:right}
.fld{height:58px;background:#141526;border:1.5px solid #1e1f2e;
  border-radius:12px;padding:0 14px;display:grid;
  grid-template-columns:auto 1fr;gap:12px;align-items:center;
  direction:ltr;overflow:hidden}
.acts{display:flex;gap:6px}
.i{width:30px;height:30px}
.code{margin-left:auto;font-size:28px;font-weight:900;
  letter-spacing:1px;color:#fff}
.url{font-size:13px;font-weight:700;color:#d6d9e8;white-space:nowrap;
  overflow:auto hidden;scrollbar-width:none}
.url::-webkit-scrollbar{display:none}
.panel:empty{display:none}
.ph{margin:18px 0 4px;background:#141526;border:1.5px solid #1e1f2e;
  border-radius:14px;padding:18px;text-align:center;color:#9ca3af}
.ph h3{margin:0 0 8px;color:#fff;font-size:16px}
.foot{position:fixed;left:0;right:0;bottom:0;background:#141526;
  border-top:1px solid #1e2035;
  padding:12px 12px calc(12px + env(safe-area-inset-bottom));z-index:50}
.bar{display:grid;grid-template-columns:1fr 1fr;gap:12px;direction:ltr}
.btn{height:52px;border-radius:10px;border:1.5px solid #2c2f49;
  background:#0d0e1a;color:#fff;cursor:pointer;
  font-size:15px;font-weight:900}
.btn.dark{background:linear-gradient(90deg,#f5a623,#ffb93e);
  color:#0d0e1a;border-color:#f5a623;
  box-shadow:0 6px 20px rgba(245,166,35,.25)}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;
  place-items:center;opacity:0;pointer-events:none;transition:.2s;z-index:99}
.modal.on{opacity:1;pointer-events:auto}
.box{width:min(92vw,360px);background:#141526;
  border:1.5px solid rgba(245,166,35,.25);border-radius:18px;
  padding:18px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.box h3{margin:0 0 12px;font-size:18px;font-weight:900;color:#f5a623}
.box img{width:min(72vw,260px);height:auto;display:block;
  margin:0 auto 12px;background:#fff;padding:10px;border-radius:14px}
.toast{position:fixed;left:50%;top:16px;
  transform:translateX(-50%) translateY(-12px);
  background:#f5a623;color:#0d0e1a;padding:10px 14px;
  border-radius:999px;font-size:13px;font-weight:900;
  opacity:0;pointer-events:none;transition:.25s;z-index:120}
.toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
`;

const styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

// ── 5. بناء الـ HTML كاملاً ──────────────────────────────
document.title = 'الدعوات';

document.body.innerHTML = `
<main class="app">

  <!-- ─── هيدر ─────────────────────────────────────── -->
  <header class="top">
    <button class="ic back" id="btnBack" aria-label="رجوع">
      <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <h1>الدعوات</h1>
  </header>

  <!-- ─── بطاقة الإحصائيات ──────────────────────────── -->
  <section class="card">
    <div class="g">
      <div class="it">
        <b>عدد أعضاء الفريق</b>
        <span>1</span>
      </div>
      <div class="it">
        <b>عدد المستخدمين التابعين الفعالين</b>
        <span>0</span>
      </div>
      <div class="it">
        <b>عدد عمليات الشحن</b>
        <span>0</span>
      </div>
      <div class="it">
        <b>مبلغ الشحن (USDT)</b>
        <span>0</span>
      </div>
      <div class="it">
        <b>عدد نسخ التداول</b>
        <span>0</span>
      </div>
      <div class="it">
        <b>أرباح نسخ التداول</b>
        <span>0</span>
      </div>
    </div>
  </section>

  <!-- ─── رمز الدعوة ───────────────────────────────── -->
  <label class="lbl">رمز الدعوة الخاص بي</label>
  <div class="fld">
    <div class="acts">
      <button class="ic i" id="btnCopyCode" aria-label="نسخ الكود">
        <svg viewBox="0 0 24 24">
          <rect x="9" y="9" width="11" height="11" rx="1.5"/>
          <path d="M5 15V4h11"/>
        </svg>
      </button>
    </div>
    <div class="code" dir="ltr" id="codeDisplay">${INVITE_CODE}</div>
  </div>

  <!-- ─── رابط الدعوة ───────────────────────────────── -->
  <label class="lbl">رابط الدعوة</label>
  <div class="fld">
    <div class="acts">
      <button class="ic i" id="btnCopyLink" aria-label="نسخ الرابط">
        <svg viewBox="0 0 24 24">
          <rect x="9" y="9" width="11" height="11" rx="1.5"/>
          <path d="M5 15V4h11"/>
        </svg>
      </button>
      <button class="ic i" id="btnQR" aria-label="QR">
        <svg viewBox="0 0 24 24">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/>
          <path d="M16 14h2v2h-2zM14 18h2v2h-2zM18 16h2v4h-2z"/>
        </svg>
      </button>
    </div>
    <div class="url" dir="ltr" id="linkDisplay">${INVITE_LINK}</div>
  </div>

  <!-- ─── لوحة السجلات ─────────────────────────────── -->
  <section id="panel" class="panel"></section>

</main>

<!-- ─── فوتر ──────────────────────────────────────── -->
<footer class="foot">
  <div class="bar">
    <button class="btn dark" id="btnChargeLog">سجل شحن الفريق</button>
    <button class="btn"       id="btnInviteLog">سجل الدعوات</button>
  </div>
</footer>

<!-- ─── مودال QR ──────────────────────────────────── -->
<div id="qrModal" class="modal">
  <div class="box" id="qrBox">
    <h3>QR رابط الدعوة</h3>
    <img id="qrImg" alt="QR Code" src="">
    <button class="btn dark" style="width:100%;height:48px" id="btnCloseQR">
      إغلاق
    </button>
  </div>
</div>

<!-- ─── Toast ─────────────────────────────────────── -->
<div id="toastEl" class="toast"></div>
`;

// ── 6. ربط العناصر بالمتغيرات ──────────────────────────
const toastEl   = document.getElementById('toastEl');
const qrModal   = document.getElementById('qrModal');
const qrImg     = document.getElementById('qrImg');
const panel     = document.getElementById('panel');

// ── 7. دوال المساعدة ────────────────────────────────────

/** عرض رسالة Toast */
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove('on'), 1800);
}

/** نسخ نص للحافظة */
function copyText(val) {
  if (navigator.clipboard && location.protocol === 'https:') {
    navigator.clipboard.writeText(val).then(() => toast('✅ تم النسخ'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = val;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('✅ تم النسخ');
  }
}

/** عرض سجل في اللوحة السفلية */
function showLog(title) {
  panel.innerHTML = `
    <div class="ph">
      <h3>${title}</h3>
      <p>لا توجد بيانات حالياً</p>
    </div>`;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

/** فتح / إغلاق مودال QR */
function openQR() {
  const encoded = encodeURIComponent(INVITE_LINK);
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encoded}`;
  qrModal.classList.add('on');
}
function closeQR() {
  qrModal.classList.remove('on');
}

// ── 8. ربط الأحداث ──────────────────────────────────────
document.getElementById('btnBack')      .addEventListener('click', () => history.back());
document.getElementById('btnCopyCode')  .addEventListener('click', () => copyText(INVITE_CODE));
document.getElementById('btnCopyLink')  .addEventListener('click', () => copyText(INVITE_LINK));
document.getElementById('btnQR')        .addEventListener('click', openQR);
document.getElementById('btnCloseQR')   .addEventListener('click', closeQR);
document.getElementById('qrModal')      .addEventListener('click', closeQR);
document.getElementById('qrBox')        .addEventListener('click', e => e.stopPropagation());
document.getElementById('btnChargeLog') .addEventListener('click', () => showLog('سجل شحن الفريق'));
document.getElementById('btnInviteLog') .addEventListener('click', () => showLog('سجل الدعوات'));
