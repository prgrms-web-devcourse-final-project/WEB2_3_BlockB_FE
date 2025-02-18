import { useEffect, useState } from "react";

import timer from "../../../assets/icons/timer.svg";
import turn from "../../../assets/icons/turn.svg";

export default function Counter({
  label,
  boxNumber,
  count,
}: {
  label: string;
  boxNumber: number;
  count: number;
}) {
  const [displayCount, setDisplayCount] = useState<string[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
    const paddedCount = count.toString().padStart(boxNumber, "0");
    setDisplayCount(paddedCount.split(""));

    // 애니메이션이 끝난 후 다시 초기화
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [count, boxNumber]);

  return (
    <div className="font-bold font-jersey">
      <div className="flex items-center gap-[2px] justify-end mb-[3px]">
        <figure>
          <img src={label === "TURN" ? turn : timer} alt="" />
        </figure>
        <p>{label}</p>
      </div>
      <div className="flex gap-[7px]">
        {displayCount.map((digit, index) => (
          <span
            key={index}
            className={`w-6 h-7 px-1.5 py-1 bg-gradient-to-b from-zinc-800 to-neutral-400 
                      rounded-sm shadow-[0px_1px_5px_0px_rgba(251,251,251,1.00)] 
                      border border-neutral-50 
                      transition-transform duration-300 ease-in-out
                      ${animate ? "animate-slide-down" : ""}`}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
