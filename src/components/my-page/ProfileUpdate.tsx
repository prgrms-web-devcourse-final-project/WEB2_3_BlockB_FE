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
    <div >
      <div className="flex justify-center mt-[122px] max-md:mt-14 font-pretendard">
        <div className="md:max-w-[500px] max-w-[366px] h-[500px]  flex flex-col justify-between">
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
          {["닉네임 변경", "자기소개 변경"].map((title, index) => {
            const placeholder = [
              "변경하실 닉네임을 입력해주세요.",
              "변경하실 자기소개를 입력해주세요.",
            ];
            return (
              <div
                className="flex md:items-center items-start justify-between max-md:flex-col"
                key={index}
              >
                <span className="md:text-[18px] text-[16px] md:mr-3 mb-1">{title}</span>
                <input
                  type="text"
                  placeholder={placeholder[index]}
                  className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
                />
              </div>
            );
          })}

          <div className="flex justify-end h-[60px] ">
            <Link
              to={"/my-page"}
              className="flex bg-blue03 w-[84px] h-10 rounded-[10px] md:text-[16px] text-[14px] text-white justify-center items-center"
            >
              저장
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
