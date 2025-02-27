import kebab from "../../assets/icons/kebab-menu-icon.svg";

export default function ProfileSimpleInfo({profile}: {profile: Follower}) {
  return (
    <div className="w-[450px] max-md:w-80 max-lg:w-96 h-[90px] border border-solid border-white02 bg-white rounded-[10px] flex items-center justify-between px-6 max-md:px-2">
      <div className="flex items-center">
        <img
          src={profile.profile}
          alt="프로필 이미지"
          className="w-[60px] h-[60px] rounded-full mr-3"
        />
        <div>
          <div>{profile.nickname}</div>
          <div>토론왕 김내현입니다.</div>
        </div>
      </div>

      <div className="flex items-center">
        <button className="rounded-[5px] bg-gray02 w-12 h-5 justify-center flex mr-1">
          삭제
        </button>
        <button className="w-1 h-3">
          <img src={kebab} alt="신고 버튼" />
        </button>
      </div>
    </div>
  );
}
