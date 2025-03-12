import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useParams } from "react-router";
import { debateRoomApi } from "../api/debatezone";
import { useObservingStore } from "../stores/observingStateStore";

// ✅ Context 타입 정의
interface WebSocketContextType {
  observerMessages: WebSocketCommunicationType[];
  sendObserverMessages: (message: string) => void;
  observerRoomInfoDetails: DebateRoomInfo;
  setObserverRoomInfoDetails: (info: DebateRoomInfo) => void;
  stompClient: Client | null;
}

// ✅ Context 생성
const ObserverWebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const ObserverWebSocketContextProvider = ({ children, userName }: React.PropsWithChildren<DebateWebSocketProviderProps>) => {
  const [observerMessages, setObserverMessage] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [observerRoomInfoDetails, setObserverRoomInfoDetails] = useState<DebateRoomInfo>({
    roomId: "",
    title: "",
    description: "",
    memberNumberType: 1,
    categoryType: "",
    continentType: "",
    newsUrl: "",
    status: "",
    timeType: 30,
    speakCountType: 3,
    resultEnabled: false,
    proUsers: [],
    conUsers: [],
  })
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
    const {setObservingState, observingState} = useObservingStore()


    useEffect(() => {
      const setCurrentRoomState = async () => {
        if (!roomId) return;
        const { data: currentRoomInfoResponse } = await debateRoomApi.fetchObserverOngoingRoomInfo(roomId);
        const currentRoomState = currentRoomInfoResponse.status;
        console.log("observer 지금 토론방의 상태는?", currentRoomState);
    
        if (currentRoomState === "WAITING") {
          setObservingState("waiting");
        } else if (currentRoomState === "DEBATE") {
          setObservingState("ongoing");
        } else if (currentRoomState === "VOTING") {
          setObservingState("voting");
        }
      };
    
      setCurrentRoomState();
    }, [roomId]); 
    
    useEffect(() => {
      if (!observingState || !roomId) return;
    
      const fetchRoomInfo = async () => {
        if (observingState === "waiting") {
          const { data: roomInfoData } = await debateRoomApi.fetchWaitingRoomInfo(roomId);
          console.log("✅ 참관자 방에서 대기방 정보를 가져왔습니다", roomInfoData);
          setObserverRoomInfoDetails(roomInfoData);
        } else if (observingState === "ongoing") {
          const { data: roomInfoData } = await debateRoomApi.fetchObserverOngoingRoomInfo(roomId);
          setObserverRoomInfoDetails(roomInfoData);
        }
      };
    
      fetchRoomInfo();
    }, [observingState, roomId]);
    
    useEffect(() => {
      console.log("✅ 참관자 정보가 세팅됐습니다", observerRoomInfoDetails);
    }, [observerRoomInfoDetails]);
    


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
      reconnectDelay: 5000, 
    });

    client.onConnect = () => {
  

      client.subscribe(`/topic/observer/${roomId}`, (message: Message) => {
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
    <ObserverWebSocketContext.Provider value={{ observerMessages, sendObserverMessages,observerRoomInfoDetails, setObserverRoomInfoDetails, stompClient }}>
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
