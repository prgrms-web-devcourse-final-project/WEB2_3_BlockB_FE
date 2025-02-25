import { useState } from "react";
import { Link } from "react-router";
import logoWhite from "../../assets/icons/logo-white.png";
import logo from "../../assets/icons/logo.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notification from "../../assets/icons/notification.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profile from "../../assets/icons/profile.svg";
import NotificationList from "../notification/NotificationList";

export default function Header({ status }: { status: HeaderStatusType }) {
  // 'debate-ing' 상태일 때 헤더를 렌더링하지 않음
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  if (status === "debate-ing") {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        {status === "landing" ? (
          <div className="w-full h-[80px] flex max-md:px-[12px] px-[40px] max-md:h-[40px] justify-between items-center bg-black01 text-white">
            <img
              src={logoWhite}
              className="max-md:w-7 max-md:h-7 max-md:object-cover"
            />
            <p className="font-unifrakturCook text-[40px] max-md:text-[24px]">
              Earth Talk
            </p>
            <button className="font-pretendard font-bold text-[18px] max-md:text-[12px]">
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
                <Link to={"/news"}>News</Link>
                <Link to={"/debate-rooms"}>Debate Rooms</Link>
                <Link to={"/debaters"}>Debaters</Link>
                {status === "admin" ? <Link to={"/admin"}>Admin</Link> : ""}
              </div>
            </div>
            <div className="flex w-[87px] max-md:w-9 h-[30px] justify-between items-center">
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
              <Link to={"/my-page"}>
                <img
                  className="max-md:w-[14px] max-md:h-[14px]"
                  src={status === "debate-waiting" ? profileWhite : profile}
                  alt="프로필 사진"
                />
              </Link>
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
