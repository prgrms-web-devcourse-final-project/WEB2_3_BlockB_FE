import mouse from "../assets/icons/mouse.svg";
import moveDown from "../assets/icons/move-down.svg";
import LandingWaveAnimation from "../components/landing/LandingWaveAnimation";
import LandingLetter from "../components/landing/LandingLetter";
import LandingServieDescription from '../components/landing/LandingServieDescription';

export default function Landing() {
  
  return (
    <div className="h-auto sm:py-20 py-3 text-white bg-black01">
      <div className="flex sm:pl-16 max-sm:flex-col">
        <div className="flex max-md:justify-center">
          <LandingLetter />
        </div>
        <LandingWaveAnimation />
      </div>
      <div className="flex flex-col items-center text-[20px] sm:mt-2 mt-10">
        <div className="relative flex w-11 h-9">
          <img src={mouse} alt="마우스 아이콘" className="absolute w-9 h-9" />
          <img
            src={moveDown}
            alt="화살표 아래 아이콘"
            className="absolute w-6 h-6 mt-2 ml-6 animate-bounce"
          />
        </div>
        <p>scroll and browser</p>
        <p>our services</p>
      </div>
      {/* 서비스 설명 부분 */}
      <div className="mb-[130px]">
        <LandingServieDescription />  
      </div>
    </div>
  );
}

