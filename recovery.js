(function () {
  const STYLE_ID = "redeem-page-style-v1";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .gp-redeem-root,
      .gp-redeem-root * {
        box-sizing: border-box;
      }

      .gp-redeem-root {
        --gp-bg: #000000;
        --gp-header-text: #ffffff;
        --gp-card-bg: #031a1a;
        --gp-input-border: #1ec8d2;
        --gp-input-placeholder: #7b8788;
        --gp-button-bg: #23c5ce;
        --gp-button-text: #ffffff;
        --gp-soft-line: rgba(30, 200, 210, 0.18);

        position: relative;
        width: 100%;
        min-height: 100dvh;
        background: var(--gp-bg);
        direction: rtl;
        overflow: hidden;
        color: #fff;
        font-family: Tahoma, Arial, "Segoe UI", sans-serif;
      }

      .gp-redeem-root.gp-embedded {
        min-height: 100%;
        height: 100%;
      }

      .gp-redeem-screen {
        width: 100%;
        max-width: 100%;
        min-height: 100dvh;
        padding: 8px 14px 14px;
        display: flex;
        flex-direction: column;
        background: var(--gp-bg);
      }

      .gp-redeem-root.gp-embedded .gp-redeem-screen {
        min-height: 100%;
      }

      .gp-redeem-header {
        position: relative;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
      }

      .gp-redeem-title {
        color: var(--gp-header-text);
        font-size: 18px;
        font-weight: 500;
        line-height: 1;
        user-select: none;
      }

      .gp-redeem-back {
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
      }

      .gp-redeem-back svg {
        width: 22px;
        height: 22px;
        display: block;
      }

      .gp-redeem-card {
        width: 100%;
        height: 56px;
        border-radius: 14px;
        background: linear-gradient(180deg, #032020 0%, #021717 100%);
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px;
        margin-bottom: 12px;
        box-shadow: inset 0 0 0 1px rgba(16, 57, 57, 0.9);
      }

      .gp-redeem-card-title {
        color: #ffffff;
        font-size: 17px;
        font-weight: 500;
        line-height: 1;
        user-select: none;
      }

      .gp-redeem-card-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
      }

      .gp-redeem-card-icon svg {
        width: 21px;
        height: 21px;
        display: block;
      }

      .gp-redeem-input-wrap {
        width: 100%;
        min-height: 62px;
        border-radius: 12px;
        border: 1.5px solid var(--gp-input-border);
        background: transparent;
        display: flex;
        align-items: center;
        padding: 0 14px;
        box-shadow:
          0 0 0 1px rgba(30, 200, 210, 0.06),
          inset 0 0 0 1px rgba(30, 200, 210, 0.04);
      }

      .gp-redeem-input {
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
        color: #ffffff;
        font-size: 18px;
        font-weight: 400;
        text-align: right;
        direction: rtl;
        caret-color: #ffffff;
        padding: 0;
        margin: 0;
      }

      .gp-redeem-input::placeholder {
        color: var(--gp-input-placeholder);
        opacity: 1;
        font-size: 17px;
      }

      .gp-redeem-spacer {
        flex: 1 1 auto;
        min-height: 24px;
      }

      .gp-redeem-button {
        width: 100%;
        height: 46px;
        border: none;
        outline: none;
        border-radius: 999px;
        background: var(--gp-button-bg);
        color: var(--gp-button-text);
        font-size: 20px;
        font-weight: 500;
        line-height: 1;
        cursor: pointer;
        margin-top: auto;
        margin-bottom: 6px;
        box-shadow: 0 10px 22px rgba(35, 197, 206, 0.08);
      }

      .gp-redeem-button:active {
        transform: scale(0.997);
      }

      @media (min-width: 500px) {
        .gp-redeem-screen {
          max-width: 420px;
          margin: 0 auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createSvgArrow() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");

    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M14.5 5L8 12L14.5 19");
    path.setAttribute("stroke", "#FFFFFF");
    path.setAttribute("stroke-width", "2.2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    svg.appendChild(path);
    return svg;
  }

  function createSvgClipboard() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", "6");
    rect.setAttribute("y", "4");
    rect.setAttribute("width", "12");
    rect.setAttribute("height", "16");
    rect.setAttribute("rx", "2");
    rect.setAttribute("stroke", "#FFFFFF");
    rect.setAttribute("stroke-width", "1.8");

    const topLine = document.createElementNS(ns, "path");
    topLine.setAttribute("d", "M9 2.75H15");
    topLine.setAttribute("stroke", "#FFFFFF");
    topLine.setAttribute("stroke-width", "1.8");
    topLine.setAttribute("stroke-linecap", "round");

    const line1 = document.createElementNS(ns, "path");
    line1.setAttribute("d", "M9 8.5H15");
    line1.setAttribute("stroke", "#FFFFFF");
    line1.setAttribute("stroke-width", "1.6");
    line1.setAttribute("stroke-linecap", "round");

    const line2 = document.createElementNS(ns, "path");
    line2.setAttribute("d", "M9 12H15");
    line2.setAttribute("stroke", "#FFFFFF");
    line2.setAttribute("stroke-width", "1.6");
    line2.setAttribute("stroke-linecap", "round");

    svg.appendChild(rect);
    svg.appendChild(topLine);
    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === "string") node.textContent = text;
    return node;
  }

  function resolveTarget(target) {
    if (typeof target === "string") return document.querySelector(target);
    if (target instanceof Element) return target;
    return null;
  }

  function mount(target, options = {}) {
    injectStyles();

    const container = resolveTarget(target);
    if (!container) {
      throw new Error("Target element not found");
    }

    const config = {
      title: "استبدال",
      sectionLabel: "كود الهدية",
      placeholder: "يرجى إدخال كود الاستبدال...",
      buttonText: "تأكيد",
      value: "",
      embedded: true,
      clearTarget: true,
      onBack: null,
      onConfirm: null,
      ...options
    };

    if (config.clearTarget) {
      container.innerHTML = "";
    }

    const root = el("div", "gp-redeem-root" + (config.embedded ? " gp-embedded" : ""));
    const screen = el("div", "gp-redeem-screen");

    const header = el("div", "gp-redeem-header");
    const title = el("div", "gp-redeem-title", config.title);
    const backBtn = el("button", "gp-redeem-back");
    backBtn.type = "button";
    backBtn.setAttribute("aria-label", "رجوع");
    backBtn.appendChild(createSvgArrow());

    header.appendChild(title);
    header.appendChild(backBtn);

    const card = el("div", "gp-redeem-card");
    const cardTitle = el("div", "gp-redeem-card-title", config.sectionLabel);
    const cardIcon = el("div", "gp-redeem-card-icon");
    cardIcon.appendChild(createSvgClipboard());

    card.appendChild(cardTitle);
    card.appendChild(cardIcon);

    const inputWrap = el("div", "gp-redeem-input-wrap");
    const input = document.createElement("input");
    input.className = "gp-redeem-input";
    input.type = "text";
    input.placeholder = config.placeholder;
    input.value = config.value || "";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.dir = "rtl";
    inputWrap.appendChild(input);

    const spacer = el("div", "gp-redeem-spacer");

    const button = el("button", "gp-redeem-button", config.buttonText);
    button.type = "button";

    screen.appendChild(header);
    screen.appendChild(card);
    screen.appendChild(inputWrap);
    screen.appendChild(spacer);
    screen.appendChild(button);
    root.appendChild(screen);
    container.appendChild(root);

    requestAnimationFrame(() => {
      input.focus();
    });

    backBtn.addEventListener("click", function () {
      if (typeof config.onBack === "function") {
        config.onBack(api);
      }
    });

    button.addEventListener("click", function () {
      const value = input.value.trim();
      if (typeof config.onConfirm === "function") {
        config.onConfirm(value, api);
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        button.click();
      }
    });

    const api = {
      root,
      input,
      button,
      backBtn,
      getValue() {
        return input.value;
      },
      setValue(v) {
        input.value = v == null ? "" : String(v);
      },
      focus() {
        input.focus();
      },
      unmount() {
        if (root.parentNode) {
          root.parentNode.removeChild(root);
        }
      }
    };

    return api;
  }

  window.RedeemPage = {
    mount
  };
})();
