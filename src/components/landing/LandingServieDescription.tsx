import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import debateScreenshot from "../../assets/images/debate screenshot.svg";
import newsTop10Screenshot from "../../assets/images/news top10 screenshot.svg";
import debateTop10Screenshot from "../../assets/images/debate top 10 screenshot.svg";
import observingZoneScreenshot from "../../assets/images/observingzone screenshot.svg";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingServieDescription() {
    useEffect(() => {
        const sections = document.querySelectorAll('.service-section');
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scale: 1.05, 
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true,
              },
            }
          );
        });
    
        // 이미지 애니메이션
        const images = document.querySelectorAll('img');
        images.forEach((image) => {
          gsap.fromTo(
            image,
            { opacity: 0, y: 50, scale: 1.1 }, 
            {
              opacity: 1,
              y: 0,
              scale: 1, 
              duration: 1.5,
              scrollTrigger: {
                trigger: image,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true,
              },
            }
          );
        });
      }, []);
    
  return (
    <>
    <div className="flex flex-col items-center my-20">
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80 service-section">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Debate
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            원하는 주제와 타입의 토론방을 개설하고 사람들과 의견을 나눌 수 있습니다
          </p>
        </div>
        <img
          src={debateScreenshot}
          alt="토론 스크린샷"
          className="max-lg:w-[768px] max-md:w-[640px] max-sm:w-80"
        />
      </div>

      <div className="flex flex-col items-center my-20">
        <div className="w-[914px] mb-20 flex items-end flex-col max-lg:w-[768px] max-md:w-[640px] max-sm:w-80 service-section">
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
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80 service-section">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Connect
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            실시간 뉴스를 열람하고 뉴스페이지에서 손쉽게 토론방을 개설할 수 있습니다
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
    </>
  )
}
