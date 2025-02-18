import google from "../assets/icons/google.svg";
import kakao from "../assets/icons/kakao.svg";
import logo from "../assets/icons/logo.svg";
import naver from "../assets/icons/naver.svg";
import Footer from "../components/common/Footer";
export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-between bg-gray-50">
      {/* 중앙 로그인 박스 */}
      <div className="flex flex-1 items-center justify-center">
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
            <button className="flex items-center w-full py-3 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium relative">
              <img
                src={google}
                alt="Google Logo"
                className="w-6 h-6 absolute left-4"
              />
              <span className="w-full text-center">구글 로그인 하기</span>
            </button>

            <button className="flex items-center w-full py-3 bg-yellow-400 rounded-md text-black font-medium relative">
              <img
                src={kakao}
                alt="Kakao Logo"
                className="w-6 h-6 absolute left-4"
              />
              <span className="w-full text-center">카카오 로그인 하기</span>
            </button>

            <button className="flex items-center w-full py-3 bg-green-500 text-white rounded-md font-medium relative">
              <img
                src={naver}
                alt="Naver Logo"
                className="w-6 h-6 absolute left-4"
              />
              <span className="w-full text-center">네이버 로그인 하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
