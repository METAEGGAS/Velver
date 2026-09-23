// firebase-messaging-sw.js — مكانة: جذر الموقع /
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBvzfJOOjRFZnTgTUrwEZQPr8Ba7zKKlNg",
  authDomain: "hhhxh-5ebe4.firebaseapp.com",
  projectId: "hhhxh-5ebe4",
  storageBucket: "hhhxh-5ebe4.firebasestorage.app",
  messagingSenderId: "79243000696",
  appId: "1:79243000696:web:ee0fb2d2ccce791954e68d",
  measurementId: "G-08BR6LN6PT"
});

const messaging = firebase.messaging();

// استقبال الإشعارات والتطبيق مقفول أو في الخلفية
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'إشعار جديد';
  const options = {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {},
    dir: 'rtl',
    lang: 'ar'
  };
  self.registration.showNotification(title, options);
});

// فتح الموقع لما المستخدم يدوس على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
