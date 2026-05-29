import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",
  authDomain: "hhhxh-5ebe4.firebaseapp.com",
  projectId: "hhhxh-5ebe4",
  storageBucket: "hhhxh-5ebe4.firebasestorage.app",
  messagingSenderId: "79243000696",
  appId: "1:79243000696:web:ee0fb2d2ccce791954e68d",
  measurementId: "G-08BR6LN6PT"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

analyticsIsSupported()
  .then((supported) => {
    if (supported) getAnalytics(app);
  })
  .catch(() => {});

const state = {
  user: null,
  balance: 0,
  authReady: false,
  authBound: false
};

function formatBalance(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "0$";
  return `${n.toFixed(2).replace(/\.00$/, "")}$`;
}

function setStatus(root, message = "", type = "info") {
  const box = root.querySelector("#wd-status");
  if (!box) return;

  if (!message) {
    box.className = "st";
    box.textContent = "";
    return;
  }

  box.className = `st show ${type}`;
  box.textContent = message;
}

function setLoading(root, loading) {
  const btn = root.querySelector("#wd-submit");
  if (!btn) return;

  btn.disabled = loading;
  btn.textContent = loading ? "جارٍ إرسال الطلب..." : "تقديم طلب السحب";
}

function updateBalanceUI(root, balance) {
  const el = root.querySelector("#wd-balance");
  if (el) el.textContent = formatBalance(balance);
}

function getSelectedMethod(root) {
  const selected = root.querySelector(".op.s");
  if (!selected) {
    return {
      code: "USDT_TRC20",
      label: "Tether (USDT/TRC20)"
    };
  }

  return {
    code: selected.dataset.code || "USDT_TRC20",
    label: selected.dataset.label || "Tether (USDT/TRC20)"
  };
}

async function loadUserBalance(root, uid) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      state.balance = 0;
      updateBalanceUI(root, 0);
      setStatus(root, "تعذر العثور على بيانات المستخدم.", "error");
      return;
    }

    const userData = userSnap.data() || {};
    const balance = Number(userData.balance || 0);

    state.balance = Number.isFinite(balance) ? balance : 0;
    updateBalanceUI(root, state.balance);
    setStatus(root, "");
  } catch (error) {
    console.error("Load balance error:", error);
    setStatus(root, "حدث خطأ أثناء تحميل الرصيد.", "error");
  }
}

async function submitWithdrawal(root) {
  const user = state.user;
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  const amountInput = root.querySelector("#wd-amount");
  const walletInput = root.querySelector("#wd-wallet");
  const termsInput = root.querySelector("#wd-terms");

  const amount = Number((amountInput?.value || "").trim());
  const walletAddress = (walletInput?.value || "").trim();
  const acceptedTerms = !!termsInput?.checked;
  const method = getSelectedMethod(root);

  if (!amount || !Number.isFinite(amount) || amount <= 0) {
    setStatus(root, "من فضلك أدخل مبلغ سحب صحيح.", "error");
    return;
  }

  if (!walletAddress) {
    setStatus(root, "من فضلك أدخل معرف المحفظة.", "error");
    return;
  }

  if (!acceptedTerms) {
    setStatus(root, "يجب الموافقة على الأحكام والشروط أولاً.", "error");
    return;
  }

  setLoading(root, true);
  setStatus(root, "جارٍ معالجة طلب السحب...", "info");

  try {
    const userRef = doc(db, "users", user.uid);
    const withdrawalDocRef = doc(collection(db, "withdrawals"));
    const userWithdrawalRef = doc(db, "users", user.uid, "withdrawals", withdrawalDocRef.id);

    let newBalance = 0;
    let oldBalance = 0;

    await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists()) {
        throw new Error("USER_NOT_FOUND");
      }

      const userData = userSnap.data() || {};
      oldBalance = Number(userData.balance || 0);

      if (!Number.isFinite(oldBalance)) {
        throw new Error("INVALID_BALANCE");
      }

      if (amount > oldBalance) {
        throw new Error("INSUFFICIENT_BALANCE");
      }

      newBalance = Number((oldBalance - amount).toFixed(2));

      const withdrawalPayload = {
        withdrawalId: withdrawalDocRef.id,
        userId: user.uid,
        email: user.email || "",
        amount: Number(amount.toFixed(2)),
        currency: "USD",
        asset: "USDT",
        networkCode: method.code,
        networkLabel: method.label,
        walletAddress,
        status: "pending",
        balanceBefore: Number(oldBalance.toFixed(2)),
        balanceAfter: Number(newBalance.toFixed(2)),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      transaction.update(userRef, {
        balance: newBalance,
        updatedAt: serverTimestamp()
      });

      transaction.set(withdrawalDocRef, withdrawalPayload);
      transaction.set(userWithdrawalRef, withdrawalPayload);
    });

    state.balance = newBalance;
    updateBalanceUI(root, newBalance);

    if (amountInput) amountInput.value = "";
    if (walletInput) walletInput.value = "";
    if (termsInput) termsInput.checked = false;

    setStatus(root, "تم إرسال طلب السحب بنجاح وهو الآن قيد المراجعة.", "success");
  } catch (error) {
    console.error("Withdrawal error:", error);

    if (error.message === "USER_NOT_FOUND") {
      setStatus(root, "بيانات المستخدم غير موجودة.", "error");
    } else if (error.message === "INSUFFICIENT_BALANCE") {
      setStatus(root, "الرصيد غير كافٍ لإتمام عملية السحب.", "error");
    } else if (error.message === "INVALID_BALANCE") {
      setStatus(root, "قيمة الرصيد الحالية غير صالحة.", "error");
    } else {
      setStatus(root, "حدث خطأ أثناء إرسال طلب السحب، حاول مرة أخرى.", "error");
    }
  } finally {
    setLoading(root, false);
  }
}

function bindDropdownUI() {
  if (window._wdx2) return;
  window._wdx2 = 1;

  document.addEventListener("click", (e) => {
    const selectView = e.target.closest(".sv");
    const option = e.target.closest(".op");
    const selectBox = e.target.closest(".sl");

    document.querySelectorAll(".sl.o").forEach((x) => {
      if (x !== selectBox) x.classList.remove("o");
    });

    if (selectView) {
      selectView.parentNode.classList.toggle("o");
      return;
    }

    if (option) {
      const optionsWrap = option.parentNode;
      const view = optionsWrap.previousElementSibling.querySelector(".v");

      optionsWrap.querySelectorAll(".op").forEach((x) => x.classList.remove("s"));
      option.classList.add("s");
      view.innerHTML = option.innerHTML;
      option.closest(".sl").classList.remove("o");
      return;
    }

    if (!e.target.closest(".sl")) {
      document.querySelectorAll(".sl.o").forEach((x) => x.classList.remove("o"));
    }
  });
}

function bindSubmit(root) {
  const btn = root.querySelector("#wd-submit");
  if (!btn || btn.dataset.bound === "1") return;

  btn.dataset.bound = "1";
  btn.addEventListener("click", () => submitWithdrawal(root));
}

function bindAuth(root) {
  if (state.authBound) return;
  state.authBound = true;

  onAuthStateChanged(auth, async (user) => {
    state.authReady = true;

    if (!user) {
      window.location.replace("login.html");
      return;
    }

    state.user = user;
    await loadUserBalance(root, user.uid);
  });
}

function initWithdrawalPage() {
  const root = document.querySelector(".wd");
  if (!root || root.dataset.ready === "1") return;

  root.dataset.ready = "1";

  bindDropdownUI();
  bindSubmit(root);
  bindAuth(root);

  updateBalanceUI(root, 0);
}

window.P = window.P || {};

window.P.withdrawal = {
  t: "ينسحب",
  s: "withdrawal.js",
  h: `
<style>
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#000;font-family:Tajawal,Cairo,system-ui,sans-serif}
body{color:#fff}
.wd{width:100%;min-height:100vh;padding:14px 14px 18px;background:#000;direction:rtl}
.c1,.c2{background:#000;border:1px solid #252c38;border-radius:18px}
.c1{height:94px;padding:18px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.c1 .r{font-size:15px;color:#aab3c7}
.c1 .l{font-size:23px;font-weight:800}
.c2{padding:18px 14px 14px}
.lb{font-size:15px;color:#b6bfd3;margin:0 0 10px}
.sl{position:relative}
.sv{height:56px;border:1px solid #2a3244;background:#000;border-radius:12px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;cursor:pointer;user-select:none}
.sv .a{width:18px;text-align:center;color:#8f99af;transition:.2s}
.sl.o .sv{border-color:#4a5dff;box-shadow:0 0 0 1px #4a5dff inset}
.sl.o .sv .a{transform:rotate(180deg)}
.v,.op{display:flex;align-items:center;gap:10px;min-width:0}
.v b,.op b{font-size:17px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ops{display:none;position:absolute;left:0;right:0;top:62px;background:#000;border:1px solid #2a3244;border-radius:0 0 12px 12px;overflow:hidden;z-index:9}
.sl.o .ops{display:block}
.op{height:54px;padding:0 14px;cursor:pointer}
.op:hover{background:#0b0b0b}
.op.s{background:#3347ff}
.ii{display:inline-flex;align-items:center;justify-content:center;position:relative;width:22px;height:22px;flex:0 0 22px}
.ii img{width:18px;height:18px;object-fit:contain;border-radius:50%;background:#fff}
.f{margin-top:18px}
.bx{height:56px;border:1px solid #2a3244;background:#000;border-radius:12px;overflow:hidden}
.bx input{width:100%;height:100%;border:0;outline:0;background:transparent;color:#fff;padding:0 14px;font-size:18px}
.bx input::placeholder{color:#76819a}
.bx input.addr{direction:ltr;text-align:left}
.ck{display:flex;align-items:center;gap:10px;margin:18px 0 14px;color:#edf1fb;font-size:15px}
.ck input{appearance:none;-webkit-appearance:none;width:22px;height:22px;border:2px solid #616c87;border-radius:4px;background:transparent;position:relative;cursor:pointer}
.ck input:checked{border-color:#5264ff;background:#5264ff}
.ck input:checked:after{content:"";position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.ck a{color:#7180ff;text-decoration:none}
.sm{color:#b2bbcf;font-size:14px;line-height:1.7;margin:0 0 14px}
.bt{height:56px;width:100%;border:0;border-radius:12px;background:#3447ff;color:#dce1ff;font-size:20px;font-weight:800;cursor:pointer}
.bt:disabled{opacity:.65;cursor:not-allowed}
.nw{display:flex;align-items:flex-start;gap:10px;color:#ffb23f;margin:16px 2px 6px}
.nw .x{width:22px;height:22px;border:2px solid #ffb23f;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;flex:0 0 22px}
.nw b{display:block;font-size:16px;margin-top:-1px}
.ft{font-size:15px;color:#fff;line-height:1.9;padding-right:32px}
.st{display:none;margin:0 0 14px;padding:12px 14px;border-radius:12px;font-size:14px;line-height:1.7}
.st.show{display:block}
.st.info{background:#0f1626;border:1px solid #2f4674;color:#b8cbff}
.st.success{background:#0d2016;border:1px solid #1d6d43;color:#b7ffd5}
.st.error{background:#251012;border:1px solid #7a2d36;color:#ffb9c0}
</style>

<div class="wd">
  <div class="c1">
    <div class="r">متاح للسحب</div>
    <div class="l" id="wd-balance">0$</div>
  </div>

  <div class="c2">
    <div id="wd-status" class="st"></div>

    <div class="lb">طريقة السحب</div>
    <div class="sl">
      <div class="sv">
        <div class="v">
          <span class="ii">
            <img src="https://binolla.com/static/common/images/payment/method/usdt.svg" alt="USDT">
          </span>
          <b>Tether (USDT/TRC20)</b>
        </div>
        <span class="a">⌄</span>
      </div>

      <div class="ops">
        <div class="op s" data-code="USDT_TRC20" data-label="Tether (USDT/TRC20)">
          <span class="ii">
            <img src="https://binolla.com/static/common/images/payment/method/usdt.svg" alt="USDT">
          </span>
          <b>Tether (USDT/TRC20)</b>
        </div>

        <div class="op" data-code="USDT_BEP20" data-label="Tether (USDT/BEP20)">
          <span class="ii">
            <img src="https://binolla.com/static/common/images/payment/method/usdt.svg" alt="USDT">
          </span>
          <b>Tether (USDT/BEP20)</b>
        </div>

        <div class="op" data-code="BINANCE_PAY" data-label="Binance Pay">
          <span class="ii">
            <img src="https://binolla.com/static/common/images/payment/method/binancepay.svg" alt="Binance Pay">
          </span>
          <b>Binance Pay</b>
        </div>
      </div>
    </div>

    <div class="f">
      <div class="lb">المبلغ: $</div>
      <div class="bx">
        <input id="wd-amount" type="number" min="0" step="0.01" placeholder="أدخل مبلغ السحب">
      </div>
    </div>

    <div class="f">
      <div class="lb">معرف المحفظة</div>
      <div class="bx">
        <input id="wd-wallet" class="addr" placeholder="أدخل عنوان أو معرف المحفظة">
      </div>
    </div>

    <label class="ck">
      <input id="wd-terms" type="checkbox">
      <span>أقبل <a href="#">الأحكام والشروط</a></span>
    </label>

    <p class="sm">قد يتم إرسال الدفعة على أجزاء خلال 48 ساعة (بعد تغير الحالة إلى "ناجح")</p>

    <button class="bt" id="wd-submit">تقديم طلب السحب</button>
  </div>

  <div class="nw">
    <span class="x">!</span>
    <b>لا يتم فرض أي عمولة.</b>
  </div>

  <div class="ft">يتم سحب الأموال بنفس الطريقة التي استخدمتها للإيداع.</div>
</div>
`,
  init: initWithdrawalPage
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWithdrawalPage);
} else {
  initWithdrawalPage();
}

if (!window._wdInitObserver) {
  window._wdInitObserver = new MutationObserver(() => {
    initWithdrawalPage();
  });

  window._wdInitObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}
