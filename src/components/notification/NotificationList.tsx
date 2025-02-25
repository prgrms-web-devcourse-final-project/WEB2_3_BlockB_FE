import { useEffect, MouseEvent } from "react";
import NotificationItem from "./NotificationItem";

export default function Notification({
  status,
  onClose,
}: {
  status: HeaderStatusType;
  onClose: () => void;
}) {
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
      className="fixed inset-0 flex lg:justify-end items-start p-4 z-50 font-pretendard"
      onClick={handleOverlayClick}
    >
      <div
        className={`absolute top-[50px] md:top-[85px] right-[15px] md:right-[30px] mx-auto p-3 sm:p-4 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px] lg:max-w-[420px] border border-gray-200 ${bgColor}`}
      >
        <div className="flex justify-between items-center px-2 sm:px-3">
          <h2 className={`text-base sm:text-lg font-semibold ${textColor}`}>
            알림
          </h2>
          <div className="flex flex-col items-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <button className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 mt-3 mb-3">
              모두 읽기
            </button>
          </div>
        </div>

        {/* 알림 리스트 */}
        <div
          className={`space-y-2 max-h-[70vh] overflow-y-auto font-pretendard ${textColor}`}
        >
          <NotificationItem
            isNew={true}
            message="대기가 완료되었습니다. 30초 후에 토론이 시작합니다."
            actionText="입장하기"
          />
          <NotificationItem
            isNew={true}
            message="naehyn님이 팔로우했습니다."
            actionText="프로필보기"
          />
          <NotificationItem
            isNew={false}
            message="naehyn님이 팔로우했습니다."
            actionText="프로필보기"
          />
          <NotificationItem
            isNew={false}
            message="음란/선정 게시물로 운영자에게 일시정지 처분을 받았습니다."
          />
          <NotificationItem
            isNew={false}
            message="욕설/비속어로 운영자에게 경고 처리를 받았습니다."
          />
        </div>
      </div>
    </div>
  );
}
