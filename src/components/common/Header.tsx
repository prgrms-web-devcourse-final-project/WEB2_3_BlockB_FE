import { useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/icons/logo-white.png";
import logo from "../../assets/icons/logo.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notification from "../../assets/icons/notification.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profile from "../../assets/icons/profile.svg";
import NotificationList from "../notification/NotificationList";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore";
// TODO: 삼항 연산자 기준으로 함수 나누기 (파일 내에서)

export default function Header({ status }: { status: HeaderStatusType }) {
  // 'debate-ing' 상태일 때 헤더를 렌더링하지 않음
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { userId, profileUrl } = useUserStore();
  const { logout } = useAuthStore();
  if (status === "debate-ing") {
    return null;
  }
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        {status === "landing" ? (
          <div className="w-full h-[80px] flex max-md:px-[12px] px-[40px] max-md:h-[40px] justify-between items-center bg-black01 text-white">
            <img
              src={logoWhite}
              className="max-md:w-7 max-md:h-7 max-md:object-cover"
            />
            <p className="font-unifrakturCook text-[40px] max-md:text-[24px]">
              Earth Talk
            </p>
            <button
              className="font-pretendard font-bold text-[18px] max-md:text-[12px]"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          </div>
        ) : (
          <div
            className={`w-full h-[80px] flex max-md:px-[12px] px-[40px] max-md:h-[40px] shadow-md justify-between items-center  
            ${
              status === "debate-waiting"
                ? "text-white bg-black"
                : "bg-white border-b border-gray03"
            }`}
          >
            <div
              className={`${
                status === "admin"
                  ? "w-[550px] max-md:w-[250px]"
                  : "w-[440px] max-md:w-[220px]"
              } flex h-[53px] justify-between items-center`}
            >
              <Link to={"/main"}>
                <img
                  src={status === "debate-waiting" ? logoWhite : logo}
                  className="max-md:w-7 max-md:h-7 max-md:object-cover"
                />
              </Link>
              <div
                className={`${
                  status === "admin"
                    ? "w-[460px] max-md:w-[220px]"
                    : "w-[360px] max-md:w-[180px]"
                } flex h-[29px] justify-between text-[24px] max-md:text-[12px] items-center font-sofiaSans text-black01`}
              >
                <Link to={"/news?continent=all"}>News</Link>
                <Link to={"/debate-rooms"}>Debate Rooms</Link>
                <Link to={"/debaters"}>Debaters</Link>
                {status === "admin" ? <Link to={"/admin"}>Admin</Link> : ""}
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-4">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <img
                  className="max-md:w-[11px] max-md:h-[14px]"
                  src={
                    status === "debate-waiting"
                      ? notificationWhite
                      : notification
                  }
                  alt="알림"
                />
              </button>
              <button onClick={() => navigate(`/user-page/${userId}`)}>
                <img
                  className="md:w-[35px] w-[16px] md:h-[35px] h-[16px] rounded-full"
                  src={
                    profileUrl ||
                    (status === "debate-waiting" ? profileWhite : profile)
                  }
                  alt="프로필 사진"
                />
              </button>
              <button
                className="font-pretendard font-bold text-[10px] md:text-[18px] text-black hover:text-red-700"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>

              {isNotificationOpen && (
                <NotificationList
                  status={status}
                  onClose={() => setIsNotificationOpen(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="pt-[40px] md:pt-[80px]"></div>
    </>
  );
}
