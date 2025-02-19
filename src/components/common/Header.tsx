import { useState } from "react";
import { Link } from "react-router";
import logoWhite from "../../assets/icons/logo-white.png";
import logo from "../../assets/icons/logo.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notification from "../../assets/icons/notification.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profile from "../../assets/icons/profile.svg";
import NotificationList from "../notification/NotificationList";

export default function Header({
  status,
}: {
  status: "default" | "debate-waiting" | "debate-ing" | "admin";
}) {
  // 'debate-ing' 상태일 때 헤더를 렌더링하지 않음
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  if (status === "debate-ing") {
    return null;
  }

  return (
    <div
      className={`w-full h-[80px] flex px-[40px] shadow-md justify-between items-center ${
        status === "debate-waiting"
          ? "text-white"
          : "bg-white  border-b border-gray03 "
      }`}
    >
      <div
        className={`${
          status === "admin" ? "w-[600px]" : "w-[491px]"
        } flex h-[53px] justify-between items-center`}
      >
        <Link to={"/main"}>
          <img src={status === "debate-waiting" ? logoWhite : logo} />
        </Link>
        <div
          className={`${
            status === "admin" ? "w-[494px]" : "w-[386px]"
          } flex  h-[29px] justify-between text-[24px] items-center font-sofiaSans text-black01`}
        >
          <Link to={"/news"}>News</Link>
          <Link to={"/debate-rooms"}>Debate Rooms</Link>
          <Link to={"/debaters"}>Debaters</Link>
          {status === "admin" ? <Link to={"/admin"}>Admin</Link> : ""}
        </div>
      </div>
      <div className="relative flex w-[237px] h-[30px] justify-end items-center">
        <button onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <img
            src={status === "debate-waiting" ? notificationWhite : notification}
            alt="알림"
          />
        </button>
        <Link to={"/my-page"} className=" mx-[34px]">
          <img
            src={status === "debate-waiting" ? profileWhite : profile}
            alt="프로필 사진"
          />
        </Link>
        <Link to={"/my-page"} className="font-sofiaSans">
          <div>Name</div>
        </Link>
        {isNotificationOpen && (
          <NotificationList onClose={() => setIsNotificationOpen(false)} />
        )}
      </div>
    </div>
  );
}
