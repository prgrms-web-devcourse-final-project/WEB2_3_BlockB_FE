export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      // 기존 Service Worker 제거
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
        console.log("기존 Service Worker 제거 완료");
      }

      // 새 Service Worker 등록
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log(
        "Service Worker가 scope에 등록되었습니다.:",
        registration.scope
      );
    } catch (error) {
      console.error("Service Worker 등록 실패:", error);
    }
  }
}
