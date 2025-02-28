import { useEffect, useState } from "react";
import ProfileSimpleInfo from "./ProfileSimpleInfo";
import { usePagination } from "../../hooks/usePagenation";
import Pagination from "../common/Pagenation";
import { userApi } from "../../api/user";

export default function FollowTab({ tab, user, isFollowed, handleFollow }: { tab: string, user: UserInfo | null, isFollowed: boolean, handleFollow: (id: number, action: "delete" | "follow")=>void}) {
  const [isFollowerTabed, setFollowerTabed] = useState(true);
  const [followers, setFollowers] = useState<Follower[]>([])
  const [followees, setFollowees] = useState<Follower[]>([])


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
  }, [isFollowed]); 

  const itemsPerPage = 6;
  const {
    paginatedData: paginatedBody,
    currentPage: currentPage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  } = usePagination(isFollowerTabed? followers : followees, itemsPerPage);
  return (
    <div
      className={`${
        tab === "follow" ? "" : "hidden"
      } flex max-md:justify-center`}
    >
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
          {paginatedBody.map((profile) => (
            <ProfileSimpleInfo profile={profile} isFollowerTabed={isFollowerTabed} handleFollow={handleFollow} />
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
