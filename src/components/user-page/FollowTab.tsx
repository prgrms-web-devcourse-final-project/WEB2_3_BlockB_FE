import { useEffect, useRef, useState } from "react";
import { usePagination } from "../../hooks/usePagenation";
import Pagination from "../common/Pagenation";
import kebab from "../../assets/icons/kebab-menu-icon.svg";
import { userApi } from "../../api/user";
import { useNavigate, useParams } from "react-router";
import ReportModal from "../debate-zone/ongoing-debate/ReportModal";
import { useReportModalStore } from "../../stores/reportModalStore";
import { useModalStore } from "../../stores/useModal";
import Modal from "../common/Modal";


export default function FollowTab({ tab, user, isFollowed, handleFollow }: { tab: string, user: UserInfo | null, isFollowed: boolean, handleFollow: (id: number, action: "delete" | "follow")=>void}) {
  const [isFollowerTabed, setFollowerTabed] = useState(true);
  const [followers, setFollowers] = useState<Follower[]>([])
  const [followees, setFollowees] = useState<Followee[]>([])


  const deleteFollowing = async (targetUserId: number) => {
    await handleFollow(targetUserId, "delete");
  
    if (!user) return;
    const updatedFolloweesResponse = await userApi.fetchFollowees(user.id);
    setFollowees(updatedFolloweesResponse.data); 
  };
  
  const loadNetworkList = async () => {
    if (!user) return;
    if(isFollowerTabed){
      const followersResponse = await userApi.fetchFollowers(user.id)
      setFollowers(followersResponse.data)
    }
    else {
      const followeesResponse = await userApi.fetchFollowees(user.id);
      setFollowees(followeesResponse.data)
    }
      
};
   const loadAllNetworkList = async() => {
    if(!user) return
    const followersResponse = await userApi.fetchFollowers(user.id)
    setFollowers(followersResponse.data)
    const followeesResponse = await userApi.fetchFollowees(user.id);
    setFollowees(followeesResponse.data)
   }

  useEffect(() => {
    loadNetworkList();
  }, [tab, user?.id, isFollowerTabed, isFollowed]); 
  
  useEffect(() => {
    loadAllNetworkList();
    console.log("새로운 리스트가 렌더링되었습니다", paginatedBody)
  }, [isFollowed, user]); 

  const itemsPerPage = 6;

  const {
    paginatedData: paginatedBody,
    currentPage: currentPage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  } = usePagination<Follower | Followee>(isFollowerTabed? followers : followees, itemsPerPage);

  return (
    <div
      className={`${
        tab === "follow" ? "" : "hidden"
      } flex max-md:justify-center`}
    >
      <Modal />
      <ReportModal/>
      <div className="w-full max-md:w-80">
        <div className="flex text-[20px]  mb-[30px] font-pretendard ">
          <button
            onClick={() => {
              setFollowerTabed(true);
            }}
            className={`${
              isFollowerTabed
                ? "text-blue03 border-b-2 border-blue01 font-bold"
                : "text-gray03 "
            } h-6 mr-[30px]`}
          >
            팔로워 {followers.length || 0}명
          </button>
          <button
            onClick={() => {
              setFollowerTabed(false);
            }}
            className={`${
              isFollowerTabed
                ? "text-gray03"
                : "text-blue03 border-b-2 border-blue01 font-bold"
            } h-6`}
          >
            팔로잉 {followees.length || 0}명
          </button>
        </div>
        <div className="grid  md:grid-cols-2 gap-[20px] ">
          {paginatedBody.map((profile, index) => (
            <ProfileSimpleInfo key={index} profile={profile} isFollowerTabed={isFollowerTabed} deleteFollowing={deleteFollowing} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}


type Profile = Follower | Followee;

function ProfileSimpleInfo({
    profile,
    isFollowerTabed,
    deleteFollowing,
}: {
    profile: Profile;
    isFollowerTabed: boolean;
    deleteFollowing: (id: number) => void;
}) {
    const [isCurrentPageMine, setIsCurrentPageMine] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const checkCurrentPageIsMine = async () => {
            const currentUserInfoResponse = await userApi.fetchMyProfile();
            setIsCurrentPageMine(currentUserInfoResponse.data.id === Number(userId));
        };
        checkCurrentPageIsMine();
    }, [isFollowerTabed, profile]);

    // 타입 가드
    const isFollower = (profile: Profile): profile is Follower => {
        return (profile as Follower).followerId !== undefined;
    };

    const profileId = isFollower(profile) ? profile.followerId : profile.followeeId;

    // 신고모달 열기
    const { openModal: openReportModal } = useReportModalStore();
    const {openModal: openUnfollowModal} = useModalStore()

    const handleOpenReportModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      openReportModal({
        targetNickname: profile.nickname,
        targetUserId: profileId,
        targetType: "PROFILE",
        roomId: null,
      });
    };

    const handleOpenUnfollowModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      openUnfollowModal('정말로 삭제하시겠습니까?', () => {
        deleteFollowing(profileId);
      });
    };
    
    
    const onClickProfileCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      navigate(`/user-page/${profileId}`)
    }
  

    return (
        <div onClick={onClickProfileCard} className="max-md:w-70 max-lg:w-100 h-[90px] border border-solid border-white02 bg-white rounded-[10px] flex gap-2 items-center justify-between px-2 max-md:px-2">
            <div className="flex items-center">
                <img
                    src={profile.profile}
                    alt="프로필 이미지"
                    className="w-[60px] h-[60px] rounded-full md:mr-3 mr-2"
                />
                <div>
                    <div className="break-words line-clamp-2">{profile.nickname}</div>
                    <div>{profile.introduction || "아직 소개가 없습니다"}</div>
                </div>
            </div>

            <div className="flex items-center">
                {isCurrentPageMine && !isFollowerTabed && (
                    <button
                        onClick={handleOpenUnfollowModal}
                        className="rounded-[5px] bg-gray02 w-12 h-5 justify-center flex mr-2"
                    >
                        삭제
                    </button>
                )}
                <button onClick={handleOpenReportModal} className="w-1 h-3">
                    <img src={kebab} alt="신고 버튼" />
                </button>
            </div>
        </div>
    );
}