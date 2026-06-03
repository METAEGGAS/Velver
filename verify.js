(()=>{
let d=window.DynamicInjectTarget||document.body;
d.innerHTML=`<style>
#vkpg{position:fixed;inset:0;z-index:9999;background:linear-gradient(180deg,#0b0b0b 0,#050505 48%,#020202 100%);color:#fff;overflow:auto;direction:rtl}
#vkpg *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Tahoma,Arial,sans-serif}
#vkpg .vwrap{min-height:100%;padding:6px 6px calc(20px + env(safe-area-inset-bottom))}
#vkpg .vtop{margin-bottom:6px;direction:ltr;position:relative;display:flex;align-items:center}
#vkpg .vback{width:40px;height:40px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:#000;display:grid;place-items:center;cursor:pointer}
#vkpg .vback img{width:22px;height:22px;display:block}
#vkpg .vttl{flex:1;text-align:center;font-size:21px;font-weight:900;direction:rtl;margin-left:-40px}
#vkpg .vsub{font-size:13px;margin:4px 2px 12px;direction:rtl}
#vkpg .vinp,#vkpg .vbox,#vkpg .vbtn{background:linear-gradient(180deg,#111,#0a0a0a);border:1px solid rgba(255,255,255,.08);box-shadow:none}
#vkpg .vinp{width:100%;height:50px;padding:0 14px;margin-bottom:10px;font-size:14px;outline:0;color:#fff;border-radius:16px}
#vkpg .vinp::placeholder{color:#fff}
#vkpg .vlbl{font-size:14px;font-weight:800;margin:4px 2px 8px;direction:rtl}
#vkpg .vup{display:flex;gap:8px}
#vkpg .vbox{flex:1;min-height:140px;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;color:#fff;cursor:pointer;border-radius:18px}
#vkpg .vboxin{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px;line-height:1.5}
#vkpg .vbox svg{width:40px;height:40px;stroke:#fff;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
#vkpg .vf{display:none}
#vkpg .vname{font-size:11px;color:#8b5cf6;word-break:break-all}
#vkpg .vnotes{margin:14px 2px;direction:rtl}
#vkpg .vnotes b{display:block;margin-bottom:6px}
#vkpg .vnotes ol{padding-right:18px}
#vkpg .vnotes li{margin:0 0 8px;color:#fff;line-height:1.7;font-size:13px}
#vkpg .vbtn{display:flex;align-items:center;justify-content:center;width:100%;height:50px;border-radius:999px;color:#fff;font-size:17px;font-weight:900;cursor:pointer;background:linear-gradient(135deg,#8b5cf6,#6d28d9)!important}
</style><section id=vkpg><div class=vwrap><div class=vtop><button class=vback id=vkback><img src="https://i.ibb.co/vv1DbtK0/65.png" alt=""></button><div class=vttl>Identity Verification</div></div><div class=vsub>Complete the authentication below to withdraw your balance</div><input class=vinp placeholder="Please enter your name"><input class=vinp placeholder="Please enter your ID number"><div class=vlbl>Upload Certificate</div><div class=vup><label class=vbox for=vkfront><input class=vf id=vkfront type=file accept="image/*"><div class=vboxin><svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M12 17V10"></path><path d="m9.5 12.5 2.5-2.5 2.5 2.5"></path></svg><div>Front image of the document with the holder</div><div class=vname id=vkfrontName></div></div></label><label class=vbox for=vkbackf><input class=vf id=vkbackf type=file accept="image/*"><div class=vboxin><svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M12 17V10"></path><path d="m9.5 12.5 2.5-2.5 2.5 2.5"></path></svg><div>Back image of the document with the holder</div><div class=vname id=vkbackName></div></div></label></div><div class=vnotes><b>Notes:</b><ol><li>Upload your document information ensuring the images are complete.</li><li>Make sure all information is clear during the upload.</li><li>Ensure the document is original and valid.</li><li>The background of the document must be a solid color.</li></ol></div><button class=vbtn>Submit</button></div></section>`;
let q=s=>d.querySelector(s);
q("#vkback").onclick=()=>closeDyn();
q("#vkfront").onchange=e=>q("#vkfrontName").textContent=e.target.files[0]?e.target.files[0].name:"";
q("#vkbackf").onchange=e=>q("#vkbackName").textContent=e.target.files[0]?e.target.files[0].name:"";
})();
