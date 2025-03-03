import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import link from "../assets/icons/link.svg"
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

export default function GeneratingRoom() {

    const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null);
  useSlideUpAnimation(containerRef);
  
  const { setRoomSettings, roomSettings } = useRoomStore();
  
  const { newsId, continent, newsTitle, generatingType, moveToLinkedNews } = useNewsInfoParams();
  useEffect(() => {
    if (generatingType === 'fromNews') {
      setRoomSettings('continent', continent);
      setRoomSettings('link', `/news/${newsId}`);
      setCheckedStates(prevCheckedStates => ({
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
  }, [checkedStates]);

  const WS_URL = import.meta.env.VITE_WS_URL;
  const connectWithWebSocket = (roomId: string) => {
    const socket = new WebSocket(`${WS_URL}/topic/debate/${roomId}`);
    socket.onopen = () => console.log("웹소켓 연결 성공!");
    socket.onerror = (error) => console.log("웹소켓 연결 실패:", error);
  }

  const makeNewRoom = async () => {
    const initialRoomInfos: RoomInfoRequest = {
        newsId: Number(newsId),
        title: roomSettings.title!,
        description: roomSettings.description!,
        memberNumber: roomSettings.memberNumber!,
        continent: roomSettings.continent!,
        category: roomSettings.category!,
        time: timeMap[roomSettings.time!],
        speakCount: speakCountMap[roomSettings.speakCount!],
        resultEnabled: roomSettings.hasVote!,
        endTime: "2025-03-01T14:26:54.983Z",
        ...(generatingType === "fromNews" && {
          news: {
            createdAt: "2025-03-01T14:07:46.401Z",
            updatedAt: "2025-03-01T14:07:46.401Z",
            id: Number(newsId),
            title: newsTitle!,
            content: "내용",
            link: "string",
            imgUrl: "string",
            newsType: "JOONGANG",
            continent: continent,
            deliveryTime: "2025-03-01T14:07:46.401Z",
          },
        }),
      };
    
      const roomIdResponse : {
        "status": string,
        "message": string,
        "data": string
      } = await debateRoomApi.generateDebateRoom(initialRoomInfos);
      console.log(roomIdResponse)
      return roomIdResponse.data
  }
  

  const onClickCreateBtn = async () => {
    const roomId = await makeNewRoom();
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
            <button onClick={moveToLinkedNews} className="w-full flex justify-end items-center gap-2">
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
