import { Link } from "react-router";
import logoWhite from "../../assets/icons/logo-white.png";
import logo from "../../assets/icons/logo.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notification from "../../assets/icons/notification.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profile from "../../assets/icons/profile.svg";

export default function Header({
  status,
}: {
  status: "default" | "debate-waiting" | "debate-ing";
}) {
  // 'debate-ing' 상태일 때 헤더를 렌더링하지 않음
  if (status === "debate-ing") {
    return null;
  }

  return (
    <div
      className={`w-full h-[80px] flex px-[40px] justify-between items-center ${
        status === "debate-waiting" ? "text-[#FBFBFB]" : "bg-[#FBFBFB]"
      }`}
    >
      <div className="flex w-[491px] h-[53px] justify-between items-center">
        <Link to={"/"}>
          <img src={status === "debate-waiting" ? logoWhite : logo} />
        </Link>
        <div className="flex w-[386px] h-[29px] justify-between text-[24px] items-center">
          <Link to={"/news"} className="sofia-sans">
            News
          </Link>
          <Link to={"/debate-rooms"} className="sofia-sans">
            Debate Rooms
          </Link>
          <Link to={"/debaters"} className="sofia-sans">
            Debaters
          </Link>
        </div>
      </div>
      <div className="flex w-[237px] h-[30px] justify-end items-center">
        <button>
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
        <Link to={"/my-page"} className="sofia-sans">
          <div>Name</div>
        </Link>
      </div>
    </div>
  );
}
