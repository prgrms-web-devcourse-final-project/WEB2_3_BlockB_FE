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
import { useLocation, useParams } from "react-router";
import { userApi } from "../api/user";
import { useCheckRoomId } from "../hooks/useCheckRoomId";

export default function DebateZone() {
  const { roomId } = useParams();
  const { roomState, roomSettings, setRoomSettings} = useRoomStore();
  const [headerStatus, setHeaderStatus] = useState<"debate-waiting" | "debate-ing">("debate-waiting");
  const [userName, setUserName] = useState(""); 


  const location = useLocation();
  const stance = location.state?.stance; 

  // 룸 현황에 따라 헤더 상태 변경
  useEffect(() => {
    if (roomState === "ongoing" || roomState === "voting" || roomState === "replay") {
      setHeaderStatus("debate-ing");
    } else {
      setHeaderStatus("debate-waiting");
    }
  }, [roomState, roomId]);

  // 현재 유저의 정보 가져오기
  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        const userInfoResponse = await userApi.fetchMyProfile();
        setUserName(userInfoResponse.data.nickname); 
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchUserNickname();
    if (stance) {
      setRoomSettings("stance",stance)
    }
  }, []);

  useCheckRoomId();

  return (
    <DebateWebSocketProvider userName={userName} initialPosition={stance || roomSettings.stance}> {/* ✅ 개설 후 참여시 stance, 개설자 참여시 roomSetting으로 전달 */}
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
