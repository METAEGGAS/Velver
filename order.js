(()=>{
let d=window.DynamicInjectTarget||document.body;
d.innerHTML=`<section class=dynbox><div class=dynhd><span>Order History</span><button class=dynclose onclick="closeDyn()">×</button></div><div class=dynlist><div class=dynitem><b>BTC/USDT</b><div class=mut>Buy • 0.015 BTC</div><div class=mut>2026-06-03 11:42</div></div><div class=dynitem><b>ETH/USDT</b><div class=mut>Sell • 0.42 ETH</div><div class=mut>2026-06-02 18:10</div></div><div class=dynitem><b>SOL/USDT</b><div class=mut>Buy • 12 SOL</div><div class=mut>2026-06-01 09:26</div></div></div></section>`;
})();
