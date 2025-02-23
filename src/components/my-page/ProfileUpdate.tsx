import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/avatar.svg";
import edit from "../../assets/icons/edit.svg";
import ProfileUpdateSkeleton from "../common/skeleton/mypage/ProfileUpdateSkeleton";

export default function ProfileUpdate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <ProfileUpdateSkeleton />;

  return (
    <div>
      <div className="flex justify-center mt-[122px] max-md:mt-14 font-pretendard">
        <div className="w-[500px] h-[500px]  flex flex-col justify-between">
          <div className="flex justify-center">
            <img
              src={avatar}
              alt="프로필 이미지"
              className="w-[200px] h-[200px] rounded-full max-md:w-36 max-md:h-36"
            />
          </div>
          <div className="flex justify-center">
            <button className="flex w-[148px] h-10 bg-blue03 text-white text-[14px] items-center rounded-[10px] justify-center ">
              <span>프로필 사진 변경</span>
              <img
                src={edit}
                alt="프로필 사진 수정 아이콘"
                className="w-5 h-5 ml-1"
              />
            </button>
          </div>

          <div className="flex items-center justify-between max-md:flex-col">
            <span className="text-[20px]">닉네임 변경</span>
            <input
              type="text"
              placeholder="변경하실 닉네임을 입력해주세요."
              className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
            />
          </div>
          <div className="flex items-center justify-between max-md:flex-col">
            <span className="text-[20px]">자기소개 변경</span>
            <input
              type="text"
              placeholder="변경하실 자기소개를 입력해주세요."
              className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
            />
          </div>
          <div className="flex justify-end h-[60px] ">
            <Link
              to={"/my-page"}
              className="flex bg-blue03 w-[84px] h-11 rounded-[10px] text-[18px] text-white justify-center items-center"
            >
              저장
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
