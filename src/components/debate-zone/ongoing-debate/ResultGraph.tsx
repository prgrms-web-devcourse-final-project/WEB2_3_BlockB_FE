import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ResultGraph({
  isWatingResult,
  prosPercentage = 0,
  consPercentage = 0,
  noVotePercentage = 0,
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
      if (!isWatingResult) {
        gsap.fromTo(
          prosRef.current,
          { width: "0%" },
          { width: `${prosPercentage}%`, duration: 1.5, ease: "power3.out" }
        );

        gsap.fromTo(
          consRef.current,
          { width: "0%" },
          { width: `${consPercentage}%`, duration: 1.5, ease: "power3.out", delay: 0.2 }
        );

        gsap.fromTo(
          noVoteRef.current,
          { width: "0%" },
          { width: `${noVotePercentage}%`, duration: 1.5, ease: "power3.out", delay: 0.4 }
        );
      }
    });

    return () => ctx.revert();
  }, [isWatingResult, prosPercentage, consPercentage, noVotePercentage]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-[20px] font-pretendard px-[20px]">
      {/* 찬성 막대 */}
      <div className="mb-2">
        <p className="text-white mb-1">찬성 ({prosPercentage}%)</p>
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
          <div
            ref={prosRef}
            className="bg-blue-500 h-6 rounded-full text-white text-sm font-bold flex items-center justify-end pr-2"
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
          >
            {noVotePercentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
