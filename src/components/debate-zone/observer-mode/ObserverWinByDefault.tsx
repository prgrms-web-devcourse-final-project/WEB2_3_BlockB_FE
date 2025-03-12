import { useNavigate } from "react-router";
import ParticipantBox from "../ParticipantBox";
import { useObserverWebSocket } from "../../../contexts/ObserverWebSocketContext";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";

export default function ObserverWinByDefault() {
  const navigate = useNavigate();
  const {observerRoomInfoDetails} = useObserverWebSocket();
  const {winnerByDefault} = useDebateWebSocket()


  return (
    <div className="flex flex-col justify-center items-center gap-[30px] md:mt-[60px] min-h-screen">
      <h1 className="text-white font-pretendard font-bold  md:text-[24px] text-[16px]">
        한 측의 모든 디베이터가 나갔으므로 승패가 결정됩니다
      </h1>
      <section className="flex items-center md:gap-[26px] gap-[18px]">
        <div className="flex flex-col">
          <h2
            className="text-white text-center md:text-3xl text-[18px] font-bold mb-[18px]"
            style={{ textShadow: "0px 1px 10px rgba(251, 251, 251, 1.00)" }}
          >
            {winnerByDefault === "PRO" ? "부전승" : "부전패"}
          </h2>
          <ParticipantBox label="PROS" labelAlignment="center" participants={observerRoomInfoDetails.proUsers}/>
        </div>
        <p className="md:block hidden text-white font-bold md:text-[24px] text-[20px] font-jersey pt-[10px]">vs</p>
        <div>
          <h2
            className="text-white text-center md:text-3xl text-[18px] font-bold mb-[18px]"
            style={{ textShadow: "0px 1px 10px rgba(251, 251, 251, 1.00)" }}
          >
            {winnerByDefault === "CON" ? "부전승" : "부전패"}
          </h2>
          <ParticipantBox label="CONS" color="blue" labelAlignment="center" participants={observerRoomInfoDetails.conUsers}/>
        </div>
      </section>
      <button
        onClick={() => navigate("/main")}
        className="font-pretendard text-white border-b mt-[18px] md:mb-[60px] md:text-[16px] text-[14px]"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
