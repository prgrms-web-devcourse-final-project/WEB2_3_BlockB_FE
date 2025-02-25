import { useEffect, useState } from "react";
import timer from "../../../assets/icons/timer.svg";
import turn from "../../../assets/icons/turn.svg";

export default function Counter({
  label,
  boxNumber,
  initialCount,
  onComplete,
}: {
  label: string;
  boxNumber: number;
  initialCount: number;
  onComplete?: () => void;
}) {
  const [count, setCount] = useState(initialCount);
  const [displayCount, setDisplayCount] = useState<string[]>([]);

  useEffect(() => {
    const paddedCount = count.toString().padStart(boxNumber, "0");
    setDisplayCount(paddedCount.split(""));
  }, [count, boxNumber]);

  useEffect(() => {
    if (label === "TIMER") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            onComplete && onComplete(); // 타이머 종료 시 콜백 실행
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [label, onComplete]);

  return (
    <div className="font-bold font-jersey flex md:flex-col flex-row md:gap-[2px] gap-[10px] items-center">
      <div className="flex items-center gap-[2px] justify-end">
        <figure>
          <img src={label === "TURN" ? turn : timer} alt="" />
        </figure>
        <p className="md:text-[20px] text-[18px]">{label}</p>
      </div>
      <div className="flex md:gap-[7px] gap-[1px]">
        {displayCount.map((digit, index) => (
          <span
            key={index}
            className="md:w-6 md:h-7 w-[13px] h-[17px] bg-gradient-to-b from-zinc-800 to-neutral-400 
              rounded-sm shadow-[0px_1px_5px_0px_rgba(251,251,251,1.00)] 
              border border-neutral-50 animate-slide-down md:text-[16px] text-[12px] text-center"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
