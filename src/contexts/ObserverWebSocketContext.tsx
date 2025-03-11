import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";

// ✅ Context 타입 정의
interface WebSocketContextType {
  observerMessages: WebSocketCommunicationType[];
  sendObserverMessages: (message: string) => void;
  stompClient: Client | null;
}

// ✅ Context 생성
const ObserverWebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const ObserverWebSocketContextProvider = ({ children, userName }: React.PropsWithChildren<DebateWebSocketProviderProps>) => {
  const [observerMessages, setObserverMessage] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { roomId } = useParams<{ roomId: string }>();

  // ✅ 메시지 보내기 함수
  const sendObserverMessages = (message: string) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/observer/${roomId}`,
        body: message, 
      });
    }
  };


  useEffect(() => {
    if (!roomId || !userName ) return;

    const WS_URL = import.meta.env.VITE_WS_URL;
    const client = new Client({
      brokerURL: `${WS_URL}/observer/${roomId}`,
      connectHeaders: {
        userName,
        roomId,
      },
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000, // 5초 후 자동 재연결
    });

    client.onConnect = () => {
      console.log("observer쪽 userName", userName)
      console.log("🍎 WebSocket Connected to:", `/topic/observer/${roomId}`);

      client.subscribe(`/topic/observer/${roomId}`, (message: Message) => {
          console.log("🍎 observer subscribe 전달 받음 => 메시지 원본", message);
          const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
          console.log("🍎 observer subscribe 전달 받음 => 메시지 변형", parsedMessage);
          if (parsedMessage.event === "MESSAGE" && parsedMessage.message.length > 0) {
            setObserverMessage((prevMessages) => [...prevMessages, parsedMessage]);
          }

      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId, userName]);

  return (
    <ObserverWebSocketContext.Provider value={{ observerMessages, sendObserverMessages, stompClient }}>
      {children}
    </ObserverWebSocketContext.Provider>
  );
};

// ✅ WebSocket Context를 사용할 때 활용하는 커스텀 훅
export const useObserverWebSocket = () => {
  const context = useContext(ObserverWebSocketContext);
  if (!context) {
    throw new Error("useObserverWebSocket must be used within a ObserverWebSocketContextProvider");
  }
  return context;
};
