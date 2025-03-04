import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import link from "../assets/icons/link.svg";
import { useRoomStore } from "../stores/roomStateStore";
import RoomActionButtons from "../components/debate-zone/RoomActionButtons";
import CheckBoxGroups from "../components/debate-zone/generating-room/CheckBoxGroups";
import ProgressIndicator from "../components/debate-zone/generating-room/ProgressIndicator";
import { debateRoomApi } from "../api/debatezone";
import RoomInputCard from "../components/debate-zone/generating-room/RoomInputCard";
import { speakCountMap, timeMap } from "../constants";
import useSlideUpAnimation from "../hooks/useSlideUpAnimation";
import useNewsInfoParams from "../hooks/useNewsInfoParams";
import Header from "../components/common/Header";
import SockJS from "sockjs-client";
import { Client, Frame, IMessage } from "@stomp/stompjs";

export default function GeneratingRoom() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  useSlideUpAnimation(containerRef);

  const { setRoomSettings, roomSettings } = useRoomStore();

  const { newsId, continent, newsTitle, generatingType, moveToLinkedNews } =
    useNewsInfoParams();
  useEffect(() => {
    if (generatingType === "fromNews") {
      setRoomSettings("continent", continent);
      setRoomSettings("link", `/news/${newsId}`);
      setCheckedStates((prevCheckedStates) => ({
        ...prevCheckedStates,
        continent: true,
      }));
    }
  }, [generatingType, continent, newsId, setRoomSettings]);

  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({
    title: false,
    description: false,
    continent: false,
    category: false,
    memberNumber: false,
    stance: false,
    hasVote: false,
    time: false,
    speakCount: false,
  });

  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  useEffect(() => {
    const allChecked = Object.values(checkedStates).every(Boolean);
    setHasCompleted(allChecked);
    console.log(checkedStates)
  }, [checkedStates]);

  const connectWithWebSocket = (roomId: string) => {
    const WS_URL = import.meta.env.VITE_WS_URL;
    console.log("WebSocket URL:", WS_URL); 

    const socket = new SockJS(`${WS_URL}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 1000, 
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
      onConnect: (frame: Frame) => {
        console.log("웹소켓 연결 성공!", frame); 
        stompClient.subscribe(`/topic/debate/${roomId}`, (message: IMessage) => {
          console.log("메시지 수신:", message.body); 
        });

        stompClient.publish({
          destination: `/app/debate/${roomId}`,
          body: JSON.stringify({ message: "Hello, WebSocket!" }),
        });
      },
      onStompError: (frame: Frame) => {
        console.error("STOMP 오류:", frame);
      },
      onDisconnect: (frame: Frame) => {
        console.log("웹소켓 연결 해제됨", frame);
      },
      onWebSocketClose: (event: CloseEvent) => {
        console.log("WebSocket 연결 종료됨", event);
      },
      onWebSocketError: (event: Event) => {
        console.error("WebSocket 오류:", event);
      },
    });

    stompClient.activate();
  };



  const makeNewRoom = async () => {
    const initialRoomInfos: RoomInfoRequest = {
      title: roomSettings.title!,
      description: roomSettings.description!,
      memberNumber: roomSettings.memberNumber!,
      category: roomSettings.category!,
      time: timeMap[roomSettings.time!],
      continent: roomSettings.continent!,
      speakCount: speakCountMap[roomSettings.speakCount!],
      resultEnabled: roomSettings.hasVote!,
    };
  
    if (generatingType === "fromNews" && newsId) {
      initialRoomInfos.newsId = Number(newsId);
      initialRoomInfos.newsUrl = `/news/${newsId}`;
    }
  
    const roomIdResponse = await debateRoomApi.generateDebateRoom(initialRoomInfos);
    console.log("방 생성 응답:", roomIdResponse);
    return roomIdResponse.data;
  };
  

  const onClickCreateBtn = async () => {
      const roomId = await makeNewRoom();
      console.log("방 ID:", roomId); 
      connectWithWebSocket(roomId);
      navigate(`/debate-zone/${roomId}`);    
  };

  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <Header status="debate-waiting" />
      <div className="flex justify-center item-center md:min-h-screen">
        <div
          ref={containerRef}
          className="flex flex-col justify-between items-center gap-[10px]  md:w-[658px] h-auto rounded-[10px] md:px-10 px-3 md:py-10 py-5 md:mb-20 mb-10 md:border md:border-white md:bg-white md:bg-opacity-20 md:shadow-[0_4px_20px_rgba(251,251,251,1)] font-pretendard "
        >
          <ProgressIndicator checkedStates={checkedStates} />
          <div className="w-full flex flex-col md:gap-4 gap-2">
            <RoomInputCard
              label="토론 주제"
              fieldKey="title"
              setCheckedStates={setCheckedStates}
            />
            <RoomInputCard
              label="방 설명"
              fieldKey="description"
              setCheckedStates={setCheckedStates}
            />
            {generatingType == "fromNews" && (
              <button
                onClick={moveToLinkedNews}
                className="w-full flex justify-end items-center gap-2"
              >
                <img src={link} alt="연관된 뉴스 링크" />
                <figcaption className="text-gray02 text-[10px] leading-0">
                  {newsTitle}
                </figcaption>
              </button>
            )}
          </div>

          <CheckBoxGroups
            generatingType={generatingType}
            setCheckedStates={setCheckedStates}
          />
          <div className="w-full flex justify-end">
            <RoomActionButtons
              cancelAction={() => {
                navigate(-1);
              }}
              confirmAction={onClickCreateBtn}
              cancelColor="bg-black01 text-white"
              confirmColor="bg-white black01"
              confirmText="개설"
              hasCompleted={hasCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}