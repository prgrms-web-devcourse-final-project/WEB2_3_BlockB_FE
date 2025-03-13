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

export default function GeneratingRoom() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  useSlideUpAnimation(containerRef);

  const { setRoomSettings, roomSettings } = useRoomStore();

  const { newsId, newsContinent, newsTitle, generatingType, moveToLinkedNews } =
    useNewsInfoParams();
  useEffect(() => {
    if (generatingType === "fromNews") {
      setRoomSettings("continent", newsContinent);
      setRoomSettings("link", `/news/${newsId}`);
      setCheckedStates((prevCheckedStates) => ({
        ...prevCheckedStates,
        continent: true,
      }));
    }
  }, [generatingType, newsContinent, newsId]);

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
    const roomIdResponse = await debateRoomApi.generateDebateRoom(
      initialRoomInfos
    );
    return roomIdResponse.data;
  };

  const onClickCreateBtn = async () => {
    const newRoomId = await makeNewRoom();
    navigate(`/debate-zone/${newRoomId}`);
  };

  return (
    <div className="bg-[#070707] min-h-screen overflow-hidden">
      <Header status="debate-waiting" />
      <div className="flex justify-center pb-10 item-center md:min-h-screen">
        <div
          ref={containerRef}
          className="flex flex-col justify-between items-center gap-[10px]  md:w-[658px] h-auto rounded-[10px] md:px-10 px-3 md:py-10 py-5 md:mb-20 mb-10 md:border md:border-white md:bg-white md:bg-opacity-20 md:shadow-[0_4px_20px_rgba(251,251,251,1)] font-pretendard "
        >
          <ProgressIndicator checkedStates={checkedStates} />
          <div className="flex flex-col w-full gap-2 md:gap-4">
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
                className="flex items-center justify-end w-full h-5 gap-2 mb-2 animate-flip"
              >
                <img src={link} alt="연관된 뉴스 링크" />
                <figcaption className="text-gray03 text-[12px] leading-0">
                  {newsTitle}
                </figcaption>
              </button>
            )}
          </div>

          <CheckBoxGroups
            generatingType={generatingType}
            setCheckedStates={setCheckedStates}
          />
          <div className="flex justify-end w-full">
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
      {/* websocket test */}
      {/* <div className="bg-white ">
        <div className="text-black01">
          마지막 수신 메시지: {lastJsonMessage && lastJsonMessage.message}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border"
        />
        <button onClick={sendMessage}>메시지 보내기</button>
     </div> */}
    </div>
  );
}
