import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./initFirebase.ts";

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  const notificationTitle = payload.notification?.title || "알림";
  const notificationOptions = {
    body: payload.notification?.body || "새로운 알림이 도착했습니다.",
  };

  if (Notification.permission === "granted" && navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});
