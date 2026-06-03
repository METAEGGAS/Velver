(function () {
  if (!window.injectPage) return;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getLang() {
    return (window.App && window.App.lang) || "ar";
  }

  function textPack() {
    var lang = getLang();

    var pack = {
      ar: {
        title: "السجل",
        subtitle: "سجل العمليات الأخيرة",
        empty: "لا توجد بيانات حالياً",
        deposit: "إيداع",
        withdrawal: "سحب",
        profit: "أرباح",
        pending: "قيد المراجعة",
        done: "مكتمل",
        failed: "فشل",
        amount: "المبلغ",
        status: "الحالة",
        time: "الوقت"
      },
      en: {
        title: "Record",
        subtitle: "Recent transaction history",
        empty: "No data available",
        deposit: "Deposit",
        withdrawal: "Withdrawal",
        profit: "Profit",
        pending: "Pending",
        done: "Completed",
        failed: "Failed",
        amount: "Amount",
        status: "Status",
        time: "Time"
      }
    };

    return pack[lang] || pack.ar;
  }

  function getMockData() {
    return [
      {
        type: "deposit",
        amount: "+250.00 USDT",
        status: "done",
        time: "2026-06-03 10:15"
      },
      {
        type: "withdrawal",
        amount: "-120.00 USDT",
        status: "pending",
        time: "2026-06-02 18:40"
      },
      {
        type: "profit",
        amount: "+36.80 USDT",
        status: "done",
        time: "2026-06-02 09:20"
      },
      {
        type: "withdrawal",
        amount: "-75.00 USDT",
        status: "failed",
        time: "2026-06-01 21:05"
      }
    ];
  }

  function badgeColor(status) {
    if (status === "done") {
      return {
        color: "#21d07a",
        bg: "rgba(33,208,122,.10)",
        border: "rgba(33,208,122,.30)"
      };
    }
    if (status === "pending") {
      return {
        color: "#ffd86f",
        bg: "rgba(255,216,111,.10)",
        border: "rgba(255,216,111,.30)"
      };
    }
    return {
      color: "#ff6677",
      bg: "rgba(255,102,119,.10)",
      border: "rgba(255,102,119,.30)"
    };
  }

  function amountColor(amount) {
    return String(amount).trim().charAt(0) === "-" ? "#ff6677" : "#21d07a";
  }

  function renderRow(item, t) {
    var typeMap = {
      deposit: t.deposit,
      withdrawal: t.withdrawal,
      profit: t.profit
    };

    var statusMap = {
      done: t.done,
      pending: t.pending,
      failed: t.failed
    };

    var badge = badgeColor(item.status);

    return `
      <div style="
        background:#0b0f14;
        border:1px solid #1f2629;
        border-radius:16px;
        padding:14px;
        margin-bottom:10px;
        box-shadow:0 6px 14px rgba(0,0,0,.35);
      ">
        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:10px;
        ">
          <div style="font-size:15px;font-weight:700;color:#fff;">
            ${esc(typeMap[item.type] || item.type)}
          </div>

          <div style="
            color:${badge.color};
            background:${badge.bg};
            border:1px solid ${badge.border};
            border-radius:10px;
            padding:6px 10px;
            font-size:12px;
            font-weight:700;
            white-space:nowrap;
          ">
            ${esc(statusMap[item.status] || item.status)}
          </div>
        </div>

        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:8px;
          color:#a5afba;
          font-size:12px;
        ">
          <span>${esc(t.amount)}</span>
          <span style="color:${amountColor(item.amount)};font-size:16px;font-weight:800;">
            ${esc(item.amount)}
          </span>
        </div>

        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          color:#7f8a96;
          font-size:12px;
          border-top:1px solid #171b22;
          padding-top:10px;
        ">
          <span>${esc(t.time)}</span>
          <span>${esc(item.time)}</span>
        </div>
      </div>
    `;
  }

  function renderPage() {
    var t = textPack();
    var rows = getMockData();

    return `
      <div class="page">
        <div class="card">
          <div style="font-size:22px;font-weight:800;color:#fff;margin-bottom:6px;">
            ${esc(t.title)}
          </div>
          <div style="font-size:13px;color:#8f9aa6;margin-bottom:14px;">
            ${esc(t.subtitle)}
          </div>

          ${
            rows.length
              ? rows.map(function (item) { return renderRow(item, t); }).join("")
              : `<div style="color:#8f9aa6;font-size:14px;">${esc(t.empty)}</div>`
          }
        </div>
      </div>
    `;
  }

  function initPage() {
    // مكان مناسب لاحقاً لو حبيت تجيب البيانات من Firestore أو API
    // حالياً الصفحة تعمل ببيانات تجريبية فقط
  }

  window.injectPage("tx", {
    v: renderPage,
    i: initPage
  });
})();
