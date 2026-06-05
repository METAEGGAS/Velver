injectPage("team",{
  h:`
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
    #tm{
      --bg:#0b0b0b;--cd:#171717;--ln:#2b2b2b;--tx:#fff;--sb:#bdbdbd;--pk:#c10072;--pp:#a34dff;
      max-width:620px;min-height:112vh;margin:0 auto;padding:18px 18px 88px;
      background:var(--bg);color:var(--tx);
      font-family:"Noto Sans Arabic",system-ui,-apple-system,Segoe UI,Tahoma,Arial,sans-serif;
      direction:rtl
    }
    #tm *{box-sizing:border-box}
    #tm a{color:#fff;text-decoration:none}
    #tm .c{background:var(--cd);border:1px solid #242424;border-radius:20px;padding:22px;margin:0 0 20px}
    #tm .q{width:240px;height:240px;margin:8px auto 18px;background:#fff;border-radius:22px;display:grid;place-items:center}
    #tm .q img{width:200px;height:200px;display:block}
    #tm .f{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid var(--ln);border-radius:16px;padding:14px 14px 14px 18px;margin-top:16px}
    #tm .t{min-width:0;text-align:right;direction:rtl;flex:1}
    #tm .k{font-size:13px;color:#d8d8d8;margin:0 0 3px}
    #tm .v{font-size:16px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:ltr;text-align:right}
    #tm .b{border:0;background:var(--pk);color:#fff;height:42px;min-width:72px;padding:0 16px;border-radius:999px;font-size:16px;cursor:pointer;font-family:inherit}
    #tm .h{display:flex;justify-content:space-between;align-items:center;direction:rtl;margin-bottom:16px;padding:0 4px}
    #tm .tt{font-size:19px;font-weight:700}
    #tm .lv{display:flex;align-items:center;gap:8px;font-size:15px}
    #tm .i{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;background:rgba(163,77,255,.12);color:#d59cff;border:1px solid rgba(163,77,255,.45);font-size:12px}
    #tm .bx{border:1px solid var(--ln);border-radius:18px;padding:22px 8px}
    #tm .r{display:flex;justify-content:space-between;gap:8px}
    #tm .r+.r{margin-top:18px}
    #tm .x{flex:1;text-align:center}
    #tm .n{font-size:24px;line-height:1.1;margin-bottom:8px}
    #tm .s{font-size:15px;color:var(--sb);line-height:1.25}
    #tm .r2{padding-right:17%}
    #tm .nd{padding:26px 0 6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
    #tm .nd img{width:112px;height:112px;object-fit:contain;display:block;filter:drop-shadow(0 4px 14px rgba(0,0,0,.28))}
    #tm .nd div{font-size:20px;color:#d7d7d7}
    #tm .lh{display:flex;align-items:center;justify-content:space-between;direction:rtl;padding:0 4px 14px;font-size:17px;font-weight:600;color:#e9e9e9}
    #tm .ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
    #tm .u{display:flex;align-items:center;gap:12px;background:#1f1f1f;border:1px solid #2a2a2a;border-radius:14px;padding:12px 14px;direction:rtl}
    #tm .av{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--pp),var(--pk));display:grid;place-items:center;color:#fff;font-weight:700;font-size:18px;flex-shrink:0;overflow:hidden}
    #tm .av img{width:100%;height:100%;object-fit:cover;display:block}
    #tm .ui{flex:1;min-width:0}
    #tm .id{font-size:14px;color:#fff;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:ltr;text-align:right}
    #tm .dt{font-size:12px;color:#9a9a9a;margin-top:2px}
    #tm .dp{text-align:left;direction:ltr;background:rgba(193,0,114,.12);color:#ffb3da;border:1px solid rgba(193,0,114,.35);border-radius:10px;padding:6px 10px;font-weight:700;font-size:13px;white-space:nowrap}
  </style>

  <div id="tm">
    <div class="c">
      <div class="q"><img alt="qr" id="tmQR" src=""></div>

      <div class="f">
        <div class="t">
          <div class="k">شفرة الدعوة</div>
          <div class="v" id="tmCODE">------</div>
        </div>
        <button class="b" id="tmCpyC">نسخ</button>
      </div>

      <div class="f">
        <div class="t">
          <div class="k">رابط المشاركة</div>
          <div class="v" id="tmLNK">...</div>
        </div>
        <button class="b" id="tmCpyL">نسخ</button>
      </div>
    </div>

    <div class="c">
      <div class="h">
        <div class="lv">وصف المستوى <span class="i">i</span></div>
        <div class="tt">الفريق</div>
      </div>

      <div class="bx">
        <div class="r">
          <div class="x"><div class="n" id="tmCNT">0</div><div class="s">مدعو</div></div>
          <div class="x"><div class="n">LV0</div><div class="s">مستوى الفريق</div></div>
          <div class="x"><div class="n">VIP0</div><div class="s">مستوى VIP</div></div>
        </div>

        <div class="r r2">
          <div class="x"><div class="n" id="tmINC">0</div><div class="s">دخل الدعوة</div></div>
          <div class="x"><div class="n" id="tmSZ">1</div><div class="s">حجم الفريق</div></div>
        </div>
      </div>
    </div>

    <div class="c" id="tmListC">
      <div class="lh"><span>المدعوون</span><span id="tmLN" style="color:#a34dff;font-weight:700">0</span></div>
      <ul class="ul" id="tmList"></ul>
      <div class="nd" id="tmEmpty">
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png" alt="no data">
        <div>لا توجد بيانات</div>
      </div>
    </div>
  </div>
  `,

  m: async function () {
    try {
      const w = window, d = document;
      const $ = (s, r = d) => r.querySelector(s);

      const S = w.__TEAM = w.__TEAM || {
        uid: "",
        unUser: null,
        unRefs: null
      };

      const FB = () => S.fbPromise || (
        S.fbPromise = Promise.all([
          import("https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js"),
          import("https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js"),
          import("https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js")
        ]).then(([a, b, c]) => {
          const m = { ...a, ...b, ...c };

          if (!S.fb) {
            const cfg = {
              apiKey: "AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",
              authDomain: "hhhxh-5ebe4.firebaseapp.com",
              projectId: "hhhxh-5ebe4",
              storageBucket: "hhhxh-5ebe4.firebasestorage.app",
              messagingSenderId: "79243000696",
              appId: "1:79243000696:web:ee0fb2d2ccce791954e68d",
              measurementId: "G-08BR6LN6PT"
            };

            const app = m.getApps().length ? m.getApp() : m.initializeApp(cfg);

            S.fb = {
              ...m,
              app,
              auth: m.getAuth(app),
              db: m.getFirestore(app)
            };
          }

          return S.fb;
        })
      );

      function setCopy(btn, text) {
        if (!btn) return;
        btn.onclick = async () => {
          try {
            await navigator.clipboard.writeText(text || "");
            const old = btn.textContent;
            btn.textContent = "تم";
            setTimeout(() => btn.textContent = old, 900);
          } catch (e) {}
        };
      }

      async function genCode(uid, fb) {
        const { db, collection, query, where, limit, getDocs, doc, setDoc, serverTimestamp } = fb;

        for (let i = 0; i < 10; i++) {
          const code = String(Math.floor(100000 + Math.random() * 900000));
          try {
            const q = await getDocs(query(collection(db, "users"), where("inviteCode", "==", code), limit(1)));
            if (q.empty) {
              await setDoc(doc(db, "users", uid), {
                inviteCode: code,
                inviteCodeCreatedAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              }, { merge: true });
              return code;
            }
          } catch (e) {}
        }

        const fallback = uid.slice(-6).toUpperCase();
        await setDoc(doc(fb.db, "users", uid), {
          inviteCode: fallback,
          inviteCodeCreatedAt: fb.serverTimestamp(),
          updatedAt: fb.serverTimestamp()
        }, { merge: true });

        return fallback;
      }

      async function ensureUser(uid, fb) {
        const { db, doc, getDoc, setDoc, serverTimestamp } = fb;
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, {
            balance: 0,
            dailyUsage: [],
            createdAt: serverTimestamp(),
            createdMs: Date.now()
          }, { merge: true });
          return { balance: 0, dailyUsage: [] };
        }

        return snap.data() || {};
      }

      async function ensureCode(uid, fb) {
        const { db, doc, getDoc } = fb;
        try {
          const snap = await getDoc(doc(db, "users", uid));
          if (snap.exists()) {
            const data = snap.data() || {};
            if (data.inviteCode) return data.inviteCode;
          }
        } catch (e) {}
        return await genCode(uid, fb);
      }

      function render(code, refs, totalDeposit) {
        const ORIGIN = location.origin;
        const PATH = location.pathname.replace(/[^/]*$/, "") + "login.html";
        const link = `${ORIGIN}${PATH}?inf=${code}`;

        $("#tmCODE").textContent = code || "------";
        $("#tmLNK").textContent = link || "—";
        $("#tmQR").src = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(link);

        setCopy($("#tmCpyC"), code || "");
        setCopy($("#tmCpyL"), link || "");

        $("#tmCNT").textContent = refs.length;
        $("#tmLN").textContent = refs.length;
        $("#tmSZ").textContent = refs.length + 1;
        $("#tmINC").textContent = Number(totalDeposit || 0).toFixed(2);

        const ul = $("#tmList");
        const empty = $("#tmEmpty");

        if (!refs.length) {
          ul.innerHTML = "";
          empty.style.display = "flex";
          return;
        }

        empty.style.display = "none";

        ul.innerHTML = refs.map(r => {
          const idTxt = r.uid ? r.uid.slice(0, 10).toUpperCase() : "--";
          const dp = Number(r.deposit || 0).toFixed(2);
          const init = (r.email || r.phone || "U").toString().charAt(0).toUpperCase();
          const av = r.avatar ? `<img src="${r.avatar}" alt="">` : init;

          let dt = "";
          if (r.createdAt?.seconds) {
            dt = new Date(r.createdAt.seconds * 1000).toLocaleDateString("ar-EG");
          } else if (r.createdMs) {
            dt = new Date(r.createdMs).toLocaleDateString("ar-EG");
          }

          return `
            <li class="u">
              <div class="av">${av}</div>
              <div class="ui">
                <div class="id">ID: ${idTxt}</div>
                <div class="dt">${dt}</div>
              </div>
              <div class="dp">$ ${dp}</div>
            </li>
          `;
        }).join("");
      }

      async function bindUser(uid) {
        const fb = await FB();
        const {
          db, doc, onSnapshot, collection, query, where, orderBy
        } = fb;

        S.uid = uid;

        if (S.unUser) { try { S.unUser(); } catch (e) {} }
        if (S.unRefs) { try { S.unRefs(); } catch (e) {} }

        await ensureUser(uid, fb);
        const code = await ensureCode(uid, fb);

        S.unUser = onSnapshot(doc(db, "users", uid), async (snap) => {
          const data = snap.data() || {};
          const inviteCode = data.inviteCode || code || await ensureCode(uid, fb);

          render(inviteCode, S.refs || [], S.totalDeposit || 0);
        });

        try {
          S.unRefs = onSnapshot(
            query(collection(db, "users"), where("inviterUid", "==", uid)),
            (qs) => {
              const refs = [];
              let total = 0;

              qs.forEach(x => {
                const v = x.data() || {};
                refs.push({
                  uid: x.id,
                  email: v.email,
                  phone: v.phone,
                  avatar: v.avatar,
                  deposit: v.deposit || 0,
                  createdAt: v.createdAt,
                  createdMs: v.createdMs || 0
                });
                total += Number(v.deposit || 0);
              });

              refs.sort((a, b) =>
                (b.createdAt?.seconds || Math.floor((b.createdMs || 0) / 1000)) -
                (a.createdAt?.seconds || Math.floor((a.createdMs || 0) / 1000))
              );

              S.refs = refs;
              S.totalDeposit = total;

              const currentCode = $("#tmCODE")?.textContent?.trim() || code;
              render(currentCode, refs, total);
            }
          );
        } catch (e) {
          console.error(e);
          render(code, [], 0);
        }
      }

      async function boot() {
        if (S.booted) return;
        S.booted = true;

        const fb = await FB();
        const { auth, onAuthStateChanged, signInAnonymously } = fb;

        onAuthStateChanged(auth, async (user) => {
          if (user?.uid) {
            await bindUser(user.uid);
          } else {
            try {
              await signInAnonymously(auth);
            } catch (e) {
              console.error("[team auth]", e);
              $("#tmCODE").textContent = "تعذر الاتصال";
              $("#tmLNK").textContent = "—";
            }
          }
        });

        if (auth.currentUser?.uid) {
          await bindUser(auth.currentUser.uid);
        }
      }

      await boot();

    } catch (e) {
      console.error("[team]", e);
    }
  }
});

(function () {
  const fn = function () {
    const el = document.querySelector("#tm");
    if (el && window.__teamPage && typeof window.__teamPage.m === "function") {
      window.__teamPage.m();
    }
  };

  window.__teamPage && window.__teamPage.m && fn();
  document.addEventListener("DOMContentLoaded", fn);
  setTimeout(fn, 400);
  setTimeout(fn, 1200);
})();
