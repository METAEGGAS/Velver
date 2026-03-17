/* BTC/USDT — Vanilla JS UI (no HTML required)
   - يبني الواجهة كاملة بالجافاسكريبت + يحقن الـ CSS
   - يحتاج إنك تشغّله داخل صفحة (script) لأنه هيضيف عناصر للـ DOM
*/

(() => {
  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function el(tag, opts = {}, children = []) {
    const node = document.createElement(tag);

    if (opts.class) node.className = opts.class;
    if (opts.id) node.id = opts.id;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.html != null) node.innerHTML = opts.html;

    if (opts.attrs) {
      for (const [k, v] of Object.entries(opts.attrs)) {
        node.setAttribute(k, v);
      }
    }

    if (opts.style) {
      for (const [k, v] of Object.entries(opts.style)) {
        node.style[k] = v;
      }
    }

    if (opts.on) {
      for (const [evt, fn] of Object.entries(opts.on)) {
        node.addEventListener(evt, fn);
      }
    }

    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });

    return node;
  }

  function injectStyle(cssText) {
    const st = document.createElement("style");
    st.textContent = cssText;
    document.head.appendChild(st);
    return st;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // لو متحمّل قبل كده
      const existing = Array.from(document.scripts).find((s) => s.src === src);
      if (existing) {
        if (window.TradingView) return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Script load error")));
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Script load error"));
      document.head.appendChild(s);
    });
  }

  // ---------- Document base tweaks ----------
  document.title = "BTC/USDT";
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";

  // ---------- CSS (as-is) ----------
  injectStyle(`
*{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Tahoma,sans-serif}
html,body{height:100%;height:100dvh}
body{background:#0d1117;color:#fff;max-width:480px;margin:0 auto;display:flex;flex-direction:column;font-size:12px;overflow:hidden}

.hdr{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #1e2736}
.sym{font-size:17px;font-weight:700}.arr{font-size:16px;color:#777;margin-right:5px}.star{font-size:20px;color:#f5c518}

.price-sec{flex-shrink:0;display:flex;justify-content:space-between;align-items:center;padding:6px 14px;border-bottom:1px solid #1e2736}
.pl{font-size:10px;color:#8a9bb0;line-height:1.95}
.pr{text-align:left}
.pmain{font-size:22px;font-weight:700;color:#0ecb81;direction:ltr;transition:color .25s}
.pmain.dn{color:#f44336}
.psub{font-size:10px;color:#8a9bb0;direction:ltr;margin-top:1px}
.pct{color:#0ecb81}.pct.dn{color:#f44336}

.tf{flex-shrink:0;display:flex;gap:2px;padding:4px 10px;border-bottom:1px solid #1e2736}
.tfb{flex:1;text-align:center;padding:4px 0;border-radius:5px;font-size:10px;cursor:pointer;color:#8a9bb0;background:none;border:none}
.tfb.on{background:#1e3a5f;color:#3b9eff;font-weight:700}

.ctag{flex-shrink:0;padding:2px 14px;font-size:10px;color:#f44336}
.ctag span{color:#8a9bb0}

#chart{flex:5;min-height:0;width:100%}

/* ── LIVE BID/ASK BAR ── */
.ba-bar{flex-shrink:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:#0d1421;border-top:1px solid #1e2736;border-bottom:1px solid #1e2736;padding:0 10px;height:48px}
.ba-sell{display:flex;flex-direction:column;align-items:flex-start;gap:1px}
.ba-buy{display:flex;flex-direction:column;align-items:flex-end;gap:1px}
.ba-label{font-size:9px;color:#8a9bb0;letter-spacing:.5px;text-transform:uppercase}
.ba-price{font-size:15px;font-weight:800;direction:ltr;letter-spacing:.3px;transition:color .15s}
.ba-price.sell{color:#f44336}
.ba-price.buy{color:#0ecb81}
.ba-price.flash-up{animation:fu .3s}
.ba-price.flash-dn{animation:fd .3s}
@keyframes fu{0%{background:#0ecb8133;border-radius:4px}100%{background:transparent}}
@keyframes fd{0%{background:#f4433633;border-radius:4px}100%{background:transparent}}
.ba-change{font-size:9px;direction:ltr}
.ba-change.up{color:#0ecb81}.ba-change.dn{color:#f44336}
.ba-mid{display:flex;flex-direction:column;align-items:center;gap:2px;padding:0 10px}
.ba-spread-lbl{font-size:8px;color:#8a9bb0}
.ba-spread-val{font-size:11px;font-weight:700;color:#fff}
.ba-dot{width:7px;height:7px;border-radius:50%;background:#1e3a5f;border:2px solid #3b9eff;animation:pp 1s infinite}
@keyframes pp{0%,100%{box-shadow:0 0 0 0 #3b9eff55}50%{box-shadow:0 0 0 4px #3b9eff00}}

.obt{flex-shrink:0;display:flex;border-bottom:1px solid #1e2736}
.obt-btn{flex:1;text-align:center;padding:6px 0;font-size:12px;color:#8a9bb0;cursor:pointer;border-bottom:2px solid transparent}
.obt-btn.on{color:#fff;border-color:#3b9eff;font-weight:600}

.obw{flex:4;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.obh{flex-shrink:0;display:grid;grid-template-columns:1fr 1fr 1fr;padding:3px 10px;color:#8a9bb0;font-size:10px;border-bottom:1px solid #1e2736}
.obh span:last-child{text-align:left}
.obb{flex:1;overflow:hidden;display:flex;flex-direction:column}
.obr{display:grid;grid-template-columns:1fr 1fr 1fr;padding:0 10px;position:relative;flex:1}
.obr .bg{position:absolute;top:0;height:100%;opacity:.13;border-radius:1px}
.bgs{right:0;background:#f44336}.bgb{left:0;background:#0ecb81}
.sq{text-align:right;color:#f44336;z-index:1;display:flex;align-items:center;justify-content:flex-end;font-size:10.5px}
.mp{text-align:center;color:#c8d3de;z-index:1;display:flex;align-items:center;justify-content:center;font-size:10.5px}
.bq{text-align:left;color:#0ecb81;z-index:1;display:flex;align-items:center;font-size:10.5px}
.spd{flex-shrink:0;display:grid;grid-template-columns:1fr 1fr 1fr;padding:4px 10px;background:#111c2b}
.sp-p{text-align:center;font-size:12px;font-weight:700;color:#0ecb81;transition:color .25s}
.sp-p.dn{color:#f44336}.sp-d{text-align:left;font-size:10px;color:#8a9bb0;padding-top:1px}

.btns{flex-shrink:0;display:grid;grid-template-columns:1fr 1fr;height:50px}
.bsell{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;font-size:17px;font-weight:800;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;letter-spacing:2px}
.bbuy{background:linear-gradient(135deg,#0a9e60,#0ecb81);color:#fff;font-size:17px;font-weight:800;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;letter-spacing:2px}
.bsell::before{content:'▼';font-size:11px;opacity:.75}.bbuy::after{content:'▲';font-size:11px;opacity:.75}
.bsell:active{filter:brightness(.8)}.bbuy:active{filter:brightness(.8)}

.dot{width:6px;height:6px;background:#0ecb81;border-radius:50%;display:inline-block;margin-right:3px;animation:p 1s infinite}
@keyframes p{0%,100%{opacity:1}50%{opacity:.2}}

.ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99;display:none;align-items:flex-end;justify-content:center}
.ov.show{display:flex}
.mb{width:100%;max-width:480px;background:#141d2b;border-radius:18px 18px 0 0;padding:16px 14px 22px;border-top:2px solid #1e3a5f;animation:su .2s ease}
@keyframes su{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
.mtop{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.mlbl{padding:3px 14px;border-radius:20px;font-size:13px;font-weight:700}
.mlbl.s{background:#e74c3c22;color:#e74c3c;border:1px solid #e74c3c55}
.mlbl.b{background:#0ecb8122;color:#0ecb81;border:1px solid #0ecb8155}
.mx{font-size:20px;color:#8a9bb0;cursor:pointer;padding:0 4px}
.irow{display:flex;align-items:center;background:#0d1117;border:1px solid #1e3a5f;border-radius:10px;overflow:hidden;margin-bottom:10px}
.irow input{flex:1;background:none;border:none;outline:none;color:#fff;font-size:15px;padding:12px;direction:ltr}
.irow input::placeholder{color:#3a4a5e;font-size:13px}
.pbtn{background:#1e3a5f;color:#3b9eff;border:none;padding:12px 14px;font-size:11px;font-weight:700;cursor:pointer}
.pbtn:active{background:#163060}
.ihint{display:flex;justify-content:space-between;font-size:10px;color:#8a9bb0;margin-bottom:14px;padding:0 2px}
.cfbtn{width:100%;padding:14px;border:none;border-radius:10px;font-size:16px;font-weight:800;cursor:pointer}
.cfbtn:active{filter:brightness(.85)}
.cfbtn.s{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff}
.cfbtn.b{background:linear-gradient(135deg,#0a9e60,#0ecb81);color:#fff}
  `.trim());

  // ---------- Build DOM بالكامل ----------
  // ملاحظة: هنفضّي الـ body ونبني من الصفر
  document.body.innerHTML = "";

  const hdr = el("div", { class: "hdr" }, [
    el("div", { style: { display: "flex", alignItems: "center" } }, [
      el("span", { class: "arr", text: "←" }),
      el("span", { class: "sym", text: "BTC/USDT" }),
    ]),
    el("span", { class: "star", text: "★" }),
  ]);

  const priceSec = el("div", { class: "price-sec" }, [
    el("div", { class: "pl" }, [
      el("span", { html: `مرتفع &nbsp;<b id="sh">—</b>` }),
      el("span", { html: `منخفض &nbsp;<b id="sl">—</b>` }),
      el("span", { html: `الحجم &nbsp;<b id="sv">—</b>` }),
      el("span", { html: `<span class="dot"></span>24 ساعة` }),
    ]),
    el("div", { class: "pr" }, [
      el("div", { class: "pmain", id: "mp", text: "جاري..." }),
      el("div", { class: "psub" }, [
        document.createTextNode("$"),
        el("span", { id: "sp2", text: "—" }),
        document.createTextNode(" "),
        el("span", { class: "pct", id: "spct", text: "—" }),
      ]),
    ]),
  ]);

  const tf = el("div", { class: "tf" }, [
    el("button", { class: "tfb on", text: "دقيقة1" }),
    el("button", { class: "tfb", text: "دقيقة5" }),
    el("button", { class: "tfb", text: "دقيقة15" }),
    el("button", { class: "tfb", text: "دقيقة30" }),
    el("button", { class: "tfb", text: "أكثر▲" }),
    el("button", { class: "tfb", text: "فهرس" }),
  ]);

  const ctag = el("div", { class: "ctag", id: "ctag", html: `— <span>—</span>` });
  const chart = el("div", { id: "chart" });

  // LIVE BID/ASK BAR
  const baBar = el("div", { class: "ba-bar" }, [
    el("div", { class: "ba-sell" }, [
      el("span", { class: "ba-label", text: "▼ سعر البيع" }),
      el("span", { class: "ba-price sell", id: "ba-ask", text: "—" }),
      el("span", { class: "ba-change dn", id: "ba-ask-ch", text: "—" }),
    ]),
    el("div", { class: "ba-mid" }, [
      el("span", { class: "ba-spread-lbl", text: "فارق" }),
      el("span", { class: "ba-dot" }),
      el("span", { class: "ba-spread-val", id: "ba-sp", text: "—" }),
    ]),
    el("div", { class: "ba-buy" }, [
      el("span", { class: "ba-label", text: "سعر الشراء ▲" }),
      el("span", { class: "ba-price buy", id: "ba-bid", text: "—" }),
      el("span", { class: "ba-change up", id: "ba-bid-ch", text: "—" }),
    ]),
  ]);

  const obt = el("div", { class: "obt" }, [
    el("div", { class: "obt-btn on", text: "دفتر الأوامر" }),
    el("div", { class: "obt-btn", text: "السجلات" }),
  ]);

  const obw = el("div", { class: "obw" }, [
    el("div", { class: "obh" }, [
      el("span", { text: "بيع" }),
      el("span", { text: "سعر(USDT)", style: { textAlign: "center" } }),
      el("span", { text: "شراء" }),
    ]),
    el("div", { class: "obb", id: "obb" }),
    el("div", { class: "spd" }, [
      el("span"),
      el("span", { class: "sp-p", id: "spp", text: "—" }),
      el("span", { class: "sp-d", id: "spd", text: "—" }),
    ]),
  ]);

  const btns = el("div", { class: "btns" }, [
    el("button", { class: "bsell", text: "بيع" }),
    el("button", { class: "bbuy", text: "شراء" }),
  ]);

  // Modal / Overlay
  const ov = el("div", { class: "ov", id: "ov" });
  const mb = el("div", { class: "mb" });

  const mlbl = el("span", { class: "mlbl s", id: "mlbl", text: "بيع BTC" });
  const mx = el("span", { class: "mx", text: "✕" });

  const mtop = el("div", { class: "mtop" }, [mlbl, mx]);

  const ti = el("input", {
    attrs: { type: "number", id: "ti", placeholder: "الكمية بـ BTC..." },
  });

  const pbtn = el("button", { class: "pbtn", text: "📋 لصق" });

  const irow = el("div", { class: "irow" }, [ti, pbtn]);

  const est = el("span", { id: "est", text: "≈ — USDT" });
  const ihint = el("div", { class: "ihint" }, [el("span", { text: "الكمية" }), est]);

  const cfbtn = el("button", { class: "cfbtn s", id: "cfbtn", text: "✔ تأكيد البيع" });

  mb.appendChild(mtop);
  mb.appendChild(irow);
  mb.appendChild(ihint);
  mb.appendChild(cfbtn);
  ov.appendChild(mb);

  document.body.appendChild(hdr);
  document.body.appendChild(priceSec);
  document.body.appendChild(tf);
  document.body.appendChild(ctag);
  document.body.appendChild(chart);
  document.body.appendChild(baBar);
  document.body.appendChild(obt);
  document.body.appendChild(obw);
  document.body.appendChild(btns);
  document.body.appendChild(ov);

  // ---------- Logic (Vanilla JS) ----------
  const ivm = { "دقيقة1": "1", "دقيقة5": "5", "دقيقة15": "15", "دقيقة30": "30" };
  let tv = null;

  function lc(interval = "1") {
    if (!window.TradingView) return;
    if (tv && typeof tv.remove === "function") {
      try { tv.remove(); } catch (_) {}
    }
    $("#chart").innerHTML = "";
    tv = new window.TradingView.widget({
      container_id: "chart",
      width: "100%",
      height: "100%",
      symbol: "BINANCE:BTCUSDT",
      interval,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,
      allow_symbol_change: false,
      details: false,
      hotlist: false,
      calendar: false,
      studies: [],
      backgroundColor: "#0d1117",
      gridColor: "rgba(255,255,255,0.04)",
    });
  }

  // Timeframe buttons behavior
  $$(".tfb").forEach((b) => {
    b.addEventListener("click", () => {
      $$(".tfb").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      const t = b.textContent.trim();
      lc(ivm[t] || "1");
    });
  });

  // Orderbook tab buttons highlight
  $$(".obt-btn").forEach((b) => {
    b.addEventListener("click", () => {
      $$(".obt-btn").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
    });
  });

  // Modal state
  let cs = "s"; // s sell, b buy
  let lp = 0;
  let cp = 0;

  function openM(side) {
    cs = side;
    if (side === "s") {
      mlbl.textContent = "بيع BTC";
      mlbl.className = "mlbl s";
      cfbtn.textContent = "✔ تأكيد البيع";
      cfbtn.className = "cfbtn s";
    } else {
      mlbl.textContent = "شراء BTC";
      mlbl.className = "mlbl b";
      cfbtn.textContent = "✔ تأكيد الشراء";
      cfbtn.className = "cfbtn b";
    }
    ti.value = "";
    est.textContent = "≈ — USDT";
    ov.classList.add("show");
  }

  function closeM() {
    ov.classList.remove("show");
  }

  function updEst() {
    const v = +ti.value;
    est.textContent =
      v && cp
        ? "≈ " + (v * cp).toLocaleString("en", { maximumFractionDigits: 2 }) + " USDT"
        : "≈ — USDT";
  }

  async function doP() {
    try {
      const t = await navigator.clipboard.readText();
      const n = +String(t).trim();
      if (!Number.isNaN(n) && n > 0) {
        ti.value = String(n);
        updEst();
      }
    } catch (_) {
      ti.focus();
    }
  }

  function doTrade() {
    const v = +ti.value;
    if (!v || v <= 0) {
      ti.style.outline = "2px solid #e74c3c";
      setTimeout(() => (ti.style.outline = ""), 700);
      return;
    }
    alert(
      `✅ تم تأكيد ${cs === "s" ? "البيع" : "الشراء"}\n` +
        `الكمية: ${v} BTC\n` +
        `السعر: ${cp.toFixed(2)} USDT\n` +
        `الإجمالي: ${(v * cp).toLocaleString("en", { maximumFractionDigits: 2 })} USDT`
    );
    closeM();
  }

  // Modal events
  btns.children[0].addEventListener("click", () => openM("s"));
  btns.children[1].addEventListener("click", () => openM("b"));
  mx.addEventListener("click", closeM);
  ov.addEventListener("click", (e) => {
    if (e.target === ov) closeM();
  });
  ti.addEventListener("input", updEst);
  pbtn.addEventListener("click", doP);
  cfbtn.addEventListener("click", doTrade);

  // Utilities
  function fq(v) {
    const n = +v;
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : n.toFixed(0);
  }

  // ---------- Binance WebSockets ----------
  // 1) ticker
  const wsTicker = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
  wsTicker.onmessage = (e) => {
    const d = JSON.parse(e.data);
    cp = +d.c;
    const ch = +d.P;

    const m = $("#mp");
    m.textContent = cp.toFixed(2);
    m.className = "pmain" + (cp < lp ? " dn" : "");

    $("#sp2").textContent = cp.toFixed(5);

    const pct = $("#spct");
    pct.textContent = (ch > 0 ? "+" : "") + ch.toFixed(2) + "%";
    pct.className = "pct" + (ch < 0 ? " dn" : "");

    $("#sh").textContent = (+d.h).toFixed(2);
    $("#sl").textContent = (+d.l).toFixed(2);
    $("#sv").textContent = (+d.q / 1e9).toFixed(2) + "B";

    const df = (cp - (lp || cp)).toFixed(2);
    $("#ctag").innerHTML = `${cp.toFixed(2)} <span>${df >= 0 ? "+" : ""}${df} (${ch.toFixed(
      2
    )}%)</span>`;

    const spp = $("#spp");
    spp.textContent = cp.toFixed(1);
    spp.className = "sp-p" + (cp < lp ? " dn" : "");

    lp = cp;
    updEst();
  };

  // 2) bookTicker (bid/ask)
  let prevAsk = 0,
    prevBid = 0;

  const wsBook = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");
  wsBook.onmessage = (e) => {
    const d = JSON.parse(e.data);
    const ask = +d.a,
      bid = +d.b;

    const askEl = $("#ba-ask");
    const bidEl = $("#ba-bid");

    // Ask flash
    if (prevAsk && ask !== prevAsk) {
      askEl.classList.remove("flash-up", "flash-dn");
      void askEl.offsetWidth;
      askEl.classList.add(ask > prevAsk ? "flash-up" : "flash-dn");
    }
    const askDiff = prevAsk ? (ask - prevAsk).toFixed(1) : "0";
    askEl.textContent = ask.toFixed(2);

    const askCh = $("#ba-ask-ch");
    askCh.textContent = (Number(askDiff) > 0 ? "+" : "") + askDiff;
    askCh.className = "ba-change " + (Number(askDiff) >= 0 ? "up" : "dn");

    // Bid flash
    if (prevBid && bid !== prevBid) {
      bidEl.classList.remove("flash-up", "flash-dn");
      void bidEl.offsetWidth;
      bidEl.classList.add(bid > prevBid ? "flash-up" : "flash-dn");
    }
    const bidDiff = prevBid ? (bid - prevBid).toFixed(1) : "0";
    bidEl.textContent = bid.toFixed(2);

    const bidCh = $("#ba-bid-ch");
    bidCh.textContent = (Number(bidDiff) > 0 ? "+" : "") + bidDiff;
    bidCh.className = "ba-change " + (Number(bidDiff) >= 0 ? "up" : "dn");

    // Spread
    $("#ba-sp").textContent = (ask - bid).toFixed(2);

    prevAsk = ask;
    prevBid = bid;
  };

  // 3) order book depth
  const wsDepth = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth20@500ms");
  wsDepth.onmessage = (e) => {
    const d = JSON.parse(e.data);
    const asks = d.asks.slice(0, 10);
    const bids = d.bids.slice(0, 10);

    const mA = Math.max(...asks.map((x) => +x[1]));
    const mB = Math.max(...bids.map((x) => +x[1]));

    let h = "";

    // asks (reverse)
    asks
      .slice()
      .reverse()
      .forEach((a) => {
        const w = Math.round((+a[1] / mA) * 100);
        h +=
          `<div class="obr">` +
          `<div class="bg bgs" style="width:${w}%"></div>` +
          `<span class="sq">${fq(a[1])}</span>` +
          `<span class="mp">${(+a[0]).toFixed(1)}</span>` +
          `<span class="bq"></span>` +
          `</div>`;
      });

    // bids
    bids.forEach((b) => {
      const w = Math.round((+b[1] / mB) * 100);
      h +=
        `<div class="obr">` +
        `<div class="bg bgb" style="width:${w}%"></div>` +
        `<span class="sq"></span>` +
        `<span class="mp">${(+b[0]).toFixed(1)}</span>` +
        `<span class="bq">${fq(b[1])}</span>` +
        `</div>`;
    });

    $("#obb").innerHTML = h;

    if (asks[0] && bids[0]) {
      $("#spd").textContent = "▼ " + (+asks[0][0] - +bids[0][0]).toFixed(1);
    }
  };

  // ---------- TradingView script init ----------
  loadScript("https://s3.tradingview.com/tv.js")
    .then(() => lc("1"))
    .catch(() => {
      // لو tv.js ما اتحمّلتش لأي سبب
      $("#chart").innerHTML =
        `<div style="padding:10px;color:#8a9bb0;font-size:12px">` +
        `تعذّر تحميل TradingView (tv.js). تأكد من الاتصال أو السماح بتحميل السكربت الخارجي.` +
        `</div>`;
    });

  // (اختياري) تنظيف عند إغلاق الصفحة
  window.addEventListener("beforeunload", () => {
    try { wsTicker.close(); } catch (_) {}
    try { wsBook.close(); } catch (_) {}
    try { wsDepth.close(); } catch (_) {}
  });
})();
