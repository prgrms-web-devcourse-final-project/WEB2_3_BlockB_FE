import AudienceList from "./AudienceList";
import ExitModal from "../ongoing-debate/ExitModal";
import ObserverChatWindow from "./ObserverChatWindow";
import exit from "../../../assets/icons/exit.svg";

import { useObservingStore } from "../../../stores/observingStateStore";
import { useState } from "react";
import ObserverMobileChatMenu from "./ObserverMobileChatMenu";
import ObserverMobileTab from "./ObserverMobileTab";
import OngoingInfo from "./OngoingInfo";
import DebateChatObserverMode from "./DebateChatObserverMode";


export default function ObserverOngoingRoom() {
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const { setObservingState } = useObservingStore();
  const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true)

  return (
  <div className="flex md:flex-col px-[10px] md:px-[100px] lg:px-[200px] md:py-[30px] justify-center items-center min-h-screen ">
  {isExitModalOpen && <ExitModal setIsExitModalOpen={setIsExitModalOpen} />}
  <div className="w-full max-w-[1200px]">
    {/* md 이상일 때만 나타남: 제목 및 타이머 */}
    <OngoingInfo />
    {/* sm 이하일 때만 나타남 */}
    <ObserverMobileChatMenu />
    <ObserverMobileTab isDebateTabed={isDebateTabed} setIsDebateTabed={setIsDebateTabed}/>
    {/* 본문 영역 */}
    <section className="text-white flex md:flex-row flex-col flex-grow justify-between gap-[20px] md:mt-[20px] ">
      {/* 채팅 메시지 영역 */}
      <DebateChatObserverMode isDebateTabed={isDebateTabed}/>
      {/* 우측 패널 */}
      <section className="flex flex-col gap-[20px] w-full md:w-[40%]">
        <AudienceList /> 
        <div className="flex justify-end md:flex hidden">
          <button onClick={() => setIsExitModalOpen(true)}>
            <img src={exit} alt="토론방 나가기" />
          </button>
        </div>
      <ObserverChatWindow isDebateTabed={isDebateTabed}/> 
      </section>

    </section>

    {/* 투표 버튼 */}
    <button
      onClick={() => setObservingState("voting")}
      className="text-white font-bold w-full md:w-auto py-[10px] px-[20px] bg-blue-600 rounded-md"
    >
      투표로 이동
    </button>
  </div>
</div>

  );
}
