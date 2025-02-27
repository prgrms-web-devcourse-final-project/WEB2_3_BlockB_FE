import { useState } from "react";
import logo from "../assets/icons/logo.svg";
import Footer from "../components/common/Footer";
import loading from "../assets/icons/loading.svg";

export default function Signup() {
  const [isNicknameUniqueable, setIsNicknameUniqueable] =
    useState<boolean>(true);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [userDescription, setUserDescription] = useState<string>("");
  const [isUserDesInputVisible, setIsUserDesInputVisible] =
    useState<boolean>(true);

  const announcedMessages = [
    "중복된 닉네임인지 확인중입니다...",
    "고유한 닉네임입니다",
    "고유하지 않은 닉네임입니다. 다른 닉네임으로 변경해주세요",
  ];
  const [message, setMessage] = useState<string>(announcedMessages[0]);
  const originalID = "imaria0218"; // 임시 닉네임
  const [inputNickname, setInputNickname] = useState(originalID);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      {/* 중앙 회원가입 박스 */}
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="bg-gray-100 p-6 md:p-10 rounded-xl shadow-lg text-center w-full max-w-[400px]">
          {/* 로고 */}
          <h1 className="text-4xl md:text-6xl lg:text-[76px] font-bold font-unifrakturCook">
            EarthTalk
          </h1>
          <div className="my-4">
            <img
              src={logo}
              alt="Globe Logo"
              className="mx-auto w-28 h-28 md:w-36 md:h-36"
            />
          </div>

          {/* 닉네임 입력 */}
          <label className="flex justify-between items-center w-full  h-[50px] px-[20px] py-[12px] bg-gray-200 rounded-lg text-[14px]">
            <input
              type="text"
              className="w-full bg-transparent text-black font-semibold  placeholder-gray-500 outline-none"
              placeholder="닉네임을 입력해주세요"
              value={inputNickname}
              onChange={(e) => setInputNickname(e.target.value)}
            />
            {isNicknameUniqueable ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#0060F0" />
                <path
                  d="M15 7L8.57143 13L5 10.6"
                  stroke="#FBFBFB"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="12"
                  strokeDashoffset="-12"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="-12"
                    to="0"
                    dur="0.4s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.25 1 0.5 1"
                  />
                </path>
              </svg>
            ) : (
              <img
                src={loading}
                alt="중복된 닉네임 확인중"
                className="w-[20px] h-[20px] animate-spin"
              />
            )}
          </label>

          {/* 한 줄 소개 입력 */}
          {isUserDesInputVisible && (
            <>
              <label className="flex justify-between items-center w-full h-[50px] px-[20px] py-[12px] bg-gray-200 rounded-lg mt-4 text-[14px]">
                <input
                  type="text"
                  className="w-full bg-transparent text-black font-semibold placeholder-gray-500 outline-none"
                  placeholder="한 줄 소개를 입력해주세요"
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                />
                {userDescription.length > 0 && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="10" fill="#0060F0" />
                    <path
                      d="M15 7L8.57143 13L5 10.6"
                      stroke="#FBFBFB"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="12"
                      strokeDashoffset="-12"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="-12"
                        to="0"
                        dur="0.4s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 1 0.5 1"
                      />
                    </path>
                  </svg>
                )}
              </label>
              <div className="flex justify-between w-full mt-4 font-pretendard">
                <button className="border-b border-gray-500 text-gray-500">
                  다음에 추가하겠습니다
                </button>
                <button
                  className={`${
                    isNicknameUniqueable && userDescription.length > 0
                      ? "text-black01 bg-gray02 w-[54px] h-[35px] text-center px-auto py-auto rounded-[5px] shadow animate-slide-up-fast"
                      : "invisible"
                  }`}
                >
                  완료
                </button>
              </div>
            </>
          )}

          {/* 안내 메시지 */}
          {isMessageVisible && (
            <h1 className="text-black mt-4 animate-slide-up-fast font-pretendard">
              {message}
            </h1>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <Footer status="default" />
    </div>
  );
}
