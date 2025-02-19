import { useState } from "react";
import { useNavigate } from "react-router";
import { useRoomStore } from "../../stores/roomStateStore";
import ResultGraph from "./ongoing-debate/ResultGraph";

export default function VoteResult() {
  const { setRoomState } = useRoomStore();
  const navigate = useNavigate();
  const [isWatingResult, setIsWaitingResult] = useState(false);
  return (
    <div className="flex items-center justify-center">
      <section className="flex flex-col justify-between w-[643px] mt-[60px]">
        <h1 className="text-white font-pretendard font-bold text-[24px] text-center mb-[60px]">
          AI는 인간의 노동을 대체하나 보조하나?
        </h1>
        <div>
          <h2 className="font-jersey text-white text-[24px] text-center">
            VOTE RESULT
          </h2>
          <ResultGraph
            isWatingResult={isWatingResult}
            prosPercentage={48}
            consPercentage={36}
            noVotePercentage={16}
          />
        </div>
        <div className="w-full flex justify-between mt-[60px]">
          <button
            onClick={() => {
              setRoomState("replay");
            }}
            className="font-pretendard text-white border-b  "
          >
            토론 다시보기
          </button>
          <button
            onClick={() => {
              navigate("/main");
            }}
            className="font-pretendard text-white border-b "
          >
            다른 토론방 구경하기
            {/* 현재 라우팅이 안 되어 있어 일단 main으로 라우팅했습니다 */}
          </button>
        </div>
      </section>
    </div>
  );
}
