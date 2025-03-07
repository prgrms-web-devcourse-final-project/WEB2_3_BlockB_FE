import mouse from "../assets/icons/mouse.svg";
import moveDown from "../assets/icons/move-down.svg";
import debateScreenshot from "../assets/images/debate screenshot.svg";
import newsTop10Screenshot from "../assets/images/news top10 screenshot.svg";
import debateTop10Screenshot from "../assets/images/debate top 10 screenshot.svg";
import observingZoneScreenshot from "../assets/images/observingzone screenshot.svg";
import { useNavigate } from "react-router-dom";
import LandingWaveAnimation from "../components/langding/LandingWaveAnimation";
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-auto py-20 text-white bg-black01">
      <div className="flex sm:pl-16 max-sm:flex-col">
        <div className="flex max-md:justify-center">
          <div className="font-sofiaSans h-[673] flex flex-col justify-center">
            <p className="font-bold text-[60px] w-[460px] max-xl:text-[50px] max-lg:text-[40px] max-xl:w-[380px] max-lg:w-80  max-md:text-[30px] max-md:w-64 ">
              Sharing Thoughts Not Just Words
            </p>
            <p className="text-[40px] text-gray02 max-xl:text-[30px] max-md:text-[20px]">
              Think Deep, Speak Clear
            </p>
          </div>
        </div>
        <LandingWaveAnimation />
      </div>
      <div className="flex flex-col items-center  text-[20px] ">
        <div className="relative flex w-11 h-9">
          <img src={mouse} alt="마우스 아이콘" className="absoulte w-9 h-9" />
          <img
            src={moveDown}
            alt="화살표 아래 아이콘"
            className="absolute w-6 h-6 mt-2 ml-6 animate-bounce"
          />
        </div>
        <p>scroll and browser</p>
        <p>our services</p>
      </div>

      <div className="flex flex-col items-center my-20">
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Debate
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            원하는 주제와 타입의 토론방을 개설하고 사람들과 의견을 나눌 수
            있습니다
          </p>
        </div>
        <img
          src={debateScreenshot}
          alt="토론 스크린샷"
          className="max-lg:w-[768px] max-md:w-[640px] max-sm:w-80"
        />
      </div>

      <div className="flex flex-col items-center my-20 ">
        <div className="w-[914px] mb-20 flex items-end flex-col max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Observe
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            토론을 관전하며 참관자들과 실시간으로 의견을 나눌 수 있습니다
          </p>
        </div>
        <img
          src={observingZoneScreenshot}
          alt="참관 스크린샷"
          className="max-lg:w-[768px] max-md:w-[640px] max-sm:w-80"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Connect
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            실시간 뉴스를 열람하고 뉴스페이지에서 손쉽게 토론방을 개설할 수
            있습니다
          </p>
        </div>
        <div className="flex w-[914px] justify-between max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <img
            src={newsTop10Screenshot}
            alt="인기 뉴스 리스트 스크린샷"
            className="max-lg:w-[352px] max-md:w-[304px] max-sm:w-[150px]"
          />
          <img
            src={debateTop10Screenshot}
            alt="인기 토론방 리스트 스크린샷"
            className="max-lg:w-[352px] max-md:w-[304px] max-sm:w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
