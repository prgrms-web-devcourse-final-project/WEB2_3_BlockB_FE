import { useState } from "react";
import WaitingInfoDrodown from "./WaitingInfoDrodown";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [prosNum, setProsNum] = useState<number>(0);
  const [consNum, setConsNum] = useState<number>(0);
  return (
    <section>
      waitingRoom
      <WaitingInfoDrodown
        isWaiting={isWaiting}
        prosNum={prosNum}
        consNum={consNum}
      />
    </section>
  );
}
