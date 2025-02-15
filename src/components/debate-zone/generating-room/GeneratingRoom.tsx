import { useState } from "react";
import CheckBoxGroup from "./CheckBoxGroup";
import ProgressIndicator from "./ProgressIndicator";
import RoomInputCard from "./RoomInputCard";

export default function GeneratingRoom() {
  const [genertingType, setGeneratingType] = useState<
    "fromNews" | "fromDebateList"
  >("fromDebateList");
  const [roomType, setRoomType] = useState<RoomType>(null);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="bg-[#FBFBFB] w-[633px] h-[692px] rounded-[10px] p-[40px] opacity-20 border border-[#FBFBFB] shadow-[0_4px_20px_rgba(251,251,251,1)]">
        <ProgressIndicator />
        <RoomInputCard />
        <CheckBoxGroup />
      </div>
    </div>
  );
}
