import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import ProfileUpdateSkeleton from "../common/skeleton/mypage/ProfileUpdateSkeleton";
import { userApi } from "../../api/user";

export default function ProfileUpdate() {
  const [isLoading, setIsLoading] = useState(true);
  const [newNickname, setNewNickname] = useState("")
  const [userId, setUserId] = useState<number | null>(null)
  const [newIntroduction, setNewIntroduction] = useState("")
  const [newProfileImg, setNewProfileImg] = useState("")

  useEffect(()=>{
    const loadOriginalProfile = async() => {
      const profileResponse = await userApi.fetchMyProfile()
      setUserId(profileResponse.data.id)
      setNewNickname(profileResponse.data.nickname)
      setNewIntroduction(profileResponse.data.introduction || "")
      setNewProfileImg(profileResponse.data.profileUrl)
      setIsLoading(false)
    }
    loadOriginalProfile()
},[])

  const navigate = useNavigate()
    
  const onSubmitUpdatedProfile = async() => {
    await userApi.updateUserProfile(userId!, {nickname: newNickname, introduction: newIntroduction, profileUrl: newProfileImg})
    navigate("/my-page")
  }

  if (isLoading) return <ProfileUpdateSkeleton />;

  return (
    <div >
      <div className="flex justify-center mt-[122px] max-md:mt-14 font-pretendard">
        <div className="md:max-w-[500px] max-w-[366px] h-[500px]  flex flex-col justify-between">
          <div className="flex justify-center">
            <img
              src={newProfileImg}
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
          <div
            className="flex md:items-center items-start justify-between max-md:flex-col"
          >
            <span className="md:text-[18px] text-[16px] md:mr-3 mb-1">닉네임 변경</span>
            <input
              type="text"
              value={newNickname}
              placeholder="변경하실 닉네임을 입력해주세요."
              onChange={(e)=> setNewNickname(e.target.value)}
              className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
            />
          </div>
          <div
            className="flex md:items-center items-start justify-between max-md:flex-col"
          >
            <span className="md:text-[18px] text-[16px] md:mr-3 mb-1">자기소개 변경</span>
            <input
              type="text"
              value={newIntroduction}
              placeholder="변경하실 소개글을 입력해주세요."
              onChange={(e) => setNewIntroduction(e.target.value)}
              className="w-[366px] h-12 bg-gray02 rounded-lg pl-5 max-md:w-[300px]"
            />
          </div>
          <div className="flex justify-end h-[60px] ">
            <button
              onClick={onSubmitUpdatedProfile}
              className="flex bg-blue03 w-[84px] h-10 rounded-[10px] md:text-[16px] text-[14px] text-white justify-center items-center"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
