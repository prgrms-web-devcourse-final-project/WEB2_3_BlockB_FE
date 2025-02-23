import ResultGraph from "./ongoing-debate/ResultGraph";
import { useNavigate } from "react-router";
import { useObservingStore } from "../../stores/observingStateStore";
import { useRoomStore } from "../../stores/roomStateStore";
import { useState } from "react";

export default function VoteResult({
  isObserver = false,
}: {
  isObserver?: boolean;
}) {
  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore();
  const navigate = useNavigate();
  const [isWatingResult, setIsWaitingResult] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen px-[10px]">
      <section className="flex flex-col justify-between w-[643px]">
        <h1 className="text-white font-pretendard font-bold md:text-[24px] text-[18px] text-center md:mb-[60px] mb-3">
          AI는 인간의 노동을 대체하나 보조하나?
        </h1>
        <div>
          <h2 className="font-jersey text-white md:text-[24px] text-[16px] text-center">
            VOTE RESULT
          </h2>
          <ResultGraph
            isWatingResult={isWatingResult}
            prosPercentage={48}
            consPercentage={36}
            noVotePercentage={16}
          />
        </div>
        <div className="w-full flex justify-between mt-[60px] md:text-[16px] text-[14px]">
          <button
            onClick={() => {
              if (isObserver) setObservingState("replay");
              setRoomState("replay");
            }}
            className="font-pretendard text-white border-b  "
          >
            토론 다시보기
          </button>
          <button
            onClick={() => {
              navigate("/debate-rooms");
            }}
            className="font-pretendard text-white border-b "
          >
            다른 토론방 구경하기
          </button>
        </div>
      </section>
    </div>
  );
}
