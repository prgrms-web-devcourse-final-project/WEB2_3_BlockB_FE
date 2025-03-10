import { useEffect, MouseEvent, useState } from "react";
import NotificationItem from "./NotificationItem";
import edge from "../../assets/icons/edge.svg";
import chrome from "../../assets/icons/chrome.svg";
import firefox from "../../assets/icons/firefox.svg";
import { notificationAPI } from "../../api/notificaion";
import { useUserStore } from "../../stores/userStore";
import useGetNotifications from "../../hooks/useGetNotifications";
import { useInView } from "react-intersection-observer";

export default function NotificationList({
  status,
  onClose,
  fetchNotificationData,
}: {
  status: HeaderStatusType;
  onClose: () => void;
  fetchNotificationData: () => void;
}) {
  const { userId } = useUserStore();
  const [deleteNotificationId, setDeleteNotificationId] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotifications(userId!);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { ref, inView } = useInView();

  const openDeleteModal = (notificationId: number) => {
    setDeleteModal(!deleteModal);
    setDeleteNotificationId(notificationId);
  };
  const closeDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const fetchNotifications = async () => {
    const notificationInfos = await notificationAPI.getNotifications(
      userId!,
      1
    );
    setNotifications(notificationInfos.data.notifications.content);
  };

  const allNotificationsDelete = async () => {
    await notificationAPI.deleteAllNotifications(userId!);
    setNotifications([]);
    fetchNotificationData();
  };
  const allNotificationsRead = async () => {
    await notificationAPI.putAllNotifications(userId!);
    fetchNotifications();
    fetchNotificationData();
  };

  const notificationDelete = async (notificationId: number) => {
    await notificationAPI.deleteNotifications(notificationId);
    fetchNotifications();
    fetchNotificationData();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.pages.flatMap((page) => page.data.notifications.content)
      ); // 모든 페이지의 데이터를 합쳐서 새로운 배열로 저장
    }
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const bgColor =
    status === "debate-waiting"
      ? "bg-gray-800"
      : status === "admin"
      ? "bg-gray-100"
      : "bg-white";

  const textColor =
    status === "debate-waiting"
      ? "text-white"
      : status === "admin"
      ? "text-black"
      : "text-gray-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start p-4 lg:justify-end font-pretendard"
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute w-[420px] top-[50px] h-72 overflow-auto md:top-[85px] right-[15px] md:right-[30px] mx-auto p-3 sm:p-4 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px] lg:max-w-[420px] border border-gray-200 ${bgColor}`}
      >
        <div className="flex items-center justify-between px-2 sm:px-3">
          <h2 className={`text-base sm:text-lg font-semibold  ${textColor}`}>
            {localStorage.getItem("fcmToken")
              ? "알림"
              : "브라우저별 알림 권한 재설정 방법"}
          </h2>
          <div className="flex flex-col items-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
            {localStorage.getItem("fcmToken") && (
              <div className="flex gap-2">
                {[
                  { content: "모두 삭제", function: allNotificationsDelete },
                  { content: "모두 읽기", function: allNotificationsRead },
                ].map((item, index) => (
                  <button
                    onClick={item.function}
                    key={index}
                    className="mt-3 mb-3 text-xs text-gray-500 sm:text-sm hover:text-gray-700"
                  >
                    {item.content}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 알림 리스트 */}
        <div className="space-y-2 max-h-[70vh] overflow-y-auto font-pretendard ${textColor}">
          {localStorage.getItem("fcmToken") ? (
            notifications.length > 0 ? (
              <>
                {notifications.map((notification, index) => (
                  <NotificationItem
                    key={index}
                    isNew={notification.statusType === "UNREAD"}
                    message={notification.content}
                    actionType={notification.notificationType}
                    typeId={notification.typeId}
                    id={notification.id}
                    fetchNotifications={fetchNotifications}
                    openDeleteModal={openDeleteModal}
                    fetchNotificationData={fetchNotificationData}
                  />
                ))}

                <div ref={ref} className="w-full h-10 "></div>
              </>
            ) : (
              <p className="w-80">알림 없음</p>
            )
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              {[
                {
                  src: chrome,
                  alt: "크롬",
                  explanation: " 설정 > 개인정보 및 보안 > 사이트 설정 > 알림",
                },
                {
                  src: edge,
                  alt: "엣지",
                  explanation: " 설정 > 쿠키 및 사이트 권한 > 알림",
                },
                {
                  src: firefox,
                  alt: "파이어폭스",
                  explanation: " 설정 > 개인정보 보호 및 보안 > 알림",
                },
              ].map((item, index) => (
                <div className="flex items-center" key={index}>
                  <img src={item.src} alt={item.alt} className="w-6 h-6 mr-2" />
                  <p>{item.explanation}</p>
                </div>
              ))}
              <p>
                권한을 허용하신 후 재로그인을 하셔야 알림 서비스 이용이
                가능합니다.
              </p>
            </div>
          )}
        </div>
      </div>
      {deleteModal && (
        <div
          className={`absolute w-[420px] top-[50px] h-72 overflow-auto md:top-[85px] right-[15px] md:right-[30px] mx-auto p-3 sm:p-4 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px]  lg:max-w-[420px] border border-gray-200 bg-black/40 `}
        >
          <div className="flex items-center w-full h-full">
            <div className="w-full p-4 rounded-lg bg-white/80 backdrop-blur-md">
              <p className="mb-4 font-semibold text-center text-gray-800">
                정말 삭제하시겠습니까?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  onClick={() => {
                    notificationDelete(deleteNotificationId);
                    closeDeleteModal();
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
