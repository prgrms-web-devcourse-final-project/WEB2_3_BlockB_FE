import profile from "../../../assets/icons/profile-white.svg";
import { useWaveAnimation } from "../../../hooks/useWaveAnimation";

export default function MatchingInterface({
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
