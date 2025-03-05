import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import OngoingDebate from "../components/debate-zone/ongoing-debate/OngoingDebate";
import ReplayDebate from "../components/debate-zone/ReplayDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WaitingRoom from "../components/debate-zone/waiting-room/WaitingRoom";
import WinByDefault from "../components/debate-zone/WinByDefault";
import ReportModal from "../components/debate-zone/ongoing-debate/ReportModal";
import { useRoomStore } from "../stores/roomStateStore";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";

export default function DebateZone() {
  const { roomState } = useRoomStore();
  const [headerStatus, setHeaderStatus] = useState<"debate-waiting" | "debate-ing">("debate-waiting");

  useEffect(() => {
    if (roomState === "ongoing" || roomState === "voting" || roomState === "replay") {
      setHeaderStatus("debate-ing");
    } else {
      setHeaderStatus("debate-waiting");
    }
  }, [roomState]);

  const { roomId } = useParams<{ roomId: string }>();
  const websocketUrl = `ws://13.125.142.253:8080/debate/${roomId}`;

  const { sendMessage } = useWebSocket(websocketUrl, {
    onOpen: () => {
      console.log("웹소켓 연결이 열렸습니다.");
      sendMessage(JSON.stringify({ message: "웹소켓이 연결되었습니다!" }));
    },
    onClose: () => {
      console.log("웹소켓 연결이 닫혔습니다.");
      alert("웹소켓 연결이 끊어졌습니다. 다시 시도해 주세요.");
    },
    onError: (error) => {
      console.error("웹소켓 에러 발생:", error);
      alert("웹소켓 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  });

  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <Header status={headerStatus} />
      <ReportModal />
      {roomState === "waiting" && <WaitingRoom />}
      {roomState === "ongoing" && <OngoingDebate />}
      {roomState === "won-by-default" && <WinByDefault />}
      {roomState === "replay" && <ReplayDebate />}
      {roomState === "voting" && <VoteRoom />}
      {roomState === "result" && <VoteResult />}
    </div>
  );
}
