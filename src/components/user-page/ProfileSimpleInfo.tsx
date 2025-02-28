import { useEffect, useState } from "react";
import kebab from "../../assets/icons/kebab-menu-icon.svg";
import { userApi } from "../../api/user";
import { useParams } from "react-router";

type Profile = Follower | Followee;

export default function ProfileSimpleInfo({
    profile,
    isFollowerTabed,
    handleFollow,
}: {
    profile: Profile;
    isFollowerTabed: boolean;
    handleFollow: (id: number, action: "delete" | "follow") => void;
}) {
    const [isCurrentPageMine, setIsCurrentPageMine] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        const checkCurrentPageIsMine = async () => {
            const currentUserInfoResponse = await userApi.fetchMyProfile();
            setIsCurrentPageMine(currentUserInfoResponse.data.id === Number(userId));
        };
        checkCurrentPageIsMine();
    }, [isFollowerTabed]);

    useEffect(() => {
        console.log(JSON.stringify(profile));
    }, []);

    // 타입 가드를 사용하여 Follower와 Followee를 구분
    const isFollower = (profile: Profile): profile is Follower => {
        return (profile as Follower).followerId !== undefined;
    };

    const profileId = isFollower(profile) ? profile.followerId : profile.followeeId;

    return (
        <div className="max-md:w-70 max-lg:w-100 h-[90px] border border-solid border-white02 bg-white rounded-[10px] flex gap-2 items-center justify-between px-2 max-md:px-2">
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
                        onClick={() => handleFollow(profileId, "delete")}
                        className="rounded-[5px] bg-gray02 w-12 h-5 justify-center flex mr-2"
                    >
                        삭제
                    </button>
                )}
                <button className="w-1 h-3">
                    <img src={kebab} alt="신고 버튼" />
                </button>
            </div>
        </div>
    );
}