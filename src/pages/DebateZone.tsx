import GeneratingRoom from "../components/debate-zone/generating-room/GeneratingRoom";
import Header from "../components/common/Header";
import OngoingDebate from "../components/debate-zone/OngoingDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WaitingRoom from "../components/debate-zone/waiting-room/WaitingRoom";
import { useRoomStore } from "../stores/roomStateStore";
import { useState } from "react";

export default function DebateZone() {
  const { roomState } = useRoomStore();
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  return (
    <div className="bg-[#070707] font-sofiaSans min-h-[900px]">
      <Header status={headerStatus} />
      {roomState === "generating" && <GeneratingRoom />}
      {roomState === "waiting" && <WaitingRoom />}
      {roomState === "ongoing" && <OngoingDebate />}
      {roomState === "voting" && <VoteRoom />}
      {roomState === "result" && <VoteResult />}
    </div>
  );
}
