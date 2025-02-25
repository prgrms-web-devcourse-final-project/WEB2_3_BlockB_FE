import { useEffect, useState } from "react";

import { gsap } from "gsap";
import { useNavigate } from "react-router";
import link from "../../../assets/icons/link.svg";
import { useRoomStore } from "../../../stores/roomStateStore";
import RoomActionButtons from "./../RoomActionButtons";
import CheckBoxGroups from "./CheckBoxGroups";
import ProgressIndicator from "./ProgressIndicator";
import RoomInputCard from "./RoomInputCard";

export default function GeneratingRoom() {
  const [generatingType, setGeneratingType] = useState<
    "fromNews" | "fromDebateList"
  >("fromDebateList");
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { setRoomState } = useRoomStore();
  const onClickCreateBtn = () => setRoomState("waiting");
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
    <div className="flex justify-center md:min-h-screen">
      <div
        className="generatingRoomContainer flex flex-col justify-between items-center md:bg-white md:w-[658px] md:h-[666px] h-auto rounded-[10px] md:px-[40px] md:py-[40px] md:border md:border-white md:bg-opacity-20 md:shadow-[0_4px_20px_rgba(251,251,251,1)] md:mt-[30px] md:mb-[90px] font-pretendard p-[10px]"
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
            <figure className="w-full flex justify-end items-center gap-2">
              <img src={link} alt="연관된 뉴스 링크" />
              <figcaption className="text-gray02 text-[10px] leading-0">
                {newLink}
              </figcaption>
            </figure>
          )}
        </div>

        <CheckBoxGroups
          generatingType={generatingType}
          setCheckedStates={setCheckedStates}
        />
        <div className="w-full flex justify-end md:mt-2 mt-10">
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
