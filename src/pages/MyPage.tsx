import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.svg";
import DebateTab from "../components/my-page/DebateTab";
import FollowTab from "../components/my-page/FollowTab";
import NewsTab from "../components/my-page/NewsTab";
import MyPageSkeleton from "../components/common/skeleton/mypage/MyPageSkeleton";

export default function MyPage() {
  const [tab, setTab] = useState("news");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <MyPageSkeleton />;
  }

  return (
    <div className="flex justify-center px-[10px]">
      <div className="w-[960px] md:h-[790px] mt-20 max-md:mt-10 font-pretendard">
        {/* 프로필 정보 */}
        <div className="flex max-md:flex-col max-md:items-center">
          <img
            src={avatar}
            alt="프로필 사진"
            className="md:mr-10 w-[200px] h-[200px] rounded-[65px] max-lg:w-44 max-lg:h-44 max-md:w-32 max-md:h-32 max-md:rounded-3xl max-md:mb-7"
          />
          <div className="w-[550px] max-lg:w-[480px] max-md:w-80 flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[20px] max-md:text-[14px] max-md:w-80">
                김내현
                <Link
                  to="/profile-update"
                  className="text-white bg-blue01 w-24 h-9 md:text-[16px] text-[14px] rounded-[10px] flex justify-center items-center max-md:text-[12px] max-md:w-16 max-md:h-7 max-md:rounded-lg"
                >
                  프로필 편집
                </Link>
              </div>
              <div className="text-gray01 text-[14px] max-md:text-[10px]">
                안녕하세요. 김내현입니다...
              </div>
            </div>

            {/* 승리, 무승부, 패배 정보 */}
            <div className="flex w-[550px] max-lg:w-[480px] max-md:w-80 justify-between max-md:mt-6">
              {["승리", "무승부", "패배"].map((title, index) => {
                const stats = ["W", "D", "L"];
                return (
                  <div
                    key={index}
                    className="w-40 max-lg:w-36 max-md:w-24 h-[135px] max-lg:h-28 max-md:h-20 border border-solid border-white02 rounded-2xl bg-white pl-6 pt-4 max-md:pl-3 max-md:pt-2"
                  >
                    <div className="text-[15px] font-semibold max-md:text-[12px]">
                      {title}
                    </div>
                    <div className="flex justify-between h-12">
                      <div className="text-[48px] font-semibold max-lg:text-[36px] max-md:text-[24px]">
                        77
                      </div>
                      <div className="font-timmana text-[80px] max-lg:text-[60px] max-md:text-[40px] text-blue04">
                        {stats[index]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 탭 버튼 */}
        <div className="flex max-md:justify-center">
          <div className="mt-[52px] mb-4 w-80 flex justify-between max-md:mt-7">
            {["news", "debate", "follow"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`w-[92px] h-10 rounded-[10px] text-white ${
                  tab === item ? "bg-blue01" : "bg-gray03"
                }`}
              >
                {item === "news"
                  ? "뉴스"
                  : item === "debate"
                  ? "토론방"
                  : "팔로우"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <hr className="w-full bg-gray03 h-[2px] mb-3 max-md:w-80" />
        </div>

        <NewsTab tab={tab} />
        <DebateTab tab={tab} />
        <FollowTab tab={tab} />
      </div>
    </div>
  );
}
