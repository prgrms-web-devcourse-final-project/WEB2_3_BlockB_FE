import ParticipantBox from "./../ParticipantBox";
import { useWaveAnimation } from "../../../hooks/useWaveAnimation";

export default function ObserverMatchingInterface({
  isWaiting,
}: {
  isWaiting: boolean;
}) {
  const waveRefs = useWaveAnimation(isWaiting);

  const waveStyles = [
    "border-neutral-50/70",
    "border-neutral-50/50",
    "border-neutral-50/30",
  ];
  return (
    <div className="absolute  left-1/2 transform -translate-x-1/2 text-white flex flex-col justify-center items-center min-h-screen">
      <div className="relative flex flex-wrap w-[153px] justify-center gap-[10px]">
        <div className="relative flex gap-[26px] items-center">
          <ParticipantBox label="PROS" />
          <p className="font-jersey text-[24px]">vs</p>
          <ParticipantBox label="CONS" />
        </div>
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
      <p className="w-full font-pretendard text-center font-bold text-[20px] mt-[50px]">
        매칭이 끝나면 <br /> 토론이 시작합니다
      </p>
    </div>
  );
}
