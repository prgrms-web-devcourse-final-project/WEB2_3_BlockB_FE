import { getToken, getMessaging, deleteToken } from "firebase/messaging";
import { notificationAPI } from "../../api/notificaion";
import { registerServiceWorker } from "./registerServiceWorker";
import { app } from "./initFirebase";

export async function handleAllowNotification(userId: number) {
  await registerServiceWorker(); // Service Worker 등록

  try {
    const permission = await Notification.requestPermission();
    const messaging = getMessaging(app);

    if (permission === "granted") {
      // 기존 토큰 삭제 후 새 토큰 요청
      await deleteToken(messaging);
      console.log("기존 토큰 삭제 완료");

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        console.log("새로운 FCM 토큰:", token);
        notificationAPI.postToken(userId, token, "true");
        localStorage.setItem("fcmToken", token);
      } else {
        console.warn("FCM 토큰을 가져올 수 없습니다.");
      }
    } else {
      console.warn("알림 권한이 허용되지 않았습니다.");
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
