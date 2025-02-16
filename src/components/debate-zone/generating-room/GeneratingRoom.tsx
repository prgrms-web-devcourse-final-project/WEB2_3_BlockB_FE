import CheckBoxGroup from "./CheckBoxGroup";
import ProgressIndicator from "./ProgressIndicator";
import RoomActionButtons from "./../RoomActionButtons";
import RoomInputCard from "./RoomInputCard";
import { useNavigate } from "react-router";
import { useRoomStore } from "../../../stores/roomStateStore";
import { useState } from "react";

export default function GeneratingRoom() {
  const [genertingType, setGeneratingType] = useState<
    "fromNews" | "fromDebateList"
  >("fromDebateList");
  const [roomType, setRoomType] = useState<RoomType>(null);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { setRoomState } = useRoomStore();
  const onClickCreateBtn = () => setRoomState("ongoing");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center font-sofiaSans">
      <div
        className="bg-white w-[633px] h-[692px] rounded-[10px] p-[40px] border border-white shadow-[0_4px_20px_rgba(251,251,251,1)] mt-[60px] mb-[90px]"
        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
      >
        <ProgressIndicator />
        <RoomInputCard />
        <CheckBoxGroup />
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
