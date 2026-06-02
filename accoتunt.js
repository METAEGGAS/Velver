document.body.innerHTML = "";
document.body.style.margin = "0";
document.body.style.background = "#000";
document.body.style.fontFamily = "Tahoma, Arial, sans-serif";

const style = document.createElement("style");
style.textContent = `
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    direction: rtl;
    background:
      linear-gradient(180deg, #010707 0%, #020b11 100%);
    color: #fff;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .screen {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    background:
      radial-gradient(circle at top center, rgba(0,255,220,.06), transparent 30%),
      linear-gradient(180deg, #020707 0%, #030812 35%, #03060d 100%);
    padding: 18px 14px 24px;
    position: relative;
    overflow-x: hidden;
  }

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 14px;
    direction: ltr;
  }

  .top-square {
    width: 12px;
    height: 12px;
    background: #26d7d6;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(38, 215, 214, .5);
    flex-shrink: 0;
  }

  .top-id {
    color: #f7f7f7;
    font-size: 18px;
    letter-spacing: .2px;
    line-height: 1;
  }

  .brand {
    margin-left: auto;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 30% 30%, rgba(255,255,255,.14), transparent 35%),
      linear-gradient(145deg, #03292b, #0a4c4e 55%, #03181a);
    border: 2px solid rgba(0, 220, 210, .18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d7b56c;
    font-weight: 900;
    font-size: 34px;
    position: relative;
    box-shadow: inset 0 0 18px rgba(0,0,0,.35), 0 0 14px rgba(0,255,210,.08);
  }

  .brand::after {
    content: "الملف الشخصي";
    position: absolute;
    bottom: -18px;
    right: 50%;
    transform: translateX(50%);
    color: #2fc7e9;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }

  .card {
    margin-top: 26px;
    border-radius: 18px;
    background: linear-gradient(180deg, #0fa4a5 0%, #0d9093 100%);
    padding: 18px 14px 14px;
    box-shadow:
      0 0 0 1px rgba(255,255,255,.05) inset,
      0 8px 20px rgba(0,0,0,.25);
  }

  .stats {
    display: grid;
    grid-template-columns: 54px 1fr;
    row-gap: 10px;
    column-gap: 8px;
    align-items: center;
    margin-bottom: 16px;
  }

  .stat-value {
    font-size: 18px;
    color: #f3f3f3;
    text-align: left;
  }

  .stat-label {
    font-size: 17px;
    color: #f4f4f4;
    text-align: right;
    white-space: nowrap;
  }

  .actions-box {
    background: rgba(255,255,255,.08);
    border-radius: 14px;
    padding: 14px 8px 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-top: 6px;
  }

  .action-btn {
    background: transparent;
    border: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    cursor: pointer;
    padding: 4px 0;
    font-size: 15px;
  }

  .action-btn .icon-wrap {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: #f3dca5;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,.4),
      0 3px 8px rgba(0,0,0,.12);
  }

  .action-btn svg {
    width: 26px;
    height: 26px;
    stroke: #171717;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .income-box {
    margin-top: 14px;
    border-radius: 0 0 16px 16px;
    background: rgba(0,0,0,.26);
    padding: 16px 10px 18px;
    text-align: center;
  }

  .income-title {
    font-size: 16px;
    color: #f5f5f5;
    margin-bottom: 8px;
  }

  .income-value {
    font-size: 23px;
    color: #00d9ff;
    font-weight: 500;
  }

  .menu {
    margin-top: 18px;
  }

  .menu-item {
    border-bottom: 1px solid rgba(255,255,255,.02);
  }

  .menu-btn {
    width: 100%;
    background: transparent;
    border: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 6px;
    cursor: pointer;
    font-size: 18px;
  }

  .menu-left {
    color: #ffffff;
    font-size: 26px;
    line-height: 1;
    opacity: .95;
    transform: translateY(-1px);
  }

  .menu-right {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
  }

  .menu-right .label {
    font-size: 18px;
    color: #f8f8f8;
  }

  .menu-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #0bc5d7;
    color: #0bc5d7;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 0 8px rgba(0, 208, 230, .1);
  }

  .menu-icon.download {
    border-radius: 6px;
    border: 0;
    width: 22px;
    height: 22px;
  }

  .menu-content {
    display: none;
    color: rgba(255,255,255,.82);
    padding: 0 8px 16px;
    font-size: 14px;
    line-height: 1.8;
  }

  .menu-item.open .menu-content {
    display: block;
  }

  .logout {
    margin-top: 22px;
    width: 100%;
    height: 60px;
    border-radius: 18px;
    border: 2px solid rgba(27, 177, 160, .35);
    background: linear-gradient(180deg, rgba(3,34,35,.75), rgba(2,24,28,.92));
    color: #f0f0f0;
    font-size: 20px;
    cursor: pointer;
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.03),
      0 0 18px rgba(0,255,180,.05);
  }

  .logout:active,
  .action-btn:active,
  .menu-btn:active {
    transform: scale(.99);
  }
`;
document.head.appendChild(style);

const app = document.createElement("div");
app.className = "screen";

app.innerHTML = `
  <div class="top-bar">
    <div class="top-square"></div>
    <div class="top-id">5550282882558228</div>
    <div class="brand">X</div>
  </div>

  <div class="card">
    <div class="stats">
      <div class="stat-value" id="assetsValue">0</div>
      <div class="stat-label">إجمالي الأصول($)</div>

      <div class="stat-value" id="withdrawValue">0</div>
      <div class="stat-label">إجمالي السحب($)</div>

      <div class="stat-value" id="depositValue">⇌0</div>
      <div class="stat-label">أصول الإيداع($)</div>

      <div class="stat-value" id="balanceValue">0</div>
      <div class="stat-label">الرصيد</div>
    </div>

    <div class="actions-box">
      <button class="action-btn" id="depositBtn">
        <span class="icon-wrap">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M12 8v8"></path>
            <path d="M9 11.5c0-1 1.2-1.7 3-1.7s3 .7 3 1.7-1.2 1.7-3 1.7-3 .7-3 1.7 1.2 1.7 3 1.7 3-.7 3-1.7"></path>
          </svg>
        </span>
        <span>إيداع</span>
      </button>

      <button class="action-btn" id="withdrawBtn">
        <span class="icon-wrap">
          <svg viewBox="0 0 24 24">
            <rect x="4" y="6" width="16" height="12" rx="2"></rect>
            <path d="M15 10h5"></path>
            <circle cx="15" cy="12" r="1.2" fill="#171717" stroke="none"></circle>
          </svg>
        </span>
        <span>السحب</span>
      </button>

      <button class="action-btn" id="detailsBtn">
        <span class="icon-wrap">
          <svg viewBox="0 0 24 24">
            <path d="M6 9l6-3 6 3-6 3-6-3z"></path>
            <path d="M6 12l6 3 6-3"></path>
            <path d="M6 15l6 3 6-3"></path>
          </svg>
        </span>
        <span>التفاصيل</span>
      </button>
    </div>

    <div class="income-box">
      <div class="income-title">إجمالي الدخل</div>
      <div class="income-value" id="incomeValue">$0</div>
    </div>
  </div>

  <div class="menu">
    <div class="menu-item" data-name="security">
      <button class="menu-btn">
        <span class="menu-left">‹</span>
        <span class="menu-right">
          <span class="menu-icon">+</span>
          <span class="label">مركز الأمان</span>
        </span>
      </button>
      <div class="menu-content">
        حماية الحساب، إدارة الأمان، وربط وسائل الحماية.
      </div>
    </div>

    <div class="menu-item" data-name="bank">
      <button class="menu-btn">
        <span class="menu-left">‹</span>
        <span class="menu-right">
          <span class="menu-icon">?</span>
          <span class="label">الحساب البنكي</span>
        </span>
      </button>
      <div class="menu-content">
        إدارة بيانات الحساب البنكي وربط وسائل السحب والإيداع.
      </div>
    </div>

    <div class="menu-item" data-name="about">
      <button class="menu-btn">
        <span class="menu-left">‹</span>
        <span class="menu-right">
          <span class="menu-icon">i</span>
          <span class="label">من نحن</span>
        </span>
      </button>
      <div class="menu-content">
        معلومات عن المنصة، السياسات، وخدمة المستخدم.
      </div>
    </div>

    <div class="menu-item" data-name="download">
      <button class="menu-btn">
        <span class="menu-left">‹</span>
        <span class="menu-right">
          <span class="menu-icon download">
            <svg viewBox="0 0 24 24" style="width:22px;height:22px;stroke:#0bc5d7;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
              <path d="M12 3v11"></path>
              <path d="M8 10l4 4 4-4"></path>
              <path d="M5 17v3h14v-3"></path>
            </svg>
          </span>
          <span class="label">تحميل التطبيق</span>
        </span>
      </button>
      <div class="menu-content">
        تنزيل التطبيق على جهازك من خلال رابط التحميل الخاص بالمنصة.
      </div>
    </div>
  </div>

  <button class="logout" id="logoutBtn">تسجيل الخروج</button>
`;

document.body.appendChild(app);

const state = {
  totalAssets: 0,
  totalWithdraw: 0,
  depositAssets: 0,
  balance: 0,
  totalIncome: 0
};

function renderValues() {
  document.getElementById("assetsValue").textContent = state.totalAssets;
  document.getElementById("withdrawValue").textContent = state.totalWithdraw;
  document.getElementById("depositValue").textContent = "⇌" + state.depositAssets;
  document.getElementById("balanceValue").textContent = state.balance;
  document.getElementById("incomeValue").textContent = "$" + state.totalIncome;
}

renderValues();

document.getElementById("depositBtn").addEventListener("click", () => {
  const value = prompt("أدخل مبلغ الإيداع", "0");
  if (value === null) return;
  const amount = parseFloat(value);
  if (isNaN(amount) || amount <= 0) {
    alert("مبلغ غير صالح");
    return;
  }
  state.depositAssets += amount;
  state.totalAssets += amount;
  state.balance += amount;
  renderValues();
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
  const value = prompt("أدخل مبلغ السحب", "0");
  if (value === null) return;
  const amount = parseFloat(value);
  if (isNaN(amount) || amount <= 0) {
    alert("مبلغ غير صالح");
    return;
  }
  if (amount > state.balance) {
    alert("الرصيد غير كافٍ");
    return;
  }
  state.totalWithdraw += amount;
  state.balance -= amount;
  renderValues();
});

document.getElementById("detailsBtn").addEventListener("click", () => {
  alert(
    "إجمالي الأصول($): " + state.totalAssets + "\\n" +
    "إجمالي السحب($): " + state.totalWithdraw + "\\n" +
    "أصول الإيداع($): " + state.depositAssets + "\\n" +
    "الرصيد: " + state.balance + "\\n" +
    "إجمالي الدخل: $" + state.totalIncome
  );
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.querySelector(".menu-btn").addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  const ok = confirm("هل تريد تسجيل الخروج؟");
  if (ok) {
    alert("تم تسجيل الخروج");
  }
});
