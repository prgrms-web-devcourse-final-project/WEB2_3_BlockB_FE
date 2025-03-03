import AudienceList from "./AudienceList";
import ExitModal from "../../common/ExitModal";
import ObserverChatWindow from "./ObserverChatWindow";
import exit from "../../../assets/icons/exit.svg";
// import { useObservingStore } from "../../../stores/observingStateStore";
import { useState } from "react";
import ObserverMobileChatMenu from "./ObserverMobileChatMenu";
import ObserverMobileTab from "./ObserverMobileTab";
import OngoingInfo from "./OngoingInfo";
import DebateChatObserverMode from "./DebateChatObserverMode";


export default function ObserverOngoingRoom() {
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  // const { setObservingState } = useObservingStore();
  const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true)

  return (
  <div className="flex md:flex-col justify-center items-center h-screen md:px-[100px] md:py-[30px]">
  {isExitModalOpen && <ExitModal setIsExitModalOpen={setIsExitModalOpen} />}
    {/* md 이상일 때만 나타남: 제목 및 타이머 */}
    <OngoingInfo />
    <div className="w-full md:flex flex-grow overflow-hidden">
      {/* 좌측 */}
      <div className="md:flex-6 flex flex-1 flex-col">
        {/* sm 이하일 때만 나타남 */}
        <ObserverMobileChatMenu />
        <ObserverMobileTab isDebateTabed={isDebateTabed} setIsDebateTabed={setIsDebateTabed}/>
        {/* 디베이터 챗 */}
        <DebateChatObserverMode isDebateTabed={isDebateTabed}/>
      </div>x
      {/* 우측 */}
      <section className="flex md:flex-4 flex-col justify-between max-h-screen text-white">
          <AudienceList /> 
          <div className="flex justify-end md:flex hidden">
            <button onClick={() => setIsExitModalOpen(true)}>
              <img src={exit} alt="토론방 나가기" />
            </button>
          </div>
          {/* 참관자 챗 */}
          <ObserverChatWindow isDebateTabed={isDebateTabed}/> 
        </section>
    </div>
</div>

  );
}
