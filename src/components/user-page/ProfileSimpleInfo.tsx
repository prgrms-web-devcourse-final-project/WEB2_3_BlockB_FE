import kebab from "../../assets/icons/kebab-menu-icon.svg";

export default function ProfileSimpleInfo({profile}: {profile: Follower}) {
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
          <div>{profile.introduction|| "아직 소개가 없습니다"}</div>
        </div>
      </div>

      <div className="flex items-center">
        <button className="rounded-[5px] bg-gray02 w-12 h-5 justify-center flex mr-2">
          삭제
        </button>
        <button className="w-1 h-3">
          <img src={kebab} alt="신고 버튼" />
        </button>
      </div>
    </div>
  );
}
