import GeneratingRoom from "../components/debate-zone/generating-room/GeneratingRoom";
import Header from "../components/common/Header";
import OngoingDebate from "../components/debate-zone/OngoingDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WaitingRoom from "../components/debate-zone/WaitingRoom";
import { useState } from "react";

// import { useWebSocket } from "../hooks/useWebSocket";

export default function DebateZone() {
  //   const { debateId } = useParams(); // URL에서 debateId를 받아옵니다.
  //   const { data, connect } = useWebSocket(debateId); // 웹소켓 연결
  const [roomState, setRoomState] = useState("generating");
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  //   useEffect(() => {
  //     connect();
  //   }, [debateId]);

  //   useEffect(() => {
  //     if (data) {
  //       // 웹소켓에서 받은 데이터로 상태 업데이트
  //       setRoomState(data.roomState);
  //     }
  //   }, [data]);

  return (
    <div className="h-screen bg-[#070707]">
      <Header status={headerStatus} />
      {roomState === "generating" && <GeneratingRoom />}
      {roomState === "waiting" && <WaitingRoom />}
      {roomState === "ongoing" && <OngoingDebate />}
      {roomState === "voting" && <VoteRoom />}
      {roomState === "result" && <VoteResult />}
    </div>
  );
}
