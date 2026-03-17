(function(){var D=document,B=D.body,H=D.head||D.documentElement;
// === META & TITLE ===
var addMeta=function(n,v){var m=D.createElement("meta");m.setAttribute(n,v);H.appendChild(m);};
D.documentElement.setAttribute("lang","ar");D.documentElement.setAttribute("dir","rtl");
addMeta("charset","UTF-8");addMeta("name","viewport");D.querySelector("meta[name=viewport]").setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no");
D.title="الإيداع – binexia";

// === CSS ===
var s=D.createElement("style");s.textContent="*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:Segoe UI,Tahoma,Arial,sans-serif}body{background:#0d0e1a;color:#fff;min-height:100vh;overflow-x:hidden;padding-bottom:90px}.hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:#0d0e1a;position:sticky;top:0;z-index:99;border-bottom:1px solid rgba(245,166,35,.12)}.hdr-back{width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#141526;border-radius:10px}.hdr-back svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.hdr-title{font-size:17px;font-weight:900;color:#fff;letter-spacing:.5px}.hdr-ava{width:36px;height:36px;border-radius:50%;background:#222 center/cover no-repeat;cursor:pointer;box-shadow:0 0 0 2px rgba(245,166,35,.3);background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyKEGd9CI___Zhk2oWxXkP3xHlB-jSfThuE0n6bSgng&s=10)}.hero{margin:14px 12px 4px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 60%,#141830 100%);border-radius:16px;padding:18px 16px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(245,166,35,.15);position:relative;overflow:hidden}.hero::before{content:'';position:absolute;top:-30px;left:-30px;width:120px;height:120px;background:radial-gradient(circle,rgba(245,166,35,.08) 0%,transparent 70%);pointer-events:none}.hero-txt .h1{font-size:20px;font-weight:900;background:linear-gradient(90deg,#f5a623,#ffcd6b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}.hero-txt .h2{font-size:12px;color:#aaa;line-height:1.6}.hero-ico{font-size:46px;filter:drop-shadow(0 4px 12px rgba(245,166,35,.25))}.stats{display:flex;gap:8px;padding:0 12px;margin:10px 0 4px}.stat{flex:1;background:#141526;border-radius:12px;padding:10px;text-align:center;border:1px solid #1e1f32}.stat-n{font-size:15px;font-weight:900;color:#f5a623}.stat-l{font-size:10px;color:#888;margin-top:2px}.sec-lbl{padding:10px 16px 6px;font-size:13px;color:#888;font-weight:700;display:flex;align-items:center;gap:6px}.sec-lbl::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#1e1f32,transparent)}.list{padding:0 12px;display:flex;flex-direction:column;gap:10px}.plan{background:#141526;border-radius:16px;overflow:hidden;border:1px solid #1e1f32;transition:.2s}.plan:active{transform:scale(.99);opacity:.9}.plan.gold{border-color:rgba(245,166,35,.35);background:linear-gradient(135deg,#1a1d30 0%,#141526 100%)}.plan.blue{border-color:rgba(99,179,237,.25)}.plan.green{border-color:rgba(74,222,128,.2)}.plan.base{border-color:rgba(167,139,250,.2)}.plan-top{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 12px;gap:10px}.plan-left{display:flex;flex-direction:column;align-items:flex-start;gap:6px}.badge{display:inline-flex;align-items:center;gap:4px;border-radius:20px;padding:3px 10px;font-size:10px;font-weight:700}.badge.gold{background:rgba(245,166,35,.12);color:#f5a623;border:1px solid rgba(245,166,35,.3)}.badge.blue{background:rgba(99,179,237,.1);color:#63b3ed;border:1px solid rgba(99,179,237,.25)}.badge.green{background:rgba(74,222,128,.1);color:#4ade80;border:1px solid rgba(74,222,128,.2)}.badge.purple{background:rgba(167,139,250,.1);color:#a78bfa;border:1px solid rgba(167,139,250,.2)}.dep-btn{color:#fff;border-radius:22px;padding:10px 22px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;flex-shrink:0;font-family:inherit;transition:.15s;border:0}.dep-btn.gold{background:linear-gradient(90deg,#f5a623,#e8970d);color:#0d0e1a;box-shadow:0 4px 14px rgba(245,166,35,.3)}.dep-btn.blue{background:linear-gradient(90deg,#3b82f6,#2563eb);box-shadow:0 4px 14px rgba(59,130,246,.25)}.dep-btn.green{background:linear-gradient(90deg,#22c55e,#16a34a);box-shadow:0 4px 14px rgba(34,197,94,.2)}.dep-btn.purple{background:linear-gradient(90deg,#8b5cf6,#7c3aed);box-shadow:0 4px 14px rgba(139,92,246,.2)}.dep-btn:active{opacity:.8;transform:scale(.95)}.plan-name{font-size:13.5px;font-weight:800;color:#fff;text-align:right;line-height:1.5;flex:1}.plan-info{border-top:1px solid #1e1f32;padding:10px 14px 13px;display:flex;flex-direction:column;gap:8px;background:rgba(0,0,0,.12)}.info-row{display:flex;align-items:center;justify-content:space-between}.info-label{font-size:12px;color:#777;font-weight:500}.info-val{font-size:12.5px;color:#ddd;font-weight:700;text-align:left;direction:ltr}.info-val.highlight{color:#f5a623}.apy-wrap{display:flex;align-items:center;gap:6px;margin:2px 12px 10px;background:rgba(245,166,35,.04);border:1px solid rgba(245,166,35,.1);border-radius:12px;padding:10px 14px}.apy-ico{font-size:22px}.apy-txt .t1{font-size:11px;color:#888}.apy-txt .t2{font-size:17px;font-weight:900;color:#f5a623}";
H.appendChild(s);

// === HELPERS ===
var mk=function(t,c,tx){var e=D.createElement(t);if(c)e.className=c;if(tx!==undefined)e.textContent=tx;return e;};
var ap=function(p){var a=[].slice.call(arguments,1);a.forEach(function(c){p.appendChild(c);});return p;};
var ir=function(lbl,val,col){
  var r=mk("div","info-row"),v=mk("div","info-val"),l=mk("div","info-label",lbl);
  v.textContent=val;if(col===true)v.classList.add("highlight");else if(col)v.style.color=col;
  return ap(r,v,l);
};

// === DATA ===
var ST=[{n:"4",l:"خطط متاحة"},{n:"3.10%",l:"أعلى عائد يومي"},{n:"24/7",l:"دعم مستمر"}];
var PL=[
  {c:"gold",bc:"gold",ic:"⭐",lb:"احترافية",nm:"محفظة binexia متعددة الاستراتيجيات – الاحترافية",apy:"≈ 1096% – 1131%",rt:"3.00% ~ 3.10%",rc:true,dy:"360 يوم",tp:"ثابت",rg:"USDT 1000 ~ 100000",btn:"gold",hasApy:true},
  {c:"blue",bc:"blue",ic:"🔷",lb:"متقدم",nm:"محفظة binexia الاستثمارية متعددة الاستراتيجيات – الإصدار المتقدم",rt:"1.80% ~ 2.20%",rc:"#63b3ed",dy:"180 يوم",tp:"ثابت",rg:"USDT 100 ~ 10000",btn:"blue",hasApy:false},
  {c:"green",bc:"green",ic:"🟢",lb:"معزز",nm:"محفظة binexia الاستثمارية متعددة الاستراتيجيات – الإصدار المعزز",rt:"1.40% ~ 1.60%",rc:"#4ade80",dy:"90 يوم",tp:"ثابت",rg:"USDT 100 ~ 1000",btn:"green",hasApy:false},
  {c:"base",bc:"purple",ic:"🔰",lb:"أساسي",nm:"محفظة binexia الاستثمارية متعددة الاستراتيجيات – الإصدار الأساسي",rt:"1.00% ~ 1.20%",rc:"#a78bfa",dy:"30 يوم",tp:"ثابت",rg:"USDT 50 ~ 500",btn:"purple",hasApy:false}
];

// === HEADER ===
var hdr=mk("div","hdr");
var hb=mk("div","hdr-back");hb.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>';
hb.onclick=function(){history.back();};
ap(hdr,hb,mk("div","hdr-title","الإيداع"),mk("div","hdr-ava"));
B.appendChild(hdr);

// === HERO ===
var hero=mk("div","hero");
var htx=mk("div","hero-txt");
var hh1=mk("div","h1","binexia");
var hh2=mk("div","h2");hh2.innerHTML="خطط استثمار آمنة ومضمونة<br>عوائد يومية ثابتة على مدار الساعة";
ap(htx,hh1,hh2);ap(hero,htx,mk("div","hero-ico","💰"));
B.appendChild(hero);

// === STATS ===
var sw=mk("div","stats");
ST.forEach(function(s){ap(sw,ap(mk("div","stat"),mk("div","stat-n",s.n),mk("div","stat-l",s.l)));});
B.appendChild(sw);

// === SECTION LABEL ===
B.appendChild(mk("div","sec-lbl","📋 اختر خطة الإيداع"));

// === PLANS ===
var ls=mk("div","list");
PL.forEach(function(p){
  var plan=mk("div","plan "+p.c);
  var top=mk("div","plan-top");
  var lft=mk("div","plan-left");
  var bdg=mk("span","badge "+p.bc,p.ic+" "+p.lb);
  var btn=mk("button","dep-btn "+p.btn,"إيداع");
  btn.onclick=function(){alert("سيتم فتح نافذة الإيداع ✅");};
  ap(lft,bdg,btn);
  ap(top,lft,mk("div","plan-name",p.nm));
  plan.appendChild(top);
  if(p.hasApy){
    var aw=mk("div","apy-wrap"),at=mk("div","apy-txt");
    at.innerHTML='<div class=t1>معدل العائد السنوي التقريبي</div><div class=t2>'+p.apy+'</div>';
    ap(aw,mk("div","apy-ico","📈"),at);plan.appendChild(aw);
  }
  var inf=mk("div","plan-info");
  ap(inf,ir("معدل العائد اليومي المقدر",p.rt,p.rc),ir("فترة الإيداع",p.dy,false),ir("نوع الإيداع",p.tp,false),ir("مبلغ الإيداع",p.rg,false));
  plan.appendChild(inf);ls.appendChild(plan);
});
B.appendChild(ls);
})();
