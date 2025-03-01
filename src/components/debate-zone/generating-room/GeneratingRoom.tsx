import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useNavigate, useSearchParams } from "react-router";
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
  >("fromDebateList")
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { setRoomState, roomSettings, setRoomSettings } = useRoomStore();

  const [searchParams] = useSearchParams();
  const newsId = useMemo(() => searchParams.get("id"), [searchParams]);
  const isContinent = (value: any): value is Continent => {
    return ["AS", "EU", "NA", "SA", "AF", "OC", "AN"].includes(value);
  };
  
  const continent = useMemo(() => {
    const value = searchParams.get("continent");
    return isContinent(value) ? value : "AS";
  }, [searchParams]);

  const navigate = useNavigate();

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


  // 개설 경로 파악 : 뉴스이면 fromNews
  useEffect(()=> {
    console.log(searchParams.get("id"))
    if (!!searchParams.get("id")) {
      setGeneratingType("fromNews");
  }

  }, [searchParams])

  useEffect(()=> {
    if(generatingType === "fromNews"){
      setCheckedStates((prev) => ({
        ...prev,
        continent: true, 
      }));
      setRoomSettings("continent", continent)
      setRoomSettings("link", `/news/${newsId}`)
    }
  },[generatingType])
  

  
  useEffect(() => {
    const allChecked = Object.values(checkedStates).every(Boolean);
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


  const onClickCreateBtn = async () => {
    const timeMap: Record<number, Time> = {  30: "T3", 40: "T4", 50: "T5", 60: "T6", 90: "T9", 120: "T12", 150: "T15"};
    const speakCountMap: Record<number, SpeakCount> = {
      3: "THREE",
      4: "FOUR",
      5: "FIVE",
      6: "SIX",
      7: "SEVEN",
      8: "EIGHT",
      9: "NINE",
      10: "TEN",
    };


    
    const initialRoomInfos:RoomInfoRequest = {
      newsId: Number(newsId),
      title: roomSettings.title!,
      news: {
        createdAt: "2025-03-01T14:07:46.401Z",
        updatedAt: "2025-03-01T14:07:46.401Z",
        id: Number(newsId),
        title: searchParams.get("title")!,
        content: "내용",
        link: "string",
        imgUrl: "string",
        newsType: "JOONGANG",
        continent: continent,
        deliveryTime: "2025-03-01T14:07:46.401Z",
      },
      description: roomSettings.description!,
      memberNumber: roomSettings.memberNumber!,
      continent: roomSettings.continent!,
      category: roomSettings.category!,
      time: timeMap[roomSettings.time!],
      speakCount: speakCountMap[roomSettings.speakCount!],
      resultEnabled: roomSettings.hasVote!,
      endTime: "2025-03-01T14:26:54.983Z"
    };

    const roomInfoWebsocket = await debateRoomApi.generateDebateRoom(initialRoomInfos);
    const WS_URL = import.meta.env.VITE_WS_URL;
    const socket = new WebSocket(`${WS_URL}/topic/debate/${roomInfoWebsocket.data}`);
    socket.onopen = () => console.log("웹소켓 연결 성공!");
    socket.onerror = (error) => console.log("웹소켓 연결 실패:", error);

    setRoomState("waiting");
  };


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
            <button onClick={() => navigate(`/news/${searchParams.get('id')}`)} className="w-full flex justify-end items-center gap-2">
              <img src={link} alt="연관된 뉴스 링크" />
              <figcaption className="text-gray02 text-[10px] leading-0">
                {searchParams.get('title')}
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
  );
}
