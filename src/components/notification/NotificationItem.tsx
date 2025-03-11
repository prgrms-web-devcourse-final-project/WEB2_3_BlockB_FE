import { useEffect, useState } from "react";
import { userApi } from "../../api/user";
import { useNavigate } from "react-router";
import { notificationAPI } from "../../api/notificaion";
import kebab from "../../assets/icons/kebab-menu-icon.svg";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationItem({
  statusType,
  message,
  actionType,
  typeId,
  id,
  openDeleteModal,
  isDisabled = false,
}: {
  statusType: string;
  message: string;
  actionType: ActionType;
  typeId: number;
  id: number;
  openDeleteModal: (notificationId: number) => void;
  isDisabled?: boolean;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    if (actionType === "FOLLOW") {
      (async () => {
        try {
          const userinfo = await userApi.fetchUserProfile(typeId);
          setUserNickname(userinfo.data.nickname);
        } catch (error) {
          console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        }
      })();
    }
  }, [actionType, typeId]);

  const readNotification = async () => {
    await notificationAPI.putNotifications(id);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className={`flex justify-between items-center  py-2 rounded-md transition duration-200 
        ${isDisabled ? "opacity-50" : "text-gray-700 hover:bg-gray-200"}
      `}
        onClick={async () => {
          await readNotification();
        }}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 m-1 rounded-full flex-shrink-0 ${
              statusType === "UNREAD" ? "bg-game_blue01" : "bg-gray-400"
            }`}
          ></div>

          <p
            className={`text-xs sm:text-sm transition duration-200 ${
              statusType === "UNREAD" ? "text-gray-700" : "text-gray-400"
            }`}
          >
            {actionType === "FOLLOW"
              ? ` ${userNickname}님이 회원님을 팔로우합니다.`
              : message}
          </p>
        </div>
        {actionType !== "REPORT" && (
          <button
            className={`text-xs sm:text-sm mr-1 transition duration-200 whitespace-nowrap ${
              statusType === "UNREAD"
                ? "text-game_blue01 hover:underline hover:text-blue-700"
                : "text-gray-400"
            }`}
            disabled={isDisabled}
            onClick={() => {
              navigate(`/user-page/${typeId}`);
            }}
          >
            {actionType === "FOLLOW" && "프로필확인"}
          </button>
        )}
      </div>
      <button
        className="w-1 h-3"
        onClick={() => {
          openDeleteModal(id);
        }}
      >
        <img src={kebab} alt="삭제 버튼" />
      </button>
    </div>
  );
}
