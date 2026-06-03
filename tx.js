(function () {
  if (!window.injectPage) return;

  window.injectPage("tx", {
    h: `
<style>
#odpg{position:fixed;inset:0;z-index:9999;background:linear-gradient(180deg,#0b0b0b 0,#050505 48%,#020202 100%);color:#fff;overflow:auto;direction:ltr}
#odpg *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Tahoma,Arial,sans-serif}
#odpg .owrap{min-height:100%;padding:6px 6px calc(20px + env(safe-area-inset-bottom))}
#odpg .topt{position:relative;height:42px;margin-bottom:12px;display:flex;align-items:center;justify-content:center}
#odpg .wb{position:absolute;left:0;top:0;width:40px;height:40px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:#000;display:grid;place-items:center;cursor:pointer}
#odpg .wb img{width:22px;height:22px;display:block}
#odpg h2{font-size:22px;font-weight:900;margin:0}
#odpg .htabs{display:flex;gap:8px;background:#191919;border:1px solid rgba(255,255,255,.08);padding:6px;border-radius:14px;margin:0 0 10px}
#odpg .htab{flex:1;height:46px;border:0;border-radius:11px;background:transparent;color:#fff;font-size:16px;font-weight:800;cursor:pointer}
#odpg .htab.on{background:#232522;color:#11b84e}
#odpg .nd{min-height:calc(100vh - 160px);display:flex;justify-content:flex-start;align-items:center;flex-direction:column;gap:4px;padding-top:24px}
#odpg .nd img{width:148px;height:148px;object-fit:contain}
#odpg .nd b{font-size:15px}
</style>

<section id="odpg">
  <div class="owrap">
    <div class="topt">
      <button class="wb" id="odback">
        <img src="https://i.ibb.co/vv1DbtK0/65.png" alt="">
      </button>
      <h2>History</h2>
    </div>

    <div class="htabs">
      <button class="htab on" data-v="Deposit">Deposit</button>
      <button class="htab" data-v="Withdraw">Withdraw</button>
    </div>

    <div class="nd">
      <img src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-png-download-6672513.png" alt="">
      <b>No data</b>
    </div>
  </div>
</section>
    `,
    i: function () {
      var root = document.getElementById("odpg");
      if (!root) return;

      var q = function (s) { return root.querySelector(s); };
      var qa = function (s) { return root.querySelectorAll(s); };

      var backBtn = q("#odback");
      if (backBtn) {
        backBtn.onclick = function () {
          if (typeof window.H === "function") {
            window.H();
          } else {
            history.back();
          }
        };
      }

      qa(".htab").forEach(function (b) {
        b.onclick = function () {
          qa(".htab").forEach(function (x) {
            x.classList.toggle("on", x === b);
          });
        };
      });
    }
  });
})();
