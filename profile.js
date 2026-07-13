/* ========================================================
 *  profile.js  —  ملف تجريبي لاختبار الحقن الديناميكي
 *  يتم تحميله عند الضغط على أيقونة "الملف الشخصي" في الشريط السفلي
 *
 *  الواجهة المطلوبة من الحاقن (injector) في FXER:
 *    window.FXProfile.render(container)
 *      - container: عنصر DOM يجب حقن محتوى البروفايل داخله
 *
 *  لا يمس هذا الملف أي شيء خارج الحاوية الممرَّرة (container)
 *  ولا يعدّل أي متغيّر عام سوى window.FXProfile.
 * ======================================================== */
(function () {
  'use strict';

  // بيانات تجريبية للعرض فقط
  var demoUser = {
    name: 'مستخدم تجريبي',
    id: 'FX-374200',
    email: 'demo@fxer.local',
    balance: '$2,000.00',
    joined: '2025-04-11',
    plan: 'حساب حقيقي',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
  };

  // أدوات صغيرة (خاصة بهذا الملف فقط)
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === 'style' && typeof attrs[k] === 'object') {
          for (var s in attrs[k]) e.style[s] = attrs[k][s];
        } else if (k === 'class') {
          e.className = attrs[k];
        } else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') {
          e.addEventListener(k.substring(2).toLowerCase(), attrs[k]);
        } else {
          e.setAttribute(k, attrs[k]);
        }
      }
    }
    if (children != null) {
      if (!Array.isArray(children)) children = [children];
      children.forEach(function (ch) {
        if (ch == null) return;
        e.appendChild(typeof ch === 'string' ? document.createTextNode(ch) : ch);
      });
    }
    return e;
  }

  function injectLocalStyles() {
    if (document.getElementById('fxProfileLocalStyles')) return;
    var st = document.createElement('style');
    st.id = 'fxProfileLocalStyles';
    st.textContent = [
      '.fxp-wrap{display:flex;flex-direction:column;gap:12px;color:#eef5ff;direction:rtl}',
      '.fxp-head{display:flex;align-items:center;gap:12px;background:#0f1730;border:1px solid #223252;border-radius:12px;padding:12px}',
      '.fxp-head img{width:56px;height:56px;border-radius:50%;background:#1b2440;object-fit:cover;border:1px solid #2a3147}',
      '.fxp-head .fxp-meta{display:flex;flex-direction:column;gap:2px}',
      '.fxp-head .fxp-name{font-size:15px;font-weight:700}',
      '.fxp-head .fxp-id{font-size:11px;color:#7d8fae}',
      '.fxp-head .fxp-badge{display:inline-block;margin-top:4px;font-size:10px;background:#12345a;color:#7fb2ff;border:1px solid #24507f;border-radius:999px;padding:2px 8px;width:fit-content}',
      '.fxp-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
      '.fxp-cell{background:#0f1730;border:1px solid #223252;border-radius:10px;padding:10px}',
      '.fxp-cell small{display:block;color:#7d8fae;font-size:10px;margin-bottom:4px}',
      '.fxp-cell b{font-size:13px;color:#eef5ff}',
      '.fxp-list{background:#0f1730;border:1px solid #223252;border-radius:12px;overflow:hidden}',
      '.fxp-row{display:flex;align-items:center;justify-content:space-between;padding:11px 12px;border-bottom:1px solid #182241;cursor:pointer}',
      '.fxp-row:last-child{border-bottom:0}',
      '.fxp-row .fxp-lbl{display:flex;align-items:center;gap:10px;font-size:13px}',
      '.fxp-row .fxp-ic{width:28px;height:28px;border-radius:8px;background:#12345a;display:inline-flex;align-items:center;justify-content:center;font-size:14px}',
      '.fxp-row .fxp-ar{color:#7d8fae;font-size:14px}',
      '.fxp-tag{background:#12345a;color:#7fb2ff;border:1px solid #24507f;border-radius:999px;padding:2px 8px;font-size:10px}',
      '.fxp-note{font-size:10px;color:#7d8fae;text-align:center;margin-top:4px}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function buildHeader(u) {
    return el('div', { 'class': 'fxp-head' }, [
      el('img', { src: u.avatar, alt: 'avatar' }),
      el('div', { 'class': 'fxp-meta' }, [
        el('div', { 'class': 'fxp-name' }, u.name),
        el('div', { 'class': 'fxp-id' }, u.id + ' • ' + u.email),
        el('span', { 'class': 'fxp-badge' }, u.plan)
      ])
    ]);
  }

  function buildGrid(u) {
    var grid = el('div', { 'class': 'fxp-grid' });
    [
      { l: 'الرصيد',      v: u.balance },
      { l: 'تاريخ الانضمام', v: u.joined },
      { l: 'العملة',      v: 'USD' },
      { l: 'الحالة',      v: 'نشط' }
    ].forEach(function (c) {
      grid.appendChild(
        el('div', { 'class': 'fxp-cell' }, [
          el('small', null, c.l),
          el('b', null, c.v)
        ])
      );
    });
    return grid;
  }

  function buildList() {
    var items = [
      { icon: '👤', label: 'المعلومات الشخصية' },
      { icon: '🔐', label: 'الأمان وكلمة المرور' },
      { icon: '💳', label: 'طرق الدفع' },
      { icon: '🔔', label: 'الإشعارات' },
      { icon: '🌐', label: 'اللغة والمنطقة' },
      { icon: 'ℹ️', label: 'حول التطبيق' }
    ];
    var list = el('div', { 'class': 'fxp-list' });
    items.forEach(function (it) {
      var row = el('div', { 'class': 'fxp-row', role: 'button', tabindex: '0',
        onClick: function () {
          console.log('[FXProfile] item clicked:', it.label);
        }
      }, [
        el('span', { 'class': 'fxp-lbl' }, [
          el('span', { 'class': 'fxp-ic' }, it.icon),
          el('span', null, it.label)
        ]),
        el('span', { 'class': 'fxp-ar' }, '‹')
      ]);
      list.appendChild(row);
    });
    return list;
  }

  function render(container) {
    if (!container) return;
    injectLocalStyles();

    // نظّف الحاوية فقط (لا نلمس أي شيء خارجها)
    while (container.firstChild) container.removeChild(container.firstChild);

    var wrap = el('div', { 'class': 'fxp-wrap' }, [
      buildHeader(demoUser),
      buildGrid(demoUser),
      buildList(),
      el('div', { 'class': 'fxp-note' },
        '✅ تم حقن profile.js بنجاح — هذه واجهة تجريبية للاختبار.')
    ]);
    container.appendChild(wrap);
  }

  // سطح API الذي يستدعيه الحاقن
  window.FXProfile = {
    render: render,
    version: '1.0.0'
  };
})();
