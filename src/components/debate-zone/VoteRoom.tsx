import ParticipantBox from "./ParticipantBox";
import { useObservingStore } from "./../../stores/observingStateStore";
import { useRoomStore } from "../../stores/roomStateStore";

export default function VoteRoom({
  isObserver = false,
}: {
  isObserver?: boolean;
}) {
  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore();

  const moveState = (stage: "replay" | "result") => {
    if (isObserver) setObservingState(stage);
    else setRoomState(stage);
  };
  const btnClass =
    "md:w-[46px] w-[42px] md:h-[30px] h-[20px] md:px-[10px] px-2 md:py-[4px] bg-white text-black01 font-bold font-pretendard rounded-[5px] hover:bg-gray-300 hover:bg-game_blue01 hover:text-white transition-colors duration-300";
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] min-h-screen">
      <div>
        <h1 className="text-white font-pretendard font-bold md:text-[24px] text-[18px]">
          토론이 끝났습니다. 승리했다고 생각하시는 입장에 투표해주세요
        </h1>
        <h2>AI는 인간의 노동을 대체하나 보조하나?</h2>
      </div>
      <div>
        <section className="flex items-center md;gap-[26px] gap-1 md:text-[16px] text-[14px]">
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="PROS" labelAlignment="center" />
            <button onClick={() => moveState("result")} className={btnClass}>
              투표
            </button>
          </div>
          <p className="text-white font-bold md:text-[24px] text-[18px] font-jersey">vs</p>
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="CONS" color="blue" labelAlignment="center" />
            <button onClick={() => moveState("result")} className={btnClass}>
              투표
            </button>
          </div>
        </section>
        <div className="w-full flex justify-between mt-[60px] md:text-[16px] text-[14px]">
          <button
            onClick={() => moveState("replay")}
            className="font-pretendard text-white border-b"
          >
            토론 다시보기
          </button>
          <button
            onClick={() => moveState("result")}
            className="font-pretendard text-white border-b "
          >
            기권하기
          </button>
        </div>
      </div>
    </div>
  );
}
