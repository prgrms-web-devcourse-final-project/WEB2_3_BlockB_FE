import ObserverMatchingInterface from "./ObserverMatchingInterface";
import ParticipantBox from "./../ParticipantBox";
import InfoDropdwon from "../InfoDrodown";
import { useObserverRoomStore } from "../../../stores/observerRoomInfoStore";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
export default function ObserverWaitingRoom() {

  const observerRoomInfoDetails = useObserverRoomStore((state) => state.observerRoomInfoDetails);
  const {isWaitingRecruitment} = useDebateWebSocket()

  if (isWaitingRecruitment)
    return (
      <section className="px-[40px] flex flex-col gap-[250px] relative min-h-screen">
        <div className="w-full flex justify-between">
          <InfoDropdwon isObserver={true}/>
          {/* TODO: 대기 완료 전환 버튼은 임시로 제작해 놓은 것으로 실제 구현시 props 및 버튼을 삭제하십시오 */}
        </div>
        <ObserverMatchingInterface isWaiting={isWaitingRecruitment} />
      </section>
    );
  else
    return (
      <section className="grid grid-cols-[1fr_2fr_1fr] md:px-[34px] min-h-screen">
        <div></div>
        <div className=" w-full flex flex-col items-center justify-center min-h-screen">
          <div className="flex items-center md:gap-[26px] sm:gap-[10px] gap-[5px]">
            <ParticipantBox label="PROS" participants={observerRoomInfoDetails.proUsers} />
            <p className="font-jersey text-white md:text-[30px] text-[18px]">vs</p>
            <ParticipantBox label="CONS" participants={observerRoomInfoDetails.conUsers} />
          </div>
          <p className="text-white font-pretendard md:text-[20px] sm:text-[16px] text-[14px] font-bold mt-[50px]">
            매칭이 완료되었습니다. 곧 토론이 시작됩니다.
          </p>
        </div>
        <div></div>
        {/* 이번 업데이트에서는 포함되지 않는 기능입니다. */}
        {/* <div className="md:block hidden w-full font-jersey text-white flex flex-col items-end gap-[5px]">
          <div className="w-[188px] flex justify-start">
            <p>audience</p>
          </div>
          <figure className="flex gap-[11px] px-[5px] py-[2px] items-center  bg-white bg-opacity-40 w-[188px] h-[33px] rounded-[10px]">
            <img src={profile} className="w-[24px] h-[24px] rounded-full" />
            <figcaption>imaria0218</figcaption>
          </figure>
        </div> */}
      </section>
    );
}
