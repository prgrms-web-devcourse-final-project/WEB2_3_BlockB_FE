import { useEffect, MouseEvent } from "react";
import NotificationItem from "./NotificationItem";

export default function Notification({ onClose }: { onClose: () => void }) {
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

  return (
    <div
      className="fixed inset-0 flex justify-end items-start p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="absolute top-[85px] right-[30px] bg-white p-2 rounded-lg shadow-lg w-[420px] border border-gray-200">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
          <h2 className="text-lg font-semibold">알림</h2>
          <div className="flex flex-col items-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 mt-1">
              모두 읽기
            </button>
          </div>
        </div>

        {/* 알림 리스트 */}
        <div className="p-2 space-y-2 font-pretendard">
          <NotificationItem
            isNew
            message="대기가 완료되었습니다. 30초 후에 토론이 시작합니다."
            actionText="입장하기"
          />
          <NotificationItem
            isNew
            message="naehyn님이 팔로우했습니다."
            actionText="프로필보기"
          />
          <NotificationItem
            message="naehyn님이 팔로우했습니다."
            actionText="프로필보기"
            isDisabled
          />
          <NotificationItem message="음란/선정 게시물로 운영자에게 일시정지 처분을 받았습니다." />
          <NotificationItem message="욕설/비속어로 운영자에게 경고 처리를 받았습니다." />
        </div>
      </div>
    </div>
  );
}
