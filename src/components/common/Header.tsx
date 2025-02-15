import { Link } from "react-router";
import logo from "../../assets/icons/logo.svg";
import notification from "../../assets/icons/notification.svg";
import profile from "../../assets/icons/profile.svg";

export default function Header() {
  return (
    <div className="w-full  h-[80px] flex px-[40px] justify-between items-center">
      <div className="flex w-[491px] h-[53px] justify-between items-center  ">
        <Link to={"/"}>
          <img src={logo} alt="logo" />{" "}
        </Link>
        <div className="flex w-[386px] h-[29px] justify-between text-[24px] items-center ">
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
          <img src={notification} alt="알림" />
        </button>
        <Link to={"/my-page"} className=" mx-[34px]">
          <img src={profile} alt="프로필 사진" />
        </Link>
        <Link to={"/my-page"} className="sofia-sans">
          <div>Name</div>
        </Link>
      </div>
    </div>
  );
}
