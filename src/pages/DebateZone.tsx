import { useState } from "react";
import Header from "../components/common/Header";
import GeneratingRoom from "../components/debate-zone/generating-room/GeneratingRoom";
import OngoingDebate from "../components/debate-zone/OngoingDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WaitingRoom from "../components/debate-zone/WaitingRoom";
import { useRoomStore } from "../stores/roomStateStore";

export default function DebateZone() {
  const { roomState } = useRoomStore();
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  return (
    <div className="bg-[#070707] h-screen">
      <Header status={headerStatus} />
      {roomState === "generating" && <GeneratingRoom />}
      {roomState === "waiting" && <WaitingRoom />}
      {roomState === "ongoing" && <OngoingDebate />}
      {roomState === "voting" && <VoteRoom />}
      {roomState === "result" && <VoteResult />}
    </div>
  );
}
