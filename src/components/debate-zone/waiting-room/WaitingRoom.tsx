import { useEffect, useState } from "react";

import { useRoomStore } from "../../../stores/roomStateStore";
import ParticipantBox from "../ParticipantBox";
import MatchingInterface from "./MatchingInterface";
import WaitingInfoDrodown from "./WaitingInfoDrodown";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [prosNum, setProsNum] = useState<number>(0);
  const [consNum, setConsNum] = useState<number>(0);
  const { roomSettings } = useRoomStore();
  useEffect(() => {
    if (roomSettings.stance === "pro") {
      setProsNum(1);
    } else {
      setConsNum(1);
    }
  }, [roomSettings]);

  return (
    <section className="px-[40px] flex justify-between relative">
      <WaitingInfoDrodown
        isWaiting={isWaiting}
        prosNum={prosNum}
        consNum={consNum}
      />
      <ParticipantBox label="OPONENTS" labelAlignment="end" />
      <MatchingInterface />
    </section>
  );
}
