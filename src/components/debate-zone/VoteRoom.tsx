import { useDebateWebSocket } from "../../contexts/DebateWebSocketContext";
import { useVote } from "../../hooks/useVote";
import LoadingBar from "../common/LoadingBar";
import ParticipantBox from "./ParticipantBox";
import clock from "../../assets/icons/clock.svg"

export default function VoteRoom() {
  const { moveState, onVoteWithStageChanged } = useVote(false);
  const btnClass =
    "white-space md:w-[46px] w-[42px] md:h-[30px] h-[20px] px-2 md:py-[4px] bg-white text-black01 font-bold font-pretendard rounded-[5px] hover:bg-gray-300 hover:bg-game_blue01 hover:text-white transition-colors duration-300";

  const {roomInfoDetails, isWaitngVote, voteTimer } = useDebateWebSocket()  

  if (isWaitngVote) return <LoadingBar isLoading={isWaitngVote} color="white" speed={30}/>

  return (
    <div className="flex flex-col justify-center items-center gap-[30px] min-h-screen">
      <div>
        <h1 className="text-white font-pretendard font-bold md:text-[24px] text-[18px] text-center break-keep leading-[1.4] max-w-[300px] md:max-w-full">
          토론이 끝났습니다. 승리했다고 생각하시는 입장에 투표해주세요
        </h1>
        <h2>{roomInfoDetails.title}</h2>
        <div className="flex justify-center items-center gap-[10px] mt-2 md:mt-0 ">
            <img src={clock} className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" />
            <p className="font-sofiaSans font-bold text-white text-[18px] md:text-[20px]">{voteTimer}</p>
        </div>
      </div>
      <div className="md:max-w-[700px] max-w-[310px] flex flex-col justify-center">
        <section className="flex items-center md:gap-[26px] sm:gap-[10px] gap-[5px] md:text-[16px] text-[14px]">
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="PROS" labelAlignment="center" participants={roomInfoDetails.proUsers}/>
            <button onClick={() => onVoteWithStageChanged("PRO", "result")} className={btnClass}>
              투표
            </button>
          </div>
          <p className="text-white font-bold md:text-[30px] text-[18px] font-jersey">vs</p>
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="CONS" labelAlignment="center" participants={roomInfoDetails.conUsers}/>
            <button onClick={() => onVoteWithStageChanged("CON", "result")} className={btnClass}>
              투표
            </button>
          </div>
        </section>
        <div className="w-full flex justify-between mt-[60px] md:text-[16px] text-[14px]">
          <button onClick={() => moveState("replay")} className="font-pretendard text-white border-b">
            토론 다시보기
          </button>
          <button onClick={() => onVoteWithStageChanged("NO_POSITION", "result")} className="font-pretendard text-white border-b">
            기권하기
          </button>
        </div>
      </div>
    </div>
  );
}
