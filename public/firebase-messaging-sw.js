importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

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

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
