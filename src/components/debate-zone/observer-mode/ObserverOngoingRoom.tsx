import AudienceList from "./AudienceList";
import ExitModal from "../../common/Modal";
import ObserverChatWindow from "./ObserverChatWindow";
import exit from "../../../assets/icons/exit.svg";
// import { useObservingStore } from "../../../stores/observingStateStore";
import { useEffect, useState } from "react";
import ObserverMobileChatMenu from "./ObserverMobileChatMenu";
import ObserverMobileTab from "./ObserverMobileTab";
import OngoingInfo from "./OngoingInfo";
import DebateChatObserverMode from "./DebateChatObserverMode";
import { useNavigate } from "react-router";
import { useModalStore } from "../../../stores/useModal";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";


export default function ObserverOngoingRoom() {

  const [isDebateTabed, setIsDebateTabed] = useState<boolean>(true)
  
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  const handleExitClick = () => {
    openModal('정말로 나가시겠습니까?', () => {
      navigate('/main');
    });
  };


  return (
  <div className="flex md:flex-col justify-center items-center h-screen md:px-[100px] md:py-[30px]">
  <ExitModal/>
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
            <button onClick={handleExitClick}>
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
