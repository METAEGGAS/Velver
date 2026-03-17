import React, { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const ADDR       = "TJuW6QiLBZBgNgPZ4W2sUkqHa3i7gfvVch";
const PROMO_CODE = "70ZARCH";
const BONUS_RATE = 0.70;
const CUR        = "USD";
const AMOUNTS    = [500, 900, 1300, 2200, 4300, 10550, 42350, 105800];

/* ══════════════════════════════════════════
   GLOBAL CSS  (injected once into <head>)
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html,body{height:100%}
  body{
    font-family:Arial,sans-serif;
    background:#0a0e1a;
    color:#fff;
    direction:ltr;
    font-size:11px;
    overflow:hidden;
  }
  :root{
    --bg-card:#12192e;
    --bg-secondary:#0d1020;
    --gold:#ffd700;
    --gold2:#b8860b;
    --gold3:#ffe566;
  }

  /* ─── Modal wrapper ─── */
  #depModal{
    position:fixed;
    inset:0;
    z-index:9900;
    background:#0a0e1a;
    transition:transform .32s cubic-bezier(.4,0,.2,1);
    display:flex;
    flex-direction:column;
    overflow:hidden;
  }
  #depModal.dep-hidden{ transform:translateY(100%); }

  /* ─── Screens ─── */
  .dScr{display:none;flex:1;flex-direction:column;overflow-y:auto;-webkit-overflow-scrolling:touch}
  .dScr.on{display:flex}

  /* ─── Top bar ─── */
  #depModal .dtop{
    flex-shrink:0;height:48px;display:flex;align-items:center;justify-content:space-between;
    padding:8px 11px;
    background:linear-gradient(135deg,#0d1527 0%,#1a1000 50%,#0d1527 100%);
    border-bottom:2.5px solid var(--gold);
  }
  #depModal .dtop .t{font-size:14px;font-weight:900;color:var(--gold);letter-spacing:.2px}
  #depModal .dic{
    width:34px;height:34px;background:transparent;border:1.5px solid rgba(255,215,0,.4);
    border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;
    color:rgba(255,215,0,.75);font-size:17px;transition:.2s;
  }
  #depModal .dic:hover{background:rgba(255,215,0,.1);color:var(--gold);border-color:var(--gold)}

  /* ─── Screen 1 ─── */
  #depModal .dp{padding:12px 14px}
  #depModal .dgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  #depModal .damt{
    background:rgba(17,31,53,.65);border:1.5px solid rgba(255,215,0,.2);border-radius:11px;
    padding:12px;color:#fff;text-align:center;font-weight:1000;cursor:pointer;position:relative;
    transition:.15s;
  }
  #depModal .damt:hover{border-color:rgba(255,215,0,.4)}
  #depModal .damt.on{background:rgba(255,215,0,.12);border-color:var(--gold);color:var(--gold)}
  #depModal .damt.on::after{
    content:"✓";position:absolute;left:9px;top:7px;font-size:11px;color:var(--gold);
  }
  #depModal .dbar{margin-top:10px;display:flex;gap:8px;align-items:center}
  #depModal .din{
    background:rgba(17,31,53,.65);border:1.5px solid rgba(255,215,0,.3);
    border-radius:11px;padding:10px 12px;color:#fff;font-weight:900;outline:none;transition:.2s;
    flex:1;text-align:right;font-family:Arial,sans-serif;font-size:11px;width:100%;
  }
  #depModal .din:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(255,215,0,.08)}
  #depModal .dhint{
    margin:12px 0 0;color:rgba(255,215,0,.6);font-size:11px;
    display:flex;align-items:center;gap:7px;font-weight:900;
  }
  #depModal .dhint .q{
    width:15px;height:15px;border-radius:999px;border:1px solid rgba(255,215,0,.35);
    display:grid;place-items:center;font-size:10px;color:rgba(255,215,0,.6);
  }
  #depModal .dfoot{margin-top:auto;padding:15px 14px 18px;flex-shrink:0}
  #depModal .dref{text-align:center;margin:15px 0 8px;font-size:12px;font-weight:900}
  #depModal .dref a{color:var(--gold);text-decoration:none;cursor:pointer}
  #depModal .dchk{
    display:flex;align-items:flex-start;gap:8px;color:rgba(255,215,0,.7);
    font-size:11px;line-height:1.5;margin:8px 0 12px;font-weight:900;
  }
  #depModal .dchk input{margin-top:2px;accent-color:var(--gold)}
  #depModal .dbtn{
    width:100%;height:44px;border:0;border-radius:11px;font-weight:1000;
    letter-spacing:.3px;cursor:pointer;transition:.18s;font-size:11px;font-family:Arial,sans-serif;
  }
  #depModal .dbtn.g{
    background:linear-gradient(135deg,var(--gold),var(--gold2));color:#000;
    box-shadow:0 8px 16px rgba(255,215,0,.2);
  }
  #depModal .dbtn.b{
    background:linear-gradient(135deg,#5ea1ff,#2f7cff);color:#fff;
    box-shadow:0 8px 16px rgba(94,161,255,.18);
  }
  #depModal .dbtn:hover{filter:brightness(1.08);transform:translateY(-1px)}

  /* ─── Card ─── */
  #depModal .dcard{
    margin:10px 10px 0;
    background:linear-gradient(180deg,#0d1527,#0a0e1a);
    border-radius:13px;padding:12px;
    box-shadow:0 8px 20px rgba(0,0,0,.3);
    border:1.5px solid rgba(255,215,0,.22);
  }
  #depModal .dttl{font-weight:1000;text-align:center;margin:2px 0 9px;letter-spacing:.3px;color:var(--gold)}
  #depModal .dbig{font-size:40px;font-weight:1000;text-align:center;margin:0 0 10px;direction:ltr;color:var(--gold)}
  #depModal .dkv{
    display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;
    padding:7px 0;border-top:1px solid rgba(255,215,0,.13);
  }
  #depModal .dkv:first-of-type{border-top:0}
  #depModal .dkv .k{color:rgba(255,215,0,.6);font-size:11px;font-weight:900}
  #depModal .dkv .v{font-weight:1000;font-size:11px;white-space:nowrap;direction:ltr;color:#fff}
  #depModal .dnote{
    color:rgba(255,215,0,.6);font-size:11px;line-height:1.55;margin-top:9px;
    text-align:center;font-weight:900;
  }

  /* ─── Address bar ─── */
  #depModal .daddr{
    width:calc(100% - 28px);margin:3px 14px;
    background:rgba(17,31,53,.65);border:1.5px solid rgba(255,215,0,.4);
    border-radius:12px;padding:9px 10px;
    display:flex;align-items:center;justify-content:space-between;gap:8px;
  }
  #depModal .daddr code{
    color:#fff;font-weight:1000;white-space:nowrap;overflow:hidden;
    text-overflow:ellipsis;direction:ltr;font-size:10px;
  }
  #depModal .dcpy{
    border:0;background:transparent;color:rgba(255,215,0,.85);
    cursor:pointer;font-weight:1000;font-size:15px;flex-shrink:0;
  }
  #depModal .dsm{
    color:rgba(255,215,0,.5);font-size:10px;line-height:1.6;
    margin:7px 14px 14px;font-weight:900;text-align:center;
  }

  /* ─── Bonus box ─── */
  #depModal #dBonusBox{
    display:none;margin:8px 14px 0;padding:10px;border-radius:12px;
    border:1.5px solid rgba(255,215,0,.3);background:rgba(17,31,53,.55);
  }
  #depModal #dBonusBox.show{display:block}
  #depModal #dBonusBox .h{font-weight:1000;margin-bottom:9px;color:var(--gold);letter-spacing:.15px}
  #depModal #dBonusBox .r{display:flex;gap:8px;align-items:center}
  .dOk{display:inline-flex;align-items:center;gap:7px;margin-top:8px;color:#19d28f;font-weight:1000;font-size:11px}
  .dBad{display:inline-flex;align-items:center;gap:7px;margin-top:8px;color:#ff4d5a;font-weight:1000;font-size:11px}

  /* ─── Animations ─── */
  @keyframes dSpin{to{transform:rotate(360deg)}}
  @keyframes dPulse{
    0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,.55)}
    70%{box-shadow:0 0 0 10px rgba(255,215,0,0)}
  }
  @keyframes dFloat{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-4px)}
  }
  @keyframes dGlow{
    0%,100%{opacity:.7}
    50%{opacity:1}
  }

  /* ─── Screen 3 badges / spinner ─── */
  .dRing{
    position:absolute;inset:-4px;border-radius:50%;
    border:2.5px solid rgba(255,215,0,.12);border-top-color:var(--gold);
    animation:dSpin .85s linear infinite;
  }
  .dRing2{
    position:absolute;inset:-10px;border-radius:50%;
    border:2px solid rgba(255,215,0,.06);border-bottom-color:rgba(255,215,0,.35);
    animation:dSpin 1.6s linear infinite reverse;
  }
  .dDot{
    width:9px;height:9px;background:var(--gold);border-radius:50%;flex-shrink:0;
    animation:dPulse 1.6s ease infinite;box-shadow:0 0 7px rgba(255,215,0,.6);
  }
  .dWaitBadge{
    display:flex;align-items:center;gap:9px;
    background:rgba(255,215,0,.07);border:1.5px solid rgba(255,215,0,.3);
    border-radius:12px;padding:10px 18px;animation:dFloat 3s ease infinite;
  }
  .dNetBadge{
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(255,215,0,.08);border:1px solid rgba(255,215,0,.25);
    border-radius:7px;padding:4px 10px;font-size:10px;font-weight:900;
    color:rgba(255,215,0,.85);animation:dGlow 2.5s ease infinite;
  }
  .dQR{
    width:170px;height:170px;background:#fff;border-radius:11px;padding:7px;
    border:1.5px solid rgba(255,215,0,.4);box-shadow:0 0 18px rgba(255,215,0,.13);
  }
`;

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const fmt = (n) =>
  String(Math.max(0, Math.floor(n || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const mny = (n) => "$" + fmt(n);
const pad = (n) => String(n).padStart(2, "0");

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function DepositPage() {
  /* ── state ── */
  const [screen,         setScreen]         = useState(0);
  const [history,        setHistory]        = useState([0]);
  const [amt,            setAmt]            = useState(4300);
  const [bonusActive,    setBonusActive]    = useState(false);
  const [bonusInput,     setBonusInput]     = useState("");
  const [bonusState,     setBonusState]     = useState(""); // "" | "ok" | "bad" | "bad_empty"
  const [bonusBoxOpen,   setBonusBoxOpen]   = useState(false);
  const [agreed,         setAgreed]         = useState(true);
  const [copied,         setCopied]         = useState(false);
  const [waitSecs,       setWaitSecs]       = useState(0);

  const timerRef = useRef(null);

  /* ── derived ── */
  const base  = Math.max(0, Math.floor(amt || 0));
  const bon   = bonusActive ? Math.floor(base * BONUS_RATE) : 0;
  const total = base + bon;

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=" +
    encodeURIComponent(
      JSON.stringify({
        network: "USDT_TRC20",
        address: ADDR,
        currency: CUR,
        base,
        bonus: bon,
        total,
      })
    );

  /* ── timer ── */
  const startWait = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setWaitSecs(0);
    timerRef.current = setInterval(
      () => setWaitSecs((s) => s + 1),
      1000
    );
  }, []);

  const stopWait = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopWait(), [stopWait]);

  /* ── navigation ── */
  const goTo = useCallback(
    (k) => {
      setScreen(k);
      setHistory((h) => {
        const last = h[h.length - 1];
        return last !== k ? [...h, k] : h;
      });
      if (k === 2) startWait();
      else stopWait();
    },
    [startWait, stopWait]
  );

  const goBack = () => {
    setHistory((h) => {
      if (h.length < 2) return h;
      const next = h.slice(0, -1);
      const prev = next[next.length - 1];
      setScreen(prev);
      if (prev === 2) startWait();
      else stopWait();
      return next;
    });
  };

  const canGoBack = history.length > 1;

  /* ── actions ── */
  const handlePay = () => {
    if (!agreed) { alert("Please accept the terms first."); return; }
    goTo(1);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ADDR);
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {
      window.prompt("Copy address:", ADDR);
    }
  };

  const handleApplyBonus = () => {
    const c = bonusInput.trim();
    if (!c) {
      setBonusState("bad_empty");
      setBonusActive(false);
      return;
    }
    if (c === PROMO_CODE) {
      setBonusActive(true);
      setBonusState("ok");
    } else {
      setBonusActive(false);
      setBonusState("bad");
    }
  };

  const waitDisplay = `${pad(Math.floor(waitSecs / 60))}:${pad(waitSecs % 60)}`;

  /* ══════════════════════════════════════
     RENDER
  ══════════════════════════════════════ */
  return (
    <>
      {/* ── Inject global CSS once ── */}
      <style>{GLOBAL_CSS}</style>

      <div id="depModal">

        {/* ════ TOP BAR ════ */}
        <div className="dtop">
          <button
            className="dic"
            id="dBack"
            title="Back"
            style={{ opacity: canGoBack ? 1 : 0.45 }}
            onClick={goBack}
          >
            ←
          </button>
          <div className="t">Deposit</div>
          <button
            className="dic"
            id="dClose"
            title="Close"
            onClick={stopWait}
          >
            ×
          </button>
        </div>

        {/* ════════════════════════════
            SCREEN 1 — Amount picker
        ════════════════════════════ */}
        <section className={`dScr${screen === 0 ? " on" : ""}`} id="dS1">

          <div className="dp">
            {/* Amount grid */}
            <div className="dgrid" id="dAmtGrid">
              {AMOUNTS.map((v) => (
                <div
                  key={v}
                  className={`damt${amt === v ? " on" : ""}`}
                  data-v={v}
                  onClick={() => setAmt(v)}
                >
                  ${fmt(v)}
                </div>
              ))}
            </div>

            {/* Manual input */}
            <div className="dbar">
              <input
                className="din"
                id="dAmtIn"
                inputMode="numeric"
                value={amt}
                aria-label="Amount in USD"
                onChange={(e) =>
                  setAmt(+e.target.value.replace(/[^\d]/g, "") || 0)
                }
              />
            </div>

            {/* Hint */}
            <div className="dhint">
              <span className="q">?</span>
              <span>USD only (fixed currency)</span>
            </div>
          </div>

          {/* ── Bonus / Promo box ── */}
          <div
            id="dBonusBox"
            className={bonusBoxOpen ? "show" : ""}
          >
            <div className="h">Promo code</div>
            <div className="r">
              <input
                className="din"
                id="dBonusIn"
                placeholder="Enter promo code"
                style={{ textAlign: "right" }}
                value={bonusInput}
                onChange={(e) => setBonusInput(e.target.value)}
              />
              <button
                className="dbtn b"
                id="dBonusApply"
                style={{ height: 40, width: 130 }}
                onClick={handleApplyBonus}
              >
                Apply
              </button>
            </div>
            <div id="dBonusState">
              {bonusState === "ok" && (
                <div className="dOk">
                  ✔ Bonus activated: {Math.round(BONUS_RATE * 100)}%
                </div>
              )}
              {bonusState === "bad" && (
                <div className="dBad">✖ Invalid code</div>
              )}
              {bonusState === "bad_empty" && (
                <div className="dBad">✖ Enter a promo code</div>
              )}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="dfoot">
            <div className="dref">
              <a
                href="javascript:void(0)"
                id="dBonusToggle"
                onClick={(e) => {
                  e.preventDefault();
                  setBonusBoxOpen((o) => !o);
                }}
              >
                Do you have a promo code?
              </a>
            </div>

            <label className="dchk">
              <input
                type="checkbox"
                id="dAgree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the Terms &amp; Conditions and Refund Policy
            </label>

            <button className="dbtn g" id="dPayBtn" onClick={handlePay}>
              Pay {mny(base)}
            </button>

            <div style={{ height: 8 }} />
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                opacity: 0.7,
                color: "rgba(255,215,0,.6)",
                fontWeight: 900,
              }}
            >
              PCI DSS • Mastercard ID Check • VISA
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            SCREEN 2 — Confirmation
        ════════════════════════════ */}
        <section className={`dScr${screen === 1 ? " on" : ""}`} id="dS2">

          <div className="dcard">
            <div className="dttl">Payment confirmation</div>

            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                marginTop: 2,
                color: "rgba(255,215,0,.6)",
                fontWeight: 900,
              }}
            >
              Amount
            </div>

            <div className="dbig" id="dConfBal">
              {mny(base)}
            </div>

            <div className="dkv">
              <div className="k">Payment method</div>
              <div className="v">USDT TRC20</div>
            </div>
            <div className="dkv">
              <div className="k">Currency</div>
              <div className="v" id="dConfCur">{CUR}</div>
            </div>

            <div className="dnote">
              Please review the details carefully before sending.
            </div>
          </div>

          <div className="dfoot">
            <button className="dbtn b" id="dPayNow" onClick={() => goTo(2)}>
              Pay now
            </button>
          </div>
        </section>

        {/* ════════════════════════════
            SCREEN 3 — Waiting / QR
        ════════════════════════════ */}
        <section className={`dScr${screen === 2 ? " on" : ""}`} id="dS3">

          {/* ── Top animated area ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "18px 14px 8px",
              gap: 12,
            }}
          >
            {/* Spinner */}
            <div
              style={{
                position: "relative",
                width: 68,
                height: 68,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="dRing2" />
              <div className="dRing" />
              <img
                src="https://static.expertoption.finance/crypto-icons/color/usdt_trc20.svg"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 0 14px rgba(255,215,0,.3)",
                }}
                alt="USDT TRC20"
              />
            </div>

            {/* Waiting badge */}
            <div className="dWaitBadge">
              <div className="dDot" />
              <span style={{ fontWeight: 900, fontSize: 12.5, color: "var(--gold)" }}>
                Waiting for payment
              </span>
            </div>

            {/* Timer */}
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,215,0,.55)",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>⏱</span>
              <span
                id="dWaitTime"
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "var(--gold)",
                  fontWeight: 900,
                }}
              >
                {waitDisplay}
              </span>
              <span>since you opened this screen</span>
            </div>

            {/* Network badge */}
            <div className="dNetBadge">
              <span>🔗</span>
              <span>TRON Network · TRC20</span>
              <span style={{ opacity: 0.6 }}>|</span>
              <span style={{ color: "#19d28f" }}>Active</span>
            </div>
          </div>

          {/* ── Summary card ── */}
          <div className="dcard" style={{ margin: "0 10px" }}>
            <div className="dkv" style={{ borderTop: 0 }}>
              <div className="k">Base amount</div>
              <div className="v" id="dBaseLine">{mny(base)}</div>
            </div>
            <div className="dkv">
              <div className="k">Bonus</div>
              <div className="v" id="dBonusLine">
                {bonusActive
                  ? `+${mny(bon)} (${Math.round(BONUS_RATE * 100)}%)`
                  : "—"}
              </div>
            </div>
            <div className="dkv">
              <div className="k">Total</div>
              <div
                className="v"
                id="dTotalLine"
                style={{ color: "var(--gold)", fontSize: 13 }}
              >
                {mny(total)}
              </div>
            </div>
          </div>

          {/* ── QR area ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 14px 5px",
              gap: 7,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,215,0,.7)",
                fontWeight: 900,
              }}
            >
              You are about to deposit{" "}
              <b id="dS3amt" style={{ color: "var(--gold)" }}>
                {mny(total)}
              </b>
            </div>
            <div className="dQR">
              <img
                id="dQRimg"
                src={qrUrl}
                style={{ width: "100%", height: "100%", display: "block" }}
                alt="QR"
              />
            </div>
          </div>

          {/* ── Send instruction ── */}
          <div
            style={{
              margin: "3px 14px",
              fontSize: 11,
              textAlign: "center",
              color: "rgba(255,215,0,.65)",
              fontWeight: 900,
            }}
          >
            Send{" "}
            <b id="dS3send" style={{ color: "var(--gold)" }}>
              USDT_TRC20
            </b>{" "}
            exactly to:
          </div>

          {/* ── Address bar ── */}
          <div className="daddr">
            <button className="dcpy" id="dCpy" title="Copy address" onClick={handleCopy}>
              {copied ? "✓" : "⎘"}
            </button>
            <code id="dAddrTxt">{ADDR}</code>
          </div>

          {/* ── Footer note ── */}
          <div className="dsm">
            ✅ Your payment will be completed automatically after network confirmation.
            <br />
            ⏳ This may take 1–10 minutes.
          </div>

        </section>
      </div>
    </>
  );
}
