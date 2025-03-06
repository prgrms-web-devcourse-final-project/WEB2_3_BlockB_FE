import google from "../assets/icons/google.svg";
import kakao from "../assets/icons/kakao.svg";
import logo from "../assets/icons/logo.svg";
import Footer from "../components/common/Footer";

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const VITE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function Login() {
  const handleLogin = (provider: "google" | "kakao" | "naver") => {
    let loginUrl = "";

    switch (provider) {
      case "google":
        loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI}/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
        break;
      case "kakao":
        loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI}/kakao&response_type=code&scope=profile_nickname,profile_image`;
        break;
    }

    window.location.href = loginUrl;
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      {/* 중앙 로그인 박스 */}
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

          {/* 로그인 버튼들 */}
          <div className="space-y-3 font-pretendard">
            <button
              onClick={() => handleLogin("google")}
              className="relative flex items-center w-full py-2 md:py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <img
                src={google}
                alt="Google Logo"
                className="absolute w-5 h-5 md:w-6 md:h-6 left-4"
              />
              <span className="w-full text-center text-sm md:text-base">
                구글 로그인 하기
              </span>
            </button>

            <button
              onClick={() => handleLogin("kakao")}
              className="relative flex items-center w-full py-2 md:py-3 font-medium text-black bg-yellow-400 rounded-md"
            >
              <img
                src={kakao}
                alt="Kakao Logo"
                className="absolute w-5 h-5 md:w-6 md:h-6 left-4"
              />
              <span className="w-full text-center text-sm md:text-base">
                카카오 로그인 하기
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <Footer status="default" />
    </div>
  );
}
