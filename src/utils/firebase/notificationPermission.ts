import { getToken, getMessaging } from "firebase/messaging";
import { notificationAPI } from "../../api/notificaion";
import { registerServiceWorker } from "./registerServiceWorker";
import { app } from "./initFirebase";

export async function handleAllowNotification(userId: number) {
  registerServiceWorker(); // 나중에 설명
  try {
    const permission = await Notification.requestPermission();
    const messaging = getMessaging(app);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        notificationAPI.postToken(userId, token);
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "알림 권한을 차단하셨습니다. 알림을 사용하시려면 권한 허용 후 재로그인 해주세요."
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
