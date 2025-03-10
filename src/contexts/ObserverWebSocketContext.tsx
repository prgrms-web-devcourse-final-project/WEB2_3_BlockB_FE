import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";

// ✅ Context 타입 정의
interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  stompClient: Client | null;
}

// ✅ Context 생성
const ObserverWebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const ObserverWebSocketContextProvider = ({ children, userName }: React.PropsWithChildren<DebateWebSocketProviderProps>) => {
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { roomId } = useParams<{ roomId: string }>();

  // ✅ 메시지 보내기 함수
  const sendMessage = (message: string) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/observer/${roomId}`,
        body: message, 
      });
    }
  };

  useEffect(() => {
    if (!roomId) return; // roomId가 없으면 WebSocket 연결하지 않음

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

    // ✅ STOMP 클라이언트가 연결되었을 때 실행
    client.onConnect = () => {
      console.log("WebSocket Connected to:", `/topic/observer/${roomId}`);
      client.subscribe(`/topic/observer/${roomId}`, (message: Message) => {
        try {
          const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
          console.log("Received message:", parsedMessage);

          if (parsedMessage.message.length > 0) {
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  return (
    <ObserverWebSocketContext.Provider value={{ messages, sendMessage, stompClient }}>
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
