import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Client, Frame, Message } from "@stomp/stompjs";
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
  const { roomId } = useParams<{ roomId: string }>();

  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    if (roomState === "ongoing" || roomState === "voting" || roomState === "replay") {
      setHeaderStatus("debate-ing");
    } else {
      setHeaderStatus("debate-waiting");
    }
  }, [roomState]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: `${WS_URL}/debate/${roomId}`,
      connectHeaders: {},
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000, // 5초 후 자동 재연결
    });

    stompClient.onConnect = (frame: Frame) => {
      console.log("STOMP 웹소켓 연결 성공", frame);

      // 구독 (토론방 메시지 수신)
      stompClient.subscribe(`/topic/debate/${roomId}`, (message: Message) => {
        console.log("새 메시지 수신:", message.body);
      });

      // 서버에 메시지 전송
      stompClient.publish({
        destination: `/app/a/${roomId}`,
        body: JSON.stringify({message: "메시지 전송"}),
      });
    };

    stompClient.onStompError = (error) => {
      console.error("STOMP 오류 발생:", error);
      alert("웹소켓 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    };

    stompClient.onWebSocketClose = () => {
      console.log("STOMP 웹소켓 연결 종료");
      alert("웹소켓 연결이 끊어졌습니다. 다시 시도해 주세요.");
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [roomId]);

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
