import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkNickname, signup } from "../api/signup";
import { useAuthStore } from "../stores/authStore";
import logo from "../assets/icons/logo.svg";
import Footer from "../components/common/Footer";
import loading from "../assets/icons/loading.svg";
import useDebounce from "../hooks/useDebounce";
import { useModalStore } from "../stores/useModal";
import Modal from "../components/common/Modal";

export default function Signup() {
  const [isNicknameUniqueable, setIsNicknameUniqueable] =
    useState<boolean>(false);
  const [userDescription, setUserDescription] = useState<string>("");
  const [inputNickname, setInputNickname] = useState<string>("");
  const [isCheckingNickname, setIsCheckingNickname] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [showSuccessIcon, setShowSuccessIcon] = useState<boolean>(false);
  const navigate = useNavigate();
  const setIsNewUser = useAuthStore((state) => state.setIsNewUser);

  const debouncedNickname = useDebounce(inputNickname, 500);

  useEffect(() => {
    if (debouncedNickname.trim() === "") {
      setIsNicknameUniqueable(false);
      setNicknameError(null);
      setShowSuccessIcon(false);
      return;
    }
    const checkNicknameAvailability = async () => {
      setIsCheckingNickname(true);
      const isAvailable = await checkNickname(debouncedNickname);
      setIsCheckingNickname(false);
      if (isAvailable) {
        setIsNicknameUniqueable(true);
        setNicknameError(null);
        setTimeout(() => setShowSuccessIcon(true), 200);
      } else {
        setIsNicknameUniqueable(false);
        setShowSuccessIcon(false);
        setNicknameError("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
      }
    };

    checkNicknameAvailability();
  }, [debouncedNickname]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await signup(inputNickname, userDescription);

      if (success) {
        setIsNewUser(false);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const {openModal} = useModalStore()

  const onClickComplete = () => {
    openModal("회원가입을 완료하시겠습니까?", ()=>{navigate("/main")})
  }

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col justify-between min-h-screen bg-gray-50"
    >
      <Modal />
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="bg-gray-100 p-6 md:p-10 rounded-xl shadow-lg text-center w-full max-w-[400px]">
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
          <label className="flex justify-between items-center w-full h-[50px] px-[20px] py-[12px] bg-gray-200 rounded-lg text-[14px] relative">
            <input
              type="text"
              className="w-full bg-transparent text-black font-semibold placeholder-gray-500 outline-none"
              placeholder="닉네임을 입력해주세요"
              value={inputNickname}
              onChange={(e) => {
                if (e.target.value.length <= 7) {
                  setInputNickname(e.target.value);
                }
              }}
            />
            {isCheckingNickname ? (
              <img
                src={loading}
                alt="중복된 닉네임 확인중"
                className="w-[20px] h-[20px] animate-spin"
              />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-opacity duration-500 ${
                  showSuccessIcon
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
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

          {/* 닉네임 중복 에러 메시지 */}
          {nicknameError && (
            <p className="text-red-500 text-xs mt-1">{nicknameError}</p>
          )}

          {/* 한 줄 소개 입력 */}
          <label className="flex justify-between items-center w-full h-[50px] px-[20px] py-[12px] bg-gray-200 rounded-lg mt-4 text-[14px]">
            <input
              type="text"
              className="w-full bg-transparent text-black font-semibold placeholder-gray-500 outline-none"
              placeholder="한 줄 소개를 입력해주세요"
              value={userDescription}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setUserDescription(e.target.value);
                }
              }}
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

          <div className="flex justify-end w-full mt-4 font-pretendard">
            <button
              onClick={onClickComplete}
              type="submit"
              className={`${
                isNicknameUniqueable && userDescription.length > 0
                  ? "text-black01 bg-gray02 w-[54px] h-[35px] text-center px-auto py-auto rounded-[5px] shadow animate-slide-up-fast"
                  : "invisible"
              }`}
            >
              완료
            </button>
          </div>
        </div>
      </div>
      <Footer status="default" />
    </form>
  );
}
