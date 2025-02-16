import { useState } from "react";
import { useNavigate } from "react-router";
import link from "../../../assets/icons/link.svg";
import { useRoomStore } from "../../../stores/roomStateStore";
import RoomActionButtons from "./../RoomActionButtons";
import CheckBoxGroups from "./CheckBoxGroups";
import ProgressIndicator from "./ProgressIndicator";
import RoomInputCard from "./RoomInputCard";

export default function GeneratingRoom() {
  const [genertingType, setGeneratingType] = useState<
    "fromNews" | "fromDebateList"
  >("fromDebateList");
  const [roomType, setRoomType] = useState<RoomType>(null);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { setRoomState } = useRoomStore();
  const onClickCreateBtn = () => setRoomState("ongoing");
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
  });

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col justify-between items-center bg-white w-[658px] h-[666px] rounded-[10px] px-[40px] py-[40px] border border-white shadow-[0_4px_20px_rgba(251,251,251,1)] mt-[60px] mb-[90px]"
        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
      >
        <ProgressIndicator checkedStates={checkedStates} />
        <div className="w-full flex flex-col gap-[15px]">
          <RoomInputCard
            label="토론 주제"
            key="title"
            setCheckedStates={setCheckedStates}
          />
          <RoomInputCard
            label="방 설명"
            key="description"
            setCheckedStates={setCheckedStates}
          />
          <figure className="w-full flex justify-end items-center gap-2">
            <img src={link} alt="연관된 뉴스 링크" />
            <figcaption className="text-gray02 text-[10px] leading-0">
              {newLink}
            </figcaption>
          </figure>
        </div>

        <CheckBoxGroups
          genertingType={genertingType}
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
