importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  console.log("[Service Worker] 설치됨");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("[Service Worker] 활성화됨");
  self.clients.claim();
});

//  Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCgxbNXJeLHiAgZ2l2BGEjkPfH-fO0-ov4",
  authDomain: "earthtalk-f8dcd.firebaseapp.com",
  projectId: "earthtalk-f8dcd",
  storageBucket: "earthtalk-f8dcd.firebasestorage.app",
  messagingSenderId: "82417964645",
  appId: "1:82417964645:web:a6d7504d2c17c9e79e588c",
  measurementId: "G-K7RNZE68QP",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//  백그라운드 푸시 메시지 처리
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

//  알림 클릭 이벤트 추가
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] 알림 클릭됨:", event.notification);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return self.clients.openWindow(urlToOpen);
    })
  );
});
