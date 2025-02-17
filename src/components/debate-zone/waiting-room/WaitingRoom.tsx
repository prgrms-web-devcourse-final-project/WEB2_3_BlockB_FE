import { useEffect, useState } from "react";

import { useRoomStore } from "../../../stores/roomStateStore";
import ParticipantBox from "../ParticipantBox";
import MatchingInterface from "./MatchingInterface";
import WaitingInfoDrodown from "./WaitingInfoDrodown";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [dots, setDots] = useState("");
  const [countDown, setCountDown] = useState(5);
  const { setRoomState } = useRoomStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWaiting) {
      // 매칭 완료 시
      const interval = setInterval(() => {
        setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      if (countDown === 0)
        return () => {
          clearInterval(interval);
        };
    }
  }, [isWaiting]);

  useEffect(() => {
    if (countDown === 0) {
      setRoomState("ongoing");
    }
  }, [countDown]);

  return (
    <section className="px-[40px] flex flex-col gap-[250px] relative">
      <div className="flex justify-between">
        <WaitingInfoDrodown isWaiting={isWaiting} />
        <ParticipantBox label="OPONENTS" labelAlignment="end" />
      </div>
      <MatchingInterface isWaiting={isWaiting} />

      {isWaiting ? (
        <h3 className="text-white text-2xl font-bold w-full text-center">
          디베이터를 매칭하고 있습니다{dots}
        </h3>
      ) : (
        <div className="text-white text-2xl font-bold w-full text-center">
          <h3 className="mb-5">매칭이 완료되었습니다. 곧 토론이 시작됩니다.</h3>
          <p>{countDown}</p>
        </div>
      )}
      <button
        className="bg-gray02 text-black01 z-50"
        onClick={() => setIsWaiting(!isWaiting)}
      >
        임시 대기완료 이동 버튼
      </button>
    </section>
  );
}
