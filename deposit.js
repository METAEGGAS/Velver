(()=>{const A={
"USDT-TRC20":"THfubaVh4fuAkiGdq88ZYz32dn8q1wx1Dx",
"USDT-ERC20":"",
"USDT-BEP20":"",
"USDC-BEP20":"",
"USDC-ERC20":"",
"ETH":"",
"BTC":""
},I={
USDT:"https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/usdt.png",
USDC:"https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/usdc.png",
ETH:"https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/eth.png",
BTC:"https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/btc.png"
},T=n=>n.startsWith("USDT")?"USDT":n.startsWith("USDC")?"USDC":n,Q=v=>`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(v)}`,N=Object.keys(A);
window.DEP={
o(n){const a=A[n]||"",r=document.getElementById("dpR"),ok=!!a;
r.querySelector(".dp1").style.display="none";
r.querySelector(".dp2").style.display="block";
r.querySelector("#dpM").textContent=`This address only supports ${n} related assets`;
r.querySelector("#dpA").textContent=a||"Address not provided";
r.querySelector("#dpQ").src=ok?Q(a):"";
r.querySelector("#dpQI").innerHTML=`<img src="${I[T(n)]}" alt="${n}">`;
r.querySelector("#dpNet").textContent=n;
["S","C"].forEach(x=>{const e=r.querySelector("#dp"+x);e.style.opacity=ok?1:.45;e.style.pointerEvents=ok?"auto":"none";if(x==="C")e.disabled=!ok;});
},
b(){const r=document.getElementById("dpR");r.querySelector(".dp2").style.display="none";r.querySelector(".dp1").style.display="block";},
s(){const q=document.getElementById("dpQ").src;if(!q)return;const a=document.createElement("a");a.href=q;a.download=(document.getElementById("dpNet").textContent||"qr")+".png";a.click();},
c(){const t=document.getElementById("dpA").textContent;if(!t||t==="Address not provided")return;navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t):prompt("Copy address",t);}
};
injectPage("deposit",{h:`<style>
#dpR,#dpR *{box-sizing:border-box}#dpR{min-height:100vh;background:#111214;color:#fff;font:14px/1.35 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}#dpR .w{max-width:430px;margin:auto}#dpR .hd{height:66px;display:flex;align-items:center;justify-content:center;position:relative;font-size:18px;font-weight:500}#dpR .bk{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:34px;height:34px;border:0;background:none;color:#c7cbd1;font:300 34px/1 Arial}#dpR .sub{font-size:17px;color:#f2f2f2;margin:10px 0 18px 24px}#dpR .g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 24px 30px}#dpR .n{background:#121416;border:1px solid #3a3e50;border-radius:12px;min-height:124px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;color:#cdd1d7}#dpR .n b{font-size:13px;font-weight:500}#dpR .ic,#dpR .ic img{width:52px;height:52px;border-radius:50%}#dpR .dp2{display:none;padding:0 18px 24px}#dpR .box{background:#171915;border-radius:14px;margin-top:16px;padding:18px}#dpM{max-width:290px;margin:2px auto 18px;text-align:center;color:#d6ac57;font-size:15px}#dpR .qw{width:176px;height:176px;background:#fff;display:grid;place-items:center;margin:0 auto 16px;position:relative}#dpQ{width:176px;height:176px;display:block}#dpQI{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}#dpQI img{width:42px;height:42px;border-radius:50%;background:#fff;padding:3px}#dpS{display:grid;place-items:center;width:180px;height:42px;margin:0 auto 34px;background:#08b44e;color:#fff;text-decoration:none;border-radius:2px;font-size:15px}#dpA{margin:0 auto 22px;text-align:center;font-size:16px;word-break:break-all;max-width:100%}#dpC{display:block;width:180px;height:38px;margin:0 auto;border:1px solid #d9dde2;background:none;color:#fff;border-radius:2px;font-size:15px}
</style><div id="dpR"><div class="w"><div class="dp1"><div class="hd"><button class="bk" style="visibility:hidden">‹</button>Deposit channel</div><div class="sub">Please select the deposit crypto</div><div class="g">${N.map(n=>`<button class="n" onclick="DEP.o('${n}')"><span class="ic"><img src="${I[T(n)]}" alt="${n}"></span><b>${n}</b></button>`).join("")}</div></div><div class="dp2"><div class="hd"><button class="bk" onclick="DEP.b()">‹</button>Fast deposit</div><div class="box"><div id="dpM">This address only supports USDT-TRC20 related assets</div><div class="qw"><img id="dpQ" alt="QR"><div id="dpQI"><img src="${I.USDT}" alt="USDT"></div></div><a id="dpS" href="#" onclick="DEP.s();return false">Save QR code</a><div id="dpA">THfubaVh4fuAkiGdq88ZYz32dn8q1wx1Dx</div><button id="dpC" onclick="DEP.c()">Copy address</button><i id="dpNet" hidden>USDT-TRC20</i></div></div></div></div>`});
})();
