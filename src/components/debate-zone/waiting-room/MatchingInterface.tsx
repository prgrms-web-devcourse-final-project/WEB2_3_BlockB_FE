import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import profile from "../../../assets/icons/profile-white.svg";

export default function MatchingInterface({
  isWaiting,
}: {
  isWaiting: boolean;
}) {
  const waveRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (waveRefs.current.length === 0) return;

    // 기존 애니메이션이 있으면 제거
    gsap.killTweensOf(waveRefs.current);

    if (isWaiting) {
      const duration = 2;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

      waveRefs.current.forEach((wave, index) => {
        tl.to(
          wave,
          {
            scale: 2 + index,
            opacity: 0,
            duration: duration - index * 0.5,
            ease: "power2.out",
          },
          0
        );
      });
    } else {
      // 애니메이션 정지 후 초기 상태로 되돌리기
      waveRefs.current.forEach((wave) => {
        gsap.set(wave, { scale: 1, opacity: 1 });
      });
    }
  }, [isWaiting]); // isWaiting 값이 변경될 때마다 실행

  const waveStyles = [
    "border-neutral-50/70",
    "border-neutral-50/50",
    "border-neutral-50/30",
  ];

  return (
    <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 text-white">
      <div className="relative flex flex-wrap w-[153px] justify-center gap-[10px]">
        {/* 프로필 이미지 */}
        {[...Array(3)].map((_, i) => (
          <figure key={i} className="relative rounded-full">
            <img
              src={profile}
              alt="프로필이미지"
              className="w-[70px] h-[70px]"
            />
          </figure>
        ))}
        {/* 파동 애니메이션 요소 */}
        {isWaiting &&
          waveStyles.map((style, i) => (
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
