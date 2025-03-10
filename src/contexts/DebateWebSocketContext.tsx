import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router";
import { useRoomStore } from "../stores/roomStateStore";
import { debateRoomApi } from "../api/debatezone";
import { useObservingStore } from "../stores/observingStateStore";

interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  isWaitingRecruitment: boolean;
  myTeamList: Participant[];
  opponentTeamList: Participant[];
  isMyTurn: boolean;
  stompClient: Client | null;
  position: string | null; // ✅ 포지션을 컨텍스트에서 제공
  hasVoted: boolean;
  setHasVoted: (hasVoted: boolean) => void;
}

const DebateWebSockContext = createContext<WebSocketContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children, userName, initialPosition }: React.PropsWithChildren<{ userName: string; initialPosition: string }>) => {
  const [isWaitingRecruitment, setIsWaitingRecruitment] = useState<boolean>(true);
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

  const [myTeamList, setMyTeamList] = useState<Participant[]>([]);
  const [opponentTeamList, setOppentTeamList] = useState<Participant[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false)

  const [position, setPosition] = useState<string | null>(initialPosition); 

  const { setRoomState } = useRoomStore();
  const { setObservingState } = useObservingStore()
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const sendMessage = (message: string) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/debate/${roomId}`,
        body: message,
      });
    }
  };

  const getParticipantsList = async () => {
    if (roomId) {
      const currentRoomInfoResponse = await debateRoomApi.fetchOngoingRoomInfo(roomId);
      const formattedPosition = position?.toUpperCase();
      setMyTeamList(currentRoomInfoResponse.data.participants.filter((participant: Participant) => participant.position === formattedPosition));
      setOppentTeamList(currentRoomInfoResponse.data.participants.filter((participant: Participant) => participant.position !== formattedPosition));
    }
  };

  useEffect(() => {
    if (!roomId || !userName || !position) return;

    const WS_URL = import.meta.env.VITE_WS_URL;
    const client = new Client({
      brokerURL: `${WS_URL}/debate/${roomId}`,
      connectHeaders: {
        userName,
        position,
        roomId,
      },
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("유저의 이름:", userName);
      getParticipantsList()

      client.subscribe(`/topic/debate/${roomId}`, (message: Message) => {
        console.log("✅ subscribe 전달 받음 => 메시지 원본", message);
        const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
        console.log("✅ subscribe 전달 받음 => 메시지 변형", parsedMessage);

        if (parsedMessage.event === "error" && parsedMessage.kickedUserName === userName) {
          navigate("/debate-rooms");
        }

        if (parsedMessage.event === "MESSAGE") {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }

        if (parsedMessage.event === "TURN") {
          console.log("현재턴은", parsedMessage.turn, ", 내 포지션은", position?.toUpperCase());
          setIsMyTurn(parsedMessage.turn === position?.toUpperCase());
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }

        if (parsedMessage.event === "STATUS") {
          if (parsedMessage.status === "DEBATE") {
            setRoomState("ongoing");
            setObservingState("ongoing")
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            position === "pro" && setIsMyTurn(true);
          }
          if (parsedMessage.status === "VOTING") {
            setRoomState("voting");
            setObservingState("voting")
          }
          if (parsedMessage.status === "CLOSED") {
            setRoomState("result");
            setObservingState("result")
            return stompClient?.deactivate()
          }
        }

        if (parsedMessage.event === "NOTIFICATION" && parsedMessage.message === "잠시 후 토론이 시작됩니다... ") {
          setIsWaitingRecruitment(false);
        }

        if (parsedMessage.event === "user_joined") {
          getParticipantsList();
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setRoomState("waiting"); // ✅ 컴포넌트 언마운트 시 상태 초기화
      setObservingState("waiting")
    };
  }, [roomId, userName, position]);

  return (
    <DebateWebSockContext.Provider value={{ messages, sendMessage, isWaitingRecruitment, myTeamList, opponentTeamList, isMyTurn, stompClient, position, hasVoted, setHasVoted }}>
      {children}
    </DebateWebSockContext.Provider>
  );
};

export const useDebateWebSocket = () => {
  const context = useContext(DebateWebSockContext);
  if (!context) {
    throw new Error("useDebateWebSocket must be used within a DebateWebSocketProvider");
  }
  return context;
};
