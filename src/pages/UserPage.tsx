import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import avatar from "../assets/icons/avatar.svg";
import DebateTab from "../components/user-page/DebateTab";
import FollowTab from "../components/user-page/FollowTab";
import NewsTab from "../components/user-page/NewsTab";
import MyPageSkeleton from "../components/common/skeleton/mypage/MyPageSkeleton";
import { userApi } from "../api/user";
import { useUserStore } from "../stores/userStore";
import { useAuthStore } from "../stores/authStore";
import { useModalStore } from "../stores/useModal";
import logoutSVG from "../assets/icons/logout.svg";
import logoutHover from "../assets/icons/logoutHover.svg";
import useThrottle from "../hooks/useThrottle";

export default function UserPage() {
  const [tab, setTab] = useState("news");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isFollowed, setFollowing] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userId: currentUserId } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);
  const { logout } = useAuthStore();
  const { openModal } = useModalStore();
  const onClickLogout = () => {
    openModal(
      "로그아웃 시 이용이 제한됩니다.\n로그아웃 하시겠습니까?",
      async () => {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
          console.log("기존 Service Worker 제거 완료");
        }
        logout();
        navigate("/");
      }
    );
  };
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userInforesponse = await userApi.fetchUserProfile(Number(userId));
        setUser(userInforesponse.data);
      } catch (error) {
        console.error("유저페이지 불러오기 실패");
      }
    };

    loadProfileData();
  }, [userId]);

  useEffect(() => {
    if (user) setIsLoading(false);
    console.log(user);
  }, [user]);

  const handleFollow = async (
    targetUserId: number,
    action: "delete" | "follow"
  ) => {
    action === "delete"
      ? await userApi.deleteFollower(targetUserId)
      : await userApi.insertFollower(targetUserId);
    setFollowing(action === "follow");
  };

  const throttledFollow = useThrottle(handleFollow, 1000);

  const toggleFollow = () => {
    throttledFollow(userId, isFollowed ? "delete" : "follow");
  };

  // 해당 프로필 페이지의 유저를 현재 유저가 팔로우 했는지 안했는지 가져오는 함수
  useEffect(() => {
    const loadFollowerList = async () => {
      const followersResponse = await userApi.fetchFollowers(Number(userId));
      followersResponse.data.map((follower: Follower) => {
        return follower.followerId === currentUserId
          ? setFollowing(true)
          : setFollowing(false);
      });
    };
    loadFollowerList();
  }, [userId]);

  if (isLoading) {
    return <MyPageSkeleton />;
  }
  return (
    <div className="flex justify-center px-3 sm:px-[40px] mb-10">
      <div className="w-full md:h-[790px] mt-20 max-md:mt-10 font-pretendard">
        {/* 프로필 정보 */}
        <div className="flex max-md:flex-col max-md:items-center">
          <img
            src={user?.profileUrl || avatar}
            alt="프로필 이미지"
            className="md:mr-10 w-[200px] h-[200px] rounded-[65px] max-lg:w-44 max-lg:h-44 max-md:w-32 max-md:h-32 max-md:rounded-3xl max-md:mb-7"
          />
          <div className="max-lg:w-[480px] max-md:w-80 flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[20px] max-md:text-[14px] max-md:w-80">
                {user?.nickname}
                {currentUserId === Number(userId) ? (
                  <div>
                    <Link
                      to="/profile-update"
                      className="text-white bg-blue01 w-24 h-9 md:text-[16px] text-[14px] rounded-[10px] flex justify-center items-center max-md:text-[12px] max-md:w-16 max-md:h-7 max-md:rounded-lg"
                    >
                      프로필 편집
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={toggleFollow}
                    className={`${
                      isFollowed ? "bg-gray01" : "bg-blue01"
                    } text-white w-24 h-9 md:text-[16px] text-[14px] rounded-[10px] flex justify-center items-center max-md:text-[12px] max-md:w-16 max-md:h-7 max-md:rounded-lg`}
                  >
                    {isFollowed ? "팔로우 취소" : "팔로우"}
                  </button>
                )}
              </div>
              <div className="text-gray01 text-[14px] max-md:text-[10px]">
                {user?.introduction || "아직 소개가 없습니다"}
              </div>
            </div>

            {/* 승리, 무승부, 패배 정보 */}
            <div className="flex w-[550px] max-lg:w-[480px] max-md:w-80 justify-between max-md:mt-6">
              {[
                { label: "승리", count: user?.winNumber },
                { label: "무승부", count: user?.drawNumber },
                { label: "패배", count: user?.defeatNumber },
              ].map((item, index) => {
                const stats = ["W", "D", "L"];
                return (
                  <div
                    key={index}
                    className="w-40 max-lg:w-36 max-md:w-24 h-[135px] max-lg:h-28 max-md:h-20 border border-solid border-white02 rounded-2xl bg-white pl-6 pt-4 max-md:pl-3 max-md:pt-2"
                  >
                    <div className="text-[15px] font-semibold max-md:text-[12px]">
                      {item.label}
                    </div>
                    <div className="flex justify-between h-12">
                      <div className="text-[48px] font-semibold max-lg:text-[36px] max-md:text-[24px]">
                        {item.count || 0}
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
        <div className="flex justify-between items-center w-full mt-[52px] max-md:mt-[32px] mb-4 max-md:w-80 max-md:mx-auto">
          <div className="flex space-x-3">
            {["news", "debate", "follow"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`w-[92px] h-10 max-md:w-[60px] rounded-[10px] text-white ${
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

          {currentUserId === Number(userId) && (
            <button
              className="font-pretendard font-bold md:text-[18px] text-black hover:text-red-700"
              onClick={onClickLogout}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? logoutHover : logoutSVG}
                alt="로그아웃"
                className="w-[22px] h-[22px]"
              />
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <hr className="w-full bg-gray03 h-[2px] mb-3 max-md:w-80" />
        </div>

        <NewsTab tab={tab} user={user} />
        <DebateTab tab={tab} user={user} />
        <FollowTab
          tab={tab}
          user={user}
          isFollowed={isFollowed}
          handleFollow={handleFollow}
        />
      </div>
    </div>
  );
}
