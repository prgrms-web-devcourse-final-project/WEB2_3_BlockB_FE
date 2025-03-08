import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import ObserverOngoingRoom from "./../components/debate-zone/observer-mode/ObserverOngoingRoom";
import ObserverWaitingRoom from "../components/debate-zone/observer-mode/ObserverWaitingRoom";
import ReplayDebate from "../components/debate-zone/ReplayDebate";
import VoteResult from "../components/debate-zone/VoteResult";
import VoteRoom from "../components/debate-zone/VoteRoom";
import WinByDefault from "../components/debate-zone/WinByDefault";
import { useObservingStore } from "../stores/observingStateStore";
import ReportModal from "../components/debate-zone/ongoing-debate/ReportModal";
import { ObserverWebSocketContextProvider } from "../contexts/ObserverWebSocketContext";
import { checkRoomIdIsExist } from "../utils/checkRoomIdIsExist";
import { useParams } from "react-router";
import { DebateWebSocketProvider } from "../contexts/DebateWebSocketContext";
import { userApi } from "../api/user";

export default function ObservingZone() {
  const { observingState } = useObservingStore();
  const [headerStatus, setHeaderStatus] = useState<
    "debate-waiting" | "debate-ing"
  >("debate-waiting");

  const {roomId} = useParams()

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

  const currentUserName = useRef(null)
  const position = useRef("PRO") // TODO: 임시값. 포지션 동적으로 변경

  const fetchUserNickname = async() => {
    const userInfoResponse = await userApi.fetchMyProfile();
    currentUserName.current = userInfoResponse.data.nickname
  }

  useEffect(()=>{
    if (roomId) {
      checkRoomIdIsExist(roomId)
    }
    fetchUserNickname()
  },[roomId])

  return (
    <DebateWebSocketProvider userName={currentUserName.current} position={position.current}>
      <ObserverWebSocketContextProvider userName={currentUserName.current} position={position.current}>
      <div className="bg-[#070707] min-h-screen overflow-hidden">
        <Header status={headerStatus} />
        <ReportModal  />
        {observingState === "waiting" && <ObserverWaitingRoom />}
        {observingState === "ongoing" && <ObserverOngoingRoom />}
        {observingState === "won-by-default" && <WinByDefault />}
        {observingState === "voting" && <VoteRoom isObserver={true} />}
        {observingState === "replay" && <ReplayDebate isObserver={true} />}
        {observingState === "result" && <VoteResult isObserver={true} />}
      </div>
      </ObserverWebSocketContextProvider>
    </DebateWebSocketProvider>
  );
}
