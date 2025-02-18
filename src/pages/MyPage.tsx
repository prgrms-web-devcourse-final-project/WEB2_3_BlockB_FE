import { useState } from "react";
import { Link } from "react-router";
import avatar from "../assets/icons/avatar.svg";
import DebateTab from "../components/my-page/DebateTab";
import FollowTab from "../components/my-page/FollowTab";
import NewsTab from "../components/my-page/NewsTab";
export default function MyPage() {
  const [tab, setTab] = useState("news");
  return (
    <div className="flex justify-center ">
      <div className="w-[960px] h-[790px] mt-[88px] font-pretendard ">
        <div className="flex">
          <img
            src={avatar}
            alt="프로필 사진"
            className="mr-10 w-[200px] h-[200px] rounded-[65px]"
          />
          <div className=" w-[550px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[20px] ">
                김내현
                <Link
                  to={"/profile-update"}
                  className="text-white bg-blue01 w-24 h-9 text-[18px] rounded-[10px] flex justify-center items-center"
                >
                  프로필 편집
                </Link>
                {/* <button className="text-white bg-blue01 w-20 h-9 text-[18px] rounded-[10px] ">
                  팔로우
                </button> */}
              </div>
              <div className="text-gray01">안녕하세요. 김내현입니다...</div>
            </div>

            <div className="flex w-[550px] justify-between">
              <div className="w-[160px] h-[135px] border border-solid border-white02 rounded-2xl bg-white  pl-6 pt-4">
                <div className="text-[15px] font-semibold">승리</div>
                <div className="flex justify-between h-12">
                  <div className="text-[48px] font-semibold">77</div>
                  <div className="font-timmana text-[80px] text-blue04 ">W</div>
                </div>
              </div>
              <div className="w-[160px] h-[135px] border border-solid border-white02 rounded-2xl bg-white  pl-6 pt-4">
                <div className="text-[15px] font-semibold">무승부</div>
                <div className="flex justify-between">
                  <div className="text-[48px] font-semibold">77</div>
                  <div className="font-timmana text-[80px] text-blue04">D</div>
                </div>
              </div>
              <div className="w-[160px] h-[135px] border border-solid border-white02 rounded-2xl bg-white pl-6 pt-4">
                <div className="text-[15px] font-semibold">패배</div>
                <div className="flex justify-between">
                  <div className="text-[48px] font-semibold">77</div>
                  <div className="font-timmana text-[80px] text-blue04">L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[52px] mb-4 w-[344px] flex justify-between">
          <button
            onClick={() => {
              setTab("news");
            }}
            className={`${
              tab === "news"
                ? "w-[92px] h-10 rounded-[10px] text-white bg-blue01"
                : "w-[92px] h-10 rounded-[10px] text-white bg-gray03"
            }`}
          >
            뉴스
          </button>
          <button
            onClick={() => {
              setTab("debate");
            }}
            className={`${
              tab === "debate"
                ? "w-[92px] h-10 rounded-[10px] text-white bg-blue01"
                : "w-[92px] h-10 rounded-[10px] text-white bg-gray03"
            }`}
          >
            토론방
          </button>
          <button
            onClick={() => {
              setTab("follow");
            }}
            className={`${
              tab === "follow"
                ? "w-[92px] h-10 rounded-[10px] text-white bg-blue01"
                : "w-[92px] h-10 rounded-[10px] text-white bg-gray03"
            }`}
          >
            팔로우
          </button>
        </div>
        <hr className="w-full bg-gray03 h-[2px] mb-3" />
        <NewsTab tab={tab} />
        <DebateTab tab={tab} />
        <FollowTab tab={tab} />
      </div>
    </div>
  );
}
