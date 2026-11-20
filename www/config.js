// ===== إعدادات تطبيق الطيار - صيدليات د/ مراد صادق =====
// ده الملف الوحيد اللي بتعدل فيه الإعدادات من غير ما تلمس الكود.
// (self بدل window علشان الملف ده بيتقرا كمان جوه الـ service worker)
self.APP_CONFIG = {
  APP_NAME: "مراد صادق رايدر",

  // رقم دعم الإدارة (بيظهر في المساعدة والدعم). مثال: "01012345678"
  SUPPORT_PHONE: "",

  // رابط سكربت الطلبات (مشروع Apps Script "اوردارس") - نفس الرابط اللي في تطبيق العميل بالظبط
  ORDERS_URL: "https://script.google.com/macros/s/AKfycbxbF_wetRGJHx64O8tvS9cXBkL7OzIs4FjFwExdzI7RCEnOpKp5ZalarJj8Kz9QDJ8/exec",

  // مكان الصيدلية: بيتحسب منه "الوصول للصيدلية خلال" اللي بيظهر للعميل، وبيفتح زرار الخريطة
  // خد الإحداثيات: افتح الصيدلية في خرائط جوجل ← اضغط مطولاً على الدبوس ← انسخ الرقمين (مثال 30.0444 , 31.2357)
  STORE: { lat: null, lng: null, mapUrl: "" },

  // إشعارات Firebase (خارج التطبيق): سيبها false لحد ما نجهّز Firebase. التنبيه جوه التطبيق (صوت + اهتزاز) شغال دايماً وهو مفتوح.
  PUSH_ENABLED: false,

  // إعدادات Firebase للإشعارات (من Project settings ← Your apps ← Web app). سيبها فاضية لو مش هتستخدم إشعارات المتصفح
  // vapidKey: Project settings ← Cloud Messaging ← Web Push certificates ← Generate key pair
  FIREBASE: { apiKey: "", authDomain: "", projectId: "", messagingSenderId: "", appId: "", vapidKey: "" },

  CHANNEL_ID: "murad_orders_v1",   // لازم يطابق FCM_CHANNEL في orders.gs
  POLL_MS: 5000,                   // كل كام ملّي ثانية التطبيق يسأل عن الطلبات والتسعير (والتطبيق ظاهر)
  SPEED_KMH: 25,                   // متوسط سرعة الطيار لحساب الوصول المتوقع
  ROAD_FACTOR: 1.4,                // معامل تقريب المسافة الفعلية على الطريق من الخط المستقيم

  APP_VERSION: "1.0.0",
  BUILD: "__BUILD__"               // بيتستبدل تلقائي عند كل نشر على GitHub
};
