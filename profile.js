injectPage("profile",{h:`<style>
#profile-panel{position:fixed;top:0;right:-35%;width:35%;height:100vh;background:#000;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;direction:rtl;overflow-y:auto;overflow-x:hidden;z-index:9999;transition:right .35s ease;box-shadow:-4px 0 20px rgba(0,0,0,.6)}
#profile-panel.open{right:0}
#profile-panel *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;direction:rtl}
#profile-panel input,#profile-panel button,#profile-panel select{direction:inherit;text-align:right;font:inherit;border:0;outline:0}
#profile-panel .p{display:none;min-height:100vh}
#profile-panel .p.on{display:block}
#profile-panel .top{padding:22px 26px 18px;border-bottom:1px solid #161616}
#profile-panel .bk{width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:none;color:#bfc5ca;cursor:pointer;margin:0 -6px 18px 0}
#profile-panel .bk svg{width:24px;height:24px;stroke:#bfc5ca;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
#profile-panel .pr{display:flex;align-items:center;gap:17px}
#profile-panel .av{width:62px;height:62px;border-radius:50%;object-fit:cover;background:#111}
#profile-panel .nm{font-size:20px;font-weight:700;line-height:1.25;word-break:break-all}
#profile-panel .sb{margin-top:5px;font-size:14px;color:#90959c;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#profile-panel .vb{display:inline-flex;align-items:center;height:22px;padding:0 10px;background:#3d3208;border-radius:11px;color:#fff;font-weight:700;font-size:12px}
#profile-panel .sec{height:50px;display:flex;align-items:center;padding:0 22px;background:#232523;color:#8f949b;font-size:17px}
#profile-panel .rw{display:flex;align-items:center;gap:17px;min-height:70px;padding:0 22px;background:#000;color:#fff;width:100%;cursor:pointer}
#profile-panel .rw:active{background:#121212}
#profile-panel .ic{width:29px;height:29px;object-fit:contain;flex:0 0 29px;opacity:.95}
#profile-panel .tx{font-size:20px;font-weight:500;flex:1;text-align:right}
#profile-panel .ar{width:20px;height:20px}
#profile-panel .ar svg{width:100%;height:100%;stroke:#9aa0a7;stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
#profile-panel .st{font-size:18px;font-weight:500}
#profile-panel .st.r{color:#ff4b55}
#profile-panel .st.y{color:#f5b800}
#profile-panel .st.g{color:#11b95c}
#profile-panel .pw{padding:20px 20px 28px}
#profile-panel .tt{font-size:33px;line-height:1.35;font-weight:500;margin:18px 0 26px}
#profile-panel .card{background:#353947;border-radius:18px;padding:20px 18px 22px}
#profile-panel .hero{width:100%;display:flex;justify-content:center;margin:2px 0 18px}
#profile-panel .hero img{width:70%;max-width:330px}
#profile-panel .fld{margin:18px 0 10px}
#profile-panel .ibox{height:78px;background:#222520;border-radius:40px;display:flex;align-items:center;padding:0 16px;gap:12px}
#profile-panel .ibox input{flex:1;background:none;color:#fff;font-size:18px}
#profile-panel .ibox input::placeholder{color:#8e939b}
#profile-panel .act{display:flex;align-items:center;gap:14px}
#profile-panel .x{width:22px;height:22px;border-radius:50%;background:#d8dbe0;color:#40444a;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;cursor:pointer}
#profile-panel .eye{width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer}
#profile-panel .eye svg{width:23px;height:23px;stroke:#aab0b7;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
#profile-panel .hint{color:#a5aab2;font-size:16px;line-height:1.7;padding:10px 8px 0}
#profile-panel .warn{display:flex;gap:8px;color:#f34d56;font-size:16px;line-height:1.8;padding:16px 8px 0}
#profile-panel .ok{width:100%;height:64px;margin-top:24px;border-radius:12px;background:#05b246;color:#031b08;font-size:24px;font-weight:500;cursor:pointer}
#profile-panel .ok:disabled{opacity:.6}
#profile-panel .rh{position:relative;text-align:center;font-size:20px;padding:20px 0;border-bottom:1px solid #161616}
#profile-panel .rh .bk{position:absolute;right:14px;left:auto;top:14px;margin:0}
#profile-panel .dd{margin:18px 16px 0;position:relative}
#profile-panel .sel{width:100%;height:54px;background:#1b1f1c;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#16b55c;font-size:17px;cursor:pointer;position:relative}
#profile-panel .sel em{position:absolute;left:18px;right:auto;font-style:normal;transition:.2s;font-size:13px}
#profile-panel .dd.o .sel{border-radius:14px 14px 0 0}
#profile-panel .dd.o .sel em{transform:rotate(180deg)}
#profile-panel .mn{display:none;background:#1b1f1c;border-radius:0 0 14px 14px;overflow:hidden}
#profile-panel .dd.o .mn{display:block}
#profile-panel .it{width:100%;padding:16px 20px;background:none;color:#fff;text-align:right;font-size:16px;position:relative;cursor:pointer}
#profile-panel .it+.it{border-top:1px solid #2e312f}
#profile-panel .it.on{color:#11b95c}
#profile-panel .it.on:after{content:"✓";position:absolute;left:18px;right:auto;color:#11b95c}
#profile-panel .emp{text-align:center;padding:90px 20px 0;color:#a7acb2;font-size:18px}
#profile-panel .emp img{width:140px;display:block;margin:0 auto 14px}
#profile-panel .sp{width:34px;height:34px;border:3px solid #21492f;border-top-color:#14c05f;border-radius:50%;margin:50px auto 0;animation:pfr .8s linear infinite}
#profile-panel .kyc2{min-height:100vh;background:#0b0b0b;padding:10px 18px 22px}
#profile-panel .kyh{position:relative;text-align:center;padding:8px 0 14px;font-size:18px;font-weight:500}
#profile-panel .kyh .bk{position:absolute;right:0;left:auto;top:0;margin:0}
#profile-panel .kyttl{margin:2px 0 18px}
#profile-panel .lbl{font-size:14px;color:#fff;margin:0 4px 8px 0}
#profile-panel .ndd{position:relative;height:54px;background:#191b19;border:1px solid #222;display:flex;align-items:center;padding:0 16px;color:#fff;font-size:16px;cursor:pointer}
#profile-panel .ndd .cv{flex:1}
#profile-panel .ndd .cr{color:#9aa0a7;font-size:12px;transition:.2s}
#profile-panel .ndd.o .cr{transform:rotate(180deg)}
#profile-panel .nmn{display:none;position:absolute;left:0;right:0;top:100%;z-index:9;background:#191b19;border:1px solid #222;border-top:0;max-height:260px;overflow-y:auto}
#profile-panel .ndd.o .nmn{display:block}
#profile-panel .ni{padding:12px 16px;color:#fff;font-size:15px;border-top:1px solid #2a2c2a;cursor:pointer}
#profile-panel .ni:first-child{border-top:0}
#profile-panel .ni:hover{background:#222}
#profile-panel .ni.on{color:#11b95c}
#profile-panel .round{height:58px;background:#1a1c1a;border-radius:29px;padding:0 16px;display:flex;align-items:center;gap:10px}
#profile-panel .round input{flex:1;background:none;color:#fff;font-size:16px}
#profile-panel .round input::placeholder{color:#90959b}
#profile-panel .cx{width:18px;height:18px;border-radius:50%;background:#d8dbe0;color:#4c5055;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:0 0 18px;cursor:pointer}
#profile-panel .upl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px}
#profile-panel .up{display:flex;flex-direction:column;align-items:center}
#profile-panel .ub{width:100%;aspect-ratio:1/1;background:#5d6584;border:1px dashed #d6d9e8;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
#profile-panel .ub img{width:100%;height:100%;object-fit:cover}
#profile-panel .cam{width:38px;height:38px}
#profile-panel .cap{margin-top:10px;font-size:12px;color:#d9d9d9;text-align:center;line-height:1.3;min-height:32px}
#profile-panel .sh{margin-top:18px;font-size:13px;color:#fff}
#profile-panel .shex{margin-top:10px;width:100%}
#profile-panel .shex img{display:block;width:100%;height:auto}
#profile-panel .ap{margin-top:22px;width:100%;height:66px;background:#08ae43;color:#fff;border-radius:4px;font-size:18px}
#profile-panel .ap:disabled{opacity:.6}
#profile-panel .uploader{cursor:pointer}
#profile-panel .uploader input{display:none}
#profile-panel .logout{color:#ff4b55}
#profile-panel .tst{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:12px 22px;border-radius:8px;font-size:15px;z-index:99999;display:none;max-width:90%;text-align:center}
#profile-panel .tst.on{display:block}
@keyframes pfr{to{transform:rotate(1turn)}}
@media(max-width:900px){#profile-panel{width:100%;right:-100%}}
</style>
<div id="profile-panel">
<div id="pf-tst" class="tst"></div>
<section id="pf-home" class="p on"><div class="top"><button class="bk" data-act="close"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><div class="pr"><img class="av" src="https://bdyy365ue.com/h5/css/owner-ufQ69ccO.png"><div><div class="nm" id="pf-ue">loading...</div><div class="sb"><span id="pf-uu">UID:--</span><span class="vb">VIP0</span></div></div></div></div>
<div class="sec" id="pf-safeSec">Safe</div>
<button class="rw" data-sw="safe"><img class="ic" src="https://i.ibb.co/pj7R7kQJ/71.png"><span class="tx" id="pf-mSafe">Safe</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw" data-sw="safe"><img class="ic" src="https://i.ibb.co/spfZpcMV/72.png"><span class="tx" id="pf-mPwd">Change Password</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw"><img class="ic" src="https://i.ibb.co/KzbSLLJ1/73.png"><span class="tx" id="pf-mApp">Download App</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw"><img class="ic" src="https://i.ibb.co/rR8JxrfY/74.png"><span class="tx" id="pf-mRef">Referral Program</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw" data-sw="rec"><img class="ic" src="https://i.ibb.co/fVNQ060d/75.png"><span class="tx" id="pf-mRec">Consume Record</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button id="pf-pcb" class="rw" data-act="op"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="pf-mPc">Primary Certification</span><span id="pf-pcs" class="st r">Unauthenticated</span></button>
<button class="rw" data-act="ne"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="pf-mAc">Advanced Certification</span><span id="pf-acs" class="st r">Unauthenticated</span></button>
<div class="sec" id="pf-genSec">General</div>
<button class="rw logout" data-act="lg"><span class="ic" style="display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="29" height="29" fill="none" stroke="#ff4b55" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg></span><span class="tx" id="pf-mLogout">Logout</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
</section>
<section id="pf-safe" class="p"><div class="pw"><button class="bk" data-sw="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><div class="tt" id="pf-pwdTitle">Change Login Password</div><div class="card"><div class="hero"><img src="https://www.vipteelxme.com/wap/img/pwd.fbdfd1de.png"></div>
<div class="fld"><div class="ibox"><input id="pf-o" type="password" placeholder="Old Password"><div class="act"><span class="x" data-clr="pf-o">×</span><span class="eye" data-tg="pf-o"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div></div>
<div class="fld"><div class="ibox"><input id="pf-n" type="password" placeholder="New Password"><div class="act"><span class="x" data-clr="pf-n">×</span><span class="eye" data-tg="pf-n"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div><div class="hint" id="pf-nh">Please enter 6-12 characters, including numbers or letters</div></div>
<div class="fld"><div class="ibox"><input id="pf-c" type="password" placeholder="Confirm New Password"><div class="act"><span class="x" data-clr="pf-c">×</span><span class="eye" data-tg="pf-c"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div><div class="hint" id="pf-ch">Please enter 6-12 characters, including numbers or letters</div></div>
<div class="warn"><span>ⓘ</span><span id="pf-warnTxt">To protect your funds and trading security, withdrawal related actions will be restricted for 24 hours after changing the password</span></div>
<button id="pf-okb" class="ok" data-act="cp">Confirm</button></div></div></section>
<section id="pf-rec" class="p"><div class="rh"><button class="bk" data-sw="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><span id="pf-recTitle">Consume Record</span></div>
<div id="pf-dd" class="dd"><button class="sel" data-act="tD"><span id="pf-sv" data-k="spot">Spot Trading</span><em>▾</em></button><div class="mn"><button class="it" data-pk="All">All</button><button class="it" data-pk="Fiat Transaction">Fiat Transaction</button><button class="it" data-pk="Contract Transaction">Contract Transaction</button><button class="it on" data-pk="Spot Trading">Spot Trading</button></div></div>
<div id="pf-emp" class="emp"><img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div id="pf-noRec">No record</div></div></section>
<section id="pf-pc" class="p"><div class="kyc2"><div class="kyh"><button class="bk" data-sw="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><div class="kyttl" id="pf-kycTitle">KYC Authentication</div></div>
<div class="lbl" id="pf-natLbl">Nationality</div>
<div id="pf-nd" class="ndd" data-act="tN"><span id="pf-ncv" class="cv">United States</span><span class="cr">▾</span><div class="nmn" id="pf-nmn"></div></div>
<div class="lbl" style="margin-top:18px" id="pf-nameLbl">Full legal name</div>
<div class="round"><input id="pf-fn" placeholder="Please enter your real name"><span class="cx" data-clr="pf-fn">×</span></div>
<div class="lbl" style="margin-top:16px" id="pf-docLbl">Document/passport number</div>
<div class="round"><input id="pf-dn" placeholder="Please enter your ID/passport number"><span class="cx" data-clr="pf-dn">×</span></div>
<div class="lbl" style="margin-top:16px" id="pf-upLbl">ID photo/upload passport</div>
<div class="upl">
<label class="up uploader"><div class="ub" id="pf-b1"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="pf-b1"></div><div class="cap" id="pf-cap1">Front page of ID</div></label>
<label class="up uploader"><div class="ub" id="pf-b2"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="pf-b2"></div><div class="cap" id="pf-cap2">Back page of ID</div></label>
<label class="up uploader"><div class="ub" id="pf-b3"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="pf-b3"></div><div class="cap" id="pf-cap3">Hand-held of ID photo</div></label>
</div>
<div class="sh" id="pf-shotLbl">Shooting example</div>
<div class="shex"><img src="https://www.vipteelxme.com/wap/img/kyc-demo.b8a3decf.png"></div>
<button id="pf-apb" class="ap" data-act="ak">Apply for certification</button></div></section>
</div>
<script type="module">
import{initializeApp,getApps}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import{getAuth,onAuthStateChanged,EmailAuthProvider,reauthenticateWithCredential,updatePassword,signOut}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,updateDoc,serverTimestamp,onSnapshot,collection,addDoc}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
const cf={apiKey:"AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",authDomain:"hhhxh-5ebe4.firebaseapp.com",projectId:"hhhxh-5ebe4",storageBucket:"hhhxh-5ebe4.firebasestorage.app",messagingSenderId:"79243000696",appId:"1:79243000696:web:ee0fb2d2ccce791954e68d",measurementId:"G-08BR6LN6PT"};
const app=getApps().length?getApps()[0]:initializeApp(cf),au=getAuth(app),db=getFirestore(app);
let U=null,UD=null,T,UF={'pf-b1':null,'pf-b2':null,'pf-b3':null},CUR='ar';
const LS=['ar','de','fr','pl','ja','ko','th','zh-CN','zh-TW'];
const C=["United States","United Kingdom","Canada","Australia","Germany","France","Italy","Spain","Netherlands","Brazil","Mexico","Argentina","Japan","South Korea","China","India","Saudi Arabia","United Arab Emirates","Turkey","Egypt"];
const I={ar:{safe:'الأمان',pwd:'تغيير كلمة المرور',app:'تنزيل التطبيق',ref:'برنامج الإحالة',rec:'سجل الاستهلاك',pc:'التوثيق الأساسي',ac:'التوثيق المتقدم',gen:'عام',logout:'تسجيل الخروج',pwdTitle:'تغيير كلمة مرور الدخول',old:'كلمة المرور القديمة',new:'كلمة المرور الجديدة',confirmNew:'تأكيد كلمة المرور الجديدة',hint:'أدخل 6 إلى 12 حرفًا أو رقمًا',warn:'لحماية أموالك وأمان التداول، سيتم تقييد عمليات السحب لمدة 24 ساعة بعد تغيير كلمة المرور',confirm:'تأكيد',recTitle:'سجل الاستهلاك',all:'الكل',fiat:'معاملات العملات',contract:'معاملات العقود',spot:'التداول الفوري',noRec:'لا توجد سجلات',kycTitle:'توثيق الهوية',nat:'الجنسية',name:'الاسم القانوني الكامل',namePh:'يرجى إدخال اسمك الحقيقي',doc:'رقم الهوية/جواز السفر',docPh:'يرجى إدخال رقم الهوية أو جواز السفر',upload:'رفع صور الهوية/الجواز',cap1:'الوجه الأمامي للهوية',cap2:'الوجه الخلفي للهوية',cap3:'صورة شخصية مع الهوية',shot:'مثال التصوير',apply:'تقديم طلب التوثيق',loading:'جاري التحميل...',vip:'VIP0',unauth:'غير موثق',pending:'قيد المعالجة',approved:'موثق',notEligible:'غير متاح الفتح',fill:'يرجى تعبئة جميع الحقول',passRule:'كلمة المرور يجب أن تكون 6-12 أحرف أو أرقام',passMatch:'كلمتا المرور غير متطابقتين',wrongOld:'كلمة المرور القديمة غير صحيحة',passDone:'تم تغيير كلمة المرور بنجاح',need3:'يرجى رفع الصور الثلاث كاملة',kycDone:'تم إرسال طلب التوثيق',kycPending:'طلبك قيد المعالجة',kycApproved:'حسابك موثق'},de:{safe:'Sicherheit',pwd:'Passwort ändern',app:'App herunterladen',ref:'Empfehlungsprogramm',rec:'Verbrauchsverlauf',pc:'Primäre Verifizierung',ac:'Erweiterte Verifizierung',gen:'Allgemein',logout:'Abmelden',pwdTitle:'Login-Passwort ändern',old:'Altes Passwort',new:'Neues Passwort',confirmNew:'Neues Passwort bestätigen',hint:'Bitte 6-12 Zeichen mit Zahlen oder Buchstaben eingeben',warn:'Zum Schutz Ihrer Gelder und Handelssicherheit werden Auszahlungen 24 Stunden nach Passwortänderung eingeschränkt',confirm:'Bestätigen',recTitle:'Verbrauchsverlauf',all:'Alle',fiat:'Fiat-Transaktion',contract:'Kontrakt-Transaktion',spot:'Spot-Handel',noRec:'Keine Einträge',kycTitle:'KYC-Verifizierung',nat:'Nationalität',name:'Vollständiger rechtlicher Name',namePh:'Bitte echten Namen eingeben',doc:'Ausweis-/Passnummer',docPh:'Bitte Ausweis- oder Passnummer eingeben',upload:'Ausweisfoto/Pass hochladen',cap1:'Vorderseite des Ausweises',cap2:'Rückseite des Ausweises',cap3:'Foto mit Ausweis in der Hand',shot:'Aufnahmebeispiel',apply:'Verifizierung beantragen',loading:'Wird geladen...',vip:'VIP0',unauth:'Nicht verifiziert',pending:'In Bearbeitung',approved:'Verifiziert',notEligible:'Nicht verfügbar',fill:'Bitte alle Felder ausfüllen',passRule:'Passwort muss 6-12 Zeichen lang sein',passMatch:'Passwörter stimmen nicht überein',wrongOld:'Altes Passwort ist falsch',passDone:'Passwort erfolgreich geändert',need3:'Bitte alle 3 Fotos hochladen',kycDone:'Verifizierungsantrag gesendet',kycPending:'Ihr Antrag wird bearbeitet',kycApproved:'Ihr Konto ist verifiziert'},fr:{safe:'Sécurité',pwd:'Changer le mot de passe',app:'Télécharger l’application',ref:'Programme de parrainage',rec:'Historique de consommation',pc:'Certification primaire',ac:'Certification avancée',gen:'Général',logout:'Déconnexion',pwdTitle:'Changer le mot de passe de connexion',old:'Ancien mot de passe',new:'Nouveau mot de passe',confirmNew:'Confirmer le nouveau mot de passe',hint:'Veuillez saisir 6 à 12 caractères, chiffres ou lettres',warn:'Pour protéger vos fonds et la sécurité des transactions, les retraits seront limités pendant 24 heures après le changement du mot de passe',confirm:'Confirmer',recTitle:'Historique de consommation',all:'Tout',fiat:'Transaction fiduciaire',contract:'Transaction contrat',spot:'Trading spot',noRec:'Aucun enregistrement',kycTitle:'Vérification KYC',nat:'Nationalité',name:'Nom légal complet',namePh:'Veuillez saisir votre vrai nom',doc:'Numéro d’identité/passeport',docPh:'Veuillez saisir votre numéro d’identité ou passeport',upload:'Téléverser la pièce d’identité/le passeport',cap1:'Recto de la pièce',cap2:'Verso de la pièce',cap3:'Photo tenant la pièce d’identité',shot:'Exemple de prise de vue',apply:'Demander la certification',loading:'Chargement...',vip:'VIP0',unauth:'Non certifié',pending:'En cours',approved:'Certifié',notEligible:'Ouverture non disponible',fill:'Veuillez remplir tous les champs',passRule:'Le mot de passe doit contenir 6 à 12 caractères',passMatch:'Les mots de passe ne correspondent pas',wrongOld:'Ancien mot de passe incorrect',passDone:'Mot de passe modifié avec succès',need3:'Veuillez téléverser les 3 photos',kycDone:'Demande envoyée',kycPending:'Votre demande est en cours',kycApproved:'Votre compte est certifié'},pl:{safe:'Bezpieczeństwo',pwd:'Zmień hasło',app:'Pobierz aplikację',ref:'Program poleceń',rec:'Historia zużycia',pc:'Weryfikacja podstawowa',ac:'Weryfikacja zaawansowana',gen:'Ogólne',logout:'Wyloguj',pwdTitle:'Zmień hasło logowania',old:'Stare hasło',new:'Nowe hasło',confirmNew:'Potwierdź nowe hasło',hint:'Wpisz 6-12 znaków: litery lub cyfry',warn:'Aby chronić środki i bezpieczeństwo handlu, wypłaty będą ograniczone przez 24 godziny po zmianie hasła',confirm:'Potwierdź',recTitle:'Historia zużycia',all:'Wszystko',fiat:'Transakcja fiat',contract:'Transakcja kontraktowa',spot:'Handel spot',noRec:'Brak rekordów',kycTitle:'Weryfikacja KYC',nat:'Narodowość',name:'Pełne imię i nazwisko',namePh:'Wpisz prawdziwe imię i nazwisko',doc:'Numer dokumentu/paszportu',docPh:'Wpisz numer dokumentu lub paszportu',upload:'Prześlij zdjęcie dokumentu/paszportu',cap1:'Przód dokumentu',cap2:'Tył dokumentu',cap3:'Zdjęcie z dokumentem w ręku',shot:'Przykład zdjęcia',apply:'Złóż wniosek',loading:'Ładowanie...',vip:'VIP0',unauth:'Niezweryfikowano',pending:'W trakcie',approved:'Zweryfikowano',notEligible:'Niedostępne',fill:'Wypełnij wszystkie pola',passRule:'Hasło musi mieć 6-12 znaków',passMatch:'Hasła nie są takie same',wrongOld:'Stare hasło jest nieprawidłowe',passDone:'Hasło zmienione pomyślnie',need3:'Prześlij wszystkie 3 zdjęcia',kycDone:'Wniosek wysłany',kycPending:'Twój wniosek jest przetwarzany',kycApproved:'Twoje konto jest zweryfikowane'},ja:{safe:'セキュリティ',pwd:'パスワード変更',app:'アプリをダウンロード',ref:'紹介プログラム',rec:'利用履歴',pc:'基本認証',ac:'高度認証',gen:'一般',logout:'ログアウト',pwdTitle:'ログインパスワードを変更',old:'旧パスワード',new:'新しいパスワード',confirmNew:'新しいパスワードを確認',hint:'6〜12文字の英字または数字を入力してください',warn:'資金と取引の安全を守るため、パスワード変更後24時間は出金が制限されます',confirm:'確認',recTitle:'利用履歴',all:'すべて',fiat:'法定通貨取引',contract:'契約取引',spot:'現物取引',noRec:'記録なし',kycTitle:'本人確認',nat:'国籍',name:'正式な氏名',namePh:'本名を入力してください',doc:'身分証/パスポート番号',docPh:'身分証またはパスポート番号を入力してください',upload:'身分証/パスポートをアップロード',cap1:'身分証の表面',cap2:'身分証の裏面',cap3:'身分証を持った写真',shot:'撮影例',apply:'認証を申請',loading:'読み込み中...',vip:'VIP0',unauth:'未認証',pending:'審査中',approved:'認証済み',notEligible:'利用不可',fill:'すべての項目を入力してください',passRule:'パスワードは6〜12文字である必要があります',passMatch:'パスワードが一致しません',wrongOld:'旧パスワードが正しくありません',passDone:'パスワードを変更しました',need3:'3枚の写真をすべてアップロードしてください',kycDone:'申請を送信しました',kycPending:'申請は審査中です',kycApproved:'アカウントは認証済みです'},ko:{safe:'보안',pwd:'비밀번호 변경',app:'앱 다운로드',ref:'추천 프로그램',rec:'소비 기록',pc:'기본 인증',ac:'고급 인증',gen:'일반',logout:'로그아웃',pwdTitle:'로그인 비밀번호 변경',old:'기존 비밀번호',new:'새 비밀번호',confirmNew:'새 비밀번호 확인',hint:'6~12자의 영문 또는 숫자를 입력하세요',warn:'자금과 거래 보안을 위해 비밀번호 변경 후 24시간 동안 출금이 제한됩니다',confirm:'확인',recTitle:'소비 기록',all:'전체',fiat:'법정화폐 거래',contract:'계약 거래',spot:'현물 거래',noRec:'기록 없음',kycTitle:'신원 인증',nat:'국적',name:'법적 성명',namePh:'실명을 입력하세요',doc:'신분증/여권 번호',docPh:'신분증 또는 여권 번호를 입력하세요',upload:'신분증/여권 업로드',cap1:'신분증 앞면',cap2:'신분증 뒷면',cap3:'신분증을 들고 있는 사진',shot:'촬영 예시',apply:'인증 신청',loading:'로딩 중...',vip:'VIP0',unauth:'미인증',pending:'처리 중',approved:'인증됨',notEligible:'열 수 없음',fill:'모든 항목을 입력하세요',passRule:'비밀번호는 6~12자여야 합니다',passMatch:'비밀번호가 일치하지 않습니다',wrongOld:'기존 비밀번호가 올바르지 않습니다',passDone:'비밀번호가 변경되었습니다',need3:'사진 3장을 모두 업로드하세요',kycDone:'인증 요청이 제출되었습니다',kycPending:'요청이 처리 중입니다',kycApproved:'계정이 인증되었습니다'},th:{safe:'ความปลอดภัย',pwd:'เปลี่ยนรหัสผ่าน',app:'ดาวน์โหลดแอป',ref:'โปรแกรมแนะนำ',rec:'ประวัติการใช้จ่าย',pc:'การยืนยันขั้นต้น',ac:'การยืนยันขั้นสูง',gen:'ทั่วไป',logout:'ออกจากระบบ',pwdTitle:'เปลี่ยนรหัสผ่านเข้าสู่ระบบ',old:'รหัสผ่านเดิม',new:'รหัสผ่านใหม่',confirmNew:'ยืนยันรหัสผ่านใหม่',hint:'กรุณากรอก 6-12 ตัวอักษรหรือตัวเลข',warn:'เพื่อปกป้องเงินทุนและความปลอดภัยในการซื้อขาย การถอนจะถูกจำกัด 24 ชั่วโมงหลังเปลี่ยนรหัสผ่าน',confirm:'ยืนยัน',recTitle:'ประวัติการใช้จ่าย',all:'ทั้งหมด',fiat:'ธุรกรรมเงิน Fiat',contract:'ธุรกรรมสัญญา',spot:'สปอตเทรด',noRec:'ไม่มีบันทึก',kycTitle:'ยืนยันตัวตน KYC',nat:'สัญชาติ',name:'ชื่อจริงตามกฎหมาย',namePh:'กรุณากรอกชื่อจริง',doc:'เลขบัตร/หนังสือเดินทาง',docPh:'กรุณากรอกเลขบัตรหรือพาสปอร์ต',upload:'อัปโหลดบัตร/พาสปอร์ต',cap1:'ด้านหน้าบัตร',cap2:'ด้านหลังบัตร',cap3:'ถือบัตรถ่ายรูป',shot:'ตัวอย่างการถ่าย',apply:'ยื่นขอการยืนยัน',loading:'กำลังโหลด...',vip:'VIP0',unauth:'ยังไม่ยืนยัน',pending:'กำลังดำเนินการ',approved:'ยืนยันแล้ว',notEligible:'ไม่สามารถเปิดได้',fill:'กรุณากรอกทุกช่อง',passRule:'รหัสผ่านต้องมี 6-12 ตัวอักษร',passMatch:'รหัสผ่านไม่ตรงกัน',wrongOld:'รหัสผ่านเดิมไม่ถูกต้อง',passDone:'เปลี่ยนรหัสผ่านสำเร็จ',need3:'กรุณาอัปโหลดรูปทั้ง 3 รูป',kycDone:'ส่งคำขอแล้ว',kycPending:'คำขอของคุณกำลังดำเนินการ',kycApproved:'บัญชีของคุณได้รับการยืนยันแล้ว'},'zh-CN':{safe:'安全',pwd:'修改密码',app:'下载应用',ref:'推荐计划',rec:'消费记录',pc:'初级认证',ac:'高级认证',gen:'通用',logout:'退出登录',pwdTitle:'修改登录密码',old:'旧密码',new:'新密码',confirmNew:'确认新密码',hint:'请输入6-12位字母或数字',warn:'为保护您的资金和交易安全，修改密码后24小时内将限制提现相关操作',confirm:'确认',recTitle:'消费记录',all:'全部',fiat:'法币交易',contract:'合约交易',spot:'现货交易',noRec:'暂无记录',kycTitle:'身份认证',nat:'国籍',name:'法定全名',namePh:'请输入真实姓名',doc:'证件/护照号码',docPh:'请输入证件或护照号码',upload:'上传证件/护照',cap1:'证件正面',cap2:'证件反面',cap3:'手持证件照',shot:'拍摄示例',apply:'提交认证申请',loading:'加载中...',vip:'VIP0',unauth:'未认证',pending:'审核中',approved:'已认证',notEligible:'暂不可用',fill:'请填写所有字段',passRule:'密码必须为6-12位字母或数字',passMatch:'两次密码不一致',wrongOld:'旧密码错误',passDone:'密码修改成功',need3:'请上传3张照片',kycDone:'认证申请已提交',kycPending:'您的申请正在审核中',kycApproved:'您的账户已认证'},'zh-TW':{safe:'安全',pwd:'變更密碼',app:'下載應用程式',ref:'推薦計畫',rec:'消費紀錄',pc:'初級認證',ac:'高級認證',gen:'一般',logout:'登出',pwdTitle:'變更登入密碼',old:'舊密碼',new:'新密碼',confirmNew:'確認新密碼',hint:'請輸入6-12位英數字',warn:'為保護您的資金與交易安全，變更密碼後24小時內將限制提現相關操作',confirm:'確認',recTitle:'消費紀錄',all:'全部',fiat:'法幣交易',contract:'合約交易',spot:'現貨交易',noRec:'暫無紀錄',kycTitle:'身份驗證',nat:'國籍',name:'法定全名',namePh:'請輸入真實姓名',doc:'證件/護照號碼',docPh:'請輸入證件或護照號碼',upload:'上傳證件/護照',cap1:'證件正面',cap2:'證件反面',cap3:'手持證件照',shot:'拍攝範例',apply:'提交認證申請',loading:'載入中...',vip:'VIP0',unauth:'未認證',pending:'審核中',approved:'已認證',notEligible:'暫不可開啟',fill:'請填寫所有欄位',passRule:'密碼必須為6-12位英數字',passMatch:'密碼不一致',wrongOld:'舊密碼錯誤',passDone:'密碼修改成功',need3:'請上傳3張照片',kycDone:'認證申請已提交',kycPending:'您的申請正在審核中',kycApproved:'您的帳戶已認證'}};
const P=document.getElementById('profile-panel');
const $=s=>P.querySelector(s),txt=()=>I[CUR]||I.ar,el=(id,v)=>{let x=P.querySelector('#'+id);if(x)x.textContent=v},pl=(id,v)=>{let x=P.querySelector('#'+id);if(x)x.placeholder=v};
function ts(m){let t=$('#pf-tst');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)}
function genUID(){return Math.floor(1e7+Math.random()*9e7)+''}
function applyKyc(s){let t=txt(),e=$('#pf-pcs');e.classList.remove('r','y','g');if(s==='pending'){e.textContent=t.pending;e.classList.add('y')}else if(s==='approved'){e.textContent=t.approved;e.classList.add('g')}else{e.textContent=t.unauth;e.classList.add('r')}}
function setLang(l){CUR=LS.includes(l)?l:'ar';let t=txt();el('pf-safeSec',t.safe);el('pf-mSafe',t.safe);el('pf-mPwd',t.pwd);el('pf-mApp',t.app);el('pf-mRef',t.ref);el('pf-mRec',t.rec);el('pf-mPc',t.pc);el('pf-mAc',t.ac);el('pf-genSec',t.gen);el('pf-mLogout',t.logout);el('pf-pwdTitle',t.pwdTitle);pl('pf-o',t.old);pl('pf-n',t.new);pl('pf-c',t.confirmNew);el('pf-nh',t.hint);el('pf-ch',t.hint);el('pf-warnTxt',t.warn);el('pf-okb',t.confirm);el('pf-recTitle',t.recTitle);el('pf-noRec',t.noRec);el('pf-kycTitle',t.kycTitle);el('pf-natLbl',t.nat);el('pf-nameLbl',t.name);pl('pf-fn',t.namePh);el('pf-docLbl',t.doc);pl('pf-dn',t.docPh);el('pf-upLbl',t.upload);el('pf-cap1',t.cap1);el('pf-cap2',t.cap2);el('pf-cap3',t.cap3);el('pf-shotLbl',t.shot);el('pf-apb',t.apply);let its=P.querySelectorAll('#pf-dd .it');its[0].textContent=t.all;its[1].textContent=t.fiat;its[2].textContent=t.contract;its[3].textContent=t.spot;let sv=$('#pf-sv'),k=sv.dataset.k;if(k==='all')el('pf-sv',t.all);else if(k==='fiat')el('pf-sv',t.fiat);else if(k==='contract')el('pf-sv',t.contract);else{el('pf-sv',t.spot);sv.dataset.k='spot'}if(!UD||!UD.kyc)applyKyc('none');else applyKyc(UD.kyc)}
function langFromData(d){return d?.lang||d?.language||d?.locale||'ar'}
function renderCountries(){$('#pf-nmn').innerHTML=C.map((v,i)=>'<div class="ni'+(!i?' on':'')+'" data-cn="'+v.replace(/"/g,'&quot;')+'">'+v+'</div>').join('')}
const sw=i=>{P.querySelectorAll('.p').forEach(e=>e.classList.remove('on'));$('#pf-'+i).classList.add('on');let d=$('#pf-dd');d&&d.classList.remove('o');let n=$('#pf-nd');n&&n.classList.remove('o');P.scrollTop=0};
const clr=i=>{let e=$('#'+i);e&&(e.value='')};
const tg=(i,e)=>{let n=$('#'+i),s=n.type==='password';n.type=s?'text':'password';e.innerHTML=s?'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/></svg>':'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg>'};
const tD=()=>$('#pf-dd').classList.toggle('o');
const tN=e=>{e.stopPropagation();$('#pf-nd').classList.toggle('o')};
const pN=(v,t,e)=>{e.stopPropagation();$('#pf-ncv').textContent=v;P.querySelectorAll('#pf-nmn .ni').forEach(x=>x.classList.remove('on'));t.classList.add('on');$('#pf-nd').classList.remove('o')};
const pk=(v,t)=>{let q=txt(),m={All:['all',q.all],'Fiat Transaction':['fiat',q.fiat],'Contract Transaction':['contract',q.contract],'Spot Trading':['spot',q.spot]},r=m[v]||['spot',q.spot];$('#pf-sv').dataset.k=r[0];$('#pf-sv').textContent=r[1];P.querySelectorAll('#pf-dd .it').forEach(e=>e.classList.remove('on'));t.classList.add('on');$('#pf-dd').classList.remove('o');let e=$('#pf-emp');e.innerHTML='<div class="sp"></div>';clearTimeout(T);T=setTimeout(()=>e.innerHTML='<img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div>'+txt().noRec+'</div>',700)};
const cp=async()=>{let t=txt(),o=$('#pf-o').value,n=$('#pf-n').value,c=$('#pf-c').value,b=$('#pf-okb');if(!o||!n||!c)return ts(t.fill);if(!/^[A-Za-z0-9]{6,12}$/.test(n))return ts(t.passRule);if(n!==c)return ts(t.passMatch);try{b.disabled=1;let cr=EmailAuthProvider.credential(U.email,o);await reauthenticateWithCredential(U,cr);await updatePassword(U,n);ts(t.passDone);$('#pf-o').value=$('#pf-n').value=$('#pf-c').value='';setTimeout(()=>sw('home'),1200)}catch(e){ts(e.code==='auth/wrong-password'?t.wrongOld:e.message)}finally{b.disabled=0}};
const op=()=>{let s=UD&&UD.kyc,t=txt();if(s==='pending')return ts(t.kycPending);if(s==='approved')return ts(t.kycApproved);sw('pc')};
const ne=()=>ts(txt().notEligible);
const up=(i,id)=>{let f=i.files[0];if(!f)return;let rd=new FileReader();rd.onload=e=>{UF[id]=e.target.result;$('#'+id).innerHTML='<img src="'+e.target.result+'">'};rd.readAsDataURL(f)};
const ak=async()=>{let t=txt(),fn=$('#pf-fn').value.trim(),dn=$('#pf-dn').value.trim(),nat=$('#pf-ncv').textContent,b=$('#pf-apb');if(!fn||!dn)return ts(t.fill);if(!UF['pf-b1']||!UF['pf-b2']||!UF['pf-b3'])return ts(t.need3);try{b.disabled=1;let payload={uid:U.uid,userDocId:U.uid,userEmail:U.email||'',userUidDisplay:UD?.uid||'',lang:CUR,nationality:nat,fullName:fn,docNumber:dn,front:UF['pf-b1'],back:UF['pf-b2'],hand:UF['pf-b3'],status:'pending',source:'web',createdAt:serverTimestamp(),submittedAt:Date.now()};await addDoc(collection(db,'توثيق'),payload);await updateDoc(doc(db,'users',U.uid),{kyc:'pending',kycData:payload});ts(t.kycDone);setTimeout(()=>sw('home'),1e3)}catch(e){ts(e.message)}finally{b.disabled=0}};
const lg=async()=>{await signOut(au);location.href='login.html'};
const closePanel=()=>{P.classList.remove('open');setTimeout(()=>{P.style.display='none'},350)};
window.openProfile=()=>{P.style.display='block';requestAnimationFrame(()=>P.classList.add('open'))};
P.addEventListener('click',e=>{let t=e.target.closest('[data-act],[data-sw],[data-clr],[data-tg],[data-pk],[data-cn],[data-up]');if(!t){let d=$('#pf-dd'),n=$('#pf-nd');if(d&&!d.contains(e.target))d.classList.remove('o');if(n&&!n.contains(e.target))n.classList.remove('o');return}if(t.dataset.sw)return sw(t.dataset.sw);if(t.dataset.clr)return clr(t.dataset.clr);if(t.dataset.tg)return tg(t.dataset.tg,t);if(t.dataset.pk)return pk(t.dataset.pk,t);if(t.dataset.cn)return pN(t.dataset.cn,t,e);let a=t.dataset.act;if(a==='close')closePanel();else if(a==='cp')cp();else if(a==='op')op();else if(a==='ne')ne();else if(a==='ak')ak();else if(a==='lg')lg();else if(a==='tD')tD();else if(a==='tN')tN(e)});
P.addEventListener('change',e=>{let t=e.target;if(t.dataset.up)up(t,t.dataset.up)});
onAuthStateChanged(au,async u=>{if(!u){location.href='login.html';return}U=u;$('#pf-ue').textContent=u.email||txt().loading;let r=doc(db,'users',u.uid),s=await getDoc(r),d;if(!s.exists()){d={email:u.email,uid:genUID(),kyc:'none',createdAt:serverTimestamp(),lang:'ar'};await setDoc(r,d)}else{d=s.data();if(!d.uid){d.uid=genUID();await updateDoc(r,{uid:d.uid})}}UD=d;setLang(langFromData(d));$('#pf-ue').textContent=u.email||txt().loading;$('#pf-uu').textContent='UID:'+d.uid;renderCountries();onSnapshot(r,sn=>{if(sn.exists()){UD=sn.data();setLang(langFromData(UD));applyKyc(UD.kyc||'none')}})});
setLang('ar');
</script>`});
