import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";


interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  stompClient: Client | null;
}

const ObserverWebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const { roomId } = useParams<{ roomId: string }>();

  // 메시지 보내기 함수
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
      connectHeaders: {},
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000, // 5초 후 자동 재연결
    });

    client.onConnect = () => {
      client.subscribe(`/topic/observer/${roomId}`, (message: Message) => {
        // 메시지의 본문을 처리할 때 JSON.parse로 변환
        console.log("subscribe 전달 받음",message)
        const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
        if(parsedMessage.message.length > 0){
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
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

export const useObserverWebSocket = () => {
  const context = useContext(ObserverWebSocketContext);
  if (!context) {
    throw new Error("useDebateWebSocket must be used within a DebateWebSocketProvider");
  }
  return context;
};
