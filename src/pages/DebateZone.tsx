import { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router";
import { debateRoomApi } from "../api/debatezone";
import { userApi } from "../api/user";

export default function DebateZone() {
  const {roomId} = useParams()
  const { roomState } = useRoomStore();
  const [headerStatus, setHeaderStatus] = useState<"debate-waiting" | "debate-ing">("debate-waiting");
  const currentUserName = useRef("")
  const navigate = useNavigate()

  const checkRoomIdIsExist = async() => {
    if(roomId) {
      try {
        await debateRoomApi.fetchOngoingRoomInfo(roomId)
      } catch (error) {
      console.error(error)
      navigate("*")
      }
    }
  }

  const fetchUserNickname = async() => {
    const userInfoResponse = await userApi.fetchMyProfile();
    currentUserName.current = userInfoResponse.data.nickname
  }

  useEffect(() => {
    if (roomState === "ongoing" || roomState === "voting" || roomState === "replay") {
      setHeaderStatus("debate-ing");
    } else {
      setHeaderStatus("debate-waiting");
    }

  }, [roomState]);

  useEffect(()=>{
    checkRoomIdIsExist()
    fetchUserNickname()
  },[roomId])

  const currentPosition = "PRO" //TODO: 현재는 임시값으로 추후 버튼을 통해 접근하도록 바꾸기. 주소를 통해서 들어오면 position을 확정할 수 없으므로 안내해주기

  return (
    <DebateWebSocketProvider userName={currentUserName.current} position={currentPosition}>
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
