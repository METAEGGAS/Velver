(()=>{const A=window.App||{},W=window,D=document,C=["United States","United Kingdom","Canada","Australia","Germany","France","Italy","Spain","Netherlands","Brazil","Mexico","Argentina","Japan","South Korea","China","India","Saudi Arabia","United Arab Emirates","Turkey","Egypt"],L={ar:{safe:"الأمان",pwd:"تغيير كلمة المرور",app:"تنزيل التطبيق",ref:"برنامج الإحالة",rec:"سجل الاستهلاك",pc:"التوثيق الأساسي",ac:"التوثيق المتقدم",gen:"عام",logout:"تسجيل الخروج",pwdTitle:"تغيير كلمة مرور الدخول",old:"كلمة المرور القديمة",new:"كلمة المرور الجديدة",confirmNew:"تأكيد كلمة المرور الجديدة",hint:"أدخل 6 إلى 12 حرفًا أو رقمًا",warn:"لحماية أموالك وأمان التداول، سيتم تقييد عمليات السحب لمدة 24 ساعة بعد تغيير كلمة المرور",confirm:"تأكيد",recTitle:"سجل الاستهلاك",all:"الكل",fiat:"معاملات العملات",contract:"معاملات العقود",spot:"التداول الفوري",noRec:"لا توجد سجلات",kycTitle:"توثيق الهوية",nat:"الجنسية",name:"الاسم القانوني الكامل",namePh:"يرجى إدخال اسمك الحقيقي",doc:"رقم الهوية/جواز السفر",docPh:"يرجى إدخال رقم الهوية أو جواز السفر",upload:"رفع صور الهوية/الجواز",cap1:"الوجه الأمامي للهوية",cap2:"الوجه الخلفي للهوية",cap3:"صورة شخصية مع الهوية",shot:"مثال التصوير",apply:"تقديم طلب التوثيق",loading:"جاري التحميل...",vip:"VIP0",unauth:"غير موثق",pending:"قيد المعالجة",approved:"موثق",notEligible:"غير متاح الفتح",fill:"يرجى تعبئة جميع الحقول",passRule:"كلمة المرور يجب أن تكون 6-12 أحرف أو أرقام",passMatch:"كلمتا المرور غير متطابقتين",wrongOld:"كلمة المرور القديمة غير صحيحة",passDone:"تم تغيير كلمة المرور بنجاح",need3:"يرجى رفع الصور الثلاث كاملة",kycDone:"تم إرسال طلب التوثيق",kycPending:"طلبك قيد المعالجة",kycApproved:"حسابك موثق"},en:{safe:"Safe",pwd:"Change Password",app:"Download App",ref:"Referral Program",rec:"Consume Record",pc:"Primary Certification",ac:"Advanced Certification",gen:"General",logout:"Logout",pwdTitle:"Change Login Password",old:"Old Password",new:"New Password",confirmNew:"Confirm New Password",hint:"Please enter 6-12 characters, including numbers or letters",warn:"To protect your funds and trading security, withdrawal related actions will be restricted for 24 hours after changing the password",confirm:"Confirm",recTitle:"Consume Record",all:"All",fiat:"Fiat Transaction",contract:"Contract Transaction",spot:"Spot Trading",noRec:"No record",kycTitle:"KYC Authentication",nat:"Nationality",name:"Full legal name",namePh:"Please enter your real name",doc:"Document/passport number",docPh:"Please enter your ID/passport number",upload:"ID photo/upload passport",cap1:"Front page of ID",cap2:"Back page of ID",cap3:"Hand-held of ID photo",shot:"Shooting example",apply:"Apply for certification",loading:"Loading...",vip:"VIP0",unauth:"Unauthenticated",pending:"Pending",approved:"Authenticated",notEligible:"Not available",fill:"Please fill in all fields",passRule:"Password must be 6-12 letters or numbers",passMatch:"Passwords do not match",wrongOld:"Old password is incorrect",passDone:"Password changed successfully",need3:"Please upload all 3 photos",kycDone:"Verification request submitted",kycPending:"Your request is under review",kycApproved:"Your account is verified"}},S=()=>W.__PF||(W.__PF={UF:{b1:null,b2:null,b3:null}}),lang=v=>/^ar/i.test((v||"").trim())?"ar":"en",T=()=>L[lang((S().UD||{}).lang||A.lang||"ar")]||L.ar,$=i=>D.getElementById(i),txt=(i,v)=>$(i)&&($(i).textContent=v),ph=(i,v)=>$(i)&&($(i).placeholder=v),uid=()=>Math.floor(1e7+9e7*Math.random())+"",toast=m=>{let x=$("tst");if(!x)return;x.textContent=m;x.classList.add("on");clearTimeout(S().tt);S().tt=setTimeout(()=>x.classList.remove("on"),2200)},eyeSvg=o=>o?`<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/></svg>`:`<svg viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.8"/><path d="M3 3l18 18"/></svg>`,H=`<style>
#pf,#pf *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
#pf,#pf *{direction:rtl!important}
#pf{margin:0;min-height:100vh;background:#000;color:#fff;font-family:Tahoma,Arial,sans-serif;overflow-x:hidden;padding:calc(env(safe-area-inset-top,0px) + 18px) 0 calc(env(safe-area-inset-bottom,0px) + 22px)}
#pf button,#pf input,#pf select{font:inherit;border:0;outline:0;background:none;color:inherit;direction:inherit;text-align:right}
#pf .app{width:100%;max-width:563px;min-height:calc(100vh - 40px);margin:0 auto;background:#000;overflow:hidden;position:relative;padding-top:8px}
#pf .p{display:none;min-height:100%;padding-bottom:16px}
#pf .p.on{display:block}
#pf .top{padding:18px 20px 16px;border-bottom:1px solid #161616}
#pf .bk{width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:none;color:#bfc5ca;cursor:pointer;margin:0 0 16px}
#pf .bk svg{width:24px;height:24px;stroke:#bfc5ca;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round}
#pf .pr{display:flex;align-items:center;gap:15px}
#pf .av{width:62px;height:62px;border-radius:50%;object-fit:cover;background:#111;flex:0 0 62px}
#pf .nm{font-size:20px;font-weight:700;line-height:1.25;word-break:break-word}
#pf .sb{margin-top:6px;font-size:14px;color:#90959c;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#pf .vb{display:inline-flex;align-items:center;height:22px;padding:0 10px;background:#3d3208;border-radius:11px;color:#fff;font-weight:700;font-size:12px}
#pf .sec{height:48px;display:flex;align-items:center;padding:0 20px;background:#232523;color:#8f949b;font-size:16px;margin-top:8px}
#pf .rw{display:flex;align-items:center;gap:16px;min-height:68px;padding:0 20px;background:#000;color:#fff;width:100%;cursor:pointer}
#pf .rw:active{background:#121212}
#pf .ic{width:28px;height:28px;object-fit:contain;flex:0 0 28px;opacity:.96;display:flex;align-items:center;justify-content:center}
#pf .tx{font-size:19px;font-weight:500;flex:1;text-align:right}
#pf .ar{width:20px;height:20px;display:flex;align-items:center;justify-content:center}
#pf .ar svg{width:100%;height:100%;stroke:#9aa0a7;stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
#pf .st{font-size:17px;font-weight:500}
#pf .st.r{color:#ff4b55}#pf .st.y{color:#f5b800}#pf .st.g{color:#11b95c}
#pf .pw{padding:18px 16px 28px}
#pf .tt{font-size:30px;line-height:1.35;font-weight:600;margin:12px 0 22px}
#pf .card{background:#353947;border-radius:18px;padding:18px 16px 22px}
#pf .hero{width:100%;display:flex;justify-content:center;margin:2px 0 18px}
#pf .hero img{width:70%;max-width:330px}
#pf .fld{margin:16px 0 10px}
#pf .ibox{height:74px;background:#222520;border-radius:38px;display:flex;align-items:center;padding:0 16px;gap:12px}
#pf .ibox input{flex:1;color:#fff;font-size:18px}
#pf .ibox input::placeholder{color:#8e939b}
#pf .act{display:flex;align-items:center;gap:14px}
#pf .x{width:22px;height:22px;border-radius:50%;background:#d8dbe0;color:#40444a;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;cursor:pointer}
#pf .eye{width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer}
#pf .eye svg{width:23px;height:23px;stroke:#aab0b7;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
#pf .hint{color:#a5aab2;font-size:15px;line-height:1.7;padding:10px 8px 0}
#pf .warn{display:flex;gap:8px;color:#f34d56;font-size:15px;line-height:1.8;padding:16px 8px 0}
#pf .ok{width:100%;height:60px;margin-top:24px;border-radius:12px;background:#05b246;color:#031b08;font-size:22px;font-weight:700;cursor:pointer}
#pf .ok:disabled,#pf .ap:disabled{opacity:.6}
#pf .rh{position:relative;text-align:center;font-size:20px;padding:18px 0;border-bottom:1px solid #161616}
#pf .rh .bk{position:absolute;right:14px;top:10px;margin:0}
#pf .dd{margin:18px 16px 0;position:relative}
#pf .sel{width:100%;height:54px;background:#1b1f1c;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#16b55c;font-size:17px;cursor:pointer;position:relative}
#pf .sel em{position:absolute;left:18px;font-style:normal;transition:.2s;font-size:13px}
#pf .dd.o .sel{border-radius:14px 14px 0 0}
#pf .dd.o .sel em{transform:rotate(180deg)}
#pf .mn{display:none;background:#1b1f1c;border-radius:0 0 14px 14px;overflow:hidden}
#pf .dd.o .mn{display:block}
#pf .it{width:100%;padding:16px 20px;background:none;color:#fff;text-align:right;font-size:16px;position:relative;cursor:pointer}
#pf .it+.it{border-top:1px solid #2e312f}
#pf .it.on{color:#11b95c}
#pf .it.on:after{content:"✓";position:absolute;left:18px;color:#11b95c}
#pf .emp{text-align:center;padding:80px 20px 0;color:#a7acb2;font-size:18px}
#pf .emp img{width:140px;display:block;margin:0 auto 14px}
#pf .sp{width:34px;height:34px;border:3px solid #21492f;border-top-color:#14c05f;border-radius:50%;margin:50px auto 0;animation:pfr .8s linear infinite}
#pf .kyc2{min-height:100%;background:#0b0b0b;padding:12px 16px 22px}
#pf .kyh{position:relative;text-align:center;padding:6px 0 14px;font-size:18px;font-weight:600}
#pf .kyh .bk{position:absolute;right:0;top:0;margin:0}
#pf .kyttl{margin:2px 0 18px}
#pf .lbl{font-size:14px;color:#fff;margin:0 4px 8px 0}
#pf .ndd{position:relative;height:54px;background:#191b19;border:1px solid #222;display:flex;align-items:center;padding:0 16px;color:#fff;font-size:16px;cursor:pointer}
#pf .ndd .cv{flex:1}
#pf .ndd .cr{color:#9aa0a7;font-size:12px;transition:.2s}
#pf .ndd.o .cr{transform:rotate(180deg)}
#pf .nmn{display:none;position:absolute;left:0;right:0;top:100%;z-index:9;background:#191b19;border:1px solid #222;border-top:0;max-height:260px;overflow-y:auto}
#pf .ndd.o .nmn{display:block}
#pf .ni{padding:12px 16px;color:#fff;font-size:15px;border-top:1px solid #2a2c2a;cursor:pointer}
#pf .ni:first-child{border-top:0}
#pf .ni:hover{background:#222}
#pf .ni.on{color:#11b95c}
#pf .round{height:56px;background:#1a1c1a;border-radius:28px;padding:0 16px;display:flex;align-items:center;gap:10px}
#pf .round input{flex:1;background:none;color:#fff;font-size:16px}
#pf .round input::placeholder{color:#90959b}
#pf .cx{width:18px;height:18px;border-radius:50%;background:#d8dbe0;color:#4c5055;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:0 0 18px;cursor:pointer}
#pf .upl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px}
#pf .up{display:flex;flex-direction:column;align-items:center}
#pf .ub{width:100%;aspect-ratio:1/1;background:#5d6584;border:1px dashed #d6d9e8;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
#pf .ub img{width:100%;height:100%;object-fit:cover}
#pf .cam{width:38px;height:38px}
#pf .cap{margin-top:10px;font-size:12px;color:#d9d9d9;text-align:center;line-height:1.3;min-height:32px}
#pf .sh{margin-top:18px;font-size:13px;color:#fff}
#pf .shex{margin-top:10px;width:100%}
#pf .shex img{display:block;width:100%;height:auto}
#pf .ap{margin-top:22px;width:100%;height:62px;background:#08ae43;color:#fff;border-radius:8px;font-size:18px;font-weight:700}
#pf .uploader{cursor:pointer}
#pf .uploader input{display:none}
#pf .logout{color:#ff4b55}
#pf .tst{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:12px 22px;border-radius:8px;font-size:15px;z-index:99;display:none;max-width:90%;text-align:center}
#pf .tst.on{display:block}
@keyframes pfr{to{transform:rotate(1turn)}}
@media(max-width:420px){
#pf{padding-top:calc(env(safe-area-inset-top,0px) + 14px)}
#pf .app{padding-top:6px}
#pf .top{padding:16px 14px 14px}
#pf .pr{gap:12px}
#pf .av{width:56px;height:56px;flex-basis:56px}
#pf .nm{font-size:17px}
#pf .tx{font-size:17px}
#pf .st{font-size:15px}
#pf .tt{font-size:25px}
#pf .ibox{height:68px}
#pf .ok{height:56px;font-size:21px}
#pf .pw{padding:16px 12px 24px}
#pf .kyc2{padding:10px 12px 18px}
#pf .upl{gap:10px}
#pf .ap{height:58px;font-size:17px}
}
</style>
<div id="pf"><div class="app">
<div id="tst" class="tst"></div>

<section id="home" class="p on">
  <div class="top">
    <button class="bk" data-a="back"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button>
    <div class="pr">
      <img class="av" src="https://bdyy365ue.com/h5/css/owner-ufQ69ccO.png">
      <div>
        <div class="nm" id="ue">loading...</div>
        <div class="sb"><span id="uu">UID:--</span><span class="vb" id="vip">VIP0</span></div>
      </div>
    </div>
  </div>

  <div class="sec" id="safeSec">Safe</div>
  <button class="rw" data-a="safe"><img class="ic" src="https://i.ibb.co/pj7R7kQJ/71.png"><span class="tx" id="mSafe">Safe</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
  <button class="rw" data-a="safe"><img class="ic" src="https://i.ibb.co/spfZpcMV/72.png"><span class="tx" id="mPwd">Change Password</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
  <button class="rw"><img class="ic" src="https://i.ibb.co/KzbSLLJ1/73.png"><span class="tx" id="mApp">Download App</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
  <button class="rw"><img class="ic" src="https://i.ibb.co/rR8JxrfY/74.png"><span class="tx" id="mRef">Referral Program</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
  <button class="rw" data-a="rec"><img class="ic" src="https://i.ibb.co/fVNQ060d/75.png"><span class="tx" id="mRec">Consume Record</span><span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span></button>
  <button id="pcb" class="rw" data-a="op"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="mPc">Primary Certification</span><span id="pcs" class="st r">Unauthenticated</span></button>
  <button class="rw" data-a="ne"><img class="ic" src="https://i.ibb.co/spHzKqyk/76.png"><span class="tx" id="mAc">Advanced Certification</span><span id="acs" class="st r">Unauthenticated</span></button>

  <div class="sec" id="genSec">General</div>
  <button class="rw logout" data-a="logout">
    <span class="ic"><svg viewBox="0 0 24 24" width="29" height="29" fill="none" stroke="#ff4b55" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg></span>
    <span class="tx" id="mLogout">Logout</span>
    <span class="ar"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></span>
  </button>
</section>

<section id="safe" class="p">
  <div class="pw">
    <button class="bk" data-a="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button>
    <div class="tt" id="pwdTitle">Change Login Password</div>
    <div class="card">
      <div class="hero"><img src="https://www.vipteelxme.com/wap/img/pwd.fbdfd1de.png"></div>

      <div class="fld">
        <div class="ibox">
          <input id="o" type="password" placeholder="Old Password">
          <div class="act"><span class="x" data-clr="o">×</span><span class="eye" data-eye="o">${eyeSvg(0)}</span></div>
        </div>
      </div>

      <div class="fld">
        <div class="ibox">
          <input id="n" type="password" placeholder="New Password">
          <div class="act"><span class="x" data-clr="n">×</span><span class="eye" data-eye="n">${eyeSvg(0)}</span></div>
        </div>
        <div class="hint" id="nh">Please enter 6-12 characters, including numbers or letters</div>
      </div>

      <div class="fld">
        <div class="ibox">
          <input id="c" type="password" placeholder="Confirm New Password">
          <div class="act"><span class="x" data-clr="c">×</span><span class="eye" data-eye="c">${eyeSvg(0)}</span></div>
        </div>
        <div class="hint" id="ch">Please enter 6-12 characters, including numbers or letters</div>
      </div>

      <div class="warn"><span>ⓘ</span><span id="warnTxt">To protect your funds and trading security, withdrawal related actions will be restricted for 24 hours after changing the password</span></div>
      <button id="okb" class="ok" data-a="cp">Confirm</button>
    </div>
  </div>
</section>

<section id="rec" class="p">
  <div class="rh"><button class="bk" data-a="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><span id="recTitle">Consume Record</span></div>
  <div id="dd" class="dd">
    <button class="sel" data-a="td"><span id="sv" data-k="spot">Spot Trading</span><em>▾</em></button>
    <div class="mn">
      <button class="it" data-k="all">All</button>
      <button class="it" data-k="fiat">Fiat Transaction</button>
      <button class="it" data-k="contract">Contract Transaction</button>
      <button class="it on" data-k="spot">Spot Trading</button>
    </div>
  </div>
  <div id="emp" class="emp"><img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div id="noRec">No record</div></div>
</section>

<section id="pc" class="p">
  <div class="kyc2">
    <div class="kyh"><button class="bk" data-a="home"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><div class="kyttl" id="kycTitle">KYC Authentication</div></div>
    <div class="lbl" id="natLbl">Nationality</div>
    <div id="nd" class="ndd" data-a="tn"><span id="ncv" class="cv">United States</span><span class="cr">▾</span><div class="nmn" id="nmn"></div></div>

    <div class="lbl" style="margin-top:18px" id="nameLbl">Full legal name</div>
    <div class="round"><input id="fn" placeholder="Please enter your real name"><span class="cx" data-clr="fn">×</span></div>

    <div class="lbl" style="margin-top:16px" id="docLbl">Document/passport number</div>
    <div class="round"><input id="dn" placeholder="Please enter your ID/passport number"><span class="cx" data-clr="dn">×</span></div>

    <div class="lbl" style="margin-top:16px" id="upLbl">ID photo/upload passport</div>
    <div class="upl">
      <label class="up uploader"><div class="ub" id="b1"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="b1"></div><div class="cap" id="cap1">Front page of ID</div></label>
      <label class="up uploader"><div class="ub" id="b2"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="b2"></div><div class="cap" id="cap2">Back page of ID</div></label>
      <label class="up uploader"><div class="ub" id="b3"><svg class="cam" viewBox="0 0 64 64"><path fill="#f2f2f2" d="M18 22h7l4-5h6l4 5h7c3 0 5 2 5 5v17c0 3-2 5-5 5H18c-3 0-5-2-5-5V27c0-3 2-5 5-5z"/><circle cx="32" cy="35.5" r="9" fill="#6f7786"/><rect x="24" y="19" width="8" height="4" rx="1" fill="#f2f2f2"/></svg><input type="file" accept="image/*" data-up="b3"></div><div class="cap" id="cap3">Hand-held of ID photo</div></label>
    </div>

    <div class="sh" id="shotLbl">Shooting example</div>
    <div class="shex"><img src="https://www.vipteelxme.com/wap/img/kyc-demo.b8a3decf.png"></div>
    <button id="apb" class="ap" data-a="ak">Apply for certification</button>
  </div>
</section>

</div></div>`,fillCountries=()=>{let x=$("nmn");if(!x||x.dataset.ok)return;x.innerHTML=C.map((v,i)=>`<div class="ni${i?"":" on"}" data-v="${v.replace(/"/g,"&quot;")}">${v}</div>`).join("");x.dataset.ok=1},setStatus=s=>{let t=T(),p=$("pcs"),a=$("acs");[p,a].forEach(x=>x&&(x.className="st r",x.textContent=t.unauth));if(!p)return;s==="pending"&&(p.className="st y",p.textContent=t.pending);s==="approved"&&(p.className="st g",p.textContent=t.approved)},applyText=()=>{let t=T(),sv=$("sv"),m={all:t.all,fiat:t.fiat,contract:t.contract,spot:t.spot};txt("safeSec",t.safe);txt("mSafe",t.safe);txt("mPwd",t.pwd);txt("mApp",t.app);txt("mRef",t.ref);txt("mRec",t.rec);txt("mPc",t.pc);txt("mAc",t.ac);txt("genSec",t.gen);txt("mLogout",t.logout);txt("pwdTitle",t.pwdTitle);ph("o",t.old);ph("n",t.new);ph("c",t.confirmNew);txt("nh",t.hint);txt("ch",t.hint);txt("warnTxt",t.warn);txt("okb",t.confirm);txt("recTitle",t.recTitle);txt("noRec",t.noRec);txt("kycTitle",t.kycTitle);txt("natLbl",t.nat);txt("nameLbl",t.name);ph("fn",t.namePh);txt("docLbl",t.doc);ph("dn",t.docPh);txt("upLbl",t.upload);txt("cap1",t.cap1);txt("cap2",t.cap2);txt("cap3",t.cap3);txt("shotLbl",t.shot);txt("apb",t.apply);txt("vip",t.vip);D.querySelectorAll("#dd .it").forEach(b=>b.textContent=m[b.dataset.k]||b.textContent);if(sv){sv.textContent=m[sv.dataset.k||"spot"]||t.spot;sv.dataset.k=sv.dataset.k||"spot"}setStatus((S().UD||{}).kyc||"none");$("uu")&&( $("uu").textContent="UID:"+((S().UD||{}).uid||"--") );$("ue")&&( $("ue").textContent=(S().U&&S().U.email)||t.loading )},nav=id=>{D.querySelectorAll("#pf .p").forEach(x=>x.classList.remove("on"));$(id)&&$(id).classList.add("on");$("dd")&&$("dd").classList.remove("o");$("nd")&&$("nd").classList.remove("o");W.scrollTo?.(0,0);document.scrollingElement?.scrollTo?.(0,0)},toggleEye=(id,el)=>{let x=$(id);if(!x)return;let o=x.type==="password";x.type=o?"text":"password";el.innerHTML=eyeSvg(o)},pickRec=k=>{let t=T(),m={all:t.all,fiat:t.fiat,contract:t.contract,spot:t.spot},sv=$("sv"),emp=$("emp");sv&&(sv.dataset.k=k,sv.textContent=m[k]||t.spot);D.querySelectorAll("#dd .it").forEach(x=>x.classList.toggle("on",x.dataset.k===k));$("dd")&&$("dd").classList.remove("o");if(emp){emp.innerHTML='<div class="sp"></div>';clearTimeout(S().rt);S().rt=setTimeout(()=>emp.innerHTML=`<img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png"><div>${T().noRec}</div>`,700)}},readFile=i=>{let f=i.files&&i.files[0],k=i.dataset.up;if(!f||!k)return;let r=new FileReader;r.onload=e=>{S().UF[k]=e.target.result;let b=$(k);b&&(b.innerHTML=`<img src="${e.target.result}">`)};r.readAsDataURL(f)},initEvents=()=>{let root=$("pf");if(!root||root.dataset.bind)return;root.dataset.bind=1;root.onclick=async e=>{let a=e.target.closest("[data-a]"),clr=e.target.closest("[data-clr]"),eye=e.target.closest("[data-eye]"),it=e.target.closest("#dd .it"),ni=e.target.closest("#nmn .ni");if(clr){let x=$(clr.dataset.clr);x&&(x.value="");return}if(eye){toggleEye(eye.dataset.eye,eye);return}if(it){pickRec(it.dataset.k);return}if(ni){$("ncv")&&($("ncv").textContent=ni.dataset.v);D.querySelectorAll("#nmn .ni").forEach(x=>x.classList.remove("on"));ni.classList.add("on");$("nd")&&$("nd").classList.remove("o");return}if(!a)return;switch(a.dataset.a){case"back":history.back();break;case"home":nav("home");break;case"safe":nav("safe");break;case"rec":nav("rec");break;case"op":{let k=(S().UD||{}).kyc;return k==="pending"?toast(T().kycPending):k==="approved"?toast(T().kycApproved):nav("pc")}case"ne":toast(T().notEligible);break;case"td":$("dd")&&$("dd").classList.toggle("o");break;case"tn":$("nd")&&$("nd").classList.toggle("o");break;case"logout":try{await S().AU.signOut(A.auth)}catch(_){}location.replace("login.html");break;case"cp":{let t=T(),s=S(),o=$("o").value,n=$("n").value,c=$("c").value,b=$("okb");if(!o||!n||!c)return toast(t.fill);if(!/^[A-Za-z0-9]{6,12}$/.test(n))return toast(t.passRule);if(n!==c)return toast(t.passMatch);try{b.disabled=1;let cr=s.AU.EmailAuthProvider.credential(s.U.email,o);await s.AU.reauthenticateWithCredential(s.U,cr);await s.AU.updatePassword(s.U,n);toast(t.passDone);["o","n","c"].forEach(id=>$(id).value="");setTimeout(()=>nav("home"),1000)}catch(err){toast(err.code==="auth/wrong-password"?t.wrongOld:(err.message||err))}finally{b.disabled=0}break}case"ak":{let t=T(),s=S(),name=$("fn").value.trim(),doc=$("dn").value.trim(),nat=$("ncv").textContent,btn=$("apb");if(!name||!doc)return toast(t.fill);if(!s.UF.b1||!s.UF.b2||!s.UF.b3)return toast(t.need3);try{btn.disabled=1;let F=s.FS,data={uid:s.U.uid,userDocId:s.U.uid,userEmail:s.U.email||"",userUidDisplay:s.UD?.uid||"",lang:lang((s.UD||{}).lang||A.lang||"ar"),nationality:nat,fullName:name,docNumber:doc,front:s.UF.b1,back:s.UF.b2,hand:s.UF.b3,status:"pending",source:"web",createdAt:F.serverTimestamp(),submittedAt:Date.now()};await F.addDoc(F.collection(A.db,"توثيق"),data);await F.updateDoc(F.doc(A.db,"users",s.U.uid),{kyc:"pending",kycData:data});toast(t.kycDone);setTimeout(()=>nav("home"),900)}catch(err){toast(err.message||err)}finally{btn.disabled=0}break}}};D.querySelectorAll('#pf input[type="file"][data-up]').forEach(i=>i.onchange=()=>readFile(i));D.addEventListener("click",e=>{let dd=$("dd"),nd=$("nd");dd&&!dd.contains(e.target)&&dd.classList.remove("o");nd&&!nd.contains(e.target)&&nd.classList.remove("o")})},initUser=async u=>{let s=S(),F=s.FS,ref=F.doc(A.db,"users",u.uid),snap=await F.getDoc(ref),data;if(snap.exists()){data=snap.data();if(!data.uid){data.uid=uid();await F.updateDoc(ref,{uid:data.uid})}}else{data={email:u.email||"",uid:uid(),kyc:"none",createdAt:F.serverTimestamp(),lang:lang(A.lang||"ar")};await F.setDoc(ref,data)}s.U=u;s.UD=data;fillCountries();applyText();s.off&&s.off();s.off=F.onSnapshot(ref,x=>{if(!x.exists())return;s.UD=x.data();applyText()})};injectPage("profile",{h:H,i:async()=>{initEvents();fillCountries();applyText();let s=S();if(!s.mod)s.mod=Promise.all([import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"),import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")]).then(([AU,FS])=>(s.AU=AU,s.FS=FS));await s.mod;let u=A.user||A.auth?.currentUser;u?initUser(u):!s.wait&&(s.wait=1,s.AU.onAuthStateChanged(A.auth,x=>x?initUser(x):location.replace("login.html")))}})})();
