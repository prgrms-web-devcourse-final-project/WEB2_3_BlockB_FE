import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router";
// import { debateRoomApi } from "../api/debatezone";

interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  isMyTurn: boolean
  stompClient: Client | null;
}

const DebateWebSockContext = createContext<WebSocketContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children, userName, position }: React.PropsWithChildren<DebateWebSocketProviderProps>) => {
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(Boolean)
  
  // const [myTeamList, setMyTeamList] = useState([])
  // const [opponentTeamList, setOppentTeamList] = useState([])

  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate()

  const sendMessage = (message: string) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/debate/${roomId}`,
        body: message,
      });
    }
  };

  // const getParticipantsList = async () => {
  //   if (roomId) {
  //     const currentRoomInfoResponse = await debateRoomApi.fetchOngoingRoomInfo(roomId)
  //     setMyTeamList(currentRoomInfoResponse.data.participant)
  //   }
  // }

  useEffect(() => {
    if (!roomId || !userName) return;

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
      console.log("유저의 이름",userName)
      client.subscribe(
        `/topic/debate/${roomId}`,
        (message: Message) => {
          console.log("✅ subscribe 전달 받음 => 메시지 원본", message);
          const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
          console.log("✅ subscribe 전달 받음 => 메시지 변형", parsedMessage);
          if (parsedMessage.event === "error") {
            if (parsedMessage.kickedUserName === userName) {
              navigate("/debate-rooms")
            }
          }
          if (parsedMessage.event ==="MESSAGE") {
              setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          }
          // if (parsedMessage.event === "user_joined") {
          //   getParticipantsList()
          // } 
          // TODO: 유저 정보 pro con 나눠지면 추가
          if (parsedMessage.event === "TURN") {
            console.log("현재턴은", parsedMessage.turn, ", 내 포지션은", position)
            parsedMessage.turn === position?.toLocaleUpperCase() ? setIsMyTurn(true) : setIsMyTurn(false)
          }
          
        },
      );
    };
    
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId, userName, position]);

  return (
    <DebateWebSockContext.Provider value={{ messages, sendMessage, isMyTurn, stompClient }}>
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
