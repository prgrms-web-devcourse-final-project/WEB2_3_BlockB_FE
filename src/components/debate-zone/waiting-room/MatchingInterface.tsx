import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import profile from "../../../assets/icons/profile-white.svg";

export default function MatchingInterface() {
  const waveRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (waveRefs.current.length > 0) {
      const duration = 2;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 }); //반복 및 쉬는 시간 설정

      waveRefs.current.forEach((wave, index) => {
        tl.to(
          wave,
          {
            scale: 2 + index, // 바깥쪽으로 갈수록 크기 증가
            opacity: 0,
            duration: duration - index * 0.5, // 바깥쪽으로 갈수록 빠르게 퍼짐
            ease: "power2.out",
          },
          0 // 모든 파동이 동시에 시작
        );
      });
    }
  }, []);

  const waveStyles = [
    "border-neutral-50/70",
    "border-neutral-50/50",
    "border-neutral-50/30",
  ];

  return (
    <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 text-white ">
      <div className="relative flex flex-wrap w-[153px] justify-center gap-[10px]">
        {/* 프로필 이미지 */}
        <figure className="relative rounded-full">
          <img src={profile} alt="프로필이미지" className="w-[70px] h-[70px]" />
        </figure>
        <figure className="relative rounded-full">
          <img src={profile} alt="프로필이미지" className="w-[70px] h-[70px]" />
        </figure>
        <figure className="relative rounded-full">
          <img src={profile} alt="프로필이미지" className="w-[70px] h-[70px]" />
        </figure>
        {/* 파동 애니메이션 요소 */}
        {waveStyles.map((style, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el && !waveRefs.current.includes(el)) {
                waveRefs.current[i] = el;
              }
            }}
            className={`absolute left-1/2 top-1/2 w-[300px] h-[300px] border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0px_3px_40px_0px_rgba(251,251,251,1.00)] -z-50 ${style}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
