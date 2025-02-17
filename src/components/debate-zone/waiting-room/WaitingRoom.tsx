import { useState } from "react";

import ParticipantBox from "../ParticipantBox";
import MatchingInterface from "./MatchingInterface";
import WaitingInfoDrodown from "./WaitingInfoDrodown";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  return (
    <section className="px-[40px] flex justify-between relative">
      <WaitingInfoDrodown isWaiting={isWaiting} />
      <ParticipantBox label="OPONENTS" labelAlignment="end" />
      <MatchingInterface />
    </section>
  );
}
