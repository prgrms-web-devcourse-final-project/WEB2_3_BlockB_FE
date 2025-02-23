import { useEffect, useRef } from "react";

import gsap from "gsap";

export default function ResultGraph({
  isWatingResult,
  prosPercentage,
  consPercentage,
  noVotePercentage,
}: {
  isWatingResult: boolean;
  prosPercentage?: number;
  consPercentage?: number;
  noVotePercentage?: number;
}) {
  const prosRef = useRef<HTMLDivElement>(null);
  const consRef = useRef<HTMLDivElement>(null);
  const noVoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isWatingResult) {
        gsap.to([prosRef.current, consRef.current, noVoteRef.current], {
          x: "5%",
          duration: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else {
        gsap.to([prosRef.current, consRef.current, noVoteRef.current], {
          x: "0%",
          duration: 0.3,
        });
      }
    });

    return () => ctx.revert(); // cleanup 함수
  }, [isWatingResult]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-[20px] font-pretendard px-[20px]">
      {/* 찬성 막대 */}
      <div className="mb-2">
        <p className="text-white mb-1">찬성 ({prosPercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            ref={prosRef}
            className="bg-blue-500 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2"
            style={{ width: `${prosPercentage}%` }}
          >
            {prosPercentage}%
          </div>
        </div>
      </div>
      {/* 반대 막대 */}
      <div>
        <p className="text-white mb-1">반대 ({consPercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            ref={consRef}
            className="bg-red-500 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2"
            style={{ width: `${consPercentage}%` }}
          >
            {consPercentage}%
          </div>
        </div>
      </div>
      {/* 기권 막대 */}
      <div>
        <p className="text-white mb-1">기권 ({noVotePercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            ref={noVoteRef}
            className="bg-blue-300 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2"
            style={{ width: `${noVotePercentage}%` }}
          >
            {noVotePercentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
