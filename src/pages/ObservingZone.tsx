import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import ObserverOngoingRoom from "./../components/debate-zone/observer-mode/ObserverOngoingRoom";
import ObserverWaitingRoom from "../components/debate-zone/observer-mode/ObserverWaitingRoom";
import ReplayDebate from "../components/debate-zone/ReplayDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import { useObservingStore } from "../stores/observingStateStore";
import ReportModal from "../components/debate-zone/ongoing-debate/ReportModal";
import { ObserverWebSocketContextProvider } from "../contexts/ObserverWebSocketContext";
import { useCheckRoomId } from "../hooks/useCheckRoomId";
import { DebateWebSocketProvider } from "../contexts/DebateWebSocketContext";
import { userApi } from "../api/user";
import ObserverVoteRoom from "../components/debate-zone/observer-mode/ObserverVoteRoom";
import ObserverWinByDefault from "../components/debate-zone/observer-mode/ObserverWinByDefault";
import ExitOverFlowNull from "../components/debate-zone/ExitOverFlowNull";

export default function ObservingZone() {
  const { observingState } = useObservingStore();
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  useEffect(() => {
    if (
      observingState === "ongoing" ||
      observingState === "voting" ||
      observingState === "replay"
    ) {
      setHeaderStatus("debate-ing");
    } else {
      setHeaderStatus("debate-waiting");
    }
  }, [observingState]);

  const [userName, setUserName] = useState(""); 

  const fetchUserNickname = async() => {
    const userInfoResponse = await userApi.fetchMyProfile();
    setUserName(userInfoResponse.data.nickname)
  }

  useEffect(()=>{
    fetchUserNickname()
  },[])

  useCheckRoomId()

  return (
    <ObserverWebSocketContextProvider userName={userName}>
      <DebateWebSocketProvider userName={userName} initialPosition="observer">
        <div className="bg-[#070707] min-h-screen overflow-hidden">
          <Header status={headerStatus} />
          <ReportModal  />
          {observingState === "waiting" && <ObserverWaitingRoom />}
          {observingState === "ongoing" && <ObserverOngoingRoom />}
          {observingState === "won-by-default" && <ObserverWinByDefault />}
          {observingState === "voting" && <ObserverVoteRoom/>}
          {observingState === "replay" && <ReplayDebate isObserver={true} />}
          {observingState === "result" && <VoteResult isObserver={true} />}
          {observingState === "exit_overflow_null" && <ExitOverFlowNull />}
        </div>
      </DebateWebSocketProvider>
    </ObserverWebSocketContextProvider>
  );
}
