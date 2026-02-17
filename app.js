// ===========================
// استيراد Firebase
// ===========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    deleteField
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// ===========================
// إعدادات Firebase
// ===========================
const firebaseConfig = {
    apiKey: "AIzaSyBOUqLixfphg3b8hajc4hkwV-VJmldGBVw",
    authDomain: "randers-c640b.firebaseapp.com",
    projectId: "randers-c640b",
    storageBucket: "randers-c640b.firebasestorage.app",
    messagingSenderId: "391496092929",
    appId: "1:391496092929:web:58208b4eb3e6f9a8571f00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===========================
// وظائف Firebase المساعدة
// ===========================

// عرض رسالة الحالة
const showStatus = (message, type) => {
    const statusEl = document.getElementById("fbStatus");
    statusEl.textContent = message;
    statusEl.className = "fbStatus show " + (type || "success");
    setTimeout(() => statusEl.classList.remove("show"), 2500);
};

// حفظ الشموع إلى Firebase
const saveToFirebase = async (pair, candles) => {
    try {
        const key = pair.replace(/\//g, "_");
        await setDoc(doc(db, "candles", key), {
            cs: candles,
            lu: Date.now()
        }, { merge: false });
        console.log("✓ حفظ:", pair, candles.length);
    } catch (error) {
        console.error("❌ خطأ في الحفظ:", error);
        showStatus("خطأ في الحفظ", "error");
    }
};

// تحميل الشموع من Firebase
const loadFromFirebase = async (pair) => {
    try {
        const key = pair.replace(/\//g, "_");
        const snapshot = await getDoc(doc(db, "candles", key));
        if (snapshot.exists()) {
            const data = snapshot.data();
            console.log("✓ تحميل:", pair, data.cs?.length || 0);
            return data.cs || [];
        }
        return [];
    } catch (error) {
        console.error("❌ خطأ في التحميل:", error);
        return [];
    }
};

// حفظ الشمعة الحالية المباشرة
const saveLiveCandle = async (pair, candle) => {
    try {
        const key = "live_" + pair.replace(/\//g, "_");
        const sessionID = sessionStorage.getItem("sessID") || "";
        await setDoc(doc(db, "live", key), {
            cc: candle,
            t: Date.now(),
            mID: sessionID
        }, { merge: true });
    } catch (error) {
        console.error("❌ خطأ في حفظ الشمعة المباشرة:", error);
    }
};

// مسح مدير الزوج
const clearManager = async (pair) => {
    try {
        const key = "live_" + pair.replace(/\//g, "_");
        await setDoc(doc(db, "live", key), {
            mID: deleteField()
        }, { merge: true });
    } catch (error) {
        console.error("❌ خطأ في مسح المدير:", error);
    }
};

// ===========================
// وظائف حفظ وتحميل الصفقات
// ===========================
const saveTrades = () => {
    try {
        localStorage.setItem("trades", JSON.stringify(state.trades));
    } catch (error) {
        console.error("❌ خطأ في حفظ الصفقات:", error);
    }
};

const loadTrades = () => {
    try {
        const data = localStorage.getItem("trades");
        if (data) {
            const trades = JSON.parse(data);
            state.trades = trades.filter(x => x.pair === chart.pair);
            renderTradesPanel();
        }
    } catch (error) {
        console.error("❌ خطأ في تحميل الصفقات:", error);
    }
};

// ===========================
// وظائف مساعدة عامة
// ===========================
const $ = (id) => document.getElementById(id);

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// خريطة أعلام العملات
const flagMap = {
    AED: "ae", CNY: "cn", AUD: "au", CAD: "ca", CHF: "ch",
    BHD: "bh", EUR: "eu", RUB: "ru", USD: "us", KES: "ke",
    LBP: "lb", QAR: "qa", TRY: "tr", SYP: "sy", EGP: "eg",
    INR: "in", IRR: "ir"
};

const makeFlag = (currency) => 
    `https://flagcdn.com/w40/${(flagMap[currency] || currency || "un").toLowerCase()}.png`;

// ===========================
// بيانات الأزواج الافتراضية
// ===========================
const defaultPairs = [
    { pair: "AED/CNY", otc: 1, payout: 0.91, flags: ["AED", "CNY"], price: 7.2, seed: 11001, digits: 3 },
    { pair: "AUD/CAD", otc: 1, payout: 0.88, flags: ["AUD", "CAD"], price: 0.91, seed: 11002, digits: 5 },
    { pair: "AUD/CHF", otc: 1, payout: 0.92, flags: ["AUD", "CHF"], price: 0.55, seed: 11003, digits: 5 },
    { pair: "BHD/CNY", otc: 1, payout: 0.86, flags: ["BHD", "CNY"], price: 19.8, seed: 11004, digits: 3 },
    { pair: "EUR/RUB", otc: 1, payout: 0.77, flags: ["EUR", "RUB"], price: 97.4, seed: 11005, digits: 2 },
    { pair: "EUR/USD", otc: 1, payout: 0.92, flags: ["EUR", "USD"], price: 1.0895, seed: 33333, digits: 5 },
    { pair: "KES/USD", otc: 1, payout: 0.84, flags: ["KES", "USD"], price: 0.0077, seed: 11006, digits: 6 },
    { pair: "LBP/USD", otc: 1, payout: 0.79, flags: ["LBP", "USD"], price: 0.000011, seed: 11007, digits: 8 },
    { pair: "QAR/CNY", otc: 1, payout: 0.83, flags: ["QAR", "CNY"], price: 1.97, seed: 11008, digits: 4 },
    { pair: "USD/CHF", otc: 1, payout: 0.89, flags: ["USD", "CHF"], price: 0.91, seed: 11009, digits: 5 },
    { pair: "SYP/TRY", otc: 1, payout: 0.87, flags: ["SYP", "TRY"], price: 0.00013, seed: 11010, digits: 7 },
    { pair: "EGP/USD", otc: 1, payout: 0.78, flags: ["EGP", "USD"], price: 0.032, seed: 11011, digits: 5 },
    { pair: "USD/INR", otc: 1, payout: 0.90, flags: ["USD", "INR"], price: 83.2, seed: 11012, digits: 2 }
];

// ===========================
// الحالة العامة للتطبيق
// ===========================
const state = {
    pairs: new Map(),
    favorites: new Set(),
    trades: [],
    indicators: []
};

// تهيئة الأزواج
defaultPairs.forEach(p => state.pairs.set(p.pair, p));

// ===========================
// وظائف عرض واجهة المستخدم
// ===========================

// تحديث أعلام الزوج
const updatePairFlags = (pair, container) => {
    const meta = state.pairs.get(pair) || defaultPairs.find(x => x.pair === pair);
    if (!meta) return;
    const flags = meta.flags || String(pair).split("/");
    container.innerHTML = flags.map(f => `<img src="${makeFlag(f)}" class="flag-icon-small">`).join("");
};

// تنسيق النسبة المئوية
const formatPayout = (payout) => Math.round((+payout || 0) * 100) + "%";

// عرض قائمة الأزواج
const renderPairsList = () => {
    const listEl = $("pairList");
    if (!listEl) return;

    const allPairs = [...state.pairs.values()].sort((a, b) => {
        const favA = state.favorites.has(a.pair) ? 1 : 0;
        const favB = state.favorites.has(b.pair) ? 1 : 0;
        if (favA !== favB) return favB - favA;
        return a.pair.localeCompare(b.pair);
    });

    listEl.innerHTML = allPairs.map(p => {
        const [curr1, curr2] = String(p.pair).split("/");
        const star = state.favorites.has(p.pair) ? "★" : "☆";
        return `
            <button class="pit" data-p="${p.pair}">
                <span class="pitL">
                    <span class="star" data-s="1">${star}</span>
                    <span class="fg">
                        <img src="${makeFlag(curr1)}">
                        <img src="${makeFlag(curr2)}">
                    </span>
                    <span class="nm">${p.pair}<span class="bad">OTC</span></span>
                </span>
                <span>+${formatPayout(p.payout)}</span>
            </button>
        `;
    }).join("");
};

// ===========================
// متغيرات الإدارة
// ===========================
let isManager = false;
let showIndicatorNames = true;
let sessionID = "";
let balance = 10000;

// ===========================
// وظائف مساعدة للحسابات
// ===========================
const generateUID = () => Math.random().toString(36).slice(2, 9);

const niceStep = (value) => {
    if (!(value > 0)) return 1;
    const power = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / power;
    return (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * power;
};

// تحويل وقت نصي إلى ميلي ثانية
const parseDuration = (str) => {
    const match = str.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if (!match) return 60000;
    return (+match[1] * 3600 + +match[2] * 60 + +match[3]) * 1000;
};

// تنسيق الوقت من ميلي ثانية
const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours > 0 
        ? `${hours}:${String(minutes % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
        : `${minutes % 60}:${String(seconds % 60).padStart(2, "0")}`;
};

// تنسيق التاريخ والوقت
const formatDateTime = (timestamp) => {
    const d = new Date(timestamp);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

// ===========================
// حساب الربح/الخسارة
// ===========================
function calculateProfit(trade, currentPrice) {
    const pairInfo = state.pairs.get(trade.pair);
    const payout = pairInfo ? pairInfo.payout : 0.85;
    const priceDiff = trade.type === "buy" 
        ? currentPrice - trade.openPrice 
        : trade.openPrice - currentPrice;
    
    return priceDiff > 0 
        ? trade.amount * (1 + payout) 
        : priceDiff < 0 
            ? -trade.amount 
            : 0;
}

// ===========================
// عرض لوحة الصفقات
// ===========================
function renderTradesPanel() {
    const contentEl = $("tradesContent");
    const activeTrades = state.trades.filter(t => t.pair === chart.pair);

    if (!activeTrades.length) {
        contentEl.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,.5);padding:20px;">لا توجد صفقات</p>';
        return;
    }

    contentEl.innerHTML = activeTrades.map((trade, index) => {
        const now = Date.now();
        const timeLeft = Math.max(0, trade.openTime + trade.duration - now);
        const currentPrice = window.chart && chart.currentCandle ? chart.currentCandle.close : trade.openPrice;
        const profit = calculateProfit(trade, currentPrice);
        const profitClass = profit > 0 ? "positive" : profit < 0 ? "negative" : "";
        const amountClass = trade.type === "buy" ? "buy" : "sell";

        return `
            <div class="tradeCard" data-idx="${index}">
                <div class="trL">
                    <div style="display:flex;gap:10px;align-items:center;">
                        <div class="trTimer">${trade.closed ? "انتهت" : formatTime(timeLeft)}</div>
                        <div class="trAmt ${amountClass}">$${trade.amount}</div>
                    </div>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <div class="trPair">${trade.pair}</div>
                        <div class="trProfit ${profitClass}">$${profit.toFixed(2)}</div>
                    </div>
                </div>
                ${trade.closed ? `
                    <div class="trDetails" id="trD${index}">
                        <div class="trDRow">
                            <span class="label">سعر الفتح:</span>
                            <span class="value">${trade.openPrice.toFixed(chart.pairData.digits)}</span>
                        </div>
                        <div class="trDRow">
                            <span class="label">سعر الإغلاق:</span>
                            <span class="value">${(trade.closePrice || 0).toFixed(chart.pairData.digits)}</span>
                        </div>
                        <div class="trDRow">
                            <span class="label">وقت الفتح:</span>
                            <span class="value">${formatDateTime(trade.openTime)}</span>
                        </div>
                        <div class="trDRow">
                            <span class="label">وقت الإغلاق:</span>
                            <span class="value">${formatDateTime(trade.closeTime || 0)}</span>
                        </div>
                        <div class="trDRow">
                            <span class="label">النتيجة:</span>
                            <span class="value ${profitClass}">${profit > 0 ? "ربح" : profit < 0 ? "خسارة" : "تعادل"}</span>
                        </div>
                        <div class="trDRow">
                            <span class="label">المبلغ:</span>
                            <span class="value ${profitClass}">$${profit.toFixed(2)}</span>
                        </div>
                        <canvas class="miniChart" id="mC${index}" width="300" height="80"></canvas>
                    </div>
                ` : ""}
            </div>
        `;
    }).join("");

    // رسم الرسوم البيانية الصغيرة للصفقات المغلقة
    activeTrades.forEach((trade, index) => {
        if (trade.closed) {
            const canvas = $("mC" + index);
            if (canvas) {
                const ctx = canvas.getContext("2d");
                const width = 300;
                const height = 80;
                const prices = trade.priceHistory || [];
                
                ctx.clearRect(0, 0, width, height);
                
                if (prices.length > 1) {
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    const range = max - min || 1;
                    
                    ctx.strokeStyle = trade.type === "buy" ? "#00ff88" : "#ff5a4f";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    
                    prices.forEach((price, i) => {
                        const x = i / (prices.length - 1) * width;
                        const y = height - (price - min) / range * height;
                        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    });
                    
                    ctx.stroke();
                }
            }
        }
    });
}

// ===========================
// عرض قائمة المؤشرات
// ===========================
function renderIndicatorsList() {
    const listEl = $("indNamesList");
    const eyeBtn = $("eyeBtn");

    if (state.indicators.length === 0) {
        eyeBtn.style.display = "none";
        listEl.style.display = "none";
        return;
    }

    eyeBtn.style.display = "flex";
    listEl.style.display = showIndicatorNames ? "flex" : "none";
    
    listEl.innerHTML = (state.indicators || []).map((_, i) => 
        `<div class="nmIt" data-idx="${i}">${i + 1}</div>`
    ).join("");

    listEl.querySelectorAll(".nmIt").forEach(el => {
        el.onclick = () => {
            const idx = +el.dataset.idx;
            if (state.indicators[idx]) {
                editingIndicator = state.indicators[idx];
                openIndicatorSettings(editingIndicator);
            }
        };
    });
}

// ===========================
// فئة الشارت الرئيسية
// ===========================
class Chart {
    constructor() {
        this.canvas = $("c");
        this.ctx = this.canvas.getContext("2d");
        this.host = this.canvas.closest(".tc");
        
        // بيانات الشموع
        this.candles = [];
        this.currentCandle = null;
        
        // إعدادات التكبير والتحريك
        this.baseSpacing = 12;
        this.baseCandleWidth = 8;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartScroll = 0;
        this.manualScrollOffset = 0;
        this.targetScrollOffset = 0;
        this.momentum = 0;
        this.lastDragDelta = 0;
        this.lastDragTime = 0;
        
        // إعدادات الوقت
        this.timeframe = 60000; // 1 دقيقة
        this.nextCandleTime = Math.floor(Date.now() / 60000) * 60000;
        
        // إعدادات التكبير
        this.minZoom = 0.5;
        this.maxZoom = 50;
        this.zoom = 1;
        this.targetZoom = 1;
        this.zoomEase = 0.18;
        
        // عناصر الواجهة
        this.priceIndicator = null;
        this.scaleMark = null;
        
        // حالة النظام
        this.isActive = false;
        this.isSwitching = false;
        
        // معاملات التخصيص
        this.candleWidthMultiplier = 1;
        this.priceCompression = 1;
        
        // مؤقتات ومراقبون
        this.tickTimer = null;
        this.loopFrame = null;
        this.liveUnsubscribe = null;
        this.heartbeatInterval = null;
        this.managerCheckInterval = null;
        
        // بيانات الزوج
        this.pair = "EUR/USD";
        this.pairData = { price: 1.0895, seed: 33333, digits: 5 };
        this.currentPrice = this.pairData.price;
        
        // نطاق السعر للعرض
        this.priceRange = { min: 0, max: 0 };
        
        // سحب خط الاتجاه
        this.trendDrag = null;
        
        this.setup();
        this.setupEvents();
    }

    async setPair(pair) {
        const meta = state.pairs.get(pair) || state.pairs.get("EUR/USD");
        this.pair = pair;
        this.pairData = {
            price: meta.price,
            seed: meta.seed,
            digits: meta.digits
        };
        this.currentPrice = this.pairData.price;
        this.priceRange = {
            min: this.pairData.price * 0.95,
            max: this.pairData.price * 1.05
        };
    }

    setup() {
        const dpr = devicePixelRatio || 1;
        const rect = this.host.getBoundingClientRect();
        
        this.width = Math.max(0, rect.width);
        this.height = Math.max(0, rect.height - 24);
        
        this.canvas.width = Math.floor(this.width * dpr);
        this.canvas.height = Math.floor(this.height * dpr);
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        if (!this.priceIndicator) {
            this.priceIndicator = document.createElement("div");
            this.priceIndicator.className = "priceIndicator";
            this.host.appendChild(this.priceIndicator);
        }
        
        if (!this.scaleMark) {
            this.scaleMark = document.createElement("div");
            this.scaleMark.className = "priceScaleMark";
            this.host.appendChild(this.scaleMark);
        }
    }

    async switchPair(pair) {
        if (this.isSwitching) return;
        this.isSwitching = true;
        this.isActive = false;

        // إيقاف جميع المؤقتات والمراقبين
        if (this.tickTimer) {
            clearTimeout(this.tickTimer);
            this.tickTimer = null;
        }
        if (this.loopFrame) {
            cancelAnimationFrame(this.loopFrame);
            this.loopFrame = null;
        }
        if (this.liveUnsubscribe) {
            this.liveUnsubscribe();
            this.liveUnsubscribe = null;
        }
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        if (this.managerCheckInterval) {
            clearInterval(this.managerCheckInterval);
            this.managerCheckInterval = null;
        }

        if (isManager) await clearManager(this.pair);

        $("sk").classList.add("on");

        await this.setPair(pair);
        
        const fbCandles = await loadFromFirebase(pair);
        this.candles = fbCandles && fbCandles.length > 0 ? [...fbCandles] : [];
        this.currentCandle = null;
        this.momentum = 0;
        this.isDragging = false;

        if (this.candles.length > 0) {
            this.nextCandleTime = this.candles[this.candles.length - 1].timestamp + this.timeframe;
            this.currentPrice = this.candles[this.candles.length - 1].close;
        } else {
            this.nextCandleTime = Math.floor(Date.now() / 60000) * 60000;
            this.currentPrice = this.pairData.price;
            await this.initializeCandles(100);
        }

        $("pairHudTxt").textContent = pair;
        updatePairFlags(pair, $("pairFlags"));

        this.priceRange = {
            min: this.pairData.price * 0.95,
            max: this.pairData.price * 1.05
        };

        this.snapToLive();
        this.updatePriceRange();
        this.updatePriceScale();
        this.updateTimeLabels();

        await this.checkManagerRole();
        this.subscribeLive();
        this.startManagerCheck();

        loadTrades();

        this.isSwitching = false;
        this.isActive = true;
        
        this.tick();
        this.loop();

        $("sk").classList.remove("on");
    }

    async checkManagerRole() {
        const key = "live_" + this.pair.replace(/\//g, "_");
        
        try {
            const snapshot = await getDoc(doc(db, "live", key));
            
            if (!snapshot.exists() || !snapshot.data().mID) {
                isManager = true;
                sessionID = sessionStorage.getItem("sessID") || generateUID();
                sessionStorage.setItem("sessID", sessionID);
                
                await setDoc(doc(db, "live", key), {
                    mID: sessionID,
                    t: Date.now()
                }, { merge: true });
                
                $("roleTag").textContent = "🎯 مدير";
                $("roleTag").style.display = "block";
                this.startHeartbeat();
            } else {
                const data = snapshot.data();
                const currentManager = data.mID;
                const lastTime = data.t || 0;
                const now = Date.now();
                
                if (currentManager === sessionID) {
                    isManager = true;
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.startHeartbeat();
                } else if (now - lastTime > 15000) {
                    isManager = true;
                    sessionID = sessionStorage.getItem("sessID") || generateUID();
                    sessionStorage.setItem("sessID", sessionID);
                    
                    await setDoc(doc(db, "live", key), {
                        mID: sessionID,
                        t: Date.now()
                    }, { merge: true });
                    
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.startHeartbeat();
                } else {
                    isManager = false;
                    $("roleTag").textContent = "👁 مشاهد";
                    $("roleTag").style.display = "block";
                }
            }
        } catch (error) {
            isManager = true;
            sessionID = sessionStorage.getItem("sessID") || generateUID();
            sessionStorage.setItem("sessID", sessionID);
            $("roleTag").textContent = "🎯 مدير";
            $("roleTag").style.display = "block";
            this.startHeartbeat();
        }
    }

    startHeartbeat() {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        
        this.heartbeatInterval = setInterval(async () => {
            if (!isManager) return;
            
            const key = "live_" + this.pair.replace(/\//g, "_");
            try {
                await setDoc(doc(db, "live", key), {
                    mID: sessionID,
                    t: Date.now()
                }, { merge: true });
            } catch (error) {
                console.error("❌ خطأ في نبض القلب:", error);
            }
        }, 5000);
    }

    startManagerCheck() {
        if (this.managerCheckInterval) clearInterval(this.managerCheckInterval);
        
        this.managerCheckInterval = setInterval(async () => {
            if (isManager) return;
            
            const key = "live_" + this.pair.replace(/\//g, "_");
            try {
                const snapshot = await getDoc(doc(db, "live", key));
                
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    const currentManager = data.mID;
                    const lastTime = data.t || 0;
                    const now = Date.now();
                    
                    if (!currentManager || now - lastTime > 15000) {
                        isManager = true;
                        sessionID = sessionStorage.getItem("sessID") || generateUID();
                        sessionStorage.setItem("sessID", sessionID);
                        
                        await setDoc(doc(db, "live", key), {
                            mID: sessionID,
                            t: Date.now()
                        }, { merge: true });
                        
                        $("roleTag").textContent = "🎯 مدير";
                        $("roleTag").style.display = "block";
                        this.startHeartbeat();
                    }
                } else {
                    isManager = true;
                    sessionID = sessionStorage.getItem("sessID") || generateUID();
                    sessionStorage.setItem("sessID", sessionID);
                    
                    await setDoc(doc(db, "live", key), {
                        mID: sessionID,
                        t: Date.now()
                    }, { merge: true });
                    
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.startHeartbeat();
                }
            } catch (error) {
                console.error("❌ خطأ في فحص المدير:", error);
            }
        }, 3000);
    }

    subscribeLive() {
        if (this.liveUnsubscribe) this.liveUnsubscribe();
        
        const key = "live_" + this.pair.replace(/\//g, "_");
        
        this.liveUnsubscribe = onSnapshot(doc(db, "live", key), async (snapshot) => {
            if (!snapshot.exists() || !this.isActive) return;
            
            const data = snapshot.data();
            
            if (!isManager && data.cc) {
                this.currentCandle = { ...data.cc };
                this.currentPrice = this.currentCandle.close;
            }
            
            if (data.mID) {
                const currentManager = data.mID;
                const lastTime = data.t || 0;
                const now = Date.now();
                
                if (isManager && currentManager !== sessionID && now - lastTime <= 15000) {
                    isManager = false;
                    $("roleTag").textContent = "👁 مشاهد";
                    $("roleTag").style.display = "block";
                    
                    if (this.heartbeatInterval) {
                        clearInterval(this.heartbeatInterval);
                        this.heartbeatInterval = null;
                    }
                } else if (!isManager && (currentManager === sessionID || now - lastTime > 15000)) {
                    isManager = true;
                    sessionID = sessionStorage.getItem("sessID") || generateUID();
                    sessionStorage.setItem("sessID", sessionID);
                    
                    await setDoc(doc(db, "live", key), {
                        mID: sessionID,
                        t: Date.now()
                    }, { merge: true });
                    
                    $("roleTag").textContent = "🎯 مدير";
                    $("roleTag").style.display = "block";
                    this.startHeartbeat();
                }
            }
        }, { includeMetadataChanges: false });
    }

    tickZoom() {
        const diff = this.targetZoom - this.zoom;
        this.zoom = Math.abs(diff) > 0.0001 ? this.zoom + diff * this.zoomEase : this.targetZoom;
    }

    getSpacing() {
        return this.baseSpacing * this.zoom;
    }

    getCandleWidth() {
        return Math.max(1, this.baseCandleWidth * this.zoom * this.candleWidthMultiplier);
    }

    getMinScrollOffset() {
        return this.width / 2 - this.candles.length * this.getSpacing();
    }

    getMaxScrollOffset() {
        return this.width / 2;
    }

    clampPan() {
        const min = this.getMinScrollOffset();
        const max = this.getMaxScrollOffset();
        this.targetScrollOffset = clamp(this.targetScrollOffset, min, max);
        this.manualScrollOffset = clamp(this.manualScrollOffset, min, max);
    }

    snapToLive() {
        this.targetScrollOffset = this.getMinScrollOffset();
        this.manualScrollOffset = this.targetScrollOffset;
        this.momentum = 0;
        this.clampPan();
    }

    smoothScroll() {
        let diff = this.targetScrollOffset - this.manualScrollOffset;
        
        if (Math.abs(diff) > 0.001) {
            const clampSpeed = this.getSpacing() * 0.45;
            diff = clamp(diff, -clampSpeed, clampSpeed);
            this.manualScrollOffset += diff * 0.35;
        } else {
            this.manualScrollOffset = this.targetScrollOffset;
        }
    }

    applyMomentum() {
        if (Math.abs(this.momentum) > 0.1) {
            this.targetScrollOffset += this.momentum;
            this.momentum *= 0.94;
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

    indexToX(index) {
        return this.getScrollOffset() + index * this.getSpacing();
    }

    xToIndex(x) {
        return (x - this.getScrollOffset()) / this.getSpacing();
    }

    // وظائف توليد الشموع العشوائية
    random(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    randomGaussian(seed) {
        const u1 = this.random(seed);
        const u2 = this.random(seed + 100000);
        return Math.sqrt(-2 * Math.log(u1 + 0.0000000001)) * Math.cos(2 * Math.PI * u2);
    }

    generateCandle(timestamp, openPrice) {
        const seed = this.pairData.seed + Math.floor(timestamp / this.timeframe);
        
        const volatilityBase = 0.0008;
        const trendBase = 0.00005;
        
        const r1 = this.randomGaussian(seed);
        const r2 = this.randomGaussian(seed + 1);
        const r3 = this.randomGaussian(seed + 2);
        const r4 = this.random(seed + 3);
        const r5 = this.random(seed + 4);
        const r6 = this.random(seed + 5);
        
        const volatility = volatilityBase * (0.7 + Math.abs(r1) * 0.8);
        const trend = trendBase * r2 * 0.6;
        const direction = r3 > 0 ? 1 : -1;
        
        const target = openPrice + (direction * volatility + trend);
        const range = volatility * (0.2 + r4 * 0.6);
        const highMove = range * (0.3 + r5 * 0.7);
        const lowMove = range * (0.3 + (1 - r5) * 0.7);
        
        const digits = this.pairData.digits;
        const close = +(target + (r6 - 0.5) * volatility * 0.1).toFixed(digits);
        const open = +openPrice.toFixed(digits);
        
        return {
            open: open,
            close: close,
            high: +Math.max(open, close, open + highMove, close + highMove).toFixed(digits),
            low: +Math.min(open, close, open - lowMove, close - lowMove).toFixed(digits),
            timestamp: timestamp
        };
    }

    getPriceRange() {
        const center = (this.priceRange.min + this.priceRange.max) / 2;
        const halfRange = ((this.priceRange.max - this.priceRange.min) / 2) / (1 * this.priceCompression);
        return {
            min: center - halfRange,
            max: center + halfRange
        };
    }

    priceToY(price) {
        const range = this.getPriceRange();
        const normalized = (price - range.min) / (range.max - range.min);
        return this.height * (1 - normalized);
    }

    yToPrice(y) {
        const range = this.getPriceRange();
        const normalized = 1 - (y / this.height);
        return range.min + normalized * (range.max - range.min);
    }

    updatePriceRange() {
        let visible = [...this.candles];
        
        if (this.currentCandle && (!visible.length || this.currentCandle.timestamp !== visible[visible.length - 1].timestamp)) {
            visible.push(this.currentCandle);
        }
        
        if (!visible.length) {
            this.priceRange = {
                min: this.pairData.price * 0.95,
                max: this.pairData.price * 1.05
            };
            return;
        }
        
        const startIdx = Math.floor(this.xToIndex(0));
        const endIdx = Math.ceil(this.xToIndex(this.width));
        const visibleCandles = visible.slice(Math.max(0, startIdx - 5), Math.min(visible.length, endIdx + 5));
        
        if (!visibleCandles.length) {
            this.priceRange = {
                min: this.pairData.price * 0.95,
                max: this.pairData.price * 1.05
            };
            return;
        }
        
        const lows = visibleCandles.map(c => c.low);
        const highs = visibleCandles.map(c => c.high);
        const min = Math.min(...lows);
        const max = Math.max(...highs);
        const padding = (max - min) * 0.15 || 0.000000001;
        
        this.priceRange = {
            min: min - padding,
            max: max + padding
        };
    }

    gridSteps() {
        const range = this.getPriceRange();
        const priceSpan = range.max - range.min;
        const stepPrice = niceStep(priceSpan / 8);
        
        const timeSpan = this.timeframe * (this.width / this.getSpacing());
        let stepTime = niceStep(timeSpan / 7);
        
        const allowedSteps = [5000, 10000, 15000, 30000, 60000, 120000, 300000, 600000, 900000, 1800000, 3600000, 7200000];
        stepTime = allowedSteps.reduce((a, b) => 
            Math.abs(b - stepTime) < Math.abs(a - stepTime) ? b : a, 
            allowedSteps[0]
        );
        
        return { stepP: stepPrice, stepT: stepTime };
    }

    drawGrid() {
        const range = this.getPriceRange();
        const { stepP, stepT } = this.gridSteps();
        
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        
        let priceStart = Math.floor(range.min / stepP) * stepP;
        for (let p = priceStart; p <= range.max + stepP * 1.001; p += stepP) {
            const y = this.priceToY(p);
            if (y < 0 || y > this.height) continue;
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, y + 0.5);
            this.ctx.lineTo(this.width, y + 0.5);
            this.ctx.stroke();
        }
        
        const startIdx = Math.floor(this.xToIndex(0)) - 2;
        const endIdx = Math.ceil(this.xToIndex(this.width)) + 2;
        const timeStart = this.candles.length ? this.candles[0].timestamp : (this.nextCandleTime - this.timeframe * this.candles.length);
        
        for (let i = startIdx; i <= endIdx; i++) {
            const t = timeStart + i * this.timeframe;
            if (((t - (Math.floor(timeStart / stepT) * stepT)) % stepT) !== 0) continue;
            
            const x = this.indexToX(i);
            if (x < 0 || x > this.width) continue;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x + 0.5, 0);
            this.ctx.lineTo(x + 0.5, this.height);
            this.ctx.stroke();
        }
    }

    updateTimeLabels() {
        const labelsEl = $("timeLabels");
        labelsEl.innerHTML = "";
        
        const { stepT } = this.gridSteps();
        const startIdx = Math.floor(this.xToIndex(0)) - 2;
        const endIdx = Math.ceil(this.xToIndex(this.width)) + 2;
        const timeStart = this.candles.length ? this.candles[0].timestamp : (this.nextCandleTime - this.timeframe * this.candles.length);
        
        for (let i = startIdx; i <= endIdx; i++) {
            const t = timeStart + i * this.timeframe;
            if (((t - (Math.floor(timeStart / stepT) * stepT)) % stepT) !== 0) continue;
            
            const x = this.indexToX(i);
            if (x < 5 || x > this.width - 5) continue;
            
            const d = new Date(t);
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            const ss = String(d.getSeconds()).padStart(2, "0");
            
            const label = document.createElement("div");
            label.className = "timeLabel";
            label.style.left = x + "px";
            label.textContent = (stepT < 60000 ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`);
            labelsEl.appendChild(label);
        }
    }

    updatePriceScale() {
        const containerEl = $("ps");
        containerEl.innerHTML = "";
        
        const range = this.getPriceRange();
        const { stepP } = this.gridSteps();
        
        let priceStart = Math.floor(range.min / stepP) * stepP;
        let count = 0;
        
        for (let p = priceStart; p <= range.max + stepP * 1.001; p += stepP) {
            const y = this.priceToY(p);
            if (y < 0 || y > this.height) continue;
            
            const label = document.createElement("div");
            label.className = "pl";
            label.style.top = y + "px";
            label.textContent = (+p).toFixed(this.pairData.digits);
            containerEl.appendChild(label);
            
            if (++count > 20) break;
        }
    }

    updatePriceIndicator() {
        if (!this.currentCandle || !this.priceIndicator) return;
        
        const currentPrice = this.currentCandle.close;
        const y = this.priceToY(currentPrice);
        
        this.priceIndicator.textContent = currentPrice.toFixed(this.pairData.digits);
        this.priceIndicator.style.top = y + "px";
        this.priceIndicator.style.display = "block";
        
        if (this.scaleMark) {
            this.scaleMark.style.top = y + "px";
            this.scaleMark.style.display = "block";
        }
    }

    drawCurrentPriceLine() {
        if (!this.currentCandle) return;
        
        const y = this.priceToY(this.currentCandle.close);
        
        this.ctx.strokeStyle = "rgba(255, 215, 0, 0.35)";
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([6, 6]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, y + 0.5);
        this.ctx.lineTo(this.width, y + 0.5);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    updateCandleTimer() {
        const now = Date.now();
        const elapsed = now - this.nextCandleTime;
        const timeLeft = Math.max(0, Math.ceil((this.timeframe - elapsed) / 1000));
        
        const timerEl = $("candleTimer");
        timerEl.textContent = String(timeLeft);
        
        if (this.currentCandle) {
            const x = this.indexToX(this.candles.length);
            const y = this.priceToY(this.currentCandle.close);
            
            if (x >= -60 && x <= this.width + 60) {
                timerEl.style.left = Math.max(10, Math.min(this.width - 60, x + 25)) + "px";
                timerEl.style.top = Math.max(10, Math.min(this.height - 30, y - 15)) + "px";
                timerEl.style.display = "block";
            } else {
                timerEl.style.display = "none";
            }
        } else {
            timerEl.style.display = "none";
        }
    }

    drawTradeMarkersCanvas() {
        if (!this.currentCandle) return;
        
        const now = Date.now();
        
        for (const trade of state.trades) {
            if (trade.closed) continue;
            if (trade.pair !== this.pair) continue;
            if (trade.candleIndex !== this.candles.length) continue;
            
            const x = this.indexToX(this.candles.length);
            const y = this.priceToY(trade.openPrice);
            const color = trade.type === "buy" ? "#00ff88" : "#ff5a4f";
            
            this.ctx.save();
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color;
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.globalAlpha = 0.7;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - 60, y);
            this.ctx.stroke();
            
            this.ctx.globalAlpha = 1;
            this.ctx.font = "900 12px system-ui";
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "middle";
            
            const timeLeft = Math.max(0, trade.openTime + trade.duration - now);
            this.ctx.fillText((trade.type === "buy" ? "▲ " : "▼ ") + ("$" + trade.amount), x - 66, y - 10);
            
            this.ctx.globalAlpha = 0.7;
            this.ctx.font = "900 11px system-ui";
            this.ctx.fillText(formatTime(timeLeft), x - 66, y + 10);
            
            this.ctx.restore();
        }
    }

    async initializeCandles(count = 100) {
        const lastClose = this.candles.length > 0 ? this.candles[this.candles.length - 1].close : this.pairData.price;
        const start = this.candles.length > 0 ? this.candles[this.candles.length - 1].timestamp + this.timeframe : this.nextCandleTime - this.timeframe * count;
        
        let basePrice = lastClose;
        
        for (let i = 0; i < count; i++) {
            const t = start + i * this.timeframe;
            const candle = this.generateCandle(t, basePrice);
            this.candles.push(candle);
            basePrice = candle.close;
        }
        
        this.currentPrice = basePrice;
        await saveToFirebase(this.pair, this.candles);
        showStatus("✅ تم توليد " + count + " شمعة");
    }

    stepTowards(current, target, maxStep) {
        const diff = target - current;
        return Math.abs(diff) <= maxStep ? target : current + Math.sign(diff) * maxStep;
    }

    updateCurrentCandle() {
        if (!isManager) return;
        
        if (!this.currentCandle) {
            const lastPrice = this.candles.length ? this.candles[this.candles.length - 1].close : this.currentPrice;
            this.currentCandle = this.generateCandle(this.nextCandleTime, lastPrice);
            this.currentCandle.close = lastPrice;
            this.currentCandle.high = Math.max(this.currentCandle.open, this.currentCandle.close);
            this.currentCandle.low = Math.min(this.currentCandle.open, this.currentCandle.close);
            return;
        }
        
        const now = Date.now();
        const seed = this.pairData.seed + now;
        const r = this.random(seed);
        const drift = (r - 0.5) * 0.0004;
        
        const target = this.currentCandle.close + drift;
        const maxStep = 0.0008 * 0.18;
        const newClose = +this.stepTowards(this.currentCandle.close, target, maxStep).toFixed(this.pairData.digits);
        
        this.currentCandle.close = newClose;
        this.currentCandle.high = +Math.max(this.currentCandle.high, newClose).toFixed(this.pairData.digits);
        this.currentCandle.low = +Math.min(this.currentCandle.low, newClose).toFixed(this.pairData.digits);
        
        this.currentPrice = newClose;
        
        saveLiveCandle(this.pair, this.currentCandle);
        this.updateTrades();
    }

    updateTrades() {
        if (!this.currentCandle) return;
        
        const now = Date.now();
        const currentPrice = this.currentCandle.close;
        
        state.trades.forEach(trade => {
            if (trade.closed) return;
            if (trade.pair !== this.pair) return;
            
            if (!trade.priceHistory) trade.priceHistory = [];
            trade.priceHistory.push(currentPrice);
            
            const elapsed = now - trade.openTime;
            if (elapsed >= trade.duration) {
                const profit = calculateProfit(trade, currentPrice);
                trade.profit = profit;
                trade.closePrice = currentPrice;
                trade.closeTime = now;
                trade.closed = true;
                
                balance += profit;
                saveTrades();
            } else {
                trade.profit = calculateProfit(trade, currentPrice);
            }
        });
        
        renderTradesPanel();
    }

    async tick() {
        if (!this.isActive) return;
        
        const now = Date.now();
        const elapsed = now - this.nextCandleTime;
        
        if (elapsed >= this.timeframe) {
            if (isManager && this.currentCandle) {
                if (!this.candles.length || this.candles[this.candles.length - 1].timestamp !== this.currentCandle.timestamp) {
                    this.candles.push({ ...this.currentCandle });
                    await saveToFirebase(this.pair, this.candles);
                }
            }
            
            this.nextCandleTime = Math.floor(now / this.timeframe) * this.timeframe;
            
            const lastPrice = this.currentCandle ? this.currentCandle.close : this.currentPrice;
            this.currentCandle = this.generateCandle(this.nextCandleTime, lastPrice);
            this.currentCandle.open = lastPrice;
            this.currentCandle.close = lastPrice;
            this.currentCandle.high = lastPrice;
            this.currentCandle.low = lastPrice;
            this.currentPrice = lastPrice;
        } else if (isManager) {
            this.updateCurrentCandle();
        }
        
        this.updatePriceRange();
        this.updatePriceScale();
        this.updateTimeLabels();
        this.updateCandleTimer();
        this.updatePriceIndicator();
        
        this.tickTimer = setTimeout(() => this.tick(), 200);
    }

    drawCandle(candle, x, isLive) {
        const open = this.priceToY(candle.open);
        const close = this.priceToY(candle.close);
        const high = this.priceToY(candle.high);
        const low = this.priceToY(candle.low);
        
        const bullish = candle.close >= candle.open;
        const color = bullish 
            ? getComputedStyle(document.documentElement).getPropertyValue("--gg") 
            : "#d32f2f";
        
        const width = this.getCandleWidth();
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = Math.max(1, width * 0.18);
        this.ctx.beginPath();
        this.ctx.moveTo(x, high);
        this.ctx.lineTo(x, low);
        this.ctx.stroke();
        
        const bodyHeight = Math.max(1, Math.abs(close - open));
        const bodyTop = Math.min(open, close);
        
        this.ctx.fillStyle = color;
        
        if (isLive) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 7;
        }
        
        this.ctx.fillRect(x - width / 2, bodyTop, width, bodyHeight);
        
        if (isLive) this.ctx.shadowBlur = 0;
    }

    drawIndicators() {
        for (const indicator of state.indicators) {
            if (indicator.type === "bb") {
                this.drawBollingerBands(indicator);
            } else if (indicator.type === "tl") {
                this.drawTrendline(indicator);
            }
        }
    }

    drawHandle(x, y, color = "#ffd700") {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawBollingerBands(indicator) {
        if (this.candles.length < (indicator.period || 20)) return;
        
        const period = indicator.period || 20;
        const stdDev = indicator.std || 2;
        
        let sma = [];
        let upper = [];
        let lower = [];
        
        for (let i = period - 1; i < this.candles.length; i++) {
            let sum = 0;
            for (let j = 0; j < period; j++) {
                sum += this.candles[i - j].close;
            }
            const avg = sum / period;
            
            let variance = 0;
            for (let j = 0; j < period; j++) {
                const diff = this.candles[i - j].close - avg;
                variance += diff * diff;
            }
            const std = Math.sqrt(variance / period);
            
            sma.push(avg);
            upper.push(avg + stdDev * std);
            lower.push(avg - stdDev * std);
        }
        
        this.ctx.strokeStyle = indicator.color || "#ffff00";
        this.ctx.lineWidth = indicator.width || 2;
        
        this.ctx.beginPath();
        for (let i = 0; i < sma.length; i++) {
            const x = this.indexToX(i + period - 1);
            const y = this.priceToY(sma[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        this.ctx.strokeStyle = indicator.color || "#ffff00";
        this.ctx.globalAlpha = 0.5;
        
        this.ctx.beginPath();
        for (let i = 0; i < upper.length; i++) {
            const x = this.indexToX(i + period - 1);
            const y = this.priceToY(upper[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        this.ctx.beginPath();
        for (let i = 0; i < lower.length; i++) {
            const x = this.indexToX(i + period - 1);
            const y = this.priceToY(lower[i]);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        this.ctx.globalAlpha = 1;
    }

    drawTrendline(indicator) {
        if (!indicator.x1 || !indicator.y1 || !indicator.x2 || !indicator.y2) return;
        
        this.ctx.strokeStyle = indicator.color || "#ffff00";
        this.ctx.lineWidth = indicator.width || 2;
        this.ctx.beginPath();
        this.ctx.moveTo(indicator.x1, indicator.y1);
        this.ctx.lineTo(indicator.x2, indicator.y2);
        this.ctx.stroke();
        
        const midX = (indicator.x1 + indicator.x2) / 2;
        const midY = (indicator.y1 + indicator.y2) / 2;
        
        this.drawHandle(midX, midY, "#ffd700");
        this.drawHandle(indicator.x1, indicator.y1, "#ffd700");
        this.drawHandle(indicator.x2, indicator.y2, "#ffd700");
    }

    draw() {
        this.tickZoom();
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawGrid();
        
        for (let i = 0; i < this.candles.length; i++) {
            const x = this.indexToX(i);
            if (x < -60 || x > this.width + 60) continue;
            this.drawCandle(this.candles[i], x, false);
        }
        
        if (this.currentCandle && (!this.candles.length || this.currentCandle.timestamp !== this.candles[this.candles.length - 1].timestamp)) {
            const liveX = this.indexToX(this.candles.length);
            if (liveX >= -60 && liveX <= this.width + 60) {
                this.drawCandle(this.currentCandle, liveX, true);
            }
        }
        
        this.drawCurrentPriceLine();
        this.drawIndicators();
        this.drawTradeMarkersCanvas();
    }

    loop() {
        if (!this.isActive) return;
        
        this.draw();
        this.loopFrame = requestAnimationFrame(() => this.loop());
    }

    applyZoomAround(mouseX, mouseY, scale) {
        const oldZoom = this.targetZoom;
        const newZoom = clamp(oldZoom * scale, this.minZoom, this.maxZoom);
        
        if (Math.abs(newZoom - oldZoom) < 0.000001) return;
        
        const indexAtMouse = this.xToIndex(mouseX);
        this.targetZoom = newZoom;
        this.zoom = newZoom;
        
        const newX = mouseX - indexAtMouse * this.getSpacing();
        this.targetScrollOffset = newX;
        this.manualScrollOffset = newX;
        this.clampPan();
    }

    hitHandle(x, y, handleX, handleY, radius = 18) {
        return Math.hypot(x - handleX, y - handleY) <= radius;
    }

    hitTrendDot(x, y) {
        for (const indicator of state.indicators) {
            if (indicator.type === "tl") {
                const midX = (indicator.x1 + indicator.x2) / 2;
                const midY = (indicator.y1 + indicator.y2) / 2;
                
                if (this.hitHandle(x, y, midX, midY, 18)) {
                    return { ind: indicator, pt: "mid" };
                }
                if (this.hitHandle(x, y, indicator.x1, indicator.y1, 18)) {
                    return { ind: indicator, pt: "p1" };
                }
                if (this.hitHandle(x, y, indicator.x2, indicator.y2, 18)) {
                    return { ind: indicator, pt: "p2" };
                }
            }
        }
        return null;
    }

    moveTrendDot(x, y) {
        const { ind, pt } = this.trendDrag;
        
        if (pt === "mid") {
            const midX = (ind.x1 + ind.x2) / 2;
            const midY = (ind.y1 + ind.y2) / 2;
            const dx = x - midX;
            const dy = y - midY;
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

    setupEvents() {
        addEventListener("resize", () => this.setup());
        
        this.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const scale = e.deltaY > 0 ? 1 / 1.10 : 1.10;
            this.applyZoomAround(mouseX, mouseY, scale);
        }, { passive: false });
        
        const pointerDown = (x, y, time) => {
            const hit = this.hitTrendDot(x, y);
            if (hit) {
                this.trendDrag = hit;
                return;
            }
            
            this.isDragging = true;
            this.dragStartX = x;
            this.dragStartScroll = this.targetScrollOffset;
            this.momentum = 0;
            this.lastDragDelta = 0;
            this.lastDragTime = time;
            this.lastMoveX = x;
        };
        
        const pointerMove = (x, y, time) => {
            if (this.trendDrag) {
                this.moveTrendDot(x, y);
                return;
            }
            
            if (this.isDragging) {
                const delta = x - this.dragStartX;
                this.targetScrollOffset = this.dragStartScroll + delta;
                this.clampPan();
                
                const deltaTime = time - this.lastDragTime;
                if (deltaTime > 0 && deltaTime < 100) {
                    this.lastDragDelta = (x - (this.lastMoveX || x)) / deltaTime * 16;
                }
                this.lastMoveX = x;
                this.lastDragTime = time;
            }
        };
        
        const pointerUp = () => {
            this.trendDrag = null;
            if (this.isDragging && Math.abs(this.lastDragDelta) > 1) {
                this.momentum = this.lastDragDelta;
            }
            this.isDragging = false;
        };
        
        this.canvas.addEventListener("mousedown", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            pointerDown(e.clientX - rect.left, e.clientY - rect.top, Date.now());
        });
        
        addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            pointerMove(e.clientX - rect.left, e.clientY - rect.top, Date.now());
        });
        
        addEventListener("mouseup", pointerUp);
        
        const distance = (a, b) => Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        
        this.canvas.addEventListener("touchstart", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                pointerDown(touch.clientX - rect.left, touch.clientY - rect.top, Date.now());
            } else if (e.touches.length === 2) {
                this.isDragging = false;
                this.isPinching = true;
                this.pinchStart = distance(e.touches[0], e.touches[1]);
                this.pinchMidX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
                this.pinchMidY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
            }
        }, { passive: false });
        
        this.canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            
            if (this.isPinching && e.touches.length === 2) {
                const dist = distance(e.touches[0], e.touches[1]);
                if (this.pinchStart > 0) {
                    const scale = clamp(dist / (this.pinchStart || dist), 0.2, 5);
                    this.applyZoomAround(this.pinchMidX, this.pinchMidY, scale);
                }
                this.pinchStart = dist;
            } else if (!this.isPinching && e.touches.length === 1) {
                const touch = e.touches[0];
                pointerMove(touch.clientX - rect.left, touch.clientY - rect.top, Date.now());
            }
        }, { passive: false });
        
        this.canvas.addEventListener("touchend", (e) => {
            if (e.touches.length < 2) {
                this.isPinching = false;
                this.pinchStart = 0;
            }
            if (e.touches.length === 0) {
                pointerUp();
            }
        }, { passive: false });
        
        this.canvas.addEventListener("touchcancel", () => {
            this.isPinching = false;
            this.pinchStart = 0;
            pointerUp();
        }, { passive: false });
    }

    async boot() {
        $("sk").classList.add("on");
        
        sessionID = sessionStorage.getItem("sessID") || generateUID();
        sessionStorage.setItem("sessID", sessionID);
        
        await this.setPair("EUR/USD");
        
        const fbCandles = await loadFromFirebase("EUR/USD");
        this.candles = fbCandles.length > 0 ? [...fbCandles] : [];
        
        if (this.candles.length > 0) {
            this.nextCandleTime = this.candles[this.candles.length - 1].timestamp + this.timeframe;
            this.currentPrice = this.candles[this.candles.length - 1].close;
        } else {
            this.initializeCandles(100);
        }
        
        this.snapToLive();
        this.updatePriceRange();
        
        await this.checkManagerRole();
        this.subscribeLive();
        this.startManagerCheck();
        
        loadTrades();
        
        this.isActive = true;
        this.tick();
        this.loop();
        
        $("sk").classList.remove("on");
        
        window.addEventListener("beforeunload", async () => {
            if (isManager) await clearManager(this.pair);
        });
    }
}

// ===========================
// تهيئة التطبيق
// ===========================
const chart = new Chart();
window.chart = chart;

await chart.boot();

// ===========================
// تحديث التاريخ والوقت
// ===========================
const datetimeEl = $("datetime");
const updateDateTime = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    datetimeEl.textContent = `${h}:${m}:${s}`;
};

setInterval(updateDateTime, 1000);
updateDateTime();

// ===========================
// منتقي الوقت
// ===========================
const timeInput = $("timeInput");
const timePickerPopup = $("timePickerPopup");
const manualBtn = $("manualBtn");
let isManualMode = false;

timeInput.onclick = (e) => {
    if (isManualMode) return;
    e.stopPropagation();
    timePickerPopup.classList.toggle("show");
};

document.addEventListener("click", (e) => {
    if (!e.target.closest("#timeWrapper")) {
        timePickerPopup.classList.remove("show");
    }
});

document.querySelectorAll(".timeBtn").forEach(btn => {
    btn.onclick = (e) => {
        e.stopPropagation();
        timeInput.value = btn.getAttribute("data-time");
        timePickerPopup.classList.remove("show");
    };
});

manualBtn.onclick = (e) => {
    e.stopPropagation();
    isManualMode = !isManualMode;
    
    if (isManualMode) {
        timePickerPopup.classList.remove("show");
        timeInput.readOnly = false;
        timeInput.focus();
        timeInput.select();
    } else {
        timeInput.readOnly = true;
    }
};

timeInput.onblur = () => {
    if (isManualMode) {
        const value = timeInput.value;
        if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) {
            timeInput.value = "00:01:00";
        }
        isManualMode = false;
        timeInput.readOnly = true;
    }
};

// ===========================
// إدارة المبلغ
// ===========================
let tradeAmount = 1;
const amountInput = $("amountInput");

const updateAmount = () => {
    let str = String(amountInput.value).replace(/,|\$|\s/g, "").trim();
    if (!str) {
        tradeAmount = 1;
        amountInput.value = "$ 1";
        return;
    }
    
    let value = parseFloat(str);
    if (!isFinite(value)) value = 1;
    value = Math.max(1, Math.min(999999, value));
    
    tradeAmount = value;
    amountInput.value = "$ " + value;
};

$("plus").onclick = () => {
    tradeAmount++;
    amountInput.value = "$ " + tradeAmount;
};

$("minus").onclick = () => {
    tradeAmount = Math.max(1, tradeAmount - 1);
    amountInput.value = "$ " + tradeAmount;
};

amountInput.oninput = updateAmount;
amountInput.onblur = updateAmount;
updateAmount();

// ===========================
// فتح صفقة
// ===========================
const openTrade = async (type) => {
    if (!chart.currentCandle) return;
    
    const duration = parseDuration(timeInput.value);
    const openPrice = +chart.currentCandle.close;
    const candleIndex = chart.candles.length;
    
    const trade = {
        id: generateUID(),
        type: type,
        amount: tradeAmount,
        openPrice: openPrice,
        openTime: Date.now(),
        duration: duration,
        candleIndex: candleIndex,
        pair: chart.pair,
        profit: 0,
        closed: false,
        priceHistory: [openPrice]
    };
    
    state.trades.push(trade);
    saveTrades();
    renderTradesPanel();
};

$("buy").onclick = () => openTrade("buy");
$("sell").onclick = () => openTrade("sell");

// ===========================
// لوحة الصفقات
// ===========================
$("indBtn1").onclick = () => {
    $("tradesPanel").classList.toggle("open");
    renderTradesPanel();
};

$("closeTrPanel").onclick = () => {
    $("tradesPanel").classList.remove("open");
};

$("tradesContent").onclick = (e) => {
    const card = e.target.closest(".tradeCard");
    if (!card) return;
    
    const idx = +card.dataset.idx;
    const details = $("trD" + idx);
    
    if (details) {
        details.classList.toggle("open");
    }
};

// ===========================
// لوحة المؤشرات
// ===========================
$("indBtn2").onclick = () => {
    $("indicatorsPanel").classList.toggle("show");
};

$("closeIndBtn").onclick = () => {
    $("indicatorsPanel").classList.remove("show");
};

$("eyeBtn").onclick = () => {
    showIndicatorNames = !showIndicatorNames;
    renderIndicatorsList();
};

// ===========================
// وقت المنصة
// ===========================
const platformTimeEl = $("platTime");
const updatePlatformTime = () => {
    const d = new Date(Date.now() + 3 * 3600000);
    platformTimeEl.textContent = `UTC+3 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};

setInterval(updatePlatformTime, 250);
updatePlatformTime();

// ===========================
// تهيئة الأزواج
// ===========================
updatePairFlags("EUR/USD", $("pairFlags"));
renderPairsList();
renderTradesPanel();

// ===========================
// لوحة الأزواج
// ===========================
$("pairHud").onclick = (e) => {
    e.stopPropagation();
    $("pairPanel").classList.toggle("on");
    renderPairsList();
};

$("pairClose").onclick = () => {
    $("pairPanel").classList.remove("on");
};

$("pairList").onclick = async (e) => {
    const btn = e.target.closest("button.pit");
    if (!btn) return;
    
    const pair = btn.getAttribute("data-p");
    
    if (e.target && e.target.getAttribute && e.target.getAttribute("data-s")) {
        state.favorites.has(pair) ? state.favorites.delete(pair) : state.favorites.add(pair);
        renderPairsList();
        return;
    }
    
    $("pairPanel").classList.remove("on");
    await chart.switchPair(pair);
};

document.addEventListener("click", (e) => {
    if ($("pairPanel").classList.contains("on") && 
        !e.target.closest("#pairPanel") && 
        !e.target.closest("#pairHud")) {
        $("pairPanel").classList.remove("on");
    }
});

// ===========================
// أسماء المؤشرات
// ===========================
const indicatorNames = {
    bb: "Bollinger Bands",
    tl: "Trendline"
};

// ===========================
// عرض شريط المؤشرات
// ===========================
function renderIndicatorsBar() {
    const barEl = $("indBar");
    
    barEl.innerHTML = (state.indicators || []).map((ind, i) => 
        `<div class="indBadge">
            <span class="name" data-i="${i}">${indicatorNames[ind.type] || ind.type}</span>
            <button data-rm="${i}">×</button>
        </div>`
    ).join("");
    
    barEl.querySelectorAll("[data-rm]").forEach(btn => {
        btn.onclick = () => {
            state.indicators.splice(+btn.dataset.rm, 1);
            renderIndicatorsBar();
            renderIndicatorsList();
        };
    });
    
    barEl.querySelectorAll("[data-i]").forEach(span => {
        span.onclick = () => {
            editingIndicator = state.indicators[+span.dataset.i];
            openIndicatorSettings(editingIndicator);
        };
    });
    
    barEl.style.display = state.indicators && state.indicators.length ? "flex" : "none";
    renderIndicatorsList();
}

// ===========================
// إعدادات المؤشر
// ===========================
let editingIndicator = null;

function openIndicatorSettings(indicator) {
    $("indSetTitle").textContent = indicatorNames[indicator.type] || indicator.type;
    $("indColor").value = indicator.color || "#ffff00";
    $("indWidth").value = indicator.width || 2;
    
    const periodRow = $("periodRow");
    const stdRow = $("stdRow");
    
    periodRow.style.display = "none";
    stdRow.style.display = "none";
    
    if (indicator.type === "bb") {
        periodRow.style.display = "flex";
        stdRow.style.display = "flex";
        $("indPeriod").value = indicator.period || 20;
        $("indStd").value = indicator.std || 2;
    }
    
    $("indSet").classList.add("show");
}

$("indSetClose").onclick = () => {
    $("indSet").classList.remove("show");
};

$("indRemove").onclick = () => {
    if (!editingIndicator) return;
    
    const idx = state.indicators.indexOf(editingIndicator);
    if (idx >= 0) {
        state.indicators.splice(idx, 1);
        renderIndicatorsBar();
        renderIndicatorsList();
    }
    
    $("indSet").classList.remove("show");
    editingIndicator = null;
};

$("indColor").oninput = () => {
    if (editingIndicator) {
        editingIndicator.color = $("indColor").value;
    }
};

$("indWidth").oninput = () => {
    if (editingIndicator) {
        editingIndicator.width = +$("indWidth").value;
    }
};

$("indPeriod").oninput = () => {
    if (editingIndicator) {
        editingIndicator.period = +$("indPeriod").value;
    }
};

$("indStd").oninput = () => {
    if (editingIndicator) {
        editingIndicator.std = +$("indStd").value;
    }
};

// ===========================
// إضافة مؤشرات جديدة
// ===========================
$("indicatorsPanel").onclick = (e) => {
    const item = e.target.closest(".indItem");
    if (!item) return;
    
    const type = item.dataset.ind;
    
    if (type === "bb") {
        state.indicators.push({
            id: generateUID(),
            type: "bb",
            color: "#ffff00",
            width: 2,
            period: 20,
            std: 2
        });
        renderIndicatorsBar();
        $("indicatorsPanel").classList.remove("show");
    } else if (type === "tl") {
        const x1 = chart.width * 0.3;
        const y1 = chart.height * 0.3;
        const x2 = chart.width * 0.7;
        const y2 = chart.height * 0.7;
        
        state.indicators.push({
            id: generateUID(),
            type: "tl",
            color: "#ffff00",
            width: 2,
            x1, y1, x2, y2
        });
        renderIndicatorsBar();
        $("indicatorsPanel").classList.remove("show");
    }
};

renderIndicatorsBar();
renderIndicatorsList();
