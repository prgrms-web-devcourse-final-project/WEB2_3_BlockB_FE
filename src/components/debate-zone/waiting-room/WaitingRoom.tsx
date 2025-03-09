import { useEffect, useState } from "react";
import MatchingInterface from "./MatchingInterface";
import ParticipantBox from "../ParticipantBox";
import WaitingInfoDrodown from "../InfoDrodown";
import Ment from "./Ment";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";


export default function WaitingRoom() {
  // const [isWaitingRecruitment, setIsWaitingRecruitment] = useState<boolean>(true);
  const {isWaitingRecruitment} = useDebateWebSocket()
  const [countDown, setCountDown] = useState(20);

  useEffect(() => {
    if (!isWaitingRecruitment) {
      const interval = setInterval(() => {
        setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isWaitingRecruitment]);

  return (
    <section className="md:px-[40px] px-[20px] flex flex-col gap-[250px] relative">
      <div className="flex justify-between gap-2">
        <WaitingInfoDrodown />
        <ParticipantBox label="OPONENTS" labelAlignment="end" />
      </div>
      <MatchingInterface isWaiting={isWaitingRecruitment} />

      {isWaitingRecruitment ? (
        <Ment />
      ) : (
        <div className="text-white md:text-2xl sm:text-[16px] text-[14px] font-bold w-full text-center">
          <h3 className="mb-5">매칭이 완료되었습니다. 곧 토론이 시작됩니다.</h3>
          <p>{countDown}</p>
        </div>
      )}
      {/* <button
        className="z-50 bg-gray02 text-black01"
        onClick={() => setIsWaitingRecruitment(!isWaitingRecruitment)}
      >
        임시 대기완료 이동 버튼
      </button> */}
    </section>
  );
}
