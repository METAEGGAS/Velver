injectPage("cloud", {
  h: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quotes page</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    html,body{background:#000;width:100%;height:100%;overflow-x:hidden}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#fff;direction:ltr}
    .app{width:100vw;min-height:100vh;background:#000;padding:26px 22px;display:none}
    .app.on{display:block}
    .tabs{display:flex;align-items:center;gap:28px;padding:10px 4px 0}
    .tab{font-size:34px;font-weight:800;color:#5a5a5a;cursor:pointer;padding-bottom:18px;position:relative;transition:.2s}
    .tab.active{color:#fff}
    .tab.active::after{content:"";position:absolute;bottom:0;left:0;width:50px;height:5px;background:#e91e8c;border-radius:3px}
    .search{margin-left:auto;color:#888;font-size:28px;padding-bottom:18px;cursor:pointer}
    .card{background:#111;border-radius:22px;margin-top:18px;padding:22px 26px;border:1px solid #1a1a1a}
    .head{display:grid;grid-template-columns:1.3fr 1fr 1fr;align-items:center;padding:10px 0 22px;color:#9a9a9a;font-size:19px}
    .head>div:nth-child(2),.head>div:nth-child(3){text-align:center}
    .row{display:grid;grid-template-columns:1.3fr 1fr 1fr;align-items:center;padding:18px 0;border-top:1px solid #0a0a0a}
    .row:first-of-type{border-top:none}
    .n .s{font-size:26px;font-weight:700;color:#fff}
    .n .u{color:#7a7a7a;font-weight:500;font-size:22px;margin-left:2px}
    .n .v{font-size:14px;color:#5a5a5a;margin-top:6px;letter-spacing:.3px}
    .p{font-size:25px;font-weight:500;text-align:center;transition:color .5s;color:#fff}
    .p.up{color:#22c55e}
    .p.dn{color:#e91e8c}
    .c{justify-self:center;padding:9px 22px;border-radius:22px;font-size:18px;font-weight:600;color:#fff;min-width:100px;text-align:center;transition:background .5s}
    .c.d{background:#c1196b}
    .c.u{background:#22c55e}
  </style>
</head>
<body>
  <div class="app on" id="fxApp">
    <div class="tabs">
      <div class="tab active" id="fxTab">Forex</div>
      <div class="tab" id="mtTab">Precious Metals</div>
      <div class="search" aria-label="search">🔍</div>
    </div>

    <div class="card">
      <div class="head">
        <div>Name</div>
        <div>Latest Price</div>
        <div>24h Change</div>
      </div>
      <div id="fxL"></div>
    </div>
  </div>

  <div class="app" id="mtApp">
    <div class="tabs">
      <div class="tab" id="fxTab2">Forex</div>
      <div class="tab active" id="mtTab2">Precious Metals</div>
      <div class="search" aria-label="search">🔍</div>
    </div>

    <div class="card">
      <div class="head">
        <div>Name</div>
        <div>Latest Price</div>
        <div>24h Change</div>
      </div>
      <div id="mtL"></div>
    </div>
  </div>

  <script>
    const fx=[["EUR",1.16066,-0.02,"2995261.37",5],["GBP",1.34237,-0.02,"3701616.6",5],["AUD",0.71307,-0.04,"1072383.46",5],["NZD",0.58701,-0.01,"691603.93",5],["HKD",0.12762,0.02,"36694.45",5],["TRY",0.0217,-0.46,"1033.64",4],["BRL",0.1968,-0.05,"86617.19",4],["INR",0.01037,-0.10,"263.97",5],["KRW",0.0006538,0.08,"0.5",7],["JPY",0.00672,-0.03,"458921.22",5],["CNY",0.1387,0.01,"1582934.7",4],["CHF",1.1245,-0.05,"892341.15",4],["CAD",0.7389,-0.03,"1245678.9",4],["SGD",0.7421,0.02,"456123.8",4],["SEK",0.0945,-0.07,"234567.3",4],["NOK",0.0923,-0.06,"189234.5",4],["DKK",0.1456,-0.04,"156789.2",4],["PLN",0.2487,-0.09,"98765.4",4],["MXN",0.0589,-0.12,"345678.9",4],["ZAR",0.0534,-0.15,"87654.3",4],["RUB",0.01089,-0.21,"12345.6",5],["IDR",0.0000634,-0.08,"234.5",7],["MYR",0.2234,0.03,"45678.9",4],["THB",0.0289,-0.05,"98765.4",4],["PHP",0.01789,-0.04,"23456.7",5],["VND",0.0000412,-0.02,"123.4",7],["AED",0.2723,0.01,"234567.8",4],["SAR",0.2666,0.01,"345678.9",4],["QAR",0.2747,-0.01,"45678.9",4],["KWD",3.2645,-0.03,"56789.1",4],["BHD",2.6521,-0.02,"12345.6",4],["OMR",2.5974,-0.01,"23456.7",4],["JOD",1.4108,-0.04,"8765.4",4],["EGP",0.0207,-0.18,"45678.9",4],["ILS",0.2734,-0.06,"78901.2",4],["TWD",0.0312,0.02,"123456.7",4],["CZK",0.0445,-0.07,"56789.1",4],["HUF",0.00278,-0.09,"23456.7",5],["RON",0.2189,-0.05,"34567.8",4],["BGN",0.5567,-0.04,"12345.6",4],["HRK",0.1389,-0.03,"9876.5",4],["UAH",0.0245,-0.14,"8765.4",4],["KZT",0.00223,-0.08,"5678.9",5],["ARS",0.00112,-0.32,"2345.6",5],["CLP",0.00104,-0.06,"6789.1",5],["COP",0.000234,-0.11,"3456.7",6],["PEN",0.2678,-0.05,"12345.6",4],["PKR",0.00356,-0.09,"4567.8",5],["BDT",0.00834,-0.04,"3456.7",5],["NGN",0.000623,-0.19,"1234.5",6]];

    const mt=[["XAU",4448.533,-0.20,"50571687538143.19",3],["XAG",73.226,0.01,"10429584811.44",3],["XPT",1869.009,-0.01,"5980450256961.94",3],["XPD",1314.542,-0.10,"3274691988908.3",3],["XAU1OZ",4448.533,-0.18,"45123456789.12",3],["XAG1OZ",73.226,0.02,"8923456789.23",3],["XPT1OZ",1869.009,-0.03,"4567890123.45",3],["XPD1OZ",1314.542,-0.08,"2345678901.23",3],["XAUG",143.02,-0.21,"12345678901.23",2],["XAGG",2.354,0.03,"3456789012.34",3],["XPTG",60.09,-0.02,"2345678901.23",2],["XPDG",42.27,-0.09,"1234567890.12",2],["XAUK",143020,-0.19,"987654321.12",0],["XAGK",2354,0.01,"876543210.98",0],["XPTK",60090,-0.04,"765432109.87",0],["XPDK",42270,-0.07,"654321098.76",0],["XRH",5800.5,0.15,"543210987.65",1],["XRU",412.3,-0.05,"432109876.54",1],["XIR",4523.7,-0.12,"321098765.43",1],["XOS",389.2,0.08,"210987654.32",1],["XRE",78.45,-0.06,"198765432.1",2],["XCU",9.234,0.04,"876543210.9",3],["XAL",2.456,-0.03,"765432109.8",3],["XZN",2.789,-0.05,"654321098.7",3],["XNI",18.67,-0.11,"543210987.6",2],["XPB",2.134,-0.02,"432109876.5",3],["XSN",26.45,-0.07,"321098765.4",2],["XCO",27.89,-0.14,"210987654.3",2],["XLI",13.56,0.09,"198765432.1",2],["XMO",19.78,-0.04,"187654321.2",2],["XTI",31.23,-0.06,"176543210.3",2],["XBI",45.67,-0.03,"165432109.4",2],["XCD",0.234,-0.08,"154321098.5",3],["XSB",0.456,-0.05,"143210987.6",3],["XHG",2345.6,-0.07,"132109876.7",1],["XGE",1234.5,0.02,"121098765.8",1],["XGA",876.54,-0.04,"110987654.9",2],["XIN",378.9,-0.06,"109876543.1",1],["XTA",378.9,-0.05,"98765432.12",1],["XNB",78.45,-0.03,"87654321.23",2],["XZR",45.67,-0.07,"76543210.34",2],["XHF",2345.6,-0.04,"65432109.45",1],["XYB",56.78,-0.08,"54321098.56",2],["XTB",234.5,-0.05,"43210987.67",1],["XLU",234.5,-0.06,"32109876.78",1],["XSC",1234.5,-0.04,"21098765.89",1],["XYT",45.67,-0.07,"19876543.12",2],["XDY",78.9,-0.05,"18765432.23",1],["XER",56.78,-0.08,"17654321.34",2],["XTM",34.56,-0.06,"16543210.45",2]];

    function rid(s){return s.replace(/\\W/g,'')}

    function build(arr,el){
      el.innerHTML=arr.map((d)=>{
        const [s,p,c,v,dc]=d;
        const pos=c>=0;
        const id=rid(s);
        return '\\n'
          + '          <div class="row" id="r_' + id + '">\\n'
          + '            <div class="n">\\n'
          + '              <div><span class="s">' + s + '</span><span class="u"> /USD</span></div>\\n'
          + '              <div class="v">TVOL ' + v + '</div>\\n'
          + '            </div>\\n'
          + '            <div class="p" id="p_' + id + '">' + p.toFixed(dc) + '</div>\\n'
          + '            <div class="c ' + (pos?'u':'d') + '" id="c_' + id + '">' + (pos?'+':'') + c.toFixed(2) + '%</div>\\n'
          + '          </div>\\n';
      }).join('');
    }

    build(fx,document.getElementById("fxL"));
    build(mt,document.getElementById("mtL"));

    function sw(id){
      document.querySelectorAll('.app').forEach(a=>a.classList.remove('on'));
      document.getElementById(id).classList.add('on');
      const isFx=id==='fxApp';
      document.querySelectorAll('#fxTab, #fxTab2').forEach(el=>el.classList.toggle('active',isFx));
      document.querySelectorAll('#mtTab, #mtTab2').forEach(el=>el.classList.toggle('active',!isFx));
      window.scrollTo(0,0);
    }

    document.getElementById('fxTab').onclick=()=>sw('fxApp');
    document.getElementById('mtTab').onclick=()=>sw('mtApp');
    document.getElementById('fxTab2').onclick=()=>sw('fxApp');
    document.getElementById('mtTab2').onclick=()=>sw('mtApp');

    function upd(arr){
      arr.forEach(d=>{
        const [s,p,c,,dc]=d;
        const id=rid(s);
        const pe=document.getElementById('p_'+id);
        const ce=document.getElementById('c_'+id);
        if(!pe)return;
        const vol=p*(Math.random()*0.004-0.002);
        const np=Math.max(0.0000001,p+vol);
        const dir=np>p?'up':'dn';
        d[1]=np;
        const nc=c+(Math.random()*0.06-0.03);
        d[2]=nc;
        pe.textContent=np.toFixed(dc);
        pe.classList.remove('up','dn');
        pe.classList.add(dir);
        const pos=nc>=0;
        ce.textContent=(pos?'+':'')+nc.toFixed(2)+'%';
        ce.classList.remove('u','d');
        ce.classList.add(pos?'u':'d');
        setTimeout(()=>pe.classList.remove('up','dn'),800);
      });
    }

    setInterval(()=>{
      upd(fx);
      upd(mt);
    },1200);
  </script>
</body>
</html>
  `
});
