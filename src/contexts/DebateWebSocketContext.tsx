import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";

interface WebSocketContextType {
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  stompClient: Client | null;
}

const DebateWebSockContext = createContext<WebSocketContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children, userName, position }: React.PropsWithChildren<DebateWebSocketProviderProps>) => {
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const { roomId } = useParams<{ roomId: string }>();


  const sendMessage = (message: string) => {
    if (stompClient && roomId) {
      stompClient.publish({
        destination: `/app/debate/${roomId}`,
        body: message,
      });
    }
  };

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
          if (!!parsedMessage.message && parsedMessage.message.length > 0) {
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
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
    <DebateWebSockContext.Provider value={{ messages, sendMessage, stompClient }}>
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
