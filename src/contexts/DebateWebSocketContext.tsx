import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router";
import { useRoomStore } from "../stores/roomStateStore";
import { debateRoomApi } from "../api/debatezone";
import { useObservingStore } from "../stores/observingStateStore";
import { useObserverWebSocket } from "./ObserverWebSocketContext";

type DebateWebSockContextType = {
  websocketStatus: WebSocketStatus;
  messages: WebSocketCommunicationType[];
  sendMessage: (message: string) => void;
  isWaitingRecruitment: boolean;
  myTeamList: Participant[];
  opponentTeamList: Participant[];
  isMyTurn: boolean;
  leftTurn: number;
  debateCountDown: number;
  leftTurnAtObserverView: number;
  stompClient: Client | null;
  position: string | null; 
  isResultEnabled: boolean;
  isCountingVotes: boolean;
  roomInfoDetails: DebateRoomInfo;
  setRoomInfoDetails: (info: DebateRoomInfo) => void
  isWaitngVote: boolean,
  voteTimer: number,
  hasVoted: boolean;
  setHasVoted: (hasVoted: boolean) => void;
  voteResult: VoteResult
  winnerByDefault: "PRO" | "CON" | undefined
}

const DebateWebSockContext = createContext<DebateWebSockContextType | undefined>(undefined);

export const DebateWebSocketProvider = ({ children, userName, initialPosition }: React.PropsWithChildren<{ userName: string; initialPosition: string }>) => {
  const [isWaitingRecruitment, setIsWaitingRecruitment] = useState<boolean>(true);
  const [messages, setMessages] = useState<WebSocketCommunicationType[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [myTeamList, setMyTeamList] = useState<Participant[]>([]);
  const [opponentTeamList, setOppentTeamList] = useState<Participant[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false)
  const [isCountingVotes, setIsCountingVotes] = useState(true);
  const [roomInfoDetails, setRoomInfoDetails] = useState<DebateRoomInfo>({
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

  const [isResultEnabled, setResultEnabled] = useState<boolean>(false)
  const [voteResult, setVoteResult] = useState<VoteResult>({agreeNumber: 0, disagreeNumber: 0, neutralNumber: 0})
  const [position, _] = useState<string | null>(initialPosition); 
  const [isWaitngVote, setIsWaitingVote] = useState(true)
  const [leftTurn, setLeftTurn] = useState<number>(0)
  const [debateCountDown, setDebateCountDown] = useState<number>(0)
  const [websocketStatus, setWebSocketStatus] = useState<WebSocketStatus>("WAITING")
  const [winnerByDefault, setWinnerByDefault] = useState<"PRO" | "CON" | undefined>(undefined)

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
  
  const { roomState } = useRoomStore();

  const getRoomWaitingRoomInfo = async () => {
    if (roomId) {

      const { data: roomInfoData } = await debateRoomApi.fetchWaitingRoomInfo(roomId) 
      setRoomInfoDetails(roomInfoData);
      setResultEnabled(roomInfoData.resultEnabled);      
    }
  };

  const getOngoingRoomInfo = async () => {
    if (roomId) {
    const { data: roomInfoData } = await debateRoomApi.fetchOngoingRoomInfo(roomId);
    setRoomInfoDetails(roomInfoData);
    setResultEnabled(roomInfoData.resultEnabled);

  }
  }

  const {setObserverRoomInfoDetails} = useObserverWebSocket()
  
  const getObserverOngoingInfo = async () => {
    if (roomId) {
      const { data: roomInfoData } = await debateRoomApi.fetchObserverOngoingRoomInfo(roomId);
      setObserverRoomInfoDetails(roomInfoData);
    }
  }

  useEffect(()=> {
    const getParticipantsList = async () => {
      if (!roomId) return;
  
      const { proUsers, conUsers } = roomInfoDetails
      const isPro = position === "pro";
    
      setMyTeamList(isPro ? proUsers : conUsers);
      setOppentTeamList(isPro ? conUsers : proUsers);
    };
  
    getParticipantsList()
  },[roomInfoDetails])

  const setInitialTurnCount = () => {
    setLeftTurn(roomInfoDetails.speakCountType * 2);
    setDebateCountDown(roomInfoDetails.timeType);
  }

  const updateTurnCount = () => {
    setLeftTurn((prevTurn) => prevTurn - 1); 
  };

  // 타이머 업데이트
  useEffect(() => {
    if (isWaitingRecruitment) return
    if (leftTurn > 0 && debateCountDown > 0) {
      const countdownInterval = setTimeout(() => {
        setDebateCountDown((prev) => prev - 1);
      }, 1000);
  
      return () => clearTimeout(countdownInterval);
    }
  
    if (debateCountDown === 0 && leftTurn > 0) {
      setDebateCountDown(roomInfoDetails.timeType); 
    }
  }, [leftTurn, debateCountDown, roomInfoDetails.timeType]);
  
  const getVoteResult = async () => {
    if (roomId) {
      const currentRoomInfoResponse = await debateRoomApi.fetchDebateVoteResult(roomId)
      setVoteResult(currentRoomInfoResponse.data)
    }
    setIsCountingVotes(false)
  }

  // 관찰자용 턴 변경 메서드
    const [leftTurnAtObserverView, setLeftTurnAtObserverView] = useState<number>(0)
  
    useEffect(()=> {

      const getDebateLeftTurn = async() => {
        if (!roomId) return
        if (position !== "observer") return
        const {data: turnData} = await debateRoomApi.fetchDebateLeftTurn(roomId)
        setLeftTurnAtObserverView(turnData.turnCount) 
      }
      getDebateLeftTurn()
    }, [roomId, userName, roomState])

  const [voteTimer, setVoteTimer] = useState<number>(30)
  
  // 투표 시간 타이머
  useEffect(() => {
    if (websocketStatus === "VOTING" && voteTimer > 0) {
      const countdownInterval = setTimeout(() => {
        setVoteTimer((prev) => prev - 1);
      }, 1000);
  
      return () => clearTimeout(countdownInterval);
    }
  }, [websocketStatus, voteTimer]);
  

    
  // WebSocket 연결 및 메시지 처리
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
      // debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 8000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/debate/${roomId}`, (message: Message) => {
        // console.log("✅ subscribe 전달 받음 => 메시지 원본", message);
        const parsedMessage: WebSocketCommunicationType = JSON.parse(message.body as string);
        console.log("✅ subscribe 전달 받음 => 메시지 변형", parsedMessage);

        if (parsedMessage.event === "error" && parsedMessage.kickedUserName === userName) {
          navigate("/debate-rooms");
        }

        if (parsedMessage.event === "MESSAGE") {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }

        if (parsedMessage.event === "TURN") {
          updateTurnCount();
          setLeftTurnAtObserverView(prev => prev - 1)
          setIsMyTurn(parsedMessage.turn === position?.toUpperCase());
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          setDebateCountDown(roomInfoDetails.timeType);
        }

        if (parsedMessage.event === "STATUS") {
          if (parsedMessage.status === "DEBATE") {
            setWebSocketStatus("DEBATE")
            setRoomState("ongoing");
            setObservingState("ongoing");
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            position === "pro" && setIsMyTurn(true);
            setInitialTurnCount();
          }
          if (parsedMessage.status === "VOTING") {
            setWebSocketStatus("VOTING")
            setIsWaitingVote(false);
          }
          if (parsedMessage.status === "CLOSED") { 
            setWebSocketStatus("CLOSED")   
            stompClient?.deactivate();
            // setTimeout(() => {
            //   navigate("/main");
            // }, 10000); 
          }
          
        }

        if (parsedMessage.event === "NOTIFICATION") {
         if (parsedMessage.message === "잠시 후 토론이 시작됩니다... ") {
           getOngoingRoomInfo()
           setIsWaitingRecruitment(false);
         }
         if (parsedMessage.message === "잠시 후 투표가 시작됩니다.") {
          setRoomState("voting");
          setObservingState("voting");
         }
         if (parsedMessage.message === "투표가 종료되었습니다. 투표 결과 집계중...") {
          setRoomState("result");
          setObservingState("result");
        
          setTimeout(() => {
            getVoteResult();
          }, 2000);
        }
        }

        if (parsedMessage.event === "user_joined") {
          getRoomWaitingRoomInfo();
        }
        
        if (parsedMessage.event === "user_left") {
            getOngoingRoomInfo(); 
            getObserverOngoingInfo()
        }

        if (parsedMessage.event === "WIN_BY_DEFAULT") {

          setRoomState("won-by-default")
          setObservingState("won-by-default")
          setWinnerByDefault(parsedMessage.winner)
        }

      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setRoomState("waiting");
      setObservingState("waiting");
    };
  }, [roomId, userName, position]);

  return (
    <DebateWebSockContext.Provider value={{ websocketStatus, messages, sendMessage, isWaitingRecruitment, myTeamList, opponentTeamList, isMyTurn, leftTurn, debateCountDown, leftTurnAtObserverView, stompClient, position, isResultEnabled, isCountingVotes, roomInfoDetails, setRoomInfoDetails, hasVoted, voteTimer, isWaitngVote, setHasVoted, voteResult, winnerByDefault }}>
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
