import { useEffect, MouseEvent, useState } from "react";
import NotificationItem from "./NotificationItem";
import edge from "../../assets/icons/edge.svg";
import chrome from "../../assets/icons/chrome.svg";
import firefox from "../../assets/icons/firefox.svg";
import { notificationAPI } from "../../api/notificaion";
import { useUserStore } from "../../stores/userStore";
import useGetNotifications from "../../hooks/useGetNotifications";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import noNotification from "../../assets/icons/no-notification.svg";
import NotificationDeleteModal from "./NotificationDeleteModal";

export default function NotificationList({
  status,
  onClose,
}: {
  status: HeaderStatusType;
  onClose: () => void;
}) {
  const { userId } = useUserStore();
  const queryClient = useQueryClient();
  const [deleteNotificationId, setDeleteNotificationId] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<DeleteModalType>(null);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotifications(userId!);

  const { ref, inView } = useInView();

  const openDeleteModal = (notificationId: number) => {
    setDeleteModal("delete");
    setDeleteNotificationId(notificationId);
  };
  const closeDeleteModal = () => {
    setDeleteModal(null);
  };

  const allNotificationsDelete = async () => {
    await notificationAPI.deleteAllNotifications(userId!);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };
  const allNotificationsRead = async () => {
    await notificationAPI.putAllNotifications(userId!);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const notificationDelete = async (notificationId: number) => {
    await notificationAPI.deleteNotifications(notificationId);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
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

  const notifications =
    data?.pages.flatMap((page) => page.data.notifications.content) ?? [];
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
            {localStorage.getItem("fcmToken") &&
              data!.pages[0].data.notifications.content.length > 0 && (
                <div className="flex gap-2">
                  {[
                    {
                      content: "모두 삭제",
                      function: () => {
                        setDeleteModal("allDelete");
                      },
                    },
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
                {notifications.map(
                  (notification: NotificationType, index: number) => (
                    <NotificationItem
                      key={index}
                      statusType={notification.statusType}
                      message={notification.content}
                      actionType={notification.notificationType}
                      typeId={notification.typeId}
                      id={notification.id}
                      openDeleteModal={openDeleteModal}
                    />
                  )
                )}

                <div ref={ref} className="w-full h-10 "></div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-48 gap-3">
                <img src={noNotification} alt="알림 없음 아이콘" />
                <p className="font-semibold font-sofiaSans text-[14px]">
                  알림이 없습니다.
                </p>
              </div>
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
        <NotificationDeleteModal
          deleteModal={deleteModal}
          notificationDelete={notificationDelete}
          deleteNotificationId={deleteNotificationId}
          allNotificationsDelete={allNotificationsDelete}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </div>
  );
}
