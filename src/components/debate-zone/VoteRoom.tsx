import { useRoomStore } from "../../stores/roomStateStore";
import ParticipantBox from "./ParticipantBox";

export default function VoteRoom() {
  const { setRoomState } = useRoomStore();
  const btnClass =
    "w-[46px] h-[30px] px-[10px] py-[4px] bg-white text-black01 text-[14px] font-bold font-pretendard rounded-[5px] hover:bg-gray-300 hover:bg-game_blue01 hover:text-white transition-colors duration-300";
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] mt-[100px]">
      <div>
        <h1 className="text-white font-pretendard font-bold text-[24px]">
          토론이 끝났습니다. 승리했다고 생각하시는 입장에 투표해주세요
        </h1>
        <h2>AI는 인간의 노동을 대체하나 보조하나?</h2>
      </div>
      <div>
        <section className="flex items-center gap-[26px]">
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="PROS" labelAlignment="center" />
            <button className={btnClass}>투표</button>
          </div>
          <p className="text-white font-bold text-[24px] font-jersey">vs</p>
          <div className="flex flex-col items-center gap-[26px]">
            <ParticipantBox label="CONS" color="blue" labelAlignment="center" />
            <button className={btnClass}>투표</button>
          </div>
        </section>
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
              setRoomState("result");
            }}
            className="font-pretendard text-white border-b "
          >
            기권하기
          </button>
        </div>
      </div>
    </div>
  );
}
