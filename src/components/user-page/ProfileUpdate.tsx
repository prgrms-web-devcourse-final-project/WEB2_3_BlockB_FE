import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import ProfileUpdateSkeleton from "../common/skeleton/mypage/ProfileUpdateSkeleton";
import { userApi } from "../../api/user";
import ProfileUpdateInputBox from "./ProfileUpdateInputBox";

export default function ProfileUpdate() {
  const [isLoading, setIsLoading] = useState(true);
  const [newNickname, setNewNickname] = useState("");
  const [newIntroduction, setNewIntroduction] = useState("");
  const [newProfileImg, setNewProfileImg] = useState("");
  const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // 기존 데이터 저장
  const [originalNickname, setOriginalNickname] = useState("");
  const [originalIntroduction, setOriginalIntroduction] = useState("");
  const [originalProfileImg, setOriginalProfileImg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOriginalProfile = async () => {
      const profileResponse = await userApi.fetchMyProfile();
      setUserId(profileResponse.data.id);
      setNewNickname(profileResponse.data.nickname);
      setNewIntroduction(profileResponse.data.introduction || "");
      setNewProfileImg(profileResponse.data.profileUrl);

      // 원본 데이터 저장
      setOriginalNickname(profileResponse.data.nickname);
      setOriginalIntroduction(profileResponse.data.introduction || "");
      setOriginalProfileImg(profileResponse.data.profileUrl);

      setIsLoading(false);
    };
    loadOriginalProfile();
  }, []);

  const onClickImgEdit = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImgFile(file);
      setNewProfileImg(URL.createObjectURL(file));
    }
  };

  const onSubmitUpdatedProfile = async () => {
    if (!userId) return;
  
    // 기존 값과 비교하여 변경된 값만 수집
    const updatedData: Partial<ProfileUpdate> = {};
  
    if (newNickname !== originalNickname) updatedData.nickname = newNickname;
    if (newIntroduction !== originalIntroduction) updatedData.introduction = newIntroduction;
    if (selectedImgFile) updatedData.file = selectedImgFile;
  
    // 변경된 값이 하나도 없으면 API 호출하지 않음
    if (Object.keys(updatedData).length === 0) navigate(`/user-page/${userId}`);
  
    try {
      await userApi.updateUserProfile(userId, updatedData);
      navigate(`/user-page/${userId}`);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };
  
  if (isLoading) return <ProfileUpdateSkeleton />;

  return (
    <div>
      <div className="flex justify-center mt-[122px] max-md:mt-14 font-pretendard">
        <div className="md:max-w-[500px] max-w-[366px] h-[500px] flex flex-col justify-between">
          <div className="flex justify-center">
            <img
              src={newProfileImg || originalProfileImg}
              alt="프로필 이미지"
              className="w-[200px] h-[200px] rounded-full max-md:w-36 max-md:h-36"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              onClick={onClickImgEdit}
              className="flex w-[148px] h-10 bg-blue03 text-white text-[14px] items-center rounded-[10px] justify-center"
            >
              <span>프로필 사진 변경</span>
              <img src={edit} alt="프로필 사진 수정 아이콘" className="w-5 h-5 ml-1" />
            </button>
          </div>
          <ProfileUpdateInputBox label="닉네임 변경" value={newNickname || originalNickname} setNewValue={setNewNickname} />
          <ProfileUpdateInputBox label="소개글 변경" value={newIntroduction || originalIntroduction} setNewValue={setNewIntroduction} />
          <div className="flex justify-end h-[60px]">
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
