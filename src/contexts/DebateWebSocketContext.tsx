import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";


type WebSocketCommunicationType = {
  event: "JOIN" | "MESSAGE" | "EXIT";
  userName: string;
  position: "PRO" | "CONS" | "NOPOSITION";
  message: string;
  timestamp: string;
};

interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: WebSocketCommunicationType) => void;
  stompClient: Client | null;
}

const DebateWebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const { roomId } = useParams<{ roomId: string }>();

  // 메시지 보내기 함수
  const sendMessage = (message: WebSocketCommunicationType) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/a/${roomId}`, 
        body: JSON.stringify(message),  
      });
    }
  };

  useEffect(() => {
    if (!roomId) return; // roomId가 없으면 WebSocket 연결하지 않음

    const WS_URL = import.meta.env.VITE_WS_URL;
    const client = new Client({
      brokerURL: `${WS_URL}/debate/${roomId}`,
      connectHeaders: {},
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000, // 5초 후 자동 재연결
    });

    client.onConnect = () => {
      client.subscribe(`/topic/debate/${roomId}`, (message: Message) => {
        // 메시지의 본문을 처리할 때 JSON.parse로 변환
        const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId]);  // roomId가 바뀔 때마다 WebSocket 연결

  return (
    <DebateWebSocketContext.Provider value={{ messages, sendMessage, stompClient }}>
      {children}
    </DebateWebSocketContext.Provider>
  );
};

export const useDebateWebSocket = () => {
  const context = useContext(DebateWebSocketContext);
  if (!context) {
    throw new Error("useDebateWebSocket must be used within a DebateWebSocketProvider");
  }
  return context;
};
