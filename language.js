<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",
  authDomain: "hhhxh-5ebe4.firebaseapp.com",
  projectId: "hhhxh-5ebe4",
  storageBucket: "hhhxh-5ebe4.firebasestorage.app",
  messagingSenderId: "79243000696",
  appId: "1:79243000696:web:ee0fb2d2ccce791954e68d",
  measurementId: "G-08BR6LN6PT"
};

const app = initializeApp(firebaseConfig);
let analytics = null;

try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics is not available in this environment.", e);
}

const auth = getAuth(app);
const db = getFirestore(app);

let currentUid = null;
let pendingShortLang = null;

(() => {
  const d = window.DynamicInjectTarget || document.body;

  d.innerHTML = `<style>
#lgpg{position:fixed;inset:0;z-index:9999;background:#000;color:#fff;overflow:auto;direction:ltr}
#lgpg *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Tahoma,Arial,sans-serif}
#lgpg .lwrap{direction:ltr;background:#000;color:#fff;min-height:100vh;padding:0 0 calc(20px + env(safe-area-inset-bottom))}
#lgpg .ltop{position:sticky;top:0;height:54px;display:flex;align-items:center;justify-content:center;background:#000;z-index:5}
#lgpg .lback{position:absolute;left:8px;top:7px;width:40px;height:40px;border:0;background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}
#lgpg .lback svg{width:22px;height:22px;display:block}
#lgpg .ltop h2{font-size:20px;font-weight:500;margin:0}
#lgpg .llist{background:#000}
#lgpg .langOpt{height:74px;padding:0 16px;text-decoration:none;color:#fff;background:#000;border-bottom:1px solid rgba(255,255,255,.11);display:flex;align-items:center;justify-content:space-between;cursor:pointer}
#lgpg .langrow{display:flex;align-items:center;gap:14px}
#lgpg .fi{width:30px;height:22px;object-fit:cover;display:block;border-radius:2px;box-shadow:0 0 0 1px rgba(255,255,255,.06)}
#lgpg .txt{font-size:16px}
#lgpg .arr{opacity:0;color:#1e88ff;font-size:20px;font-weight:900}
#lgpg .langOpt.on .arr{opacity:1}
</style><section id="lgpg"><div class="lwrap"><div class="ltop"><button class="lback" id="lgback" aria-label="Back" type="button"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><h2>Language</h2></div><div class="llist"><a class="langOpt" data-lang="zh-HK" data-name="繁体中文"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/hk.png" alt=""><span class="txt">繁体中文</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="zh-CN" data-name="简体中文"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/cn.png" alt=""><span class="txt">简体中文</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="en" data-name="English"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/us.png" alt=""><span class="txt">English</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="pl" data-name="Polski"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/pl.png" alt=""><span class="txt">Polski</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="ko" data-name="한국인"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/kr.png" alt=""><span class="txt">한국인</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="de" data-name="Deutsch"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/de.png" alt=""><span class="txt">Deutsch</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="fr" data-name="Français"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/fr.png" alt=""><span class="txt">Français</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="ja" data-name="日本語"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/jp.png" alt=""><span class="txt">日本語</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="th" data-name="ไทย"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/th.png" alt=""><span class="txt">ไทย</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="es" data-name="español"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/es.png" alt=""><span class="txt">español</span></span><span class="arr">✓</span></a><a class="langOpt" data-lang="ar" data-name="عرب"><span class="langrow"><img class="fi" src="https://flagcdn.com/w40/ae.png" alt=""><span class="txt">عرب</span></span><span class="arr">✓</span></a></div></div></section>`;

  const q = (s) => d.querySelector(s);
  const qa = (s) => d.querySelectorAll(s);

  const mapShortToFull = (shortLang) => {
    const normalized = (shortLang || "en").slice(0, 2).toLowerCase();
    if (normalized === "zh") return "zh-CN";
    const exact = Array.from(qa(".langOpt")).find((x) => (x.dataset.lang || "").toLowerCase() === normalized);
    if (exact) return exact.dataset.lang;
    const startsWith = Array.from(qa(".langOpt")).find((x) => (x.dataset.lang || "").toLowerCase().startsWith(normalized));
    return startsWith ? startsWith.dataset.lang : "en";
  };

  const mark = () => {
    let c = localStorage.getItem("langCode") || "en";
    if ((c || "").length === 2) c = mapShortToFull(c);
    qa(".langOpt").forEach((x) => x.classList.toggle("on", x.dataset.lang === c));
  };

  const closePage = () => {
    if (typeof window.closeDyn === "function") {
      window.closeDyn();
      return;
    }
    const page = q("#lgpg");
    if (page) page.remove();
  };

  const saveLangForUser = async (fullLang, langName) => {
    const shortLang = (fullLang || "en").slice(0, 2).toLowerCase();

    localStorage.setItem("langCode", fullLang);
    localStorage.setItem("langName", langName || shortLang);
    mark();

    if (!currentUid) {
      pendingShortLang = shortLang;
      closePage();
      return;
    }

    try {
      await setDoc(doc(db, "users", currentUid), {
        lang: shortLang,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Failed to save language to Firestore:", error);
    }

    closePage();
  };

  q("#lgback").onclick = closePage;

  qa(".langOpt").forEach((b) => {
    b.onclick = async (e) => {
      e.preventDefault();
      await saveLangForUser(b.dataset.lang, b.dataset.name);
    };
  });

  mark();

  onAuthStateChanged(auth, async (user) => {
    currentUid = user?.uid || null;

    if (!currentUid) return;

    try {
      if (pendingShortLang) {
        await setDoc(doc(db, "users", currentUid), {
          lang: pendingShortLang,
          updatedAt: serverTimestamp()
        }, { merge: true });
        pendingShortLang = null;
        return;
      }

      const localLangCode = localStorage.getItem("langCode");
      if (localLangCode) return;

      const snap = await getDoc(doc(db, "users", currentUid));
      if (!snap.exists()) return;

      const data = snap.data() || {};
      if (!data.lang || typeof data.lang !== "string") return;

      const fullLang = mapShortToFull(data.lang);
      const matchedOption = Array.from(qa(".langOpt")).find((x) => x.dataset.lang === fullLang);
      if (!matchedOption) return;

      localStorage.setItem("langCode", matchedOption.dataset.lang);
      localStorage.setItem("langName", matchedOption.dataset.name || data.lang);
      mark();
    } catch (error) {
      console.error("Failed to read user language from Firestore:", error);
    }
  });
})();

void analytics;
</script>
