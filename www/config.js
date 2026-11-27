// ===== إعدادات تطبيق الطيار - صيدلية عوف =====
// ده الملف الوحيد اللي بتعدل فيه الإعدادات من غير ما تلمس الكود.
// (self بدل window علشان الملف ده بيتقرا كمان جوه الـ service worker)
self.APP_CONFIG = {
  APP_NAME: "عوف رايدر",

  // رقم دعم الإدارة (بيظهر في المساعدة والدعم). مثال: "01012345678"
  SUPPORT_PHONE: "01508800926",

  // رابط سكربت الطلبات (مشروع Apps Script "اوردارس") - نفس الرابط اللي في تطبيق العميل بالظبط
  ORDERS_URL: "https://script.google.com/macros/s/AKfycbxHOJiBi_DPwNOsJQyOc3qr_2AvICHsBQ4c2qE7I6d3S6ulwYLzw__zTC7sIMwaskU/exec",

  // مكان الصيدلية: بيتاخد لحظيًا من لينك الصيدلية في السيرفر (STORE_LOCATION في orders.gs / عمود "لوكيشن المحل") - مفيش إحداثيات هنا.

  // إشعارات Firebase (خارج التطبيق): سيبها false لحد ما نجهّز Firebase. التنبيه جوه التطبيق (صوت + اهتزاز) شغال دايماً وهو مفتوح.
  PUSH_ENABLED: true,

  // إعدادات Firebase للإشعارات (من Project settings ← Your apps ← Web app). سيبها فاضية لو مش هتستخدم إشعارات المتصفح
  // vapidKey: Project settings ← Cloud Messaging ← Web Push certificates ← Generate key pair
  FIREBASE: { apiKey: "", authDomain: "", projectId: "", messagingSenderId: "", appId: "", vapidKey: "" },

  CHANNEL_ID: "ouf_orders_v2",   // لازم يطابق FCM_CHANNEL في orders.gs
  POLL_MS: 5000,                   // كل كام ملّي ثانية التطبيق يسأل عن الطلبات والتسعير (والتطبيق ظاهر)
  SPEED_KMH: 25,                   // متوسط سرعة الطيار لحساب الوصول المتوقع
  ROAD_FACTOR: 1.4,                // معامل تقريب المسافة الفعلية على الطريق من الخط المستقيم

  APP_VERSION: "1.0.0",
  BUILD: "__BUILD__"               // بيتستبدل تلقائي عند كل نشر على GitHub
};
