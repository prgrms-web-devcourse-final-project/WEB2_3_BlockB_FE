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
import { DebateWebSocketProvider } from "../contexts/DebateWebSocketContext";

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

  return (
    <DebateWebSocketProvider>
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
    </DebateWebSocketProvider>
  );
}
