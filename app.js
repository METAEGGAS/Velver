// ===== Firebase Configuration =====
import { initializeApp as iA } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore as gFS, doc as D, setDoc as sD, getDoc as gD, onSnapshot as oS, deleteField as dF } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const fC = {
    apiKey: "AIzaSyBOUqLixfphg3b8hajc4hkwV-VJmldGBVw",
    authDomain: "randers-c640b.firebaseapp.com",
    projectId: "randers-c640b",
    storageBucket: "randers-c640b.firebasestorage.app",
    messagingSenderId: "391496092929",
    appId: "1:391496092929:web:58208b4eb3e6f9a8571f00"
};

const app = iA(fC);
const db = gFS(app);

// ===== Helper Functions =====
const $ = i => document.getElementById(i);
const clp = (v, a, b) => Math.max(a, Math.min(b, v));

const uid = () => Math.random().toString(36).slice(2, 9);

const nS = v => {
    if (!(v > 0)) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
};

const pD = s => {
    const m = s.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if (!m) return 6e4;
    return (+m[1] * 3600 + +m[2] * 60 + +m[3]) * 1e3;
};

const fT = ms => {
    const s = Math.floor(ms / 1e3);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return h > 0 ? `${h}:${String(m % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}` : `${m % 60}:${String(s % 60).padStart(2, "0")}`;
};

const fDT = ts => {
    const d = new Date(ts);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const fM = {
    AED: "ae", CNY: "cn", AUD: "au", CAD: "ca", CHF: "ch", BHD: "bh",
    EUR: "eu", RUB: "ru", USD: "us", KES: "ke", LBP: "lb", QAR: "qa",
    TRY: "tr", SYP: "sy", EGP: "eg", INR: "in", IRR: "ir"
};

const mkF = c => `https://flagcdn.com/w40/${(fM[c] || c || "un").toLowerCase()}.png`;

const fP = p => Math.round((+p || 0) * 100) + "%";

// ===== Firebase Functions =====
const shSt = (m, t) => {
    const s = $("fbStatus");
    s.textContent = m;
    s.className = "fbStatus show " + (t || "success");
    setTimeout(() => s.classList.remove("show"), 2500);
};

const svFB = async (p, d) => {
    try {
        const k = p.replace(/\//g, "_");
        await sD(D(db, "candles", k), { cs: d, lu: Date.now() }, { merge: false });
        console.log("✓ حفظ:", p, d.length);
    } catch (e) {
        console.error("❌ خطأ:", e);
        shSt("خطأ في الحفظ", "error");
    }
};

const ldFB = async p => {
    try {
        const k = p.replace(/\//g, "_");
        const s = await gD(D(db, "candles", k));
        if (s.exists()) {
            const dt = s.data();
            console.log("✓ تحميل:", p, dt.cs?.length || 0);
            return dt.cs || [];
        }
        return [];
    } catch (e) {
        console.error("❌ خطأ:", e);
        return [];
    }
};

const svLV = async (p, c) => {
    try {
        const k = "live_" + p.replace(/\//g, "_");
        const sID = sessionStorage.getItem("sessID") || "";
        await sD(D(db, "live", k), { cc: c, t: Date.now(), mID: sID }, { merge: true });
    } catch (e) {
        console.error("❌ خطأ:", e);
    }
};

const clMgr = async p => {
    try {
        const k = "live_" + p.replace(/\//g, "_");
        await sD(D(db, "live", k), { mID: dF() }, { merge: true });
    } catch (e) {
        console.error("❌ خطأ:", e);
    }
};

// ===== State Management =====
const dP = [
    { pair: "AED/CNY", otc: 1, payout: .91, flags: ["AED", "CNY"], price: 7.2, seed: 11001, digits: 3 },
    { pair: "AUD/CAD", otc: 1, payout: .88, flags: ["AUD", "CAD"], price: .91, seed: 11002, digits: 5 },
    { pair: "AUD/CHF", otc: 1, payout: .92, flags: ["AUD", "CHF"], price: .55, seed: 11003, digits: 5 },
    { pair: "BHD/CNY", otc: 1, payout: .86, flags: ["BHD", "CNY"], price: 19.8, seed: 11004, digits: 3 },
    { pair: "EUR/RUB", otc: 1, payout: .77, flags: ["EUR", "RUB"], price: 97.4, seed: 11005, digits: 2 },
    { pair: "EUR/USD", otc: 1, payout: .92, flags: ["EUR", "USD"], price: 1.0895, seed: 33333, digits: 5 },
    { pair: "KES/USD", otc: 1, payout: .84, flags: ["KES", "USD"], price: .0077, seed: 11006, digits: 6 },
    { pair: "LBP/USD", otc: 1, payout: .79, flags: ["LBP", "USD"], price: .000011, seed: 11007, digits: 8 },
    { pair: "QAR/CNY", otc: 1, payout: .83, flags: ["QAR", "CNY"], price: 1.97, seed: 11008, digits: 4 },
    { pair: "USD/CHF", otc: 1, payout: .89, flags: ["USD", "CHF"], price: .91, seed: 11009, digits: 5 },
    { pair: "SYP/TRY", otc: 1, payout: .87, flags: ["SYP", "TRY"], price: .00013, seed: 11010, digits: 7 },
    { pair: "EGP/USD", otc: 1, payout: .78, flags: ["EGP", "USD"], price: .032, seed: 11011, digits: 5 },
    { pair: "USD/INR", otc: 1, payout: .90, flags: ["USD", "INR"], price: 83.2, seed: 11012, digits: 2 }
];

const st = {
    pairs: new Map(),
    fav: new Set(),
    trades: [],
    inds: []
};

dP.forEach(x => st.pairs.set(x.pair, x));

let aA = "demo";
let bal = 10000;
let isMgr = false;
let shIN = 1;
let sID = "";

// ===== Trade Functions =====
const svTr = () => {
    try {
        localStorage.setItem("trades", JSON.stringify(st.trades));
    } catch (e) {
        console.error("❌ حفظ صفقات:", e);
    }
};

const ldTr = () => {
    try {
        const d = localStorage.getItem("trades");
        if (d) {
            const t = JSON.parse(d);
            st.trades = t.filter(x => x.pair === chart.pair);
            rTP();
        }
    } catch (e) {
        console.error("❌ تحميل صفقات:", e);
    }
};

function cPf(tr, cp) {
    const pI = st.pairs.get(tr.pair);
    const po = pI ? pI.payout : .85;
    const pp = tr.type === "buy" ? cp - tr.openPrice : tr.openPrice - cp;
    return pp > 0 ? tr.amount * (1 + po) : pp < 0 ? -tr.amount : 0;
}

function rTP() {
    const tc = $("tradesContent");
    const as = st.trades.filter(t => t.pair === chart.pair);
    
    if (!as.length) {
        tc.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,.5);padding:20px;">لا توجد صفقات</p>';
        return;
    }
    
    tc.innerHTML = as.map((tr, i) => {
        const now = Date.now();
        const lf = Math.max(0, tr.openTime + tr.duration - now);
        const cp = window.chart && chart.cc ? chart.cc.close : tr.openPrice;
        const pf = cPf(tr, cp);
        const pfC = pf > 0 ? "positive" : pf < 0 ? "negative" : "";
        const aC = tr.type === "buy" ? "buy" : "sell";
        
        return `<div class="tradeCard" data-idx="${i}">
            <div class="trL">
                <div style="display:flex;gap:10px;align-items:center;">
                    <div class="trTimer">${tr.closed ? "انتهت" : fT(lf)}</div>
                    <div class="trAmt ${aC}">$${tr.amount}</div>
                </div>
                <div style="display:flex;gap:10px;align-items:center;">
                    <div class="trPair">${tr.pair}</div>
                    <div class="trProfit ${pfC}">$${pf.toFixed(2)}</div>
                </div>
            </div>
            ${tr.closed ? `<div class="trDetails" id="trD${i}">
                <div class="trDRow"><span class="label">سعر الفتح:</span><span class="value">${tr.openPrice.toFixed(chart.d.digits)}</span></div>
                <div class="trDRow"><span class="label">سعر الإغلاق:</span><span class="value">${(tr.closePrice || 0).toFixed(chart.d.digits)}</span></div>
                <div class="trDRow"><span class="label">وقت الفتح:</span><span class="value">${fDT(tr.openTime)}</span></div>
                <div class="trDRow"><span class="label">وقت الإغلاق:</span><span class="value">${fDT(tr.closeTime || 0)}</span></div>
                <div class="trDRow"><span class="label">النتيجة:</span><span class="value ${pfC}">${pf > 0 ? "ربح" : pf < 0 ? "خسارة" : "تعادل"}</span></div>
                <div class="trDRow"><span class="label">المبلغ:</span><span class="value ${pfC}">$${pf.toFixed(2)}</span></div>
                <canvas class="miniChart" id="mC${i}" width="300" height="80"></canvas>
            </div>` : ""}
        </div>`;
    }).join("");
    
    as.forEach((tr, i) => {
        if (tr.closed) {
            const cv = $("mC" + i);
            if (cv) {
                const cx = cv.getContext("2d");
                const w = 300, h = 80;
                const pts = tr.priceHistory || [];
                cx.clearRect(0, 0, w, h);
                
                if (pts.length > 1) {
                    const mn = Math.min(...pts);
                    const mx = Math.max(...pts);
                    const rg = mx - mn || 1;
                    cx.strokeStyle = tr.type === "buy" ? "#00ff88" : "#ff5a4f";
                    cx.lineWidth = 2;
                    cx.beginPath();
                    pts.forEach((p, j) => {
                        const x = j / (pts.length - 1) * w;
                        const y = h - (p - mn) / rg * h;
                        j === 0 ? cx.moveTo(x, y) : cx.lineTo(x, y);
                    });
                    cx.stroke();
                }
            }
        }
    });
}

// ===== UI Functions =====
const upPF = (p, c) => {
    const m = st.pairs.get(p) || dP.find(x => x.pair === p);
    if (!m) return;
    const f = m.flags || String(p).split("/");
    c.innerHTML = f.map(x => `<img src="${mkF(x)}" class="flag-icon-small">`).join("");
};

const rPP = () => {
    const pl = $("pairList");
    if (!pl) return;
    
    const ar = [...st.pairs.values()].sort((a, b) => {
        const fa = st.fav.has(a.pair) ? 1 : 0;
        const fb = st.fav.has(b.pair) ? 1 : 0;
        if (fa !== fb) return fb - fa;
        return a.pair.localeCompare(b.pair);
    });
    
    pl.innerHTML = ar.map(x => {
        const [a, b] = String(x.pair).split("/");
        const st2 = st.fav.has(x.pair) ? "★" : "☆";
        return `<button class="pit" data-p="${x.pair}">
            <span class="pitL">
                <span class="star" data-s="1">${st2}</span>
                <span class="fg">
                    <img src="${mkF(a)}">
                    <img src="${mkF(b)}">
                </span>
                <span class="nm">${x.pair}<span class="bad">OTC</span></span>
            </span>
            <span>+${fP(x.payout)}</span>
        </button>`;
    }).join("");
};

const upB = () => {
    const f = v => "$" + v.toFixed(2);
    $("balTxt").textContent = f(bal);
    $("demoAmt").textContent = f(bal);
};

const upAI = () => {
    $("topAccIcon").src = aA === "real" 
        ? "https://flagcdn.com/w40/us.png" 
        : "https://cdn-icons-png.flaticon.com/128/1344/1344761.png";
};

function rIN() {
    const bx = $("indNamesList");
    const ey = $("eyeBtn");
    
    if (st.inds.length === 0) {
        ey.style.display = "none";
        bx.style.display = "none";
        return;
    }
    
    ey.style.display = "flex";
    bx.style.display = shIN ? "flex" : "none";
    bx.innerHTML = (st.inds || []).map((_, i) => 
        `<div class="nmIt" data-idx="${i}">${i + 1}</div>`
    ).join("");
    
    bx.querySelectorAll(".nmIt").forEach(el => el.onclick = () => {
        const idx = +el.dataset.idx;
        if (st.inds[idx]) {
            eI = st.inds[idx];
            oIS(eI);
        }
    });
}

const iN = {
    bb: "Bollinger Bands",
    tl: "Trendline"
};

function rIB() {
    const br = $("indBar");
    br.innerHTML = (st.inds || []).map((in2, i) => 
        `<div class="indBadge">
            <span class="name" data-i="${i}">${iN[in2.type] || in2.type}</span>
            <button data-rm="${i}">×</button>
        </div>`
    ).join("");
    
    br.querySelectorAll("[data-rm]").forEach(bn => bn.onclick = () => {
        st.inds.splice(+bn.dataset.rm, 1);
        rIB();
        rIN();
    });
    
    br.querySelectorAll("[data-i]").forEach(sp => sp.onclick = () => {
        eI = st.inds[+sp.dataset.i];
        oIS(eI);
    });
    
    br.style.display = st.inds && st.inds.length ? "flex" : "none";
    rIN();
}

let eI = null;

function oIS(in2) {
    $("indSetTitle").textContent = iN[in2.type] || in2.type;
    $("indColor").value = in2.color || "#ffff00";
    $("indWidth").value = in2.width || 2;
    
    const pR = $("periodRow");
    const sR = $("stdRow");
    pR.style.display = "none";
    sR.style.display = "none";
    
    if (in2.type === "bb") {
        pR.style.display = "flex";
        sR.style.display = "flex";
        $("indPeriod").value = in2.period || 20;
        $("indStd").value = in2.std || 2;
    }
    
    $("indSet").classList.add("show");
}

// ===== Chart Class =====
class Chart {
    constructor() {
        this.cv = $("c");
        this.ctx = this.cv.getContext("2d");
        this.host = this.cv.closest(".tc");
        this.cs = [];
        this.cc = null;
        this.baseSpacing = 12;
        this.baseCandleWidth = 8;
        this.drag = 0;
        this.dragStartX = 0;
        this.dragStartScroll = 0;
        this.manualScrollOffset = 0;
        this.targetScrollOffset = 0;
        this.momentum = 0;
        this.lastDragDelta = 0;
        this.lastDragTime = 0;
        this.tf = 6e4;
        this.t0 = Math.floor(Date.now() / 6e4) * 6e4;
        this.minZoom = .5;
        this.maxZoom = 50;
        this.tlDrag = null;
        this.zoom = 1;
        this.targetZoom = 1;
        this.zoomEase = .18;
        this.priceInd = null;
        this.scaleMark = null;
        this.on = 0;
        this.switching = 0;
        this.candleWidthMultiplier = 1;
        this.priceCompression = 1;
        this.tickTimer = null;
        this.loopFrame = null;
        this.liveUnsub = null;
        this.hbInt = null;
        this.mgrChkInt = null;
        this.setup();
        this.ev();
    }

    async setPair(p) {
        const m = st.pairs.get(p) || st.pairs.get("EUR/USD");
        this.pair = p;
        this.d = { price: m.price, seed: m.seed, digits: m.digits };
        this.cp = this.d.price;
        this.priceRange = { min: this.d.price * .95, max: this.d.price * 1.05 };
    }

    setup() {
        const dpr = devicePixelRatio || 1;
        const r = this.host.getBoundingClientRect();
        this.w = Math.max(0, r.width);
        this.h = Math.max(0, r.height - 24);
        this.cv.width = Math.floor(this.w * dpr);
        this.cv.height = Math.floor(this.h * dpr);
        this.cv.style.width = this.w + "px";
        this.cv.style.height = this.h + "px";
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        if (!this.priceInd) {
            this.priceInd = document.createElement("div");
            this.priceInd.className = "priceIndicator";
            this.host.appendChild(this.priceInd);
        }
        
        if (!this.scaleMark) {
            this.scaleMark = document.createElement("div");
            this.scaleMark.className = "priceScaleMark";
            this.host.appendChild(this.scaleMark);
        }
    }

    async switchPair(p) {
        if (this.switching) return;
        this.switching = 1;
        this.on = 0;
        
        if (this.tickTimer) {
            clearTimeout(this.tickTimer);
            this.tickTimer = null;
        }
        
        if (this.loopFrame) {
            cancelAnimationFrame(this.loopFrame);
            this.loopFrame = null;
        }
        
        if (this.liveUnsub) {
            this.liveUnsub();
            this.liveUnsub = null;
        }
        
        if (this.hbInt) {
            clearInterval(this.hbInt);
            this.hbInt = null;
        }
        
        if (this.mgrChkInt) {
            clearInterval(this.mgrChkInt);
            this.mgrChkInt = null;
        }
        
        if (isMgr) await clMgr(this.pair);
        
        $("sk").classList.add("on");
        await this.setPair(p);
        
        const fb = await ldFB(p);
        this.cs = fb && fb.length > 0 ? [...fb] : [];
        this.cc = null;
        this.momentum = 0;
        this.drag = 0;
        
        if (this.cs.length > 0) {
            this.t0 = this.cs[this.cs.length - 1].timestamp + this.tf;
            this.cp = this.cs[this.cs.length - 1].close;
        } else {
            this.t0 = Math.floor(Date.now() / 6e4) * 6e4;
            this.cp = this.d.price;
            await this.iCL(100);
        }
        
        $("pairHudTxt").textContent = p;
        upPF(p, $("pairFlags"));
        
        this.priceRange = { min: this.d.price * .95, max: this.d.price * 1.05 };
        this.snapToLive();
        this.updatePriceRange();
        this.updatePriceScale();
        this.updateTimeLabels();
        
        await this.chkMR();
        this.subLV();
        this.stMC();
        ldTr();
        
        this.switching = 0;
        this.on = 1;
        this.tick();
        this.loop();
        
        $("sk").classList.remove("on");
    }

    async chkMR() {
        const k = "live_" + this.pair.replace(/\//g, "_");
        try {
            const s = await gD(D(db, "live", k));
            if (!s.exists() || !s.data().mID) {
                isMgr = true;
                sID = sessionStorage.getItem("sessID") || uid();
                sessionStorage.setItem("sessID", sID);
                await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
                $("roleTag").textContent = "🎯 مدير";
                $("roleTag").style.display = "block";
                this.stHB();
            } else {
                const dt = s.data();
                const cM = dt.mID;
                const lT = dt.t || 0;
                const nw = Date.now();
                
                if (cM === sID) {
                    isMgr = true;
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.stHB();
                } else if (nw - lT > 15e3) {
                    isMgr = true;
                    sID = sessionStorage.getItem("sessID") || uid();
                    sessionStorage.setItem("sessID", sID);
                    await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.stHB();
                } else {
                    isMgr = false;
                    $("roleTag").textContent = "👁 مشاهد";
                    $("roleTag").style.display = "block";
                }
            }
        } catch (e) {
            isMgr = true;
            sID = sessionStorage.getItem("sessID") || uid();
            sessionStorage.setItem("sessID", sID);
            $("roleTag").textContent = "🎯 مدير";
            $("roleTag").style.display = "block";
            this.stHB();
        }
    }

    stHB() {
        if (this.hbInt) clearInterval(this.hbInt);
        this.hbInt = setInterval(async () => {
            if (!isMgr) return;
            const k = "live_" + this.pair.replace(/\//g, "_");
            try {
                await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
            } catch (e) {
                console.error("❌ HB:", e);
            }
        }, 5e3);
    }

    stMC() {
        if (this.mgrChkInt) clearInterval(this.mgrChkInt);
        this.mgrChkInt = setInterval(async () => {
            if (isMgr) return;
            const k = "live_" + this.pair.replace(/\//g, "_");
            try {
                const s = await gD(D(db, "live", k));
                if (s.exists()) {
                    const dt = s.data();
                    const cM = dt.mID;
                    const lT = dt.t || 0;
                    const nw = Date.now();
                    
                    if (!cM || nw - lT > 15e3) {
                        isMgr = true;
                        sID = sessionStorage.getItem("sessID") || uid();
                        sessionStorage.setItem("sessID", sID);
                        await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
                        $("roleTag").textContent = "🎯 مدير";
                        $("roleTag").style.display = "block";
                        this.stHB();
                    }
                } else {
                    isMgr = true;
                    sID = sessionStorage.getItem("sessID") || uid();
                    sessionStorage.setItem("sessID", sID);
                    await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.stHB();
                }
            } catch (e) {
                console.error("❌ MC:", e);
            }
        }, 3e3);
    }

    subLV() {
        if (this.liveUnsub) this.liveUnsub();
        const k = "live_" + this.pair.replace(/\//g, "_");
        
        this.liveUnsub = oS(D(db, "live", k), async s => {
            if (!s.exists() || !this.on) return;
            const dt = s.data();
            
            if (!isMgr && dt.cc) {
                this.cc = { ...dt.cc };
                this.cp = this.cc.close;
            }
            
            if (dt.mID) {
                const cM = dt.mID;
                const lT = dt.t || 0;
                const nw = Date.now();
                
                if (isMgr && cM !== sID && nw - lT <= 15e3) {
                    isMgr = false;
                    $("roleTag").textContent = "👁 مشاهد";
                    $("roleTag").style.display = "block";
                    if (this.hbInt) {
                        clearInterval(this.hbInt);
                        this.hbInt = null;
                    }
                } else if (!isMgr && (cM === sID || nw - lT > 15e3)) {
                    isMgr = true;
                    sID = sessionStorage.getItem("sessID") || uid();
                    sessionStorage.setItem("sessID", sID);
                    await sD(D(db, "live", k), { mID: sID, t: Date.now() }, { merge: true });
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.stHB();
                }
            }
        }, { includeMetadataChanges: false });
    }

    tickZoom() {
        const dz = this.targetZoom - this.zoom;
        this.zoom = Math.abs(dz) > .0001 ? this.zoom + dz * this.zoomEase : this.targetZoom;
    }

    getSpacing() {
        return this.baseSpacing * this.zoom;
    }

    getCandleWidth() {
        return Math.max(1, this.baseCandleWidth * this.zoom * this.candleWidthMultiplier);
    }

    getMinScrollOffset() {
        return this.w / 2 - this.cs.length * this.getSpacing();
    }

    getMaxScrollOffset() {
        return this.w / 2;
    }

    clampPan() {
        const mn = this.getMinScrollOffset();
        const mx = this.getMaxScrollOffset();
        this.targetScrollOffset = clp(this.targetScrollOffset, mn, mx);
        this.manualScrollOffset = clp(this.manualScrollOffset, mn, mx);
    }

    snapToLive() {
        this.targetScrollOffset = this.getMinScrollOffset();
        this.manualScrollOffset = this.targetScrollOffset;
        this.momentum = 0;
        this.clampPan();
    }

    smoothScroll() {
        let df = this.targetScrollOffset - this.manualScrollOffset;
        if (Math.abs(df) > .001) {
            const cp = this.getSpacing() * .45;
            df = clp(df, -cp, cp);
            this.manualScrollOffset += df * .35;
        } else {
            this.manualScrollOffset = this.targetScrollOffset;
        }
    }

    applyMomentum() {
        if (Math.abs(this.momentum) > .1) {
            this.targetScrollOffset += this.momentum;
            this.momentum *= .94;
        } else {
            this.momentum = 0;
        }
    }

    getScrollOffset() {
        this.applyMomentum();
        this.smoothScroll();
        this.clampPan();
        return this.manualScrollOffset;
    }

    indexToX(i) {
        return this.getScrollOffset() + i * this.getSpacing();
    }

    xToIndex(x) {
        return (x - this.getScrollOffset()) / this.getSpacing();
    }

    rnd(s) {
        const x = Math.sin(s) * 1e4;
        return x - Math.floor(x);
    }

    rndG(s) {
        const u1 = this.rnd(s);
        const u2 = this.rnd(s + 1e5);
        return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2);
    }

    genCandle(t, op) {
        const s = this.d.seed + Math.floor(t / this.tf);
        const vBase = .0008;
        const tBase = .00005;
        const r1 = this.rndG(s);
        const r2 = this.rndG(s + 1);
        const r3 = this.rndG(s + 2);
        const r4 = this.rnd(s + 3);
        const r5 = this.rnd(s + 4);
        const r6 = this.rnd(s + 5);
        const vl = vBase * (.7 + Math.abs(r1) * .8);
        const tr = tBase * r2 * .6;
        const dr = r3 > 0 ? 1 : -1;
        const tg = op + (dr * vl + tr);
        const rv = vl * (.2 + r4 * .6);
        const hm = rv * (.3 + r5 * .7);
        const lm = rv * (.3 + (1 - r5) * .7);
        const dg = this.d.digits;
        const cl = +(tg + (r6 - .5) * vl * .1).toFixed(dg);
        const o = +op.toFixed(dg);
        
        return {
            open: o,
            close: cl,
            high: +Math.max(o, cl, o + hm, cl + hm).toFixed(dg),
            low: +Math.min(o, cl, o - lm, cl - lm).toFixed(dg),
            timestamp: t
        };
    }

    getPriceRange() {
        const c = (this.priceRange.min + this.priceRange.max) / 2;
        const hr = ((this.priceRange.max - this.priceRange.min) / 2) / (1 * this.priceCompression);
        return { min: c - hr, max: c + hr };
    }

    priceToY(p) {
        const r = this.getPriceRange();
        const n = (p - r.min) / (r.max - r.min);
        return this.h * (1 - n);
    }

    yToPrice(y) {
        const r = this.getPriceRange();
        const n = 1 - (y / this.h);
        return r.min + n * (r.max - r.min);
    }

    updatePriceRange() {
        let v = [...this.cs];
        if (this.cc && (!v.length || this.cc.timestamp !== v[v.length - 1].timestamp)) {
            v.push(this.cc);
        }
        
        if (!v.length) {
            this.priceRange = { min: this.d.price * .95, max: this.d.price * 1.05 };
            return;
        }
        
        const s = Math.floor(this.xToIndex(0));
        const e = Math.ceil(this.xToIndex(this.w));
        const vs = v.slice(Math.max(0, s - 5), Math.min(v.length, e + 5));
        
        if (!vs.length) {
            this.priceRange = { min: this.d.price * .95, max: this.d.price * 1.05 };
            return;
        }
        
        const lw = vs.map(x => x.low);
        const hg = vs.map(x => x.high);
        const mn = Math.min(...lw);
        const mx = Math.max(...hg);
        const pd = (mx - mn) * .15 || 1e-9;
        
        this.priceRange = { min: mn - pd, max: mx + pd };
    }

    gridSteps() {
        const r = this.getPriceRange();
        const sp = r.max - r.min;
        const sP = nS(sp / 8);
        const tS = this.tf * (this.w / this.getSpacing());
        let sT = nS(tS / 7);
        const al = [5e3, 1e4, 15e3, 3e4, 6e4, 12e4, 3e5, 6e5, 9e5, 18e5, 36e5, 72e5];
        sT = al.reduce((a, b) => Math.abs(b - sT) < Math.abs(a - sT) ? b : a, al[0]);
        return { stepP: sP, stepT: sT };
    }

    drawGrid() {
        const r = this.getPriceRange();
        const { stepP, stepT } = this.gridSteps();
        
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "rgba(255,255,255,.16)";
        
        let p0 = Math.floor(r.min / stepP) * stepP;
        for (let p = p0; p <= r.max + stepP * 1.001; p += stepP) {
            const y = this.priceToY(p);
            if (y < 0 || y > this.h) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y + .5);
            this.ctx.lineTo(this.w, y + .5);
            this.ctx.stroke();
        }
        
        const s = Math.floor(this.xToIndex(0)) - 2;
        const e = Math.ceil(this.xToIndex(this.w)) + 2;
        const tS = this.cs.length ? this.cs[0].timestamp : (this.t0 - this.tf * this.cs.length);
        
        for (let i = s; i <= e; i++) {
            const t = tS + i * this.tf;
            if (((t - (Math.floor(tS / stepT) * stepT)) % stepT) !== 0) continue;
            const x = this.indexToX(i);
            if (x < 0 || x > this.w) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(x + .5, 0);
            this.ctx.lineTo(x + .5, this.h);
            this.ctx.stroke();
        }
    }

    updateTimeLabels() {
        const tl = $("timeLabels");
        tl.innerHTML = "";
        
        const { stepT } = this.gridSteps();
        const s = Math.floor(this.xToIndex(0)) - 2;
        const e = Math.ceil(this.xToIndex(this.w)) + 2;
        const tS = this.cs.length ? this.cs[0].timestamp : (this.t0 - this.tf * this.cs.length);
        
        for (let i = s; i <= e; i++) {
            const t = tS + i * this.tf;
            if (((t - (Math.floor(tS / stepT) * stepT)) % stepT) !== 0) continue;
            const x = this.indexToX(i);
            if (x < 5 || x > this.w - 5) continue;
            
            const d = new Date(t);
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            const ss = String(d.getSeconds()).padStart(2, "0");
            
            const lb = document.createElement("div");
            lb.className = "timeLabel";
            lb.style.left = x + "px";
            lb.textContent = (stepT < 6e4 ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`);
            tl.appendChild(lb);
        }
    }

    updatePriceScale() {
        const pC = $("ps");
        pC.innerHTML = "";
        
        const r = this.getPriceRange();
        const { stepP } = this.gridSteps();
        
        let p0 = Math.floor(r.min / stepP) * stepP;
        let n = 0;
        
        for (let p = p0; p <= r.max + stepP * 1.001; p += stepP) {
            const y = this.priceToY(p);
            if (y < 0 || y > this.h) continue;
            
            const lb = document.createElement("div");
            lb.className = "pl";
            lb.style.top = y + "px";
            lb.textContent = (+p).toFixed(this.d.digits);
            pC.appendChild(lb);
            
            if (++n > 20) break;
        }
    }

    updatePriceIndicator() {
        if (!this.cc || !this.priceInd) return;
        
        const cp = this.cc.close;
        const y = this.priceToY(cp);
        
        this.priceInd.textContent = cp.toFixed(this.d.digits);
        this.priceInd.style.top = y + "px";
        this.priceInd.style.display = "block";
        
        if (this.scaleMark) {
            this.scaleMark.style.top = y + "px";
            this.scaleMark.style.display = "block";
        }
    }

    drawCurrentPriceLine() {
        if (!this.cc) return;
        
        const y = this.priceToY(this.cc.close);
        this.ctx.strokeStyle = "rgba(255,215,0,.35)";
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([6, 6]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, y + .5);
        this.ctx.lineTo(this.w, y + .5);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    updateCandleTimer() {
        const nw = Date.now();
        const el = nw - this.t0;
        const lf = Math.max(0, Math.ceil((this.tf - el) / 1e3));
        const cT = $("candleTimer");
        
        cT.textContent = String(lf);
        
        if (this.cc) {
            const x = this.indexToX(this.cs.length);
            const y = this.priceToY(this.cc.close);
            
            if (x >= -60 && x <= this.w + 60) {
                cT.style.left = Math.max(10, Math.min(this.w - 60, x + 25)) + "px";
                cT.style.top = Math.max(10, Math.min(this.h - 30, y - 15)) + "px";
                cT.style.display = "block";
            } else {
                cT.style.display = "none";
            }
        } else {
            cT.style.display = "none";
        }
    }

    drawTradeMarkersCanvas() {
        if (!this.cc) return;
        
        const nw = Date.now();
        for (const tr of st.trades) {
            if (tr.closed) continue;
            if (tr.pair !== this.pair) continue;
            if (tr.candleIndex !== this.cs.length) continue;
            
            const x = this.indexToX(this.cs.length);
            const y = this.priceToY(tr.openPrice);
            const cl = tr.type === "buy" ? "#00ff88" : "#ff5a4f";
            
            this.ctx.save();
            this.ctx.strokeStyle = cl;
            this.ctx.fillStyle = cl;
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.globalAlpha = .7;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - 60, y);
            this.ctx.stroke();
            
            this.ctx.globalAlpha = 1;
            this.ctx.font = "900 12px system-ui";
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "middle";
            
            const lf = Math.max(0, tr.openTime + tr.duration - nw);
            this.ctx.fillText((tr.type === "buy" ? "▲ " : "▼ ") + ("$" + tr.amount), x - 66, y - 10);
            
            this.ctx.globalAlpha = .7;
            this.ctx.font = "900 11px system-ui";
            this.ctx.fillText(fT(lf), x - 66, y + 10);
            
            this.ctx.restore();
        }
    }

    async iCL(n = 100) {
        const lc = this.cs.length > 0 ? this.cs[this.cs.length - 1].close : this.d.price;
        const st2 = this.cs.length > 0 ? this.cs[this.cs.length - 1].timestamp + this.tf : this.t0 - this.tf * n;
        let b = lc;
        
        for (let i = 0; i < n; i++) {
            const t = st2 + i * this.tf;
            const cd = this.genCandle(t, b);
            this.cs.push(cd);
            b = cd.close;
        }
        
        this.cp = b;
        await svFB(this.pair, this.cs);
        shSt("✅ تم توليد " + n + " شمعة");
    }

    stepTowards(cr, tg, mS) {
        const d = tg - cr;
        return Math.abs(d) <= mS ? tg : cr + Math.sign(d) * mS;
    }

    updateCurrentCandle() {
        if (!isMgr) return;
        
        if (!this.cc) {
            const lp = this.cs.length ? this.cs[this.cs.length - 1].close : this.cp;
            this.cc = this.genCandle(this.t0, lp);
            this.cc.close = lp;
            this.cc.high = Math.max(this.cc.open, this.cc.close);
            this.cc.low = Math.min(this.cc.open, this.cc.close);
            return;
        }
        
        const nw = Date.now();
        const sd = this.d.seed + nw;
        const r = this.rnd(sd);
        const dr = (r - .5) * .0004;
        const tg = this.cc.close + dr;
        const mS = .0008 * .18;
        const nc = +this.stepTowards(this.cc.close, tg, mS).toFixed(this.d.digits);
        
        this.cc.close = nc;
        this.cc.high = +Math.max(this.cc.high, nc).toFixed(this.d.digits);
        this.cc.low = +Math.min(this.cc.low, nc).toFixed(this.d.digits);
        this.cp = nc;
        
        svLV(this.pair, this.cc);
        this.updateTrades();
    }

    updateTrades() {
        if (!this.cc) return;
        
        const nw = Date.now();
        const cp = this.cc.close;
        
        st.trades.forEach(tr => {
            if (tr.closed) return;
            if (tr.pair !== this.pair) return;
            
            if (!tr.priceHistory) tr.priceHistory = [];
            tr.priceHistory.push(cp);
            
            const el = nw - tr.openTime;
            if (el >= tr.duration) {
                const pf = cPf(tr, cp);
                tr.profit = pf;
                tr.closePrice = cp;
                tr.closeTime = nw;
                tr.closed = 1;
                bal += pf;
                upB();
                svTr();
            } else {
                tr.profit = cPf(tr, cp);
            }
        });
        
        rTP();
    }

    async tick() {
        if (!this.on) return;
        
        const nw = Date.now();
        const el = nw - this.t0;
        
        if (el >= this.tf) {
            if (isMgr && this.cc) {
                if (!this.cs.length || this.cs[this.cs.length - 1].timestamp !== this.cc.timestamp) {
                    this.cs.push({ ...this.cc });
                    await svFB(this.pair, this.cs);
                }
            }
            
            this.t0 = Math.floor(nw / this.tf) * this.tf;
            const lp = this.cc ? this.cc.close : this.cp;
            this.cc = this.genCandle(this.t0, lp);
            this.cc.open = lp;
            this.cc.close = lp;
            this.cc.high = lp;
            this.cc.low = lp;
            this.cp = lp;
        } else if (isMgr) {
            this.updateCurrentCandle();
        }
        
        this.updatePriceRange();
        this.updatePriceScale();
        this.updateTimeLabels();
        this.updateCandleTimer();
        this.updatePriceIndicator();
        
        this.tickTimer = setTimeout(() => this.tick(), 200);
    }

    async genN(n) {
        shSt("⏳ توليد " + n + " شمعة...");
        
        const lc = this.cs.length > 0 ? this.cs[0].open : this.d.price;
        const st2 = this.cs.length > 0 ? this.cs[0].timestamp - this.tf * n : this.t0 - this.tf * n;
        let b = lc;
        const nw = [];
        
        for (let i = n; i > 0; i--) {
            const t = st2 + i * this.tf;
            const cd = this.genCandle(t, b);
            nw.unshift(cd);
            b = cd.close;
        }
        
        if (this.cs.length > 0) {
            nw[nw.length - 1].close = this.cs[0].open;
        }
        
        this.cs = [...nw, ...this.cs];
        await svFB(this.pair, this.cs);
        shSt("✅ تم توليد " + n + " شمعة");
        
        this.updatePriceRange();
        this.updatePriceScale();
        this.updateTimeLabels();
    }

    drawCandle(cd, x, lv) {
        const o = this.priceToY(cd.open);
        const cl = this.priceToY(cd.close);
        const hi = this.priceToY(cd.high);
        const lo = this.priceToY(cd.low);
        const bl = cd.close >= cd.open;
        const co = bl ? getComputedStyle(document.documentElement).getPropertyValue("--gg") : "#d32f2f";
        const w = this.getCandleWidth();
        
        this.ctx.strokeStyle = co;
        this.ctx.lineWidth = Math.max(1, w * .18);
        this.ctx.beginPath();
        this.ctx.moveTo(x, hi);
        this.ctx.lineTo(x, lo);
        this.ctx.stroke();
        
        const bh = Math.max(1, Math.abs(cl - o));
        const bt = Math.min(o, cl);
        
        this.ctx.fillStyle = co;
        if (lv) {
            this.ctx.shadowColor = co;
            this.ctx.shadowBlur = 7;
        }
        this.ctx.fillRect(x - w / 2, bt, w, bh);
        if (lv) this.ctx.shadowBlur = 0;
    }

    drawIndicators() {
        for (const in2 of st.inds) {
            if (in2.type === "bb") this.drawBB(in2);
            else if (in2.type === "tl") this.drawTL(in2);
        }
    }

    drawHandle(x, y, co = "#ffd700") {
        this.ctx.save();
        this.ctx.fillStyle = co;
        this.ctx.strokeStyle = "rgba(0,0,0,.45)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawBB(in2) {
        if (this.cs.length < (in2.period || 20)) return;
        
        const p = in2.period || 20;
        const std = in2.std || 2;
        let sm = [], up = [], lw = [];
        
        for (let i = p - 1; i < this.cs.length; i++) {
            let su = 0;
            for (let j = 0; j < p; j++) su += this.cs[i - j].close;
            const av = su / p;
            
            let va = 0;
            for (let j = 0; j < p; j++) {
                const df = this.cs[i - j].close - av;
                va += df * df;
            }
            const sd = Math.sqrt(va / p);
            
            sm.push(av);
            up.push(av + std * sd);
            lw.push(av - std * sd);
        }
        
        this.ctx.strokeStyle = in2.color || "#ffff00";
        this.ctx.lineWidth = in2.width || 2;
        this.ctx.beginPath();
        for (let i = 0; i < sm.length; i++) {
            const x = this.indexToX(i + p - 1);
            const y = this.priceToY(sm[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        this.ctx.strokeStyle = in2.color || "#ffff00";
        this.ctx.globalAlpha = .5;
        this.ctx.beginPath();
        for (let i = 0; i < up.length; i++) {
            const x = this.indexToX(i + p - 1);
            const y = this.priceToY(up[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        this.ctx.beginPath();
        for (let i = 0; i < lw.length; i++) {
            const x = this.indexToX(i + p - 1);
            const y = this.priceToY(lw[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    drawTL(in2) {
        if (!in2.x1 || !in2.y1 || !in2.x2 || !in2.y2) return;
        
        this.ctx.strokeStyle = in2.color || "#ffff00";
        this.ctx.lineWidth = in2.width || 2;
        this.ctx.beginPath();
        this.ctx.moveTo(in2.x1, in2.y1);
        this.ctx.lineTo(in2.x2, in2.y2);
        this.ctx.stroke();
        
        const mx = (in2.x1 + in2.x2) / 2;
        const my = (in2.y1 + in2.y2) / 2;
        
        this.drawHandle(mx, my, "#ffd700");
        this.drawHandle(in2.x1, in2.y1, "#ffd700");
        this.drawHandle(in2.x2, in2.y2, "#ffd700");
    }

    draw() {
        this.tickZoom();
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.drawGrid();
        
        for (let i = 0; i < this.cs.length; i++) {
            const x = this.indexToX(i);
            if (x < -60 || x > this.w + 60) continue;
            this.drawCandle(this.cs[i], x, 0);
        }
        
        if (this.cc && (!this.cs.length || this.cc.timestamp !== this.cs[this.cs.length - 1].timestamp)) {
            const lX = this.indexToX(this.cs.length);
            if (lX >= -60 && lX <= this.w + 60) {
                this.drawCandle(this.cc, lX, 1);
            }
        }
        
        this.drawCurrentPriceLine();
        this.drawIndicators();
        this.drawTradeMarkersCanvas();
    }

    loop() {
        if (!this.on) return;
        this.draw();
        this.loopFrame = requestAnimationFrame(() => this.loop());
    }

    applyZoomAround(mx, my, sc) {
        const oZ = this.targetZoom;
        const nZ = clp(oZ * sc, this.minZoom, this.maxZoom);
        if (Math.abs(nZ - oZ) < 1e-6) return;
        
        const ix = this.xToIndex(mx);
        this.targetZoom = nZ;
        this.zoom = nZ;
        const nx = mx - ix * this.getSpacing();
        this.targetScrollOffset = nx;
        this.manualScrollOffset = nx;
        this.clampPan();
    }

    hitHandle(x, y, hx, hy, r = 18) {
        return Math.hypot(x - hx, y - hy) <= r;
    }

    hitTrendDot(x, y) {
        for (const in2 of st.inds) {
            if (in2.type === "tl") {
                const mx = (in2.x1 + in2.x2) / 2;
                const my = (in2.y1 + in2.y2) / 2;
                if (this.hitHandle(x, y, mx, my, 18)) return { ind: in2, pt: "mid" };
                if (this.hitHandle(x, y, in2.x1, in2.y1, 18)) return { ind: in2, pt: "p1" };
                if (this.hitHandle(x, y, in2.x2, in2.y2, 18)) return { ind: in2, pt: "p2" };
            }
        }
        return null;
    }

    moveTrendDot(x, y) {
        const { ind, pt } = this.tlDrag;
        if (pt === "mid") {
            const mx = (ind.x1 + ind.x2) / 2;
            const my = (ind.y1 + ind.y2) / 2;
            const dx = x - mx;
            const dy = y - my;
            ind.x1 += dx;
            ind.y1 += dy;
            ind.x2 += dx;
            ind.y2 += dy;
        } else if (pt === "p1") {
            ind.x1 = x;
            ind.y1 = y;
        } else if (pt === "p2") {
            ind.x2 = x;
            ind.y2 = y;
        }
    }

    ev() {
        addEventListener("resize", () => this.setup());
        
        this.cv.addEventListener("wheel", e => {
            e.preventDefault();
            const r = this.cv.getBoundingClientRect();
            const mx = e.clientX - r.left;
            const my = e.clientY - r.top;
            const sc = e.deltaY > 0 ? 1 / 1.10 : 1.10;
            this.applyZoomAround(mx, my, sc);
        }, { passive: false });
        
        const dn = (x, y, t) => {
            const ht = this.hitTrendDot(x, y);
            if (ht) {
                this.tlDrag = ht;
                return;
            }
            this.drag = 1;
            this.dragStartX = x;
            this.dragStartScroll = this.targetScrollOffset;
            this.momentum = 0;
            this.lastDragDelta = 0;
            this.lastDragTime = t;
            this.lastMoveX = x;
        };
        
        const mv = (x, y, t) => {
            if (this.tlDrag) {
                this.moveTrendDot(x, y);
                return;
            }
            if (this.drag) {
                const d = x - this.dragStartX;
                this.targetScrollOffset = this.dragStartScroll + d;
                this.clampPan();
                const dt = t - this.lastDragTime;
                if (dt > 0 && dt < 100) {
                    this.lastDragDelta = (x - (this.lastMoveX || x)) / dt * 16;
                }
                this.lastMoveX = x;
                this.lastDragTime = t;
            }
        };
        
        const up = () => {
            this.tlDrag = null;
            if (this.drag && Math.abs(this.lastDragDelta) > 1) {
                this.momentum = this.lastDragDelta;
            }
            this.drag = 0;
        };
        
        this.cv.addEventListener("mousedown", e => {
            const r = this.cv.getBoundingClientRect();
            dn(e.clientX - r.left, e.clientY - r.top, Date.now());
        });
        
        addEventListener("mousemove", e => {
            const r = this.cv.getBoundingClientRect();
            mv(e.clientX - r.left, e.clientY - r.top, Date.now());
        });
        
        addEventListener("mouseup", up);
        
        const ds = (a, b) => Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        
        this.cv.addEventListener("touchstart", e => {
            const r = this.cv.getBoundingClientRect();
            if (e.touches.length === 1) {
                const T = e.touches[0];
                dn(T.clientX - r.left, T.clientY - r.top, Date.now());
            } else if (e.touches.length === 2) {
                this.drag = 0;
                this.pinch = 1;
                this.p0 = ds(e.touches[0], e.touches[1]);
                this.pMidX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - r.left;
                this.pMidY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - r.top;
            }
        }, { passive: false });
        
        this.cv.addEventListener("touchmove", e => {
            e.preventDefault();
            const r = this.cv.getBoundingClientRect();
            if (this.pinch && e.touches.length === 2) {
                const d = ds(e.touches[0], e.touches[1]);
                if (this.p0 > 0) {
                    const sc = clp(d / (this.p0 || d), .2, 5);
                    this.applyZoomAround(this.pMidX, this.pMidY, sc);
                }
                this.p0 = d;
            } else if (!this.pinch && e.touches.length === 1) {
                const T = e.touches[0];
                mv(T.clientX - r.left, T.clientY - r.top, Date.now());
            }
        }, { passive: false });
        
        this.cv.addEventListener("touchend", e => {
            if (e.touches.length < 2) {
                this.pinch = 0;
                this.p0 = 0;
            }
            if (e.touches.length === 0) up();
        }, { passive: false });
        
        this.cv.addEventListener("touchcancel", () => {
            this.pinch = 0;
            this.p0 = 0;
            up();
        }, { passive: false });
    }

    async boot() {
        $("sk").classList.add("on");
        
        sID = sessionStorage.getItem("sessID") || uid();
        sessionStorage.setItem("sessID", sID);
        
        await this.setPair("EUR/USD");
        
        const fb = await ldFB("EUR/USD");
        this.cs = fb.length > 0 ? [...fb] : [];
        
        if (this.cs.length > 0) {
            this.t0 = this.cs[this.cs.length - 1].timestamp + this.tf;
            this.cp = this.cs[this.cs.length - 1].close;
        } else {
            this.iCL(100);
        }
        
        this.snapToLive();
        this.updatePriceRange();
        
        await this.chkMR();
        this.subLV();
        this.stMC();
        ldTr();
        
        this.on = 1;
        this.tick();
        this.loop();
        
        $("sk").classList.remove("on");
        
        window.addEventListener("beforeunload", async () => {
            if (isMgr) await clMgr(this.pair);
        });
    }
}

// ===== Initialize Chart =====
const chart = new Chart();
window.chart = chart;
await chart.boot();

// ===== Event Handlers =====
const PC = 8;
const FA = 1.12;

const pBy = n => {
    chart.momentum = 0;
    chart.targetScrollOffset += n * chart.getSpacing();
    chart.clampPan();
};

$("panL").onclick = () => pBy(+PC);
$("panR").onclick = () => pBy(-PC);

const zAC = s => chart.applyZoomAround(chart.w / 2, chart.h / 2, s);

$("zoomIn").onclick = () => zAC(1.12);
$("zoomOut").onclick = () => zAC(1 / 1.12);
$("moreData").onclick = () => zAC(1 / 1.12);
$("lessData").onclick = () => zAC(1.12);

$("wInc").onclick = () => { chart.candleWidthMultiplier *= FA; };
$("wDec").onclick = () => { chart.candleWidthMultiplier /= FA; };

$("compInc").onclick = () => { chart.priceCompression *= FA; };
$("compDec").onclick = () => { chart.priceCompression /= FA; };

$("resetLive").onclick = () => { chart.snapToLive(); };
$("resetAll").onclick = () => {
    chart.zoom = 1;
    chart.targetZoom = 1;
    chart.candleWidthMultiplier = 1;
    chart.priceCompression = 1;
    chart.snapToLive();
};

$("hidePanel").onclick = () => { $("ctrlPanel").style.display = "none"; };
$("saveLocal").onclick = () => {
    $("saveLocal").textContent = "تم ✓";
    setTimeout(() => $("saveLocal").textContent = "حفظ", 800);
};

// Balance Menu
balanceBox.onclick = e => {
    if (e.target.closest(".accMenu")) return;
    e.stopPropagation();
    accMenu.classList.toggle("show");
    balanceBox.classList.toggle("open");
};

document.addEventListener("click", e => {
    if (!e.target.closest("#balanceBox")) {
        accMenu.classList.remove("show");
        balanceBox.classList.remove("open");
    }
});

refillBtn.onclick = () => {
    bal = 10000;
    upB();
    refillBtn.textContent = "✅";
    setTimeout(() => refillBtn.textContent = "🔄 Refill Demo Account", 900);
};

document.querySelectorAll(".accSwitchBtn").forEach(bn => bn.onclick = () => {
    aA = bn.dataset.acc;
    document.querySelectorAll(".accSwitchBtn").forEach(x => x.classList.toggle("active", x === bn));
    document.querySelectorAll(".accItem").forEach(x => x.classList.toggle("active", x.dataset.type === aA));
    upB();
    upAI();
});

document.querySelectorAll(".accItem").forEach(it => it.onclick = () => {
    aA = it.dataset.type;
    document.querySelectorAll(".accItem").forEach(x => x.classList.toggle("active", x === it));
    upB();
    upAI();
});

upAI();

// DateTime
const dt = $("datetime");
const upDT = () => {
    const n = new Date();
    const h = String(n.getHours()).padStart(2, "0");
    const m = String(n.getMinutes()).padStart(2, "0");
    const s = String(n.getSeconds()).padStart(2, "0");
    dt.textContent = `${h}:${m}:${s}`;
};
setInterval(upDT, 1000);
upDT();

// Time Input
const tI = $("timeInput");
const tPP = $("timePickerPopup");
const mB = $("manualBtn");
let iMM = false;

tI.onclick = e => {
    if (iMM) return;
    e.stopPropagation();
    tPP.classList.toggle("show");
};

document.addEventListener("click", e => {
    if (!e.target.closest("#timeWrapper")) tPP.classList.remove("show");
});

document.querySelectorAll(".timeBtn").forEach(bn => bn.onclick = e => {
    e.stopPropagation();
    tI.value = bn.getAttribute("data-time");
    tPP.classList.remove("show");
});

mB.onclick = e => {
    e.stopPropagation();
    iMM = !iMM;
    if (iMM) {
        tPP.classList.remove("show");
        tI.readOnly = false;
        tI.focus();
        tI.select();
    } else {
        tI.readOnly = true;
    }
};

tI.onblur = () => {
    if (iMM) {
        const vl = tI.value;
        if (!/^\d{2}:\d{2}:\d{2}$/.test(vl)) tI.value = "00:01:00";
        iMM = false;
        tI.readOnly = true;
    }
};

// Amount Input
let amt = 1;
const aI = $("amountInput");

const upd = () => {
    let s = String(aI.value).replace(/,|\$|\s/g, "").trim();
    if (!s) {
        amt = 1;
        aI.value = "$ 1";
        return;
    }
    let v = parseFloat(s);
    if (!isFinite(v)) v = 1;
    v = Math.max(1, Math.min(999999, v));
    amt = v;
    aI.value = "$ " + v;
};

$("plus").onclick = () => {
    amt++;
    aI.value = "$ " + amt;
};

$("minus").onclick = () => {
    amt = Math.max(1, amt - 1);
    aI.value = "$ " + amt;
};

aI.oninput = upd;
aI.onblur = upd;
upd();

// Trading
const opT = async tp => {
    if (!chart.cc) return;
    
    const dr = pD(tI.value);
    const op = +chart.cc.close;
    const ci = chart.cs.length;
    
    const tr = {
        id: uid(),
        type: tp,
        amount: amt,
        openPrice: op,
        openTime: Date.now(),
        duration: dr,
        candleIndex: ci,
        pair: chart.pair,
        profit: 0,
        closed: 0,
        priceHistory: [op]
    };
    
    st.trades.push(tr);
    svTr();
    rTP();
};

$("buy").onclick = () => opT("buy");
$("sell").onclick = () => opT("sell");

// Generate Panel
$("genBtn").onclick = () => $("genPanel").classList.add("show");
$("genCancel").onclick = () => $("genPanel").classList.remove("show");
$("genConfirm").onclick = async () => {
    const n = parseInt($("genInput").value) || 100;
    const cl = Math.max(10, Math.min(1000, n));
    $("genPanel").classList.remove("show");
    await chart.genN(cl);
};

// Trades Panel
$("indBtn1").onclick = () => {
    $("tradesPanel").classList.toggle("open");
    rTP();
};

$("closeTrPanel").onclick = () => $("tradesPanel").classList.remove("open");

$("tradesContent").onclick = e => {
    const cd = e.target.closest(".tradeCard");
    if (!cd) return;
    const idx = +cd.dataset.idx;
    const dt = $("trD" + idx);
    if (dt) {
        dt.classList.toggle("open");
    }
};

// Indicators Panel
$("indBtn2").onclick = () => {
    $("indicatorsPanel").classList.toggle("show");
};

$("closeIndBtn").onclick = () => $("indicatorsPanel").classList.remove("show");

$("eyeBtn").onclick = () => {
    shIN = !shIN;
    rIN();
};

// Platform Time
const pt = $("platTime");
const tPl = () => {
    const d = new Date(Date.now() + 3 * 36e5);
    pt.textContent = `UTC+3 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};
setInterval(tPl, 250);
tPl();

// Initialize UI
upPF("EUR/USD", $("pairFlags"));
rPP();
rTP();

// Pair Panel
$("pairHud").onclick = e => {
    e.stopPropagation();
    $("pairPanel").classList.toggle("on");
    rPP();
};

$("pairClose").onclick = () => $("pairPanel").classList.remove("on");

$("pairList").onclick = async e => {
    const b = e.target.closest("button.pit");
    if (!b) return;
    const p = b.getAttribute("data-p");
    
    if (e.target && e.target.getAttribute && e.target.getAttribute("data-s")) {
        st.fav.has(p) ? st.fav.delete(p) : st.fav.add(p);
        rPP();
        return;
    }
    
    $("pairPanel").classList.remove("on");
    await chart.switchPair(p);
};

document.addEventListener("click", e => {
    if ($("pairPanel").classList.contains("on") && 
        !e.target.closest("#pairPanel") && 
        !e.target.closest("#pairHud")) {
        $("pairPanel").classList.remove("on");
    }
});

// Indicators Settings
$("indSetClose").onclick = () => $("indSet").classList.remove("show");

$("indRemove").onclick = () => {
    if (!eI) return;
    const ix = st.inds.indexOf(eI);
    if (ix >= 0) {
        st.inds.splice(ix, 1);
        rIB();
        rIN();
    }
    $("indSet").classList.remove("show");
    eI = null;
};

$("indColor").oninput = () => {
    if (eI) {
        eI.color = $("indColor").value;
    }
};

$("indWidth").oninput = () => {
    if (eI) {
        eI.width = +$("indWidth").value;
    }
};

$("indPeriod").oninput = () => {
    if (eI) {
        eI.period = +$("indPeriod").value;
    }
};

$("indStd").oninput = () => {
    if (eI) {
        eI.std = +$("indStd").value;
    }
};

$("indicatorsPanel").onclick = e => {
    const it = e.target.closest(".indItem");
    if (!it) return;
    const t = it.dataset.ind;
    
    if (t === "bb") {
        st.inds.push({
            id: uid(),
            type: "bb",
            color: "#ffff00",
            width: 2,
            period: 20,
            std: 2
        });
        rIB();
        $("indicatorsPanel").classList.remove("show");
    } else if (t === "tl") {
        const x1 = chart.w * .3;
        const y1 = chart.h * .3;
        const x2 = chart.w * .7;
        const y2 = chart.h * .7;
        st.inds.push({
            id: uid(),
            type: "tl",
            color: "#ffff00",
            width: 2,
            x1, y1, x2, y2
        });
        rIB();
        $("indicatorsPanel").classList.remove("show");
    }
};

rIB();
rIN();
