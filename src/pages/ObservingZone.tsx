import { useState } from "react";
import Header from "../components/common/Header";
import ObserverWaitingRoom from "../components/debate-zone/observer-mode/ObserverWaitingRoom";
import ReplayDebate from "../components/debate-zone/ReplayDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WinByDefault from "../components/debate-zone/WinByDefault";
import { useObservingStore } from "../stores/observingStateStore";
import ObserverOngoingRoom from "./../components/debate-zone/observer-mode/ObserverOngoingRoom";

export default function ObservingZone() {
  const { observingState } = useObservingStore();
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <Header status={headerStatus} />
      {observingState === "waiting" && <ObserverWaitingRoom />}
      {observingState === "ongoing" && <ObserverOngoingRoom />}
      {observingState === "won-by-default" && <WinByDefault />}
      {observingState === "voting" && <VoteRoom isObserver={true} />}
      {observingState === "result" && <VoteResult isObserver={true} />}
      {observingState === "replay" && <ReplayDebate isObserver={true} />}
    </div>
  );
}
