import { useEffect, useState } from "react";

import { gsap } from "gsap";
import { useNavigate } from "react-router";
import link from "../../../assets/icons/link.svg";
import { useRoomStore } from "../../../stores/roomStateStore";
import RoomActionButtons from "./../RoomActionButtons";
import CheckBoxGroups from "./CheckBoxGroups";
import ProgressIndicator from "./ProgressIndicator";
import RoomInputCard from "./RoomInputCard";
import { debateRoomApi } from "../../../api/debatezone";

export default function GeneratingRoom() {
  const [generatingType, setGeneratingType] = useState<
    "fromNews" | "fromDebateList"
  >("fromNews")
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { setRoomState, roomSettings } = useRoomStore();
  const onClickCreateBtn = () => {
    setRoomState("waiting");
     postInitialRoomInfo()
    }
  const navigate = useNavigate();
  const newLink =
    "https://www.yna.co.kr/view/AKR20250213094800004?section=politics/all&site=topnews01"; //임시링크

  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({
    title: false,
    description: false,
    continent: false,
    category: false,
    participant: false,
    stance: false,
    hasVote: false,
    time: false,
    turn: false,
  });

  

  const postInitialRoomInfo = async () => {
    const data: NewsData = {
      newsId: 0,
      title: roomSettings.title!,
      news: {
        createdAt: "2025-03-01T08:01:25.334Z",
        updatedAt: "2025-03-01T08:01:25.334Z",
        id: 0,
        title: "string",
        content: "AS",
        link: "string",
        imgUrl: "string",
        newsType: "HANI", 
        continent: "AS", 
        deliveryTime: "2025-03-01T08:01:25.334Z"
      },
      description: roomSettings.description!,
      memberNumber: roomSettings.memberNumber!, 
      continent: roomSettings.continent!,
      category: roomSettings.category!,
      time: timeMap[roomSettings.time!],
      speakCount: speakCountMap[roomSettings.speakCount!],      
      resultEnabled: roomSettings.hasVote!,
      endTime: null,
    }; 

    const roomInfoWebsocket = await debateRoomApi.generateDebateRoom(data);
    console.log("웹소켓 아이디 response", roomInfoWebsocket.data);
    const socket = new WebSocket(`ws://13.125.142.253:8080/topic/debate/${roomInfoWebsocket.data}`);
    socket.onopen = () => console.log("웹소켓 연결 성공!");
    socket.onerror = (error) => console.log("연결 실패:", error);
};


  useEffect(() => {
    const allChecked = Object.values(checkedStates).every((val) => val);
    setHasCompleted(allChecked);
  }, [checkedStates]);

  useEffect(() => {
    // 전체 컴포넌트 슬라이드업 + 페이드 인
    gsap.from(".generatingRoomContainer", {
      opacity: 0,
      y: 100,
      duration: 0.2,
      ease: "power4.out",
      onComplete: () => {
        gsap.to(".generatingRoomContainer", { opacity: 1, y: 0 });
      },
    });
    // 내부 요소들이 차례대로 애니메이션
    gsap.from(".generatingRoomContainer > *", {
      opacity: 0,
      y: 20,
      stagger: 0.1, // 각 요소 0.1
      duration: 0.4,
      ease: "power3.out", // 부드러운
      onComplete: () => {
        gsap.to(".generatingRoomContainer > *", { opacity: 1, y: 0 });
      },
    });
  }, []);

  return (
    <div className="flex justify-center item-center md:min-h-screen">
      <div
        className="generatingRoomContainer flex flex-col justify-between items-center gap-[10px]  md:w-[658px] h-auto rounded-[10px] md:px-10 px-3 md:py-10 py-5 md:mb-20 mb-10 md:border md:border-white md:bg-white md:bg-opacity-20 md:shadow-[0_4px_20px_rgba(251,251,251,1)] font-pretendard "
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
            <a href={newLink} className="w-full flex justify-end items-center gap-2">
              <img src={link} alt="연관된 뉴스 링크" />
              <figcaption className="text-gray02 text-[10px] leading-0">
                {newLink}
              </figcaption>
            </a>
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
  );
}
