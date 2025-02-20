import avatar from "../../assets/icons/avatar.svg";
import kebab from "../../assets/icons/kebab-menu-icon.svg";

export default function ProfileSimpleInfo() {
  return (
    <div className="w-[450px] h-[90px] border border-solid border-white02 bg-white rounded-[10px] flex items-center justify-between px-6">
      <div className="flex items-center">
        <img
          src={avatar}
          alt="프로필 이미지"
          className="w-[60px] h-[60px] rounded-full mr-3"
        />
        <div>
          <div>김내현</div>
          <div>토론왕 김내현입니다.</div>
        </div>
      </div>

      <div className="flex items-center">
        <button className="rounded-[5px] bg-gray02 w-12 h-5 justify-center flex mr-1">
          삭제
        </button>
        <button className="w-1 h-3">
          <img src={kebab} alt="케밥 메뉴 아이콘" />
        </button>
      </div>
    </div>
  );
}
