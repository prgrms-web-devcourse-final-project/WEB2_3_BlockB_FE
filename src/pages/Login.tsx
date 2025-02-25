import google from "../assets/icons/google.svg";
import kakao from "../assets/icons/kakao.svg";
import logo from "../assets/icons/logo.svg";
import naver from "../assets/icons/naver.svg";
import Footer from "../components/common/Footer";

export default function Login() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = (provider: string) => {
    window.location.href = `${backendUrl}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-50">
      {/* 중앙 로그인 박스 */}
      <div className="flex items-center justify-center flex-1">
        <div className="bg-gray-100 p-10 rounded-xl shadow-lg text-center w-[400px]">
          {/* 로고 */}
          <h1 className="text-[76px] font-bold font-unifrakturCook justify-center">
            EarthTalk
          </h1>
          <div className="my-4">
            <img src={logo} alt="Globe Logo" className="mx-auto w-36 h-36" />
          </div>

          {/* 로그인 버튼들 */}
          <div className="space-y-3 font-pretendard">
            <button
              onClick={() => handleLogin("google")}
              className="relative flex items-center w-full py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <img
                src={google}
                alt="Google Logo"
                className="absolute w-6 h-6 left-4"
              />
              <span className="w-full text-center">구글 로그인 하기</span>
            </button>

            <button
              onClick={() => handleLogin("kakao")}
              className="relative flex items-center w-full py-3 font-medium text-black bg-yellow-400 rounded-md"
            >
              <img
                src={kakao}
                alt="Kakao Logo"
                className="absolute w-6 h-6 left-4"
              />
              <span className="w-full text-center">카카오 로그인 하기</span>
            </button>

            <button
              onClick={() => handleLogin("naver")}
              className="relative flex items-center w-full py-3 font-medium text-white bg-green-500 rounded-md"
            >
              <img
                src={naver}
                alt="Naver Logo"
                className="absolute w-6 h-6 left-4"
              />
              <span className="w-full text-center">네이버 로그인 하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <Footer status="default" />
    </div>
  );
}
