// تطبيق الطيار - صيدليات د/ مراد صادق
(function () {
  "use strict";
  var CFG = self.APP_CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var dig = function (s) { return String(s == null ? "" : s).replace(/[٠-٩]/g, function (x) { return "٠١٢٣٤٥٦٧٨٩".indexOf(x); }); };
  var money = function (n) { return (Math.round((Number(n) || 0) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 }) + " ج.م"; };
  function ld(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function rm(k) { try { localStorage.removeItem(k); } catch (e) {} }

  // ---------- أيقونات ----------
  var P = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M14 10h4M14 14h3"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    bike: '<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M5.5 17 9 9h4l3 8M9 9 8 6H6M13 9h3"/>',
    power: '<path d="M12 3v9"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    list: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    checkc: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    nav: '<path d="M3 11l18-8-8 18-2-8z"/>',
    msg: '<path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>',
    bell: '<path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2h16z"/><path d="M10 21h4"/>',
    logout: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
    store: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
    moon: '<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    hourglass: '<path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/>',
    home: '<path d="M3 11l9-7 9 7v9H3z"/>',
    note: '<path d="M5 4h14v12l-5 5H5z"/><path d="M14 21v-5h5"/>',
    wa: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    scooter: '<circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><path d="M8 17.5h6.5M16.4 17.5 14.6 6.5M12.4 6.5H17M5.5 15c0-3 1.6-4.5 4.2-4.5h3.4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    back: '<path d="M9 6l6 6-6 6"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
    wifiX: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="17.5" cy="17.5" r="5.5" fill="#EF4444" stroke="none"/><path d="M15.2 15.2l4.6 4.6M19.8 15.2l-4.6 4.6" stroke="#fff" stroke-width="2.2"/>'
  };
  var ic = function (n) { return '<svg viewBox="0 0 24 24"' + (n === "wa" ? ' class="fi"' : "") + ' aria-hidden="true">' + (P[n] || "") + "</svg>"; };

  // ---------- الحالة ----------
  var S = { view: "splash", tab: "new", page: null, inv: {}, open: null, fee: 0, eh: null, earn: null, shiftStart: 0, accAt: {}, queue: ld("mrf_queue", []), acked: [], localDone: ld("mrf_ldone", {}), weak: 0, flushing: false, flushT: null, failN: 0, creds: ld("mrf_creds", null), pilot: ld("mrf_pilot", null), pool: [], mine: [], history: [], seen: null, loaded: false,
    online: true, busy: false, keys: {}, flash: {}, pos: null, geoOn: false, etaSent: {}, etaTxt: {}, token: ld("mrf_token", ""), tokenSent: "", pushReady: false, msg: "", pendT: null, pollT: null, lastSync: 0 };
  var native = function () { return !!(self.Capacitor && self.Capacitor.isNativePlatform && self.Capacitor.isNativePlatform()); };
  var plug = function (n) { return self.Capacitor && self.Capacitor.Plugins && self.Capacitor.Plugins[n]; };
  var pushOn = function () { return CFG.PUSH_ENABLED === true; };
  var fbOK = function () { var F = CFG.FIREBASE || {}; return !!(F.apiKey && F.projectId && F.messagingSenderId && F.appId && F.vapidKey); };

  // ---------- الشبكة ----------
  function api(action, extra, creds, ms) {
    var c = creds || S.creds || {}, t0 = Date.now();
    var body = Object.assign({ action: action, phone: c.phone, password: c.password }, extra || {});
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null, t = setTimeout(function () { if (ctl) ctl.abort(); }, ms || 20000);
    return fetch(CFG.ORDERS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), redirect: "follow", signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, status: "network", message: "مفيش اتصال بالنت" }; })
      .then(function (j) { clearTimeout(t); if (j && j.status !== "network" && Date.now() - t0 > 8000) S.weak = Date.now() + 40000; return j || { ok: false, status: "network", message: "رد غير مفهوم من السيرفر" }; });
  }

  // ---------- أدوات واجهة ----------
  function toast(msg, kind, ms) {
    var box = $("toasts"); box.innerHTML = ""; var el = document.createElement("div"); el.className = "toast " + (kind || ""); el.textContent = msg; box.appendChild(el);
    setTimeout(function () { el.remove(); }, ms || 3200);
  }
  function vib(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  var actx = null;
  function unlockAudio() { try { if (!actx) actx = new (self.AudioContext || self.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {} }
  function beep(n) {
    try {
      unlockAudio(); if (!actx) return;
      for (var i = 0; i < (n || 3); i++) {
        var o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + i * 0.32;
        o.type = "sine"; o.frequency.value = i % 2 ? 880 : 1175; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
        o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + 0.3);
      }
    } catch (e) {}
  }
  document.addEventListener("pointerdown", unlockAudio, { once: true });

  function sheet(html) { var s = $("sheet"); s.innerHTML = '<div class="box">' + html + "</div>"; s.hidden = false; }
  function closeSheet() { var s = $("sheet"); s.hidden = true; s.innerHTML = ""; }
  $("sheet").addEventListener("click", function (e) { if (e.target === this && this._cancel) this._cancel(); });
  function confirmSheet(o) {
    return new Promise(function (res) {
      var s = $("sheet"), done = function (v) { s._cancel = null; closeSheet(); res(v); };
      sheet("<h4>" + esc(o.title) + "</h4>" + (o.text ? "<p>" + esc(o.text) + "</p>" : "") + (o.big ? '<div class="big">' + esc(o.big) + "</div>" : "") +
        '<div class="row2"><button class="btn ' + (o.cls || "pri") + '" id="cfOk">' + esc(o.ok || "تأكيد") + '</button><button class="btn sec" id="cfNo">رجوع</button></div>');
      s._cancel = function () { done(false); };
      $("cfOk").onclick = function () { done(true); }; $("cfNo").onclick = function () { done(false); };
    });
  }

  // ---------- تحليل بيانات الطلب ----------
  // نفس منطق فاتورة تطبيق العميل (سعر القطعة بيراعي هدية/خصم الكمية)
  function parseLines(txt) {
    return String(txt || "").split("\n").filter(Boolean).map(function (x) {
      var m = String(x).match(/^(.*?)\s×\s(\d+)(?:\s\(\+(\d+)\s([^)]*)\))?\s=\s([\d.,]+)/);
      if (!m) return { n: String(x), q: 0, t: 0, p: 0, raw: true };
      var q = +m[2], t = parseFloat(m[5].replace(/,/g, "")) || 0, ex = +m[3] || 0, w = m[4] || "", f = 0;
      if (ex) { var pc = w.match(/خصم\s*(\d+(?:\.\d+)?)\s*%/); f = /هدي/.test(w) ? 0 : /نص/.test(w) ? 0.5 : pc ? 1 - parseFloat(pc[1]) / 100 : 0; }
      return { n: m[1].trim(), q: q, t: t, p: q ? t / (q + ex * f) : 0, ex: ex, w: w };
    });
  }
  var num = function (n) { return (Math.round((Number(n) || 0) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 }); };
  function invTotal(o) { var sum = parseLines(o.items).reduce(function (a, l) { return a + l.t; }, 0); return (sum > 0 ? sum : Number(o.total) || 0) + (Number(S.fee) || 0); }
  function ageNow(o) { return o.ageMin >= 0 ? o.ageMin + Math.floor((Date.now() - (S.lastSync || Date.now())) / 60000) : -1; }
  function fmtAge(m) {
    if (m < 0) return "—"; if (m < 1) return "الآن"; if (m < 60) return m + " دقيقة";
    if (m < 1440) { var h = Math.floor(m / 60), r = m % 60; return h + " ساعة" + (r ? " و " + r + " دقيقة" : ""); }
    return Math.floor(m / 1440) + " يوم";
  }
  var ageCls = function (m) { return m < 0 ? "" : m < 10 ? "g" : m < 20 ? "y" : "r"; };
  function coordsFrom(s) {
    s = decodeURIComponent(String(s || "").replace(/%(?![0-9a-f]{2})/gi, ""));
    var m = s.match(/@(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/) || s.match(/[?&](?:q|ll|query|destination)=(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/) || s.match(/^\s*(-?\d{1,3}\.\d{3,})\s*[,،]\s*(-?\d{1,3}\.\d{3,})\s*$/);
    if (!m) return null;
    var la = +m[1], lo = +m[2]; return Math.abs(la) <= 90 && Math.abs(lo) <= 180 ? { lat: la, lng: lo } : null;
  }
  function storePt() { var s = CFG.STORE || {}; return typeof s.lat === "number" && typeof s.lng === "number" ? { lat: s.lat, lng: s.lng } : null; }
  function custMap(o) {
    var c = coordsFrom(o.cloc);
    if (c) return "https://www.google.com/maps/dir/?api=1&destination=" + c.lat + "," + c.lng + "&travelmode=driving";
    if (/^https?:\/\//i.test(o.cloc || "")) return o.cloc;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([o.area, o.street, o.landmark].filter(Boolean).join(" "));
  }
  function storeMap(o) {
    var s = CFG.STORE || {}, p = storePt();
    if (s.mapUrl) return s.mapUrl;
    if (p) return "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng + "&travelmode=driving";
    if (o && /^https?:\/\//i.test(o.sloc || "")) return o.sloc;
    return /^https?:\/\//i.test(S.mineStore || "") ? S.mineStore : "";
  }
  function hav(a, b) {
    var R = 6371, r = Math.PI / 180, dl = (b.lat - a.lat) * r, dn = (b.lng - a.lng) * r;
    var x = Math.sin(dl / 2) * Math.sin(dl / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dn / 2) * Math.sin(dn / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function fmtMin(m) { return m < 60 ? m + " دقيقة" : Math.floor(m / 60) + " ساعة" + (m % 60 ? " و" + (m % 60) + " دقيقة" : ""); }
  var todayKey = function () { var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); };

  // ---------- الثيم ----------
  function applyTheme() {
    var t = ld("mrf_theme", "auto"), dark = t === "dark" || (t === "auto" && !(self.matchMedia && matchMedia("(prefers-color-scheme: light)").matches));
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = dark ? "#0F1115" : "#F5F6F8";
  }

  // ====================== شاشات الدخول ======================
  function setView(v, msg) { S.view = v; S.msg = msg || ""; render(); }
  function authShell(inner) { return '<div class="auth"><img class="logo" src="assets/logo.png" alt=""><h1>' + esc(CFG.APP_NAME || "تطبيق الطيار") + '</h1>' + inner + "</div>"; }
  function msgBox(kind) { return S.msg ? '<div class="msg ' + (kind || "bad") + '" id="authMsg">' + esc(S.msg) + "</div>" : '<div id="authMsg"></div>'; }
  function field(id, label, icon, attrs, extra) {
    return '<div class="fld"><label for="' + id + '">' + label + '</label><div class="inp" id="w_' + id + '">' + ic(icon) + "<input id=\"" + id + "\" " + attrs + ">" + (extra || "") + "</div></div>";
  }
  function viewLogin() {
    return authShell('<div class="sub">سجّل دخولك علشان تستقبل الطلبات</div>' + msgBox() +
      field("lp", "رقم الموبايل", "phone", 'type="tel" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx" autocomplete="username"') +
      field("lw", "كلمة المرور", "lock", 'type="password" placeholder="كلمة المرور" autocomplete="current-password"', '<button type="button" class="eye" id="lEye" aria-label="إظهار">' + ic("eye") + "</button>") +
      '<button class="btn pri" id="lGo">' + ic("bike") + " تسجيل الدخول</button>" +
      '<button class="link" id="toReg">طيار جديد؟ قدّم طلب انضمام</button>');
  }
  function viewRegister() {
    var max = new Date(); max.setFullYear(max.getFullYear() - 16);
    return authShell('<div class="sub">اكتب بياناتك وهنراجعها ونفعّل حسابك</div>' + msgBox() +
      field("rn", "الاسم بالكامل (ثلاثي أو رباعي)", "user", 'type="text" placeholder="مثال: أحمد محمد علي حسن" autocomplete="name"') +
      field("rp", "رقم الموبايل", "phone", 'type="tel" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx"') +
      field("rw", "كلمة المرور (6 على الأقل)", "lock", 'type="password" placeholder="اختار كلمة مرور" autocomplete="new-password"', '<button type="button" class="eye" id="rEye" aria-label="إظهار">' + ic("eye") + "</button>") +
      field("ra", "العنوان بالتفصيل", "pin", 'type="text" placeholder="المنطقة / الشارع"') +
      field("ri", "الرقم القومي (14 رقم)", "id", 'type="tel" inputmode="numeric" maxlength="14" placeholder="14 رقم"') +
      field("rb", "تاريخ الميلاد", "cal", 'type="date" max="' + max.toISOString().slice(0, 10) + '"') +
      '<div class="fld"><label for="rv">المركبة</label><div class="inp">' + ic("bike") + '<select id="rv"><option>موتوسيكل</option><option>عجلة كهربائية</option><option>عجلة عادية</option><option>سكوتر</option></select></div></div>' +
      '<button class="btn pri" id="rGo">' + ic("check") + " إرسال طلب الانضمام</button>" +
      '<button class="link" id="toLogin">رجوع لتسجيل الدخول</button>');
  }
  function viewStatus(kind) {
    var M = { pending: ["hourglass", "حسابك قيد المراجعة", "الإدارة بتراجع بياناتك. أول ما توافق هتدخل التطبيق لوحدك من غير ما تعمل حاجة.", ""],
      rejected: ["ban", "تم رفض طلب الانضمام", S.msg || "كلّم الإدارة لو محتاج تعرف السبب.", "bad"], blocked: ["ban", "الحساب متوقف", S.msg || "كلّم الإدارة.", "bad"],
      retry: ["wifi", "مفيش اتصال", "اتأكد من النت وجرّب تاني.", ""] }[kind];
    return authShell('<div class="status ' + M[3] + '"><div class="ico">' + ic(M[0]) + "</div><h2>" + M[1] + "</h2><p>" + esc(M[2]) + "</p>" +
      (kind === "pending" ? '<div class="spin"></div><p style="margin-top:12px;font-size:13px">بنتأكد كل ثواني...</p>' : "") +
      (kind === "retry" ? '<button class="btn pri" id="retry">إعادة المحاولة</button>' : "") + "</div>" +
      '<button class="link" id="outBtn">' + (kind === "pending" ? "تسجيل خروج" : "الرجوع لشاشة الدخول") + "</button>");
  }
  function showMsg(t, kind) { var m = $("authMsg"); if (m) { m.className = "msg " + (kind || "bad"); m.textContent = t; m.scrollIntoView({ block: "nearest" }); } }
  var phoneOK = function (p) { return /^01[0125]\d{8}$/.test(p); };

  function bindAuth() {
    var v = S.view;
    ["lp", "rp", "ri"].forEach(function (id) { var e = $(id); if (e) e.addEventListener("input", function () { var p = e.selectionStart; e.value = dig(e.value).replace(/\D/g, ""); }); });
    var eye = function (btn, inp) { var b = $(btn); if (b) b.onclick = function () { var i = $(inp); i.type = i.type === "password" ? "text" : "password"; }; };
    eye("lEye", "lw"); eye("rEye", "rw");
    if (v === "login") {
      $("toReg").onclick = function () { setView("register"); };
      var go = function () {
        var p = $("lp").value.trim(), w = $("lw").value;
        if (!phoneOK(p)) return showMsg("اكتب رقم موبايل مصري صحيح (11 رقم)");
        if (!w) return showMsg("اكتب كلمة المرور");
        var b = $("lGo"); b.disabled = true; b.innerHTML = '<span class="spin"></span>';
        S.creds = { phone: p, password: w };
        api("pilotLogin", { token: S.token }).then(function (r) { handleAuth(r, true); });
      };
      $("lGo").onclick = go; $("lw").addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
    } else if (v === "register") {
      $("toLogin").onclick = function () { setView("login"); };
      $("rGo").onclick = function () {
        var d = { name: $("rn").value.trim().replace(/\s+/g, " "), phone: $("rp").value.trim(), password: $("rw").value, address: $("ra").value.trim(), idCard: $("ri").value.trim(), birthDate: $("rb").value, vehicle: $("rv").value, token: S.token };
        if (d.name.split(" ").length < 3) return showMsg("اكتب الاسم ثلاثي أو رباعي");
        if (!phoneOK(d.phone)) return showMsg("رقم الموبايل لازم يكون مصري من 11 رقم");
        if (d.password.length < 6) return showMsg("كلمة المرور 6 حروف أو أرقام على الأقل");
        if (d.address.length < 6) return showMsg("اكتب العنوان بالتفصيل");
        if (!/^\d{14}$/.test(d.idCard)) return showMsg("الرقم القومي 14 رقم");
        if (!d.birthDate) return showMsg("اختار تاريخ الميلاد");
        var b = $("rGo"); b.disabled = true; b.innerHTML = '<span class="spin"></span>';
        api("pilotRegister", d, {}).then(function (r) {
          if (r && r.ok) { S.creds = { phone: d.phone, password: d.password }; sv("mrf_creds", S.creds); setView("pending"); startPending(); }
          else { b.disabled = false; b.innerHTML = ic("check") + " إرسال طلب الانضمام"; showMsg((r && r.message) || "حصلت مشكلة، جرّب تاني"); }
        });
      };
    } else if (v === "pending" || v === "rejected" || v === "blocked" || v === "retry") {
      var out = $("outBtn"); if (out) out.onclick = function () { logout(true); };
      var rt = $("retry"); if (rt) rt.onclick = function () { setView("splash"); loginFlow(); };
    }
  }

  function handleAuth(r, fromForm) {
    var st = r && r.status;
    if (r && r.ok) { S.pilot = r.pilot; sv("mrf_creds", S.creds); sv("mrf_pilot", S.pilot); return enterMain(); }
    if (st === "network") {
      if (S.pilot && !fromForm) return enterMain();
      if (fromForm) { S.creds = ld("mrf_creds", null); return setView("login", "مفيش اتصال بالنت، جرّب تاني"); }
      return setView("retry");
    }
    if (st === "pending_approval") { sv("mrf_creds", S.creds); if (S.view !== "pending") { setView("pending"); startPending(); } return; }
    if (st === "rejected") { stopAll(); return setView("rejected", r.message); }
    if (st === "suspended_temp" || st === "suspended_permanent") { stopAll(); return setView("blocked", r.message); }
    stopPending(); S.creds = null; rm("mrf_creds"); rm("mrf_pilot"); S.pilot = null;
    setView("login", (r && r.message) || "حصلت مشكلة، جرّب تاني");
  }
  function loginFlow() { api("pilotLogin", { token: S.token }).then(function (r) { handleAuth(r, false); }); }
  function startPending() { stopPending(); S.pendT = setInterval(function () { if (S.view === "pending" && S.creds) loginFlow(); }, 12000); }
  function stopPending() { if (S.pendT) { clearInterval(S.pendT); S.pendT = null; } }
  function stopAll() { stopPending(); if (S.pollT) { clearInterval(S.pollT); S.pollT = null; } stopGeo(); }
  function logout(skipConfirm) {
    var go = function () { stopAll(); S.creds = null; S.pilot = null; S.pool = []; S.mine = []; S.history = []; S.loaded = false; S.seen = null; S.pushReady = false; rm("mrf_creds"); rm("mrf_pilot"); setView("login"); };
    if (skipConfirm) return go();
    if (S.mine.length) return toast("معاك طلبات شغالة، خلّصها الأول", "bad");
    confirmSheet({ title: "تسجيل الخروج", text: "متأكد إنك عايز تخرج؟ مش هتوصلك إشعارات طلبات جديدة.", ok: "خروج", cls: "dng" }).then(function (y) { if (y) go(); });
  }

  // ====================== الشاشة الرئيسية ======================
  function enterMain() {
    stopPending(); loadEarn(); S.view = "main"; S.tab = S.tab || "new"; S.page = null; S.loaded = false; S.seen = null;
    var cc = ld("mrf_cache", null); if (cc && cc.mine && S.creds && cc.phone === S.creds.phone) { S.mine = overlay(cc.mine, cc.history || []).mine; S.history = overlay(cc.mine, cc.history || []).hist; }
    history.replaceState({ r: 1 }, ""); history.pushState({ r: 2 }, "");
    render(); refresh();
    if (S.pollT) clearInterval(S.pollT);
    S.pollT = setInterval(function () { if (!document.hidden) refresh(); }, CFG.POLL_MS || 10000);
    setTimeout(initPush, 800);
    if (S.queue.length) scheduleFlush(300);
  }

  function refresh() {
    if (S.busy || S.view !== "main") return Promise.resolve();
    S.busy = true;
    return api("riderOrders", { token: S.token }, null, 14000).then(function (r) {
      S.busy = false;
      if (S.view !== "main") return;
      if (!r || !r.ok) {
        if (r && /rejected|suspended|pending_approval|wrong_password|not_found/.test(r.status || "")) return handleAuth(r, false);
        S.online = false; if (!S.loaded) { S.loaded = true; S.pool = []; } return render();
      }
      S.online = true; S.lastSync = Date.now(); S.pilot = r.pilot; sv("mrf_pilot", S.pilot); S.mineStore = r.store || "";
      var oldMine = {}; S.mine.forEach(function (o) { oldMine[o.bon] = 1; });
      S.fee = Number(r.deliveryFee) || 0; S.pool = r.pool || []; var ov = overlay(r.mine || [], r.history || []); seedEarn(r.history || []); S.mine = ov.mine; S.history = ov.hist; saveCache();
      var cur = {}, fresh = [], wk = !!(S.pilot && S.pilot.working);
      S.pool.forEach(function (o) { cur[o.bon] = 1; if (wk && S.seen && !S.seen[o.bon]) fresh.push(o.bon); });
      S.seen = wk ? cur : null;      // أول تحميل بعد "يعمل الآن" بيعتبر الطلبات الموجودة معروفة (من غير إشعار)
      if (fresh.length) { beep(3); vib([250, 120, 250, 120, 250]); toast(fresh.length === 1 ? "طلب جديد #" + fresh[0] : "وصل " + fresh.length + " طلبات جديدة", "or", 4500); }
      S.loaded = true; render();
      S.mine.length ? startGeo() : stopGeo();
    });
  }
  function toggleShift() {
    if (S.keys.shift) return; var want = !(S.pilot && S.pilot.working);
    if (!want && S.mine.length) return toast("معاك طلب شغال، خلّصه الأول وبعدين وقّف الشغل", "bad");
    S.keys.shift = 1; render();
    api("riderShift", { working: want }).then(function (r) {
      delete S.keys.shift;
      if (r && r.ok) { S.pilot.working = !!r.working; sv("mrf_pilot", S.pilot); toast(r.working ? "تمام، أنت شغال دلوقتي ✅" : "وقفت الشغل", r.working ? "ok" : ""); refresh(); }
      else { toast((r && r.message) || "مقدرتش أغيّر الحالة", "bad"); render(); }
    });
  }
  function accept(bon) {
    var k = "acc" + bon; if (S.keys[k]) return;
    if (navigator.onLine === false) return toast("مفيش نت — قبول الطلب محتاج اتصال علشان محدش يسبقك عليه", "bad", 4000);
    S.keys[k] = 1; render();
    api("riderAccept", { bon: bon }).then(function (r) {
      delete S.keys[k];
      if (r && r.ok) {
        vib(60); toast("اتقبل الطلب #" + bon + " ✅", "ok"); S.online = true; S.tab = "acc"; S.page = null; S.open = bon; S.accAt[bon] = Date.now(); saveEarn();
        if (r.order) { S.pool = S.pool.filter(function (x) { return x.bon !== bon; }); S.mine = S.mine.filter(function (x) { return x.bon !== bon; }).concat([r.order]); saveCache(); render(); S.flash = {}; startGeo(); }
        else refresh();
      } else if (r && r.status === "network") { S.online = false; toast("النت ضعيف أو فاصل — الطلب لسه ماتقبلش، جرّب تاني", "bad", 4500); render(); }
      else { toast((r && r.message) || "مقدرتش أقبل الطلب", "bad"); if (r && /taken|gone|limit|not_working/.test(r.status || "")) refresh(); else render(); }
    });
  }
  var STAGE_BTN = { accepted: ["prepare", "وصلت الصيدلية", "pri"], preparing: ["deliver", "تم تجهيز الطلب — توصيل الطلب", "pri"], delivering: ["complete", "تم توصيل الطلب", "ok"] };
  // ---------- الطابور المحلي (أوفلاين) ----------
  var RANK = { accepted: 0, preparing: 1, delivering: 2 };
  function saveQueue() { sv("mrf_queue", S.queue); }
  function saveCache() { sv("mrf_cache", { phone: S.creds && S.creds.phone, mine: S.mine, history: S.history.filter(function (h) { return !h.pending; }), t: Date.now() }); sv("mrf_ldone", S.localDone); }
  var nowKey = function () { var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()); };
  var pendingFor = function (bon) { return S.queue.some(function (q) { return q.bon === bon; }); };
  // بيطبّق الخطوات اللي لسه ماتأكدتش من السيرفر فوق البيانات الجاية منه (علشان الشاشة متتراجعش)
  function overlay(mine, hist) {
    var now = Date.now(), ops = S.queue.concat(S.acked.filter(function (a) { return now - a.t < 25000; })), done = {}, st = {};
    ops.forEach(function (op) { if (op.stage === "complete") done[op.bon] = 1; else { var x = op.stage === "prepare" ? "preparing" : "delivering"; if (!(op.bon in st) || RANK[x] > RANK[st[op.bon]]) st[op.bon] = x; } });
    var m = mine.filter(function (o) { return !done[o.bon]; }).map(function (o) { if (st[o.bon] && RANK[st[o.bon]] > RANK[o.stage]) o.stage = st[o.bon]; return o; });
    var have = {}; hist.forEach(function (h) { have[h.bon] = 1; });
    var extra = [];
    Object.keys(S.localDone).forEach(function (b) { var e = S.localDone[b]; if (have[b] || (!pendingFor(+b) && now - e.t > 60000)) delete S.localDone[b]; else extra.push(e); });
    extra.sort(function (a, b) { return b.t - a.t; });
    return { mine: m, hist: extra.concat(hist) };
  }
  function scheduleFlush(ms) { clearTimeout(S.flushT); S.flushT = setTimeout(flush, ms); }
  function flush() {
    if (S.flushing || !S.queue.length || !S.creds || S.view !== "main") return;
    S.flushing = true; var sent = 0;
    (function next() {
      var op = S.queue[0];
      if (!op) { S.flushing = false; S.online = true; S.failN = 0; if (sent) toast("اتبعتت " + sent + (sent > 2 ? " خطوات" : " خطوة") + " للسيرفر ✅", "ok", 3500); saveCache(); render(); refresh(); return; }
      api("riderStage", { bon: op.bon, stage: op.stage, at: op.at }, null, 25000).then(function (r) {
        if (r && r.status === "network") { S.flushing = false; S.online = false; S.failN++; render(); return scheduleFlush(Math.min(4000 * S.failN, 30000)); }
        if (r && /wrong_password|not_found|rejected|suspended|pending_approval|too_many/.test(r.status || "")) { S.flushing = false; return handleAuth(r, false); }
        S.online = true; S.queue.shift(); saveQueue(); S.acked.push({ bon: op.bon, stage: op.stage, t: Date.now() });
        if (r && r.ok) sent++; else toast("الطلب #" + op.bon + ": " + ((r && r.message) || "مقدرتش أسجّل الخطوة"), "bad", 5000);
        next();
      });
    })();
  }
  setInterval(function () { if (S.queue.length && !S.flushing && S.view === "main") flush(); }, 8000);
  self.addEventListener("offline", function () { S.online = false; if (S.view === "main") render(); });
  self.addEventListener("online", function () { if (S.view === "main") { S.online = true; render(); if (S.queue.length) scheduleFlush(200); refresh(); } });

  function stage(bon, st) {
    var o = S.mine.filter(function (x) { return x.bon === bon; })[0]; if (!o) return;
    var run = function () {
      vib(60);
      if (st === "complete") {
        var tot = invTotal(o);
        S.mine = S.mine.filter(function (x) { return x.bon !== bon; });
        S.localDone[bon] = { bon: bon, name: o.name, area: o.area, total: tot, doneAt: nowKey(), t: Date.now(), pending: true };
        addEarn({ bon: bon, name: o.name, area: o.area, orderCost: tot, fee: fee(), acceptedAt: S.accAt[bon] || 0, deliveredAt: Date.now(), status: "completed", items: o.items }); if (S.open === bon) S.open = null;
        S.history = [S.localDone[bon]].concat(S.history.filter(function (h) { return h.bon !== bon; }));
        S.etaTxt && delete S.etaTxt[bon];
      } else o.stage = st === "prepare" ? "preparing" : "delivering";
      if (st === "prepare") S.tab = "del";
      S.queue.push({ id: Date.now() + "" + Math.floor(Math.random() * 999), bon: bon, stage: st, at: Date.now() });
      saveQueue(); saveCache(); S.etaSent = {};
      if (!S.online || navigator.onLine === false) toast("مفيش نت — الخطوة اتحفظت وهتتبعت أول ما النت يرجع", "or", 4500);
      else toast(st === "complete" ? "تم التوصيل 🎉 تسلم إيدك" : st === "deliver" ? "الطلب في الطريق للعميل 🛵" : "جاري التجهيز — كمّل من تبويب التوصيل", "ok");
      render(); if (!S.mine.length) stopGeo(); scheduleFlush(0);
    };
    if (st === "complete") confirmSheet({ title: "تأكيد التوصيل", text: "اتأكد إنك سلّمت الطلب وحصّلت المبلغ من العميل:", big: money(invTotal(o)), ok: "تم التوصيل", cls: "ok" }).then(function (y) { if (y) run(); });
    else run();
  }
  function release(bon) {
    if (navigator.onLine === false) return toast("مفيش نت — التنازل عن الطلب محتاج اتصال", "bad");
    confirmSheet({ title: "التنازل عن الطلب", text: "الطلب هيرجع لقايمة الطلبات الجديدة وهيوصل إشعار لباقي الطيارين.", ok: "تنازل", cls: "dng" }).then(function (y) {
      if (!y) return;
      api("riderRelease", { bon: bon }).then(function (r) {
        if (r && r.ok) { var oo = S.mine.filter(function (x) { return x.bon === bon; })[0]; if (oo) addEarn({ bon: bon, name: oo.name, area: oo.area, orderCost: invTotal(oo), fee: 0, acceptedAt: S.accAt[bon] || 0, cancelledAt: Date.now(), status: "cancelled", items: oo.items }); if (S.open === bon) S.open = null; toast("اتنازلت عن الطلب"); refresh(); } else toast((r && r.message) || "مقدرتش أتنازل عن الطلب", "bad");
      });
    });
  }

  // ---------- العرض ----------
  function invoiceHTML(o, withShip) {
    var L = parseLines(o.items), tot = invTotal(o);
    var rows = L.map(function (l) {
      return '<tr><td class="inv-n">' + esc(l.n) + (l.ex ? '<span class="inv-bx">+' + l.ex + " " + esc(l.w) + "</span>" : "") + "</td><td>" + (l.raw ? "-" : num(l.p)) + "</td><td>" + (l.raw ? "-" : l.q) + "</td><td><b>" + (l.raw ? "-" : num(l.t)) + "</b></td></tr>";
    }).join("");
    if (withShip) rows += '<tr class="ship"><td class="inv-n">التوصيل</td><td>—</td><td>—</td><td><b>' + num(S.fee) + "</b></td></tr>";
    return '<div class="inv"><div class="inv-h"><b>صيدليات د/ مراد صادق</b><img src="assets/logo.png" alt=""></div><div class="inv-sub">فاتورة طلب رقم ' + o.bon + (o.dateTxt ? " · " + esc((o.day ? o.day + " " : "") + o.dateTxt) : "") + (o.timeTxt ? " · " + esc(o.timeTxt) : "") + "</div>" +
      '<table class="inv-t"><thead><tr><th class="inv-n">اسم الصنف</th><th>سعر القطعة</th><th>العدد</th><th>الإجمالي</th></tr></thead><tbody>' + rows +
      '</tbody><tfoot><tr><td colspan="4"><div class="inv-f"><span>الإجمالي النهائي</span><b>' + num(tot) + " ج.م</b></div></td></tr></tfoot></table></div>";
  }
  function invBlock(o, withShip) {
    var on = !!S.inv[o.bon];
    return '<div class="od-inv' + (on ? " open" : "") + '" data-ib="' + o.bon + '"><button type="button" class="invbtn" data-inv="' + o.bon + '">' + ic("receipt") + '<span class="tx">' + (on ? "إخفاء الفاتورة" : "الطلب") + "</span>" + ic("chev") + '</button><div class="inv-wrap"><div class="inv-in">' + invoiceHTML(o, withShip) + "</div></div></div>";
  }
  function tcardHTML(o) {
    var ag = ageNow(o);
    return '<div class="tcard sm"><div><small>اليوم</small><b>' + esc(o.day || "—") + (o.dateTxt ? "<span>(" + esc(o.dateTxt) + ")</span>" : "") + '</b></div><div><small>الساعة</small><b>' + esc(o.timeTxt || "—") + '</b></div><div><small>التأخير</small><b class="' + ageCls(ag) + '">' + esc(fmtAge(ag)) + "</b></div></div>";
  }
  // كارت واحد بيتفتح في نفس الوقت (الهيدر بيفتح، والسهم بيقفل)
  function accCard(o, tagHTML, bodyFn) {
    var open = S.open === o.bon;
    return '<div class="card ac' + (open ? " open" : "") + '" id="c' + o.bon + '">' +
      '<' + (open ? "div" : "button") + ' class="ahead"' + (open ? "" : ' data-open="' + o.bon + '"') + '><span class="bon">#' + o.bon + '</span><span class="narea">' + esc(o.area || "—") + '</span><span class="aside">' + tagHTML +
      (open ? '<button class="arw" data-close="1" aria-label="قفل">' + ic("chev") + "</button>" : '<span class="arw">' + ic("chev") + "</span>") + "</" + (open ? "div" : "button") + '><div class="glowln"></div>' + tcardHTML(o) +
      (open ? '<div class="abody">' + bodyFn() + "</div>" : "") + "</div>";
  }
  function poolCard(o) {
    var k = "acc" + o.bon, nt = (o.note || "").trim();
    return accCard(o, '<span class="newtag">طلب جديد</span>', function () {
      return invBlock(o, false) + (nt ? '<div class="note">' + esc(nt) + "</div>" : "") +
        '<button class="btn pri" data-acc="' + o.bon + '" style="margin-top:10px"' + (S.keys[k] ? " disabled" : "") + ">" + (S.keys[k] ? '<span class="spin"></span>' : ic("check") + " قبول الطلب") + "</button>";
    });
  }
  // شريط المراحل: تم القبول ← الوصول/تجهيز الطلب ← توصيل الطلب ← تم التوصيل
  function stepsHTML(stg) {
    var d = [{ c: "done", l: "تم القبول", i: "check" }, { c: "cur", l: "الوصول", sub: "تجهيز الطلب" }, { c: "", l: "توصيل الطلب" }, { c: "", l: "تم التوصيل" }];
    if (stg === "preparing") d[1] = { c: "prog", l: "جاري التجهيز" };
    if (stg === "delivering") { d[1] = { c: "done", l: "تم التجهيز", i: "check" }; d[2] = { c: "prog", l: "جاري التوصيل" }; }
    return '<div class="steps">' + d.map(function (x) { return '<div class="st ' + x.c + '"><i>' + (x.i ? ic(x.i) : x.c === "prog" || x.c === "cur" ? "<em></em>" : "") + "</i><span>" + x.l + "</span>" + (x.sub ? "<small>" + x.sub + "</small>" : "") + "</div>"; }).join("") + "</div>";
  }
  function mineCard(o) {
    var k = "st" + o.bon, sb = STAGE_BTN[o.stage], et = S.etaTxt[o.bon] || "", wa = "https://wa.me/2" + String(o.phone || "").replace(/^0/, "");
    var nm = String(o.name || "").trim().split(/\s+/).slice(0, 3).join(" "), tag = o.stage === "accepted" ? "تم القبول" : o.stage === "preparing" ? "جاري التجهيز" : "جاري التوصيل";
    return accCard(o, '<span class="mtag ' + o.stage + '">' + tag + "</span>" + (pendingFor(o.bon) ? '<span class="syn">' + ic("clock") + "مزامنة</span>" : ""), function () {
      return '<div class="cust"><div class="crow"><b class="cname">' + esc(nm) + '</b><div class="cbtns"><a class="ib call" href="tel:' + esc(o.phone) + '" aria-label="اتصال">' + ic("phone") + '</a><a class="ib wa" href="' + esc(wa) + '" target="_blank" rel="noopener" aria-label="واتساب">' + ic("wa") + '</a><button class="ib chat" data-chat="1" aria-label="شات">' + ic("chat") + "</button></div></div>" +
        '<div class="sepl"></div><div class="crow"><div class="addr">' + esc([o.area, o.street].filter(Boolean).join(" — ") || "—") + (o.landmark ? "<small>علامة مميزة: " + esc(o.landmark) + "</small>" : "") + '</div><a class="ib map" href="' + esc(custMap(o)) + '" target="_blank" rel="noopener" aria-label="الموقع على الخريطة">' + ic("pin") + "</a></div></div>" +
        stepsHTML(o.stage) + (et ? '<div class="eta">' + ic("clock") + esc(et) + "</div>" : "") + invBlock(o, true) + (o.note ? '<div class="note">' + esc(o.note) + "</div>" : "") +
        '<button class="btn ' + sb[2] + '" data-st="' + o.bon + "|" + sb[0] + '" style="margin-top:10px"' + (S.keys[k] ? " disabled" : "") + ">" + (S.keys[k] ? '<span class="spin"></span>' : sb[1]) + "</button>" +
        (o.stage === "accepted" ? '<button class="link" data-rel="' + o.bon + '" style="color:var(--bad)">تنازل عن الطلب</button>' : "");
    });
  }
  function vNew() {
    var w = S.pilot && S.pilot.working, h = pushBanner();
    if (!w) return h + '<div class="empty">' + ic("power") + "<b>أنت دلوقتي «لا يعمل»</b>شغّل حالتك علشان تظهرلك الطلبات الجديدة.</div>";
    if (!S.online && !S.pool.length) return h + '<div class="empty">' + ic("wifiX") + "<b>مفيش اتصال بالنت</b>الطلبات الجديدة هتظهر أول ما النت يرجع.</div>";
    if (!S.loaded) return h + '<div class="empty"><span class="spin"></span></div>';
    if (!S.pool.length) return h + '<div class="empty">' + ic("box") + "<b>مفيش طلبات جديدة دلوقتي</b>هننبّهك بصوت واهتزاز أول ما يوصل طلب (سيب التطبيق مفتوح).</div>";
    return h + '<h3 class="sec">الطلبات الجديدة <small>(الأسرع بيقبل)</small></h3>' + S.pool.map(poolCard).join("");
  }
  function vAcc() {
    var L = S.mine.filter(function (o) { return o.stage === "accepted"; });
    if (!L.length) return '<div class="empty">' + ic("checkc") + "<b>مفيش طلبات مقبولة</b>الطلبات اللي بتقبلها بتظهر هنا لحد ما توصل الصيدلية.</div>";
    return '<h3 class="sec">الطلبات المقبولة <small>(' + L.length + ")</small></h3>" + L.map(mineCard).join("");
  }
  function vDel() {
    var L = S.mine.filter(function (o) { return o.stage !== "accepted"; });
    if (!L.length) return '<div class="empty">' + ic("scooter") + "<b>مفيش طلبات في التوصيل</b>بعد ما تدوس «وصلت الصيدلية» الطلب بيجي هنا.</div>";
    return '<h3 class="sec">التوصيل <small>(' + L.length + ")</small></h3>" + L.map(mineCard).join("");
  }
  function vHist() {
    var vis = S.history.filter(function (h) { return !S.shiftStart || (h.t || keyMs(h.doneAt)) >= S.shiftStart; });
    var tk = todayKey(), td = vis.filter(function (h) { return String(h.doneAt || "").indexOf(tk) === 0; }), sum = td.reduce(function (a, h) { return a + (Number(h.total) || 0); }, 0);
    var h = '<div class="sum"><div class="b"><small>طلبات النهاردة</small><b>' + td.length + '</b></div><div class="b"><small>إجمالي التحصيل</small><b>' + num(sum) + "</b></div></div>";
    if (!vis.length) return h + '<div class="empty">' + ic("history") + "<b>لسه مفيش طلبات متسلّمة</b></div>";
    return h + '<h3 class="sec">آخر الطلبات المتسلّمة</h3>' + vis.map(function (o) {
      return '<div class="h-row"><div class="l"><b>#' + o.bon + " · " + esc(o.name || "") + "</b><small>" + esc(o.area || "") + " · " + esc(String(o.doneAt || "").replace("T", " ")) + '</small></div><b class="t">' + money(o.total) + "</b>" + (o.pending ? '<span class="syn">' + ic("clock") + "لسه ماتبعتش</span>" : "") + "</div>";
    }).join("");
  }
  function notifState() {
    if (!pushOn()) return "جوه التطبيق بس (صوت واهتزاز)";
    if (native()) return S.pushReady ? "مفعّلة" : "غير مفعّلة";
    if (!("Notification" in self)) return "غير مدعومة في المتصفح ده";
    if (!fbOK()) return "مش متظبطة (Firebase)";
    return Notification.permission === "granted" ? (S.pushReady ? "مفعّلة" : "جاري التفعيل...") : Notification.permission === "denied" ? "مرفوضة من إعدادات المتصفح" : "غير مفعّلة";
  }
  function pushBanner() {
    if (!pushOn()) return "";
    if (native() ? S.pushReady : (!fbOK() || !("Notification" in self) || Notification.permission === "granted" || Notification.permission === "denied")) return "";
    return '<div class="banner">' + ic("bell") + "<span>فعّل الإشعارات علشان توصلك الطلبات الجديدة حتى والتطبيق مقفول</span><button class=\"btn pri\" data-push=\"1\">تفعيل</button></div>";
  }

  // ====================== نظام الأرباح (زي جبهالي رايدر) ======================
  var AR_M = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], AR_D = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  var p2 = function (n) { return (n < 10 ? "0" : "") + n; };
  var fm = function (n) { return (Math.round((Number(n) || 0) * 100) / 100).toFixed(2); };
  var dkOf = function (ts) { var d = new Date(ts || Date.now()); return d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate()); };
  var dkDate = function (k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); };
  var dkLabel = function (k) { var d = dkDate(k); return AR_D[d.getDay()] + "، " + d.getDate() + " " + AR_M[d.getMonth()]; };
  var fmT = function (ts) { if (!ts) return "---"; var d = new Date(ts), h = d.getHours(); return (h % 12 || 12) + ":" + p2(d.getMinutes()) + " " + (h < 12 ? "ص" : "م"); };
  var fmHM = function (ms) { if (!ms || ms < 0) ms = 0; var t = Math.round(ms / 60000); return Math.floor(t / 60) + "س " + (t % 60) + "د"; };
  var keyMs = function (k) { var m = String(k || "").match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/); return m ? new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]).getTime() : 0; };
  function wkStart(date) { var d = new Date(date); d.setHours(0, 0, 0, 0); var day = d.getDay(); d.setDate(d.getDate() + (day === 0 ? -6 : 1) - day); return d; }
  var fee = function () { return Number(S.fee) || 0; };

  function loadEarn() {
    var ph = (S.creds && S.creds.phone) || "";
    S.earn = ld("mrf_earn_" + ph, { days: {}, tomb: {} }); S.shiftStart = ld("mrf_shift_" + ph, 0); S.accAt = ld("mrf_accat", {});
  }
  function saveEarn() { var ph = (S.creds && S.creds.phone) || ""; sv("mrf_earn_" + ph, S.earn); sv("mrf_shift_" + ph, S.shiftStart || 0); sv("mrf_accat", S.accAt); }
  function addEarn(rec) {
    if (!S.earn) loadEarn();
    Object.keys(S.earn.days).forEach(function (k) { S.earn.days[k] = S.earn.days[k].filter(function (x) { return !(x.bon === rec.bon && x.status === rec.status); }); if (!S.earn.days[k].length) delete S.earn.days[k]; });
    var key = dkOf(rec.status === "completed" ? rec.deliveredAt : rec.cancelledAt);
    (S.earn.days[key] = S.earn.days[key] || []).push(rec); saveEarn();
  }
  function hasEarn(bon, st) { return Object.keys(S.earn.days).some(function (k) { return S.earn.days[k].some(function (x) { return x.bon === bon && x.status === st; }); }); }
  function seedEarn(hist) {   // الطلبات المسلّمة اللي السيرفر عارفها (لو الأرباح اتمسحت أو التطبيق اتثبت من جديد)
    if (!S.earn) loadEarn(); var ch = false;
    hist.forEach(function (h) {
      if (h.pending || hasEarn(h.bon, "completed") || (S.earn.tombB && S.earn.tombB[h.bon])) return;
      var ts = keyMs(h.doneAt); if (!ts || S.earn.tomb[dkOf(ts)]) return;
      var k = dkOf(ts); (S.earn.days[k] = S.earn.days[k] || []).push({ bon: h.bon, name: h.name || "", area: h.area || "", orderCost: Number(h.total) || 0, fee: fee(), acceptedAt: S.accAt[h.bon] || 0, deliveredAt: ts, status: "completed", items: h.items || "" }); ch = true;
    });
    if (ch) saveEarn();
  }
  function dayAgg(k) {
    var os = (S.earn.days[k] || []), r = { earned: 0, done: 0, canc: 0, ms: 0, orders: os, fees: 0, items: 0 };
    os.forEach(function (o) { if (o.status === "completed") { r.earned += Number(o.fee) || 0; r.fees += Number(o.fee) || 0; r.items += Number(o.orderCost) || 0; r.done++; if (o.acceptedAt && o.deliveredAt > o.acceptedAt) r.ms += o.deliveredAt - o.acceptedAt; } else if (o.status === "cancelled") r.canc++; });
    return r;
  }
  var keysDesc = function () { return Object.keys(S.earn.days).sort(function (a, b) { return dkDate(b) - dkDate(a); }); };
  function weekAgg(start) {
    var end = new Date(start); end.setDate(end.getDate() + 6); end.setHours(23, 59, 59, 999);
    var keys = Object.keys(S.earn.days).filter(function (k) { var d = dkDate(k); return d >= start && d <= end; }).sort(function (a, b) { return dkDate(b) - dkDate(a); });
    var r = { start: start, end: end, keys: keys, earned: 0, done: 0, ms: 0 }; keys.forEach(function (k) { var a = dayAgg(k); r.earned += a.earned; r.done += a.done; r.ms += a.ms; }); return r;
  }
  var EH0 = function () { return { mode: "overview", weekOff: 0, day: null, oday: null, obon: null, ret: "day", filter: "completed", sel: false, selDays: {}, range: [], calY: 0, calM: 0, calSel: {}, anchor: null }; };
  var costRow = function (icon, lbl, val, cls) { return '<div class="kv"><span>' + ic(icon).replace("<svg", '<svg style="width:16px;height:16px;vertical-align:-3px;margin-inline-end:6px"') + lbl + '</span><span class="' + (cls || "") + '">' + val + " ج.م</span></div>"; };
  var statGrid = function (a, b, c, d) { return '<div class="tcard sm" style="margin:8px 0 0"><div><small>' + a + "</small><b>" + b + "</b></div><div><small>" + c + "</small><b dir=\"ltr\">" + d + " ج.م</b></div></div>"; };
  var backRow = function (act, title) { return '<div class="ptitle"><button class="pback" data-eh="' + act + '" aria-label="رجوع">' + ic("back") + "</button><h2>" + title + "</h2></div>"; };

  function earnAccount() {
    if (!S.earn) loadEarn();
    var since = S.shiftStart || 0, n = 0, tot = 0, all = 0;
    Object.keys(S.earn.days).forEach(function (k) { S.earn.days[k].forEach(function (o) { if (o.status === "completed") { all++; if ((o.deliveredAt || 0) >= since) { n++; tot += Number(o.fee) || 0; } } }); });
    return '<div class="card"><div class="sum" style="margin:0"><div class="b"><small>أوردرات تم توصيلها</small><b>' + n + '</b></div><div class="b"><small>ج.م أرباح توصيل</small><b dir="ltr">' + fm(tot) + "</b></div></div></div>" +
      '<div class="card"><div class="kv"><span>أوردرات مسلمة محفوظة</span><span>' + all + ' أوردر</span></div><div class="kv"><span>آخر مزامنة</span><span>' + (S.lastSync ? fmT(S.lastSync) : "لم تتم بعد") + '</span></div><div class="kv"><span>حالة الخدمة</span><span>' + (S.online ? "تعمل بشكل طبيعي" : "مفيش اتصال") + "</span></div></div>" +
      '<button class="btn sec" data-eh="open" style="margin-bottom:10px">' + ic("history") + " سجل الأرباح الكامل</button>" +
      '<button class="btn dng" data-eh="endshift">' + ic("power") + " إنهاء حساب الطيار</button>";
  }
  function earnHist() {
    if (!S.eh) S.eh = EH0(); if (!S.earn) loadEarn();
    var e = S.eh;
    if (e.mode === "day") return earnDay(); if (e.mode === "order") return earnOrder(); if (e.mode === "range") return earnRange();
    var ws = wkStart(new Date()); ws.setDate(ws.getDate() + e.weekOff * 7); var w = weekAgg(ws), we = w.end;
    var label = AR_D[w.start.getDay()] + "، " + w.start.getDate() + " " + AR_M[w.start.getMonth()] + " - " + AR_D[we.getDay()] + "، " + we.getDate() + " " + AR_M[we.getMonth()];
    var prev = keysDesc().filter(function (k) { return w.keys.indexOf(k) < 0 && dkDate(k) < w.start; });
    var row = function (k) {
      var a = dayAgg(k), sel = !!e.selDays[k];
      return '<div class="h-row" data-eh="' + (e.sel ? "pick|" : "day|") + k + '">' + (e.sel ? '<span class="chk' + (sel ? " on" : "") + '">' + (sel ? ic("check") : "") + "</span>" : "") + '<div class="l"><b>' + dkLabel(k) + "</b><small>تم إكمال " + a.done + ' توصيل</small></div><b class="t" dir="ltr">' + fm(a.earned) + " ج.م</b></div>";
    };
    var h = '<div class="eh-bar"><button class="eh-i" data-eh="cal" aria-label="اختر فترة">' + ic("cal") + '</button><button class="eh-sel' + (e.sel ? " on" : "") + '" data-eh="selmode">' + (e.sel ? "إلغاء التحديد" : "تحديد أيام للحذف") + "</button></div>";
    if (e.sel) h += '<div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px"><span style="color:var(--mut);font-size:13px">محدد: ' + Object.keys(e.selDays).length + ' يوم</span><button class="btn dng sm" style="width:auto" data-eh="delask">حذف المحدد</button></div>';
    h += '<div class="card"><div class="wk"><button data-eh="wk|-1" aria-label="الأسبوع السابق">' + ic("back") + '</button><b>' + label + '</b><button data-eh="wk|1" style="' + (e.weekOff < 0 ? "" : "opacity:.3") + '" aria-label="الأسبوع التالي">' + ic("back").replace("<svg", '<svg style="transform:scaleX(-1)"') + "</button></div>" +
      '<div class="bigm" dir="ltr">' + fm(w.earned) + " ج.م</div>" + statGrid("ساعات النشاط", fmHM(w.ms), "متوسط/ساعة", w.ms >= 60000 ? fm(w.earned / (w.ms / 3600000)) : "0.00") + "</div>";
    h += w.keys.length ? '<div class="card" style="padding:6px">' + w.keys.map(row).join("") + "</div>" : '<div class="empty" style="padding:26px 10px">' + ic("cal") + "<b>لا توجد أوردرات في الأسبوع ده</b></div>";
    if (prev.length) h += '<h3 class="sec" style="margin-top:6px;color:var(--mut)">النشاط السابق</h3><div class="card" style="padding:6px">' + prev.map(row).join("") + "</div>";
    return h;
  }
  function orderRow(o, k, ret) {
    var ok = o.status === "completed";
    return '<div class="h-row" data-eh="ord|' + k + "|" + o.bon + "|" + ret + '"><div class="l"><b>' + esc(o.name || "—") + "</b><small>" + (ok ? fmT(o.acceptedAt) + " - " + fmT(o.deliveredAt) : "ألغي الساعة " + fmT(o.cancelledAt)) + " · بون: " + o.bon + '</small></div><b class="t" style="color:' + (ok ? "var(--or)" : "var(--bad)") + '" dir="ltr">' + (ok ? fm(o.fee) + " ج.م" : "—") + "</b></div>";
  }
  function listBlock(done, canc, list, ret) {
    var e = S.eh, shown = list.filter(function (x) { return x.o.status === e.filter; });
    return '<h3 class="sec">الطلبات</h3><div class="row2" style="margin-bottom:10px"><button class="btn sm ' + (e.filter === "completed" ? "pri" : "sec") + '" data-eh="flt|completed">مكتمل (' + done + ')</button><button class="btn sm ' + (e.filter === "cancelled" ? "dng" : "sec") + '" data-eh="flt|cancelled">ملغي (' + canc + ")</button></div>" +
      (shown.length ? '<div class="card" style="padding:6px">' + shown.map(function (x) { return orderRow(x.o, x.k, ret); }).join("") + "</div>" : '<div class="empty" style="padding:24px 10px"><b>لا توجد طلبات هنا</b></div>');
  }
  function earnDay() {
    var e = S.eh, k = e.day, a = dayAgg(k), ks = keysDesc(), ix = ks.indexOf(k), nav = function (on, act, flip) { return '<button data-eh="' + act + '" style="' + (on ? "" : "opacity:.3") + '">' + ic("back").replace("<svg", '<svg style="' + (flip ? "transform:scaleX(-1)" : "") + '"') + "</button>"; };
    return '<div class="card"><div class="wk">' + nav(ix >= 0 && ix < ks.length - 1, "older") + '<small dir="ltr" style="color:var(--mut)">' + k + "</small>" + nav(ix > 0, "newer", 1) + '</div><div class="bigm" dir="ltr">' + fm(a.earned) + " ج.م</div>" +
      costRow("bike", "رسوم التوصيل:", fm(a.fees), "bl") + costRow("box", "ثمن الطلبات:", fm(a.items), "") + statGrid("مدة النشاط", fmHM(a.ms), "متوسط/ساعة", a.ms >= 60000 ? fm(a.earned / (a.ms / 3600000)) : "0.00") + "</div>" +
      listBlock(a.done, a.canc, a.orders.map(function (o) { return { o: o, k: k }; }), "day");
  }
  function earnRange() {
    var e = S.eh, T = { earned: 0, done: 0, canc: 0, ms: 0, fees: 0, items: 0 }, list = [];
    e.range.forEach(function (k) { var a = dayAgg(k); ["earned", "done", "canc", "ms", "fees", "items"].forEach(function (f) { T[f] += a[f]; }); a.orders.forEach(function (o) { list.push({ o: o, k: k }); }); });
    list.sort(function (x, y) { return ((y.o.deliveredAt || y.o.cancelledAt || 0) - (x.o.deliveredAt || x.o.cancelledAt || 0)); });
    return '<div class="card"><div class="bigm" dir="ltr">' + fm(T.earned) + " ج.م</div>" + costRow("bike", "رسوم التوصيل:", fm(T.fees), "bl") + costRow("box", "ثمن الطلبات:", fm(T.items), "") + statGrid("مدة النشاط", fmHM(T.ms), "متوسط/ساعة", T.ms >= 60000 ? fm(T.earned / (T.ms / 3600000)) : "0.00") + "</div>" + listBlock(T.done, T.canc, list, "range");
  }
  function earnOrder() {
    var e = S.eh, o = (S.earn.days[e.oday] || []).filter(function (x) { return String(x.bon) === String(e.obon); })[0];
    if (!o) return '<div class="empty">' + ic("alert") + "<b>الطلب مش موجود</b></div>";
    var ok = o.status === "completed";
    return '<div class="card" style="text-align:center;padding:22px 14px"><div style="color:' + (ok ? "var(--or)" : "var(--bad)") + '">' + ic(ok ? "checkc" : "ban").replace("<svg", '<svg style="width:42px;height:42px"') + '</div><h3 style="margin:8px 0 2px;font-size:17px">' + esc(o.name || "—") + '</h3><small style="color:var(--mut)">توصيل فردي</small>' +
      '<div class="tcard sm" style="margin-top:12px">' + (ok ? '<div><small>وقت القبول</small><b>' + fmT(o.acceptedAt) + "</b></div><div><small>وقت التسليم</small><b>" + fmT(o.deliveredAt) + "</b></div>" : '<div><small>وقت الإلغاء</small><b>' + fmT(o.cancelledAt) + "</b></div>") + "</div></div>" +
      '<div class="kv" style="padding:6px 6px"><span style="font-weight:800;color:var(--mut)">الحالة</span><span class="tag ' + (ok ? "ok" : "") + '" style="' + (ok ? "" : "background:var(--badsoft);color:var(--bad)") + '">' + (ok ? "مكتمل" : "ملغي") + "</span></div>" +
      (ok ? '<div class="card">' + costRow("bike", "ربح التوصيل:", fm(o.fee), "or") + costRow("box", "ثمن الطلب (مش من نصيبك):", fm(o.orderCost), "") + "</div>" : "") +
      (o.items ? '<div class="card"><h3 class="sec">محتويات الأوردر</h3><div style="white-space:pre-line;font-size:13px;color:var(--mut)">' + esc(o.items) + "</div></div>" : "") +
      '<div class="card"><div class="kv"><span>رمز الطلب</span><span dir="ltr">' + o.bon + "</span></div></div>";
  }
  function ehTitle() { var e = S.eh || EH0(); return e.mode === "day" ? dkLabel(e.day) : e.mode === "order" ? "تفاصيل الطلب" : e.mode === "range" ? (e.range.length === 1 ? dkLabel(e.range[0]) : dkLabel(e.range[0]) + " - " + dkLabel(e.range[e.range.length - 1]) + " (" + e.range.length + " يوم)") : "سجل الأرباح"; }
  function ehUp() {
    var e = S.eh || (S.eh = EH0());
    if (e.mode === "order") e.mode = e.ret === "range" ? "range" : "day"; else if (e.mode === "day" || e.mode === "range") e.mode = "overview"; else { S.page = "earnings"; }
    render(); self.scrollTo(0, 0);
  }
  function calModal() {
    var e = S.eh, y = e.calY, m = e.calM, dim = new Date(y, m + 1, 0).getDate(), off = (new Date(y, m, 1).getDay() + 6) % 7, today = dkOf(Date.now()), now = new Date(), cur = y === now.getFullYear() && m === now.getMonth();
    var cells = ""; for (var i = 0; i < off; i++) cells += "<i></i>";
    for (var d = 1; d <= dim; d++) { var k = y + "-" + p2(m + 1) + "-" + p2(d), fut = k > today; cells += '<button class="cal-d' + (e.calSel[k] ? " on" : "") + (e.anchor === k ? " anc" : "") + '" ' + (fut ? "disabled" : 'data-eh="ct|' + k + '"') + ">" + d + "</button>"; }
    sheet('<div class="wk"><button data-eh="ctoday" class="link" style="width:auto;padding:4px">اليوم</button><span style="display:flex;align-items:center;gap:10px"><button data-eh="cm|-1">' + ic("back") + "</button><b>" + AR_M[m] + " " + y + '</b><button data-eh="cm|1" style="' + (cur ? "opacity:.3" : "") + '">' + ic("back").replace("<svg", '<svg style="transform:scaleX(-1)"') + "</button></span></div>" +
      '<div class="cal-g">' + ["ن", "ث", "ر", "خ", "ج", "س", "ح"].map(function (x) { return "<small>" + x + "</small>"; }).join("") + cells + '</div><div class="note" style="margin:10px 0">تقدر تختار يوم واحد، أو تدوس على يومين علشان يتحدد كل الأيام اللي بينهم</div>' +
      '<div class="row2"><button class="btn sec" data-eh="cclear">مسح التحديد</button><button class="btn pri" data-eh="cok" style="flex:2">اختر التاريخ (' + Object.keys(e.calSel).length + ")</button></div>");
    $("sheet")._cancel = function () { $("sheet")._cancel = null; closeSheet(); };
  }
  function ehAct(spec) {
    var a = spec.split("|"), e = S.eh || (S.eh = EH0()), act = a[0];
    if (!S.earn) loadEarn();
    if (act === "open") { S.eh = EH0(); S.page = "earnhist"; }
    else if (act === "up") return ehUp();
    else if (act === "wk") { var n = e.weekOff + (+a[1]); if (n <= 0) e.weekOff = n; }
    else if (act === "day") { e.day = a[1]; e.mode = "day"; e.filter = "completed"; }
    else if (act === "older" || act === "newer") { var ks = keysDesc(), ix = ks.indexOf(e.day), j = act === "older" ? ix + 1 : ix - 1; if (ix >= 0 && j >= 0 && j < ks.length) { e.day = ks[j]; e.filter = "completed"; } }
    else if (act === "flt") e.filter = a[1];
    else if (act === "ord") { e.oday = a[1]; e.obon = a[2]; e.ret = a[3]; e.mode = "order"; }
    else if (act === "selmode") { e.sel = !e.sel; e.selDays = {}; }
    else if (act === "pick") { if (e.selDays[a[1]]) delete e.selDays[a[1]]; else e.selDays[a[1]] = 1; }
    else if (act === "delask") {
      var ks2 = Object.keys(e.selDays); if (!ks2.length) return toast("اختر يوم واحد على الأقل علشان تحذفه", "bad");
      var tt = 0; ks2.forEach(function (k) { tt += dayAgg(k).earned; });
      return confirmSheet({ title: "حذف " + ks2.length + " يوم من السجل", text: "هيتم حذف بيانات " + ks2.length + " يوم نهائيًا من سجل الأرباح (بإجمالي " + fm(tt) + " ج.م)، ولا يمكن التراجع عن هذا الإجراء.", ok: "حذف", cls: "dng" }).then(function (y) {
        if (!y) return; ks2.forEach(function (k) { (S.earn.days[k] || []).forEach(function (o) { (S.earn.tombB = S.earn.tombB || {})[o.bon] = 1; }); delete S.earn.days[k]; S.earn.tomb[k] = 1; }); e.selDays = {}; e.sel = false; saveEarn(); toast("تم حذف الأيام المحددة من السجل", "ok"); render();
      });
    }
    else if (act === "cal") { var nw = new Date(); e.calY = nw.getFullYear(); e.calM = nw.getMonth(); e.calSel = {}; e.range.forEach(function (k) { e.calSel[k] = 1; }); e.anchor = null; return calModal(); }
    else if (act === "cm") { var d2 = new Date(e.calY, e.calM + (+a[1]), 1), nw2 = new Date(); if (d2 > new Date(nw2.getFullYear(), nw2.getMonth(), 1)) return; e.calY = d2.getFullYear(); e.calM = d2.getMonth(); return calModal(); }
    else if (act === "ctoday") { var tk = dkOf(Date.now()), nw3 = new Date(); e.calSel = {}; e.calSel[tk] = 1; e.anchor = null; e.calY = nw3.getFullYear(); e.calM = nw3.getMonth(); return calModal(); }
    else if (act === "cclear") { e.calSel = {}; e.anchor = null; return calModal(); }
    else if (act === "ct") {
      var k3 = a[1];
      if (e.anchor === null) { if (e.calSel[k3]) delete e.calSel[k3]; else { e.calSel[k3] = 1; e.anchor = k3; } }
      else { var x = e.anchor, y2 = k3; if (x > y2) { var t = x; x = y2; y2 = t; } var c = dkDate(x), en = dkDate(y2); while (c <= en) { e.calSel[dkOf(c.getTime())] = 1; c.setDate(c.getDate() + 1); } e.anchor = null; }
      return calModal();
    }
    else if (act === "cok") { var rk = Object.keys(e.calSel).sort(); if (!rk.length) return toast("اختر يوم واحد على الأقل", "bad"); e.range = rk; e.mode = "range"; e.filter = "completed"; closeSheet(); }
    else if (act === "endshift") {
      var since = S.shiftStart || 0, n2 = 0, t2 = 0; Object.keys(S.earn.days).forEach(function (k) { S.earn.days[k].forEach(function (o) { if (o.status === "completed" && (o.deliveredAt || 0) >= since) { n2++; t2 += Number(o.fee) || 0; } }); });
      return confirmSheet({ title: "إنهاء حساب الطيار", text: "سيتم مسح قائمة «تم التوصيل» وتصفير الأرباح المكتسبة (سجل الأرباح الكامل بيفضل محفوظ).", big: n2 + " أوردر · " + fm(t2) + " ج.م", ok: "إنهاء الحساب", cls: "dng" }).then(function (y) {
        if (!y) return; S.shiftStart = Date.now(); saveEarn(); toast("تم إنهاء الحساب وتصفير الأرباح", "ok"); render();
      });
    }
    render(); self.scrollTo(0, 0);
  }

  // ---------- صفحات القائمة الجانبية ----------
  var PAGES = { profile: "الصفحة الشخصية", earnings: "الأرباح", earnhist: "سجل الأرباح", wallet: "المحفظة", inbox: "البريد الوارد", support: "المساعدة والدعم", about: "حول" };
  function pageBody(pg) {
    var p = S.pilot || {};
    if (pg === "profile") {
      var th = ld("mrf_theme", "auto");
      return '<div class="card"><div class="kv"><span>الاسم</span><span>' + esc(p.name) + '</span></div><div class="kv"><span>الموبايل</span><span dir="ltr">' + esc(p.phone) + '</span></div><div class="kv"><span>المركبة</span><span>' + esc(p.vehicle || "—") + '</span></div><div class="kv"><span>حالة الشغل</span><span>' + (p.working ? "يعمل الآن" : "لا يعمل") + '</span></div><div class="kv"><span>التنبيهات</span><span>' + esc(notifState()) + "</span></div></div>" +
        (pushOn() && notifState() !== "مفعّلة" && (native() || fbOK()) ? '<button class="btn pri" data-push="1" style="margin-bottom:10px">' + ic("bell") + " تفعيل الإشعارات</button>" : "") +
        '<button class="btn sec" data-themebtn="1" style="margin-bottom:10px">' + ic("moon") + " المظهر: " + (th === "auto" ? "تلقائي" : th === "dark" ? "داكن" : "فاتح") + '</button><button class="btn dng" data-out="1">' + ic("logout") + " تسجيل الخروج</button>";
    }
    if (pg === "earnings") return earnAccount();
    if (pg === "earnhist") return earnHist();
    if (pg === "wallet") return '<div class="card" style="text-align:center;padding:26px 14px"><small style="color:var(--mut);font-weight:700">رصيد المحفظة</small><div class="big" style="font-size:34px;font-weight:800;color:var(--or);margin:6px 0">' + money(p.wallet) + '</div><small style="color:var(--mut)">الرصيد بتحدده إدارة الصيدلية.</small></div>';
    if (pg === "inbox") return '<div class="empty">' + ic("mail") + "<b>مفيش رسائل دلوقتي</b>رسائل وتنبيهات الإدارة هتظهر هنا.</div>";
    if (pg === "support") {
      var sp = String(CFG.SUPPORT_PHONE || "").replace(/\D/g, ""), has = /^01\d{9}$/.test(sp);
      return '<div class="card"><h3 class="sec">محتاج مساعدة؟</h3><p style="color:var(--mut);margin-bottom:12px">لو في مشكلة في طلب أو في التطبيق كلّم إدارة الصيدلية.</p>' +
        (has ? '<div class="acts"><a class="call" href="tel:' + sp + '">' + ic("phone") + 'اتصال</a><a class="wa" href="https://wa.me/2' + sp.slice(1) + '" target="_blank" rel="noopener">' + ic("wa") + "واتساب</a></div>" : '<div class="note">رقم الدعم لسه مش متحدد.</div>') + "</div>" +
        '<div class="card"><h3 class="sec">أسئلة سريعة</h3><div class="kv"><span>مفيش طلبات بتظهر؟</span><span>اتأكد إن حالتك «يعمل الآن» والنت شغال</span></div><div class="kv"><span>اتأخرت في طلب؟</span><span>كلّم العميل من أيقونة الاتصال</span></div><div class="kv"><span>قبلت طلب بالغلط؟</span><span>«تنازل عن الطلب» قبل ما توصل الصيدلية</span></div></div>';
    }
    return '<div class="card" style="text-align:center"><img src="assets/logo.png" alt="" style="width:92px;height:92px;border-radius:22px;margin:6px auto 10px;display:block"><h3 style="font-size:18px">' + esc(CFG.APP_NAME || "") + '</h3><p style="color:var(--mut);margin:4px 0 12px">تطبيق الطيار لتوصيل طلبات صيدليات د/ مراد صادق</p><div class="kv"><span>الإصدار</span><span dir="ltr">' + esc(CFG.APP_VERSION || "") + (CFG.BUILD && CFG.BUILD !== "__BUILD__" ? " · " + esc(CFG.BUILD) : "") + "</span></div></div>";
  }
  function openMenu() {
    var d = $("drawer"), M = [["profile", "user"], ["earnings", "chart"], ["wallet", "wallet"], ["inbox", "mail"], ["support", "headset"], ["about", "info"]];
    d.innerHTML = '<div class="dbk" data-menuclose="1"></div><aside class="dpanel"><div class="dh"><img src="assets/logo.png" alt=""><div><b>' + esc(CFG.APP_NAME || "") + "</b><small>نظام توصيل الطلبات المتكامل</small></div></div><nav>" +
      M.slice(0, 4).map(function (m) { return '<button data-page="' + m[0] + '">' + ic(m[1]) + "<span>" + PAGES[m[0]] + "</span></button>"; }).join("") + '<div class="dsep"></div>' +
      M.slice(4).map(function (m) { return '<button data-page="' + m[0] + '">' + ic(m[1]) + "<span>" + PAGES[m[0]] + "</span></button>"; }).join("") + '</nav><div class="dft">' + esc(CFG.APP_NAME || "") + " v" + esc(CFG.APP_VERSION || "") + "</div></aside>";
    d.hidden = false; requestAnimationFrame(function () { d.classList.add("on"); });
  }
  function closeMenu() { var d = $("drawer"); if (d.hidden) return; d.classList.remove("on"); setTimeout(function () { d.hidden = true; d.innerHTML = ""; }, 220); }

  function netState() {
    var n = S.queue.length;
    if (!S.online) return { k: "off", i: "wifiX", t: "مفيش اتصال" + (n ? " · " + n + " في الانتظار" : "") };
    if (n) return { k: "warn", i: "alert", t: "جاري المزامنة (" + n + ")" };
    if (S.weak > Date.now()) return { k: "warn", i: "alert", t: "النت ضعيف" };
    return { k: "ok", i: "wifi", t: "متصل" };
  }
  function viewMain() {
    var w = S.pilot && S.pilot.working, nNew = w ? S.pool.length : 0;
    var ns = netState(), nAcc = S.mine.filter(function (o) { return o.stage === "accepted"; }).length, nDel = S.mine.length - nAcc;
    var body = S.page ? '<div class="ptitle"><button class="pback" ' + (S.page === "earnhist" ? 'data-eh="up"' : 'data-back="1"') + ' aria-label="رجوع">' + ic("back") + "</button><h2>" + (S.page === "earnhist" ? ehTitle() : PAGES[S.page]) + "</h2></div>" + pageBody(S.page) :
      S.tab === "new" ? vNew() : S.tab === "acc" ? vAcc() : S.tab === "del" ? vDel() : vHist();
    var T = [["new", "box", "الطلبات الجديدة", nNew, ""], ["acc", "checkc", "المقبولة", nAcc, "g"], ["del", "scooter", "التوصيل", nDel, "g"], ["hist", "history", "تم التوصيل", 0, ""]];
    var nav = T.map(function (t) { return '<button class="' + (!S.page && S.tab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' + ic(t[1]) + "<span>" + t[2] + "</span>" + (t[3] ? '<i class="bd ' + t[4] + '">' + t[3] + "</i>" : "") + "</button>"; }).join("");
    return '<header class="hdr"><div class="hrow"><img src="assets/logo.png" alt=""><div class="tt"><b>صيدلية د/ مراد صادق</b><button class="net ' + ns.k + '" data-net="1">' + ic(ns.i) + "<span>" + ns.t + '</span></button></div><button class="burger" data-menu="1" aria-label="القائمة">' + ic("menu") + "</button></div>" +
      '<button class="shiftbar ' + (w ? "on" : "") + '" data-shift="1">' + (S.keys.shift ? '<span class="spin" style="width:18px;height:18px;border-width:2px"></span>' : ic("power")) + (w ? "يعمل الآن" : "لا يعمل") + "</button></header>" +
      "<main>" + body + '</main><nav class="nav">' + nav + "</nav>";
  }
  function render() {
    var y = self.scrollY, a = $("app");
    if (S.view === "main") a.innerHTML = viewMain();
    else if (S.view === "login") a.innerHTML = viewLogin();
    else if (S.view === "register") a.innerHTML = viewRegister();
    else if (S.view === "pending") a.innerHTML = viewStatus("pending");
    else if (S.view === "rejected") a.innerHTML = viewStatus("rejected");
    else if (S.view === "blocked") a.innerHTML = viewStatus("blocked");
    else if (S.view === "retry") a.innerHTML = viewStatus("retry");
    else a.innerHTML = authShell('<div class="status"><div class="spin" style="width:34px;height:34px"></div></div>');
    if (S.view !== "main") bindAuth();
    self.scrollTo(0, y);
    var n = S.view === "main" && S.pilot && S.pilot.working ? S.pool.length : 0;
    document.title = (n ? "(" + n + ") " : "") + (CFG.APP_NAME || "مراد صادق رايدر");
  }

  // ---------- أحداث الشاشة الرئيسية (تفويض) ----------
  function inRoot(t) { return !!t.closest("#app,#drawer,#sheet"); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-tab],[data-acc],[data-st],[data-rel],[data-shift],[data-push],[data-themebtn],[data-out],[data-menu],[data-menuclose],[data-page],[data-back],[data-inv],[data-chat],[data-net],[data-eh],[data-open],[data-close]"); if (!t || !inRoot(t)) return;
    var d = t.dataset;
    if (d.tab) { S.tab = d.tab; S.page = null; render(); self.scrollTo(0, 0); }
    else if (d.acc) accept(+d.acc);
    else if (d.st) { var s = d.st.split("|"); stage(+s[0], s[1]); }
    else if (d.rel) release(+d.rel);
    else if (d.shift) toggleShift();
    else if (d.push) enablePush(true);
    else if (d.themebtn) { var o = ["auto", "dark", "light"], c = ld("mrf_theme", "auto"); sv("mrf_theme", o[(o.indexOf(c) + 1) % 3]); applyTheme(); render(); }
    else if (d.out) { closeMenu(); logout(false); }
    else if (d.menu) openMenu();
    else if (d.menuclose) closeMenu();
    else if (d.page) { S.page = d.page; closeMenu(); render(); self.scrollTo(0, 0); }
    else if (d.back) { S.page = null; render(); }
    else if (d.eh) ehAct(d.eh);
    else if (d.open) { S.open = +d.open; render(); var cEl = $("c" + S.open); if (cEl) cEl.scrollIntoView({ block: "start", behavior: "smooth" }); }
    else if (d.close) { S.open = null; render(); }
    else if (d.net) { var n2 = netState(); toast(n2.t, n2.k === "ok" ? "ok" : n2.k === "off" ? "bad" : "or"); if (S.queue.length) scheduleFlush(0); else refresh(); }
    else if (d.chat) toast("الشات مع العميل هيتفعّل قريب 💬");
    else if (d.inv) {
      var b = +d.inv, box = t.closest(".od-inv"), on = !box.classList.contains("open"); S.inv[b] = on; box.classList.toggle("open", on);
      t.querySelector(".tx").textContent = on ? "إخفاء الفاتورة" : "الطلب";
    }
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden && S.view === "main") refresh(); });
  self.addEventListener("online", function () { if (S.view === "main") refresh(); });
  self.addEventListener("popstate", function () {
    var sh = $("sheet");
    if (!sh.hidden) { if (sh._cancel) sh._cancel(); else closeSheet(); history.pushState({ r: 2 }, ""); }
    else if (!$("drawer").hidden) { closeMenu(); history.pushState({ r: 2 }, ""); }
    else if (S.view === "main" && S.page === "earnhist") { ehUp(); history.pushState({ r: 2 }, ""); }
    else if (S.view === "main" && S.page) { S.page = null; render(); history.pushState({ r: 2 }, ""); }
    else if (S.view === "main" && S.tab !== "new") { S.tab = "new"; render(); history.pushState({ r: 2 }, ""); }
    else if (S.view !== "main") history.pushState({ r: 2 }, "");
    else toast("اضغط رجوع تاني للخروج");
  });

  // ====================== الموقع والوصول المتوقع ======================
  function onPos(lat, lng) { S.pos = { lat: lat, lng: lng, t: Date.now() }; }
  function startGeo() {
    if (S.geoOn) return; S.geoOn = true;
    try {
      var G = native() && plug("Geolocation");
      if (G) {
        Promise.resolve(G.requestPermissions()).then(function () {
          return G.watchPosition({ enableHighAccuracy: true, timeout: 20000 }, function (p) { if (p && p.coords) onPos(p.coords.latitude, p.coords.longitude); });
        }).then(function (id) { S.geoId = id; }).catch(function () {});
      } else if (navigator.geolocation) {
        S.geoId = navigator.geolocation.watchPosition(function (p) { onPos(p.coords.latitude, p.coords.longitude); }, function () {}, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
      }
    } catch (e) {}
    if (!S.etaT) S.etaT = setInterval(etaTick, 30000);
    setTimeout(etaTick, 4000);
  }
  function stopGeo() {
    if (!S.geoOn) return; S.geoOn = false;
    try { var G = native() && plug("Geolocation"); if (G && S.geoId != null) G.clearWatch({ id: S.geoId }); else if (navigator.geolocation && S.geoId != null) navigator.geolocation.clearWatch(S.geoId); } catch (e) {}
    S.geoId = null; if (S.etaT) { clearInterval(S.etaT); S.etaT = null; } S.etaTxt = {};
  }
  function etaTick() {
    if (!S.pos || Date.now() - S.pos.t > 180000 || S.view !== "main") return;
    var changed = false;
    S.mine.forEach(function (o) {
      var which = null, target = null;
      if (o.stage === "accepted") { which = "shop"; target = storePt(); } else if (o.stage === "delivering") { which = "cust"; target = coordsFrom(o.cloc); }
      if (!which || !target) { if (S.etaTxt[o.bon]) { delete S.etaTxt[o.bon]; changed = true; } return; }
      var km = hav(S.pos, target), txt;
      if (km < 0.15) txt = which === "shop" ? "وصل الصيدلية" : "وصل عندك";
      else txt = fmtMin(Math.max(1, Math.round((km * (CFG.ROAD_FACTOR || 1.4)) / (CFG.SPEED_KMH || 25) * 60)));
      var show = (which === "shop" ? "وصولك للصيدلية خلال " : "وصولك للعميل خلال ") + txt;
      if (km < 0.15) show = txt;
      if (S.etaTxt[o.bon] !== show) { S.etaTxt[o.bon] = show; changed = true; }
      var key = o.bon + which;
      if (S.online && S.etaSent[key] !== txt) { S.etaSent[key] = txt; api("riderEta", { bon: o.bon, stage: which, etaText: txt }); }
    });
    if (changed) render();
  }

  // ====================== الإشعارات (Firebase) ======================
  function sendToken(t) {
    if (!t) return; S.token = t; sv("mrf_token", t);
    if (!S.creds) return;
    api("riderToken", { token: t }).then(function (r) { if (r && r.ok) S.tokenSent = t; });
  }
  setInterval(function () { if (S.token && S.token !== S.tokenSent && S.view === "main") sendToken(S.token); }, 20000);

  function onPush() { if (S.view === "main") { refresh(); beep(2); vib([200, 100, 200]); } }

  function initPush() { if (!pushOn() || S.view !== "main" || S.pushReady) return; if (native()) initNative(false); else if (fbOK() && "Notification" in self && Notification.permission === "granted") initWeb(false); }
  function enablePush(userTap) {
    unlockAudio(); if (!pushOn()) return;
    if (native()) return initNative(true);
    if (!fbOK()) return toast("إشعارات المتصفح مش متظبطة (Firebase)", "bad");
    if (!("Notification" in self)) return toast("المتصفح ده مش بيدعم الإشعارات", "bad");
    initWeb(userTap);
  }
  function initNative(ask) {
    var PN = plug("PushNotifications"); if (!PN) { if (ask) toast("الإشعارات مش متاحة في النسخة دي", "bad"); return; }
    Promise.resolve(PN.checkPermissions()).then(function (s) { return s.receive === "granted" ? s : (s.receive === "denied" && !ask ? s : PN.requestPermissions()); }).then(function (s) {
      if (s.receive !== "granted") { if (ask) toast("لازم تسمح بالإشعارات من إعدادات الموبايل", "bad"); return; }
      return Promise.resolve(PN.createChannel({ id: CFG.CHANNEL_ID || "murad_orders_v1", name: "الطلبات الجديدة", description: "إشعارات الطلبات الجديدة", importance: 5, visibility: 1, sound: "default", vibration: true, lights: true })).catch(function () {}).then(function () {
        PN.removeAllListeners();
        PN.addListener("registration", function (t) { S.pushReady = true; sendToken(t.value); if (S.view === "main") render(); });
        PN.addListener("registrationError", function () { S.pushReady = false; });
        PN.addListener("pushNotificationReceived", function () { onPush(); });
        PN.addListener("pushNotificationActionPerformed", function () { S.tab = "new"; refresh(); });
        return PN.register();
      });
    }).catch(function () {});
  }
  function loadScript(src) { return new Promise(function (ok, no) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
  function initWeb(ask) {
    Promise.resolve(Notification.permission === "granted" ? "granted" : Notification.requestPermission()).then(function (perm) {
      if (perm !== "granted") { if (ask) toast("اسمح بالإشعارات من إعدادات المتصفح", "bad"); return render(); }
      return loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js").then(function () { return loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"); }).then(function () {
        if (!self.firebase.apps.length) self.firebase.initializeApp(CFG.FIREBASE);
        var m = self.firebase.messaging();
        return navigator.serviceWorker.ready.then(function (reg) { return m.getToken({ vapidKey: CFG.FIREBASE.vapidKey, serviceWorkerRegistration: reg }); }).then(function (t) {
          if (t) { S.pushReady = true; sendToken(t); if (ask) toast("اتفعّلت الإشعارات ✅", "ok"); }
          m.onMessage(function () { onPush(); }); render();
        });
      });
    }).catch(function () { if (ask) toast("معرفتش أفعّل الإشعارات، جرّب تاني", "bad"); });
  }

  // ====================== تشغيل ======================
  function registerSW() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    var reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () { if (!reloading && S.view !== "main") { reloading = true; location.reload(); } else if (!reloading) { S.updated = true; } });
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
  function boot() {
    applyTheme(); registerSW(); render();
    if (!CFG.ORDERS_URL) return setView("login", "ORDERS_URL مش متظبط في config.js");
    if (!S.creds) return setView("login");
    loginFlow();
  }
  boot();
})();
