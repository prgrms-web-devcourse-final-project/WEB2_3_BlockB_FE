import { useEffect, useState } from "react";
import timer from "../../../assets/icons/timer.svg";
import turn from "../../../assets/icons/turn.svg";

export default function Counter({
  label,
  boxNumber,
  value,
}: {
  label: string;
  boxNumber: number;
  value: number;
}) {
  const [displayCount, setDisplayCount] = useState<string[]>([]);

  useEffect(() => {
    const paddedCount = (value ?? 0).toString().padStart(boxNumber, "0");
    setDisplayCount(paddedCount.split(""));
  }, [value]);
  
  
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
