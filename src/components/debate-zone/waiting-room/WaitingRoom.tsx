import { useEffect, useState } from "react";

import MatchingInterface from "./MatchingInterface";
import ParticipantBox from "../ParticipantBox";
import WaitingInfoDrodown from "../InfoDrodown";
import { useRoomStore } from "../../../stores/roomStateStore";

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
  }, [isWaiting, countDown]);

  useEffect(() => {
    if (countDown === 0) {
      setRoomState("ongoing");
    }
  }, [countDown, setRoomState]);

  return (
    <section className="md:px-[40px] px-[20px]  flex flex-col gap-[250px] relative">
      <div className="flex justify-between gap-2">
        <WaitingInfoDrodown isWaiting={isWaiting} />
        <ParticipantBox label="OPONENTS" labelAlignment="end" />
      </div>
      <MatchingInterface isWaiting={isWaiting} />

      {isWaiting ? (
        <h3 className="text-white md:text-2xl sm:text-[16px] text-[14px] font-bold w-full text-center">
          디베이터를 매칭하고 있습니다{dots}
        </h3>
      ) : (
        <div className="text-white md:text-2xl sm:text-[16px] text-[14px] font-bold w-full text-center">
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
