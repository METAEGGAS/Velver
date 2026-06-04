<gs-page name="profile">
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.profile-wrap{position:fixed;top:0;right:0;width:35%;height:100vh;background:#000;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#fff;direction:rtl;overflow-y:auto;z-index:9999;animation:slideIn .3s ease-out;box-shadow:-4px 0 20px rgba(0,0,0,.5)}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.profile-wrap *{direction:rtl;box-sizing:border-box}
.profile-wrap input,.profile-wrap button,.profile-wrap select{font:inherit;direction:rtl;text-align:right}
.profile-wrap button,.profile-wrap input{border:0;outline:0}
.profile-wrap .p{display:none;min-height:100vh}
.profile-wrap .p.on{display:block}
.profile-wrap .top{padding:22px 26px 18px;border-bottom:1px solid #161616}
.profile-wrap .bk{width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:none;color:#bfc5ca;cursor:pointer;margin:0 -6px 18px 0}
.profile-wrap .bk svg{width:24px;height:24px;stroke:#bfc5ca;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
.profile-wrap .pr{display:flex;align-items:center;gap:17px}
.profile-wrap .av{width:62px;height:62px;border-radius:50%;object-fit:cover;background:#111}
.profile-wrap .nm{font-size:20px;font-weight:700;line-height:1.25;word-break:break-all}
.profile-wrap .sb{margin-top:5px;font-size:14px;color:#90959c;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.profile-wrap .vb{display:inline-flex;align-items:center;height:22px;padding:0 10px;background:#3d3208;border-radius:11px;color:#fff;font-weight:700;font-size:12px}
.profile-wrap .sec{height:50px;display:flex;align-items:center;padding:0 22px;background:#232523;color:#8f949b;font-size:17px}
.profile-wrap .rw{display:flex;align-items:center;gap:17px;min-height:70px;padding:0 22px;background:#000;color:#fff;width:100%;cursor:pointer}
.profile-wrap .rw:active{background:#121212}
.profile-wrap .ic{width:29px;height:29px;object-fit:contain;flex:0 0 29px;opacity:.95}
.profile-wrap .tx{font-size:20px;font-weight:500;flex:1;text-align:right}
.profile-wrap .ar{width:20px;height:20px}
.profile-wrap .ar svg{width:100%;height:100%;stroke:#9aa0a7;stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.profile-wrap .st{font-size:18px;font-weight:500}
.profile-wrap .st.r{color:#ff4b55}
.profile-wrap .st.y{color:#f5b800}
.profile-wrap .st.g{color:#11b95c}
.profile-wrap .pw{padding:20px 20px 28px}
.profile-wrap .tt{font-size:33px;line-height:1.35;font-weight:500;margin:18px 0 26px}
.profile-wrap .card{background:#353947;border-radius:18px;padding:20px 18px 22px}
.profile-wrap .hero{width:100%;display:flex;justify-content:center;margin:2px 0 18px}
.profile-wrap .hero img{width:70%;max-width:330px}
.profile-wrap .fld{margin:18px 0 10px}
.profile-wrap .ibox{height:78px;background:#222520;border-radius:40px;display:flex;align-items:center;padding:0 16px;gap:12px}
.profile-wrap .ibox input{flex:1;background:none;color:#fff;font-size:18px}
.profile-wrap .ibox input::placeholder{color:#8e939b}
.profile-wrap .act{display:flex;align-items:center;gap:14px}
.profile-wrap .x{width:22px;height:22px;border-radius:50%;background:#d8dbe0;color:#40444a;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;cursor:pointer}
.profile-wrap .eye{width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.profile-wrap .eye svg{width:23px;height:23px;stroke:#aab0b7;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.profile-wrap .hint{color:#a5aab2;font-size:16px;line-height:1.7;padding:10px 8px 0}
.profile-wrap .warn{display:flex;gap:8px;color:#f34d56;font-size:16px;line-height:1.8;padding:16px 8px 0}
.profile-wrap .ok{width:100%;height:64px;margin-top:24px;border-radius:12px;background:#05b246;color:#031b08;font-size:24px;font-weight:500;cursor:pointer}
.profile-wrap .ok:disabled{opacity:.6}
.profile-wrap .rh{position:relative;text-align:center;font-size:20px;padding:20px 0;border-bottom:1px solid #161616}
.profile-wrap .rh .bk{position:absolute;right:14px;left:auto;top:14px;margin:0}
.profile-wrap .dd{margin:18px 16px 0;position:relative}
.profile-wrap .sel{width:100%;height:54px;background:#1b1f1c;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#16b55c;font-size:17px;cursor:pointer;position:relative}
.profile-wrap .sel em{position:absolute;left:18px;right:auto;font-style:normal;transition:.2s;font-size:13px}
.profile-wrap .dd.o .sel{border-radius:14px 14px 0 0}
.profile-wrap .dd.o .sel em{transform:rotate(180deg)}
.profile-wrap .mn{display:none;background:#1b1f1c;border-radius:0 0 14px 14px;overflow:hidden}
.profile-wrap .dd.o .mn{display:block}
.profile-wrap .it{width:100%;padding:16px 20px;background:none;color:#fff;text-align:right;font-size:16px;position:relative;cursor:pointer}
.profile-wrap .it+.it{border-top:1px solid #2e312f}
.profile-wrap .it.on{color:#11b95c}
.profile-wrap .it.on:after{content:"✓";position:absolute;left:18px;right:auto;color:#11b95c}
.profile-wrap .emp{text-align:center;padding:90px 20px 0;color:#a7acb2;font-size:18px}
.profile-wrap .emp img{width:140px;display:block;margin:0 auto 14px}
.profile-wrap .sp{width:34px;height:34px;border:3px solid #21492f;border-top-color:#14c05f;border-radius:50%;margin:50px auto 0;animation:r .8s linear infinite}
.profile-wrap .kyc2{min-height:100vh;background:#0b0b0b;padding:10px 18px 22px}
.profile-wrap .kyh{position:relative;text-align:center;padding:8px 0 14px;font-size:18px;font-weight:500}
.profile-wrap .kyh .bk{position:absolute;right:0;left:auto;top:0;margin:0}
.profile-wrap .kyttl{margin:2px 0 18px}
.profile-wrap .lbl{font-size:14px;color:#fff;margin:0 4px 8px 0}
.profile-wrap .ndd{position:relative;height:54px;background:#191b19;border:1px solid #222;display:flex;align-items:center;padding:0 16px;color:#fff;font-size:16px;cursor:pointer}
.profile-wrap .ndd .cv{flex:1}
.profile-wrap .ndd .cr{color:#9aa0a7;font-size:12px;transition:.2s}
.profile-wrap .ndd.o .cr{transform:rotate(180deg)}
.profile-wrap .nmn{display:none;position:absolute;left:0;right:0;top:100%;z-index:9;background:#191b19;border:1px solid #222;border-top:0;max-height:260px;overflow-y:auto}
.profile-wrap .ndd.o .nmn{display:block}
.profile-wrap .ni{padding:12px 16px;color:#fff;font-size:15px;border-top:1px solid #2a2c2a;cursor:pointer}
.profile-wrap .ni:first-child{border-top:0}
.profile-wrap .ni:hover{background:#222}
.profile-wrap .ni.on{color:#11b95c}
.profile-wrap .round{height:58px;background:#1a1c1a;border-radius:29px;padding:0 16px;display:flex;align-items:center;gap:10px}
.profile-wrap .round input{flex:1;background:none;color:#fff;font-size:16px}
.profile-wrap .round input::placeholder{color:#90959b}
.profile-wrap .cx{width:18px;height:18px;border-radius:50%;background:#d8dbe0;color:#4c5055;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:0 0 18px;cursor:pointer}
.profile-wrap .upl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px}
.profile-wrap .up{display:flex;flex-direction:column;align-items:center}
.profile-wrap .ub{width:100%;aspect-ratio:1/1;background:#5d6584;border:1px dashed #d6d9e8;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.profile-wrap .ub img{width:100%;height:100%;object-fit:cover}
.profile-wrap .cam{width:38px;height:38px}
.profile-wrap .cap{margin-top:10px;font-size:12px;color:#d9d9d9;text-align:center;line-height:1.3;min-height:32px}
.profile-wrap .sh{margin-top:18px;font-size:13px;color:#fff}
.profile-wrap .shex{margin-top:10px;width:100%}
.profile-wrap .shex img{display:block;width:100%;height:auto}
.profile-wrap .ap{margin-top:22px;width:100%;height:66px;background:#08ae43;color:#fff;border-radius:4px;font-size:18px}
.profile-wrap .ap:disabled{opacity:.6}
.profile-wrap .uploader{cursor:pointer}
.profile-wrap .uploader input{display:none}
.profile-wrap .logout{color:#ff4b55}
.profile-wrap .tst{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:12px 22px;border-radius:8px;font-size:15px;z-index:99999;display:none;max-width:90%;text-align:center}
.profile-wrap .tst.on{display:block}
.profile-wrap .gs-close{position:absolute;top:14px;left:14px;width:32px;height:32px;background:rgba(255,255,255,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;cursor:pointer;z-index:10}
@keyframes r{to{transform:rotate(1turn)}}
@media(max-width:900px){.profile-wrap{width:100%}}
@media(max-width:420px){.profile-wrap .nm{font-size:17px}.profile-wrap .tx{font-size:18px}.profile-wrap .st{font-size:16px}.profile-wrap .tt{font-size:26px}.profile-wrap .ibox{height:70px}.profile-wrap .ok{height:58px;font-size:22px}.profile-wrap .kyc2{padding:8px 14px 18px}.profile-wrap .upl{gap:10px}.profile-wrap .ub{min-height:102px}.profile-wrap .ap{height:60px;font-size:17px}}
</style>

<div class="profile-wrap" id="profileWrap">
<span class="gs-close" onclick="gsCloseProfile()">×</span>
<div id="tst" class="tst"></div>

<section id="home" class="p on">
<div class="top">
<button class="bk" onclick="gsCloseProfile()"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button>
<div class="pr"><img class="av" src="https://bdyy365ue.com/h5/css/owner-ufQ69ccO.png"><div><div class="nm" id="ue">loading...</div><div class="sb"><span id="uu">UID:--</span><span class="vb">VIP0</span></div></div></div>
</div>
<div class="sec" id="safeSec">Safe</div>
<button class="rw" onclick="sw('safe')"><img class="ic" src="https://i.ibb.co/pj7R7kQJ/71.png"><span class="tx" id="mSafe">Safe</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw" onclick="sw('safe')"><img class="ic" src="https://i.ibb.co/spfZpcMV/72.png"><span class="tx" id="mPwd">Change Password</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw"><img class="ic" src="https://i.ibb.co/KzbSLLJ1/73.png"><span class="tx" id="mApp">Download App</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw"><img class="ic" src="https://i.ibb.co/rR8JxrfY/74.png"><span class="tx" id="mRef">Referral Program</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button class="rw" onclick="sw('rec')"><img class="ic" src="https://i.ibb.co/fVNQ060d/75.png"><span class="tx" id="mRec">Consume Record</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
<button id="pcb" class="rw" onclick="op()"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="mPc">Primary Certification</span><span id="pcs" class="st r">Unauthenticated</span></button>
<button class="rw" onclick="ne()"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="mAc">Advanced Certification</span><span id="acs" class="st r">Unauthenticated</span></button>
<div class="sec" id="genSec">General</div>
<button class="rw logout"><span class="ic" style="display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="29" height="29" fill="none" stroke="#ff4b55" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg></span><span class="tx" id="mLogout">Logout</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
</section>

<section id="safe" class="p">
<div class="pw">
<button class="bk" onclick="sw('home')"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button>
<div class="tt" id="pwdTitle">Change Login Password</div>
<div class="card">
<div class="hero"><img src="https://www.vipteelxme.com/wap/img/pwd.fbdfd1de.png"></div>
<div class="fld"><div class="ibox"><input id="o" type="password" placeholder="Old Password"><div class="act"><span class="x" onclick="clr('o')">×</span><span class="eye" onclick="tg('o',this)"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div></div>
<div class="fld"><div class="ibox"><input id="n" type="password" placeholder="New Password"><div class="act"><span class="x" onclick="clr('n')">×</span><span class="eye" onclick="tg('n',this)"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div><div class="hint" id="nh">Please enter 6-12 characters, including numbers or letters</div></div>
<div class="fld"><div class="ibox"><input id="c" type="password" placeholder="Confirm New Password"><div class="act"><span class="x" onclick="clr('c')">×</span><span class="eye" onclick="tg('c',this)"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg></span></div></div><div class="hint" id="ch">Please enter 6-12 characters, including numbers or letters</div></div>
<div class="warn"><span>ⓘ</span><span id="warnTxt">To protect your funds and trading security, withdrawal related actions will be restricted for 24 hours after changing the password</span></div>
<button id="okb" class="ok" onclick="cp()">Confirm</button>
</div>
</div>
</section>

<section id="rec" class="p">
<div class="rh"><button class="bk" onclick="sw('home')"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><span id="recTitle">Consume Record</span></div>
<div id="dd" class="dd"><button class="sel" onclick="tD()"><span id="sv">Spot Trading</span><em>▾</em></button><div class="mn"><button class="it" onclick="pk('All',this)">All</button><button class="it" onclick="pk('Fiat Transaction',this)">Fiat Transaction</button><button class="it" onclick="pk('Contract Transaction',this)">Contract Transaction</button><button class="it on" onclick="pk('Spot Trading',this)">Spot Trading</button></div></div>
<div id="emp" class="emp"><img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div id="noRec">No record</div></div>
</section>

<section id="pc" class="p">
<div class="kyc2">
<div class="kyh"><button class="bk" onclick="sw('home')"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><div class="kyttl" id="kycTitle">KYC Authentication</div></div>
<div class="lbl" id="natLbl">Nationality</div>
<div id="nd" class="ndd" onclick="tN(event)"><span id="ncv" class="cv">United States</span><span class="cr">▾</span><div class="nmn" id="nmn"></div></div>
<div class="lbl" style="margin-top:18px" id="nameLbl">Full legal name</div>
<div class="round"><input id="fn" placeholder="Please enter your real name"><span class="cx" onclick="clr('fn')">×</span></div>
<div class="lbl" style="margin-top:16px" id="docLbl">Document/passport number</div>
<div class="round"><input id="dn" placeholder="Please enter your ID/passport number"><span class="cx" onclick="clr('dn')">×</span></div>
<div class="lbl" style="margin-top:16px" id="upLbl">ID photo/upload passport</div>
<div class="upl">
<label class="up uploader"><div class="ub" id="b1"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" onchange="up(this,'b1')"></div><div class="cap" id="cap1">Front page of ID</div></label>
<label class="up uploader"><div class="ub" id="b2"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" onchange="up(this,'b2')"></div><div class="cap" id="cap2">Back page of ID</div></label>
<label class="up uploader"><div class="ub" id="b3"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" onchange="up(this,'b3')"></div><div class="cap" id="cap3">Hand-held of ID photo</div></label>
</div>
<div class="sh" id="shotLbl">Shooting example</div>
<div class="shex"><img src="https://www.vipteelxme.com/wap/img/kyc-demo.b8a3decf.png"></div>
<button id="apb" class="ap" onclick="ak()">Apply for certification</button>
</div>
</section>
</div>

<script type="module">
import{initializeApp}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import{getAuth,onAuthStateChanged,EmailAuthProvider,reauthenticateWithCredential,updatePassword,signOut}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,updateDoc,serverTimestamp,onSnapshot,collection,addDoc}from"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
const cf={apiKey:"AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",authDomain:"hhhxh-5ebe4.firebaseapp.com",projectId:"hhhxh-5ebe4",storageBucket:"hhhxh-5ebe4.firebasestorage.app",messagingSenderId:"79243000696",appId:"1:79243000696:web:ee0fb2d2ccce791954e68d",measurementId:"G-08BR6LN6PT"};
const app=initializeApp(cf),au=getAuth(app),db=getFirestore(app);
let U=null,UD=null,T,UF={b1:null,b2:null,b3:null},CUR='ar';
const LS=['ar','de','fr','pl','ja','ko','th','zh-CN','zh-TW'];
const C=["United States","United Kingdom","Canada","Australia","Germany","France","Italy","Spain","Netherlands","Brazil","Mexico","Argentina","Japan","South Korea","China","India","Saudi Arabia","United Arab Emirates","Turkey","Egypt"];
const I={ar:{safe:'الأمان',pwd:'تغيير كلمة المرور',app:'تنزيل التطبيق',ref:'برنامج الإحالة',rec:'سجل الاستهلاك',pc:'التوثيق الأساسي',ac:'التوثيق المتقدم',gen:'عام',logout:'تسجيل الخروج',pwdTitle:'تغيير كلمة مرور الدخول',old:'كلمة المرور القديمة',new:'كلمة المرور الجديدة',confirmNew:'تأكيد كلمة المرور الجديدة',hint:'أدخل 6 إلى 12 حرفًا أو رقمًا',warn:'لحماية أموالك وأمان التداول، سيتم تقييد عمليات السحب لمدة 24 ساعة بعد تغيير كلمة المرور',confirm:'تأكيد',recTitle:'سجل الاستهلاك',all:'الكل',fiat:'معاملات العملات',contract:'معاملات العقود',spot:'التداول الفوري',noRec:'لا توجد سجلات',kycTitle:'توثيق الهوية',nat:'الجنسية',name:'الاسم القانوني الكامل',namePh:'يرجى إدخال اسمك الحقيقي',doc:'رقم الهوية/جواز السفر',docPh:'يرجى إدخال رقم الهوية أو جواز السفر',upload:'رفع صور الهوية/الجواز',cap1:'الوجه الأمامي للهوية',cap2:'الوجه الخلفي للهوية',cap3:'صورة شخصية مع الهوية',shot:'مثال التصوير',apply:'تقديم طلب التوثيق',loading:'جاري التحميل...',vip:'VIP0',unauth:'غير موثق',pending:'قيد المعالجة',approved:'موثق',notEligible:'غير متاح الفتح',fill:'يرجى تعبئة جميع الحقول',passRule:'كلمة المرور يجب أن تكون 6-12 أحرف أو أرقام',passMatch:'كلمتا المرور غير متطابقتين',wrongOld:'كلمة المرور القديمة غير صحيحة',passDone:'تم تغيير كلمة المرور بنجاح',need3:'يرجى رفع الصور الثلاث كاملة',kycDone:'تم إرسال طلب التوثيق',kycPending:'طلبك قيد المعالجة',kycApproved:'حسابك موثق'},de:{safe:'Sicherheit',pwd:'Passwort ändern',app:'App herunterladen',ref:'Empfehlungsprogramm',rec:'Verbrauchsverlauf',pc:'Primäre Verifizierung',ac:'Erweiterte Verifizierung',gen:'Allgemein',logout:'Abmelden',pwdTitle:'Login-Passwort ändern',old:'Altes Passwort',new:'Neues Passwort',confirmNew:'Neues Passwort bestätigen',hint:'Bitte 6-12 Zeichen mit Zahlen oder Buchstaben eingeben',warn:'Zum Schutz Ihrer Gelder und Handelssicherheit werden Auszahlungen 24 Stunden nach Passwortänderung eingeschränkt',confirm:'Bestätigen',recTitle:'Verbrauchsverlauf',all:'Alle',fiat:'Fiat-Transaktion',contract:'Kontrakt-Transaktion',spot:'Spot-Handel',noRec:'Keine Einträge',kycTitle:'KYC-Verifizierung',nat:'Nationalität',name:'Vollständiger rechtlicher Name',namePh:'Bitte echten Namen eingeben',doc:'Ausweis-/Passnummer',docPh:'Bitte Ausweis- oder Passnummer eingeben',upload:'Ausweisfoto/Pass hochladen',cap1:'Vorderseite des Ausweises',cap2:'Rückseite des Ausweises',cap3:'Foto mit Ausweis in der Hand',shot:'Aufnahmebeispiel',apply:'Verifizierung beantragen',loading:'Wird geladen...',vip:'VIP0',unauth:'Nicht verifiziert',pending:'In Bearbeitung',approved:'Verifiziert',notEligible:'Nicht verfügbar',fill:'Bitte alle Felder ausfüllen',passRule:'Passwort muss 6-12 Zeichen lang sein',passMatch:'Passwörter stimmen nicht überein',wrongOld:'Altes Passwort ist falsch',passDone:'Passwort erfolgreich geändert',need3:'Bitte alle 3 Fotos hochladen',kycDone:'Verifizierungsantrag gesendet',kycPending:'Ihr Antrag wird bearbeitet',kycApproved:'Ihr Konto ist verifiziert'},fr:{safe:'Sécurité',pwd:'Changer le mot de passe',app:'Télécharger l’application',ref:'Programme de parrainage',rec:'Historique de consommation',pc:'Certification primaire',ac:'Certification avancée',gen:'Général',logout:'Déconnexion',pwdTitle:'Changer le mot de passe de connexion',old:'Ancien mot de passe',new:'Nouveau mot de passe',confirmNew:'Confirmer le nouveau mot de passe',hint:'Veuillez saisir 6 à 12 caractères, chiffres ou lettres',warn:'Pour protéger vos fonds et la sécurité des transactions, les retraits seront limités pendant 24 heures après le changement du mot de passe',confirm:'Confirmer',recTitle:'Historique de consommation',all:'Tout',fiat:'Transaction fiduciaire',contract:'Transaction contrat',spot:'Trading spot',noRec:'Aucun enregistrement',kycTitle:'Vérification KYC',nat:'Nationalité',name:'Nom légal complet',namePh:'Veuillez saisir votre vrai nom',doc:'Numéro d’identité/passeport',docPh:'Veuillez saisir votre numéro d’identité ou passeport',upload:'Téléverser la pièce d’identité/le passeport',cap1:'Recto de la pièce',cap2:'Verso de la pièce',cap3:'Photo tenant la pièce d’identité',shot:'Exemple de prise de vue',apply:'Demander la certification',loading:'Chargement...',vip:'VIP0',unauth:'Non certifié',pending:'En cours',approved:'Certifié',notEligible:'Ouverture non disponible',fill:'Veuillez remplir tous les champs',passRule:'Le mot de passe doit contenir 6 à 12 caractères',passMatch:'Les mots de passe ne correspondent pas',wrongOld:'Ancien mot de passe incorrect',passDone:'Mot de passe modifié avec succès',need3:'Veuillez téléverser les 3 photos',kycDone:'Demande envoyée',kycPending:'Votre demande est en cours',kycApproved:'Votre compte est certifié'},pl:{safe:'Bezpieczeństwo',pwd:'Zmień hasło',app:'Pobierz aplikację',ref:'Program poleceń',rec:'Historia zużycia',pc:'Weryfikacja podstawowa',ac:'Weryfikacja zaawansowana',gen:'Ogólne',logout:'Wyloguj',pwdTitle:'Zmień hasło logowania',old:'Stare hasło',new:'Nowe hasło',confirmNew:'Potwierdź nowe hasło',hint:'Wpisz 6-12 znaków: litery lub cyfry',warn:'Aby chronić środki i bezpieczeństwo handlu, wypłaty będą ograniczone przez 24 godziny po zmianie hasła',confirm:'Potwierdź',recTitle:'Historia zużycia',all:'Wszystko',fiat:'Transakcja fiat',contract:'Transakcja kontraktowa',spot:'Handel spot',noRec:'Brak rekordów',kycTitle:'Weryfikacja KYC',nat:'Narodowość',name:'Pełne imię i nazwisko',namePh:'Wpisz prawdziwe imię i nazwisko',doc:'Numer dokumentu/paszportu',docPh:'Wpisz numer dokumentu lub paszportu',upload:'Prześlij zdjęcie dokumentu/paszportu',cap1:'Przód dokumentu',cap2:'Tył dokumentu',cap3:'Zdjęcie z dokumentem w ręku',shot:'Przykład zdjęcia',apply:'Złóż wniosek',loading:'Ładowanie...',vip:'VIP0',unauth:'Niezweryfikowano',pending:'W trakcie',approved:'Zweryfikowano',notEligible:'Niedostępne',fill:'Wypełnij wszystkie pola',passRule:'Hasło musi mieć 6-12 znaków',passMatch:'Hasła nie są takie same',wrongOld:'Stare hasło jest nieprawidłowe',passDone:'Hasło zmienione pomyślnie',need3:'Prześlij wszystkie 3 zdjęcia',kycDone:'Wniosek wysłany',kycPending:'Twój wniosek jest przetwarzany',kycApproved:'Twoje konto jest zweryfikowane'},ja:{safe:'セキュリティ',pwd:'パスワード変更',app:'アプリをダウンロード',ref:'紹介プログラム',rec:'利用履歴',pc:'基本認証',ac:'高度認証',gen:'一般',logout:'ログアウト',pwdTitle:'ログインパスワードを変更',old:'旧パスワード',new:'新しいパスワード',confirmNew:'新しいパスワードを確認',hint:'6〜12文字の英字または数字を入力してください',warn:'資金と取引の安全を守るため、パスワード変更後24時間は出金が制限されます',confirm:'確認',recTitle:'利用履歴',all:'すべて',fiat:'法定通貨取引',contract:'契約取引',spot:'現物取引',noRec:'記録なし',kycTitle:'本人確認',nat:'国籍',name:'正式な氏名',namePh:'本名を入力してください',doc:'身分証/パスポート番号',docPh:'身分証またはパスポート番号を入力してください',upload:'身分証/パスポートをアップロード',cap1:'身分証の表面',cap2:'身分証の裏面',cap3:'身分証を持った写真',shot:'撮影例',apply:'認証を申請',loading:'読み込み中...',vip:'VIP0',unauth:'未認証',pending:'審査中',approved:'認証済み',notEligible:'利用不可',fill:'すべての項目を入力してください',passRule:'パスワードは6〜12文字である必要があります',passMatch:'パスワードが一致しません',wrongOld:'旧パスワードが正しくありません',passDone:'パスワードを変更しました',need3:'3枚の写真をすべてアップロードしてください',kycDone:'申請を送信しました',kycPending:'申請は審査中です',kycApproved:'アカウントは認証済みです'},ko:{safe:'보안',pwd:'비밀번호 변경',app:'앱 다운로드',ref:'추천 프로그램',rec:'소비 기록',pc:'기본 인증',ac:'고급 인증',gen:'일반',logout:'로그아웃',pwdTitle:'로그인 비밀번호 변경',old:'기존 비밀번호',new:'새 비밀번호',confirmNew:'새 비밀번호 확인',hint:'6~12자의 영문 또는 숫자를 입력하세요',warn:'자금과 거래 보안을 위해 비밀번호 변경 후 24시간 동안 출금이 제한됩니다',confirm:'확인',recTitle:'소비 기록',all:'전체',fiat:'법정화폐 거래',contract:'계약 거래',spot:'현물 거래',noRec:'기록 없음',kycTitle:'신원 인증',nat:'국적',name:'법적 성명',namePh:'실명을 입력하세요',doc:'신분증/여권 번호',docPh:'신분증 또는 여권 번호를 입력하세요',upload:'신분증/여권 업로드',cap1:'신분증 앞면',cap2:'신분증 뒷면',cap3:'신분증을 들고 있는 사진',shot:'촬영 예시',apply:'인증 신청',loading:'로딩 중...',vip:'VIP0',unauth:'미인증',pending:'처리 중',approved:'인증됨',notEligible:'열 수 없음',fill:'모든 항목을 입력하세요',passRule:'비밀번호는 6~12자여야 합니다',passMatch:'비밀번호가 일치하지 않습니다',wrongOld:'기존 비밀번호가 올바르지 않습니다',passDone:'비밀번호가 변경되었습니다',need3:'사진 3장을 모두 업로드하세요',kycDone:'인증 요청이 제출되었습니다',kycPending:'요청이 처리 중입니다',kycApproved:'계정이 인증되었습니다'},th:{safe:'ความปลอดภัย',pwd:'เปลี่ยนรหัสผ่าน',app:'ดาวน์โหลดแอป',ref:'โปรแกรมแนะนำ',rec:'ประวัติการใช้จ่าย',pc:'การยืนยันขั้นต้น',ac:'การยืนยันขั้นสูง',gen:'ทั่วไป',logout:'ออกจากระบบ',pwdTitle:'เปลี่ยนรหัสผ่านเข้าสู่ระบบ',old:'รหัสผ่านเดิม',new:'รหัสผ่านใหม่',confirmNew:'ยืนยันรหัสผ่านใหม่',hint:'กรุณากรอก 6-12 ตัวอักษรหรือตัวเลข',warn:'เพื่อปกป้องเงินทุนและความปลอดภัยในการซื้อขาย การถอนจะถูกจำกัด 24 ชั่วโมงหลังเปลี่ยนรหัสผ่าน',confirm:'ยืนยัน',recTitle:'ประวัติการใช้จ่าย',all:'ทั้งหมด',fiat:'ธุรกรรมเงิน Fiat',contract:'ธุรกรรมสัญญา',spot:'สปอตเทรด',noRec:'ไม่มีบันทึก',kycTitle:'ยืนยันตัวตน KYC',nat:'สัญชาติ',name:'ชื่อจริงตามกฎหมาย',namePh:'กรุณากรอกชื่อจริง',doc:'เลขบัตร/หนังสือเดินทาง',docPh:'กรุณากรอกเลขบัตรหรือพาสปอร์ต',upload:'อัปโหลดบัตร/พาสปอร์ต',cap1:'ด้านหน้าบัตร',cap2:'ด้านหลังบัตร',cap3:'ถือบัตรถ่ายรูป',shot:'ตัวอย่างการถ่าย',apply:'ยื่นขอการยืนยัน',loading:'กำลังโหลด...',vip:'VIP0',unauth:'ยังไม่ยืนยัน',pending:'กำลังดำเนินการ',approved:'ยืนยันแล้ว',notEligible:'ไม่สามารถเปิดได้',fill:'กรุณากรอกทุกช่อง',passRule:'รหัสผ่านต้องมี 6-12 ตัวอักษร',passMatch:'รหัสผ่านไม่ตรงกัน',wrongOld:'รหัสผ่านเดิมไม่ถูกต้อง',passDone:'เปลี่ยนรหัสผ่านสำเร็จ',need3:'กรุณาอัปโหลดรูปทั้ง 3 รูป',kycDone:'ส่งคำขอแล้ว',kycPending:'คำขอของคุณกำลังดำเนินการ',kycApproved:'บัญชีของคุณได้รับการยืนยันแล้ว'},'zh-CN':{safe:'安全',pwd:'修改密码',app:'下载应用',ref:'推荐计划',rec:'消费记录',pc:'初级认证',ac:'高级认证',gen:'通用',logout:'退出登录',pwdTitle:'修改登录密码',old:'旧密码',new:'新密码',confirmNew:'确认新密码',hint:'请输入6-12位字母或数字',warn:'为保护您的资金和交易安全，修改密码后24小时内将限制提现相关操作',confirm:'确认',recTitle:'消费记录',all:'全部',fiat:'法币交易',contract:'合约交易',spot:'现货交易',noRec:'暂无记录',kycTitle:'身份认证',nat:'国籍',name:'法定全名',namePh:'请输入真实姓名',doc:'证件/护照号码',docPh:'请输入证件或护照号码',upload:'上传证件/护照',cap1:'证件正面',cap2:'证件反面',cap3:'手持证件照',shot:'拍摄示例',apply:'提交认证申请',loading:'加载中...',vip:'VIP0',unauth:'未认证',pending:'审核中',approved:'已认证',notEligible:'暂不可用',fill:'请填写所有字段',passRule:'密码必须为6-12位字母或数字',passMatch:'两次密码不一致',wrongOld:'旧密码错误',passDone:'密码修改成功',need3:'请上传3张照片',kycDone:'认证申请已提交',kycPending:'您的申请正在审核中',kycApproved:'您的账户已认证'},'zh-TW':{safe:'安全',pwd:'變更密碼',app:'下載應用程式',ref:'推薦計畫',rec:'消費紀錄',pc:'初級認證',ac:'高級認證',gen:'一般',logout:'登出',pwdTitle:'變更登入密碼',old:'舊密碼',new:'新密碼',confirmNew:'確認新密碼',hint:'請輸入6-12位英數字',warn:'為保護您的資金與交易安全，變更密碼後24小時內將限制提現相關操作',confirm:'確認',recTitle:'消費紀錄',all:'全部',fiat:'法幣交易',contract:'合約交易',spot:'現貨交易',noRec:'暫無紀錄',kycTitle:'身份驗證',nat:'國籍',name:'法定全名',namePh:'請輸入真實姓名',doc:'證件/護照號碼',docPh:'請輸入證件或護照號碼',upload:'上傳證件/護照',cap1:'證件正面',cap2:'證件反面',cap3:'手持證件照',shot:'拍攝範例',apply:'提交認證申請',loading:'載入中...',vip:'VIP0',unauth:'未認證',pending:'審核中',approved:'已認證',notEligible:'暫不可開啟',fill:'請填寫所有欄位',passRule:'密碼必須為6-12位英數字',passMatch:'密碼不一致',wrongOld:'舊密碼錯誤',passDone:'密碼修改成功',need3:'請上傳3張照片',kycDone:'認證申請已提交',kycPending:'您的申請正在審核中',kycApproved:'您的帳戶已認證'}};
const W=document.getElementById('profileWrap');
const $=s=>W.querySelector(s),txt=()=>I[CUR]||I.ar,el=(id,v)=>{let x=W.querySelector('#'+id);if(x)x.textContent=v},pl=(id,v)=>{let x=W.querySelector('#'+id);if(x)x.placeholder=v};
function ts(m){let t=$('#tst');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)}
function genUID(){return Math.floor(1e7+Math.random()*9e7)+''}
function applyKyc(s){let t=txt(),e=$('#pcs');e.classList.remove('r','y','g');if(s==='pending'){e.textContent=t.pending;e.classList.add('y')}else if(s==='approved'){e.textContent=t.approved;e.classList.add('g')}else{e.textContent=t.unauth;e.classList.add('r')}}
function setLang(l){CUR=LS.includes(l)?l:'ar';let t=txt();W.setAttribute('lang',CUR);el('safeSec',t.safe);el('mSafe',t.safe);el('mPwd',t.pwd);el('mApp',t.app);el('mRef',t.ref);el('mRec',t.rec);el('mPc',t.pc);el('mAc',t.ac);el('genSec',t.gen);el('mLogout',t.logout);el('pwdTitle',t.pwdTitle);pl('o',t.old);pl('n',t.new);pl('c',t.confirmNew);el('nh',t.hint);el('ch',t.hint);el('warnTxt',t.warn);el('okb',t.confirm);el('recTitle',t.recTitle);el('noRec',t.noRec);el('kycTitle',t.kycTitle);el('natLbl',t.nat);el('nameLbl',t.name);pl('fn',t.namePh);el('docLbl',t.doc);pl('dn',t.docPh);el('upLbl',t.upload);el('cap1',t.cap1);el('cap2',t.cap2);el('cap3',t.cap3);el('shotLbl',t.shot);el('apb',t.apply);W.querySelectorAll('#dd .it')[0].textContent=t.all;W.querySelectorAll('#dd .it')[1].textContent=t.fiat;W.querySelectorAll('#dd .it')[2].textContent=t.contract;W.querySelectorAll('#dd .it')[3].textContent=t.spot;if($('#sv').dataset.k==='all')el('sv',t.all);else if($('#sv').dataset.k==='fiat')el('sv',t.fiat);else if($('#sv').dataset.k==='contract')el('sv',t.contract);else{el('sv',t.spot);$('#sv').dataset.k='spot'}if(!UD||!UD.kyc)applyKyc('none');else applyKyc(UD.kyc)}
function langFromData(d){return d?.lang||d?.language||d?.locale||'ar'}
function renderCountries(){let h=C.map((v,i)=>`<div class="ni${!i?' on':''}" onclick="pN('${v.replace(/'/g,"\\'")}',this,event)">${v}</div>`).join('');$('#nmn').innerHTML=h}
onAuthStateChanged(au,async u=>{if(!u){if(window.injectpage)window.injectpage('login');else location.href='login.html';return}U=u;$('#ue').textContent=u.email||txt().loading;let r=doc(db,'users',u.uid),s=await getDoc(r),d;if(!s.exists()){d={email:u.email,uid:genUID(),kyc:'none',createdAt:serverTimestamp(),lang:'ar'};await setDoc(r,d)}else{d=s.data();if(!d.uid){d.uid=genUID();await updateDoc(r,{uid:d.uid})}}UD=d;setLang(langFromData(d));$('#ue').textContent=u.email||txt().loading;$('#uu').textContent='UID:'+d.uid;renderCountries();onSnapshot(r,sn=>{if(sn.exists()){UD=sn.data();setLang(langFromData(UD));applyKyc(UD.kyc||'none')}})});
window.cp=async()=>{let t=txt(),o=$('#o').value,n=$('#n').value,c=$('#c').value,b=$('#okb');if(!o||!n||!c)return ts(t.fill);if(!/^[A-Za-z0-9]{6,12}$/.test(n))return ts(t.passRule);if(n!==c)return ts(t.passMatch);try{b.disabled=1;let cr=EmailAuthProvider.credential(U.email,o);await reauthenticateWithCredential(U,cr);await updatePassword(U,n);ts(t.passDone);$('#o').value=$('#n').value=$('#c').value='';setTimeout(()=>sw('home'),1200)}catch(e){ts(e.code==='auth/wrong-password'?t.wrongOld:e.message)}finally{b.disabled=0}};
window.op=()=>{let s=UD&&UD.kyc,t=txt();if(s==='pending')return ts(t.kycPending);if(s==='approved')return ts(t.kycApproved);sw('pc')};
window.ne=()=>ts(txt().notEligible);
window.up=(i,id)=>{let f=i.files[0];if(!f)return;let rd=new FileReader();rd.onload=e=>{UF[id]=e.target.result;$('#'+id).innerHTML='<img src="'+e.target.result+'">'};rd.readAsDataURL(f)};
window.ak=async()=>{let t=txt(),fn=$('#fn').value.trim(),dn=$('#dn').value.trim(),nat=$('#ncv').textContent,b=$('#apb');if(!fn||!dn)return ts(t.fill);if(!UF.b1||!UF.b2||!UF.b3)return ts(t.need3);try{b.disabled=1;let payload={uid:U.uid,userDocId:U.uid,userEmail:U.email||'',userUidDisplay:UD?.uid||'',lang:CUR,nationality:nat,fullName:fn,docNumber:dn,front:UF.b1,back:UF.b2,hand:UF.b3,status:'pending',source:'web',createdAt:serverTimestamp(),submittedAt:Date.now()};await addDoc(collection(db,'توثيق'),payload);await updateDoc(doc(db,'users',U.uid),{kyc:'pending',kycData:payload});ts(t.kycDone);setTimeout(()=>sw('home'),1e3)}catch(e){ts(e.message)}finally{b.disabled=0}};
window.lg=async()=>{await signOut(au);if(window.injectpage)window.injectpage('login');else location.href='login.html'};
window.sw=i=>{W.querySelectorAll('.p').forEach(e=>e.classList.remove('on'));$('#'+i).classList.add('on');$('#dd')&&$('#dd').classList.remove('o');$('#nd')&&$('#nd').classList.remove('o');W.scrollTo(0,0)};
window.clr=i=>{let e=$('#'+i);e&&(e.value='')};
window.tg=(i,e)=>{let n=$('#'+i),s=n.type=='password';n.type=s?'text':'password';e.innerHTML=s?'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/></svg>':'<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg>'};
window.tD=()=>$('#dd').classList.toggle('o');
window.tN=e=>{e.stopPropagation();$('#nd').classList.toggle('o')};
window.pN=(v,t,e)=>{e.stopPropagation();$('#ncv').textContent=v;W.querySelectorAll('#nmn .ni').forEach(x=>x.classList.remove('on'));t.classList.add('on');$('#nd').classList.remove('o')};
window.pk=(v,t)=>{let q=txt(),m={All:['all',q.all],'Fiat Transaction':['fiat',q.fiat],'Contract Transaction':['contract',q.contract],'Spot Trading':['spot',q.spot],[q.all]:['all',q.all],[q.fiat]:['fiat',q.fiat],[q.contract]:['contract',q.contract],[q.spot]:['spot',q.spot]},r=m[v]||['spot',q.spot];$('#sv').dataset.k=r[0];$('#sv').textContent=r[1];W.querySelectorAll('.it').forEach(e=>e.classList.remove('on'));t.classList.add('on');$('#dd').classList.remove('o');let e=$('#emp');e.innerHTML='<div class="sp"></div>';clearTimeout(T);T=setTimeout(()=>e.innerHTML='<img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div>'+txt().noRec+'</div>',700)};
window.gsCloseProfile=()=>{let p=document.getElementById('profileWrap');if(p){p.style.animation='slideOut .3s ease-in forwards';setTimeout(()=>p.remove(),300)}};
if(!document.getElementById('gs-slideout-style')){let s=document.createElement('style');s.id='gs-slideout-style';s.textContent='@keyframes slideOut{from{transform:translateX(0)}to{transform:translateX(100%)}}';document.head.appendChild(s)}
W.querySelector('.logout').addEventListener('click',()=>window.lg());
W.addEventListener('click',e=>{let d=$('#dd'),n=$('#nd');d&&!d.contains(e.target)&&d.classList.remove('o');n&&!n.contains(e.target)&&n.classList.remove('o')});
setLang('ar');
</script>
</gs-page>
