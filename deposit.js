import React, { useState, useEffect, useRef, useCallback } from "react";

const ADDR = "TJuW6QiLBZBgNgPZ4W2sUkqHa3i7gfvVch";
const PROMO_CODE = "70ZARCH";
const BONUS_RATE = 0.7;
const CUR = "USD";
const AMOUNTS = [500, 900, 1300, 2200, 4300, 10550, 42350, 105800];

const styles = {
  root: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    background: "#0a0e1a",
    color: "#fff",
    direction: "ltr",
    fontSize: 11,
    height: "100vh",
    overflow: "hidden",
  },
};

const css = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --bg-card:#12192e;
    --bg-secondary:#0d1020;
    --gold:#ffd700;
    --gold2:#b8860b;
    --gold3:#ffe566;
  }
  body { font-family: Arial,sans-serif; background:#0a0e1a; color:#fff; direction:ltr; font-size:11px; }

  .dep-modal {
    position: fixed;
    inset: 0;
    z-index: 9900;
    background: #0a0e1a;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform .32s cubic-bezier(.4,0,.2,1);
  }
  .dep-modal.hidden { transform: translateY(100%); }

  .d-scr { display:none; flex:1; flex-direction:column; overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .d-scr.on { display:flex; }

  .d-top {
    flex-shrink:0; height:48px; display:flex; align-items:center; justify-content:space-between;
    padding:8px 11px;
    background:linear-gradient(135deg,#0d1527 0%,#1a1000 50%,#0d1527 100%);
    border-bottom:2.5px solid var(--gold);
  }
  .d-top .t { font-size:14px; font-weight:900; color:var(--gold); letter-spacing:.2px; }
  .d-ic {
    width:34px; height:34px; background:transparent; border:1.5px solid rgba(255,215,0,.4);
    border-radius:9px; display:flex; align-items:center; justify-content:center; cursor:pointer;
    color:rgba(255,215,0,.75); font-size:17px; transition:.2s;
  }
  .d-ic:hover { background:rgba(255,215,0,.1); color:var(--gold); border-color:var(--gold); }

  .d-p { padding:12px 14px; }
  .d-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .d-amt {
    background:rgba(17,31,53,.65); border:1.5px solid rgba(255,215,0,.2); border-radius:11px;
    padding:12px; color:#fff; text-align:center; font-weight:1000; cursor:pointer; position:relative;
    transition:.15s;
  }
  .d-amt:hover { border-color:rgba(255,215,0,.4); }
  .d-amt.on { background:rgba(255,215,0,.12); border-color:var(--gold); color:var(--gold); }
  .d-amt.on::after {
    content:"✓"; position:absolute; left:9px; top:7px; font-size:11px; color:var(--gold);
  }

  .d-bar { margin-top:10px; display:flex; gap:8px; align-items:center; }
  .d-in {
    background:rgba(17,31,53,.65); border:1.5px solid rgba(255,215,0,.3);
    border-radius:11px; padding:10px 12px; color:#fff; font-weight:900; outline:none; transition:.2s;
    flex:1; text-align:right; font-size:11px;
  }
  .d-in:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(255,215,0,.08); }

  .d-hint {
    margin:12px 0 0; color:rgba(255,215,0,.6); font-size:11px;
    display:flex; align-items:center; gap:7px; font-weight:900;
  }
  .d-hint .q {
    width:15px; height:15px; border-radius:999px; border:1px solid rgba(255,215,0,.35);
    display:grid; place-items:center; font-size:10px; color:rgba(255,215,0,.6);
  }

  .d-foot { margin-top:auto; padding:15px 14px 18px; flex-shrink:0; }
  .d-ref { text-align:center; margin:15px 0 8px; font-size:12px; font-weight:900; }
  .d-ref a { color:var(--gold); }
  .d-chk {
    display:flex; align-items:flex-start; gap:8px; color:rgba(255,215,0,.7);
    font-size:11px; line-height:1.5; margin:8px 0 12px; font-weight:900;
  }
  .d-chk input { margin-top:2px; accent-color:var(--gold); }

  .d-btn {
    width:100%; height:44px; border:0; border-radius:11px; font-weight:1000;
    letter-spacing:.3px; cursor:pointer; transition:.18s; font-size:11px;
  }
  .d-btn.g {
    background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#000;
    box-shadow:0 8px 16px rgba(255,215,0,.2);
  }
  .d-btn.b {
    background:linear-gradient(135deg,#5ea1ff,#2f7cff); color:#fff;
    box-shadow:0 8px 16px rgba(94,161,255,.18);
  }
  .d-btn:hover { filter:brightness(1.08); transform:translateY(-1px); }

  .d-card {
    margin:10px 10px 0;
    background:linear-gradient(180deg,#0d1527,#0a0e1a);
    border-radius:13px; padding:12px;
    box-shadow:0 8px 20px rgba(0,0,0,.3);
    border:1.5px solid rgba(255,215,0,.22);
  }
  .d-ttl { font-weight:1000; text-align:center; margin:2px 0 9px; letter-spacing:.3px; color:var(--gold); }
  .d-big { font-size:40px; font-weight:1000; text-align:center; margin:0 0 10px; direction:ltr; color:var(--gold); }
  .d-kv {
    display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center;
    padding:7px 0; border-top:1px solid rgba(255,215,0,.13);
  }
  .d-kv:first-of-type { border-top:0; }
  .d-kv .k { color:rgba(255,215,0,.6); font-size:11px; font-weight:900; }
  .d-kv .v { font-weight:1000; font-size:11px; white-space:nowrap; direction:ltr; color:#fff; }
  .d-note { color:rgba(255,215,0,.6); font-size:11px; line-height:1.55; margin-top:9px; text-align:center; font-weight:900; }

  .d-addr {
    width:calc(100% - 28px); margin:3px 14px;
    background:rgba(17,31,53,.65); border:1.5px solid rgba(255,215,0,.4);
    border-radius:12px; padding:9px 10px;
    display:flex; align-items:center; justify-content:space-between; gap:8px;
  }
  .d-addr code { color:#fff; font-weight:1000; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; direction:ltr; font-size:10px; }
  .d-cpy { border:0; background:transparent; color:rgba(255,215,0,.85); cursor:pointer; font-weight:1000; font-size:15px; flex-shrink:0; }
  .d-sm {
    color:rgba(255,215,0,.5); font-size:10px; line-height:1.6;
    margin:7px 14px 14px; font-weight:900; text-align:center;
  }

  .d-bonus-box {
    display:none; margin:8px 14px 0; padding:10px; border-radius:12px;
    border:1.5px solid rgba(255,215,0,.3); background:rgba(17,31,53,.55);
  }
  .d-bonus-box.show { display:block; }
  .d-bonus-box .h { font-weight:1000; margin-bottom:9px; color:var(--gold); letter-spacing:.15px; }
  .d-bonus-box .r { display:flex; gap:8px; align-items:center; }

  .d-ok { display:inline-flex; align-items:center; gap:7px; margin-top:8px; color:#19d28f; font-weight:1000; font-size:11px; }
  .d-bad { display:inline-flex; align-items:center; gap:7px; margin-top:8px; color:#ff4d5a; font-weight:1000; font-size:11px; }

  @keyframes dSpin { to { transform:rotate(360deg); } }
  @keyframes dPulse {
    0%,100% { box-shadow:0 0 0 0 rgba(255,215,0,.55); }
    70%      { box-shadow:0 0 0 10px rgba(255,215,0,0); }
  }
  @keyframes dFloat {
    0%,100% { transform:translateY(0); }
    50%      { transform:translateY(-4px); }
  }
  @keyframes dGlow {
    0%,100% { opacity:.7; }
    50%      { opacity:1; }
  }

  .d-ring  { position:absolute; inset:-4px;  border-radius:50%; border:2.5px solid rgba(255,215,0,.12); border-top-color:var(--gold);           animation:dSpin .85s linear infinite; }
  .d-ring2 { position:absolute; inset:-10px; border-radius:50%; border:2px solid rgba(255,215,0,.06);  border-bottom-color:rgba(255,215,0,.35); animation:dSpin 1.6s linear infinite reverse; }
  .d-dot   { width:9px; height:9px; background:var(--gold); border-radius:50%; flex-shrink:0; animation:dPulse 1.6s ease infinite; box-shadow:0 0 7px rgba(255,215,0,.6); }

  .d-wait-badge {
    display:flex; align-items:center; gap:9px;
    background:rgba(255,215,0,.07); border:1.5px solid rgba(255,215,0,.3);
    border-radius:12px; padding:10px 18px; animation:dFloat 3s ease infinite;
  }
  .d-net-badge {
    display:inline-flex; align-items:center; gap:5px;
    background:rgba(255,215,0,.08); border:1px solid rgba(255,215,0,.25);
    border-radius:7px; padding:4px 10px; font-size:10px; font-weight:900;
    color:rgba(255,215,0,.85); animation:dGlow 2.5s ease infinite;
  }
  .d-qr {
    width:170px; height:170px; background:#fff; border-radius:11px; padding:7px;
    border:1.5px solid rgba(255,215,0,.4); box-shadow:0 0 18px rgba(255,215,0,.13);
  }
`;

const fmt = (n) =>
  String(Math.max(0, Math.floor(n || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const mny = (n) => "$" + fmt(n);

export default function DepositPage() {
  const [screen, setScreen] = useState(0);
  const [history, setHistory] = useState([0]);
  const [amt, setAmt] = useState(4300);
  const [bonusActive, setBonusActive] = useState(false);
  const [bonusCode, setBonusCode] = useState("");
  const [bonusInput, setBonusInput] = useState("");
  const [bonusState, setBonusState] = useState(null); // null | "ok" | "bad"
  const [bonusBoxVisible, setBonusBoxVisible] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [waitSecs, setWaitSecs] = useState(0);
  const waitRef = useRef(null);

  const base = Math.max(0, Math.floor(amt || 0));
  const bon = bonusActive ? Math.floor(base * BONUS_RATE) : 0;
  const total = base + bon;

  const qrData = JSON.stringify({
    network: "USDT_TRC20",
    address: ADDR,
    currency: CUR,
    base,
    bonus: bon,
    total,
  });
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(qrData)}`;

  const startWait = useCallback(() => {
    if (waitRef.current) clearInterval(waitRef.current);
    setWaitSecs(0);
    waitRef.current = setInterval(() => setWaitSecs((s) => s + 1), 1000);
  }, []);

  const stopWait = useCallback(() => {
    if (waitRef.current) {
      clearInterval(waitRef.current);
      waitRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (k) => {
      setScreen(k);
      setHistory((h) => {
        const last = h[h.length - 1];
        if (last !== k) return [...h, k];
        return h;
      });
      if (k === 2) startWait();
      else stopWait();
    },
    [startWait, stopWait]
  );

  const goBack = () => {
    setHistory((h) => {
      if (h.length > 1) {
        const newH = h.slice(0, -1);
        const prev = newH[newH.length - 1];
        setScreen(prev);
        if (prev === 2) startWait();
        else stopWait();
        return newH;
      }
      return h;
    });
  };

  const handleClose = () => {
    stopWait();
  };

  const handlePay = () => {
    if (!agreed) {
      alert("Please accept the terms first.");
      return;
    }
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
      setBonusCode(c);
      setBonusState("ok");
    } else {
      setBonusActive(false);
      setBonusState("bad");
    }
  };

  const padTime = (n) => String(n).padStart(2, "0");
  const waitDisplay = `${padTime(Math.floor(waitSecs / 60))}:${padTime(waitSecs % 60)}`;

  useEffect(() => {
    return () => stopWait();
  }, [stopWait]);

  const canGoBack = history.length > 1;

  return (
    <>
      <style>{css}</style>

      <div className="dep-modal">
        {/* Top Bar */}
        <div className="d-top">
          <button
            className="d-ic"
            onClick={goBack}
            style={{ opacity: canGoBack ? 1 : 0.45 }}
          >
            ←
          </button>
          <div className="t">Deposit</div>
          <button className="d-ic" onClick={handleClose}>
            ×
          </button>
        </div>

        {/* ── Screen 1 ── */}
        <section className={`d-scr${screen === 0 ? " on" : ""}`}>
          <div className="d-p">
            <div className="d-grid">
              {AMOUNTS.map((v) => (
                <div
                  key={v}
                  className={`d-amt${amt === v ? " on" : ""}`}
                  onClick={() => setAmt(v)}
                >
                  ${fmt(v)}
                </div>
              ))}
            </div>

            <div className="d-bar">
              <input
                className="d-in"
                inputMode="numeric"
                value={amt}
                aria-label="Amount in USD"
                onChange={(e) => {
                  const v = +e.target.value.replace(/[^\d]/g, "");
                  setAmt(v || 0);
                }}
              />
            </div>

            <div className="d-hint">
              <span className="q">?</span>
              <span>USD only (fixed currency)</span>
            </div>
          </div>

          {/* Bonus Box */}
          <div className={`d-bonus-box${bonusBoxVisible ? " show" : ""}`}>
            <div className="h">Promo code</div>
            <div className="r">
              <input
                className="d-in"
                placeholder="Enter promo code"
                style={{ textAlign: "right" }}
                value={bonusInput}
                onChange={(e) => setBonusInput(e.target.value)}
              />
              <button
                className="d-btn b"
                style={{ height: 40, width: 130 }}
                onClick={handleApplyBonus}
              >
                Apply
              </button>
            </div>
            {bonusState === "ok" && (
              <div className="d-ok">
                ✔ Bonus activated: {Math.round(BONUS_RATE * 100)}%
              </div>
            )}
            {bonusState === "bad" && (
              <div className="d-bad">✖ Invalid code</div>
            )}
            {bonusState === "bad_empty" && (
              <div className="d-bad">✖ Enter a promo code</div>
            )}
          </div>

          <div className="d-foot">
            <div className="d-ref">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setBonusBoxVisible((v) => !v);
                }}
              >
                Do you have a promo code?
              </a>
            </div>

            <label className="d-chk">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the Terms &amp; Conditions and Refund Policy
            </label>

            <button className="d-btn g" onClick={handlePay}>
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

        {/* ── Screen 2 ── */}
        <section className={`d-scr${screen === 1 ? " on" : ""}`}>
          <div className="d-card">
            <div className="d-ttl">Payment confirmation</div>
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
            <div className="d-big">{mny(base)}</div>

            <div className="d-kv">
              <div className="k">Payment method</div>
              <div className="v">USDT TRC20</div>
            </div>
            <div className="d-kv">
              <div className="k">Currency</div>
              <div className="v">{CUR}</div>
            </div>

            <div className="d-note">
              Please review the details carefully before sending.
            </div>
          </div>

          <div className="d-foot">
            <button className="d-btn b" onClick={() => goTo(2)}>
              Pay now
            </button>
          </div>
        </section>

        {/* ── Screen 3 ── */}
        <section className={`d-scr${screen === 2 ? " on" : ""}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "18px 14px 8px",
              gap: 12,
            }}
          >
            {/* Spinning rings + icon */}
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
              <div className="d-ring2" />
              <div className="d-ring" />
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

            <div className="d-wait-badge">
              <div className="d-dot" />
              <span
                style={{ fontWeight: 900, fontSize: 12.5, color: "var(--gold)" }}
              >
                Waiting for payment
              </span>
            </div>

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

            <div className="d-net-badge">
              <span>🔗</span>
              <span>TRON Network · TRC20</span>
              <span style={{ opacity: 0.6 }}>|</span>
              <span style={{ color: "#19d28f" }}>Active</span>
            </div>
          </div>

          {/* Summary card */}
          <div className="d-card" style={{ margin: "0 10px" }}>
            <div className="d-kv" style={{ borderTop: 0 }}>
              <div className="k">Base amount</div>
              <div className="v">{mny(base)}</div>
            </div>
            <div className="d-kv">
              <div className="k">Bonus</div>
              <div className="v">
                {bonusActive
                  ? `+${mny(bon)} (${Math.round(BONUS_RATE * 100)}%)`
                  : "—"}
              </div>
            </div>
            <div className="d-kv">
              <div className="k">Total</div>
              <div
                className="v"
                style={{ color: "var(--gold)", fontSize: 13 }}
              >
                {mny(total)}
              </div>
            </div>
          </div>

          {/* QR */}
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
              <b style={{ color: "var(--gold)" }}>{mny(total)}</b>
            </div>
            <div className="d-qr">
              <img
                src={qrUrl}
                style={{ width: "100%", height: "100%", display: "block" }}
                alt="QR"
              />
            </div>
          </div>

          {/* Address */}
          <div
            style={{
              margin: "3px 14px",
              fontSize: 11,
              textAlign: "center",
              color: "rgba(255,215,0,.65)",
              fontWeight: 900,
            }}
          >
            Send <b style={{ color: "var(--gold)" }}>USDT_TRC20</b> exactly to:
          </div>

          <div className="d-addr">
            <button className="d-cpy" onClick={handleCopy}>
              {copied ? "✓" : "⎘"}
            </button>
            <code>{ADDR}</code>
          </div>

          <div className="d-sm">
            ✅ Your payment will be completed automatically after network
            confirmation.
            <br />⏳ This may take 1–10 minutes.
          </div>
        </section>
      </div>
    </>
  );
}
